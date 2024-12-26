import { createDbWorker } from 'sql.js-httpvfs';

const DB_SIZE = 5 * 1024 * 1024; // 5MB initial size
const DB_BUFFER = new Uint8Array(DB_SIZE);

let dbInstance: any = null;

export async function initDb() {
  if (dbInstance) return dbInstance;

  try {
    const worker = await createDbWorker(
      [
        {
          from: "inline",
          config: {
            serverMode: "full",
            url: "/calendar.db",
            requestChunkSize: 4096,
            serverChunkSize: 4096,
            initialData: DB_BUFFER,
            fileSize: DB_SIZE
          },
        },
      ],
      "/sqlite.worker.js",
      "/sql-wasm.wasm"
    );

    // Initialize database schema
    await worker.db.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        reminder INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS event_tags (
        event_id TEXT,
        tag TEXT,
        PRIMARY KEY (event_id, tag),
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
      CREATE INDEX IF NOT EXISTS idx_event_tags_event_id ON event_tags(event_id);
    `);

    dbInstance = worker.db;
    return dbInstance;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}