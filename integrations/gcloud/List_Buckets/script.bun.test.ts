
import { expect, test } from "bun:test";
import { main } from "./script.bun.ts";
import { main as createBucket } from "../Create_Bucket/script.bun.ts";
import { Storage } from "@google-cloud/storage";

test("List Buckets", async () => {
  // Create a Bucket first
  const bucketName = Math.random().toString(36).slice(2);
  const keyFilename = './creds.json';
  
  await createBucket(keyFilename, bucketName);

  const response = await main(keyFilename);
  
  expect(response).toBeDefined();
  // expect(response[0][0].metadata.name).toBe(bucketName);
  // console.log(response);
});
