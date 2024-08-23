// eslint-disable-next-line simple-import-sort/imports
import 'react-calendar/dist/Calendar.css'
import './style.scss'

import moment from 'moment'
import 'moment/locale/ko'
import { FC, useEffect, useState } from 'react'
import Calendar from 'react-calendar'

// type ValuePiece = Date | null

// type Value = ValuePiece | [ValuePiece, ValuePiece]

interface Props {
  defaultValue?: string | undefined
  minDate?: Date | undefined
  maxDate?: Date | undefined
  onChange?: (e: string | undefined) => void
}

const Index: FC<Props> = ({
  defaultValue,
  onChange = () => '',
  minDate = undefined,
  maxDate = undefined,
}) => {
  const [value, setValue] = useState<any>(new Date())

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <Calendar
      locale='ko'
      minDate={minDate}
      maxDate={maxDate}
      onChange={(e: any) => {
        setValue(e)
        onChange(e)
      }}
      // view='month'
      navigationLabel={({ date }) => moment(date).format('MMM')}
      value={value}
      formatDay={(_locale: any, date) => {
        return moment(date).format('D')
      }}
    />
  )
}

export default Index
