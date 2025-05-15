'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, endOfWeek, startOfWeek } from 'date-fns';
import { de } from 'date-fns/locale';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function OrderCalendarWeekMenu() {
  const [selectedWeek, setSelectedWeek] = useState<DateRange>({
    from: startOfWeek(new Date(), { weekStartsOn: 1 }),
    to: endOfWeek(new Date(), { weekStartsOn: 1 })
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      setSelectedWeek({
        from: startOfWeek(range.from, { weekStartsOn: 1 }),
        to: endOfWeek(range.from, { weekStartsOn: 1 })
      });
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
              <p className='text-muted-foreground mb-2 text-sm'>
                {format(selectedWeek.from, 'dd.MM.yyyy', { locale: de })} -{' '}
                {format(selectedWeek.to, 'dd.MM.yyyy', { locale: de })}
              </p>
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
