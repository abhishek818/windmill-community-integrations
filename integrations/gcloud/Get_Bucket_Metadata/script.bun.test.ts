import { expect, test } from 'bun:test';
import { main } from './script.bun.ts';
import { main as createBucket } from '../Create_Bucket/script.bun.ts';
import { Storage } from '@google-cloud/storage';
import { resource } from '../resource.ts';

test('Get Bucket Metadata', async () => {
  // Create Bucket first
  const bucketName = Math.random().toString(36).slice(2);

  await createBucket(resource, bucketName);

  const response = await main(resource, bucketName);

  expect(response).toBeDefined();
  expect(response[0].name).toBe(bucketName);

  const storage = new Storage({
    credentials: resource,
    projectId: resource.project_id,
  });
  await storage.bucket(bucketName).delete();
});
