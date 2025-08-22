"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Plus } from "lucide-react";
import { DataTable } from "@repo/admin";
import { ActionButtons } from "@repo/admin";
import { apiClient } from "@/lib/api";
import { ColumnDef } from "@tanstack/react-table";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.getUsers();
      if (response.success && response.data) {
        setUsers(response.data as User[]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await apiClient.deleteUser(userId);
      if (response.success) {
        setUsers(users.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="font-medium">
            {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "No name provided"}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span className="text-foreground">{row.original.email}</span>,
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">{new Date(row.original.createdAt).toLocaleDateString()}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionButtons
          onView={() => console.log("View user:", row.original.id)}
          onEdit={() => console.log("Edit user:", row.original.id)}
          onDelete={() => handleDeleteUser(row.original.id)}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-2">Manage user accounts</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Loading users...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-2">Manage user accounts</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all users in your application</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={users} searchKey="email" searchPlaceholder="Search users by email..." />
        </CardContent>
      </Card>
    </div>
  );
}
