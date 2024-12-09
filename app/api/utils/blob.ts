import { createUpload } from "@vercel/blob";

export async function uploadImage(file: Blob): Promise<string> {
  const { url } = await createUpload(file, {
    access: "public", // Rendre l'image accessible publiquement
    contentType: file.type,
  });
  return url;
}