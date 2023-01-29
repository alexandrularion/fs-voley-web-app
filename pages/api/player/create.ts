import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Set desired value here
    },
  },
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'POST') {
      const session = await getSession({ req });
      if (session == null) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const { first_name, last_name, description, height, position, shirtNumber, birthday, nationality, image, categoryId } = req.body;
      const user = await prisma.player.create({
        data: {
          first_name: first_name,
          last_name: last_name,
          description: description,
          height: height,
          position: position,
          shirtNumber: shirtNumber,
          birthday: birthday,
          nationality: nationality,
          image: image,
          categoryId: categoryId,
        },
      });

      return res.status(200).json(user);
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Set desired value here
    },
  },
};
