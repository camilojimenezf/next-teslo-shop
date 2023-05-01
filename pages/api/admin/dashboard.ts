import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data = {
  numberOfOrders: number;
  paidOrders: number; // isPaid true
  notPaidOrders: number; 
  numberOfClients: number; // role: client
  numberOfProducts: number; 
  productsWithNoInventory: number; // 0
  lowInventory: number; // Productos con 10 o menos inStock
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();

  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory, 
  ] = await Promise.all([
    await Order.find({}).count(),
    await Order.find({ isPaid: true }).count(),
    await User.find({ role: 'client' }).count(),
    await Product.find({}).count(),
    await Product.find({ inStock: 0 }).count(),
    await Product.find({ inStock: { $lte: 10 }}).count(),
  ]);

  await db.disconnect();

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  });
}
