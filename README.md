# Rijksmuseum_API Tests

## Description

Rijksmuseum_API Tests is a project designed to perform API testing using Supertest and Jest. It includes a set of test specifications to validate the functionality of various API endpoints. The project is configured to run tests both locally and on GitHub Actions for continuous integration.

## Prerequisites

- Node.js (v14 or higher)
- Yarn or npm package manager

## Installation

1. Clone the repository:
	```sh
	git clone https://github.com/OlgaLa/Rijksmuseum_API
	cd Rijksmuseum_API
	```

2. Install dependencies:
	```sh
	yarn install
	```
    or 
    ```sh
	npm install
	```

3. Create a `.env` file in the root directory and add the necessary environment variables:
	```sh
	ACCESS_KEY=your_access_key
    BASE_URL='https://www.rijksmuseum.nl/api/'
	```

## Running Tests Locally

To run the tests locally, use the following command:

```sh
yarn test
```
or 
```sh
npm run test
```

## Running Tests on GitHub

The project is configured to run tests on GitHub Actions. The workflow file is located at `.github/workflows/cicds.yaml`.

The tests will automatically run on the following events:

- Push to the `main` branch
- Pull request to the `main` branch
- Manual trigger via the GitHub Actions interface

## GitHub Actions Workflow

The GitHub Actions workflow performs the following steps:

1. Checks out the repository
2. Installs dependencies
3. Executes the tests
4. Runs CTRF annotations to generate test reports summary

You can view the workflow configuration in `.github/workflows/cicd.yaml`.

## Test Reports

Test reports are generated in the `reports` directory. The main report file is `report.json`.

## Configuration

The project configuration files include:

- `jest.config.json`: Jest configuration
- `supertest.config.ts`: Supertest configuration
- `tsconfig.json`: TypeScript configuration
