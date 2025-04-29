import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { db } from '../db/index';

export const allSuppliers = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const suppliers = await db.selectFrom('supplier').selectAll().execute();

    res.status(200).json(suppliers);
  }
);

export const addNewSupplier = expressAsyncHandler(
  async (req: Request, res: Response) => {
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
);

export const updateSupplier = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, supplier_contact } = req.body;

    await db
      .updateTable('supplier')
      .set({ name: name, supplier_contact: supplier_contact })
      .where('id', '=', Number(id))
      .executeTakeFirst();

    res.status(200).json({ message: 'Supplier info updated!' });
  }
);

export const deleteSupplier = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const supplier = await db
      .deleteFrom('supplier')
      .where('id', '=', Number(id))
      .executeTakeFirst();

    res.status(200).json({ message: `${supplier} deleted from suppliers!` });
  }
);
