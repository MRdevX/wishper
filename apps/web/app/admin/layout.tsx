import { AdminLayout as AdminLayoutComponent } from '@repo/ui';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutComponent>{children}</AdminLayoutComponent>;
}
