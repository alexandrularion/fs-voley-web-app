import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'POST') {
      const { id } = req.query;
      const { first_name, last_name, description, role, height, position, birthday, nationality, image } = req.body;
      await prisma.player.update({
        where: { id: Number(id) },
        data: {
          first_name: first_name,
          last_name: last_name,
          description: description,
          role: role,
          height: height,
          position: position,
          birthday: birthday,
          nationality: nationality,
          image: image,
        },
      });
      return res.status(200).json({ message: 'The player was updated!' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
}
