/** @type {import('next').NextConfig} */

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rewrites = [
  {
    source: '/',
    // destination: '/public/home',
    destination: '/wallet',
  },
  {
    source: '/login',
    destination: '/auth/login',
  },
  {
    source: '/register',
    destination: '/register/email',
  },
  {
    source: '/public/user/badge/:pathname',
    destination: '/public/badge/:pathname',
  },
  // {
  //   source: '/public/user/badge/:pathname*',
  //   destination: '/wallet/detail/:pathname*',
  // },
  {
    source: '/policy',
    destination: '/public/policy',
  },
  {
    source: '/terms',
    destination: '/public/terms',
  },
]
const redirects = [
  {
    source: '/auth',
    destination: '/',
    permanent: true,
  },
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
