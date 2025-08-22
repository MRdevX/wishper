import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Badge } from "@repo/ui/components/badge";
import { Settings, Database, Globe, Shield, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              General Settings
            </CardTitle>
            <CardDescription>Basic application configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Application Name</label>
              <Input defaultValue="Wishper" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">API Base URL</label>
              <Input defaultValue="http://localhost:3001" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Environment</label>
              <Badge variant="outline">Development</Badge>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Database Settings
            </CardTitle>
            <CardDescription>Database connection and configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Database Type</label>
              <Badge variant="outline">PostgreSQL</Badge>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Connection Status</label>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Total Records</label>
              <div className="text-2xl font-bold">0</div>
            </div>
            <Button variant="outline">Test Connection</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security Settings
            </CardTitle>
            <CardDescription>Security and authentication configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Authentication</label>
              <Badge variant="outline">Disabled</Badge>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">CORS Origins</label>
              <Input defaultValue="http://localhost:3000" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Rate Limiting</label>
              <Badge variant="outline">Disabled</Badge>
            </div>
            <Button variant="outline">Configure Security</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Settings
            </CardTitle>
            <CardDescription>Email and notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Email Notifications</label>
              <Badge variant="outline">Disabled</Badge>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">SMTP Server</label>
              <Input placeholder="smtp.example.com" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Admin Email</label>
              <Input placeholder="admin@example.com" />
            </div>
            <Button variant="outline">Test Email</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            System Information
          </CardTitle>
          <CardDescription>Current system status and version information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Version</label>
              <div className="text-sm">1.0.0</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Node.js</label>
              <div className="text-sm">v18.0.0</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Uptime</label>
              <div className="text-sm">0 days, 0 hours</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
