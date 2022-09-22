import { v2 as cloudinary } from "cloudinary";
import slug from "slug";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImage = async function (file: any, name: string) {
  return await cloudinary.uploader.upload(file, {
    public_id: slug(name.normalize("NFKD")),
    folder: `${process.env.CLOUDINARY_FOLDER}/`,
    use_filename: Boolean(name),
    unique_filename: true,
    access_mode: "authenticated",
    resource_type: "image",
    type: "authenticated",
  });
};
