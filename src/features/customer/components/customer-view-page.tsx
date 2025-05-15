import { fakeDatabase, Customer } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import CustomerForm from './customer-form';

type TCustomerViewPageProps = {
  customerId: string;
};

export default async function CustomerViewPage({
  customerId
}: TCustomerViewPageProps) {
  let customer = null;
  let pageTitle = 'Create new customer';

  if (customerId !== 'new') {
    const data = await fakeDatabase.getCustomerById(Number(customerId));
    customer = data.customer as Customer;
    if (!customer) {
      notFound();
    }
    pageTitle = `Edit customer ${customerId}`;
  }

  return <CustomerForm initialData={customer} pageTitle={pageTitle} />;
}
