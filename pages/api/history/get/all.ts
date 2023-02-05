// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'GET') {
      const histories = await prisma.history.findMany({
        orderBy: [
          {
            order: 'asc',
          },
        ],
      });

      return res.status(200).json(histories);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
}

export const config = {
  api: {
    responseLimit: '8mb',
  },
};
