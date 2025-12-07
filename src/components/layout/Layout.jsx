import { Header } from './Header';
export const Layout = ({ children }) => {
    return (<div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">{children}</main>
    </div>);
};
