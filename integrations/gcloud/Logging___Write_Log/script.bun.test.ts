import { expect, test } from 'bun:test';
import { main } from './script.bun.ts';
// import { Logging } from '@google-cloud/logging';
import { resource } from '../resource.ts';

test('Logging - Write Log', async () => {
  const metadata = {
    resource: { type: 'global' },
    severity: 'INFO',
  };
  const options = {
    resource: { type: 'global' },
  };

  const logName = 'windmill_labs_diary';
  const textEntry = 'Wrote Typescripts for Google Cloud Integration';
  const response = await main(resource, logName, textEntry, metadata, options);

  expect(response).toBeDefined();
  // console.log(response);

  // Not able to delete the log, neither found solution for it anywhere
  // throws "error: 5 NOT_FOUND: Log windmill_labs_diary does not exist in the _Default bucket"
  // const logging = new Logging({
  //   credentials: resource,
  //   projectId: resource.project_id
  // });
  // const log = logging.log(logName);
  // await log.delete();
});
