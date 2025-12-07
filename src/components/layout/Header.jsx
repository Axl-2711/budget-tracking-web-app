import { Wallet, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/transactions', label: 'Transactions' },
    { path: '/budgets', label: 'Budgets' },
    { path: '/categories', label: 'Categories' },
];
export const Header = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    return (<header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Wallet className="h-5 w-5 text-primary-foreground"/>
          </div>
          <span className="text-xl font-semibold">BudgetTracker</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (<Link key={item.path} to={item.path}>
              <Button variant={location.pathname === item.path ? 'secondary' : 'ghost'} size="sm">
                {item.label}
              </Button>
            </Link>))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5"/>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <nav className="flex flex-col gap-2 mt-8">
              {navItems.map((item) => (<Link key={item.path} to={item.path} onClick={() => setOpen(false)}>
                  <Button variant={location.pathname === item.path ? 'secondary' : 'ghost'} className="w-full justify-start">
                    {item.label}
                  </Button>
                </Link>))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>);
};
