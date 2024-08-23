import Datepicker from '@components/form/date-picker'
import moment from 'moment'
import { FC, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

interface Props {
  filterDate?: string | undefined
  onFilterDate?: (e: string | undefined) => void
  show: boolean
  setShow: (e: boolean) => void
  minDate?: Date | undefined
  maxDate?: Date | undefined
}

export const FilterDate: FC<Props> = ({
  filterDate = undefined,
  onFilterDate = () => '',
  show,
  setShow,
  minDate = undefined,
  maxDate = undefined,
}) => {
  const [value, setValue] = useState<any>(new Date())
  // const [isShown, setIsShown] = useState<any>(new Date())
  useEffect(() => {
    setValue(moment(filterDate).format('YYYY-MM-DD'))
  }, [filterDate])
  return (
    <Modal
      dialogClassName='modal-sm modal-dialog-centered justify-content-center'
      contentClassName='w-auto'
      show={show}
      onHide={() => {
        setShow(false)
        // setDates(initDate)
      }}>
      <Modal.Body className='p-0'>
        <div className='px-24px pt-24px radius-10 shadow-calendar'>
          <div className='w-calendar m-auto'>
            <div className='pb-24px'>
              <Datepicker
                defaultValue={value}
                onChange={setValue}
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>
            <div className='row m-0 gap-8px py-16px'>
              <div className='col p-0'>
                <button
                  type='button'
                  onClick={() => setShow(false)}
                  className='btn w-100 btn-sm btn-flex flex-center btn-white border border-gray-300 text-dark fw-bolder fs-14px h-40px col text-nowrap'>
                  닫기
                </button>
              </div>
              <div className='col p-0'>
                <button
                  type='button'
                  onClick={() => {
                    onFilterDate(moment(value).format('YYYY-MM-DD'))
                    setShow(false)
                  }}
                  className='btn w-100 btn-sm btn-flex flex-center btn-primary fw-bolder fs-14px h-40px col text-nowrap'>
                  적용
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
