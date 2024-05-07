import axios from 'axios'

type Linkedin = {
	token: string
	apiVersion: string
}

export async function main(
	resource: Linkedin,
	activityUrn: string, // can be either Share/Post/Comment Urn
	likeData: {
		actor: string
		object: string
	}
) {
	const url = `https://api.linkedin.com/v2/socialActions/${activityUrn}/likes`
	return await axios.post(url, likeData, {
		headers: {
			Authorization: `Bearer ${resource.token}`,
			'X-Restli-Protocol-Version': '2.0.0',
			'LinkedIn-Version': `${resource.apiVersion}`,
			'Content-Type': 'application/json'
		}
	})
}
