import aws from 'aws-sdk';
import formidable from 'formidable';

export default async function handler(req: any, res: any) {
  try {
    if (req.method == 'POST') {
      const s3 = new aws.S3({
        endpoint: new aws.Endpoint('sfo3.digitaloceanspaces.com'),
        accessKeyId: process.env.S3_BUCKET_KEY,
        secretAccessKey: process.env.S3_BUCKET_SECRET,
        region: 'sfo3',
      });

      const form = new formidable.IncomingForm();
      // console.log('testasdasdasd' + files.file.data);
      form.parse(req, async (err: any, fields: any, files: any) => {
        console.log('test11' + files.file);
        if (err) return res.status(500);
        // console.log('test'+ files.file);
        // const file = fs.readFileSync(files.file.Path);
        s3.upload({
          Bucket: 'larstra',
          ACL: 'public-read',
          Key: 'inserir-url',
          Body: Buffer.from(files.file, 'binary'),
          ContentType: 'image/jpeg',
          Metadata: {
            'Content-Type': 'multipart/form-data',
          },
        }).send((err, data) => {
          if (err) {
            console.log('err', err);
            return res.status(500);
          }
          return res.json({
            url: data.Location,
          });
        });
      });

      return res.status(405).json({ message: 'Method Not Allowed' });
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
    bodyParser: false,
  },
};
