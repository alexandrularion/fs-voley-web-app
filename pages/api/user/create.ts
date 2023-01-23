import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
// 0 -administrator
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'POST') {
      const session = await getSession({ req });
      if (session == null) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const { email, role, first_name, last_name } = req.body;
      const randomstring = Math.random().toString(36).slice(-8);
      const user = await prisma.user.create({
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          role: role,
          status: 1,
          password: randomstring,
        },
      });

      console.log(randomstring);
      //TODO: send password to user email address

      return res.status(200).json(user);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
}
