# Task Management App

## Getting started

To run the app create a `.env.development` file with the following content:

```bash
PORT=3005
REACT_APP_GRAASP_APP_ID=<your app id>
SENTRY_DSN=<your sentry dsn>
REACT_APP_ENABLE_MOCK_API=true
REACT_APP_VERSION=$npm_package_version
REACT_APP_API_HOST=http://localhost:3000
REACT_APP_GRAASP_DOMAIN=localhost
```

And a `.env.test` to run the automated tests:

```bash
PORT=3334
REACT_APP_GRAASP_APP_ID=<your app id>
SENTRY_DSN=<your sentry dsn>
REACT_APP_ENABLE_MOCK_API=true
REACT_APP_VERSION=$npm_package_version
REACT_APP_API_HOST=http://localhost:3000
REACT_APP_GRAASP_DOMAIN=localhost
BROWSER=none
```
