import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'POST') {
      const session = await getSession({ req });
      if (session == null) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { title, url, website, date_start, date_end, image_url } = req.body;
      const sponsor = await prisma.sponsor.create({
        data: {
          title: title,
          url: url,
          website: website,
          date_start: date_start,
          date_end: date_end,
          image_url: image_url,
        },
      });

      return res.status(200).json(sponsor);
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).json({ message: e });
  }
}
