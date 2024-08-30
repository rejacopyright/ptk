import { setLanguage } from '@metronic/i18n/Metronici18n'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const NavbarDesktop = ({ _language }: any) => {
  // const userID: any = useSelector(({ user }: any) => user?.user_id, shallowEqual)
  // const token: any = Cookies.get(`token`)

  return (
    <nav
      className='container d-flex column align-item-center justify-content-between flex-wrap gap-4 px-65px'
      style={{ height: '56px' }}>
      <div className='d-flex column gap-5 flex-fill align-items-center'>
        <div className='d-flex column gap-2 align-items-center'>
          <Image
            alt='Logo'
            src='/logo/potentok.png'
            className=''
            width={125}
            height={25}
            priority
          />
        </div>
      </div>
      <div className='d-flex flex-row-reverse justify-content-end-reverse column flex-fill gap-7 align-items-center'>
        {/* {token && userID ? (
          <Link to='/wallet' className='btn btn-primary py-2 px-7'>
            My Wallet
          </Link>
        ) : (
          <Link to='/login' className='btn btn-primary py-2 px-7'>
            Login
          </Link>
        )} */}
        {/* <Dropdown className='mx-n5'>
          <Dropdown.Toggle className='bg-white' size={'sm'} variant=''>
            <img className='w-15px h-15px rounded-1' src={language?.flag} alt='metronic' />
            <div
              className='btn px-2 text-dark fw-bold fs-14px bg-transparent '
              data-bs-toggle='dropdown'
              aria-expanded='false'>
              {language?.name}
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {languages.map((l, index) => (
              <Dropdown.Item
                key={index}
                className='d-flex column gap-2 justify-content-start align-items-center'
                onClick={() => setLanguage(l.lang)}>
                <img className='w-15px h-15px rounded-1 ms-2' src={l.flag} alt='metronic' />
                {l.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown> */}
        <Link href='/login' target='_parent' className='pe-auto text-dark fw-bold fs-14px'>
          크리에이터
        </Link>
        <Link href='/login' target='_parent' className='pe-auto text-dark fw-bold fs-14px'>
          비즈니스
        </Link>
      </div>
    </nav>
  )
}

export const NavbarMobile = ({ _language }: any) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false)
  const [isLangOpen, setLangMenu] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const _toggleLangMenu = () => {
    setLangMenu(!isLangOpen)
  }

  const _onChangeLang = (countryCode) => {
    setLangMenu(false)
    setLanguage(countryCode)
  }

  return (
    <div className='fixed-top bg-white'>
      <div className='container d-flex column align-items-center justify-content-between flex-wrap gap-4 py-5 '>
        <div className='d-flex column gap-10 flex-fill align-items-center justify-content-center'>
          <div className='d-flex gap-2 align-items-center'>
            <img alt='Logo' src='/logo/potentok.png' className='h-30px' />
          </div>
          <div className='container position-absolute start-0'>
            <button className='btn btn-primary' onClick={toggleMenu}>
              {isMenuOpen ? 'X' : '☰'}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className='bg-primary d-flex row justify-content-center align-item-center '>
          <div className='text-center my-2'>
            <a href='#home' className='text-white fs-1'>
              Home
            </a>
          </div>
          <div className='text-center my-2'>
            <a href='#about' className='text-white fs-1'>
              About
            </a>
          </div>
          {/* <div className='text-center my-2'>
            <div className='text-white fs-1' onClick={toggleLangMenu}>
              <img className='w-15px h-15px rounded-1 ms-2' src={language?.flag} alt='metronic' />
              <button
                className='btn dropdown-toggle text-white fw-bold fs-3'
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                {language?.name}
              </button>
            </div>
            {isLangOpen && (
              <div className='bg-dark'>
                {languages.map((l, index) => (
                  <div
                    key={index}
                    className='d-flex gap-3 align-items-center py-2 border border-primary'
                    onClick={() => onChangeLang(l.lang)}>
                    <img className='w-15px h-15px rounded-1 ms-2' src={l.flag} alt='metronic' />
                    <p className='text-white'>{l.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div> */}
          <div className='text-center my-2'>
            <a href='/login' className='text-white fs-1'>
              Login
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
