// import Head from 'next/head'

import Link from 'next/link'

export async function generateMetadata({ params }, parent) {
  const badgeId = params?.badgeId

  let res: any = undefined
  try {
    res = await fetch(`https://reqres.in/api/users/${badgeId}`)
  } catch {}
  const data = (await res?.json())?.data

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    metadataBase: new URL('https://dev.potentok.com'),
    title: data?.first_name,
    openGraph: {
      images: [data?.avatar, ...previousImages],
    },
  }
}

export default async function WalletDetail({ params }: any) {
  const badgeId = params?.badgeId
  const data = (await (await fetch(`https://reqres.in/api/users/${badgeId}`))?.json())?.data

  return (
    <>
      <h1>{data?.first_name}</h1>
      <h1 className='mb-2'>{data?.last_name}</h1>
      <Link
        href='/'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full'>
        Home
      </Link>
    </>
  )
}
