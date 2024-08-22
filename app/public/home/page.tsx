'use client'
import { detectMobileScreen } from '@helpers'
import { useSize } from '@hooks'
import { useLang } from '@metronic/i18n/Metronici18n'
import { useState } from 'react'

import { HomepageAds } from './_section/Ads'
import { PrimaryBanner } from './_section/Banner'
import { CardBadge } from './_section/CardBadge'
import { CardTrophy } from './_section/CardTrophy'
import { NavbarDesktop, NavbarMobile } from './_section/HomeNavbar'

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: '/media/flags/us.svg',
  },
  {
    lang: 'ko',
    name: 'Korea',
    flag: '/media/flags/kr.svg',
  },
  {
    lang: 'id',
    name: 'Indonesia',
    flag: '/media/flags/id.svg',
  },
]

const Home = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const lang = useLang()
  const currentLanguage = languages.find((x) => x.lang === lang)

  useSize(() => {
    setIsMobile(detectMobileScreen())
  }, 100)

  return (
    <div className='' style={{ background: '#f8f9fb' }}>
      <div className='sticky-top bg-white'>
        {!isMobile ? (
          <NavbarDesktop language={currentLanguage} />
        ) : (
          <NavbarMobile language={currentLanguage} />
        )}
      </div>
      <PrimaryBanner />
      <HomepageAds />
      <CardBadge
        title={
          <div className='mb-32px'>
            <div className='fs-28px fw-bolder'>디지털 세상에서</div>
            <div className='fs-28px fw-bolder'>배지로 나를 증명하세요.</div>
          </div>
        }
      />
      <CardTrophy
        title={
          <div className='mb-32px'>
            <div className='fs-28px fw-bolder'>생애주기별 다양한 경험을</div>
            <div className='fs-28px fw-bolder'>포텐톡에 담아 기록하고, 증명하세요.</div>
          </div>
        }
      />
    </div>
  )
}

export default Home
