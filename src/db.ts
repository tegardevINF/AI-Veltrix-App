import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function initDb() {
  if (db) return db;

  // Store the SQLite file in the root
  db = await open({
    filename: path.join(process.cwd(), 'database.sqlite'),
    driver: sqlite3.Database
  });

  // Create Conversations table
  await db.exec(
    'CREATE TABLE IF NOT EXISTS conversations (' +
      'id TEXT PRIMARY KEY,' +
      'title TEXT,' +
      'updated_at DATETIME DEFAULT CURRENT_TIMESTAMP' +
    ')'
  );

  // Create Messages table
  await db.exec(
    'CREATE TABLE IF NOT EXISTS messages (' +
      'id TEXT PRIMARY KEY,' +
      'conversation_id TEXT,' +
      'role TEXT,' +
      'content TEXT,' +
      'file TEXT,' +
      'created_at DATETIME DEFAULT CURRENT_TIMESTAMP,' +
      'FOREIGN KEY(conversation_id) REFERENCES conversations(id) ON DELETE CASCADE' +
    ')'
  );

  console.log('Database initialized successfully.');
  return db;
}

export async function getDb() {
  if (!db) {
    return initDb();
  }
  return db;
}
