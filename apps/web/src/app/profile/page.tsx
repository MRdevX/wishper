'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/features/auth/protected-route';
import { useAuthContext } from '@/lib/auth-context';
import { apiClient } from '@/lib/api-client';
import { ProfileLayout } from '@/components/profile';
import type { IUpdateUserDto } from '@repo/schemas';

function ProfileContent() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (data: IUpdateUserDto) => {
    setLoading(true);

    try {
      const response = await apiClient.updateUser(user?.id || '', data);
      return response;
    } catch {
      return { success: false, error: 'An error occurred while updating your profile' };
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return <ProfileLayout user={user} onProfileUpdate={handleProfileUpdate} loading={loading} />;
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
