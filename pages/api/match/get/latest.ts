// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'GET') {
      const matches = await prisma.match.findMany({
        where: {
          OR: [
            {
              score_first: {
                gte: 0,
              },
            },
            {
              score_second: {
                gte: 0,
              },
            },
          ],
        },
        include: {
          championship: true,
          edition: true,
          clubFirst: true,
          clubSecond: true,
        },
      });

      return res.status(200).json(matches);
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
}
