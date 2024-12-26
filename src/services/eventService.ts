import { Database } from 'sql.js-httpvfs';
import { CalendarEvent, EventFormData } from '../types/event';
import { initDb } from '../db/database';

export const eventService = {
  async getAllEvents(): Promise<CalendarEvent[]> {
    try {
      const db = await initDb();
      const result = await db.exec(`
        SELECT 
          e.*,
          GROUP_CONCAT(et.tag) as tags
        FROM events e
        LEFT JOIN event_tags et ON e.id = et.event_id
        GROUP BY e.id
        ORDER BY date ASC, time ASC
      `);

      if (!result || result.length === 0) return [];

      return result[0].values.map(row => ({
        id: row[0] as string,
        title: row[1] as string,
        description: row[2] as string || '',
        date: row[3] as string,
        time: row[4] as string,
        reminder: Boolean(row[5]),
        tags: row[7] ? (row[7] as string).split(',') : []
      }));
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  async createEvent(eventData: EventFormData): Promise<CalendarEvent> {
    const db = await initDb();
    const id = crypto.randomUUID();
    const { title, description, date, time, reminder, tags } = eventData;

    try {
      // Insert event
      await db.exec(`
        INSERT INTO events (id, title, description, date, time, reminder)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [id, title, description || '', date, time, reminder ? 1 : 0]);

      // Insert tags
      if (tags.length > 0) {
        const tagValues = tags.map(tag => `('${id}', '${tag}')`).join(',');
        await db.exec(`
          INSERT INTO event_tags (event_id, tag)
          VALUES ${tagValues}
        `);
      }

      return { ...eventData, id };
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  async updateEvent(id: string, eventData: EventFormData): Promise<void> {
    const db = await initDb();
    const { title, description, date, time, reminder, tags } = eventData;

    try {
      // Update event
      await db.exec(`
        UPDATE events
        SET title = ?, description = ?, date = ?, time = ?, reminder = ?
        WHERE id = ?
      `, [title, description || '', date, time, reminder ? 1 : 0, id]);

      // Update tags
      await db.exec('DELETE FROM event_tags WHERE event_id = ?', [id]);
      
      if (tags.length > 0) {
        const tagValues = tags.map(tag => `('${id}', '${tag}')`).join(',');
        await db.exec(`
          INSERT INTO event_tags (event_id, tag)
          VALUES ${tagValues}
        `);
      }
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  async deleteEvent(id: string): Promise<void> {
    try {
      const db = await initDb();
      await db.exec('DELETE FROM events WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },

  async searchEvents(query: string): Promise<CalendarEvent[]> {
    try {
      const db = await initDb();
      const searchTerm = `%${query}%`;
      
      const result = await db.exec(`
        SELECT DISTINCT
          e.*,
          GROUP_CONCAT(et.tag) as tags
        FROM events e
        LEFT JOIN event_tags et ON e.id = et.event_id
        WHERE 
          e.title LIKE ?
          OR e.description LIKE ?
          OR EXISTS (
            SELECT 1 
            FROM event_tags 
            WHERE event_id = e.id AND tag LIKE ?
          )
        GROUP BY e.id
        ORDER BY e.date ASC, e.time ASC
      `, [searchTerm, searchTerm, searchTerm]);

      if (!result || result.length === 0) return [];

      return result[0].values.map(row => ({
        id: row[0] as string,
        title: row[1] as string,
        description: row[2] as string || '',
        date: row[3] as string,
        time: row[4] as string,
        reminder: Boolean(row[5]),
        tags: row[7] ? (row[7] as string).split(',') : []
      }));
    } catch (error) {
      console.error('Error searching events:', error);
      throw error;
    }
  }
};