import { Footer } from '@components/layouts/Footer'
import ModalUpdateProfile from '@components/modal/ModalUpdateProfile'
import ModalUpTimeLogin from '@components/modal/ModalUpTimeLogin'
import { detectMobileScreen, getJWTPayload } from '@helpers'
import { useSize } from '@hooks'
import { MenuComponent } from '@metronic/assets/ts/components'
import { MobileMenuDrawer } from '@metronic/partials'
import { ErrorBoundaryPage } from '@pages/_global/ErrorBoundary'
import { logout } from '@redux'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { shallowEqual, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { defineRole } from 'src/routes'

import { Content } from './components/Content'
import { DefaultHeader } from './components/header/DefaultHeader'
import { ScrollTop } from './components/ScrollTop'
import { PageDataProvider } from './core'
import { MasterInit } from './MasterInit'

const MasterLayout = () => {
  const location = useLocation()
  const user: any = useSelector(({ user }: any) => user, shallowEqual)
  const Navbar: any = defineRole?.navbar
  const Header: any = defineRole?.header || DefaultHeader
  const sidebar: any = defineRole?.sidebar
  const token: any = Cookies.get(`token`)
  const counterInSecond: number = 60

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [upTime, setUpTime] = useState<number>(0)
  const [isUpdateProfile, setUpdateProfile] = useState<boolean>(false)
  const [mobilePageGoBack, setMobilePageGoBack] = useState({
    status: false,
    to: '/',
    title: '',
  })

  window.onfocus = () => {
    if (!token) {
      logout()
    }
  }

  useEffect(() => {
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
  }, [token])

  useSize(() => {
    setIsMobile(detectMobileScreen())
  }, 100)

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }: any) => (
        <ErrorBoundaryPage error={error} reset={resetErrorBoundary} />
      )}
      onError={(err: any) => err}>
      <PageDataProvider>
        <div className='page d-flex flex-row flex-column-fluid bg-body'>
          <div
            className={clsx('wrapper d-flex flex-column flex-row-fluid', {
              'ps-0': !sidebar,
              'pt-0': !token,
            })}
            id='kt_wrapper'>
            <Header sidebar={sidebar} canMobilePageGoBack={mobilePageGoBack} />
            <div
              id='kt_content'
              className='content d-flex flex-column flex-column-fluid px-7 px-lg-10'>
              <div className='post d-flex w-100' id='kt_post'>
                <Content>
                  <Outlet context={{ setMobilePageGoBack }} />
                </Content>
              </div>
            </div>
            {/* <Footer /> */}
            {['profile'].includes(location?.pathname?.substring(1)?.split('/')?.[0]) && <Footer />}
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

export { MasterLayout }
