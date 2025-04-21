import * as path from 'path';
import pg from 'pg';
const { Pool } = pg;
import { promises as fs } from 'fs';
import 'dotenv/config';
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from 'kysely';
import { DB } from './kysely-types';

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
  });

  const { error, results } = await migrator.migrateToLatest();

  // tslint:disable-next-line:no-console
  console.log(`migrating......`);

  results?.forEach((it) => {
    if (it.status === 'Success') {
      // tslint:disable-next-line:no-console
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      // tslint:disable-next-line:no-console
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });
  if (error) {
    // tslint:disable-next-line:no-console
    console.error('failed to migrate: ', error);
    process.exit(1);
  }
  await db.destroy();
}

migrateToLatest();
