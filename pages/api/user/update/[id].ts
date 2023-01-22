import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'GET') {
      return res.status(200).json({ message: 'asdasdasd' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
}
