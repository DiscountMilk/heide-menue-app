'use client';

import { FileUploader } from '@/components/file-uploader';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Order } from '@/constants/mock-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  date_delivery: z.string(),
  customer_id: z.string(),
  amount: z.number().min(1),
  additional_info: z.string().optional(),
  product_id: z.string()
});

export default function OrderForm({
  initialData,
  pageTitle
}: {
  initialData: Order | null;
  pageTitle: string;
}) {
  const defaultValues = {
    date_delivery: initialData?.date_delivery
      ? new Date(initialData.date_delivery).toISOString().split('T')[0]
      : '',
    customer_id: initialData?.customer_id || '',
    amount: initialData?.amount || 0,
    additional_info: initialData?.additional_info || '',
    product_id: initialData?.product_id || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Form submission logic would be implemented here
    console.log(values);
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
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='date_delivery'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Date</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        placeholder='Enter delivery date'
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='product_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Product' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='gelb'>Gelb</SelectItem>
                        <SelectItem value='rot'>Rot</SelectItem>
                        <SelectItem value='gruen'>Grün</SelectItem>
                        <SelectItem value='blau'>Blau</SelectItem>
                        <SelectItem value='gold'>Gold</SelectItem>
                        <SelectItem value='international'>
                          International
                        </SelectItem>
                        <SelectItem value='salat'>Salatplatte</SelectItem>
                        <SelectItem value='kalt'>
                          Kaltplatte oder Süßspeise
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='customer_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Customer' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='customer1'>Customer 1</SelectItem>
                        <SelectItem value='customer2'>Customer 2</SelectItem>
                        <SelectItem value='customer3'>Customer 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter amount'
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='additional_info'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter Additional Information'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit'>Add Order</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
