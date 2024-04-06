import axios from 'axios';
import { main as createUserPost } from "../Create_a_Simple_Post__User_/script.bun.ts";

type Linkedin = {
  userClientId: string;
  userClientSecret: string;
  userAccessToken: string;
  organizationClientId: string;
  organizationClientSecret: string;
  organizationAccessToken: string;
  baseUrl: string;
  apiVersion: string;
};

export async function main(
  resource: Linkedin,
  imageData: {
    initializeUploadRequest: {
      owner: string;
    }
  },
  pictureUrl: string,
  postData: {
    author: string;
    commentary: string;
    visibility: string;
    distribution: {
      feedDistribution: string;
      targetEntities: any[];
      thirdPartyDistributionChannels: any[];
    };
    content?: {
      media: {
        title: string;
        id: string;
      }
    };
    lifecycleState: string;
    isReshareDisabledByAuthor: boolean;
  }
) {
  const url = `${resource.baseUrl}/rest/images?action=initializeUpload`;
  try {
    const uploadResponse = await axios.post(url, imageData, {
      headers: {
        "Authorization": `Bearer ${resource.userAccessToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "LinkedIn-Version": `${resource.apiVersion}`
      },
    });

    const { uploadUrl, image } = uploadResponse.data.value;

    await axios.post(uploadUrl, { url: pictureUrl }, { // Modified the request body to pass pictureUrl as an object
      headers: {
        "Authorization": `Bearer ${resource.userAccessToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "LinkedIn-Version": `${resource.apiVersion}`
      },
    });
    
    // for postData, pass media.content.id as 'uploadUrl' here, refer test file
    if (postData.content?.media) {
      postData.content.media.id = `${image}`;
    }
    
    const imageUserPostResponse = await createUserPost(resource, postData);

    return imageUserPostResponse;
  } catch (error) {
    throw error;
  }
}
