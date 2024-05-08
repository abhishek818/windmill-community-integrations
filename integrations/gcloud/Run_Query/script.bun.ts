// IMPORTANT NOTE: Streaming insert api is supported in paid tier only
import { BigQuery } from '@google-cloud/bigquery'

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
	query: string,
	location?: string // Location must match that of the dataset(s) referenced in the query.
) {
	const bigquery = new BigQuery({
		credentials: resource,
		projectId: resource.project_id
	})
	const options = {
		query: query,
		location: location
	}

	const [job] = await bigquery.createQueryJob(options)
	const [rows] = await job.getQueryResults()

	return rows
}
