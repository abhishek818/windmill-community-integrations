import axios from 'axios'

type Linkedin = {
	token: string
	apiVersion: string
}

export async function main(
	resource: Linkedin,
	searchBy: 'vanity' | 'email',
	searchQuery: string // must be either vanity name or email domain
) {
	let queryStringUrl
	if (searchBy === 'vanity') {
		queryStringUrl = `organizationBrands?q=vanityName&vanityName=${searchQuery}`
	} else {
		queryStringUrl = `organizations?q=emailDomain&emailDomain=${searchQuery}`
	}

	const url = `https://api.linkedin.com/rest/${queryStringUrl}`
	return await axios.get(url, {
		headers: {
			Authorization: `Bearer ${resource.token}`,
			'X-Restli-Protocol-Version': '2.0.0',
			'LinkedIn-Version': `${resource.apiVersion}`
		}
	})
}
