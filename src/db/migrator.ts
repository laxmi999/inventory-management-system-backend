import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import pg from 'pg';
const { Pool } = pg;
import { promises as fs } from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from 'kysely';
// import { ESMFileMigrationProvider } from './fileMigrationProvider';
import { DB } from './kysely-types';

// const migrationFolder = path.resolve(
//   fileURLToPath(new URL('../db/migrations', import.meta.url))
// );

// const migrationFolder = new URL('../db/migrations', import.meta.url).pathname;

async function migrateToLatest() {
  const db = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: 'localhost',
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: 'src/db/migrations',
    }),
    // provider: new ESMFileMigrationProvider(migrationFolder),
  });

  const { error, results } = await migrator.migrateToLatest();

  console.log(`migrating......`);

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });
  if (error) {
    console.error('failed to migrate: ', error);
    process.exit(1);
  }
  await db.destroy();
}

migrateToLatest();
