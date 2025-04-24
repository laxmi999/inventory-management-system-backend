import { Request, Response } from 'express';
import { db } from '../db/index';

export async function addNewProduct(req: Request, res: Response) {
  const { product_name, description, price, supplier_id } = req.body;
  const imageFile = req.file;
  let imageUrl = '';
  if (imageFile) {
    imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
      imageFile.filename
    }`;
  }
  try {
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
  } catch (error) {
    res.json({ message: error });
  }
}
