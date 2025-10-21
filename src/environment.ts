// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const BUILD_ID = '{{BUILD_ID}}' as string
const DEPLOY_URL = '{{DEPLOY_URL}}' as string
const DEPLOY_TARGET = '{{DEPLOY_TARGET}}' as 'production' | 'deploy-preview' | 'branch-deploy' | 'dev'
const NODE_ENV = '{{NODE_ENV}}' as 'production' | 'development' | 'test'

export const environment = {
  nodeEnv: NODE_ENV,
  deployTarget: DEPLOY_TARGET,
  baseUrl: DEPLOY_URL,
  buildId: BUILD_ID,
  apiUrl: '/data',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
