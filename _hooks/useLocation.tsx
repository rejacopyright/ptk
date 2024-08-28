'use client'

interface LocationProps extends Partial<Location> {
  url?: string
  urlBtoa?: string
}

function useLocation() {
  const getLocation: LocationProps = typeof window !== 'undefined' ? window.location : {}
  if (getLocation) {
    const fullPathWithoutOrigin = getLocation?.href?.replace(
      getLocation?.origin?.toString() || '',
      ''
    )
    getLocation.url = fullPathWithoutOrigin
    getLocation.urlBtoa = btoa(fullPathWithoutOrigin || '/')
  }
  return getLocation
}

export default useLocation
