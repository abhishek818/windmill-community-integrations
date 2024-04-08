import { expect, test } from 'bun:test';
import { main } from './script.bun.ts';
import { resource } from '../resource.ts';
import { main as deleteUserPost } from '../Delete_Post/script.bun.ts';
import axios from 'axios';

test('Create Image Post User)', async () => {
  const userInfo = await axios.get(`${resource.baseUrl}/v2/userinfo`, {
    headers: {
      Authorization: `Bearer ${resource.userAccessToken}`,
      'X-Restli-Protocol-Version': '2.0.0',
      'LinkedIn-Version': `${resource.apiVersion}`,
    },
  });

  const userId = userInfo.data.sub;

  const response = await main(
    resource,
    {
      initializeUploadRequest: {
        owner: `urn:li:person:${userId}`,
      },
    },
    '../testAssets/img/landscapes.jpg',
    {
      author: `urn:li:person:${userId}`,
      commentary:
        'Sample text Post for the Windmill-Labs-Community, Testing LinkedIn developer apis',
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      content: {
        media: {
          title: 'Windmill-Labs-Art-Works',
          // refer how id gets set in the main file.
        },
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
    },
  );

  expect(response.status).toBe(201);

  const postId = response.headers['x-restli-id'];
  // Delete the post
  await deleteUserPost(resource, postId);
});
