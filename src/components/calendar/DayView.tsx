import React from 'react';
import { CalendarEvent } from '../../types/event';

interface DayViewProps {
  events: CalendarEvent[];
}

export function DayView({ events }: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const today = new Date().toISOString().split('T')[0];

  const getEventsForHour = (hour: number) => {
    return events.filter(event => {
      const eventHour = parseInt(event.time.split(':')[0]);
      return event.date === today && eventHour === hour;
    });
  };

  return (
    <div className="h-[600px] overflow-y-auto">
      <div className="grid grid-cols-[60px_1fr] gap-1">
        {hours.map(hour => {
          const hourEvents = getEventsForHour(hour);
          return (
            <React.Fragment key={hour}>
              <div className="text-right pr-2 py-2 text-sm text-gray-500">
                {hour.toString().padStart(2, '0')}:00
              </div>
              <div className="border-l border-gray-200 pl-2">
                {hourEvents.map(event => (
                  <div
                    key={event.id}
                    className="bg-blue-100 text-blue-700 p-2 rounded mb-1 text-sm"
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs">{event.time}</div>
                  </div>
                ))}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}