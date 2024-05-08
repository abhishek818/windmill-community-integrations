import { expect, test } from 'bun:test'
import { main } from './script.bun.ts'
import { main as createBucket } from '../Create_Bucket/script.bun.ts'
import { Storage } from '@google-cloud/storage'
import { resource } from '../resource.ts'

test('List Buckets', async () => {
	// Create a Bucket first
	const bucketName = Math.random().toString(36).slice(2)

	await createBucket(resource, bucketName)

	const response = await main(resource)

	expect(response).toBeDefined()
	// expect(response[0][0].metadata.name).toBe(bucketName);
	// console.log(response);

	const storage = new Storage({
		credentials: resource,
		projectId: resource.project_id
	})
	await storage.bucket(bucketName).delete()
})
