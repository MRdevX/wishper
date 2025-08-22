import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { StatsCard } from "@repo/ui";
import { Users, Gift, List, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value="0" description="+0% from last month" icon={Users} />
        <StatsCard title="Total Wishes" value="0" description="+0% from last month" icon={Gift} />
        <StatsCard title="Total Wishlists" value="0" description="+0% from last month" icon={List} />
        <StatsCard title="Active Users" value="0" description="+0% from last month" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest actions in your application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">No recent activity</p>
                  <p className="text-xs text-gray-500">Get started by creating some data</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href="/admin/users"
                className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                <div className="font-medium text-gray-900">Manage Users</div>
                <div className="text-sm text-gray-500">View and edit user accounts</div>
              </a>
              <a
                href="/admin/wishes"
                className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                <div className="font-medium text-gray-900">Manage Wishes</div>
                <div className="text-sm text-gray-500">View and edit wish items</div>
              </a>
              <a
                href="/admin/wishlists"
                className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                <div className="font-medium text-gray-900">Manage Wishlists</div>
                <div className="text-sm text-gray-500">View and edit wishlists</div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
