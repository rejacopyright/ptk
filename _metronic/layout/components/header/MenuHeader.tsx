/* eslint-disable react-hooks/exhaustive-deps */
import { KTSVG, toAbsoluteUrl } from '@helpers'
import { useLayout, usePageData } from '@metronic/layout/core'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import last from 'lodash/last'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CSSProperties, FC } from 'react'

import { DefaultTitle } from './page-title/DefaultTitle'
import { Topbar } from './Topbar'

export const MenuHeader: FC<any> = ({ sidebar, canMobilePageGoBack }) => {
  const token: any = Cookies.get(`token`)
  const { logoReplacement } = usePageData()
  const { config, classes } = useLayout()
  const { header, aside } = config
  const pathname = usePathname()
  const currentPath: any = last(pathname?.split('/') || [])

  const menuClass: string =
    'fs-15px fw-500 px-24px d-flex align-items-center border-bottom border-2 border-white'
  const menuStyle: CSSProperties = {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    color: '#5F6D7E',
    height: '56px',
    letterSpacing: '-0.1px',
  }
  const activeClass: string =
    'bg-light-primary text-primary border-primary header-active-item fw-bolder'
  return (
    <div
      id='kt_header'
      className={clsx('header shadow-none', classes?.header.join(' '), 'align-items-stretch', {
        'start-0': !sidebar,
        'd-flex d-lg-none': !token,
      })}>
      <div
        className={clsx(
          classes?.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}>
        {/* begin::Aside mobile toggle */}
        {aside?.display && (
          <div className='d-none align-items-center ms-n3 me-1' title='Show aside menu'>
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='kt_aside_mobile_toggle'>
              <KTSVG path='/media/icons/abstract/abs015.svg' className='svg-icon-2x mt-1' />
            </div>
          </div>
        )}
        {/* end::Aside mobile toggle */}
        {/* begin::Logo */}
        {!aside?.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link href='/' className='d-lg-none'>
              <img alt='Logo' src={toAbsoluteUrl('/potentok.png')} className='h-20px' />
            </Link>
          </div>
        )}
        {/* end::Logo */}

        {aside?.display && (
          <>
            {logoReplacement ? (
              <div className='d-flex d-lg-none align-items-center'>{logoReplacement}</div>
            ) : (
              <Link
                href={canMobilePageGoBack?.to}
                className='d-flex d-lg-none align-items-center flex-lg-grow-0'>
                {canMobilePageGoBack?.status ? (
                  <div className='d-flex gap-4'>
                    <i className='fa-solid fa-chevron-left display-6' />
                    <span className='display-6'>{canMobilePageGoBack?.title}</span>
                  </div>
                ) : (
                  <img alt='Logo' src={toAbsoluteUrl('/potentok.png')} className='h-15px' />
                )}
              </Link>
            )}
          </>
        )}

        {/* begin::Wrapper */}
        <div className='d-flex align-items-center flex-lg-grow-1 justify-content-between header-content'>
          <div className='d-flex flex-lg-grow-1 align-items-center'>
            {/* begin::Navbar */}
            <div className='header-left'>
              <Link href='/' className='d-none d-lg-flex flex-shrink'>
                <img src='/potentok.png' alt='' className='' />
              </Link>
            </div>
            {header.left === 'menu' && (
              <div className='d-flex align-items-stretch' id='kt_header_nav'>
                <div
                  className='header-menu align-items-stretch'
                  data-kt-drawer='true'
                  data-kt-drawer-name='header-menu'
                  data-kt-drawer-activate='{default: true, lg: false}'
                  data-kt-drawer-overlay='true'
                  data-kt-drawer-width="{default:'200px', '300px': '250px'}"
                  data-kt-drawer-direction='end'
                  data-kt-drawer-toggle='#kt_header_menu_mobile_toggle'
                  data-kt-swapper='true'
                  data-kt-swapper-mode='prepend'
                  data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}">
                  <div
                    className='menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 gap-3 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch'
                    id='#kt_header_menu'
                    data-kt-menu='true'>
                    <Link
                      style={menuStyle}
                      className={clsx(menuClass, {
                        [activeClass]:
                          ['wallet'].includes(currentPath) ||
                          pathname?.match(/(wallet)\/[a-zA-Z0-9]/gi),
                      })}
                      href='/wallet'>
                      나의 지갑
                    </Link>
                    {/* <Link
                      style={menuStyle}
                      className={clsx(menuClass, {
                        [activeClass]:
                          ['gallery'].includes(currentPath) ||
                          pathname?.match(/(gallery)\/[a-zA-Z0-9]/gi) ||
                          /^\/(issuer+)\/([\w.%+-]+)\/(badges*$)/i.test(pathname),
                      })}
                      to='/gallery'>
                      배지 갤러리
                    </Link> */}
                    {/* <Link
                      style={menuStyle}
                      className={clsx(menuClass, {
                        [activeClass]:
                          ['submission'].includes(currentPath) ||
                          pathname?.match(/(submission)\/[a-zA-Z0-9]/gi),
                      })}
                      to='/submission'>
                      {translate('MENU.SUBMIT_OPEN_BADGE')}
                    </Link>
                    <Link
                      style={menuStyle}
                      className={clsx(menuClass, {
                        [activeClass]:
                          ['issue'].includes(currentPath) ||
                          pathname?.match(/(issue)\/[a-zA-Z0-9]/gi),
                      })}
                      to='/issue'>
                      {translate('MENU.ISSUE.BADGES')}
                    </Link> */}
                    {/* <Link
                  style={menuStyle}
                    className={clsx(menuClass, {
                      [activeClass]: ['verification'].includes(currentPath),
                    })}
                    to='/verification'>
                    {translate('MENU.VERIFICATION')}
                  </Link> */}
                    {/* <Dropdown>
                    <Dropdown.Toggle
                      variant='light'
                      size='sm'
                      className='text-dark d-flex align-items-center justify-content-between gap-5'>
                      Menu
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => ''}>Sub Menu 1</Dropdown.Item>
                      <Dropdown.Item onClick={() => ''}>Sub Menu 2</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                  </div>
                </div>
              </div>
            )}

            {header?.left === 'page-title' && (
              <div className='d-flex align-items-center' id='kt_header_nav'>
                <DefaultTitle />
              </div>
            )}
          </div>

          <Topbar />
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}
