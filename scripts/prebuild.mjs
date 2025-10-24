import fs from 'fs'
import { src, log, run, getNetlifyEnv } from './utils.mjs'

function makeHeadSnippet({ isLiveProd = false, measurementId = 'G-7BQJMP7YV8' } = {}) {
  const lines = ['<!-- inject:head -->']

  if (isLiveProd) {
    lines.push(`<meta name="google-site-verification" content="rga0cjc2bjl14NvKIjo2vYsOiIUPrgZe5f-ngBD0320">`)
  } else {
    lines.push(`<meta name="robots" content="noindex, nofollow">`)
  }

  lines.push(
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>`,
    `<script>
window.dataLayer = window.dataLayer || []
function gtag(){ dataLayer.push(arguments) }
gtag('js', new Date())
gtag('config', '${measurementId}', {
  ${!isLiveProd ? `'debug_mode': true,` : ''}
})
</script>`,
    '<!-- inject:head:end -->',
  )

  return lines.join('\n')
}

async function main() {
  const { NODE_ENV, BUILD_ID, DEPLOY_TARGET, DEPLOY_URL, IS_PROD_LIVE } = getNetlifyEnv()

  const indexFile = src('index.html')
  if (!fs.existsSync(indexFile)) {
    throw new Error(`Can not find "${indexFile}"`)
  }

  const envFile = src('environment.ts')
  if (!fs.existsSync(envFile)) {
    throw new Error(`Can not find "${envFile}"`)
  }

  const replaceVars = { NODE_ENV, DEPLOY_TARGET, DEPLOY_URL, BUILD_ID }
  const replaceBlocks = {
    '<!-- inject:head -->': makeHeadSnippet({ isLiveProd: IS_PROD_LIVE }),
  }

  let indexText = fs.readFileSync(indexFile, 'utf8')
  let envText = fs.readFileSync(envFile, 'utf8')

  for (const [key, value] of Object.entries(replaceVars)) {
    indexText = indexText.replace(new RegExp(`{{${key}}}`, 'g'), value)
    envText = envText.replace(new RegExp(`{{${key}}}`, 'g'), value)
    if (NODE_ENV !== 'development') {
      envText = envText.replace(/\/\*\s*__DEV:START__\s*\*\/[\s\S]*?\/\*\s*__DEV:END__\s*\*\//g, '')
    }
  }

  for (const [key, value] of Object.entries(replaceBlocks)) {
    indexText = indexText.replace(new RegExp(key, 'g'), value)
  }

  const indexBuildFile = src('index.build.html')
  fs.writeFileSync(indexBuildFile, indexText)
  log('info', 'index.build.html', indexBuildFile, 'done!')

  const envBuildFile = src('environment.build.ts')
  fs.writeFileSync(envBuildFile, envText)
  log('info', 'environment.build.ts', envBuildFile, 'done!')
}

await run('prebuild', main)
