import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ExpenseChart } from '@/components/dashboard/ExpenseChart';
import { MonthlyChart } from '@/components/dashboard/MonthlyChart';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { BudgetProgress } from '@/components/budgets/BudgetProgress';
import { useBudget } from '@/hooks/useBudget';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { format } from 'date-fns';
const Dashboard = () => {
    const { transactions, categories, budgets, getTotalIncome, getTotalExpenses, getBalance, getCategorySpending, isLoading, } = useBudget();
    const currentMonth = format(new Date(), 'yyyy-MM');
    const monthlyIncome = getTotalIncome(currentMonth);
    const monthlyExpenses = getTotalExpenses(currentMonth);
    const monthlyBalance = getBalance(currentMonth);
    const totalBalance = getBalance();
    if (isLoading) {
        return (<Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>);
    }
    return (<Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Track your finances at a glance</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Total Balance" value={`$${totalBalance.toFixed(2)}`} description="All time" icon={Wallet} trend={totalBalance >= 0 ? 'up' : 'down'}/>
          <StatsCard title="Monthly Income" value={`$${monthlyIncome.toFixed(2)}`} description={format(new Date(), 'MMMM yyyy')} icon={TrendingUp} trend="up"/>
          <StatsCard title="Monthly Expenses" value={`$${monthlyExpenses.toFixed(2)}`} description={format(new Date(), 'MMMM yyyy')} icon={TrendingDown} trend="down"/>
          <StatsCard title="Monthly Savings" value={`$${monthlyBalance.toFixed(2)}`} description={format(new Date(), 'MMMM yyyy')} icon={PiggyBank} trend={monthlyBalance >= 0 ? 'up' : 'down'}/>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <MonthlyChart transactions={transactions}/>
          <ExpenseChart transactions={transactions} categories={categories}/>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RecentTransactions transactions={transactions} categories={categories}/>
          <BudgetProgress budgets={budgets} categories={categories} getCategorySpending={getCategorySpending} currentMonth={currentMonth}/>
        </div>
      </div>
    </Layout>);
};
export default Dashboard;
