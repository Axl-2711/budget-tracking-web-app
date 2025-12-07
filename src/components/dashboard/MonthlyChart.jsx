import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo } from 'react';
import { format, subMonths, startOfMonth } from 'date-fns';
export const MonthlyChart = ({ transactions }) => {
    const data = useMemo(() => {
        const last6Months = Array.from({ length: 6 }, (_, i) => {
            const date = subMonths(new Date(), 5 - i);
            return format(startOfMonth(date), 'yyyy-MM');
        });
        return last6Months.map((month) => {
            const monthTransactions = transactions.filter((t) => t.date.startsWith(month));
            const income = monthTransactions
                .filter((t) => t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0);
            const expenses = monthTransactions
                .filter((t) => t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0);
            return {
                month: format(new Date(month + '-01'), 'MMM'),
                income,
                expenses,
            };
        });
    }, [transactions]);
    return (<Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Monthly Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted"/>
            <XAxis dataKey="month" className="text-xs"/>
            <YAxis className="text-xs"/>
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 'var(--radius)',
        }}/>
            <Legend />
            <Bar dataKey="income" fill="hsl(142, 76%, 36%)" name="Income" radius={[4, 4, 0, 0]}/>
            <Bar dataKey="expenses" fill="hsl(0, 72%, 50%)" name="Expenses" radius={[4, 4, 0, 0]}/>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>);
};
