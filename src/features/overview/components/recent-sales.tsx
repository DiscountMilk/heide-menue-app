import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const salesData = [
  // your existing sales data
];

export async function RecentSales() {
  // Remove the await before cookies()
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Fetch all data from the customer table
  const { data: customers, error } = await supabase
    .from('customer')
    .select('*');

  // Log the error if there's any issue with the query
  if (error) {
    console.error('Error fetching customer data:', error);
  }

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>
          {customers && customers.length > 0
            ? JSON.stringify(customers)
            : 'No customer data available'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {salesData.map((sale, index) => (
            <div key={index} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={sale.avatar} alt='Avatar' />
                <AvatarFallback>{sale.fallback}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm leading-none font-medium'>{sale.name}</p>
                <p className='text-muted-foreground text-sm'>{sale.email}</p>
              </div>
              <div className='ml-auto font-medium'>{sale.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
