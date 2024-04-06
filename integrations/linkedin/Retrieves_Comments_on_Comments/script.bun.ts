import axios from 'axios';

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
  activityUrn: string, // can be either Share/Post/Comment Urn
  commentId: string
) {
  const url = `${resource.baseUrl}/rest/socialActions/urn:li:comment:(urn:li:activity:${activityUrn},${commentId}/comments`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${resource.userAccessToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "LinkedIn-Version": `${resource.apiVersion}`
      },
    });
    
    return response;
  } catch (error) {
    throw error;
  }
}
