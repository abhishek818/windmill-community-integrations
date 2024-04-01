import { InstancesClient } from "@google-cloud/compute";
 
export async function main(
  keyFilename: string,
  request: {
    projectId: string,
    instance: string,
    zone: string
  },
  operation: 'START' | 'STOP' // start or stop the vm instance
) {
  const computeClient = new InstancesClient({ keyFilename });

  try {
    let compute;
    if(operation == 'START')
    {
      compute = await computeClient.start(request);
    }
    else
    {
      compute = await computeClient.stop(request);
    }
    return compute;
  } catch (error) {
    return {
      error: true,
      message: error || 'Internal Server Error',
    }
  }
}
