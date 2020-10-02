import { Request, Response } from 'express';

import sharp from 'sharp';
import { imageDownloader } from '../imageParser';

const imageFormatter = async (req: Request, res: Response): Promise<void> => {
  const { params } = req;

  console.log('params are: ', params);

  res.setHeader('Content-Type', 'image/jpeg');
  const { width, height, searchTerm } = params;
  res.setHeader('Content-Disposition', `inline; filename=${searchTerm}.jpg`);

  try {
    if (!searchTerm) {
      throw new Error('No searchTerm specified');
    }

    imageDownloader(searchTerm)
      .then(image => {
        if (width) {
          sharp(image)
            .resize(Number(width), height ? Number(height) : Number(width), {
              fit: 'cover',
            })
            .toBuffer()
            .then(data => {
              res.send(data);
              res.end();
            })
            .catch(err => {
              throw new Error(err);
            });
        } else {
          sharp(image)
            .toBuffer()
            .then(data => {
              res.send(data);
              res.end();
            })
            .catch(err => {
              throw new Error(err);
            });
        }
      })
      .catch(err => console.log(err));
  } catch (err) {
    throw new Error('Bad request');
  }
};

export default imageFormatter;
