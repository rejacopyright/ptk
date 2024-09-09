import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // const url = req.nextUrl.clone()

  // if (req.nextUrl.pathname.startsWith('/admin')) {
  //   return NextResponse.rewrite(new URL('/', req.url))
  //   // return NextResponse.next()
  // }

  // const PUBLIC_FILE = /\.(.*)$/
  // console.log(req.nextUrl.pathname, ' =========> ', PUBLIC_FILE.test(req.nextUrl.pathname))

  const isAuthRoutes: boolean = /^(\/(login|register|password)\/?\w*)/g.test(req.nextUrl.pathname)
  const isPublicPaths: boolean = /^(\/(public)\/\w+)|(\/(policy|terms)$)/g.test(
    req.nextUrl.pathname
  )

  const cookieStore = cookies()
  const hasToken = cookieStore?.has('token') && Boolean(cookieStore?.get('token')?.value)

  if (!isAuthRoutes && !hasToken && !isPublicPaths) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  } else if (isAuthRoutes && hasToken && !isPublicPaths) {
    const params: any = req.nextUrl.searchParams
    const requestParam: any = await params.get('request')
    return NextResponse.redirect(new URL(requestParam ? atob(requestParam) : '/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|favicon.png|media|logo|sitemap.xml|robots.txt).*)'],
}
