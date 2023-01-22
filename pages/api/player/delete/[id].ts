import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'DELETE') {
      const { id } = req.query;
      try {
        await prisma.player.delete({
          where: { id: Number(id) },
        });
        return res.status(200).json({ message: 'This player has been deleted!' });
      } catch (e) {
        return res.status(404).json({ message: 'This player cannot be accessed or does not exist.' });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).json({ message: e });
  }
}