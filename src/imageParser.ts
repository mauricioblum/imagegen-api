import axios from 'axios';
import path from 'path';

import getRandomNumber from './utils/randomNumber';

export const imageDownloader = async (
  searchQuery: string,
): Promise<Buffer | string> => {
  const response = await axios.get('https://pixabay.com/api', {
    params: {
      key: process.env.PIXABAY_API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      min_width: 1280,
      q: searchQuery,
    },
  });
  const images = response.data.hits;
  if (images.length) {
    let imgURL;
    if (images.length === 1) {
      imgURL = response.data.hits[0].largeImageURL;
    } else {
      imgURL =
        response.data.hits[getRandomNumber(images.length - 1)].largeImageURL;
    }

    const imgResponse = await axios.get(imgURL, {
      responseType: 'arraybuffer',
    });

    const imgBuffer = Buffer.from(imgResponse.data);

    return imgBuffer;
  }
  return path.resolve('assets', 'default', 'error-default.png');
};
