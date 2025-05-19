'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { supabase } from '@/utils/supabase/client';
import { Product } from '@/constants/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Product name must be at least 2 characters.' }),
  sales_price: z.coerce
    .number()
    .min(0, { message: 'Price must be a positive number.' }),
  purchase_price: z.coerce
    .number()
    .min(0, { message: 'Price must be a positive number.' })
});

export default function ProductForm({
  initialData,
  pageTitle
}: {
  initialData: Product | null;
  pageTitle: string;
}) {
  const defaultValues = {
    name: initialData?.name || '',
    sales_price: initialData?.sales_price || 0,
    purchase_price: initialData?.purchase_price || 0
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Form submitted:', values);

      // Check if we're updating an existing customer or creating a new one
      if (initialData?.id) {
        // Update existing customer
        const { data, error } = await supabase
          .from('products')
          .update({
            name: values.name,
            sales_price: values.sales_price,
            purchase_price: values.purchase_price
          })
          .eq('id', initialData.id)
          .select();

        if (error) {
          console.error('Error updating data:', error.message);
          alert('Error updating customer: ' + error.message);
          return;
        }

        console.log('Data updated successfully:', data);
      } else {
        // Insert new customer
        const { data, error } = await supabase
          .from('products')
          .insert([
            {
              name: values.name,
              sales_price: values.sales_price,
              purchase_price: values.purchase_price
            }
          ])
          .select();

        if (error) {
          console.error('Error inserting data:', error.message);
          alert('Error creating customer: ' + error.message);
          return;
        }

        console.log('Data inserted successfully:', data);
      }

      router.refresh();
      router.push('/dashboard/product');
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Ein unerwarteter Fehler ist aufgetreten.');
    }
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='space-y-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter product name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sales_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sales Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        placeholder='Enter price'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='purchase_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        placeholder='Enter price'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit'>
              {initialData?.id ? 'Update Product' : 'Create Product'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
