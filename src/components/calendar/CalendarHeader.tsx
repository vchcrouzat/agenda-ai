import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Language } from '../../types/i18n';

interface CalendarHeaderProps {
  onViewChange: (view: string) => void;
  currentView: string;
  onAddEvent: () => void;
}

export function CalendarHeader({ onViewChange, currentView, onAddEvent }: CalendarHeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const views = ['day', 'week', 'month'];

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {views.map((view) => (
            <button
              key={view}
              onClick={() => onViewChange(view)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                currentView === view
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {t('calendar', `views.${view}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            <Globe className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium">
              {language === 'en' ? '🇬🇧' : '🇪🇸'}
            </span>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 hidden group-hover:block z-50">
            {(['en', 'es'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`flex items-center w-full px-4 py-2 text-sm ${
                  language === lang ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {lang === 'en' ? '🇬🇧 English' : '🇪🇸 Español'}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onAddEvent}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {t('calendar', 'addEvent')}
        </button>
      </div>
    </div>
  );
}