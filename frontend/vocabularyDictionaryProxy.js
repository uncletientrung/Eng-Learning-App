import { Agent } from 'node:https'

// Only the vocabulary dictionary route is proxied. IPv4 avoids a stalled IPv6
// connection, and the browser no longer has to contact the upstream cross-site.
export function vocabularyDictionaryProxy() {
  return {
    '/api/vocabulary/dictionary': {
      target: 'https://dict.minhqnd.com',
      changeOrigin: true,
      agent: new Agent({ family: 4, keepAlive: true, maxSockets: 12 }),
      rewrite: (path) => path.replace(/^\/api\/vocabulary\/dictionary(?=\?|$)/, '/api/v1/lookup'),
      proxyTimeout: 5000,
      timeout: 6500,
    },
  }
}
