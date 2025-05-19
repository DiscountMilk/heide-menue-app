'use client';

import { supabase } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Customer, Product, Order } from '@/constants/data';
import { DateRange } from 'react-day-picker';
import { format, startOfWeek, endOfWeek, addDays } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { de } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { IconTrash, IconPlus } from '@tabler/icons-react';

const orderItemSchema = z.object({
  product_id: z.number().min(1, 'Select Meal'),
  amount: z.number().min(1),
  sales_price: z.number().min(0),
  purchase_price: z.number().min(0)
});

const dayOrderSchema = z.object({
  customer_id: z.number(),
  date_delivery: z.date(),
  items: z.array(orderItemSchema)
});

const formSchema = z.object({
  weekOrders: z.array(
    z.object({
      customer_id: z.number(),
      date_delivery: z.date(),
      items: z.array(orderItemSchema).optional().default([])
    })
  )
});

type OrderItem = z.infer<typeof orderItemSchema>;

type WeekDay = {
  date: Date;
  dayLabel: string;
};

type OrderFormProps = {
  customerId: number;
  order?: Order;
};

export default function OrderFormNewWeek({ customerId }: OrderFormProps) {
  const router = useRouter();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<DateRange>({
    from: startOfWeek(new Date(), { weekStartsOn: 1 }),
    to: endOfWeek(new Date(), { weekStartsOn: 1 })
  });
  const [weekDays, setWeekDays] = useState<WeekDay[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weekOrders: []
    }
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  // Generate weekdays whenever the selectedWeek changes
  useEffect(() => {
    if (selectedWeek.from && selectedWeek.to) {
      const days: WeekDay[] = [];
      const startDate = selectedWeek.from;
      const endDate = selectedWeek.to;

      let currentDate = new Date(startDate);

      // Create an array of weekdays (Monday to Friday only)
      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        // Only include Monday (1) through Friday (5)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          days.push({
            date: new Date(currentDate),
            dayLabel: format(currentDate, 'EEEE, dd.MM.yyyy', { locale: de })
          });
        }
        currentDate = addDays(currentDate, 1);
      }

      setWeekDays(days);

      // Initialize form with empty day orders
      const initialWeekOrders = days.map((day) => ({
        customer_id: customerId,
        date_delivery: day.date,
        items: [] // Start with empty items array
      }));

      form.reset({ weekOrders: initialWeekOrders });
    }
  }, [selectedWeek, customerId, form]);

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      setSelectedWeek({
        from: startOfWeek(range.from, { weekStartsOn: 1 }),
        to: endOfWeek(range.from, { weekStartsOn: 1 })
      });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Form submitted:', values);

      // Filter out days with no items
      const ordersToSave = values.weekOrders
        .filter((dayOrder) => dayOrder.items && dayOrder.items.length > 0)
        .map((dayOrder) => ({
          customer_id: dayOrder.customer_id,
          date_delivery: dayOrder.date_delivery,
          items: dayOrder.items || []
        }));

      // For each day with items, save as separate order
      if (ordersToSave.length > 0) {
        // Save orders to database logic would go here
        // For example:
        // const { data, error } = await supabase.from('orders').insert(ordersToSave);

        alert('Orders saved successfully!');
        // Redirect or refresh as needed
        // router.push('/orders');
      } else {
        alert('No orders to save. Please add at least one item to a day.');
      }
    } catch (error) {
      console.error('Error saving orders:', error);
      alert('Failed to save orders. Please try again.');
    }
  }

  const addItemToDay = (dayIndex: number) => {
    const currentItems = form.getValues(`weekOrders.${dayIndex}.items`) || [];

    form.setValue(`weekOrders.${dayIndex}.items`, [
      ...currentItems,
      {
        product_id: 0,
        amount: 1,
        sales_price: 0,
        purchase_price: 0
      }
    ]);
  };

  const removeItemFromDay = (dayIndex: number, itemIndex: number) => {
    const currentItems = form.getValues(`weekOrders.${dayIndex}.items`) || [];
    const updatedItems = [...currentItems];
    updatedItems.splice(itemIndex, 1);
    form.setValue(`weekOrders.${dayIndex}.items`, updatedItems);
  };

  const handleProductChange = (
    dayIndex: number,
    itemIndex: number,
    productId: number
  ) => {
    // Update product ID
    form.setValue(
      `weekOrders.${dayIndex}.items.${itemIndex}.product_id`,
      productId
    );

    // Find the selected product and set its prices
    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    if (selectedProduct) {
      form.setValue(
        `weekOrders.${dayIndex}.items.${itemIndex}.sales_price`,
        selectedProduct.sales_price || 0
      );
      form.setValue(
        `weekOrders.${dayIndex}.items.${itemIndex}.purchase_price`,
        selectedProduct.purchase_price || 0
      );
    }
  };

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          Week Menu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !selectedWeek && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {selectedWeek?.from && selectedWeek?.to ? (
                    <span>
                      {format(selectedWeek.from, 'dd.MM.yyyy', { locale: de })}{' '}
                      - {format(selectedWeek.to, 'dd.MM.yyyy', { locale: de })}
                    </span>
                  ) : (
                    <span>Select Week</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  initialFocus
                  mode='range'
                  defaultMonth={new Date()}
                  selected={selectedWeek}
                  onSelect={handleSelect}
                  numberOfMonths={1}
                  locale={de}
                  weekStartsOn={1}
                  showOutsideDays
                />
              </PopoverContent>
            </Popover>
            {selectedWeek?.from && selectedWeek?.to && (
              <div className='bg-muted space-y-4 rounded-md p-4'>
                <h3 className='mb-2 font-medium'>
                  Menu for CW {format(selectedWeek.from, 'w', { locale: de })}
                </h3>
                <div className='space-y-4'>
                  {weekDays.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className='bg-background w-full space-y-4 rounded-md border p-3'
                    >
                      <div className='font-medium'>{day.dayLabel}</div>

                      {form
                        .watch(`weekOrders.${dayIndex}.items`)
                        ?.map((item, itemIndex) => (
                          <div
                            key={`${dayIndex}-${itemIndex}`}
                            className='flex items-center gap-2'
                          >
                            <FormField
                              control={form.control}
                              name={`weekOrders.${dayIndex}.items.${itemIndex}.product_id`}
                              render={({ field }) => (
                                <FormItem className='flex-1'>
                                  <Select
                                    onValueChange={(value) =>
                                      handleProductChange(
                                        dayIndex,
                                        itemIndex,
                                        Number(value)
                                      )
                                    }
                                    value={
                                      field.value > 0 ? String(field.value) : ''
                                    }
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder='Select Meal' />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {products.map((product) => (
                                        <SelectItem
                                          key={product.id}
                                          value={String(product.id)}
                                        >
                                          {product.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className='flex items-center gap-2'>
                              <FormField
                                control={form.control}
                                name={`weekOrders.${dayIndex}.items.${itemIndex}.amount`}
                                render={({ field }) => (
                                  <FormItem className='w-24'>
                                    <FormControl>
                                      <Input
                                        type='number'
                                        min='1'
                                        step='1'
                                        placeholder='Amount'
                                        {...field}
                                        onChange={(e) =>
                                          field.onChange(Number(e.target.value))
                                        }
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button
                                type='button'
                                variant='ghost'
                                onClick={() =>
                                  removeItemFromDay(dayIndex, itemIndex)
                                }
                              >
                                <IconTrash className='h-4 w-4' />
                              </Button>
                            </div>
                          </div>
                        ))}

                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        className='w-full'
                        onClick={() => addItemToDay(dayIndex)}
                      >
                        <IconPlus className='mr-2 h-4 w-4' /> Add Item
                      </Button>
                    </div>
                  ))}
                </div>

                <Button type='submit' className='mt-6'>
                  Save Orders
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
