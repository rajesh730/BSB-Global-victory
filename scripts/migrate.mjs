import {mkdir,readFile} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
import {createClient} from '@libsql/client';

const tursoUrl=process.env.TURSO_DATABASE_URL?.trim();
const databaseUrl=process.env.DATABASE_URL?.trim();
const authToken=process.env.TURSO_AUTH_TOKEN?.trim();
const url=tursoUrl || databaseUrl;
if (!url) throw new Error('Set DATABASE_URL for local SQLite or TURSO_DATABASE_URL for Turso.');
if (tursoUrl && !authToken) throw new Error('Set TURSO_AUTH_TOKEN when using Turso.');
if (url.startsWith('file:')) {
  const filePath=url.slice('file:'.length);
  if (filePath !== ':memory:') await mkdir(dirname(resolve(filePath)),{recursive:true});
}

const client=createClient({url,...(authToken?{authToken}:{})});
await client.execute('CREATE TABLE IF NOT EXISTS schema_migrations (id TEXT PRIMARY KEY NOT NULL, applied_at TEXT NOT NULL)');
const migrations=[
  {id:'001_initial',file:'src/server/db/migrations/001_initial.sql'},
  {id:'002_enquiry_workflow',file:'src/server/db/migrations/002_enquiry_workflow.sql'}
];
for (const migration of migrations) {
  const applied=await client.execute({sql:'SELECT id FROM schema_migrations WHERE id = ?',args:[migration.id]});
  if (applied.rows.length) continue;
  const sql=await readFile(resolve(migration.file),'utf8');
  for (const statement of sql.split(';').map(value=>value.trim()).filter(Boolean)) await client.execute(statement);
  await client.execute({sql:'INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?)',args:[migration.id,new Date().toISOString()]});
  console.log(`Applied ${migration.id}.`);
}
client.close();
console.log(`Database migration completed for ${tursoUrl?'Turso/libSQL':'local SQLite'}.`);
