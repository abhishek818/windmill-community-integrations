import { Storage } from "@google-cloud/storage";
 
export async function main(
  keyFilename: string,
  bucketName: string
) {
  const storage = new Storage({keyFilename});

  try {
    const response = await storage.bucket(bucketName).getMetadata();
    return response;
  } catch (error) {
    return {
      error: true,
      message: error || 'Internal Server Error',
    }
  }
}
