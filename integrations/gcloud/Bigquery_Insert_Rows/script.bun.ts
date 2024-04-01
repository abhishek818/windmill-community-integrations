// IMPORTANT NOTE: Streaming insert api is supported in paid tier only
import { BigQuery } from "@google-cloud/bigquery";

export async function main(
  keyFilename: string,
  data: {
    datasetId: string;
    tableId: string;
    rows: {
      [key: string]: any;
    };
  } 
) {
  const bigquery = new BigQuery({keyFilename});

  try {
    const response = await bigquery.dataset(data.datasetId).table(data.tableId).insert(data.rows);
    return response;
  } catch (error) {
    return {
      error: true,
      message: error || 'Internal Server Error',
    }
  }
}
