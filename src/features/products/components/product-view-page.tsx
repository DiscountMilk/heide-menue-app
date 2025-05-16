import { Product } from '@/constants/data';
import { notFound } from 'next/navigation';
import ProductForm from './product-form';
import { supabase } from '@/utils/supabase/server';

type TProductViewPageProps = {
  productId: string;
};

export default async function ProductViewPage({
  productId
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Product';

  if (productId !== 'new') {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('id', productId)
      .single();

    if (error || !data) {
      console.error('Error fetching Product:', error);
      notFound();
    }
    product = data as Product;
    pageTitle = `Edit Product ${productId}`;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
