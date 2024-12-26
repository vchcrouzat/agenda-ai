import React, { useState } from 'react';
import { Plus, Tag, X } from 'lucide-react';
import { EventFormData } from '../../types/event';
import { useLanguage } from '../../contexts/LanguageContext';

interface EventFormProps {
  onSubmit: (event: EventFormData) => void;
  initialData?: EventFormData;
}

export function EventForm({ onSubmit, initialData }: EventFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<EventFormData>(
    initialData || {
      title: '',
      description: '',
      date: '',
      time: '',
      tags: [],
      reminder: false,
    }
  );
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">{t('form', 'title')}</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">{t('form', 'description')}</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('form', 'date')}</label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.date}
            onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t('form', 'time')}</label>
          <input
            type="time"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.time}
            onChange={e => setFormData(prev => ({ ...prev, time: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">{t('form', 'tags')}</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <button
            type="button"
            onClick={addTag}
            className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
            >
              <Tag size={14} className="mr-1" />
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 hover:text-blue-900"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="reminder"
          className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          checked={formData.reminder}
          onChange={e => setFormData(prev => ({ ...prev, reminder: e.target.checked }))}
        />
        <label htmlFor="reminder" className="ml-2 text-sm text-gray-700">
          {t('form', 'reminder')}
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {t('form', 'save')}
      </button>
    </form>
  );
}