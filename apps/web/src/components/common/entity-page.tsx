'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/features/auth/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageLayout } from '@/components/layout/page-layout';
import { LoadingState, ErrorState, useToast } from '@repo/ui';

interface IEntityPageProps<T> {
  title: string;
  description: string;
  fetchFn?: (id: string) => Promise<any>;
  updateFn?: (id: string, data: any) => Promise<any>;
  createFn?: (data: any) => Promise<any>;
  deleteFn?: (id: string) => Promise<any>;
  FormComponent?: React.ComponentType<{
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
    loading: boolean;
    initialData?: any;
    mode: 'create' | 'edit';
  }>;
  DetailsComponent?: React.ComponentType<{ data: T }>;
  mode: 'create' | 'edit' | 'view';
  redirectPath: string;
  entityName: string;
}

export function EntityPage<T>({
  title,
  description,
  fetchFn,
  updateFn,
  createFn,
  deleteFn,
  FormComponent,
  DetailsComponent,
  mode,
  redirectPath,
  entityName,
}: IEntityPageProps<T>) {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(mode !== 'create');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const entityId = params.id as string;

  useEffect(() => {
    if (mode !== 'create' && entityId && fetchFn) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetchFn(entityId);

          if (response.success && response.data) {
            setData(response.data);
          } else {
            setError(response.error || `Failed to load ${entityName}`);
          }
        } catch {
          setError(`An error occurred while loading the ${entityName}`);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [entityId, mode, fetchFn, entityName]);

  const handleSubmit = async (formData: any) => {
    try {
      setSaving(true);
      let response;

      if (mode === 'create' && createFn) {
        response = await createFn(formData);
      } else if (mode === 'edit' && updateFn) {
        response = await updateFn(entityId, formData);
      } else {
        throw new Error('Invalid mode or missing function');
      }

      if (response.success) {
        showToast(
          `${entityName} ${mode === 'create' ? 'created' : 'updated'} successfully!`,
          'success'
        );
        router.push(redirectPath);
      } else {
        showToast(`Failed to ${mode} ${entityName}: ${response.error}`, 'error');
      }
    } catch {
      showToast(
        `An error occurred while ${mode === 'create' ? 'creating' : 'updating'} the ${entityName}`,
        'error'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (mode === 'create') {
      router.push(redirectPath);
    } else {
      router.push(`${redirectPath}/${entityId}`);
    }
  };

  const handleDelete = async () => {
    if (!deleteFn) return;

    if (confirm(`Are you sure you want to delete this ${entityName}?`)) {
      try {
        const response = await deleteFn(entityId);
        if (response.success) {
          router.push(redirectPath);
        } else {
          alert(`Failed to delete ${entityName}: ${response.error}`);
        }
      } catch {
        alert(`An error occurred while deleting the ${entityName}`);
      }
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <LoadingState
            title={`Loading ${entityName}`}
            description={`Please wait while we load the ${entityName} details`}
          />
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error || (!data && mode !== 'create')) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <ErrorState
            title={`${entityName} Not Found`}
            description={`The ${entityName} you're looking for doesn't exist or you don't have permission to access it`}
            error={error || `${entityName} not found`}
            onRetry={() => window.location.reload()}
          />
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <PageLayout
          title={title}
          description={description}
          actions={
            mode === 'view' && data ? (
              <div className='flex gap-2'>
                <button
                  onClick={() => router.push(`${redirectPath}/${entityId}/edit`)}
                  className='inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className='inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Delete
                </button>
              </div>
            ) : undefined
          }
        >
          {mode === 'create' || mode === 'edit' ? (
            FormComponent ? (
              <FormComponent
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={saving}
                mode={mode}
                initialData={data}
              />
            ) : null
          ) : data && DetailsComponent ? (
            <DetailsComponent data={data} />
          ) : null}
        </PageLayout>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
