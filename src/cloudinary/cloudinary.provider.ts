
import { v2 as cloudinary } from 'cloudinary';


export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'duqy8jfw0',
      api_key: '857749673926495',
      api_secret: 'SysKD0ryln0PULQ9QcNM0Q1f8Kk',
    });
  },
};
