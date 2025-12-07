import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useBudget } from '@/hooks/useBudget';
import { Plus, Trash2, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
const Budgets = () => {
    const { budgets, categories, addBudget, deleteBudget, getCategorySpending, isLoading, } = useBudget();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newBudget, setNewBudget] = useState({ category: '', amount: '', month: format(new Date(), 'yyyy-MM') });
    const { toast } = useToast();
    const expenseCategories = categories.filter((c) => c.type === 'expense');
    const currentMonth = format(new Date(), 'yyyy-MM');
    const getCategoryColor = (categoryName) => {
        const category = categories.find((c) => c.name === categoryName);
        return category?.color || 'hsl(var(--muted))';
    };
    const handleAddBudget = () => {
        if (!newBudget.category || !newBudget.amount) {
            toast({ title: 'Error', description: 'Please fill all fields', variant: 'destructive' });
            return;
        }
        const existing = budgets.find((b) => b.category === newBudget.category && b.month === newBudget.month);
        if (existing) {
            toast({ title: 'Error', description: 'Budget for this category already exists this month', variant: 'destructive' });
            return;
        }
        addBudget({
            category: newBudget.category,
            amount: parseFloat(newBudget.amount),
            month: newBudget.month,
        });
        setIsDialogOpen(false);
        setNewBudget({ category: '', amount: '', month: format(new Date(), 'yyyy-MM') });
        toast({ title: 'Budget added', description: 'Your budget has been set.' });
    };
    const handleDeleteBudget = (id) => {
        deleteBudget(id);
        toast({ title: 'Budget deleted', description: 'The budget has been removed.' });
    };
    if (isLoading) {
        return (<Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>);
    }
    return (<Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Budgets</h1>
            <p className="text-muted-foreground">Set spending limits for each category</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2"/>
                Add Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Budget</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={newBudget.category} onValueChange={(v) => setNewBudget({ ...newBudget, category: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category"/>
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map((cat) => (<SelectItem key={cat.id} value={cat.name}>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}/>
                            {cat.name}
                          </div>
                        </SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input type="number" min="0" step="0.01" value={newBudget.amount} onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })} placeholder="0.00"/>
                </div>
                <div className="space-y-2">
                  <Label>Month</Label>
                  <Input type="month" value={newBudget.month} onChange={(e) => setNewBudget({ ...newBudget, month: e.target.value })}/>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddBudget}>Add Budget</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {budgets.length === 0 ? (<Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No budgets set yet. Add your first budget to start tracking your spending limits.
            </CardContent>
          </Card>) : (<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {budgets.map((budget) => {
                const spent = getCategorySpending(budget.category, budget.month);
                const percentage = Math.min((spent / budget.amount) * 100, 100);
                const isOverBudget = spent > budget.amount;
                const isNearLimit = percentage >= 80 && !isOverBudget;
                const remaining = budget.amount - spent;
                return (<Card key={budget.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor(budget.category) }}/>
                        <CardTitle className="text-base">{budget.category}</CardTitle>
                      </div>
                      <div className="flex items-center gap-1">
                        {isOverBudget && <AlertTriangle className="h-4 w-4 text-destructive"/>}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4 text-destructive"/>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Budget</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this budget?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteBudget(budget.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{format(new Date(budget.month + '-01'), 'MMMM yyyy')}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Spent: ${spent.toFixed(2)}</span>
                        <span>Budget: ${budget.amount.toFixed(2)}</span>
                      </div>
                      <Progress value={percentage} className={`h-2 ${isOverBudget ? '[&>div]:bg-destructive' : isNearLimit ? '[&>div]:bg-yellow-500' : ''}`}/>
                      <p className={`text-sm ${isOverBudget ? 'text-destructive' : remaining < budget.amount * 0.2 ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                        {isOverBudget ? `Over budget by $${Math.abs(remaining).toFixed(2)}` : `$${remaining.toFixed(2)} remaining`}
                      </p>
                    </div>
                  </CardContent>
                </Card>);
            })}
          </div>)}
      </div>
    </Layout>);
};
export default Budgets;
