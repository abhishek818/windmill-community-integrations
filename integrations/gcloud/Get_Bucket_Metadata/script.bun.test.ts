import { expect, test } from "bun:test";
import { main } from "./script.bun.ts";
import { main as createBucket } from "../Create_Bucket/script.bun.ts";

test("Get Bucket Metadata", async () => {
  // Create Bucket first
  const bucketName = Math.random().toString(36).slice(2);
  const keyFilename = './creds.json';
  
  await createBucket(keyFilename, bucketName);

  const response = await main(keyFilename, bucketName);

  expect(response).toBeDefined();
  expect(response[0].name).toBe(bucketName);
});
