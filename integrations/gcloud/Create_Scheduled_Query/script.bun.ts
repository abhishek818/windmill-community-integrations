import { protos, DataTransferServiceClient } from '@google-cloud/bigquery-data-transfer';

export async function main(
  keyFilename: string, // path of credentials file.
  transferConfig: {
    destination_dataset_id: string,
    display_name: string,
    data_source_id: string,
    params: {
      "query": string,
      "destination_table_name_template": string,
      "write_disposition"?: "WRITE_TRUNCATE" | "WRITE_APPEND" | "WRITE_EMPTY",
      "partitioning_field"?: string
    },
    schedule: string
  },
  storageLocation: string
) {
  const datatransferClient = new DataTransferServiceClient({ keyFilename });

  try {
    const projectId = await datatransferClient.getProjectId();
    const parent = await datatransferClient.projectPath(projectId) + `/locations/${storageLocation}`;
    
    // creates a TransferConfig message from a plain object, also converts values to their respective internal types.
    const transferConfigObject = await protos.google.cloud.bigquery.datatransfer.v1.TransferConfig.fromObject(transferConfig);
    // optional: service_account_name
    let request = {
      parent,
      transferConfigObject
    };
    
    const response = await datatransferClient.createTransferConfig(request);
    return response;
  } catch (error) {
    return {
      error: true,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    };
  }
}
