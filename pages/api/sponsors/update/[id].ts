import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'POST') {
      const { id } = req.query;
      const { title, url, image_url, date_end, date_start } = req.body;
      await prisma.sponsor.update({
        where: { id: Number(id) },
        data: {
          title: title,
          url: url,
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
