import { createShareURL, getDetailBadge } from '@api/badge'
import { getBufferIMG, getPublicBadgeDetail } from '@api/public'
import { Sticky } from '@components/cards/Sticky'
import { APP_HOME_PATH, bufferUrlToBase64, KTSVG } from '@helpers'
import { CustomLogo } from '@metronic/layout/core'
import last from 'lodash/last'
import Link from 'next/link'
import { FC } from 'react'

import ExtraCards from '../_section/ExtraCards'
import InfoCard from '../_section/InfoCard'

const Index: FC<any> = async ({ params, searchParams }) => {
  const id: any = searchParams?.id
  // const id: any = decodedJWT ? atob(decodedJWT) : undefined
  const paramsLength: any = params?.badgeId?.filter((f: any) => f !== 'undefined')?.length
  const USER_ID: any = paramsLength > 1 ? params?.badgeId?.[0] : undefined
  const USER_BDG_ID: any = paramsLength > 1 ? params?.badgeId?.[1] : undefined
  const sharingToken = paramsLength === 1 ? params?.badgeId?.[0] : undefined
  const isPublic: boolean = Boolean(sharingToken && !USER_ID && paramsLength === 1)

  let badgePublicToken: any = {}
  let badgePublicImage: any = undefined
  let detailBadgeAPI: any = {}
  let detailBadgeData: any = {}

  // const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

  // GET SHARING TOKEN
  let shareURLAPI: any = undefined
  const shareURLParams: any = {
    user_id: USER_ID,
    user_bdg_id: USER_BDG_ID,
  }

  if (!isPublic) {
    try {
      shareURLAPI = await createShareURL(shareURLParams)
    } catch {}
  }

  const shareURL: any = last(shareURLAPI?.data?.message?.share_url?.split('/') || []) || undefined

  // FOR PUBLIC
  if (isPublic) {
    try {
      if (sharingToken) {
        const getPublicBadgeDetailAPI: any = (await getPublicBadgeDetail(sharingToken))?.data
        const getPublicBadgeDetailData: any = getPublicBadgeDetailAPI?.message?.reason
        badgePublicToken =
          (await getDetailBadge({ data: getPublicBadgeDetailData?.BADGE }))?.data?.message?.vc || {}
      }
      const imgURL: any = await getBufferIMG(sharingToken)
      // console.log('badgePublicImage =============> ', URL.createObjectURL(imgURL))
      // const contentType: any = imgURL?.headers?.get('Content-Type')?.split(';')?.[0] || 'image/png'
      badgePublicImage = bufferUrlToBase64(imgURL)
    } catch {
      badgePublicImage = '/media/placeholder/badge.png'
    }
  } else if (USER_ID) {
    try {
      detailBadgeAPI = (await getDetailBadge({ data: id }))?.data
      detailBadgeData = detailBadgeAPI?.message?.vc
    } catch {}
  }

  const detailBadge: any = !isPublic ? detailBadgeData : badgePublicToken || {}
  const _achievement: any = detailBadge?.credentialSubject?.achievement || {}

  if (!USER_ID && !isPublic) {
    return (
      <div className='d-flex flex-center' style={{ height: '75vh' }}>
        <div className='text-center'>
          <div
            className='w-150px h-150px mx-auto'
            style={{
              background: 'url(/media/placeholder/badge-gray.png) center / cover no-repeat',
            }}
          />
          <div className='text-center my-24px fw-600 fs-18px' style={{ color: '#919BA7' }}>
            이미 삭제된 배지이거나, 존재하지 않는 배지입니다.
          </div>
          <Link
            href={APP_HOME_PATH}
            className='btn btn-primary btn-flex flex-center h-46px fs-15px'
            style={{ width: '172px' }}>
            홈으로
          </Link>
        </div>
      </div>
    )
  }
  return (
    <>
      {!isPublic && (
        <>
          <CustomLogo>
            <Link href={APP_HOME_PATH} className='d-flex align-items-center gap-8px text-dark'>
              <div
                className='d-flex flex-center bg-light-orange radius-5'
                style={{ width: '30px', height: '30px', border: '1px solid #F7AE86' }}>
                <i className='fas fa-arrow-left text-orange' />
              </div>
              <div className='fs-18px fw-700 lh-1 ls-n1'>나의 배지 상세</div>
            </Link>
          </CustomLogo>
          <div className='d-block d-lg-none mb-20px' />
          <Sticky className='d-none d-lg-flex align-items-center justify-content-between mt-34px py-16px bg-body'>
            <Link href={APP_HOME_PATH} className='d-flex align-items-center gap-12px text-dark'>
              <i className='fas fa-arrow-left text-dark fs-22px mb-2px' />
              <div className='fs-22px fw-700 text-dark'>배지 상세</div>
            </Link>
            <div className='d-flex align-items-center gap-8px text-dark'>
              <KTSVG path='/media/icons/custom/home.svg' width={16} height={16} />
              <i className='las la-angle-right text-dark fs-16px text-gray-300' />
              <Link href={APP_HOME_PATH} className='fs-14px fw-500 text-gray-800'>
                나의 지갑
              </Link>
              <i className='las la-angle-right text-dark fs-16px text-gray-300' />
              <div className='fs-14px fw-500 text-primary'>배지 상세</div>
            </div>
          </Sticky>
        </>
      )}
      <InfoCard
        detailBadge={detailBadge}
        badgePublicImage={badgePublicImage}
        isPublic={isPublic}
        shareURL={shareURL}
        shareIsLoading={false}
      />
      <ExtraCards detailBadge={detailBadge} />
      {/* <div className='d-none xxx justify-content-end gap-2 py-50px'>
            <div
              className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 gap-lg-0 btn btn-sm btn-light-danger border border-danger'
              onClick={() => setShowModalDelete(true)}>
              <i className='las la-trash fs-1 mt-2 mt-lg-0' />
              <span className='fs-5'>Delete</span>
            </div>
          </div>
          <ModalDelete
            show={showModalDelete}
            setShow={setShowModalDelete}
            detail={{ name: detailBadge?.name }}
          /> */}
    </>
  )
}

export default Index
