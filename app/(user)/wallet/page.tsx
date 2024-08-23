// import moment from 'moment'
// import { FC } from 'react'

export default function Home() {
  return (
    <div className='z-10 max-w-5xl w-full items-center justify-between'>
      <div className=''>MY WALLET</div>
      <div className='btn btn-primary'>Change status</div>
      {Array(10)
        .fill('')
        .map((m: any, index: number) => (
          <div className='' key={index}>
            INDEX - {index}
          </div>
        ))}
    </div>
  )
}
