// import { expect, test } from "bun:test";
// import { main } from "./script.bun.ts";
// import { resource } from "../resource.ts";
// import axios from "axios";

// Requires Advertising API access
// data: {
//   serviceErrorCode: 100,
//   message: "Not enough permissions to access: GET /people/(id:vp2BCxQr59)",
//   status: 403,
// },

// test("Get Member Profile", async () => {
//   const userInfo = await axios.get(`${resource.baseUrl}/v2/userinfo`, {
//     headers: {
//       "Authorization": `Bearer ${resource.userAccessToken}`,
//       "X-Restli-Protocol-Version": "2.0.0",
//       "LinkedIn-Version": `${resource.apiVersion}`
//     },
//   });
  
//   const personId = userInfo.data.sub;

//   const response = await main(resource, personId);
//   console.log(response);
//   // assertions here
//   // test the response of the main function as well as the side effects of the action directly on the service
// });
