import React from 'react';
import { CalendarEvent } from '../types/event';
import { EventList } from './EventList';

interface CalendarViewProps {
  events: CalendarEvent[];
  view: string;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (id: string) => void;
}

export function CalendarView({ events, view, onEdit, onDelete }: CalendarViewProps) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const filterEvents = () => {
    switch (view) {
      case 'day':
        return events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.toDateString() === today.toDateString();
        });
      case 'week':
        return events.filter(event => {
          const eventDate = new Date(event.date);
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        });
      case 'month':
        return events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= startOfMonth && eventDate <= endOfMonth;
        });
      default:
        return events;
    }
  };

  const filteredEvents = filterEvents();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <EventList
        events={filteredEvents}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}