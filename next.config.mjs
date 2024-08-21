/** @type {import('next').NextConfig} */

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rewrites = [
  {
    source: '/',
    destination: '/public/home',
  },
  {
    source: '/login',
    destination: '/auth/login',
  },
  {
    source: '/register',
    destination: '/auth/register',
  },
  {
    source: '/oke',
    destination: '/wallet',
  },
]
const redirects = [
  {
    source: '/auth/:pathname*',
    destination: '/:pathname*',
    permanent: true,
  },
]

const nextConfig = {
  reactStrictMode: true,
  useFileSystemPublicRoutes: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
    // optimizeCss: true
  },
  compiler: {
    // removeConsole: true,
  },
  distDir: 'build',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  trailingSlash: false,
  rewrites: async () => rewrites,
  redirects: async () => redirects,
}

export default nextConfig
