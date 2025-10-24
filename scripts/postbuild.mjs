import fs from 'fs'
import { dist, log, run } from './utils.mjs'

const CACHE_CONTROL_NO_CACHE = 'Cache-Control: public, max-age=0, must-revalidate'
const CACHE_CONTROL_IMMUTABLE = 'Cache-Control: public, max-age=31536000, immutable'

const DEFAULT_HEADERS = {
  '/*': [
    'X-Frame-Options: DENY',
    'X-XSS-Protection: 1; mode=block',
    'X-Content-Type-Options: nosniff',
    'Referrer-Policy: same-origin',
  ],
  '/': [
    CACHE_CONTROL_NO_CACHE,
    'Link: <https://www.googletagmanager.com>; rel=preconnect',
    'Link: <https://fonts.gstatic.com>; rel=preconnect',
  ],
  '/list/*': [],
  '/media/*': [CACHE_CONTROL_IMMUTABLE],
  '/data/*': [CACHE_CONTROL_IMMUTABLE],
  '/data/build.json': [CACHE_CONTROL_NO_CACHE],
}

const DEFAULT_REDIRECTS = [
  { from: '/list/selfhosted/internet-of-things-iot', to: '/list/selfhosted/iot-platforms' },
  { from: '/list/selfhosted/proxy', to: '/list/selfhosted/networking%2Fproxy' },
  { from: '/list/selfhosted/money-budgeting', to: '/list/selfhosted/finance-budgeting' },
  { from: '/list/selfhosted/note-taking-and-editors', to: '/list/selfhosted/note-taking-apps' },
  { from: '/list/selfhosted/calendar-contacts', to: '/list/selfhosted/calendars-contacts' },
  { from: '/list/selfhosted/genealogy', to: '/list/selfhosted/genealogy-tools' },
  { from: '/list/selfhosted/pastebins', to: '/list/selfhosted/pastebin-tools' },
  { from: '/list/selfhosted/polls-events', to: '/list/selfhosted/events%2Fpolls' },
  { from: '/*', to: '/index.html', status: 200 },
]

async function main() {
  const indexFile = dist('index.html')
  if (!fs.existsSync(indexFile)) {
    throw new Error(`Can not find "${indexFile}"`)
  }

  log('info', 'task', 'Generating Netlify assets')
  const headers = new Map(Object.entries(DEFAULT_HEADERS))
  const html = fs.readFileSync(indexFile, { encoding: 'utf-8' })
  const matches = html.matchAll(/=["']([\w.-]+-\w{8})(\.(css|js))["']/gm)
  for (const [, filename, ext] of matches) {
    const asset = filename + ext
    const assetPath = asset.startsWith('/') ? asset : `/${asset}`
    if (!headers.has(assetPath)) {
      headers.set(assetPath, [CACHE_CONTROL_IMMUTABLE])
      headers.set(`${assetPath}.map`, [CACHE_CONTROL_IMMUTABLE])
      if (ext === '.css') {
        headers.get('/').push(`Link: <${assetPath}>; rel=preload; as=style`)
      }
      log('info', 'webpack:asset', assetPath)
    }
  }

  const headersData = []
  headers.set('/list/*', headers.get('/').concat(headers.get('/list/*')))
  headers.forEach((pathHeaders, path) => {
    headersData.push(`${path}\n  ${pathHeaders.join('\n  ')}`)
  })

  const headersFile = dist('_headers')
  fs.writeFileSync(headersFile, headersData.join('\n\n') + '\n')
  log('info', '_headers', headersFile, 'done!')

  const redirectsFile = dist('_redirects')
  const redirectsData = DEFAULT_REDIRECTS.map(({ from, to, status }) => `${from}    ${to}    ${status ?? 301}`)
  fs.writeFileSync(redirectsFile, redirectsData.join('\n') + '\n')
  log('info', '_redirects', redirectsFile, 'done!')
}

await run('postbuild', main)
