import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { searchParamsCache } from '@/lib/searchparams';
import { CustomerTable } from './customer-tables';
import { columns } from './customer-tables/columns';

type CustomerListingPage = {};

export default async function CustomerListingPage({}: CustomerListingPage) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Get search params
  const pageParam = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimitParam = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  // Parse pagination parameters with defaults
  const page = pageParam ? parseInt(String(pageParam)) : 1;
  const limit = pageLimitParam ? parseInt(String(pageLimitParam)) : 10;

  // Calculate offset for pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Start building the query
  let query = supabase
    .from('customer')
    .select('*, payment_methods(method)', { count: 'exact' });

  // Add search filter if provided
  if (search) {
    query = query.or(
      `name.ilike.%${search}%, adress.ilike.%${search}%, phone.ilike.%${search}%, id.ilike.%${search}%`
    );
  }

  // Add category filter if provided
  if (categories) {
    query = query.eq('category', categories);
  }

  // Add pagination
  query = query.range(from, to);

  // Execute the query
  const { data: customers, count: totalCustomer, error } = await query;

  if (error) {
    console.error('Error fetching customers:', error);
  }

  return (
    <CustomerTable
      data={customers || []}
      totalItems={totalCustomer || 0}
      columns={columns}
    />
  );
}
