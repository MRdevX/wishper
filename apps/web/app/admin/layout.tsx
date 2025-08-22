import { AdminLayout as AdminLayoutComponent } from "@repo/admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutComponent>{children}</AdminLayoutComponent>;
}
