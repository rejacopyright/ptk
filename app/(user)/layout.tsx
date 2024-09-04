'use client'
import { ErrorBoundaryPage } from '@components/layouts/ErrorBoundary'
import { Footer } from '@components/layouts/Footer'
import { defineRole } from '@components/layouts/LayoutConfig'
import ModalUpdateProfile from '@components/modal/ModalUpdateProfile'
import ModalUpTimeLogin from '@components/modal/ModalUpTimeLogin'
import { detectMobileScreen, getJWTPayload } from '@helpers'
import { useLocation, useSize } from '@hooks'
import { MenuComponent } from '@metronic/assets/ts/components'
import { Content } from '@metronic/layout/components/Content'
import { DefaultHeader } from '@metronic/layout/components/header/DefaultHeader'
import { ScrollTop } from '@metronic/layout/components/ScrollTop'
import { PageDataProvider } from '@metronic/layout/core'
import { MasterInit } from '@metronic/layout/MasterInit'
import { MobileMenuDrawer } from '@metronic/partials'
import { logout } from '@redux'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import moment from 'moment'
import { redirect, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { shallowEqual, useSelector } from 'react-redux'

const UserLayout = ({ children }) => {
  const pathname = usePathname()
  const location = useLocation()
  const user: any = useSelector(({ user }: any) => user?.data, shallowEqual)
  const Navbar: any = defineRole?.navbar
  const Header: any = defineRole?.header || DefaultHeader
  const sidebar: any = defineRole?.sidebar
  const token: any = Cookies.get(`token`)
  const counterInSecond: number = 60

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [upTime, setUpTime] = useState<number>(0)
  const [isUpdateProfile, setUpdateProfile] = useState<boolean>(false)

  const [hasToken, setHasToken] = useState<boolean>(false)

  if (typeof window !== 'undefined') {
    window.onfocus = () => !token && logout()
  }

  // location?.url
  useEffect(() => {
    const isPublicPaths: boolean = /(\/(public)\/\w+)|(\/(policy|terms)$)/g.test(
      location?.pathname || ''
    )

    setHasToken(Boolean(token))
    if (!token && !isPublicPaths) {
      redirect(`/login?request=${location?.urlBtoa}`)
    }

    const { exp }: any = getJWTPayload(token) || {}
    const countDown = setInterval(() => {
      // moment.utc(moment.unix(exp).diff(moment())).format('HH:mm:ss')
      const remainingSeconds = moment.unix(exp).diff(moment(), 's')

      // Just for testing purposes
      // const remainingSeconds = moment.unix(exp).subtract(3520, 's').diff(moment(), 's')

      if (!token || remainingSeconds <= 0) {
        logout()
        clearInterval(countDown)
        setUpTime(0)
      } else {
        setUpTime(remainingSeconds)
      }
    }, 1000)
    return () => {
      clearInterval(countDown)
    }
  }, [location?.pathname, location?.urlBtoa, token])

  useSize(() => {
    setIsMobile(detectMobileScreen())
  }, 100)

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [pathname])

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }: any) => (
        <ErrorBoundaryPage error={error} reset={resetErrorBoundary} />
      )}
      onError={(err: any) => err}>
      <PageDataProvider>
        <div className='page d-flex flex-row flex-column-fluid bg-body'>
          <div
            suppressHydrationWarning
            className={clsx('wrapper d-flex flex-column flex-row-fluid', {
              'ps-0': !sidebar,
              'pt-0': !hasToken,
            })}
            id='kt_wrapper'>
            <Header sidebar={sidebar} />
            <div
              id='kt_content'
              className='content d-flex flex-column flex-column-fluid px-7 px-lg-10'>
              <div className='post d-flex w-100' id='kt_post'>
                <Content>{children}</Content>
              </div>
            </div>
            {/* <Footer /> */}
            {['profile'].includes(pathname?.substring(1)?.split('/')?.[0]) && <Footer />}
          </div>
        </div>
        <MobileMenuDrawer />
        {isMobile && false && <Navbar />}
        <MasterInit />
        <ScrollTop isMobile={isMobile} />
        <ModalUpTimeLogin
          show={upTime && upTime < counterInSecond}
          setShow={setUpTime}
          countDown={upTime}
        />
        {/* <ModalCompleteProfileMessage
          isShow={!user?.user_frst_nm && !user?.user_last_nm && userID}
          setModalUpdateProfile={setUpdateProfile}
        /> */}
        <ModalUpdateProfile
          user={user}
          isModalShow={isUpdateProfile}
          setModalProfile={setUpdateProfile}
        />
      </PageDataProvider>
    </ErrorBoundary>
  )
}

export default UserLayout
