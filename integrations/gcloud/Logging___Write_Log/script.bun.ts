import { Logging } from '@google-cloud/logging'

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
	logName: string,
	textEntry: string,
	metadata: {
		resource: {} | string
		severity?: string // Refer severity levels here : https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
		[key: string]: any
	},
	options: {
		resource: {} | string
		[key: string]: any
	}
) {
	const logging = new Logging({
		credentials: resource,
		projectId: resource.project_id
	})
	const log = logging.log(logName)
	const text_entry = log.entry(metadata, textEntry)

	return await log.write(text_entry, options)
}
