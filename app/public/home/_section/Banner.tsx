import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const PrimaryBanner: FC<any> = () => {
  return (
    <div
      className='d-flex align-items-center overflow-hidden container content position-relative'
      style={{
        background: 'linear-gradient(180deg, #F26D26 -2.25%, #FCA350 111%)',
        height: '800px',
      }}>
      <div className='position-absolute end-0' style={{ zIndex: 0 }}>
        <Image
          src='/media/assets/cards.png'
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          style={{ width: '100%', height: 'auto' }}
          priority
        />
      </div>
      <div className='col home-text-banner text-center text-lg-start' style={{ zIndex: 1 }}>
        <p className='text-white fs-28px fw-bolder ls-n1'>나의 경험을 증명할 수 있는 수단</p>
        <div className=''>
          <Image
            src='/logo/potentok-white.png'
            className='my-36px'
            alt=''
            width={336}
            height={68}
            priority
          />
        </div>
        <Link
          href='/login'
          target='_top'
          className='btn btn-flex flex-center px-18px btn-white h-46px fw-bolder text-dark fs-15px radius-5'>
          바로 시작
        </Link>
      </div>
      <div className='col-auto h-100' style={{ zIndex: 1 }}>
        <div className='d-none d-lg-flex' style={{ width: '735px', paddingTop: '168px' }}>
          <Image
            src='/media/assets/hand-with-card.png'
            className='img-fluid'
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </div>
      </div>
    </div>
  )
}
