import { MenuHeader } from '@metronic/layout/components/header/MenuHeader'
import UserNavbar from '@metronic/layout/navbar'

interface DataTypes {}
interface RoleProps extends DataTypes {
  sidebar?: any
  navbar?: any
  header?: any
}

export const defineRole: RoleProps = {
  sidebar: false,
  navbar: UserNavbar,
  header: MenuHeader,
}
