// NOTE: fails intermittently throwing whitespaces error on sql query string
import { expect, test } from "bun:test";
import { main } from "./script.bun.ts";
import { main as insertRows } from "../Bigquery_Insert_Rows/script.bun.ts";
import { BigQuery } from "@google-cloud/bigquery";
import { resource } from "../resource.ts";

// dataset and tables can also be created manually on the GCloud website.
test("Run Query", async () => {

  // Create dataset and table first
  const bigquery = new BigQuery({
    credentials: resource,
    projectId: resource.project_id
  });
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
    resource,
    {
      datasetId: datasetId,
      tableId: tableId,
      rows: [
        { firstName: 'john', lastName: 'doe', organization: 'GCloud' },
        { firstName: 'abhishek', lastName: 'gupta', organization: 'Windmill_Labs_Community' }
      ]
    }  
  );

  const response = await main(
    resource,
    `SELECT * from ${datasetId}.${tableId} WHERE organization="Windmill_Labs_Community"`,
    storageLocation
  );

  expect(response).toBeDefined();
  // returns query results
  // console.log(response);

  await bigquery.dataset(datasetId).delete({force: true});
});