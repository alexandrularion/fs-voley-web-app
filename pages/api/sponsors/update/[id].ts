import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'POST') {
      const session = await getSession({ req });
      if (session == null) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const { id } = req.query;
      const { title, image_url, date_end, date_start } = req.body;
      await prisma.sponsor.update({
        where: { id: Number(id) },
        data: {
          title: title,
          image_url: image_url,
          date_end: date_end,
          date_start: date_start,
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
