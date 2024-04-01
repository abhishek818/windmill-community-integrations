
import { expect, test } from "bun:test";
import { main } from "./script.bun.ts";

test("Create Bucket", async () => {
  const bucketName = Math.random().toString(36).slice(2);
  const response = await main(
    './creds.json',
    bucketName
  );

  expect(response).toBeDefined();
  expect(response[0].metadata.name).toBe(bucketName);
});
