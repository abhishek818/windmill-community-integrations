// IMP NOTE: Not adding tests,
// Since Instance needs to be created manually on Google Cloud's site first (and then start/stop
// can be done).
// Tried with available apis like 'Instance_group_managers.create_instances' and
// 'Region_instance_group_managers.create_instances', but is either broken or still requires 
//  instance API and identity management : Service account configuration..

// Wrote a sample test case

// import { expect, test } from "bun:test";
// import { main } from "./script.bun.ts";
// import { InstanceGroupManagersClient } from "@google-cloud/compute";
// import { resource } from "../resource";

// test("Switch Instance Boot Status", async () => {

//   // Create a VM Instance first
//   const instanceName = Math.random().toString(36).slice(2);

//   const computeClient = new InstanceGroupManagersClient({
  //   credentials: resource,
  //   projectId: resource.project_id
  // });
//   const projectId = await computeClient.getProjectId();
//   const request = {
//     instanceGroupManager: "windmill-labs-vm",
//     instanceGroupManagersCreateInstancesRequestResource: {},
//     project: projectId,
//     zone: "asia-south1-a",
//   };

//   // Run request
//   console.log(await computeClient.createInstances(request));

  // const response = await main(
  //   resource,
  //   {
  //     projectId: "windmill-labs",
  //     instance: "windmill-labs-vm",
  //     zone: "asia-south1-a"
  //   },
  //   'START'
  // );

  // console.log(response);
  // expect(response).toBeDefined();
// });
