import { useSize } from '@hooks'
import { useLayout } from '@metronic/layout/core'
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react'

type Kebab<T extends string, A extends string = ''> = T extends `${infer F}${infer R}`
  ? Kebab<R, `${A}${F extends Lowercase<F> ? '' : '-'}${Lowercase<F>}`>
  : A
type KebabKeys<T> = { [K in keyof T as K extends string ? Kebab<K> : K]: T[K] }

// export const getContentProperty = (property: keyof CSSProperties) => {
export const getContentProperty = (property: keyof KebabKeys<CSSProperties>) => {
  const thisEl: any = document.getElementById('kt_content')
  const res: any = thisEl
    ? window?.getComputedStyle(thisEl, null)?.getPropertyValue(property)
    : undefined

  return res
}

export const elementProperty: any = () => {
  const headerEl: any = document.getElementById('kt_header')
  const toolBarEl: any = document.getElementById('kt_toolbar')

  let headerHeight: any = 0,
    toolBarHeight: any = 0,
    toolBarIsHidden: any = true

  const toolbar = useLayout()?.config?.toolbar

  if (typeof window !== 'undefined') {
    headerHeight = headerEl
      ? parseInt(window?.getComputedStyle(headerEl, null)?.getPropertyValue('height'))
      : 0
    toolBarHeight = toolBarEl
      ? parseInt(window?.getComputedStyle(toolBarEl, null)?.getPropertyValue('height'))
      : parseInt(toolbar?.layouts?.[toolbar?.layout]?.height) || 0
    toolBarIsHidden = toolBarEl
      ? window?.getComputedStyle(toolBarEl, null)?.getPropertyValue('display')?.match('none')
      : true
  }

  return { headerHeight, toolBarHeight, toolBarIsHidden }
}

export const Sticky: FC<any> = ({ children, className = '', style = {} }) => {
  const stickyRef: any = useRef()
  const { headerHeight, toolBarHeight, toolBarIsHidden }: any = elementProperty()
  const [top, setTop] = useState<any>(0)

  const wrapper: any = useMemo(() => document.getElementById('kt_wrapper'), [])
  const getHeight: any = (headerHeight || 0) + (!toolBarIsHidden ? toolBarHeight || 0 : 0)

  useSize(() => {
    setTop(toolBarHeight)
    try {
      wrapper.style.paddingTop = getHeight + 'px'
    } catch {
      undefined
    }
  }, 100)

  useEffect(() => {
    return () => {
      const wrapper: any = document.getElementById('kt_wrapper')
      try {
        wrapper.style.paddingTop = (toolBarHeight || 0) + 'px'
      } catch {
        undefined
      }
    }
  }, [getHeight, headerHeight, toolBarHeight])

  return (
    <div ref={stickyRef} className='position-sticky w-100' style={{ zIndex: 99, top }}>
      {className ? (
        <div className={className} style={style}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}
