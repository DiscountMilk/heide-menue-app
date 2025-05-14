'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Order } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle } from 'lucide-react';
import { CellAction } from './cell-action';
import { CATEGORY_OPTIONS } from './options';

export const columns: ColumnDef<Order>[] = [
  {
    id: 'date_delivery',
    accessorKey: 'date_delivery',
    header: ({ column }: { column: Column<Order, unknown> }) => (
      <DataTableColumnHeader column={column} title='Delivery Date' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Order['date_delivery']>()}</div>,
    meta: {
      label: 'Delivery Date',
      placeholder: 'Search ...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'customer_id',
    header: 'CUSTOMER ID'
  },
  {
    accessorKey: 'product_id',
    header: 'PRODUCT ID'
  },
  {
    accessorKey: 'amount',
    header: 'AMOUNT'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
