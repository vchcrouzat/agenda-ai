import React from 'react';
import { CalendarEvent } from '../../types/event';
import { useLanguage } from '../../contexts/LanguageContext';

interface MonthViewProps {
  events: CalendarEvent[];
  onDayClick?: (date: string) => void;
}

export function MonthView({ events, onDayClick }: MonthViewProps) {
  const { t } = useLanguage();
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDayOfMonth.getDate();

  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDay = (day: number) => {
    const date = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
    return events.filter(event => event.date === date);
  };

  const handleDayClick = (day: number) => {
    if (onDayClick) {
      const date = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
      onDayClick(date);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startingDayOfWeek }, (_, i) => (
          <div key={`empty-${i}`} className="aspect-square bg-gray-50 p-2 rounded-lg" />
        ))}

        {days.map(day => {
          const dayEvents = getEventsForDay(day);
          const isToday = day === today.getDate() && 
                         currentMonth === today.getMonth() && 
                         currentYear === today.getFullYear();

          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              className={`aspect-square p-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                isToday ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex flex-col h-full">
                <span className={`text-sm font-medium ${
                  isToday ? 'text-blue-600' : 'text-gray-700'
                }`}>
                  {day}
                </span>
                <div className="flex-1 overflow-y-auto mt-1">
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      className="text-xs p-1 mb-1 rounded bg-blue-100 text-blue-700 truncate"
                      title={event.title}
                    >
                      {event.time} {event.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}