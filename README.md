# Getting Started

This repository demonstrates the usage of Lightning Container Components and complex data management across a UI composition. It requires your machine to have node/npm to perform local development in React. This project is DX based, but can be deployed to a sandbox environment as described below  

## Local Development with React

Open a terminal at the subdirectory for /js-apps/lcc-datagrid-react

Run __npm install__ to install the required dependencies

Run __npm run start__ to run the React app locally for debugging

Note: While developing and testing locally, set the "mode" parameter in webpack.config.js to "development"  

## Resource bundling with Webpack

Open a terminal at the subdirectory for /js-apps/lcc-datagrid-react

Run __npm run build__

Note: While bundling for deployment, set the "mode" parameter in webpack.config.js to "production"

## DX deployment to Sandbox org

To take this code base and deploy to a Sandbox org, instead of a Scratch org, use the following command

__sfdx force:source:deploy -p ./force-app/main/default -u <myorgalias>__

