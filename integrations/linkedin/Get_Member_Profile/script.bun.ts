import axios from 'axios'

type Linkedin = {
	token: string
	apiVersion: string
}

export async function main(resource: Linkedin, personId: string) {
	const url = `https://api.linkedin.com/v2/people/(id:${personId})`
	return await axios.get(url, {
		headers: {
			Authorization: `Bearer ${resource.token}`,
			'LinkedIn-Version': `${resource.apiVersion}`,
			'X-Restli-Protocol-Version': '2.0.0'
		}
	})
}
