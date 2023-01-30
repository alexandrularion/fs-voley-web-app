// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'GET') {
      const { id } = req.query;
      try {
        const club = await prisma.club.findFirst({
          where: { id: Number(id) },
          include: { category: true },
        });
        return res.status(200).json(club);
      } catch (e) {
        return res.status(404).json({ message: 'This club cannot be accessed or does not exist.' });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
}
