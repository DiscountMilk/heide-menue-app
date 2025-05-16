import { Customer } from '@/constants/data';
import { notFound } from 'next/navigation';
import CustomerForm from './customer-form';
import { supabase } from '@/utils/supabase/server';

type TCustomerViewPageProps = {
  customerId: string;
};

export default async function CustomerViewPage({
  customerId
}: TCustomerViewPageProps) {
  let customer = null;
  let pageTitle = 'Create new customer';

  if (customerId !== 'new') {
    const { data, error } = await supabase
      .from('customer')
      .select('*')
      .eq('id', customerId)
      .single();

    if (error || !data) {
      console.error('Error fetching customer:', error);
      notFound();
    }
    customer = data as Customer;

    pageTitle = `Edit customer ${customerId}`;
  }

  return <CustomerForm initialData={customer} pageTitle={pageTitle} />;
}
