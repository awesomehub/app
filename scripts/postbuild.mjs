import fs from 'fs'
import { dist, distJSON, listDistFiles, log, run } from './utils.mjs'

const CACHE_CONTROL_NO_CACHE = 'Cache-Control: public, max-age=0, must-revalidate'
const CACHE_CONTROL_IMMUTABLE = 'Cache-Control: public, max-age=31536000, immutable'

const DEFAULT_PAGE_HEADERS = [
  CACHE_CONTROL_NO_CACHE,
  'Link: <https://www.googletagmanager.com>; rel=preconnect',
  'Link: </assets/images/jumbotron-bg.jpg>; rel=preload; as=image; fetchpriority=high',
]

const DEFAULT_HEADERS = {
  '/*': [
    'X-Frame-Options: DENY',
    'X-XSS-Protection: 1; mode=block',
    'X-Content-Type-Options: nosniff',
    'Referrer-Policy: same-origin',
  ],
  '/': ['[data-page]'],
  '/404': ['[page]'],
  '/media/*': [CACHE_CONTROL_IMMUTABLE],
  '/manifest.webmanifest': ['Content-Type: application/manifest+json', CACHE_CONTROL_NO_CACHE],
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
  const pageHeaders = [...DEFAULT_PAGE_HEADERS]
  const dataPageHeaders = []
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
        pageHeaders.push(`Link: <${assetPath}>; rel=preload; as=style`)
      }
      log('info', 'build:asset:html', assetPath)
    }
  }

  const statsJson = distJSON('../stats.json')
  for (const [key, output] of Object.entries(statsJson.outputs)) {
    if (output.entryPoint === 'angular:styles/global:styles') {
      for (const asset of output.imports) {
        if (asset.kind === 'url-token' && !asset.path.startsWith('data:')) {
          if (asset.path.endsWith('.woff2')) {
            const filePath = `/${asset.path}`
            pageHeaders.push(`Link: <${filePath}>; rel=preload; as=font`)
            log('info', `build:asset:${key}`, filePath)
          }
        }
      }
    }
  }

  const dataFiles = listDistFiles('data')
  for (const file of dataFiles) {
    if (!file.endsWith('.json')) continue

    const filePath = `/${file}`
    const link = `Link: <${filePath}>; rel=preload; as=fetch; crossorigin=same-origin`
    log('info', 'data:asset', filePath)

    if (filePath === '/data/build.json') {
      headers.set(filePath, [CACHE_CONTROL_NO_CACHE])
      dataPageHeaders.push(link)
      continue
    }

    if (/\/all\.\w+\.json$/.test(filePath)) {
      headers.set(filePath, [CACHE_CONTROL_IMMUTABLE])
      dataPageHeaders.push(link)
      continue
    }

    const match = filePath.match(/(\/list\/[\w.-]+)\.\w+\.json$/)
    if (match) {
      headers.set(filePath, [CACHE_CONTROL_IMMUTABLE])
      headers.set(match[1], ['[data-page]', link])
    }
  }

  const headersData = []
  headers.forEach((pathHeaders, path) => {
    const compiledHeaders = pathHeaders
      .flatMap((header) =>
        header === '[page]' ? pageHeaders : header === '[data-page]' ? [...pageHeaders, ...dataPageHeaders] : header,
      )
      .join('\n  ')
    headersData.push(`${path}\n  ${compiledHeaders}`)
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
