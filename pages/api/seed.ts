// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database'
import { Product, User } from '../../models';

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'No tiene acceso a este API' });
  }
  try {
    const { products, users } = seedDatabase.initialData;
  
    await db.connect()
    await User.deleteMany({});
    await User.insertMany(users);
    await Product.deleteMany({});
    await Product.insertMany(products);
    await db.disconnect()
  
    res.status(200).json({ message: 'Seed ok!!' })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error' })
  }
}
