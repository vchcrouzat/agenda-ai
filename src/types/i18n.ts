export type Language = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt';

export interface CalendarTranslations {
  title: string;
  views: {
    day: string;
    week: string;
    month: string;
  };
  addEvent: string;
  cancel: string;
  editEvent: string;
  newEvent: string;
  searchPlaceholder: string;
  noEvents: string;
}

export interface FormTranslations {
  title: string;
  description: string;
  date: string;
  time: string;
  tags: string;
  reminder: string;
  save: string;
}

export interface Translations {
  [key: string]: {
    calendar: CalendarTranslations;
    form: FormTranslations;
  };
}