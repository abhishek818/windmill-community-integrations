
import { expect, test } from "bun:test";
import { main } from "./script.bun.ts";
import { resource } from "../resource.ts";
import { main as deleteUserPost } from "../Delete_Post/script.bun.ts"
import axios from 'axios';

test("Create a Simple Post (User)", async () => {
  // Get current user id' first, create post and delete it later.
  const userInfo = await axios.get(`${resource.baseUrl}/v2/userinfo`, {
    headers: {
      "Authorization": `Bearer ${resource.userAccessToken}`,
      "X-Restli-Protocol-Version": "2.0.0",
      "LinkedIn-Version": `${resource.apiVersion}`
    },
  });
  
  const userId = userInfo.data.sub;
  const response = await main(resource, {
    "author": `urn:li:person:${userId}`,
    "commentary": "Sample text Post for the Windmill-Labs-Community, Testing LinkedIn developer apis",
    "visibility": "PUBLIC",
    "distribution": {
      "feedDistribution": "MAIN_FEED",
      "targetEntities": [],
      "thirdPartyDistributionChannels": []
    },
    "lifecycleState": "PUBLISHED",
    "isReshareDisabledByAuthor": false
  });
  
  expect(response.status).toBe(201);
  
  const postId = response.headers["x-restli-id"];
  // Delete the post
  await deleteUserPost(resource, postId);

});
