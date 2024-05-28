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

export async function main(
	resource: Gcloud,
	bucketName: string,
	fileOptions?: {
		prefix?: string
		autoPaginate?: boolean
		delimiter?: string
		endOffset?: string
		includeFoldersAsPrefixes?: boolean
		includeTrailingDelimiter?: boolean
		matchGlob?: string
		maxApiCalls?: number
		maxResults?: number
		pageToken?: string
		softDeleted?: boolean
		startOffset?: string
		userProject?: string
		versions?: boolean
	}
) {
	const storage = new Storage({
		credentials: resource,
		projectId: resource.project_id
	})

	return await storage.bucket(bucketName).getFiles(fileOptions)
}
