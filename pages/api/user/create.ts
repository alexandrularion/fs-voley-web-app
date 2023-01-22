import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
// 0 -administrator
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'POST') {
      const { name, email, role } = req.body;
      const randomstring = Math.random().toString(36).slice(-8);
      // nume si prenume
      const user = await prisma.user.create({
        data: {
          name: name,
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
