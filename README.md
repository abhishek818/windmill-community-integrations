# Windmill Community Integrations Guide

[Windmill](https://www.windmill.dev/) is an Open-source developer infrastructure for internal tools (APIs, background jobs, workflows and UIs). Self-hostable alternative to Airplane, Pipedream, Superblocks and a simplified Temporal with autogenerated UIsm and custom UIs to trigger workflows and scripts as internal apps.

[Windmill Hub](https://hub.windmill.dev/) is a platform that provides Windmill's users with reusable scripts, flows, apps which interact with a variety of integrations. They were created by the community and the Windmill team itself. 

## Contributing guide

We provide you with a list of desired integrations and, for each integration, a list of script descriptions to help you contribute.
In addition, we provide a CLI to generate all the boilerplate code for a given integration.

Check issues for the desired integration we currently need.

You can find below the guide to contributing all the scripts for a specific integration

### Credentials and environment variables setup

- Fork this repository, clone it, create a new branch and install the dependencies using `bun install`
- Run `bun run setup {integration_name}` to create and setup the integration folder along with the resource, resource type, README, scripts, and tests templates.
- Create an account on the integration's platform if you don't have one (can be your private account)
- Put the credentials in the `integrations/{integration_name}/.env` file. You can also add other variables that you may need and are user specific but aren't needed for authentication (e.g. `OWNER` and `REPO` for GitHub).
- Update the resource object in `integrations/{integration_name}/resource.ts` with the credentials from the environment variables using Bun.env.VARIABLE_NAME! (these are gitinore'd, so they won't be pushed to the repository)
- Adjust the resource type definition in `integrations/{integration_name}/resource_type.json` to resource object. You have to follow the [json schema format](https://json-schema.org/learn/getting-started-step-by-step).
- Write down the steps to get the credentials for the integration as well as a description of all environment variables needed in the `integrations/{integration_name}/README.md` file
- Install any packages you may need (e.g. the integration SDK) using `bun add {package_name}` **inside the `integrations/{integration_name}` folder**.

Note: resource types are object definitions that represent credentials for a specific integration. You can learn more about them [here](https://www.windmill.dev/docs/core_concepts/resources_and_types).

Special case for OAUTH: if the integration uses OAuth, do not include the OAuth flow in the script. Just define a property named `token` on the resource type that you can set to the access token during your tests.

### Creating the scripts

- Adjust each script template to achieve the desired functionality. You will need to specify the parameters of the resource type in each script. They have to be the same in all the scripts and match the resource type definition in `integrations/{integration_name}/resource_type.json`. For function parameters, define the types inline (e.g. "repositories: { owner: string, repo: string }[]") rather than defining a type for each parameter and avoid nested types when possible.
- Update the test file with appropriate testing arguments. Include any preliminary and clean-up steps. Here's a general guide for the tests:
  - GET: Before calling the script, create the object that you will retrieve. After calling the script, just check that what the script returned matches the object you created. Delete the object.
  - POST/PUT: Create the object, call the script to update it, check that the object was updated as expected using the SDK/API. Delete the object.
  - DELETE: Create the object, call the script to delete it, check that the object was deleted using the SDK/API.
- You can also write into the `integrations/{integration_name}/setup.ts` file any setup code that you may need before and after all tests of all scripts (e.g. creating a new project before running the tests and deleting it after).
- Please make sure to format the code using prettier before creating the PR.
- **Inside the `integrations/{integration_name}` folder**, run `bun test --preload ./setup.ts` to check the tests.

Tip: You can find a complete example for GitHub in the `integrations/github` folder

### Validating the contribution

Once you're done, create a PR with all the files apart from `.env` (which should be gitignore'd by default). We will follow your steps to get credentials, check the tests, and validate the PR. 


<!-- 

## Desired integrations

- Zoom
- Gforms
- Typeform
- Reddit
- WooCommerce

## Desired OpenAPI integrations

- [Digital Ocean](https://raw.githubusercontent.com/digitalocean/openapi/main/specification/DigitalOcean-public.v2.yaml)
- [DocuSign](https://raw.githubusercontent.com/docusign/OpenAPI-Specifications/master/esignature.rest.swagger-v2.1.json)
- [Dropbox](https://raw.githubusercontent.com/dropbox/dropbox-api-spec/master/dropbox_api_v2.json)
- [Klaviyo](https://raw.githubusercontent.com/klaviyo/openapi/main/openapi/stable.json)
- [Segment](blob:https://docs.segmentapis.com/f819be65-205f-4cc1-acc3-6e62d73068cf)
- [smartsheet](blob:https://smartsheet.redoc.ly/48102eb8-af78-4edc-a31f-420228a5a198)
- [Splitwise](https://raw.githubusercontent.com/splitwise/api-docs/main/splitwise.yaml)
- [Supabase](https://api.supabase.com/api/v1-json)

## Contributing guide

### Contributing a single or few scripts

Go directly on [Windmill Hub](https://hub.windmill.dev/), create your script, we will then review your script and approve it to make it available to all users. You can ping us on [discord](https://discord.gg/aT3NhuxSK4) if you think we've missed it.

### Contributing a whole collection of scripts for a specific integration using their OpenAPI specification

1. Follow the guide below to generate scripts for a given integration.
2. Once you're done, you have to test at least one of the generated script for each verb (GET, POST/PUT and DELETE).
You might need to create an account to get credentials.
You can find a template for the test file in the template folder.
3. You should set the description of the resource type (`*.resource_type.json` file) with instructions on how to get the credentials.
4. Once you've checked that it worked, create a PR with all the generated scripts, the resource type definition and the test file (DO NOT INCLUDE the test credentials) in the correct folder. 
In the PR description, you should include a description of the integration and a link to the documentation.
The PR also has to include a video of the test running and working.

#### OpenAPI code generator CLI

We have published a [CLI (bun only)](https://www.npmjs.com/package/@windmill-labs/openapi-codegen-cli) to generate scripts from an OpenAPI spec which makes it easy to generate a large number of scripts at once.

Minimal example:
```
bunx @windmill-labs/openapi-codegen-cli --hub --schemaUrl "urlOrLocalOpenApiSpecInJsonOrYaml" --outputDir "./integration_name" --resourceTypeName "IntegrationName" --pretty
```

The --hub option is necessary to make sure the generated content is in the right format to be uploaded on the hub. The outputDir has to be the integration name in snake case and the resourceTypeName will be automatically converted to pascal case.

The CLI allows you to customise the scripts generated according to the authorisation system of the integration API. You can see all the available options below.

Here's a working example for generating scripts for GitHub
```
bunx @windmill-labs/openapi-codegen-cli \
  --hub \
  --schemaUrl "https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.json" \
  --outputDir "./github" \
  --resourceTypeName "github"
```

#### Options

**Schema url**

The schema url can be a local file or a remote url. It can be a json or yaml file.

**Override base url**

Instead of using the base url from the spec file, you can override it by passing the `--baseUrl "https://api.example.com"` flag.

**Bearer auth**

By default, bearer authentication is used. It will define a token property on the resource type. You can change the name of the token property by passing the `--tokenName "token"` flag.

**Basic auth**

For basic authentication, pass the `--authKind basic` flag. By default, it will add "username" and "password" to the resource type. You can change the names of the properties in the resource type by passing the `--usernameName "username"` and `--passwordName "password"` flags.

**Query auth**

For query authentication, pass the `--authKind query` flag. By default, it will add a token property on the resource type and pass the token as a query parameter named "token". Setting tokenName will change the name of the token property as well as the name of the query parameter. A key property will also be added to the resource types and passed as a query parameter named "key".

**Header auth**

For header authentication, pass the `--authKind header` flag and the `--headerName "X-CUSTOM-HEADER"` flag. Like for bearer and query auth, it will add a token property to the resource type. You can change the name of the token property in the resource type by passing the `--tokenName "token"` flag.

**Extra resource type params for path params**

You can specify parameters of the path to be included in the resource type by adding the `--extraResourceParams "extraParameter1,extraParameter2"` flag.
The generated script path will use the resource type properties instead of taking them as parameters.
This is useful when you have a path parameter (e.g. {subdomain}, {organisation_id}, etc...) that is common to all endpoints of the spec and you don't want to pass it as a parameter in each script. 

**Extra headers**

You can also specify extra headers to be passed to each request by adding the `--extraHeaders "header1:propertyName1,header2:propertyName2"` flag.
Those property names will be added to the resource type.

**Specifying tags**

You can limit the CLI to only generate scripts for a subset of the spec tags by passing the `--tags "tag1,tag2"` flag.
 -->
