'use client'
import { badgeImage, getBadges } from '@api/badge'
import { Sticky } from '@components/cards/Sticky'
import { FilterDate } from '@components/filter/Calendar'
import { FilterCategory, valueKey } from '@components/filter/Category'
import { ProductLoader } from '@components/loader'
import { ToastMessage } from '@components/toast'
import Tooltip from '@components/tooltip'
import { blobToBase64, configClass, detectMobileScreen, getJWTPayload, KTSVG } from '@helpers'
import { useDeepEffect, useSize } from '@hooks'
import { CustomLogo, PageTitle } from '@metronic/layout/core'
import { setWalletDetail } from '@redux'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

const CardBadge: FC<{ detail: any; onDistributionChanged: () => void; achievement: any }> = ({
  detail,
  achievement,
}) => {
  const router = useRouter()
  const { jwt, name, issuer, imgFile, ACHIEVEMENT_TYPE_KR } = detail || {}

  const [isMobile, setIsMobile] = useState<boolean>(false)

  const badgeImageQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['badgeImage', imgFile],
    queryFn: async () => {
      const api: any = await badgeImage(imgFile)

      const responseData: any = api?.data
      const base64 = await blobToBase64(responseData)
      if (responseData) {
        return { base64, blob: responseData }
      } else {
        return undefined
      }
    },
  })

  // const badgeImageData: any = '/media/placeholder/badge.png'
  const badgeImageData: any = badgeImageQuery?.data?.base64 || '/media/placeholder/badge.png'

  useSize(() => {
    setIsMobile(detectMobileScreen())
  }, 100)

  return (
    <div
      className='d-flex flex-column card-2 bg-white radius-15 cursor-default card-badge-xxx p-24px'
      onClick={async () => {
        await setWalletDetail({ img: badgeImageData, jwt, ...detail })
        router.push(`/wallet/detail/${detail?.USER_ID}/${detail?.USER_BDG_ID}?id=${jwt}`, {
          scroll: false,
          // state: { img: badgeImageData, imgBlob: badgeImageBlob, jwt, ...detail },
        })
      }}>
      <div className='text-center'>
        <div
          className='fw-bold fs-13px d-inline-block px-8px py-2px radius-5'
          style={{
            background: `#${achievement?.color_label || 'efeff1'}`,
            color: `#${achievement?.color_text || '000'}`,
          }}>
          {ACHIEVEMENT_TYPE_KR}
        </div>
      </div>
      <div
        className='radius-10 d-flex mx-auto my-20px position-relative'
        style={{
          background: `url(${badgeImageData}) center / contain no-repeat`,
          height: `${isMobile ? '100px' : '150px'}`,
          width: `${isMobile ? '100px' : '150px'}`,
        }}>
        {detail?.TXID === '0x3c96f038be04e06e69067dd8311c9737ff95983f642a995a8eb4740aec2d211c' && (
          <div className='position-absolute' style={{ bottom: '10px', right: '10px' }}>
            <Tooltip
              placement='bottom'
              active={true}
              tooltipClass='w-tooltip'
              title='발행 기관에서 폐기한 배지입니다.'>
              <div
                className='bg-danger radius-50 d-flex flex-center'
                style={{ width: '42px', height: '42px' }}>
                <i className='las la-info-circle text-white fs-28px' />
              </div>
            </Tooltip>
          </div>
        )}
      </div>
      <div
        className='fw-bolder text-center d-flex flex-center fs-16px mb-20px'
        style={{ height: '48px' }}>
        {name}
      </div>
      <div className='d-flex flex-center fs-14px gap-5px'>
        <div className='text-gray-500 fw-400 text-nowrap'>발행 기관</div>
        <div className='fw-500 align-self-end text-truncate-1'>{issuer?.name}</div>
      </div>
    </div>
  )
}

