import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import User from '../../../../public/assets/user.svg'
import UserScroll from '../../../../public/assets/user-logo-new.svg'
import axios from 'axios'
import { BASE_URL } from '@/utils/alljsonfile/service'
import LogoWhite from '../../../../public/assets/BankSathi-Logo-white.svg'
import logoMobile from '../../../../public/assets/header-logo-mobile.svg'
import logoSticky from '../../../../public/assets/logo-sticky.svg'
import mobileLogoSticky from '../../../../public/assets/mobile-logo-sticky.svg'
import SearchIcon from '../../../../public/assets/searchIcon.svg'
import SearchIconWhite from '../../../../public/assets/searchiconwhite.svg'
import accordionArrowall from '../../../../public/assets/accordion-down.svg'
import menuImage from '../../../../public/assets/menu.svg'
import { useRouter } from 'next/router'
import { CompareCardBoxData } from '@/utils/alljsonfile/listingfilterdata'
import CreditSubmenu, { ResourceSubmenu, ToolsSubmenu } from '../SubMenu'
import { useWindowSize } from '@/hooks/useWindowSize'
import dynamic from 'next/dynamic'
import { SEARCH_TABS } from '@/utils/alljsonfile/searchFile'
import { useRef } from 'react'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import toast, { Toaster } from 'react-hot-toast'
import jwt from 'jwt-decode'
import { handleRemoveLocalstorage } from '@/utils/util'
import MenuComp from './MenuComp/MenuComp'
import StarRatings from 'react-star-ratings'
import closeicon from '../../../../public/assets/closeIcon.svg'

const LoginModalProfile = dynamic(() => import('../LoginModalProfile'), {
  ssr: false
})
export const COMMON = {
  registerDevice: 'api/v1/common/registerdevice',
  commonGetTopMenu: 'api/v1/common/get_top_menu',
  commonSearch: 'api/v1/common/search',
  panVerify: 'api/v1/common/pan_verify',
  pinCodeVerify: 'api/v1/common/get_pincode_list'
}

