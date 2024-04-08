
import { expect, test } from "bun:test";
import { main } from "./script.bun.ts";
import { Storage } from "@google-cloud/storage";
import { resource } from "../resource.ts";

test("Create Bucket", async () => {
  const bucketName = Math.random().toString(36).slice(2);
  const response = await main(
    resource,
    bucketName
  );

  expect(response).toBeDefined();
  expect(response[0].metadata.name).toBe(bucketName);

  const storage = new Storage({
    credentials: resource,
    projectId: resource.project_id
  });
  await storage.bucket(bucketName).delete();
});
