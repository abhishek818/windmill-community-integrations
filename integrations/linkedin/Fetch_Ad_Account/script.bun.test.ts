
// NOTE: Requires Advertising Api access, Refer README.md file

// Sample Curl request:
// curl -X POST 'https://api.linkedin.com/rest/adAccounts' \
// --H 'Authorization: Bearer {INSERT_TOKEN}' \
// --H 'LinkedIn-Version: {version number in the format YYYYMM}' \
// --H 'X-Restli-Protocol-Version: 2.0.0' \
// --H 'Content-Type: application/json' \
// --data '{
//     "currency": "USD", 
//     "name": "Company A", 
//     "notifiedOnCampaignOptimization": true, 
//     "notifiedOnCreativeApproval": true, 
//     "notifiedOnCreativeRejection": true, 
//     "notifiedOnEndOfCampaign": true, 
//     "reference": "urn:li:organization:2414183", 
//     "type": "BUSINESS"
// }'

// import { expect, test } from "bun:test";
// import { main } from "./script.bun.ts";
// import { resource } from "../resource.ts";

// test("Fetch Ad Account", async () => {
//   // script arguments here (also load environment variables if needed using Bun.env.VARIABLE_NAME!)

//   console.log("TEST: Will test Fetch Ad Account with arguments: " /* arguments */)

//   // any setup code here

//   // calling main
//   console.log("TEST: Running main function");
//   const response = await main(resource, /* script arguments */);

//   // assertions here
//   // test the response of the main function as well as the side effects of the action directly on the service
// });
