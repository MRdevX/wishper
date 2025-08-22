# @repo/admin

Shared admin components for the Wishper application.

## Components

### AdminLayout

A responsive admin layout with sidebar navigation.

```tsx
import { AdminLayout } from "@repo/admin";

<AdminLayout title="Users" description="Manage user accounts">
  {/* Your content */}
</AdminLayout>;
```

### DataTable

A reusable data table component with search and sorting capabilities.

```tsx
import { DataTable } from "@repo/admin";

<DataTable columns={columns} data={data} searchKey="email" searchPlaceholder="Search by email..." />;
```

### ActionButtons

Reusable action buttons for table rows.

```tsx
import { ActionButtons } from "@repo/admin";

<ActionButtons
  onView={() => console.log("View")}
  onEdit={() => console.log("Edit")}
  onDelete={() => console.log("Delete")}
  showExternalLink={true}
  externalLinkUrl="https://example.com"
/>;
```

### StatsCard

A card component for displaying statistics.

```tsx
import { StatsCard } from "@repo/admin";
import { Users } from "lucide-react";

<StatsCard title="Total Users" value="1,234" description="+12% from last month" icon={Users} />;
```

## Usage

This package is designed to be used in admin panels and provides consistent UI components across different admin interfaces.

## Dependencies

- `@repo/ui` - Base UI components
- `@tanstack/react-table` - Table functionality
- `lucide-react` - Icons
