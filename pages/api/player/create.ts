import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'POST') {
      const { first_name, last_name, description, role, height, position, birthday, nationality, image } = req.body;
      const user = await prisma.player.create({
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

      return res.status(200).json(user);
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).json({ message: e });
  }
}
