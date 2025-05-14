import { Customer } from '@/constants/data';
import { fakeDatabase } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { CustomerTable } from './customer-tables';
import { columns } from './customer-tables/columns';

type CustomerListingPage = {};

export default async function CustomerListingPage({}: CustomerListingPage) {
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

  const data = await fakeDatabase.getPaginatedCustomers(filters);
  const totalCustomer = data.total_customers;
  const customers: Customer[] = data.customers;

  return (
    <CustomerTable
      data={customers}
      totalItems={totalCustomer}
      columns={columns}
    />
  );
}
