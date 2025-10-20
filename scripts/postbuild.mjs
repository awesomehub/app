import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

function log(level, subject, ...message) {
  console.log(`${chalk.green(level)} ${chalk.blue(subject)} ${message.join(' ')}`)
}

function dist(filename = '') {
  return path.join(process.cwd(), 'dist', filename)
}

async function main() {
  const index = dist('index.html')
  if (!fs.existsSync(index)) {
    throw new Error(`Can not find "${index}"`)
  }

  log('info', 'task', 'Generating Netlify assets')
  const defaultHeaders = {
    '*': [
      'X-Frame-Options: DENY',
      'X-XSS-Protection: 1; mode=block',
      'X-Content-Type-Options: nosniff',
      'Referrer-Policy: same-origin',
    ],
    'index.html': [
      'Cache-Control: public, max-age=0, must-revalidate',
      'Link: <https://awesomehub.github.io>; rel=preconnect',
      'Link: <https://www.googletagmanager.com>; rel=preconnect',
      'Link: <https://www.google-analytics.com>; rel=preconnect',
      'Link: <https://fonts.gstatic.com>; rel=preconnect',
    ],
    'static/*': [
      'Cache-Control: public, max-age=31536000, immutable'
    ]
  }
  const headers = new Map(Object.entries(defaultHeaders))
  const html = fs.readFileSync(index, { encoding: 'utf-8'})
  const matches = html.matchAll(/["']([^"'.]+\.[a-z0-9]{16})(\.(css|js))["']/gm)
  for (const [, filename, ext] of matches) {
    const asset = filename + ext
    if (!headers.has(asset)) {
      headers.set(asset, [
        'Cache-Control: public, max-age=31536000, immutable'
      ])
      headers.get('index.html').push(
        `Link: </${asset}>; rel=preload; as=${ext === '.css' ? 'style' : 'script'}`
      )
      log('info', 'webpack:asset', asset)
    }
  }

  const headersData = []
  headers.forEach((pathHeaders, path) => {
    headersData.push(`/${path}\n  ${pathHeaders.join('\n  ')}`)
  })

  const headersFile = dist('_headers')
  fs.writeFileSync(headersFile, headersData.join('\n\n') + '\n')
  log('info', '_headers', headersFile, 'done!')

  const redirects = [
    { from: '/list/selfhosted/internet-of-things-iot', to: '/list/selfhosted/iot-platforms' },
    { from: '/list/selfhosted/proxy', to: '/list/selfhosted/networking%2Fproxy' },
    { from: '/list/selfhosted/money-budgeting', to: '/list/selfhosted/finance-budgeting' },
    { from: '/*', to: '/index.html', status: 200 },
  ]

  const redirectsData = redirects.map(({ from, to, status }) => `${from}    ${to}    ${status ?? 301}`)
  const redirectsFile = dist('_redirects')
  fs.writeFileSync(redirectsFile, redirectsData.join('\n') + '\n')
  log('info', '_redirects', redirectsFile, 'done!')
}

log('info', 'postbuild', 'Running postbuild script')
main()
  .then(() => {
    log('info', 'postbuild', 'done!')
    process.exit(0)
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
