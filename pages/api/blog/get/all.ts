// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'GET') {
      const posts = await prisma.post.findMany({ include: { tags: { select: { tag: true } } } });

      return res.status(200).json(posts.map(({ tags, ...obj }: any) => ({ ...obj, tags: tags.map(({ tag }: any) => tag) })));
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
}
