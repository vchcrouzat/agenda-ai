import React, { useState } from 'react';
import { CalendarView } from './components/calendar/CalendarView';
import { SearchSection } from './components/search/SearchSection';
import { EventList } from './components/events/EventList';
import { EventForm } from './components/events/EventForm';
import { LanguageProvider } from './contexts/LanguageContext';
import { useEvents } from './hooks/useEvents';
import { CalendarEvent } from './types/event';

function App() {
  const { events, searchQuery, addEvent, updateEvent, deleteEvent, searchEvents } = useEvents();
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [currentView, setCurrentView] = useState('month');
  const [selectedDate, setSelectedDate] = useState('');

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setShowForm(true);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <CalendarView
            events={events}
            view={currentView}
            onViewChange={setCurrentView}
            onAddEvent={() => {
              setEditingEvent(null);
              setSelectedDate('');
              setShowForm(!showForm);
            }}
            onDayClick={handleDayClick}
          />

          <SearchSection 
            value={searchQuery}
            onChange={searchEvents}
          />

          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <EventForm
                onSubmit={(eventData) => {
                  if (editingEvent) {
                    updateEvent(editingEvent.id, eventData);
                  } else {
                    addEvent({
                      ...eventData,
                      date: selectedDate || eventData.date
                    });
                  }
                  setShowForm(false);
                  setEditingEvent(null);
                  setSelectedDate('');
                }}
                initialData={editingEvent || (selectedDate ? { 
                  title: '',
                  description: '',
                  date: selectedDate,
                  time: '',
                  tags: [],
                  reminder: false
                } : undefined)}
              />
            </div>
          )}

          <EventList
            events={events}
            onEdit={(event) => {
              setEditingEvent(event);
              setSelectedDate('');
              setShowForm(true);
            }}
            onDelete={deleteEvent}
          />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;