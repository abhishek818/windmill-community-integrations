import { expect, test } from 'bun:test'
import { main } from './script.bun.ts'
import { main as createBucket } from '../Create_Bucket/script.bun.ts'
import { Storage } from '@google-cloud/storage'
import { resource } from '../resource.ts'

test('Upload An Object', async () => {
	// Create a Bucket first
	const bucketName = Math.random().toString(36).slice(2)

	await createBucket(resource, bucketName)

	const destination = 'sampleFile.txt'
	const response = await main(resource, bucketName, 'SnVzdCBhIHNhbXBsZSBmaWxlIQ==', {
		destination: destination
	})

	// console.log(response);
	expect(response).toBeDefined()

	const storage = new Storage({
		credentials: resource,
		projectId: resource.project_id
	})

	// Somehow file is not found through below apis,
	// but its available check it on the gcp console/UI.
	// await storage.bucket(bucketName).file(destination).delete();
	// var bucket = storage.bucket(bucketName);
	// var fileObject = bucket.file(destination);
	// await fileObject.delete();
	await storage.bucket(bucketName).delete()
})
