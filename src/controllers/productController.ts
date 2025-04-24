import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { db } from '../db/index';

export const addNewProduct = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { product_name, description, price, supplier_id } = req.body;
    const imageFile = req.file;
    let imageUrl = '';
    if (imageFile) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
        imageFile.filename
      }`;
    }
    const product = await db
      .insertInto('product')
      .values({
        product_name: product_name,
        image_link: imageUrl,
        description: description,
        price: price,
        supplier_id: supplier_id,
      })
      .returning(['product_name'])
      .executeTakeFirst();
    res
      .status(201)
      .json({ message: `New product ${product?.product_name} added!` });
  }
);

export const getAllProducts = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const allProducts = await db
      .selectFrom('product')
      .innerJoin('supplier', 'supplier.id', 'product.supplier_id')
      .select([
        'product.id',
        'product.product_name',
        'product.image_link',
        'product.description',
        'product.price',
        'supplier.name',
      ])
      .execute();
    res.status(200).json({ allProducts });
  }
);

export const updateProduct = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { product_name, description, price, supplier_id } = req.body;
    const imageFile = req.file;
    let imageUrl = '';
    if (imageFile) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
        imageFile.filename
      }`;
    }
    const product = await db
      .updateTable('product')
      .set({
        product_name: product_name,
        description: description,
        price: price,
        supplier_id: supplier_id,
        image_link: imageUrl,
      })
      .where('id', '=', Number(id))
      .executeTakeFirst();
    res.status(200).json({ message: 'Product details updated!' });
  }
);
