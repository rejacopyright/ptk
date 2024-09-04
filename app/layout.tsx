/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import '@metronic/assets/sass/style.scss'
import '@styles/custom.scss'
import '@styles/potentok.scss'
import '@styles/splash-screen.css'

import axios from '@api/axios'
import { DotFlash } from '@components/loader/dots'
import ToastProvider from '@components/toast/ToastProvider'
import { LayoutProvider } from '@metronic/layout/core'
import { ReduxProvider } from '@redux/utils/Provider'
import { ReactQueryProvider } from '@redux/utils/ReactQueryProvider'
import { cookies } from 'next/headers'
import Image from 'next/image'

export default async function RootLayout({ children }) {
  const cookiesStore = cookies()
  const token: any = cookiesStore.get('token')?.value
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  return (
    <html lang='kr'>
      <head>
        {/* <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap"
      rel="stylesheet" /> */}
        <link
          rel='stylesheet'
          as='style'
          crossOrigin='anonymous'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
          integrity='sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css'
          integrity='sha512-vebUliqxrVkBy3gucMhClmyQP9On/HAWQdKDXRaAlb/FKuTbxkjPKUyqVOxAcGwFDka79eTF+YXwfke1h3/wfg=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
        <script
          src='https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js'
          integrity='sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4'
          crossOrigin='anonymous'></script>
        <link rel='shortcut icon' href='/favicon.png' />
      </head>
      <body
        id='kt_body'
        className='header-fixed header-tablet-and-mobile-fixed'
        suppressHydrationWarning>
        <ReactQueryProvider>
          <ReduxProvider>
            <LayoutProvider>
              <ToastProvider>{children}</ToastProvider>
            </LayoutProvider>
          </ReduxProvider>
        </ReactQueryProvider>
        <div
          id='splash-screen'
          className='splash-screen'
          style={{
            flexDirection: 'initial',
            msFlexDirection: 'initial',
            WebkitFlexDirection: 'initial',
            gap: '10px',
          }}>
          <Image
            src='/logo/potentok.png'
            alt='Open Badge'
            width={125}
            height={25}
            priority
            style={{ marginBottom: '10px' }}
          />
          <div className=''>
            <DotFlash animation='flashing' style={{ transform: 'scale(0.65)' }} />
          </div>
        </div>
        <div id='root-modals'></div>
      </body>
    </html>
  )
}
