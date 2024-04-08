import { expect, test } from 'bun:test';
import { main } from './script.bun.ts';
import { main as createBucket } from '../Create_Bucket/script.bun.ts';
import { main as uploadObject } from '../Upload_An_Object/script.bun.ts';
import { Storage } from '@google-cloud/storage';
import { resource } from '../resource.ts';

test('Get Bucket Metadata', async () => {
  // Create Bucket and upload a file first
  const bucketName = Math.random().toString(36).slice(2);

  await createBucket(resource, bucketName);

  const path = require('path');
  const fileName = 'sample.base64';
  const relativePath = '../testAssets/';
  const filePath = path.join(__dirname, relativePath, fileName);

  await uploadObject(resource, bucketName, filePath, {
    destination: fileName,
  });

  const response = await main(resource, bucketName, fileName);
  // console.log(response);
  expect(response).toBeDefined();
  expect(response[0].metadata.name).toBe(fileName);
  expect(response[0].metadata.bucket).toBe(bucketName);

  const storage = new Storage({
    credentials: resource,
    projectId: resource.project_id,
  });
  await storage.bucket(bucketName).file(fileName).delete();
  await storage.bucket(bucketName).delete();
});
