import { useState, useEffect } from 'react';
import { CalendarEvent, EventFormData } from '../types/event';
import { eventService } from '../services/eventService';

export function useEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const loadedEvents = await eventService.getAllEvents();
      setEvents(loadedEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addEvent = async (eventData: EventFormData) => {
    try {
      const newEvent = await eventService.createEvent(eventData);
      await loadEvents();
      return newEvent;
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  };

  const updateEvent = async (id: string, eventData: EventFormData) => {
    try {
      await eventService.updateEvent(id, eventData);
      await loadEvents();
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await eventService.deleteEvent(id);
      await loadEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  };

  const searchEvents = async (query: string) => {
    try {
      setSearchQuery(query);
      if (query.trim()) {
        const searchResults = await eventService.searchEvents(query);
        setEvents(searchResults);
      } else {
        await loadEvents();
      }
    } catch (error) {
      console.error('Error searching events:', error);
      throw error;
    }
  };

  return {
    events,
    searchQuery,
    isLoading,
    addEvent,
    updateEvent,
    deleteEvent,
    searchEvents
  };
}