# Automated Lighthouse

This repositroy contains a script that runs [Lighthouse](https://developers.google.com/web/tools/lighthouse/) on a list of URLs and sends the results to a google datasheet to be analyzed.

## How it works

Using Github Actions, the script runs every day at a given time. It will then run Lighthouse on the list of URLs defined in the Lighthouse Workflow and send the results to a google datasheet.

### Requirements:

This repository requires a valid google sheet connection using a google service account. 

## Installation & Usage

### Setup the repository

- Create your own repository by clicking on the `Use template` button
- Open to the `.github/workflows/lighthouse-daily-run.yml` file
- Replace the URLs section with the URLs to be tested

### Setup repository secrets

Set the following secret values in the repository secrets variables:
- GOOGLE_SPREADSHEET_ID: The google spreadsheet id where the results will be uploaded
- GOOGLE_SERVICE_ACCOUNT_EMAIL: The google service account email generated when creating the service account
- GOOGLE_PRIVATE_KEY: The google private key associated with the created user account

## How to test

There are two ways to test the monitoring system:
- Create a new branch and push it to the repository with your changes. Change the lighthouse workflow launch event to `pull_request`

```yaml
name: Lighthouse CI
on: pull_request
```

- Modify your workflow, push your code on master and test the workflow by running it manually via the github actions panel.
