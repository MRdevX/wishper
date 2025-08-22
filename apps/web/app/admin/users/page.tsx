'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { 
  PageHeader, 
  LoadingState, 
  ErrorState, 
  DataTableWrapper, 
  TableActions,
  UserForm,
  useToast
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
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const { showToast } = useToast();

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
        showToast('User deleted successfully', 'success');
      } else {
        showToast(response.error || 'Failed to delete user', 'error');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showToast('Failed to delete user', 'error');
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleCreateUser = async (userData: { email: string; name: string }) => {
    try {
      setFormLoading(true);
      if (editingUser) {
        const response = await apiClient.updateUser(editingUser.id, userData);
        if (response.success && response.data) {
          setUsers(users.map(user => user.id === editingUser.id ? response.data as User : user));
          setShowUserForm(false);
          setEditingUser(null);
          showToast('User updated successfully', 'success');
        } else {
          showToast(response.error || 'Failed to update user', 'error');
        }
      } else {
        const response = await apiClient.createUser(userData);
        if (response.success && response.data) {
          setUsers([...users, response.data as User]);
          setShowUserForm(false);
          showToast('User created successfully', 'success');
        } else {
          showToast(response.error || 'Failed to create user', 'error');
        }
      }
    } catch (error) {
      console.error('Error saving user:', error);
      showToast('Failed to save user', 'error');
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
          onEdit={() => handleEditUser(row.original)}
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
          onCancel={() => {
            setShowUserForm(false);
            setEditingUser(null);
          }}
          loading={formLoading}
          initialData={editingUser ? {
            email: editingUser.email,
            name: editingUser.name || editingUser.firstName || editingUser.lastName || '',
          } : undefined}
          mode={editingUser ? 'edit' : 'create'}
        />
      )}
    </div>
  );
}
