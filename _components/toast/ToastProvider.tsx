// import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/ReactToastify.min.css'

import { ToastContainer } from 'react-toastify'

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer limit={0} stacked />
    </>
  )
}
