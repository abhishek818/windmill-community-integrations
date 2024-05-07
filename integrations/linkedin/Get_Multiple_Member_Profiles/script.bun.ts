import axios from 'axios'

type Linkedin = {
	token: string
	apiVersion: string
}

export async function main(resource: Linkedin, personIdList: string[]) {
	let personIdUrl = ''
	for (let i = 0; i < personIdList.length; i++) {
		personIdUrl += `(id:${personIdList[i]})`
		if (i < personIdList.length - 1) {
			personIdUrl += ','
		}
	}
	const url = `https://api.linkedin.com/v2/people/${personIdUrl}`

	return await axios.get(url, {
		headers: {
			Authorization: `Bearer ${resource.token}`,
			'LinkedIn-Version': `${resource.apiVersion}`,
			'X-Restli-Protocol-Version': '2.0.0'
		}
	})
}
