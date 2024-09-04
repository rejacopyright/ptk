import './static/styleguide.css'
import './static/style.css'
import './static/globals.scss'

import { Sticky } from '@components/cards/Sticky'
import { APP_HOME_PATH, KTSVG } from '@helpers'
import { CustomLogo, PageTitle } from '@metronic/layout/core'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { FC } from 'react'

import __html from './static'

const Index: FC<any> = () => {
  const token: any = Cookies.get(`token`)
  return (
    <>
      <PageTitle description='Digital Assessment Designer'>개인정보취급방침침</PageTitle>
      <CustomLogo>
        <Link
          href={token ? APP_HOME_PATH : '/'}
          className='d-flex align-items-center gap-8px text-dark'>
          <div
            className='d-flex flex-center bg-light-orange radius-5'
            style={{ width: '30px', height: '30px', border: '1px solid #F7AE86' }}>
            <i className='fas fa-arrow-left text-orange' />
          </div>
          <div className='fs-18px fw-700 lh-1 ls-n1'>
            {token ? '개인정보 수집/이용 동의' : '홈페이지'}
          </div>
        </Link>
      </CustomLogo>
      <div className={`d-block d-lg-none ${token ? 'mb-10px' : 'mb-16px'}`} />

      <Sticky className='d-none d-lg-flex align-items-center justify-content-between mt-16px py-16px bg-body'>
        <Link
          href={token ? APP_HOME_PATH : '/'}
          className='d-flex align-items-center gap-12px text-dark'>
          <div
            className='d-flex flex-center bg-light-orange radius-5'
            style={{ width: '36px', height: '36px', border: '1px solid #F7AE86' }}>
            <KTSVG path='/media/icons/custom/card-badge.svg' svgClassName='w-18px h-18px' />
          </div>
          <div className='fs-22px fw-700 lh-1 ls-n1'>개인정보 수집/이용 동의</div>
        </Link>
        <div className='d-flex align-items-center gap-8px text-dark'>
          <KTSVG path='/media/icons/custom/home.svg' width={16} height={16} />
          <i className='las la-angle-right text-dark fs-16px text-gray-300' />
          <div className='fs-14px fw-500 text-primary'>개인정보 수집/이용 동의</div>
        </div>
      </Sticky>
      <div className='mb-24px' dangerouslySetInnerHTML={{ __html }} />
    </>
  )
}

export default Index
