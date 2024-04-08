import { expect, test } from 'bun:test';
import { main } from './script.bun.ts';
import { BigQuery } from '@google-cloud/bigquery';
import { resource } from '../resource.ts';

// dataset and tables can be created manually on the GCloud website also.
// IMPORTANT NOTE: Streaming insert api is supported in paid tier only
// Else, throws up "error: Access Denied: BigQuery BigQuery: Streaming insert is not allowed in the free tier"
test('Bigquery Insert Rows', async () => {
  // Create dataset and table first
  const bigquery = new BigQuery({
    credentials: resource,
    projectId: resource.project_id,
  });

  const datasetId = Math.random().toString(36).slice(2) + '_windmill_labs_dataset';
  // Specify the geographic location where the dataset should reside
  const datasetOptions = {
    location: 'US',
  };
  // Create a new dataset
  await bigquery.createDataset(datasetId, datasetOptions);

  const tableId = Math.random().toString(36).slice(2) + '_windmill_labs_table';
  const schema = 'firstName:string, lastName:string, organization:string';
  const tableOptions = {
    schema: schema,
    location: 'US',
  };
  // Create a new table in the dataset
  await bigquery.dataset(datasetId).createTable(tableId, tableOptions);

  const response = await main(resource, {
    datasetId: datasetId,
    tableId: tableId,
    rows: [
      { firstName: 'john', lastName: 'doe', organization: 'GCloud' },
      { firstName: 'abhishek', lastName: 'gupta', organization: 'Windmill_Labs_Community' },
    ],
  });

  expect(response).toBeDefined();

  // delete the dataset
  await bigquery.dataset(datasetId).delete({ force: true });
});
