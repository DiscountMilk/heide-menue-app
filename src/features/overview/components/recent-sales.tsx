import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { supabase } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const salesData = [1, 2, 3, 4];

export async function RecentSales() {
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
              <Avatar className='h-9 w-9'></Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm leading-none font-medium'>blabla</p>
                <p className='text-muted-foreground text-sm'>blabla</p>
              </div>
              <div className='ml-auto font-medium'>blabla</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
