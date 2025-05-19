'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Product } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Text } from 'lucide-react';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Product>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Product['name']>()}</div>,
    meta: {
      label: 'Name',
      placeholder: 'Search ...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'sales_price',
    header: 'SALES PRICE'
  },
  {
    accessorKey: 'purchase_price',
    header: 'PURCHASE PRICE'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
