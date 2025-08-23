'use client';

import { AdminPage } from '@/components/admin/admin-page';
import { UserForm } from '@repo/ui';
import { apiClient, User } from '@/lib/api';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const user = row.original;
      return <div className='font-medium text-gray-900'>{user.name || 'No name provided'}</div>;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <span className='text-gray-700'>{row.original.email}</span>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => (
      <div className='text-sm text-gray-500'>
        {new Date(row.original.createdAt).toLocaleDateString()}
      </div>
    ),
  },
];

export default function UsersPage() {
  return (
    <AdminPage
      title='Users'
      description='Manage user accounts'
      columns={columns}
      apiMethods={{
        get: apiClient.getUsers,
        create: apiClient.createUser,
        update: apiClient.updateUser,
        delete: apiClient.deleteUser,
      }}
      searchKey='email'
      searchPlaceholder='Search users by email...'
      FormComponent={UserForm}
    />
  );
}
