import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('product')
    .addColumn('supplier_id', 'integer')
    .execute();
}

export async function down(db: Kysely<any>): Promise<any> {
  await db.schema.alterTable('product').dropColumn('supplier_id').execute();
}
