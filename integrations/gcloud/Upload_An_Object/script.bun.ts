import { Storage } from '@google-cloud/storage'

type Gcloud = {
	type: string
	project_id: string
	private_key_id: string
	private_key: string
	client_email: string
	client_id: string
	auth_uri: string
	token_uri: string
	auth_provider_x509_cert_url: string
	client_x509_cert_url: string
	universe_domain: string
}

type Base64 = string

export async function main(
	resource: Gcloud,
	bucketName: string,
	file: Base64,
	options: {
		destination: string
	}
) {
	const storage = new Storage({
		credentials: resource,
		projectId: resource.project_id
	})

	const stream = require('stream')
	const bufferStream = new stream.PassThrough()
	bufferStream.end(Buffer.from(file, 'base64'))

	const bucket = storage.bucket(bucketName)
	const fileObject = bucket.file(options.destination)
	//Pipe the 'bufferStream' into a 'file.createWriteStream' method.
	return await bufferStream.pipe(fileObject.createWriteStream())
}
