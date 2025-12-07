import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
export const RecentTransactions = ({ transactions, categories }) => {
    const recentTransactions = transactions.slice(0, 5);
    const getCategoryColor = (categoryName) => {
        const category = categories.find((c) => c.name === categoryName);
        return category?.color || 'hsl(var(--muted))';
    };
    return (<Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {recentTransactions.length === 0 ? (<p className="text-muted-foreground text-center py-4">No transactions yet</p>) : (<div className="space-y-4">
            {recentTransactions.map((transaction) => (<div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: getCategoryColor(transaction.category) + '20' }}>
                    {transaction.type === 'income' ? (<ArrowUpRight className="h-5 w-5 text-green-600"/>) : (<ArrowDownRight className="h-5 w-5 text-red-600"/>)}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description || transaction.category}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.category} • {format(new Date(transaction.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </p>
              </div>))}
          </div>)}
      </CardContent>
    </Card>);
};
