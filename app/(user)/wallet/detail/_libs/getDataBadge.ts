import { getDetailBadge } from '@api/badge'
import { getBufferIMG, getPublicBadgeDetail } from '@api/public'
import { bufferUrlToBase64 } from '@helpers'
import { cache } from 'react'

export const getDataBadgeQuery: any = cache(async (params) => {
  const paramsLength: any = params?.badgeId?.filter((f: any) => f !== 'undefined')?.length

  const id: any = paramsLength === 3 ? params?.badgeId?.[2] : undefined
  const USER_ID: any = paramsLength === 3 ? params?.badgeId?.[0] : undefined
  const sharingToken = paramsLength === 1 ? params?.badgeId?.[0] : undefined
  const isPublic: boolean = Boolean(sharingToken && !USER_ID && paramsLength === 1)

  let badgePublicToken: any = {}
  let badgePublicImage: any = undefined
  let detailBadgeData: any = {}

  if (isPublic) {
    try {
      if (sharingToken) {
        const getPublicBadgeDetailAPI: any = (await getPublicBadgeDetail(sharingToken))?.data
        const getPublicBadgeDetailData: any = getPublicBadgeDetailAPI?.message?.reason
        badgePublicToken =
          (await getDetailBadge({ data: getPublicBadgeDetailData?.BADGE }))?.data?.message?.vc || {}
      }
      const imgURL: any = await getBufferIMG(sharingToken)
      badgePublicImage = bufferUrlToBase64(imgURL)
    } catch {
      badgePublicImage = '/media/placeholder/badge.png'
    }
  } else if (id && USER_ID) {
    try {
      const detailBadgeAPI: any = (await getDetailBadge({ data: id }))?.data
      detailBadgeData = detailBadgeAPI?.message?.vc
    } catch {}
  }

  const detail: any = !isPublic ? detailBadgeData : badgePublicToken || {}

  return {
    USER_ID,
    isPublic,
    detail,
    achievement: detail?.credentialSubject?.achievement || {},
    badgePublicImage,
    sharingToken,
  }
})
