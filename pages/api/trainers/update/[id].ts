import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getSession } from 'next-auth/react';
import AWS from 'aws-sdk';
import formidable from 'formidable';
//const upload = multer({ storage: multer.memoryStorage() });
export const config = { api: { bodyParser: false } };
const form = formidable({ multiples: true }); // multiples means req.files will be an array
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.use(middleware);
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'POST') {
      const contentType = req.headers['content-type'];
      if (contentType && contentType.indexOf('multipart/form-data') !== -1) {
        form.parse(req, (err, fields, files) => {
          if (!err) {
            req.body = fields; // sets the body field in the request object
            req.files = files; // sets the files field in the request object
          }
        });
      }
      // const session = await getSession({ req });
      // if (session == null) {
      //   return res.status(401).json({ message: 'Unauthorized' });
      // }

      // const s3 = new AWS.S3({
      //   accessKeyId: process.env.S3_BUCKET_KEY,
      //   secretAccessKey: process.env.S3_BUCKET_SECRET,
      // });

      // console.log(req);
      ///const { id } = req.query;
      console.log(req.body.file);
      //const { file } = req.body;
      //console.log(file);
      // const form = new formidable.IncomingForm();

      // form.parse(req, async (err, fields, data) => {
      //   console.log(data.file);
      //   //        console.log(files[0]);
      //   const formFile = fs.readFile(data.file);
      //   console.log('asdasd' + formFile);
      //   const params = {
      //     Bucket: 'larstra',
      //     Key: `voleiapp/${data.file.originalFilename}`,
      //     Body: buffer,
      //   };
      //   s3.upload(params, (err: any, data: any) => {
      //     if (err) {
      //       console.log(err);
      //       return res.status(500).send(err);
      //     } else {
      //       return res.status(200).send(data);
      //     }
      //   });
      // });

      // await prisma.trainers.update({
      //   where: { id: Number(id) },
      //   data: {
      //     first_name: first_name,
      //     last_name: last_name,
      //     description: description,
      //     nationality: nationality,
      //     image: image,
      //   },
      // });
      return res.status(200).json({ message: 'The trainer was updated!' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
}
