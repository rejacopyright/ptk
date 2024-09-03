import { deleteEmail } from '@api/profile'
import { ToastMessage } from '@components/toast'
import { FC, useState } from 'react'
import { Modal } from 'react-bootstrap'

const Index: FC<{
  show: boolean
  setShow: (e: boolean) => void
  detail: any
  onSubmit?: (e: any) => void
}> = ({ show, setShow, detail, onSubmit = () => '' }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleOnSubmit = () => {
    setLoading(true)
    deleteEmail({ user_id: detail?.user_id, user_eml: detail?.user_eml })
      .then(() => {
        setShow(false)
        onSubmit(detail?.user_eml)
        ToastMessage({ type: 'success', message: '이메일이 성공적으로 제거되었습니다.' })
      })
      .catch(({ response }: any) => {
        ToastMessage({ type: 'error', message: response?.data?.message?.reason })
      })
      .finally(() => setLoading(false))
  }
  return (
    <Modal
      scrollable
      centered
      dialogClassName='modal-md w-lg-400px'
      contentClassName='radius-15 shadow-lg'
      show={show}
      onHide={() => setShow(false)}>
      <Modal.Body className='p-24px'>
        <div className='text-center mb-24px'>
          <span className='fw-bolder'>{detail?.user_eml || 'email'}</span>
          <span className='mx-1'>을 삭제하시겠습니까</span>
          <span>?</span>
        </div>
        <div className='d-flex gap-8px'>
          <div className='col'>
            <div
              className='btn btn-flex w-100 btn-white border border-gray-300 text-dark fw-bolder flex-center px-12px'
              onClick={() => setShow(false)}>
              아니오
            </div>
          </div>
          <div className='col'>
            <button
              type='button'
              onClick={handleOnSubmit}
              disabled={loading}
              className='btn btn-danger btn-flex flex-center w-100 text-nowrap'>
              {loading ? (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  기다리세요...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span>예</span>
              )}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Index
