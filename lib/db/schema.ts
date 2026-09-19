import { pgTable, text, serial, timestamp, varchar, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('User'), // 'Admin' or 'User'
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  filename: varchar('filename', { length: 255 }).notNull(),
  filepath: text('filepath').notNull(),
  filesize: integer('filesize').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // 'pending', 'processing', 'completed', 'error'
  uploadedAt: timestamp('uploaded_at').notNull().defaultNow(),
});

export const bisStandards = pgTable('bis_standards', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 255 }).notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  keywords: text('keywords').notNull(),
});

export const analysisHistory = pgTable('analysis_history', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  documentId: integer('document_id').references(() => documents.id),
  analysisJson: jsonb('analysis_json').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
