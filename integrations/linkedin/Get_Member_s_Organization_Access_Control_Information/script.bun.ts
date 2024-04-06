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

export async function main(resource: Linkedin) {
  const url = `${resource.baseUrl}/rest/organizationAcls?q=roleAssignee`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${resource.organizationAccessToken}`,
        "LinkedIn-Version": `${resource.apiVersion}`,
        "X-Restli-Protocol-Version": "2.0.0"
      },
    });
    
    return response;
  } catch (error) {
    throw error;
  }
}
