import React from 'react';
import { Calendar, Clock, Tag, Trash2, Edit2 } from 'lucide-react';
import { CalendarEvent } from '../../types/event';

interface EventListProps {
  events: CalendarEvent[];
  onEdit: (event: CalendarEvent) => void;
  onDelete: (id: string) => void;
}

export function EventList({ events, onEdit, onDelete }: EventListProps) {
  return (
    <div className="space-y-4">
      {events.map(event => (
        <div
          key={event.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(event)}
                className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="p-1 text-gray-500 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          
          <p className="mt-1 text-gray-600">{event.description}</p>
          
          <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              {event.date}
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              {event.time}
            </div>
          </div>

          {event.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {event.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700"
                >
                  <Tag size={12} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}