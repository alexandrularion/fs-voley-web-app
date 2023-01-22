import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'GET') {
      const { id } = req.query;
      const { name, email } = req.body;
      await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name: name,
          email: email,
        },
      });
      return res.status(200).json({ message: 'The user was updated!' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
}
