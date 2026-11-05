import 'server-only';

export type DatabaseConfig = { url: string; authToken?: string };

/** Returns a local SQLite or Turso/libSQL connection, never a client-safe value. */
export function getDatabaseConfig(): DatabaseConfig | null {
  const tursoUrl = process.env.TURSO_DATABASE_URL?.trim();
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (tursoUrl) {
    const authToken = process.env.TURSO_AUTH_TOKEN?.trim();
    if (!authToken) throw new Error('TURSO_AUTH_TOKEN is required when TURSO_DATABASE_URL is configured.');
    return {url:tursoUrl,authToken};
  }

  return databaseUrl ? {url:databaseUrl} : null;
}
