// NOTE: Requires 'Community Management API' access, Refer README.md file for more info..
// Also, Tried with test organizations given in below Linkedin developer docs, still fails :
// https://learn.microsoft.com/en-us/linkedin/marketing/community-management/organizations?view=li-lms-2024-03#test-organizations

// The main function should work since its similar to User Image Post api which is tested..

// data: {
//   status: 403,
//   serviceErrorCode: 100,
//   code: "ACCESS_DENIED",
//   message: "Not enough permissions to access: partnerApiOrganizationAcls.FINDER-roleAssignee.20240201",
// }

// import { test } from "bun:test";
// import { main } from "./script.bun.ts";
// import { resource } from "../resource.ts";
// import axios from 'axios';

// type Linkedin = {
//   userClientId: string;
//   userClientSecret: string;
//   userAccessToken: string;
//   organizationClientId: string;
//   organizationClientSecret: string;
//   organizationAccessToken: string;
//   baseUrl: string;
//   apiVersion: string;
// };

// async function getOrganizationId(resource: Linkedin) {
//   const url = `${resource.baseUrl}/rest/organizationAcls?q=roleAssignee`;

//   try {
//     const response = await axios.get(url, {
//       headers: {
//         "Authorization": `Bearer ${resource.organizationAccessToken}`,
//         "X-Restli-Protocol-Version": "2.0.0",
//         "LinkedIn-Version": `${resource.apiVersion}`
//       },
//     });

//     return response.elements[0].organization;
//   } catch (error) {
//     console.error('Error fetching organization data, METHOD: /organizationAcls', error);
//     throw error;
//   }
// }

// test("Create Image Post Organization)", async () => {
//   const organizationId = await getOrganizationId(resource);

//   const response = await main(resource,
//   {
//     "initializeUploadRequest": {
//         "owner": `${organizationId}`
//     }
//   },
//   "https://pixabay.com/photos/tree-sunset-clouds-sky-silhouette-736885/"
//   );

//   const { uploadUrl, image } = response.value;
//   console.log(response);
// });
