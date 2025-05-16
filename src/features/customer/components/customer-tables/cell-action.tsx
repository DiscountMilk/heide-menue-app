'use client';

import { supabase } from '@/utils/supabase/client';

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Customer } from '@/constants/data';
import {
  IconEdit,
  IconDotsVertical,
  IconTrash,
  IconCash
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: Customer;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    try {
      console.log('Form submitted:', data);

      const { error: deleteError } = await supabase
        .from('customer')
        .delete()
        .eq('id', data.id);

      if (deleteError) {
        console.error('Error deleting data:', deleteError.message);
        alert('Fehler löschen des Kunden: ' + deleteError.message);
        return;
      }

      console.log('Data deleted successfully:', data);
      setOpen(false);
      router.refresh();
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Ein unerwarteter Fehler ist aufgetreten.');
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <IconDotsVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/customer/${data.id}`)}
          >
            <IconEdit className='mr-2 h-4 w-4' /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/orders/new`)}
          >
            <IconCash className='mr-2 h-4 w-4' /> Create Order
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <IconTrash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
