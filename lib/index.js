/**
 * dsh-mengzhou-ui — host half.
 *
 * The skin is entirely a browser-side feature: tokens, stylesheet and the
 * ornament layer all live in `lib/client.js`, which `@deepseek-ai/dsh-client-modules`
 * serves to the shell as the package's `./client` bundle. The host half only
 * exists so the package has a Loader row the client registry can see (a package
 * with no host entry never gets scanned), and so it can be enabled/disabled like
 * any other plugin.
 */

import { appendFileSync } from 'node:fs'
import { join } from 'node:path'

export const name = 'dsh-mengzhou-ui'

/** Diagnostics trail (one JSON line per activation); set DSH_MENGZHOU_LOG=0 to silence. */
function trace(event) {
  if (process.env.DSH_MENGZHOU_LOG === '0') return
  const dir = process.env.DSH_PROFILE_DIR
  if (!dir) return
  try {
    appendFileSync(
      join(dir, 'mengzhou-ui.log'),
      JSON.stringify({ at: new Date().toISOString(), event }) + '\n'
    )
  } catch {
    /* diagnostics never break activation */
  }
}

export function apply(ctx) {
  ctx.logger?.debug?.('mengzhou: client skin is provided by the browser bundle')
  trace({ stage: 'host-apply', pid: process.pid })
  ctx.on?.('dispose', () => trace({ stage: 'host-dispose', pid: process.pid }))
}