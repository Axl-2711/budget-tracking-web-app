import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useBudget } from '@/hooks/useBudget';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
const PRESET_COLORS = [
    'hsl(0, 72%, 50%)',
    'hsl(25, 95%, 53%)',
    'hsl(45, 93%, 47%)',
    'hsl(142, 76%, 36%)',
    'hsl(172, 66%, 50%)',
    'hsl(199, 89%, 48%)',
    'hsl(215, 16%, 46%)',
    'hsl(262, 83%, 58%)',
    'hsl(280, 65%, 60%)',
    'hsl(340, 82%, 52%)',
];
const Categories = () => {
    const { categories, addCategory, deleteCategory, isLoading } = useBudget();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', type: 'expense', color: PRESET_COLORS[0] });
    const { toast } = useToast();
    const incomeCategories = categories.filter((c) => c.type === 'income');
    const expenseCategories = categories.filter((c) => c.type === 'expense');
    const handleAddCategory = () => {
        if (!newCategory.name.trim()) {
            toast({ title: 'Error', description: 'Please enter a category name', variant: 'destructive' });
            return;
        }
        const exists = categories.some((c) => c.name.toLowerCase() === newCategory.name.toLowerCase());
        if (exists) {
            toast({ title: 'Error', description: 'Category already exists', variant: 'destructive' });
            return;
        }
        addCategory(newCategory);
        setIsDialogOpen(false);
        setNewCategory({ name: '', type: 'expense', color: PRESET_COLORS[0] });
        toast({ title: 'Category added', description: `${newCategory.name} has been created.` });
    };
    const handleDeleteCategory = (id, name) => {
        deleteCategory(id);
        toast({ title: 'Category deleted', description: `${name} has been removed.` });
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
            <h1 className="text-3xl font-bold">Categories</h1>
            <p className="text-muted-foreground">Organize your transactions with custom categories</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2"/>
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} placeholder="Category name"/>
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={newCategory.type} onValueChange={(v) => setNewCategory({ ...newCategory, type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map((color) => (<button key={color} type="button" className={`w-8 h-8 rounded-full transition-transform ${newCategory.color === color ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'hover:scale-105'}`} style={{ backgroundColor: color }} onClick={() => setNewCategory({ ...newCategory, color })}/>))}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddCategory}>Add Category</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Income Categories
                <Badge variant="secondary">{incomeCategories.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {incomeCategories.length === 0 ? (<p className="text-muted-foreground text-center py-4">No income categories</p>) : (<div className="space-y-2">
                  {incomeCategories.map((category) => (<div key={category.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}/>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive"/>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Category</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{category.name}"? Existing transactions will keep their category.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteCategory(category.id, category.name)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>))}
                </div>)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Expense Categories
                <Badge variant="secondary">{expenseCategories.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {expenseCategories.length === 0 ? (<p className="text-muted-foreground text-center py-4">No expense categories</p>) : (<div className="space-y-2">
                  {expenseCategories.map((category) => (<div key={category.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}/>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive"/>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Category</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{category.name}"? Existing transactions will keep their category.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteCategory(category.id, category.name)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>))}
                </div>)}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>);
};
export default Categories;
