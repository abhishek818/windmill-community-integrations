import { Storage } from "@google-cloud/storage";

type Gcloud = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

type Base64 = string;

export async function main(
  resource: Gcloud,
  bucketName: string,
  filePath: Base64,
  options: {
    destination: string
  }
) {
  const storage = new Storage({
    credentials: resource,
    projectId: resource.project_id
  });

  try {
    const response = await storage.bucket(bucketName).upload(filePath, options);
    return response;
  } catch (error) {
    throw error;
  }
}
