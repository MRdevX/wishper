"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Gift, List, Settings, Menu, X } from "lucide-react";
import { Button } from "../button";
import { Separator } from "../separator";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Wishes", href: "/admin/wishes", icon: Gift },
  { name: "Wishlists", href: "/admin/wishlists", icon: List },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function AdminLayout({ children, title, description }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Mobile sidebar */}
        <div className="lg:hidden">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="fixed top-4 left-4 z-50">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {sidebarOpen && (
            <div className="fixed inset-0 z-40 bg-black/50 lg:hidden">
              <div className="fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg">
                <div className="flex h-full flex-col">
                  <div className="flex h-16 items-center justify-between px-6 border-b">
                    <h1 className="text-xl font-bold">Wishper Admin</h1>
                    <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="flex-1 space-y-1 px-4 py-4">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-background border-r">
            <div className="flex h-16 items-center px-6 border-b">
              <h1 className="text-xl font-bold">Wishper Admin</h1>
            </div>
            <nav className="flex-1 space-y-1 px-4 py-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Spacer for desktop */}
        <div className="hidden lg:block lg:w-64" />

        {/* Main content */}
        <main className="flex-1 p-8">
          {(title || description) && (
            <div className="mb-8">
              {title && <h1 className="text-3xl font-bold">{title}</h1>}
              {description && <p className="text-muted-foreground mt-2">{description}</p>}
              <Separator className="mt-4" />
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
