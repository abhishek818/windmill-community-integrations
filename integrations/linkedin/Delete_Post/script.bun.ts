import axios from 'axios'

type Linkedin = {
	token: string
	apiVersion: string
}

export async function main(resource: Linkedin, postId: string) {
	const url = `https://api.linkedin.com/rest/posts/${postId}`
	return await axios.delete(url, {
		headers: {
			Authorization: `Bearer ${resource.token}`,
			'LinkedIn-Version': `${resource.apiVersion}`
		}
	})
}
