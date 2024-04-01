
import { expect, test } from "bun:test";
import { main } from "./script.bun.ts";
import { main as createBucket } from "../Create_Bucket/script.bun.ts";
import { main as uploadObject } from "../Upload_An_Object/script.bun.ts";

test("Get Bucket Metadata", async () => {
  // Create Bucket and upload a file first 
  const bucketName = Math.random().toString(36).slice(2);
  const keyFilename = './creds.json';
  
  await createBucket(keyFilename, bucketName);

  const path = require('path');
  const fileName = "script.json";
  const filePath = path.join(__dirname, fileName);
  await uploadObject(keyFilename, bucketName, filePath, {
    destination: fileName
  });

  const response = await main(keyFilename, bucketName, fileName);
  // console.log(response);
  expect(response).toBeDefined();
  expect(response[0].metadata.name).toBe(fileName);
  expect(response[0].metadata.bucket).toBe(bucketName);
});
