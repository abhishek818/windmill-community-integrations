import { InstancesClient } from '@google-cloud/compute'

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
	request: {
		projectId: string
		instance: string
		zone: string
	},
	operation: 'START' | 'STOP' // start or stop the vm instance
) {
	const computeClient = new InstancesClient({
		credentials: resource,
		projectId: resource.project_id
	})

	let compute
	if (operation == 'START') {
		compute = await computeClient.start(request)
	} else {
		compute = await computeClient.stop(request)
	}

	return compute
}
