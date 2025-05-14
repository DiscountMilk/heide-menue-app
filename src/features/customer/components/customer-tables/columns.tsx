'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Customer } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Text } from 'lucide-react';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Customer>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<Customer, unknown> }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Customer['name']>()}</div>,
    meta: {
      label: 'Name',
      placeholder: 'Suchen ...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'adress',
    header: 'ADRESSE'
  },
  {
    accessorKey: 'phone',
    header: 'TELEFONNUMMER'
  },
  {
    accessorKey: 'payment_method',
    header: 'BEZAHLMETHODE'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
