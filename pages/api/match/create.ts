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

      const { dateTime, link, editionId, championshipId, club_firstId, club_secondId, score_first, score_second, location } = req.body;
      const match = await prisma.match.create({
        data: {
          dateTime: dateTime,
          link: link,
          editionId: editionId,
          championshipId: championshipId,
          club_firstId: club_firstId,
          club_secondId: club_secondId,
          score_first: score_first,
          score_second: score_second,
          location: location,
        },
      });

      return res.status(200).json(match);
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
}
