export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  tags: string[];
  reminder?: boolean;
}

export type EventFormData = Omit<CalendarEvent, 'id'>;