import { expect, test } from 'bun:test'
import { main } from './script.bun.ts'
import { resource } from '../resource.ts'
import { main as createUserPost } from '../Create_a_Simple_Post__User_/script.bun.ts'
import { main as deleteUserPost } from '../Delete_Post/script.bun.ts'
import axios from 'axios'

test('Create Comment', async () => {
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

	// Response (partial) for create post is :
	// headers: {
	//   location: "/posts/urn%3Ali%3Ashare%3A7182373441684078594",
	// }
	// you have to parse "urn%3Ali%3Ashare%3A7182373441684078594" and pass it in the path.
	const postUrn = userPost.headers['location'].split('/').pop()
	const postId = userPost.headers['x-restli-id']
	const messageText = 'Agree with you, nice contributions to our windmill-labs community mate!'
	const response = await main(resource, postUrn, {
		actor: `${actor}`,
		object: `${postId}`,
		message: {
			text: `${messageText}`
		}
	})

	expect(response.status).toBe(201)
	expect(response.data.actor).toBe(actor)
	expect(response.data.message.text).toBe(messageText)

	// Delete the post
	await deleteUserPost(resource, postId)
})
