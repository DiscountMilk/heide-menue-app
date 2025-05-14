import { Customer, Order } from '@/constants/data';
import { fakeDatabase } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { OrderTable } from './order-tables';
import { columns } from '@/features/order/components/order-tables/columns';

type OrderListingPage = {};

export default async function OrderListingPage({}: OrderListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const data = await fakeDatabase.getPaginatedOrders(filters);
  const totalOrders = data.total_orders;
  const orders: Order[] = data.orders;

  return (
    <OrderTable data={orders} totalItems={totalOrders} columns={columns} />
  );
}
