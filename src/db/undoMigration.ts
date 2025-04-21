import 'dotenv/config';
import { db } from '../db/index';
import * as migration from './migrations/0003_create_all_tables';

(async () => {
  try {
    await migration.down(db);
    console.log('Migration rolled back successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error rolling back migration:', err);
    process.exit(1);
  }
})();
