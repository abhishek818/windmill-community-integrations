
import { expect, test } from "bun:test";
import { main } from "./script.bun.ts";
import { main as createBucket } from "../Create_Bucket/script.bun.ts";
import { Storage } from "@google-cloud/storage";

test("Upload An Object", async () => {
  // Create a Bucket first 
  const bucketName = Math.random().toString(36).slice(2);
  const keyFilename = './creds.json';
  
  await createBucket(keyFilename, bucketName);

  const path = require('path');
  const fileName = "script.json";
  const filePath = path.join(__dirname, fileName);

  const response = await main(
    keyFilename,
    bucketName,
    filePath,
    {
      destination: fileName
    }
  );

  // console.log(response);
  expect(response).toBeDefined();
  expect(response[0].metadata.name).toBe(fileName);
  expect(response[0].metadata.bucket).toBe(bucketName);
});
