import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle } from 'lucide-react';
export const BudgetProgress = ({ budgets, categories, getCategorySpending, currentMonth }) => {
    const currentBudgets = budgets.filter((b) => b.month === currentMonth);
    const getCategoryColor = (categoryName) => {
        const category = categories.find((c) => c.name === categoryName);
        return category?.color || 'hsl(var(--muted))';
    };
    if (currentBudgets.length === 0) {
        return (<Card>
        <CardHeader>
          <CardTitle>Budget Progress</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground py-8">
          No budgets set for this month
        </CardContent>
      </Card>);
    }
    return (<Card>
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentBudgets.map((budget) => {
            const spent = getCategorySpending(budget.category, currentMonth);
            const percentage = Math.min((spent / budget.amount) * 100, 100);
            const isOverBudget = spent > budget.amount;
            const isNearLimit = percentage >= 80 && !isOverBudget;
            return (<div key={budget.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor(budget.category) }}/>
                  <span className="font-medium">{budget.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  {isOverBudget && <AlertTriangle className="h-4 w-4 text-destructive"/>}
                  {!isOverBudget && percentage === 100 && <CheckCircle className="h-4 w-4 text-green-600"/>}
                  <span className={`text-sm ${isOverBudget ? 'text-destructive' : isNearLimit ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                    ${spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                  </span>
                </div>
              </div>
              <Progress value={percentage} className={`h-2 ${isOverBudget ? '[&>div]:bg-destructive' : isNearLimit ? '[&>div]:bg-yellow-500' : ''}`}/>
            </div>);
        })}
      </CardContent>
    </Card>);
};
