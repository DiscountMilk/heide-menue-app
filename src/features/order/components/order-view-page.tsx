import { Order, Customer } from '@/constants/data';
import { notFound } from 'next/navigation';
import OrderFormNewWeek from './order-form-new-week';
import { supabase } from '@/utils/supabase/server';
import OrderCustomerShortView from '@/features/order/components/order-customer-short-view';

type TOrderViewPageProps = { customerId?: string; orderId?: string };

export default async function OrderViewPage(props: TOrderViewPageProps) {
  let pageTitle = 'Order';
  let order = null;

  console.log('OrderViewPage', props.customerId);

  const { data, error } = await supabase
    .from('customer')
    .select('*')
    .eq('id', props.customerId)
    .single();
  if (error || !data) {
    console.error('Error fetching customer:', error);
    notFound();
  }
  const customer = data as Customer;

  if (props.orderId !== 'new') {
    //TODO implement edit order
    pageTitle = 'Edit Order';
  }

  return (
    <>
      <OrderCustomerShortView customer={customer} pageTitle={pageTitle} />
      <OrderFormNewWeek order={order || undefined} customerId={customer.id} />
    </>
  );
}