const Index: FC<any> = () => {
  const user: any = useSelector(({ user }: any) => user?.data, shallowEqual)
  const queryClient = useQueryClient()

  const [filterAchievement, setFilterAchievement] = useState<any>([])
  const [startDate, setStartDate] = useState<any>(undefined)
  const [endDate, setEndDate] = useState<any>(undefined)
  const [sortBy, setSortBy] = useState<any>('A')
  const [searchKey, _setSearchKey] = useState<any>(undefined)
  const [reloadDataBadges, setReloadDataBadges] = useState<boolean>(false)

  const [showModalStartDate, setShowModalStartDate] = useState<boolean>(false)
  const [showModalEndDate, setShowModalEndDate] = useState<boolean>(false)

  const isAnyParams: boolean = filterAchievement?.length > 0 || startDate || endDate

  const getCachedCategory: any = queryClient.getQueryData([
    'getCategories',
    { user_id: user?.user_id },
  ])

  const dataBadgesQueryParams: any = {
    user_id: user?.user_id,
    achievement_type: filterAchievement?.length
      ? filterAchievement?.map((m: any) => m?.[valueKey])
      : undefined,
    name: searchKey,
    reg_start_date: startDate,
    reg_end_date: endDate,
    sort: sortBy,
  }

  const dataBadgesQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getBadges', { ...dataBadgesQueryParams, reloadDataBadges }],
    queryFn: async () => {
      const api: any = await getBadges(dataBadgesQueryParams)
      let res: any = api?.data?.message?.reason?.list || []
      res = res?.map((item: any) => {
        const { USER_ID: user_id, BADGE_FILE_NAME } = item || {}
        const badge_file_name: any = BADGE_FILE_NAME?.split('.')
          ?.slice(0, BADGE_FILE_NAME?.split('.')?.length - 1)
          ?.join('.')

        item.info = getJWTPayload(item.BADGE)
        const mappedResult: any = {
          ...(item?.info?.vc || {}),
          imgFile: { user_id, badge_file_name },
          jwt: item?.BADGE,
          ...item,
          USER_SUB_ID: item?.USER_SUB_ID,
          USER_BDG_ID: item?.USER_BDG_ID,
          expiration_date: item?.EXPIRATION_DATE,
        }
        return mappedResult
      })
      return res
    },
  })

  const dataBadges: any = dataBadgesQuery?.data || []
  const pageIsLoading: any = !dataBadgesQuery?.isFetched

  useDeepEffect(() => {
    if (dataBadgesQuery?.isError) {
      ToastMessage({
        type: 'error',
        message: dataBadgesQuery?.error?.response?.data?.message?.reason,
      })
    }
  }, [dataBadgesQuery?.error?.response?.data?.message?.reason, dataBadgesQuery?.isError])

  const resetFilter: any = () => {
    setFilterAchievement([])
    setStartDate(undefined)
    setEndDate(undefined)
    setSortBy('A')
  }

  return (
    <>
      <PageTitle description='Blank'>나의 지갑</PageTitle>
      <CustomLogo>
        <div className='d-flex align-items-center gap-8px'>
          <div
            className='d-flex flex-center bg-light-orange radius-5'
            style={{ width: '30px', height: '30px', border: '1px solid #F7AE86' }}>
            <KTSVG path='/media/icons/custom/wallet.svg' svgClassName='w-18px h-18px' />
          </div>
          <div className='fs-18px fw-700 lh-1 ls-n1'>나의 지갑</div>
        </div>
      </CustomLogo>
      {/* Section One */}
      <div className='mt-50px d-none d-lg-block'>
        <div className='d-flex align-items-center gap-8px'>
          <div
            className='d-flex flex-center bg-light-orange radius-5'
            style={{ width: '36px', height: '36px', border: '1px solid #F7AE86' }}>
            <KTSVG path='/media/icons/custom/wallet.svg' svgClassName='w-18px h-18px' />
          </div>
          <div className='fs-22px fw-700 lh-1 ls-n1'>나의 지갑</div>
        </div>
        <div className='fs-16px fw-400 mt-8px'>내가 발급 받은 배지를 확인할 수 있습니다.</div>
      </div>
      <Sticky className='pb-8px mb-16px bg-body mx-n5 px-5 mt-5 mt-lg-0'>
        <div className='page-filter'>
          <div className='d-flex flex-wrap gap-16px'>
            <div className=''>
              <div className='fs-14px fw-bold mb-8px'>배지 구분</div>
              <FilterCategory
                filterCategory={filterAchievement}
                onFilterCategory={setFilterAchievement}
              />
            </div>
            <div className=''>
              <div className='fs-14px mb-8px fw-bold'>발행 날짜</div>
              <div className='cursor-pointer w-date-filter' style={{ height: '40px' }}>
                <div className='input-group input-group-solid d-flex bg-white align-items-center border border-gray-300 position-relative h-40px'>
                  <div
                    className='form-control bg-white fs-15px text-dark h-100 radius-5 lh-18px'
                    style={{ letterSpacing: '-0.6px' }}>
                    <div className='d-flex gap-5px text-date-filter pe-30px'>
                      <div className='' onClick={() => setShowModalStartDate(true)}>
                        {startDate || 'YYYY. MM. DD'}
                      </div>
                      <div className=''>~</div>
                      <div className='' onClick={() => setShowModalEndDate(true)}>
                        {endDate || 'YYYY. MM. DD'}
                      </div>
                    </div>
                    <div className='position-absolute top-0 bottom-0 end-0 d-flex align-items-center pe-14px'>
                      <KTSVG
                        path='/media/icons/custom/calendar.svg'
                        className=''
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Modal Start Date */}
              <FilterDate
                show={showModalStartDate}
                maxDate={
                  endDate && moment(endDate).isSameOrBefore(moment(), 'days')
                    ? moment(endDate).toDate()
                    : new Date()
                }
                setShow={setShowModalStartDate}
                filterDate={startDate}
                onFilterDate={setStartDate}
              />

              {/* Modal End Date */}
              <FilterDate
                show={showModalEndDate}
                minDate={startDate ? moment(startDate).toDate() : undefined}
                setShow={setShowModalEndDate}
                filterDate={endDate}
                onFilterDate={setEndDate}
              />
            </div>
            <div className='d-flex gap-16px'>
              <div
                className={configClass?.filterButton}
                onClick={() => setSortBy((prev: string) => (prev === 'A' ? 'B' : 'A'))}>
                <i
                  className={`las la-arrow-${sortBy === 'A' ? 'up' : 'down'} fs-16px text-dark mb-2px`}
                />
                <div className='fw-bolder fs-14px'>{sortBy === 'A' ? '최신순' : '오래된 순'}</div>
              </div>
              <div className={configClass?.filterButton} onClick={resetFilter}>
                <i className='las la-redo-alt fs-16px text-dark mb-2px' />
                <div className='fw-bolder fs-14px'>초기화</div>
              </div>
            </div>
          </div>
        </div>
      </Sticky>
      <div
        className='d-flex align-items-center fw-bolder gap-8px'
        style={{ marginBottom: '-10px', height: '36px' }}>
        <div className='text-dark fs-18px'>보유 배지</div>
        <div className='text-primary fs-22px mb-2px fw-700'>{dataBadges?.length}</div>
      </div>
      {pageIsLoading ? (
        <ProductLoader count={6} containerClass='row' itemClass='col-6 col-lg-3 mb-5' />
      ) : !dataBadges?.length ? (
        <div className='d-flex flex-center w-100' style={{ height: '60vh' }}>
          <div className='text-center'>
            <div
              className='w-150px h-150px mx-auto'
              style={{
                background: 'url(/media/placeholder/badge-gray.png) center / cover no-repeat',
              }}
            />
            <div className='text-center mt-24px fw-600 fs-18px' style={{ color: '#919BA7' }}>
              보유한 배지가 없습니다.
            </div>
            {isAnyParams && (
              <div
                className='d-inline-flex flex-center mt-24px bg-white radius-100 border border-gray-300 gap-4px px-16px py-6px cursor-pointer'
                style={{ height: '36px' }}
                onClick={resetFilter}>
                <i className='las la-redo-alt fs-18px mb-1px' />
                <div className='fs-14px fw-400 text-gray-500'>검색 설정 되돌리기</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='row my-24px card-badge-row-xxx'>
          {dataBadges?.map((m: any, index: number) => {
            const achievementDetail: any = getCachedCategory?.find(
              (f: any) => f?.[valueKey] === m?.ACHIEVEMENT_TYPE
            )

            return (
              <div
                // className='col-12 col-md-4 col-lg-3 col-xl-3 mb-5 mb-xl-5 col-xxl-auto mb-xxl-0 px-0'
                className='col-10 offset-1 col-sm-6 offset-sm-3 offset-lg-0 col-lg-4 col-xl-3 mb-5 px-3'
                key={index}>
                <CardBadge
                  detail={m}
                  achievement={achievementDetail}
                  onDistributionChanged={() => setReloadDataBadges((prev: any) => !prev)}
                />
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Index
