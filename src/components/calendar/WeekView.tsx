import React from 'react';
import { CalendarEvent } from '../../types/event';

interface WeekViewProps {
  events: CalendarEvent[];
}

export function WeekView({ events }: WeekViewProps) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  const getEventsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {weekDays.map(day => {
        const dayEvents = getEventsForDay(day);
        const isToday = day.toDateString() === today.toDateString();

        return (
          <div
            key={day.toISOString()}
            className={`min-h-[200px] p-2 rounded-lg ${
              isToday ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white border border-gray-200'
            }`}
          >
            <div className="text-center mb-2">
              <div className="text-sm font-medium text-gray-500">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={`text-lg font-semibold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                {day.getDate()}
              </div>
            </div>
            <div className="space-y-1">
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  className="bg-blue-100 text-blue-700 p-2 rounded text-sm"
                >
                  <div className="font-medium truncate">{event.title}</div>
                  <div className="text-xs">{event.time}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}