import { NextResponse } from 'next/server'

export async function middleware(req) {
  // const url = req.nextUrl.clone()

  // if (req.nextUrl.pathname.startsWith('/admin')) {
  //   return NextResponse.rewrite(new URL('/', req.url))
  //   // return NextResponse.next()
  // }
  if (req.nextUrl.pathname.startsWith('/')) {
    console.log(req.nextUrl)
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|login|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
