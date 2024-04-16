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

export async function main(resource: Linkedin, personIdList: string[]) {
  let personIdUrl = '';
  for (let i = 0; i < personIdList.length; i++) {
    personIdUrl += `(id:${personIdList[i]})`;
    if (i < personIdList.length - 1) {
      personIdUrl += ',';
    }
  }
  const url = `${resource.baseUrl}/v2/people/${personIdUrl}`;

  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${resource.userAccessToken}`,
      'LinkedIn-Version': `${resource.apiVersion}`,
      'X-Restli-Protocol-Version': '2.0.0',
    },
  });
}
