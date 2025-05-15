'use client';

import { supabase } from '@/utils/supabase/client';

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
import { Customer } from '@/constants/mock-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  adress: z.string(),
  phone: z.string(),
  payment_method: z.number(),
  additional_info: z.string().optional()
});

export default function CustomerForm({
  initialData,
  pageTitle
}: {
  initialData: Customer | null;
  pageTitle: string;
}) {
  const defaultValues = {
    id: initialData?.id || '',
    additional_info: initialData?.additional_info || '',
    name: initialData?.name || '',
    adress: initialData?.adress || '',
    phone: initialData?.phone || '',
    payment_method: Number(initialData?.phone) || 1
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Form submitted:', values);

      const { data, error } = await supabase
        .from('customer')
        .insert([
          {
            name: values.name,
            adress: values.adress,
            phone: values.phone,
            payment_method: values.payment_method,
            additional_info: values.additional_info
          }
        ])
        .select();

      if (error) {
        console.error('Error inserting data:', error.message);
        alert('Fehler beim Hinzufügen des Kunden: ' + error.message);
        return;
      }

      console.log('Data inserted successfully:', data);
      alert('Kunde erfolgreich hinzugefügt!');
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
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='adress'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adress</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Adress' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Phone Number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='payment_method'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select categories' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='1'>Cash</SelectItem>
                        <SelectItem value='2'>Überweisung</SelectItem>
                        <SelectItem value='3'>Lastschrift</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Textarea placeholder='Enter Text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit'>Add Customer</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
