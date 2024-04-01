
import { expect, test } from "bun:test";
import { main } from "./script.bun.ts";
import { main as insertRows } from "../Bigquery_Insert_Rows/script.bun.ts";
import { BigQuery } from "@google-cloud/bigquery";

test("Create Scheduled Query", async () => {

  // Create dataset and table first
  // api tries to create table if not existing
  const keyFilename = './creds.json';
  const bigquery = new BigQuery({keyFilename});
  const storageLocation = 'US';

  const datasetId = Math.random().toString(36).slice(2) + '_windmill_labs_dataset';
  // Specify the geographic location where the dataset should reside
  const datasetOptions = {
    location: storageLocation,
  };
  // Create a new dataset
  await bigquery.createDataset(datasetId, datasetOptions);

  const tableId = Math.random().toString(36).slice(2) + '_windmill_labs_table';
  const schema = 'firstName:string, lastName:string, organization:string';
  const tableOptions = {
    schema: schema,
    location: storageLocation,
  };
  // Create a new table in the dataset
  await bigquery.dataset(datasetId).createTable(tableId, tableOptions);
  
  await insertRows(
    keyFilename,
    {
      datasetId: datasetId,
      tableId: tableId,
      rows: [
        { firstName: 'john', lastName: 'doe', organization: 'GCloud' },
        { firstName: 'abhishek', lastName: 'gupta', organization: 'Windmill_Labs_Community' }
      ]
    }  
  );
  
  const queryString = `
  SELECT * from
  ${datasetId}.${tableId}
  LIMIT 1000
  `;

  const transferConfig = {
    destination_dataset_id: datasetId,
    display_name: "Scheduled_Query_Windmill_Labs",
    data_source_id: "google_cloud_storage",
    params: {
        "query": queryString,
        "destination_table_name_template": tableId,
        "write_disposition": "WRITE_APPEND"
    },
    schedule: "every 24 hours"
  };

  const response = await main(keyFilename, transferConfig, storageLocation);
  
  expect(response).toBeDefined();
  // console.log(response);
});
