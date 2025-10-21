import path from 'path'
import chalk from 'chalk'

// Fetch env vars coming from Netlify with fallbacks
export function getNetlifyEnv() {
  console.log('process.env', process.env)
  const DEPLOY_TARGET = process.env['CONTEXT'] || 'dev'
  const DEPLOY_URL = process.env['DEPLOY_URL'] || 'http://localhost:4200'
  const BUILD_ID = process.env['BUILD_ID'] || 'dev-local'
  const IS_PROD_LIVE = DEPLOY_TARGET === 'production'

  const DEFAULT_NODE_ENV = DEPLOY_TARGET === 'dev' ? 'development' : 'production'
  const NODE_ENV = process.env.NODE_ENV ?? DEFAULT_NODE_ENV

  const netlifyEnv = { NODE_ENV, DEPLOY_TARGET, DEPLOY_URL, BUILD_ID, IS_PROD_LIVE }
  log('info', 'netlifyEnv', netlifyEnv)

  return netlifyEnv
}

export async function run(name, main) {
  try {
    log('info', name, `Running ${name} script`)
    await main()
    log('info', name, 'done!')
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

export function log(level, subject, ...messages) {
  console.log(`${chalk.green(level)} ${chalk.blue(subject)}`, ...messages)
}

export function dist(filename = '') {
  return path.join(process.cwd(), 'dist', filename)
}

export function src(filename = '') {
  return path.join(process.cwd(), 'src', filename)
}
