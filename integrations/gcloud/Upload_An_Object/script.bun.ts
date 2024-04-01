import { Storage } from "@google-cloud/storage";
 
export async function main(
  keyFilename: string,
  bucketName: string,
  filePath: string,
  options: {
    destination: string
  }
) {
  const storage = new Storage({ keyFilename });

  try {
    const response = await storage.bucket(bucketName).upload(filePath, options);
    return response;
  } catch (error) {
    return {
      error: true,
      message: error || 'Internal Server Error',
    }
  }
}
