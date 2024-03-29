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

      //console.log(randomstring);
      //TODO: send password to user email address
      // const transporter = nodemailer.createTransport({
      //   host: 'smtp.mailtrap.io',
      //   port: 2525,
      //   auth: {
      //     user: '775597e69b1a14',
      //     pass: '2b3ed2418b3f27',
      //   },
      //   secure: true,
      // });
      //
      // const mailData = {
      //   from: '32caf55ac1-f9a504@inbox.mailtrap.io',
      //   to: '32caf55ac1-f9a504@inbox.mailtrap.io',
      //   subject: `Message From ${req.body.name}`,
      //   text: req.body.message,
      //   html: '<div> Parola generata este: {randomstring}, va rugam sa schimabi parola dupa ce va conectati la cont.</div>',
      // };
      //
      // transporter.sendMail(mailData, function (err, info) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log(info);
      //   }
      // });
      return res.status(200).json(user);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
}
