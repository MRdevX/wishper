import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { StatsCard } from "@repo/admin/components/stats-card";
import { Users, Gift, List, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your Wishper application</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Users" value="0" description="+0% from last month" icon={Users} />
        <StatsCard title="Total Wishes" value="0" description="+0% from last month" icon={Gift} />
        <StatsCard title="Total Wishlists" value="0" description="+0% from last month" icon={List} />
        <StatsCard title="Active Users" value="0" description="+0% from last month" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-muted rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">No recent activity</p>
                  <p className="text-xs text-muted-foreground">Get started by creating some data</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a href="/admin/users" className="block p-3 rounded-lg border hover:bg-accent transition-colors">
                <div className="font-medium">Manage Users</div>
                <div className="text-sm text-muted-foreground">View and edit user accounts</div>
              </a>
              <a href="/admin/wishes" className="block p-3 rounded-lg border hover:bg-accent transition-colors">
                <div className="font-medium">Manage Wishes</div>
                <div className="text-sm text-muted-foreground">View and edit wish items</div>
              </a>
              <a href="/admin/wishlists" className="block p-3 rounded-lg border hover:bg-accent transition-colors">
                <div className="font-medium">Manage Wishlists</div>
                <div className="text-sm text-muted-foreground">View and edit wishlists</div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
