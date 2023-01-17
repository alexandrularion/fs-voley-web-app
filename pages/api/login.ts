// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';
import { HttpStatus } from '@nestjs/common';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'POST') {
      const { email, password } = req.body;
      const user: any = await findUser(email);
      if (!user[0]) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: `The user with email ${email} isn't registered in our platform.`,
        });
      }

      const validatePassword = await bcrypt.compare(password, user[0].password);

      if (!validatePassword) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: `Invalid credentials for user with email ${email}.`,
        });
      }

      // create a jwt token
      const token = createJWT(user[0]);

      // return basic user details and token
      return res.status(200).json({
        id: user[0].id,
        email: user[0].email,
        name: user[0].name,
        token,
      });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
}

export const createJWT = (data: any) => {
  return jwt.sign(
    data,
    process.env.JWT_SECRET_TOKEN as string,
    { expiresIn: 60 * 60 * 168 * 4 } // 30 days
  );
};

async function findUser(email: string) {
  return await prisma.user.findMany({
    where: { email },
  });
}
