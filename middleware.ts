import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // const url = req.nextUrl.clone()

  // if (req.nextUrl.pathname.startsWith('/admin')) {
  //   return NextResponse.rewrite(new URL('/', req.url))
  //   // return NextResponse.next()
  // }

  const authRoutes: any = ['/login', '/register']
  const publicPath: any = '/public'

  const cookieStore = cookies()
  const hasToken = cookieStore?.has('token') && Boolean(cookieStore?.get('token')?.value)

  if (
    !authRoutes.includes(req.nextUrl.pathname) &&
    !hasToken &&
    !req.nextUrl.pathname?.startsWith(publicPath)
  ) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  } else if (
    authRoutes.includes(req.nextUrl.pathname) &&
    hasToken &&
    !req.nextUrl.pathname?.startsWith(publicPath)
  ) {
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
