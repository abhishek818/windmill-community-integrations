
import { expect, test } from "bun:test";
import { main } from "./script.bun.ts";

test("Logging - Write Log", async () => {
  const metadata = {
    resource: {type: 'global'},
    severity: 'INFO'
  };
  const options = {
    resource: {type: 'global'}
  };

  const response = await main(
    './creds.json',
    'windmill_labs_diary',
    'Wrote Typescripts for Google Cloud Integration',
    metadata,
    options);
  
  expect(response).toBeDefined();
  // console.log(response);
});
