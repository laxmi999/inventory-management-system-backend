import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('user')
    .addColumn('fullName', 'text', (col) => col.notNull())
    .execute();
  await db.schema
    .alterTable('user')
    .addColumn('phoneNumber', 'text', (col) => col.unique().notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('user').dropColumn('fullName').execute();
  await db.schema.alterTable('user').dropColumn('phoneNumber').execute();
}
