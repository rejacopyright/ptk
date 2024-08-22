import { DrawerComponent } from '@metronic/assets/ts/components'
import { useLayout } from '@metronic/layout/core'
import clsx from 'clsx'
import uniq from 'lodash/uniq'
import { FC, useEffect } from 'react'
import { useLocation } from 'react-router'

const Content: FC<any> = ({ children }) => {
  const { classes } = useLayout()
  const location = useLocation()
  useEffect(() => {
    DrawerComponent.hideAll()
    classes.contentContainer = uniq([...classes?.contentContainer, 'p-0 m-0'])
  }, [classes, location])

  return (
    <div
      id='kt_content_container'
      className={clsx(classes.contentContainer.join(' '))}
      style={{ maxWidth: 'unset' }}>
      {children}
    </div>
  )
}

export { Content }
