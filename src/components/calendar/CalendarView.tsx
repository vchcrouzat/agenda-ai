import React from 'react';
import { CalendarEvent } from '../../types/event';
import { CalendarHeader } from './CalendarHeader';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { DayView } from './DayView';

interface CalendarViewProps {
  events: CalendarEvent[];
  view: string;
  onViewChange: (view: string) => void;
  onAddEvent: () => void;
  onDayClick?: (date: string) => void;
}

export function CalendarView({ 
  events, 
  view, 
  onViewChange, 
  onAddEvent,
  onDayClick 
}: CalendarViewProps) {
  const renderView = () => {
    switch (view) {
      case 'day':
        return <DayView events={events} />;
      case 'week':
        return <WeekView events={events} />;
      default:
        return <MonthView events={events} onDayClick={onDayClick} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <CalendarHeader
        onViewChange={onViewChange}
        currentView={view}
        onAddEvent={onAddEvent}
      />
      <div className="p-4">
        {renderView()}
      </div>
    </div>
  );
}