#!/usr/bin/env node
/**
 * Build favicon.ico for the web app and the Sanity Studio from a single
 * master PNG.
 *
 * Source:      assets/brand/favicon-master.png
 * Outputs:     web/public/favicon.ico
 *              studio/static/favicon.ico
 *
 * Steps:
 *   1. Center-crop the master to a square (in case the source isn't 1:1).
 *   2. Resize to multiple standard favicon sizes (16, 32, 48, 64).
 *   3. Pack all sizes into a single multi-resolution .ico via png-to-ico.
 *   4. Write the same .ico to both publish locations.
 *
 * Run manually with `npm run build:favicon` from the repo root whenever the
 * master PNG changes. Generated .ico files are committed so production
 * builds don't need to regenerate them.
 */

import {existsSync, mkdirSync, writeFileSync} from 'node:fs'
import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import pngToIco from 'png-to-ico'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')

const MASTER = join(REPO_ROOT, 'assets', 'brand', 'favicon-master.png')
const OUTPUTS = [
  join(REPO_ROOT, 'web', 'public', 'favicon.ico'),
  join(REPO_ROOT, 'studio', 'static', 'favicon.ico')
]
const SIZES = [16, 32, 48, 64]

async function buildSquareBuffer() {
  const meta = await sharp(MASTER).metadata()
  if (!meta.width || !meta.height) {
    throw new Error(`Could not read dimensions from ${MASTER}`)
  }
  const side = Math.min(meta.width, meta.height)
  const left = Math.round((meta.width - side) / 2)
  const top = Math.round((meta.height - side) / 2)
  return sharp(MASTER)
    .extract({left, top, width: side, height: side})
    .toBuffer()
}

async function main() {
  if (!existsSync(MASTER)) {
    throw new Error(
      `Master PNG not found at ${MASTER}. ` +
        `Place a high-resolution square-ish source there and re-run.`
    )
  }

  console.log(`Reading master:  ${MASTER}`)
  const squareBuf = await buildSquareBuffer()

  const pngBuffers = await Promise.all(
    SIZES.map((size) =>
      sharp(squareBuf)
        .resize(size, size, {fit: 'cover', kernel: 'lanczos3'})
        .png({compressionLevel: 9})
        .toBuffer()
    )
  )

  console.log(`Packing sizes:   ${SIZES.map((s) => `${s}x${s}`).join(', ')}`)
  const icoBuffer = await pngToIco(pngBuffers)

  for (const out of OUTPUTS) {
    mkdirSync(dirname(out), {recursive: true})
    writeFileSync(out, icoBuffer)
    console.log(`Wrote favicon:   ${out} (${icoBuffer.length} bytes)`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