export default function Header({
  slug1,
  slug2,
  slug3,
  businessCategorydata,
  showFull = true,
  showCreditScore = true
}) {
  const [scrollY, setScrollY] = useState(0)
  const [searchmodal, setSearchmodal] = useState(false)
  const [search, setSearch] = useState(null)
  const [category, setCategory] = useState(null)
  const [hoverclose, sethoverClose] = useState(false)
  const [loginmodal, setLoginModal] = useState(false)
  const [profileactive, setProfileactive] = useState(false)
  const [SuggestionsSearch, setSuggestionsSearch] = useState()
  const [items, setItems] = useState([])
  const [menuStepper, setMenuStepper] = useState(0)
  const [showPartnersSubMenu, setShowPartnersSubmenu] = useState(false)

  const size = useWindowSize()
  const router = useRouter()

  const starCount = 5
  const isDesktop = size?.width > 768
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const token = typeof window !== 'undefined' && localStorage.getItem('token')

  const partnersSubMenu = [
    {
      id: '1',
      name: 'For Banks/NBFC/Fintech',
      link: '/partners'
    },
    {
      id: '2',
      name: 'For Financial Advisors',
      link: '/advisor'
    }
  ]
  const profileshow = () => {
    setProfileactive(!profileactive)
  }
  const handleShowSearch = () => {
    setSearchmodal(!searchmodal)
    GetSearchdata()
  }

  useEffect(() => {
    if (searchmodal || profileactive) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [searchmodal, profileactive])

  const handleLogin = () => {
    setLoginModal(!loginmodal)
  }

  function fetchSuggestions(query) {
    if (query) {
      const filteredSuggestions = items?.searched_item?.filter((suggestion) => {
        return suggestion.url_slug == query
      })
      setSuggestionsSearch(filteredSuggestions)
    } else {
      setSuggestionsSearch(items?.searched_item)
    }
  }

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setSearchmodal(false)
        setSearch(null)
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  useEffect(() => {
    if (router.query.term) {
      fetchSuggestions(router.query.term)
    }
  }, [])

  useEffect(() => {
    getUsers(items)
  }, [])

  const getUsers = (userList) => {
    setItems(userList)
  }

  const byCategory = (user, category) => {
    if (category) {
      return user.category === category
    } else return user
  }
  const bySearch = (user, search) => {
    if (search) {
      return user?.title?.toLowerCase()?.includes(search?.toLowerCase())
    } else return user
  }

  const filteredList = (items, category, search) => {
    return items?.searched_item?.filter((user) => byCategory(user, category))?.filter((user) => bySearch(user, search))
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    handleScroll()
    if (menuStepper < 1) {
      window.addEventListener('scroll', handleScroll)
    }
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [menuStepper])


  const { query } = useRouter()

  useEffect(() => {
    if (token) {
      const decordtoken = jwt(token)

      const timecurrrunt = Date.now()
      const timestampexp = decordtoken?.exp

      const CurruntTime = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(timecurrrunt)

      function formatUnixTimestamp(timestampexp) {
        const dateObj = new Date(timestampexp * 1000)
        const month = dateObj.getMonth() + 1
        const day = dateObj.getDate()
        const year = dateObj.getFullYear()
        const hours = dateObj.getHours()
        const minutes = dateObj.getMinutes()
        const seconds = dateObj.getSeconds()
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const formattedDate = `${month}/${day}/${year}, ${formatTimeexp(hours)}:${formatTimeexp(
          minutes
        )}:${formatTimeexp(seconds)} ${ampm}`
        return formattedDate
      }

      function formatTimeexp(time) {
        return time < 10 ? '0' + time : time
      }

      const formattedDateExp = formatUnixTimestamp(timestampexp)

      if (CurruntTime === formattedDateExp) {
        router.push('/login')
        toast.success(ApiMessage?.logoutmessage)
        handleRemoveLocalstorage()
      }
    }
  }, [])

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref?.current && !ref.current.contains(event.target)) {
          setProfileactive(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)
  const lang_id = 1
  const url_slug = ''

  const req = {
    search_string: url_slug,
    lang_id: lang_id
  }

  const GetSearchdata = (e) => {
    axios
      .post(BASE_URL + COMMON?.commonSearch, req)
      .then((response) => {
        setItems(response?.data)
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.reason)
        } else if (error?.response?.status == 403) {
        }
      })
  }
  const handleMenuOpen = () => {
    setMenuStepper(1)
  }

  useEffect(() => {
    if (menuStepper >= 1) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'scroll'
    }
  }, [menuStepper])

  return (
    <>
      <Toaster />
      {searchmodal || scrollY > 0 ? (
        <>
          <div
            ref={wrapperRef}
            className={`text-gray-600 body-font bg-white fixed top-0 z-[50] ${
              showFull ? 'w-full' : 'w-fit'
            } duration-300 shadow-lg scroll-header-hover`}>
            {menuStepper >= 1 ? (
              <>
                <MenuComp menuStepper={menuStepper} setMenuStepper={setMenuStepper} scrollY={scrollY} />
              </>
            ) : (
              <div className='container max-[991px]:max-w-full h-[52px] py-[12px] mx-auto  max-[1024px]:px-8  flex justify-between max-[767px]:!py-4 items-center max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 header '>
                <div className='w-[16%] py-3 max-[1440px]:w-[18%] max-[1200px]:w-[20%] max-[820px]:w-[18%] max-[771px]:w-[22%] max-[576px]:w-[44%]'>
                  <Link
                    href='/'
                    className='flex md:block hidden title-font font-medium  text-gray-900 md:mb-0  mt-0  w-full items-center focus:outline-none destop-logo-head'
                    prefetch={false}>
                    <Image src={logoSticky} alt='img_text' className='w-full' priority={true}/>
                  </Link>
                  <div className='flex flex-row items-center gap-[10px]'>
                    <div
                      onClick={handleMenuOpen}
                      className='flex max-md:block hidden title-font font-medium items-center text-gray-900 md:mb-0  mt-0  w-full   max-[576px]:w-[18%] focus:outline-none mobile-logo-head'
                      prefetch={false}>
                      <Image src={menuImage} alt='img_text' className='w-3/6 max-[834px]:w-2/5 max-[576px]:w-full' priority={true}/>
                    </div>
                    <Link
                      href=''
                      className='flex max-md:flex gap-2 hidden title-font font-medium items-center text-gray-900 md:mb-0  mt-0  w-full  focus:outline-none mobile-logo-head'
                      prefetch={false}>
                      <Image
                        src={mobileLogoSticky}
                        alt='img_text'
                        priority={true}
                        className='w-3/6 max-[834px]:w-2/5 max-[576px]:w-[18%] max-[479px]:w-[18%]'
                      />
                    <p className="text-black text-[faktum] font-semibold text-center text-[20px] max-[479px]:text-[16px]">BankSathi</p>
                    </Link>
                  </div>
                </div>
                <div>
                  <nav className='md:ml-auto md:flex items-center text-base justify-center hidden gap-5 max-[820px]:gap-4 menu-mobile'>
                    <ul className='nav__menu flex xl:gap-5 mb-0 md:gap-2'>
                      <li className='nav__menu-item'>
                        <Link
                          href='#'
                          onMouseOver={() => sethoverClose(false)}
                          className='head-text font-[faktum] max-[1600px]:text-[16px] text-[16px] !text-[#212529] hover:!text-[#212529] no-underline font-semibold text-lg max-[820px]:text-[15px] max-[834px]:text-[15px] head-menu'
                          prefetch={false}>
                          All Products
                        </Link>
                        <CreditSubmenu
                          sethoverClose={sethoverClose}
                          hoverclose={hoverclose}
                        />
                      </li>
                      <li className='nav__menu-item'>
                        <Link
                          href='#'
                          className='head-text font-[faktum] max-[1600px]:text-[16px] text-[16px]  !text-[#212529] hover:!text-[#212529] no-underline font-semibold text-lg max-[820px]:text-[15px] max-[834px]:text-[15px] head-menu'
                          prefetch={false}>
                          Resources
                        </Link>
                        <ResourceSubmenu
                          businessCategorydata={businessCategorydata}
                          sethoverClose={sethoverClose}
                          hoverclose={hoverclose}
                        />
                      </li>
                      <li className='nav__menu-item'>
                        <Link
                          href='#'
                          className='head-text font-[faktum] max-[1600px]:text-[16px] text-[16px]  !text-[#212529] hover:!text-[#212529] no-underline font-semibold text-lg max-[820px]:text-[15px] max-[834px]:text-[15px] head-menu'
                          prefetch={false}>
                          Tools
                          <ToolsSubmenu
                            sethoverClose={sethoverClose}
                            hoverclose={hoverclose}
                          />
                        </Link>
                      </li>
                      <div
                        className='flex flex-col items-center justify-center'
                        onMouseLeave={() => setShowPartnersSubmenu(false)}>
                        <li className=' max-[771px]:py-6 about-head'>
                          <Link
                            href='#'
                            onMouseOver={() => setShowPartnersSubmenu(true)}
                            className='head-text font-[faktum] max-[1600px]:text-[16px] text-[16px] !text-[#212529]
                            hover:!text-[#212529] no-underline font-semibold text-lg max-[820px]:text-[15px]
                            max-[834px]:text-[15px] head-menu'
                            prefetch={false}>
                            Partner with us
                          </Link>
                        </li>
                        {showPartnersSubMenu && (
                          <div className='absolute z-[999] top-[52px] w-[200px] h-[100px] shadow-md bg-white flex flex-col gap-[12px] items-center justify-center rounded-b-xl'>
                            {partnersSubMenu &&
                              partnersSubMenu?.map((item) => {
                                return (
                                  <div key={item?.id}>
                                    <Link
                                      href={item?.link}
                                      prefetch={false}
                                      className='text-center font-medium !text-[#212529] cursor-pointer hover:!border-[#a882dd] hover:bg-white w-full hover:!text-[#a882dd] duration-200 text-[15px] max-[771px]:text-[13px] submenu-reslove'>
                                      {item?.name}
                                    </Link>
                                  </div>
                                )
                              })}
                          </div>
                        )}
                      </div>
                    </ul>
                  </nav>
                </div>
                <div className='flex items-center relative'>
                  {!searchmodal && (
                    <div className='relative ' onClick={(e) => handleShowSearch(e)}>
                      <div className='inset-y-0 h-[36px] w-[36px] justify-center  max-[771px]:py-2 max-[834px]:h-[36px] max-[834px]:w-[36px] flex items-center mr-3 cursor-pointer  max-[479px]:p-[8px]  border border-black rounded-lg  max-[767px]:h-full max-[767px]:w-auto head-search-bar'>
                        <Image
                          src={SearchIcon}
                          alt='search'
                          priority={true}
                          className='w-[16px] h-[16px] max-[479px]:w-4 max-[479px]:h-4'
                        />
                      </div>
                    </div>
                  )}
                  {token ? (
                    <>
                      <Image
                        src={UserScroll}
                        onClick={() => profileshow()}
                        className='max-[768px]:p-[0px] max-[476px]:p-0 cursor-pointer max-[479px]:w-[36px] max-[479px]:h-[36px]'
                        width={40}
                        height={40}
                        priority={true}
                        alt='user'
                      />
                      {profileactive ? <LoginModalProfile /> : ''}
                      <div className='' onClick={() => profileshow()}>
                        {profileactive ? (
                          <Image
                            src={accordionArrowall}
                            alt='up'
                            width={20}
                            height={20}
                            priority={true}
                            className='rotate-180 cursor-pointer w-6 h-6 shrink-0 ml-1 relative'
                          />
                        ) : (
                          <Image
                            src={accordionArrowall}
                            alt='up'
                            width={20}
                            height={20}
                            priority={true}
                            className=' w-6 cursor-pointer h-6 shrink-0 ml-1 relative '
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <Link href='/login' className='!text-white' prefetch={false}>
                      <button
                        onClick={(e) => handleLogin(e)}
                        className={
                          searchmodal
                            ? `head-text font-[faktum] cursor-pointer hidden md:block h-[36px] inline-flex max-[820px]:text-[14px] !text-[#212529] font-semibold max-[771px]:text-[12px] items-center bg-[#49D49D]  border-0  px-3 focus:outline-none  rounded-lg text-base max-[991px]:text-sm md:mt-0  head-login-btn`
                            : `head-text font-[faktum] cursor-pointer hidden md:block h-[36px] inline-flex max-[820px]:text-[14px] text-[#212529] font-semibold max-[771px]:text-[12px] items-center  bg-[#49D49D] border-0  px-3 focus:outline-none  rounded-lg text-base max-[991px]:text-sm md:mt-0  head-login-btn`
                        }>
                        Login or Sign up
                      </button>
                    </Link>
                  )}

                  {!token && (
                    <Link href='/login' className='text-[#212529]' prefetch={false}>
                      <button className=' block cursor-pointer md:hidden bg-[#49D49D] h-[36px] w-[36px]   max-[834px]:w-[36px] max-[834px]:h-[36px] rounded-full max-[479px]:p-0 login-icon  max-[479px]:w-[36px] max-[479px]:h-[36px] '>
                        <Image src={UserScroll} className='' alt='user' priority={true}/>
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {searchmodal ? (
              ''
            ) : slug1 || slug2 || slug3 ? (
              <div className='max-[991px]:max-w-full fixed  w-full top-0 bg-white mx-auto border-t border-[#D8D9DA]  py-5 max-[1024px]:py-5 max-[1024px]:px-8  flex justify-between items-center max-[479px]:p-4 max-[375px]:px-4 max-[320px]:px-4 header max-[834px]:grid-cols-2'>
                <div className='container mx-auto grid grid-cols-4 items-center gap-[20px] max-[1200px]:gap-8 max-[1440px]:px-20 max-[1200px]:px-0 px-[7.5rem] max-[991px]:max-w-full max-[991px]:grid-cols-2 '>
                  {size?.width > 771 && <div></div>}
                  {slug1 && (
                    <div className='text-[#212529]'>
                      <div
                        className={
                          size.width <= 576
                            ? ''
                            : 'pb-0 max-[576px]:pt-10 flex gap-2 max-[834px]:pb-0 max-[834px]:gap-4'
                        }>
                        <div className='w-[35%] h-full max-[576px]:w-[170px] max-[576px]:mx-auto max-xs:w-[80%] max-xs:mx-auto max-[320px]:mx-auto'>
                          <div className=''>
                            <Image
                              src={`${Img_URL}/${slug1?.product_details?.product_image}`}
                              alt={`img`}
                              width={120}
                              height={160}
                              priority={true}
                              className='md:w-[85%] h-full sm:w-full max-[375px]:w-full mb-4'
                              unoptimized={true}
                            />
                          </div>
                          {size?.width < 768 && (
                            <div className='w-full'>
                              <button
                                onClick={() => router.push(`/${slug1?.product_details?.apply_url}`)}
                                className=' py-3 cursor-pointer w-full md:w-full rounded-lg text-[#212529] bg-[#49D49D] font-semibold text-[13px]'>
                                {CompareCardBoxData.apllynow}
                              </button>
                            </div>
                          )}
                        </div>
                        <div className={size.width <= 576 ? 'text-left max-[320px]:text-center hidden' : ''}>
                          <p className=' text-[12px] max-[1024px]:text-[12px] font-bold max-[576px]:text-[15px] text-left max-[320px]:text-center  '>
                            {slug1?.product_details?.card_name}
                          </p>
                            {slug1?.product_details?.rating === 0 ? (
                              'NA'
                            ) : (
                              <div className='m-auto flex lg:gap-2 md:gap-1 items-center max-xs:flex-col'>
                                <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[15px] font-bold whitespace-nowrap  max-xs:mt-2'>
                                  {slug1?.product_details?.rating}/5
                                </p>
                                <div className='flex lg:gap-2 md:gap-1  '>
                                  <StarRatings
                                    rating={slug1?.product_details?.rating}
                                    starRatedColor='#49d49d'
                                    numberOfStars={starCount}
                                    name='rating'
                                    starDimension='16px'
                                    starSpacing='0'
                                  />
                                </div>
                              </div>
                            )}
                          {showCreditScore && (
                            <p className='mt-2 text-[12px]  max-[991px]:text-[12px] '>
                              {CompareCardBoxData.creditscore} : {slug1?.product_details?.min_credit_score}-
                              {slug1?.product_details?.max_credit_score}{' '}
                            </p>
                          )}
                          {size?.width >= 768 && (
                            <div className='w-auto py-4 lg:w-[130px]'>
                              <button
                                onClick={() => router.push(`/${slug1?.product_details?.apply_url}`)}
                                className=' py-3 cursor-pointer w-full md:w-full rounded-lg text-[#212529] bg-[#49D49D] font-semibold text-[12px]'>
                                {CompareCardBoxData.apllynow}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {slug2 && (
                    <div className='text-[#212529]'>
                      <div
                        className={
                          size.width <= 576
                            ? ''
                            : 'pb-0 max-[576px]:pt-10 flex gap-2 max-[834px]:pb-0 max-[834px]:gap-4'
                        }>
                        <div className='w-[35%] h-full max-[576px]:w-[170px] max-[576px]:mx-auto max-xs:w-[80%] max-xs:mx-auto max-[320px]:mx-auto'>
                          <div className=''>
                            <Image
                              src={`${Img_URL}/${slug2?.product_details?.product_image}`}
                              alt={`img`}
                              width={120}
                              height={160}
                              priority={true}
                              className='md:w-[85%] h-full sm:w-full max-[375px]:w-full mb-4 m-auto'
                              unoptimized={true}
                            />
                          </div>
                          {size?.width < 768 && (
                            <div className='w-full'>
                              <button
                                onClick={() => router.push(`/${slug2?.product_details?.apply_url}`)}
                                className=' py-3 cursor-pointer w-full md:w-full rounded-lg text-[#212529] bg-[#49D49D] font-semibold text-[13px]'>
                                {CompareCardBoxData.apllynow}
                              </button>
                            </div>
                          )}
                        </div>
                        <div className={size.width <= 576 ? 'text-left max-[320px]:text-center hidden' : ''}>
                          <p className=' text-[12px] max-[1024px]:text-[12px] font-bold max-[576px]:text-[15px] text-left max-[320px]:text-center  '>
                            {slug2?.product_details?.card_name}
                          </p>
                            {slug2?.product_details?.rating === 0 ? (
                              'NA'
                            ) : (
                              <div className='m-auto flex lg:gap-2 md:gap-1 items-center max-xs:flex-col'>
                                <p className='text-[#212529] lg:text-[12px] md:text-[12px] sm:text-[12px] text-[15px] font-bold whitespace-nowrap  max-xs:mt-2'>
                                  {slug2?.product_details?.rating}/5
                                </p>
                                <div className='flex lg:gap-2 md:gap-1  '>
                                  <StarRatings
                                    rating={slug2?.product_details?.rating}
                                    starRatedColor='#49d49d'
                                    numberOfStars={starCount}
                                    name='rating'
                                    starDimension='16px'
                                    starSpacing='0'
                                  />
                                </div>
                              </div>
                            )}
                          {showCreditScore && (
                            <p className='mt-2 text-[12px]  max-[991px]:text-[12px] '>
                              {CompareCardBoxData.creditscore} : {slug2?.product_details?.min_credit_score}-
                              {slug2?.product_details?.max_credit_score}{' '}
                            </p>
                          )}
                          {size?.width >= 768 && (
                            <div className='w-auto py-4 lg:w-[130px]'>
                              <button
                                onClick={() => router.push(`/${slug2?.product_details?.apply_url}`)}
                                className=' py-3 cursor-pointer w-full md:w-full rounded-lg text-[#212529] bg-[#49D49D] font-semibold text-[12px]'>
                                {CompareCardBoxData.apllynow}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {slug3 && isDesktop && (
                    <div className='text-[#212529] '>
                      <div
                        className={
                          size.width <= 576
                            ? ''
                            : 'pb-0 max-[576px]:pt-10 flex gap-3   max-[834px]:pb-0 max-[834px]:gap-4'
                        }>
                        <div className='w-[35%] h-full max-[576px]:w-[170px] max-[576px]:mx-auto max-xs:w-[80%] max-xs:mx-auto max-[320px]:mx-auto'>
                          <div className=''>
                            <Image
                              src={`${Img_URL}/${slug3?.product_details?.product_image}`}
                              alt={`img`}
                              width={120}
                              height={160}
                              priority={true}
                              className='md:w-full h-full sm:w-full max-[375px]:w-full mb-4 m-auto'
                              unoptimized={true}
                            />
                          </div>
                          {size?.width < 768 && (
                            <div className='text-center'>
                              <button
                                onClick={() => router.push(`/${slug3?.product_details?.apply_url}`)}
                                className=' py-3 cursor-pointer w-full md:w-full rounded-lg text-[#212529] bg-[#49D49D] font-semibold text-[13px]'>
                                {CompareCardBoxData.apllynow}
                              </button>
                            </div>
                          )}
                        </div>
                        <div className={size.width <= 576 ? 'text-left max-[320px]:text-center hidden' : ''}>
                          <p className='text-[12px] max-[1024px]:text-[12px] font-bold max-[576px]:text-[15px] text-left max-[320px]:text-center  '>
                            {slug3?.product_details?.card_name}
                          </p>
                            {slug3?.product_details?.rating === 0 ? (
                              'NA'
                            ) : (
                              <div className='m-auto flex lg:gap-2 md:gap-1 items-center max-xs:flex-col'>
                                <p className='text-[#212529] lg:text-[12px] md:text-[12px] sm:text-[12px] text-[12px] font-bold whitespace-nowrap  max-xs:mt-2'>
                                  {slug3?.product_details?.rating}/5
                                </p>
                                <div className='flex lg:gap-2 md:gap-1  '>
                                  <StarRatings
                                    rating={slug3?.product_details?.rating}
                                    starRatedColor='#49d49d'
                                    numberOfStars={starCount}
                                    name='rating'
                                    starDimension='16px'
                                    starSpacing='0'
                                  />
                                </div>
                              </div>
                            )}
                          {showCreditScore && (
                            <p className='mt-2 text-[12px]  max-[991px]:text-[12px]'>
                              {CompareCardBoxData.creditscore} : {slug3?.product_details?.min_credit_score}-
                              {slug3?.product_details?.max_credit_score}{' '}
                            </p>
                          )}
                          {size?.width >= 768 && (
                            <div className='w-auto py-4 lg:w-[130px]'>
                              <button
                                onClick={() => router.push(`/${slug1?.product_details?.apply_url}`)}
                                className=' py-3 cursor-pointer w-full md:w-full rounded-lg text-[#212529] bg-[#49D49D] font-semibold text-[12px]'>
                                {CompareCardBoxData.apllynow}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        <>
          {menuStepper >= 1 ? (
            <div>
              <MenuComp menuStepper={menuStepper} setMenuStepper={setMenuStepper} scrollY={scrollY} />
            </div>
          ) : (
            <div ref={wrapperRef} className='text-gray-600 body-font  z-[100] hover-header-hidden'>
              <div className='container h-[52px] py-[12px] max-[991px]:max-w-full mx-auto  max-[1024px]:px-8  max-[767px]:!py-4  flex justify-between items-center  max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 header relative'>
                <div className='w-[16%] items-center py-3 max-[1440px]:w-[18%] max-[1200px]:w-[20%] max-[820px]:w-[18%] max-[771px]:w-[22%] max-[576px]:w-[44%]'>
                  <Link
                    href='/'
                    className='flex md:block hidden title-font font-medium !text-[#FFFFFF] md:mb-0  mt-0  items-center focus:outline-none destop-logo-head '
                    prefetch={false}>
                    <Image src={LogoWhite} alt='BankSathi' className='w-[100%] ' priority={true}/>
                  </Link>
                  <div className='flex flex-row items-center gap-[10px]'>
                    <div
                      className='flex max-md:block hidden title-font font-medium items-center text-gray-900 md:mb-0  mt-0  w-full   max-[576px]:w-[15%] focus:outline-none mobile-logo-head'
                      onClick={handleMenuOpen}>
                      <Image src={menuImage} alt='BankSathiMenu' className='max-[576px]:w-full' priority={true}/>
                    </div>
                    <Link
                      href='/'
                      className='flex basis-1/2 hidden max-md:flex gap-2 title-font font-medium items-center !text-[#FFFFFF] md:mb-0  mt-0 focus:outline-none mobile-logo-head'
                      prefetch={false}>
                      <Image src={logoMobile} alt='BankSathi' className='w-3/6 max-[834px]:w-2/5 max-[576px]:w-[26%]' priority={true}/>
                      <p className="text-white text-[faktum] font-semibold text-center text-xl max-[479px]:text-base">BankSathi</p>
                    </Link>
                  </div>
                </div>
                <div>
                  <nav className='md:ml-auto md:flex items-center text-base justify-center hidden gap-5 max-[820px]:gap-4 menu-mobile'>
                    <ul className='nav__menu flex xl:gap-5 mb-0 md:gap-2'>
                      <li className='nav__menu-item py-5'>
                        <Link
                          href='#'
                          onMouseOver={() => sethoverClose(false)}
                          className=' head-text font-[faktum] text-[16px] max-[1600px]:text-[18px] !text-[#FFFFFF] hover:!text-[#FFFFFF]  font-semibold text-lg max-[820px]:text-[14px] max-[771px]:text-[15px] head-menu'
                          prefetch={false}>
                          All Products
                        </Link>
                        <CreditSubmenu
                          sethoverClose={sethoverClose}
                          hoverclose={hoverclose}
                        />
                      </li>
                      <li className='nav__menu-item py-5'>
                        <Link
                          href='#'
                          className=' head-text font-[faktum] max-[1600px]:text-[18px] text-[16px] !text-[#FFFFFF] hover:!text-[#FFFFFF] font-semibold text-lg max-[820px]:text-[14px] max-[771px]:text-[15px] head-menu'
                          prefetch={false}>
                          Resources
                        </Link>
                        <ResourceSubmenu
                          businessCategorydata={businessCategorydata}
                          sethoverClose={sethoverClose}
                          hoverclose={hoverclose}
                        />
                      </li>
                      <li className='nav__menu-item py-5'>
                        <Link
                          href='#'
                          className=' head-text font-[faktum] max-[1600px]:text-[18px] text-[16px] !text-[#FFFFFF] hover:!text-[#FFFFFF]  font-semibold text-lg max-[820px]:text-[14px] max-[771px]:text-[15px] head-menu'
                          prefetch={false}>
                          Tools
                        </Link>
                        <ToolsSubmenu
                          sethoverClose={sethoverClose}
                          hoverclose={hoverclose}
                        />
                      </li>
                      <div
                        className='flex flex-col items-center justify-center'
                        onMouseLeave={() => setShowPartnersSubmenu(false)}>
                        <li className=' max-[771px]:py-6 about-head'>
                          <Link
                            href='#'
                            onMouseOver={() => setShowPartnersSubmenu(true)}
                            className='head-text font-[faktum] max-[1600px]:text-[18px] text-[16px] !text-[#FFFFFF] hover:!text-[#FFFFFF]  font-semibold text-lg max-[820px]:text-[14px] max-[771px]:text-[15px] head-menu'
                            prefetch={false}>
                            Partner with us
                          </Link>
                        </li>
                        {showPartnersSubMenu && (
                          <div className='absolute z-[999] top-[52px] shadow-md w-[200px] h-[100px] bg-white flex flex-col gap-[12px] items-center justify-center rounded-b-lg'>
                            {partnersSubMenu &&
                              partnersSubMenu?.map((item) => {
                                return (
                                  <div key={item?.id}>
                                    <Link
                                      href={item?.link}
                                      prefetch={false}
                                      className='text-center font-medium !text-[#212529] cursor-pointer hover:!border-[#a882dd] hover:bg-white w-full hover:!text-[#a882dd] duration-200 text-[15px] max-[771px]:text-[13px] submenu-reslove'>
                                      {item?.name}
                                    </Link>
                                  </div>
                                )
                              })}
                          </div>
                        )}
                      </div>
                    </ul>
                  </nav>
                </div>
                <div className='flex items-center relative'>
                  {!searchmodal && (
                    <div className='relative' onClick={(e) => handleShowSearch(e)}>
                      <div className='inset-y-0 h-[36px] w-[36px] max-[771px]:py-2 justify-center  flex items-center mr-3 cursor-pointer  max-[479px]:p-[8px] border border-white rounded-lg  max-[767px]:h-full max-[767px]:w-auto  head-search-bar'>
                        <Image src={SearchIconWhite} alt='search' priority={true} className='w-4 h-4 max-[479px]:w-4 max-[479px]:h-4' />
                      </div>
                    </div>
                  )}
                  {token ? (
                    <>
                      <Image
                        src={User}
                        onClick={() => profileshow()}
                        priority={true}
                        className='mx-auto bg-white cursor-pointer flex items-center justify-center p-2 rounded-full max-[576px]:p-[8px] w-[40px] h-[40px] max-[576px]:w-auto max-[576px]:h-auto  head-user-icon'
                        alt='user'
                      />
                      {profileactive ? <LoginModalProfile /> : ''}

                      <div className='' onClick={() => profileshow()}>
                        {profileactive ? (
                          <Image
                            src={accordionArrowall}
                            alt='up'
                            width={20}
                            height={20}
                            priority={true}
                            className='rotate-180 cursor-pointer w-5 h-5 shrink-0 ml-1 relative'
                          />
                        ) : (
                          <Image
                            src={accordionArrowall}
                            alt='up'
                            width={20}
                            height={20}
                            priority={true}
                            className=' w-5 cursor-pointer h-5 shrink-0 ml-1 relative '
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <Link href='/login' className='!text-[#212529]' prefetch={false}>
                      <button className='!text-[#212529] h-[36px] cursor-pointer head-text font-[faktum] hidden md:block  inline-flex max-[820px]:text-[14px] max-[771px]:text-[12px]  bg-gray-100 border-0  items-center px-[10px] focus:outline-none hover:bg-gray-200 rounded-lg text-base max-[991px]:text-sm md:mt-0 head-login-btn'>
                        Login or Sign up
                      </button>
                    </Link>
                  )}

                  {token ? (
                    ''
                  ) : (
                    <>
                      <Link href='/login' className='!text-[#212529]' prefetch={false}>
                        <button className=' bg-white cursor-pointer  h-[36px] w-[36px] md:hidden flex justify-center rounded-full max-[479px]:p-[8px] login-icon'>
                          <Image src={User} priority={true} className='justify-center relative flex md:left-[22%]' alt='user' />
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {searchmodal ? (
        <div
          className='fixed z-50 overflow-y-auto top-[3.2rem] max-[820px]:top-[3.2rem] max-[479px]:top-[2.9rem] w-full left-0 search-popup-resolution  '
          id='modal'>
          <div className='flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 transition-opacity '>
              <div className='fixed inset-0 bg-gray-900 top-[3.2rem] max-[820px]:top-[3.2rem] max-[479px]:top-[2.9rem] opacity-75' />
            </div>
            <p className='sm:inline-block sm:align-middle sm:h-screen  h-[100vh] max-[479px]:h-[82vh] search-mobile'></p>
            <div
              className={`${
                scrollY > 0
                  ? 'inline-block align-center  bg-[#fff] text-left border-t border-[#E6ECF1] w-full absolute top-0 max-[576px]:top-0 left-0 overflow-hidden shadow-xl transform transition-all  sm:align-middle'
                  : 'inline-block align-center bg-[#fff] text-left border-t border-[#E6ECF1] w-full absolute top-0 max-[576px]:top-0 left-0 overflow-hidden shadow-xl transform transition-all  sm:align-middle'
              } `}
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-headline'>
              <div
                className={`${
                  scrollY > 0
                    ? ' container mx-auto 2xl:px-40 xl:px-30 xl:pb-12 xl:pt-5 xl:px-40 lg:px-20 md:px-16  p-4 py-8  relative'
                    : ' container  mx-auto 2xl:px-40 xl:px-30 xl:pb-12 xl:pt-5 xl:px-40 lg:px-20 md:px-16  p-4 py-8  relative'
                } `}>
                <div className='flex gap-5 items-center'>
                  <div className='relative flex items-center max-[320px]:flex-col w-full'>
                    <label
                      htmlFor='default-search'
                      className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
                      Search
                    </label>

                    <div className='relative max-[320px]:text-[12px]  w-full p-4 text-sm text-gray-900 border border-black bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none flex items-center gap-3 rounded-lg'>
                      <input
                        type=''
                        className='w-full mr-[2.8rem] bg-transparent focus:outline-none'
                        placeholder='What can we help you find?'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className='absolute right-0 p-5 inset-y-0  flex items-center  cursor-pointer max-[320px]:h-full max-[320px]:p-4 bg-[#49D49D] rounded-br-lg rounded-tr-lg'>
                      <Image src={SearchIcon} priority={true} alt='SearchIcon' className='w-5 h-5' />
                    </div>
                  </div>

                  {scrollY > 0 ? (
                    <button
                      type='button'
                      className={`text-[#212529] cursor-pointer rounded mr-2  z-10 right-0 top-0 xl:right-16 lg:left-[13%] relative ${
                        size?.width === 1024 && '!left-[1%]'
                      } `}
                      onClick={(e) => {
                        setSearch(null)
                        setSearchmodal(false)
                      }}>
                      <Image
                        src={closeicon}
                        className='w-[9px] max-xs:w-[13px] h-auto'
                        width={9}
                        height={9}
                        priority={true}
                        alt='img_text'
                      />
                    </button>
                  ) : (
                    <>
                      <button
                        type='button'
                        className={`text-[#212529] cursor-pointer rounded mr-2  z-10 right-0 top-0 xl:right-16 lg:left-[13%] relative ${
                          size?.width === 1024 && '!left-[1%]'
                        }`}
                        onClick={(e) => {
                          setSearch(null)
                          setSearchmodal(false)
                        }}>
                        <Image
                          src={closeicon}
                          className='w-[9px] max-xs:w-[13px] h-auto'
                          width={9}
                          height={9}
                          priority={true}
                          alt='img_text'
                        />
                      </button>
                    </>
                  )}  
                </div>
                <div className='pb-[30px] pt-5 max-[576px]:hidden'>
                  <p
                    className={`${
                      scrollY > 0
                        ? 'text-[16px] font-semibold text-[#212529] max-[360px]:text-[15px] uppercase'
                        : 'text-[16px] font-semibold text-[#212529] max-[360px]:text-[15px] uppercase'
                    }`}>
                    Popular Searches
                  </p>
                  <div className='flex items-center flex-wrap mt-[10px]  gap-[15px]'>
                    {SEARCH_TABS?.map((searchpopular, index) => {
                      return (
                        <>
                          <div
                            onClick={() => {
                              setSearch(searchpopular?.popularTitle)
                            }}
                            className='bg-[#E6ECF1] px-4 py-[7.5px] rounded-lg w-auto text-center cursor-pointer'>
                            <p className='textr-[15px] font-normal text-[#212529]'>{searchpopular?.popularTitle}</p>
                          </div>
                        </>
                      )
                    })}
                  </div>
                </div>
                {search?.length ? (
                  <>
                    <div className='pb-4 max-[479px]:py-4'>
                      <p
                        className={`${
                          scrollY > 0
                            ? 'text-[16px] font-semibold text-[#212529] max-[360px]:text-[15px] uppercase'
                            : 'text-[16px] font-semibold text-[#212529] max-[360px]:text-[15px] uppercase'
                        }`}>
                        Search Results
                      </p>
                      {filteredList(items, category, search)?.map((user, index) => (
                        <li
                          key={index}
                          className={`${
                            scrollY > 0
                              ? 'text-[18px] text-[#212529] cursor-default select-none relative py-2  pr-9 list-none'
                              : 'text-[18px] text-[#212529] cursor-default select-none relative py-2  pr-9 list-none'
                          }`}
                          id='headlessui-listbox-option-7'
                          role='option'
                          tabindex='-1'
                          aria-selected='true'>
                          <div className='flex items-center'>
                            <div className='w-full'>
                              <Link
                                className='text-[#212529] hover:!text-[#212529]'
                                href={`/${user?.url_slug}`}
                                prefetch={false}
                                onClick={() => {
                                  setSearchmodal(false)
                                  setSearch(null)
                                }}>
                                <span className='font-semibold flex items-center block search-result'>
                                  {' '}
                                  {user?.title}
                                </span>
                              </Link>
                            </div>
                          </div>
                        </li>
                      ))}
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
