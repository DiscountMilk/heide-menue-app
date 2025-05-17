import { Order, Customer } from '@/constants/data';
import { notFound } from 'next/navigation';
import OrderForm from './order-form';
import OrderCalendarWeekMenu from './order-calendar-week-menu';
import { supabase } from '@/utils/supabase/server';
import OrderCustomerShortView from '@/features/order/components/order-customer-short-view';

type TOrderViewPageProps = { customerId?: string; orderId?: string };

export default async function OrderViewPage(props: TOrderViewPageProps) {
  let pageTitle = 'Create new Order';

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
      <OrderCustomerShortView customer={customer} />
    </>
  );
}
