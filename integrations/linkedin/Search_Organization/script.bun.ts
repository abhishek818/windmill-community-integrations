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
  searchBy: 'vanity' | 'email',
  searchQuery: string // must be either vanity name or email domain
) {
  let queryStringUrl;
  if(searchBy === 'vanity')
  {
    queryStringUrl = `organizationBrands?q=vanityName&vanityName=${searchQuery}`;
  }
  else
  {
    queryStringUrl = `organizations?q=emailDomain&emailDomain=${searchQuery}`;
  }

  const url = `${resource.baseUrl}/rest/${queryStringUrl}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${resource.organizationAccessToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "LinkedIn-Version": `${resource.apiVersion}`
      },
    });
    
    return response;
  } catch (error) {
    throw error;
  }
}
