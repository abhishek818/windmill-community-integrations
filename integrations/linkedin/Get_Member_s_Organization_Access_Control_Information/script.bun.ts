import axios from 'axios'

type Linkedin = {
	token: string
	apiVersion: string
}

export async function main(resource: Linkedin) {
	return await axios.get('https://api.linkedin.com/rest/organizationAcls?q=roleAssignee', {
		headers: {
			Authorization: `Bearer ${resource.token}`,
			'LinkedIn-Version': `${resource.apiVersion}`,
			'X-Restli-Protocol-Version': '2.0.0'
		}
	})
}
