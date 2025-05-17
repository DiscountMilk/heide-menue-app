import { Customer } from '@/constants/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type OrderCustomerShortViewProps = { customer: Customer };

export default function OrderCustomerShortView({
  customer
}: OrderCustomerShortViewProps) {
  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>Customer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-left'>
          <p>{customer.name}</p>
          <p>{customer.adress}</p>
          <p>{customer.phone}</p>
          <p>ID: {customer.id}</p>
          <p>Info: {customer.additional_info}</p>
        </div>
      </CardContent>
    </Card>
  );
}
