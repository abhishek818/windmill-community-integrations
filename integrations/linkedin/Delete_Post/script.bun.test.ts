import { expect, test } from 'bun:test'
import { main } from './script.bun.ts'
import { resource } from '../resource.ts'
import { main as createUserPost } from '../Create_a_Simple_Post__User_/script.bun.ts'
import axios from 'axios'

test('Delete Post', async () => {
	const userInfo = await axios.get(`https://api.linkedin.com/v2/userinfo`, {
		headers: {
			Authorization: `Bearer ${resource.token}`,
			'X-Restli-Protocol-Version': '2.0.0',
			'LinkedIn-Version': `${resource.apiVersion}`
		}
	})

	const userId = userInfo.data.sub
	const actor = `urn:li:person:${userId}`
	const userPost = await createUserPost(resource, {
		author: `${actor}`,
		commentary: 'Sample text Post for the Windmill-Labs-Community, Testing LinkedIn developer apis',
		visibility: 'PUBLIC',
		distribution: {
			feedDistribution: 'MAIN_FEED',
			targetEntities: [],
			thirdPartyDistributionChannels: []
		},
		lifecycleState: 'PUBLISHED',
		isReshareDisabledByAuthor: false
	})

	const postId = userPost.headers['x-restli-id']
	// Delete the post
	const response = await main(resource, postId)
	expect(response).toBeDefined()

	// console.log(response);
})
