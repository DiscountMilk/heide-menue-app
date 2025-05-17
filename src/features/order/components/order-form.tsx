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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Customer, Product, Order } from '@/constants/data';

const formSchema = z.object({
  date_delivery: z.date(),
  customer_id: z.number(),
  price: z.number().min(1),
  product_id: z.number()
});

type OrderFormProps = {
  customer?: Customer;
  order?: Order;
  pageTitle: string;
};

export default function OrderForm({
  customer,
  order,
  pageTitle
}: OrderFormProps) {
  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>Customer</CardTitle>
      </CardHeader>
      <CardContent>{customer?.id}</CardContent>
    </Card>
  );
}
