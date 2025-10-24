import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

// Fetch env vars coming from Netlify with fallbacks
export function getNetlifyEnv() {
  const DEPLOY_TARGET = process.env['CONTEXT'] || 'dev'
  const DEPLOY_URL = process.env['URL'] || 'http://localhost:4200'
  const BUILD_ID = process.env['BUILD_ID'] || 'dev-local'
  const IS_PROD_LIVE = DEPLOY_TARGET === 'production'

  const DEFAULT_NODE_ENV = DEPLOY_TARGET === 'dev' ? 'development' : 'production'
  const NODE_ENV = process.env.NODE_ENV ?? DEFAULT_NODE_ENV

  const netlifyEnv = { NODE_ENV, DEPLOY_TARGET, DEPLOY_URL, BUILD_ID, IS_PROD_LIVE }
  log('info', 'netlifyEnv', netlifyEnv)

  return netlifyEnv
}

export function listDistFiles(rootDir) {
  const result = []
  const distRoot = dist()

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (entry.isFile()) {
        result.push(path.relative(distRoot, fullPath).split(path.sep).join('/'))
      }
    }
  }

  walk(dist(rootDir))
  return result.toSorted()
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
  return path.join(process.cwd(), 'dist/browser', filename)
}

export function src(filename = '') {
  return path.join(process.cwd(), 'src', filename)
}
