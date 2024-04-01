import { Logging } from '@google-cloud/logging';

export async function main(
  keyFilename: string,
  logName: string,
  textEntry: string,
  metadata : {
    resource: {} | string,
    severity?: string, // Refer severity levels here : https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
    [key: string]: any
  },
  options: {
    resource: {} | string,
    [key: string]: any
  }
) {
  const logging = new Logging({ keyFilename });
  const log = logging.log(logName);
  const text_entry = log.entry(metadata, textEntry);
  
  try {
    const response = await log.write(text_entry, options);
    return response;
  } catch (error) {
    return {
      error: true,
      message: error || 'Internal Server Error',
    }
  }
}
