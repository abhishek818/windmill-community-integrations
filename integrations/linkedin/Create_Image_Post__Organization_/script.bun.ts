import axios from 'axios'

type Linkedin = {
	token: string
	apiVersion: string
}

type Base64 = string

export async function main(
	resource: Linkedin,
	imageData: {
		initializeUploadRequest: {
			owner: string
		}
	},
	picture: Base64,
	postData: {
		author: string
		commentary: string
		visibility: string
		distribution: {
			feedDistribution: string
			targetEntities: any[]
			thirdPartyDistributionChannels: any[]
		}
		content?: {
			media: {
				title: string
				id: string
			}
		}
		lifecycleState: string
		isReshareDisabledByAuthor: boolean
	}
) {
	return await axios.post(
		'https://api.linkedin.com/rest/images?action=initializeUpload',
		imageData,
		{
			headers: {
				Authorization: `Bearer ${resource.token}`,
				'X-Restli-Protocol-Version': '2.0.0',
				'LinkedIn-Version': `${resource.apiVersion}`
			}
		}
	)
}
