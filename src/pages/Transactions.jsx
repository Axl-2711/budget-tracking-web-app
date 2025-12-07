import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { TransactionList } from '@/components/transactions/TransactionList';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useBudget } from '@/hooks/useBudget';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const Transactions = () => {
    const { transactions, categories, addTransaction, updateTransaction, deleteTransaction, isLoading, } = useBudget();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();
    const handleAddTransaction = (data) => {
        addTransaction(data);
        setIsDialogOpen(false);
        toast({
            title: 'Transaction added',
            description: `${data.type === 'income' ? 'Income' : 'Expense'} of $${data.amount.toFixed(2)} recorded.`,
        });
    };
    const handleDeleteTransaction = (id) => {
        deleteTransaction(id);
        toast({
            title: 'Transaction deleted',
            description: 'The transaction has been removed.',
        });
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
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">Manage your income and expenses</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2"/>
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Transaction</DialogTitle>
              </DialogHeader>
              <TransactionForm categories={categories} onSubmit={handleAddTransaction} onCancel={() => setIsDialogOpen(false)}/>
            </DialogContent>
          </Dialog>
        </div>

        <TransactionList transactions={transactions} categories={categories} onUpdate={updateTransaction} onDelete={handleDeleteTransaction}/>
      </div>
    </Layout>);
};
export default Transactions;
