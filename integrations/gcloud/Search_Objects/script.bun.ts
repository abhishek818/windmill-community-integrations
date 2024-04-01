import { Storage } from "@google-cloud/storage";
 
export async function main(
  keyFilename: string,
  bucketName: string
) {
  const storage = new Storage({ keyFilename });

  try {
    const [files] = await storage.bucket(bucketName).getFiles();
    return files;
  } catch (error) {
    return {
      error: true,
      message: error || 'Internal Server Error',
    }
  }
}
