import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getSession } from 'next-auth/react';
export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'POST') {
      const session = await getSession({ req });
      if (session == null) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { id } = req.query;
      const { first_name, last_name, description, nationality, image } = req.body;

      await prisma.trainers.update({
        where: { id: Number(id) },
        data: {
          first_name: first_name,
          last_name: last_name,
          description: description,
          nationality: nationality,
          image: image,
        },
      });
      return res.status(200).json({ message: 'The trainer was updated!' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
}
