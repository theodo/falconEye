# Falcon Eye

This repositroy contains a script that runs [Lighthouse](https://developers.google.com/web/tools/lighthouse/) on a list of URLs and sends the results to a google datasheet to be analyzed.

## How it works

Using Github Actions, the script runs every day at a given time. It will then run Lighthouse on the list of URLs defined in the Lighthouse Workflow and send the results to a google datasheet.

### Requirements:

This repository requires a valid google sheet connection using a google service account. 
To create the service account and retrieve the necessary keys, look at the Setup instructions below.

## Setup & Usage

- Create your own repository by clicking on the `Use template` button

## Setup google sheets and looker studio

- Copy the [**Google sheets template**](https://docs.google.com/spreadsheets/d/1AI5zGbZffgYMa1IIYLm41UHREQk0Jnvl1OSCIDO2KTg/edit?usp=sharing) and rename it.
- Go to the [**google datastudio datasource template**](https://datastudio.google.com/datasources/ba83773b-7b12-430a-8739-71e5b12ecb2a)
- Copy the data source by clicking on the Copy icon in the upper menu bar
- Select the Google Sheets file you just created as the source sheet, select the `Raw Data` sheet and rename the data source
- Go to the [**google datastudio report template**](https://datastudio.google.com/reporting/bbe25a61-e43e-44a2-927e-7590a340e655) and make a copy 
- Select the newly created data source as new data source and rename the template
- You should have a Google DataStudio report connected to your google sheet with one data point


## Setup google sheets service account

- Go to the **[Google Developers Console](https://console.developers.google.com/)**
- Create a new project or use the one related to your project (if it exists) and select it
- Enable the Sheets API for your project
    - In the sidebar on the left, select **APIs & Services > Library**
    - Search for "sheets"
    - Click on "Google Sheets API"
    - Click on the blue "Enable" button
- Create a service account for your project
    - In the sidebar on the left, select **APIs & Services > Credentials**
    - Click blue "+ CREATE CREDENTIALS" and select "Service account" option
    - Enter name, description, click "CREATE"
    - You can skip permissions, click "CONTINUE"
    - Click "+ ADD KEY" button
    - Select the "JSON" key type option
    - Click "Create" button
    - your JSON key file is generated and downloaded to your machine (**it is the only copy!**)
    - click "DONE"
    - note your service account's email address (also available in the JSON key file)
- Share the google sheets you created with your service account using the email noted above


## Setup daily monitoring

- Clone the repository
- Input the URLs to be monitored
    - Open to the `.github/workflows/lighthouse-daily-run.yml` file
    - Replace the URLs section with the URLs to be monitored (during setup, it is recommended to test only one URL to speed up testing)
    - Merge the code on master
- Set the following secret values in the Github repository secrets variables:
    - `GOOGLE_SPREADSHEET_ID`: The google spreadsheet id where the results will be uploaded (The ID is found in the link of the google sheets https://docs.google.com/spreadsheets/d/15vh-k5lYVGhuA-LYFAGPhMiBoTfM85VfXV1snk9DVno/edit)
    - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: The google service account email generated when creating the service account
    - `GOOGLE_PRIVATE_KEY`: The google private key associated with the created user account

<aside>
👉 The private key is a string containing `\n` special characters. When copying it to Github Actions, remove the \n special characters and replace them by actual line resets

</aside>

- Test that everything works by running the github actions workflow manually via the github actions panel

## How to test

There are two ways to test the monitoring system:
- Create a new branch and push it to the repository with your changes. Change the lighthouse workflow launch event to `pull_request`

```yaml
name: Lighthouse CI
on: pull_request
```

- Modify your workflow, push your code on master and test the workflow by running it manually via the github actions panel.
