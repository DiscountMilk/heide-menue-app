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
import React, { useEffect, useState } from 'react';
import { Customer, Product, Order } from '@/constants/data';
import { DateRange } from 'react-day-picker';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { de } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';

const formSchema = z.object({
  date_delivery: z.date(),
  customer_id: z.number(),
  price: z.number().min(1),
  product_id: z.number()
});

type OrderFormProps = {
  customerId: number;
  order?: Order;
};

export default function OrderForm({ customerId, order }: OrderFormProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<DateRange>({
    from: startOfWeek(new Date(), { weekStartsOn: 1 }),
    to: endOfWeek(new Date(), { weekStartsOn: 1 })
  });

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      setSelectedWeek({
        from: startOfWeek(range.from, { weekStartsOn: 1 }),
        to: endOfWeek(range.from, { weekStartsOn: 1 })
      });
    }
  };

  //todo save order

  //todo get products

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          Week Menu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col space-y-4'>
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
                    {format(selectedWeek.from, 'dd.MM.yyyy', { locale: de })} -{' '}
                    {format(selectedWeek.to, 'dd.MM.yyyy', { locale: de })}
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
                onSelect={handleSelect}
                numberOfMonths={1}
                locale={de}
                weekStartsOn={1}
                showOutsideDays
              />
            </PopoverContent>
          </Popover>

          {selectedWeek?.from && selectedWeek?.to && (
            <div className='bg-muted rounded-md p-4'>
              <h3 className='mb-2 font-medium'>
                Menu for CW {format(selectedWeek.from, 'w', { locale: de })}
              </h3>
              <div className='mt-4 grid grid-cols-1 gap-2'>
                {/* Hier könnten die Menüeinträge für jede einzelne Woche angezeigt werden */}
                <div className='bg-background rounded-md border p-3'>
                  <div className='font-medium'>Monday</div>
                  <div className='text-muted-foreground text-sm'>blabla...</div>
                </div>
                {/* Weitere Wochentage könnten hier hinzugefügt werden */}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
