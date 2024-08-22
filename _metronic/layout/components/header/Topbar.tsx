import { detectMobileScreen, KTSVG } from '@helpers'
import { useSize } from '@hooks'
import { useLayout } from '@metronic/layout/core'
import { MenuProfile } from '@metronic/partials'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { FC, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const toolbarButtonMarginClass = 'mx-0 header-right',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px-xxx',
  toolbarButtonIconSizeClass = 'svg-icon-2x'

const Topbar: FC = () => {
  const token: any = Cookies.get(`token`)
  const user: any = useSelector(({ user }: any) => user, shallowEqual)
  const email: any = user?.mails?.find(({ user_eml_rprs }: any) => user_eml_rprs === 'Y')?.user_eml
  const { config } = useLayout()

  const [isMobile, setIsMobile] = useState<boolean>(false)

  useSize(() => {
    setIsMobile(detectMobileScreen())
  }, 100)

  return (
    <>
      {/* Search */}
      {/* <div className={clsx('d-flex align-items-stretch', toolbarButtonMarginClass)}>
        <Search />
      </div> */}
      {/* Menu */}
      {token && (
        <div
          className={clsx('d-flex align-items-center d-block d-lg-none', toolbarButtonMarginClass)}>
          <div
            className={clsx(
              'btn btn-icon btn-active-light-primary btn-custom',
              toolbarButtonHeightClass
            )}
            id='kt_menu_toggle'>
            {/* <i className='fa-solid fa-bars display-5 text-1' /> */}
            <KTSVG path='/media/icons/custom/bars.svg' className={toolbarButtonIconSizeClass} />
          </div>
        </div>
      )}
      <div className='d-flex gap-3 cursor-pointer d-none d-lg-block'>
        {isMobile && (
          <Link to={'/profile'} className={`border px-2 py-1 rounded-circle bg-white`}>
            <i className={`fa-solid fa-user display-6 text-custom-purple`} />
          </Link>
        )}
        <div
          className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
          id='kt_header_user_menu_toggle'>
          <div
            className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'>
            {isMobile ? (
              <i className='fa-solid fa-bars display-5' />
            ) : (
              <div className='d-flex gap-8px'>
                <img
                  alt='Logo'
                  src='/media/placeholder/avatar-orange.svg'
                  style={{ width: '32px', height: '32px' }}
                />
                <div className='d-flex justify-content-center align-items-center user-select-none fs-14px lh-1'>
                  <span className='fw-bold' style={{ color: '#272D37' }}>
                    {email}
                  </span>
                </div>
              </div>
            )}
          </div>
          <MenuProfile />
        </div>
      </div>

      {config.header.left === 'menu' && (
        <div className='d-none align-items-center ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'>
            <KTSVG path='/media/icons/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </>
  )
}

export { Topbar }
