import { APP_EMAIL } from '@helpers'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const Footer: FC<any> = () => {
  return (
    <div
      className='d-flex align-items-center justify-content-center justify-content-lg-start bg-white px-65px mt-24px text-center text-lg-start'
      style={{ height: '184px', background: '#efeff1' }}>
      <div className=''>
        <Link href='/'>
          <Image src='/potentok-gray.png' alt='potentok-logo' width={168} height={34} />
        </Link>
        <div className='d-flex align-items-center justify-content-center justify-content-lg-start my-10px gap-8px text-gray-700'>
          <Link href='/policy' className='fs-14px fw-bolder text-dark'>
            개인정보 처리 방침
          </Link>
          <div className='fs-10px fw-bolder text-gray-400'>|</div>
          <Link href='/terms' className='fs-14px fw-bolder text-dark'>
            서비스 이용 약관
          </Link>
        </div>
        <div className='fs-13px text-gray-500'>
          <div className=''>서울특별시 중구 퇴계로 286 쌍림빌딩 10층 체인버스</div>
          <div className=''>
            고객센터 이메일로 문의하시면 빠른 시간 내에 이메일로 답변드리도록 하겠습니다.
          </div>
          <div className=''>
            <span className='fw-bolder text-gray-700'>고객 센터 : </span>
            {APP_EMAIL}
          </div>
        </div>
      </div>
    </div>
  )
}
