import fs from 'fs'
import path from "path";
import log from "npmlog";

function dist(filename = '') {
  return path.join(process.cwd(), 'dist', filename)
}

async function main() {
  const index = dist('index.html')
  if (!fs.existsSync(index)) {
    throw new Error(`Can not find "${index}"`)
  }

  log.info('task', 'Generating Netlify assets')
  const defaultHeaders = {
    '*': [
      'X-Frame-Options: DENY',
      'X-XSS-Protection: 1; mode=block',
      'X-Content-Type-Options: nosniff',
      'Referrer-Policy: same-origin',
    ],
    '': [
      'Cache-Control: public, max-age=0, must-revalidate',
      'Link: <https://fonts.gstatic.com>; rel=preconnect',
      'Link: <https://fonts.gstatic.com>; rel=dns-prefetch',
    ],
    'static/*': [
      'Cache-Control: public, max-age=31536000, immutable'
    ]
  }
  const headers = new Map(Object.entries(defaultHeaders))
  const html = fs.readFileSync(index, { encoding: 'utf-8'})
  const matches = html.matchAll(/["']([^"'.]+\.[a-z0-9]{20})(\.(css|js))["']/gm)
  for (const [, filename, ext] of matches) {
    const asset = filename + ext
    if (!headers.has(asset)) {
      headers.set(asset, [
        'Cache-Control: public, max-age=31536000, immutable'
      ])
      headers.get('').push(
        `Link: </${asset}>; rel=preload; as=${ext === '.css' ? 'style' : 'script'}`
      )
      log.info('webpack:asset', asset)
    }
  }

  const headersData = []
  headers.forEach((pathHeaders, path) => {
    headersData.push(`/${path}\n  ${pathHeaders.join('\n  ')}`)
  })

  const headersFile = dist('_headers')
  fs.writeFileSync(headersFile, headersData.join('\n\n') + '\n')
  log.info('_headers', headersFile, 'done!')

  const redirectssFile = dist('_redirects')
  fs.writeFileSync(redirectssFile, '/*    /index.html   200\n')
  log.info('_redirects', redirectssFile, 'done!')
}

log.info('postbuild', 'Running postbuild script')
main().catch(e => {
  console.error(e)
  process.exit(1)
});
