'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { 
  PageHeader, 
  LoadingState, 
  ErrorState, 
  DataTableWrapper, 
  TableActions,
  UserForm
} from '@repo/ui';
import { apiClient } from '@/lib/api';
import { ColumnDef } from '@tanstack/react-table';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getUsers();
      if (response.success && response.data) {
        setUsers(response.data as User[]);
      } else {
        setError(response.error || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await apiClient.deleteUser(userId);
      if (response.success) {
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        alert(response.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleAddUser = () => {
    setShowUserForm(true);
  };

  const handleCreateUser = async (userData: { email: string; name: string }) => {
    try {
      setFormLoading(true);
      const response = await apiClient.createUser(userData);
      if (response.success && response.data) {
        setUsers([...users, response.data as User]);
        setShowUserForm(false);
      } else {
        alert(response.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    } finally {
      setFormLoading(false);
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const user = row.original;
        const name = user.firstName && user.lastName 
          ? `${user.firstName} ${user.lastName}` 
          : user.name || 'No name provided';
        return <div className="font-medium text-gray-900">{name}</div>;
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <span className="text-gray-700">{row.original.email}</span>,
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <TableActions
          onView={() => console.log('View user:', row.original.id)}
          onEdit={() => console.log('Edit user:', row.original.id)}
          onDelete={() => handleDeleteUser(row.original.id)}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <LoadingState 
        title="Users" 
        description="Manage user accounts" 
      />
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Users" 
        description="Manage user accounts" 
        error={error}
        onRetry={fetchUsers}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage user accounts"
        action={{
          label: 'Add User',
          icon: Plus,
          onClick: handleAddUser,
        }}
      />

      <DataTableWrapper
        title="All Users"
        description="A list of all users in your application"
        columns={columns}
        data={users}
        searchKey="email"
        searchPlaceholder="Search users by email..."
      />

      {showUserForm && (
        <UserForm
          onSubmit={handleCreateUser}
          onCancel={() => setShowUserForm(false)}
          loading={formLoading}
        />
      )}
    </div>
  );
}
