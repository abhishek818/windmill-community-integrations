import axios from 'axios'

type Linkedin = {
	token: string
	apiVersion: string
}

type Base64 = string

export async function main(
	resource: Linkedin,
	activityUrn: string, // can be either Share/Post/Comment Urn
	commentData: {
		actor: string
		object: string
		message: {
			text: string
		}
		content?: [
			{
				entity: {
					image: Base64
				}
			}
		]
	}
) {
	const url = `https://api.linkedin.com/v2/socialActions/${activityUrn}/comments`
	return await axios.post(url, commentData, {
		headers: {
			Authorization: `Bearer ${resource.token}`,
			'X-Restli-Protocol-Version': '2.0.0',
			'LinkedIn-Version': `${resource.apiVersion}`,
			'Content-Type': 'application/json'
		}
	})
}
