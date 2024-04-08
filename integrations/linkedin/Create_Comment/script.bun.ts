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
  commentData: {
    actor: string;
    object: string;
    message: {
      text: string;
    };
    content?: [
      {
        entity: {
          image: string;
        };
      },
    ];
  },
) {
  const url = `${resource.baseUrl}/v2/socialActions/${activityUrn}/comments`;
  try {
    const response = await axios.post(url, commentData, {
      headers: {
        Authorization: `Bearer ${resource.userAccessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
        'LinkedIn-Version': `${resource.apiVersion}`,
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
