import Page from '@pages/(user)/wallet/detail/[...badgeId]/page'
export default function Index({ params, searchParams }) {
  return <Page {...{ params, searchParams }} />
}
