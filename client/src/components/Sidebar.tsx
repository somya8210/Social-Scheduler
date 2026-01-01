import { Link, useLocation } from "wouter";
import { LayoutDashboard, Calendar, Settings, LogOut, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/" },
    { label: "Calendar", icon: Calendar, href: "/calendar" },
    { label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen border-r border-border bg-card/50 backdrop-blur-xl fixed left-0 top-0 z-30">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 text-primary">
          <div className="p-2 bg-primary rounded-lg shadow-lg shadow-primary/30">
            <Share2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground tracking-tight">PostFlow</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors cursor-pointer">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </div>
      </div>
    </aside>
  );
}

export function MobileHeader() {
  return (
    <div className="md:hidden h-16 border-b border-border bg-card flex items-center px-4 justify-between sticky top-0 z-30">
       <div className="flex items-center gap-2 text-primary">
        <div className="p-1.5 bg-primary rounded-md">
          <Share2 className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-lg text-foreground">PostFlow</span>
      </div>
      {/* Mobile menu trigger could go here */}
    </div>
  );
}
