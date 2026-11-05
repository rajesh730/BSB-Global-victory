import 'server-only';
import {mkdirSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {createClient, type Client} from '@libsql/client';
import {getDatabaseConfig} from './config';

declare global { var bsbDatabaseClient: Client | undefined; }

export function getDatabaseClient(): Client {
  const config = getDatabaseConfig();
  if (!config) throw new Error('Database is not configured. Set DATABASE_URL locally or Turso credentials in production.');
  if (config.url.startsWith('file:')) {
    const filePath=config.url.slice('file:'.length);
    if (filePath !== ':memory:') mkdirSync(dirname(resolve(filePath)),{recursive:true});
  }
  if (!globalThis.bsbDatabaseClient) globalThis.bsbDatabaseClient=createClient(config);
  return globalThis.bsbDatabaseClient;
}
