'use client';

import { ReactNode } from 'react';
import { ProtectedRoute } from '@/features/auth/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageLayout } from '@/components/layout/page-layout';
import { LoadingState, ErrorState } from '@repo/ui';

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  requireAuth?: boolean;
  useDashboardLayout?: boolean;
  loadingTitle?: string;
  loadingDescription?: string;
  errorTitle?: string;
  errorDescription?: string;
}

export function PageWrapper({
  children,
  title,
  description,
  actions,
  loading = false,
  error = null,
  onRetry,
  requireAuth = true,
  useDashboardLayout = true,
  loadingTitle = 'Loading',
  loadingDescription = 'Please wait while we load the content',
  errorTitle = 'Error',
  errorDescription = 'Something went wrong',
}: PageWrapperProps) {
  const content = (
    <>
      {loading && <LoadingState title={loadingTitle} description={loadingDescription} />}

      {error && (
        <ErrorState
          title={errorTitle}
          description={errorDescription}
          error={error}
          onRetry={onRetry}
        />
      )}

      {!loading &&
        !error &&
        (title ? (
          <PageLayout title={title} description={description} actions={actions}>
            {children}
          </PageLayout>
        ) : (
          children
        ))}
    </>
  );

  const wrappedContent = useDashboardLayout ? (
    <DashboardLayout>{content}</DashboardLayout>
  ) : (
    content
  );

  return requireAuth ? <ProtectedRoute>{wrappedContent}</ProtectedRoute> : wrappedContent;
}
