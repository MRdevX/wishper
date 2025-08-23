import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';
import { DataTable } from './data-table';
import { ColumnDef } from '@tanstack/react-table';

interface IDataTableWrapperProps<TData, TValue> {
  title: string;
  description?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
}

export function DataTableWrapper<TData, TValue>({
  title,
  description,
  columns,
  data,
  searchKey,
  searchPlaceholder,
}: IDataTableWrapperProps<TData, TValue>) {
  return (
    <Card className='border-gray-200'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-lg'>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={data}
          searchKey={searchKey}
          searchPlaceholder={searchPlaceholder}
        />
      </CardContent>
    </Card>
  );
}
