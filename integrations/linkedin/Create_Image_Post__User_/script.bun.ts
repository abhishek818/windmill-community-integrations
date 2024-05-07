import axios from 'axios'
import { main as createUserPost } from '../Create_a_Simple_Post__User_/script.bun.ts'

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
	const uploadResponse = await axios.post(
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

	const { uploadUrl, image } = uploadResponse.data.value

	await axios.post(
		uploadUrl,
		{ url: picture },
		{
			// Modified the request body to pass picture as an object
			headers: {
				Authorization: `Bearer ${resource.token}`,
				'X-Restli-Protocol-Version': '2.0.0',
				'LinkedIn-Version': `${resource.apiVersion}`
			}
		}
	)

	// for postData, pass media.content.id as 'uploadUrl' here, refer test file
	if (postData.content?.media) {
		postData.content.media.id = `${image}`
	}

	return await createUserPost(resource, postData)
}
