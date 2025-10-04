import { NavLink, Outlet, Navigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Home,
  LineChart,
  Menu,
  Package,
  Settings,
  Wallet,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";
const employeeNavItems = [
  { to: "/dashboard", icon: Home, label: "Dashboard" },
  { to: "/contributions", icon: Wallet, label: "Contributions" },
  { to: "/investments", icon: LineChart, label: "Investments" },
  { to: "/profile", icon: Settings, label: "Profile" },
];

const employerNavItems = [
  { to: "/dashboard", icon: Home, label: "Dashboard" },
  { to: "/employees", icon: User, label: "Employees" },
  { to: "/contributions", icon: Wallet, label: "Contributions" },
  { to: "/reports", icon: LineChart, label: "Reports" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

function SidebarNav() {
  const { user } = useAuth();
  const navItems = user?.role === "employer" ? employerNavItems : employeeNavItems;

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isActive && "bg-muted text-primary"
            )
          }
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
export function AppLayout() {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (isMobile) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <NavLink to="/" className="flex items-center gap-2 font-semibold">
                  <Package className="h-6 w-6 text-blue-600" />
                  <span className="">ProvidentEdge</span>
                </NavLink>
              </div>
              <SidebarNav />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Mobile Header Content can go here */}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gray-50/50 dark:bg-gray-900/50">
          <Outlet />
        </main>
      </div>
    );
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <NavLink to="/" className="flex items-center gap-2 font-semibold">
              <Package className="h-6 w-6 text-blue-600" />
              <span className="">ProvidentEdge</span>
            </NavLink>
          </div>
          <div className="flex-1">
            <SidebarNav />
          </div>
          <div className="mt-auto p-4">
            <div className="flex items-center justify-between gap-3 rounded-lg px-3 py-3 text-primary transition-all">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 rounded-full bg-primary text-primary-foreground p-1.5" />
                <div className="flex flex-col">
                  <span className="font-semibold">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">{user?.id}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <NavLink to="/logout">
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Logout</span>
                </NavLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gray-50/50 dark:bg-gray-900/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}