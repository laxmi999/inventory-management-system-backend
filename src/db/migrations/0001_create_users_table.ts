import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('userName', 'text', (col) => col.unique().notNull())
    .addColumn('email', 'text', (col) => col.unique().notNull())
    .addColumn('passwordHash', 'text', (col) => col.notNull())
    .addColumn('role', 'text', (col) => col.notNull())
    .addColumn('createdAt', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('updatedAt', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  await db.schema
    .createTable('product')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('imageLink', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('price', 'numeric', (col) => col.notNull())
    .addColumn('createdAt', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('updatedAt', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  await db.schema
    .createTable('inventory')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('productId', 'integer', (col) => col.notNull())
    .addColumn('sku', 'integer', (col) => col.notNull())
    .addColumn('location', 'text')
    .addColumn('createdAt', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('updatedAt', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  await db.schema
    .createTable('transaction')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('productId', 'integer', (col) => col.notNull())
    .addColumn('userId', 'integer', (col) => col.notNull())
    .addColumn('quantity', 'integer', (col) => col.notNull())
    .addColumn('type', 'text', (col) => col.notNull())
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('isCancelled', 'boolean')
    .addColumn('cancelReason', 'text')
    .addColumn('createdAt', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('updatedAt', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  await db.schema
    .createTable('supplier')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('contactInfo', 'text', (col) => col.notNull())
    .addColumn('createdAt', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('updatedAt', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  await db.schema
    .createTable('productSupplier')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('productId', 'integer', (col) => col.notNull())
    .addColumn('supplierId', 'integer', (col) => col.notNull())
    .addColumn('createdAt', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('updatedAt', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user').execute();
  await db.schema.dropTable('product').execute();
  await db.schema.dropTable('inventory').execute();
  await db.schema.dropTable('transaction').execute();
  await db.schema.dropTable('supplier').execute();
  await db.schema.dropTable('productSupplier').execute();
}
