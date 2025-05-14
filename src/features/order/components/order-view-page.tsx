import { fakeDatabase, Order } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import OrderForm from './order-form';

type TOrderViewPageProps = {
  orderId: string;
};

export default async function OrderViewPage({ orderId }: TOrderViewPageProps) {
  let order = null;
  let pageTitle = 'Create New Order';

  if (orderId !== 'new') {
    const data = await fakeDatabase.getOrderById(Number(orderId));
    const order = data.order as Order;
    if (!order) {
      notFound();
    }
    pageTitle = `Edit Order`;
  }

  return <OrderForm initialData={order} pageTitle={pageTitle} />;
}
