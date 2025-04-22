import { Request, Response, NextFunction } from 'express';
import { db } from '../db/index';

export async function allSuppliers(req: Request, res: Response) {
  const suppliers = await db.selectFrom('supplier').selectAll().execute();

  res.status(200).json(suppliers);
}

export async function addNewSupplier(req: Request, res: Response) {
  const { name, supplier_contact } = req.body;

  const supplier = await db
    .insertInto('supplier')
    .values({ name: name, supplier_contact: supplier_contact })
    .returning(['name'])
    .executeTakeFirst();

  res
    .status(203)
    .json({ message: `New supplier ${supplier?.name} registered!` });
}

export async function updateSupplier(req: Request, res: Response) {
  const { id } = req.params;
  const { name, supplier_contact } = req.body;

  await db
    .updateTable('supplier')
    .set({ name: name, supplier_contact: supplier_contact })
    .where('id', '=', Number(id))
    .executeTakeFirst();

  res.status(200).json({ message: 'Supplier info updated!' });
}

export async function deleteSupplier(req: Request, res: Response) {
  const { id } = req.params;

  console.log(id);

  const supplier = await db
    .deleteFrom('supplier')
    .where('id', '=', Number(id))
    .executeTakeFirst();

  res.status(200).json({ message: 'Supplier deleted!' });
}
