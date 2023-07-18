# Coffee cards

## Development

Project is created with webpack + svelte-loader.

For development start you need to run:
```bash
npm run serve
```
And open https://localhost:8080.

## Tests
e2e tests are written with Playwright,
Before you need to run server:
```bash
npm run server:prod
```
This command creates prod build in `public/build` folder and also stars http-server on https://localhost:8080

After that you need to run tests:
```bash
npm run test
```
