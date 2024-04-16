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

export async function main(resource: Linkedin, postId: string) {
  const url = `${resource.baseUrl}/rest/posts/${postId}`;
  return await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${resource.userAccessToken}`,
      'LinkedIn-Version': `${resource.apiVersion}`,
    },
  });
}
