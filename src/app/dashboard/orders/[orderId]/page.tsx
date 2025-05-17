import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import OrderViewPage from '@/features/order/components/order-view-page';

export const metadata = {
  title: 'Dashboard : Order View'
};

type PageProps = {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ customerId: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const { orderId } = resolvedParams;

  const resolvedSearchParams = await searchParams;
  const { customerId } = resolvedSearchParams;

  console.log('Page', { orderId, customerId });

  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <OrderViewPage orderId={orderId} customerId={customerId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
