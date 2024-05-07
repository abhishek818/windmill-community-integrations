import axios from 'axios'

type Linkedin = {
	token: string
	apiVersion: string
}

export async function main(
	resource: Linkedin,
	activityUrn: string // can be either Share/Post/Comment Urn
) {
	const url = `https://api.linkedin.com/rest/socialActions/${activityUrn}/comments`
	return await axios.get(url, {
		headers: {
			Authorization: `Bearer ${resource.token}`,
			'X-Restli-Protocol-Version': '2.0.0',
			'LinkedIn-Version': `${resource.apiVersion}`
		}
	})
}
