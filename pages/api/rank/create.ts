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

      const { position, image, points, played, wins, losings, winnedSets, losedSets, winnedPoints, losedPoints } = req.body;
      const rank = await prisma.rank.create({
        data: {
          position: position,
          image: image,
          points: points,
          played: played,
          wins: wins,
          losings: losings,
          winnedSets: winnedSets,
          losedSets: losedSets,
          winnedPoints: winnedPoints,
          losedPoints: losedPoints,
        },
      });

      return res.status(200).json(rank);
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
}
