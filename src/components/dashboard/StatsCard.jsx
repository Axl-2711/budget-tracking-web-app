import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export const StatsCard = ({ title, value, description, icon: Icon, trend }) => {
    const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground';
    return (<Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground"/>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${trendColor}`}>{value}</div>
        {description && (<p className="text-xs text-muted-foreground mt-1">{description}</p>)}
      </CardContent>
    </Card>);
};
