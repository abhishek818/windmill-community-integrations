// IMPORTANT NOTE: Streaming insert api is supported in paid tier only
import { BigQuery } from "@google-cloud/bigquery";

export async function main(
  keyFilename: string,
  query: string,
  location?: string // Location must match that of the dataset(s) referenced in the query. 
) {
  const bigquery = new BigQuery({keyFilename});
  const options = {
    query: query,
    location: location
  };

  try {
    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();
    return rows;
  } catch (error) {
    return {
      error: true,
      message: error || 'Internal Server Error',
    }
  }
}
