# Gcloud Integration

## Environment variables and credentials setup
For configuration steps, Refer this medium article, follow first 3 steps mentioned - (https://javascript.plainenglish.io/inserting-and-querying-data-in-google-big-query-with-javascript-517aa8d0dc52) 
OR
Read below:

Steps:
1. Sign In/Sign Up and Create a project on the Google Cloud site (https://console.cloud.google.com/).

2. Enable the respective "BigQuery/BigQuery-Data-Transfer/Logging/Storage/Compute" services by clicking on "APIs and services" section either on 'Quick access' or on project's homepage. Use the search bar for finding these services.

3. Set up a Service Account by clicking on 'IAM & Admin' section. Connect this service account to all API services applicable (mentioned in previous step) by going within each respective services' section.

4. Click on 'Service Accounts' present in 'IAM & admin' section and further click on the 3 dots under 'Actions' header available for the newly created service account column/details.

5. IMPORTANT - Enable billing or buy the paid tier/start free trial. (All services are supported only in paid tier). 

Click on 'Manage Keys' and then 'ADD KEY' -> 'Create New Key', enter details and a credentials file (json format) will be downloaded. Fill the .env file using this downloaded file.

Recommendations:
For Bigquery, datasets and tables can be created either manually on the site or by APIs (Refer test files).
Keep the storage location SAME or 'multi-regions' for respective projects/datasets/tables.
