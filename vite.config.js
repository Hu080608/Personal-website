import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { profile } from './src/config/profile.js'

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

/**
 * Injects the profile identity into the static HTML shell so the document
 * title, description and social metadata are all driven by one config file.
 */
function profileHtmlPlugin() {
  return {
    name: 'nexus-profile-html',
    transformIndexHtml(html) {
      const tokens = {
        '%PROFILE_NAME%': profile.meta.name,
        '%PROFILE_ROLE%': profile.meta.role,
        '%PROFILE_ALIAS%': profile.meta.alias,
        '%PROFILE_DESCRIPTION%': profile.meta.description,
        '%PROFILE_TAGLINE%': profile.meta.tagline,
      }
      return Object.entries(tokens).reduce(
        (result, [token, value]) => result.replaceAll(token, escapeHtml(value)),
        html,
      )
    },
  }
}

// `base: './'` keeps every asset URL relative. Combined with HashRouter,
// the same build works at a username.github.io/<repo>/ sub-path without 404s.
export default defineConfig({
  base: './',
  plugins: [react(), profileHtmlPlugin()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
