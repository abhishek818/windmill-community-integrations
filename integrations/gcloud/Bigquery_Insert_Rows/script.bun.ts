// IMPORTANT NOTE: Streaming insert api is supported in paid tier only
import { BigQuery } from '@google-cloud/bigquery';

type Gcloud = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
};

export async function main(
  resource: Gcloud,
  data: {
    datasetId: string;
    tableId: string;
    rows: {
      [key: string]: any;
    };
  },
) {
  const bigquery = new BigQuery({
    credentials: resource,
    projectId: resource.project_id,
  });

  return await bigquery.dataset(data.datasetId).table(data.tableId).insert(data.rows);
}
