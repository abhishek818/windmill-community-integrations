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
      };
    };
    lifecycleState: string;
    isReshareDisabledByAuthor: boolean;
  },
) {
  const url = `${resource.baseUrl}/rest/posts`;
  return await axios.post(url, postData, {
    headers: {
      Authorization: `Bearer ${resource.userAccessToken}`,
      'X-Restli-Protocol-Version': '2.0.0',
      'LinkedIn-Version': `${resource.apiVersion}`,
      'Content-Type': 'application/json',
    },
  });
}
