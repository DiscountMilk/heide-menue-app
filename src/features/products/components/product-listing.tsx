import { searchParamsCache } from '@/lib/searchparams';
import { ProductTable } from './product-tables';
import { columns } from './product-tables/columns';
import { supabase } from '@/utils/supabase/server';

type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const pageParam = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimitParam = searchParamsCache.get('perPage');

  // Parse pagination parameters with defaults
  const page = pageParam ? parseInt(String(pageParam)) : 1;
  const limit = pageLimitParam ? parseInt(String(pageLimitParam)) : 10;

  // Calculate offset for pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Start building the query
  let query = supabase.from('products').select('*', { count: 'exact' });

  // Apply single search across multiple fields
  if (search) {
    const isNumeric = /^\d+$/.test(search);
    const conditions = [`name.ilike.%${search}%`];

    if (isNumeric) conditions.push(`id.eq.${search}`);

    query = query.or(conditions.join(','));
  }

  // Add pagination
  query = query.range(from, to);

  // Execute the query
  const { data: products, count: totalProducts, error } = await query;

  console.log('Products:', products);

  if (error) console.error('Error fetching Products:', error);

  return (
    <ProductTable
      data={products || []}
      totalItems={totalProducts || 0}
      columns={columns}
    />
  );
}
