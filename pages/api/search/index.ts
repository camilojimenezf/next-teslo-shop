import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database';
import { Product } from '../../../models';

type Data = 
| { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return search(req, res);
    default:
      return res.status(400).json({
        message: 'Bad request'
      });
  }
}

const search = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  return res.status(404).json({
    message: 'Not found'
  });
};
