import { useEffect, useState } from 'react'

import { MobileFooterData } from '@/utils/alljsonfile/mobilefooterdata'
import MobileFooterBox from '../MobileFooterBox'
import { useWindowSize } from '@/hooks/useWindowSize'
import MobileHeader from '../MobileHeader'
import aboutIcon from '../../../../public/assets/about-icon.svg'
import closeicon from '../../../../public/assets/closeIcon.svg'

import CreditSubmenu from '../SubMenu'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function MobileFooter({ businessCategorydata }) {
  const [footerTab, setFooterTab] = useState(0)
  const size = useWindowSize()
  const [footerMobileShow, setMobileShow] = useState('')
  const [count, setcount] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const { pathname } = useRouter()
  const handleHeader = (name) => {
    setcount(count + 1)
    setMobileShow(name)
  }

  const handlecloseFooter = (name) => {
    setMobileShow('')
  }
  useEffect(() => {
    if (pathname === '/about-us') {
      setFooterTab(3)
    }
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return pathname === '/' ? (
    <div className='mobile-footer md:hidden  max-[576px]:grid fixed bottom-0 w-full h-auto grid grid-cols-4 py-[10px]  px-[10px] bg-white m-auto z-[1] '>
      {MobileFooterData.map((item, index) => {
        return (
          <div key={index}>
            <div className='mobilefooter-con ' onClick={() => setFooterTab(index)}>
              <MobileFooterBox
                name={item.name}
                Card={item.image}
                headermobile={index}
                handleHeader={handleHeader}
                footerMobileShow={footerMobileShow}
                count={count}
                footerTab={footerTab}
                setcount={setcount}
                setFooterTab={setFooterTab}
                index={index}
                handlecloseFooter={handlecloseFooter}
              />
            </div>
          </div>
        )
      })}

      {size.width >= 767 ? (
        <>
          {footerMobileShow == 'All Products' ? (
            <div className='toppick-header-modal z-[-1] h-full overflow-y-auto top-0 w-full left-0  ' id='modal'>
              <div className='sticky-toppick flex items-center justify-center min-height-100vh pt-4 px-4 text-center sm:block sm:p-0 '>
                <p className='sm:inline-block sm:align-middle sm:h-screen  h-[100vh]'></p>
                <div
                  className={`pick-head-bg  inline-block align-center bg-[#F7F7F7]  max-[767px]:pt-[${
                    scrollY > 0 ? '6rem' : '4rem'
                  }] max-[576px]:pt-[${
                    scrollY > 0 ? '6rem' : '4rem'
                  }]  text-left  w-full absolute top-14 left-0 h-full  shadow-xl transform transition-all  sm:align-middle `}
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby='modal-headline'>
                  <div className=' head-modal-top 2xl:px-40 xl:px-30 xl:px-40 lg:px-20 md:px-16 px-4 bg-[#F7F7F7] relative overflow-y-auto h-full'>
                    <button
                      type='button'
                      onClick={() => handlecloseFooter()}
                      className='text-[#212529] cursor-pointer rounded mr-2 absolute z-10 right-0  top-0 xl:right-16 xl:top-4 lg:right-8 md:right-8 '>
                      {' '}
                      <Image
                        src={closeicon}
                        className='w-[9px] max-xs:w-[13px] h-auto'
                        width={9}
                        height={9}
                        priority={true}
                        alt='img_text'
                      />
                    </button>
                    <CreditSubmenu footerMobileShow={footerMobileShow} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}

          {footerMobileShow == 'Resources' ? (
            <div className='toppick-header-modal z-[-1] h-full overflow-y-auto top-0 w-full left-0  ' id='modal'>
              <div className='sticky-toppick flex items-center justify-center min-height-100vh pt-4 px-4 text-center sm:block sm:p-0 '>
                <p className='sm:inline-block sm:align-middle sm:h-screen  h-[100vh]'></p>
                <div
                  className={`pick-head-bg inline-block align-center bg-[#F7F7F7] max-[767px]:!pt-[${
                    scrollY > 0 ? '6rem' : '4rem'
                  }] max-[576px]:!pt-[${
                    scrollY > 0 ? '6rem' : '4rem'
                  }] text-left  w-full absolute  left-0 h-full  shadow-xl transform transition-all  sm:align-middle `}
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby='modal-headline'>
                  <div className=' head-modal-top 2xl:px-40 xl:px-30 xl:px-40 lg:px-20 md:px-16 px-4 bg-[#F7F7F7] relative overflow-y-auto h-full'>
                    <button
                      type='button'
                      onClick={() => handlecloseFooter()}
                      className='text-[#212529] cursor-pointer rounded mr-2 absolute z-10 right-0 top-0 xl:right-16 xl:top-4 lg:right-8 md:right-8 '>
                      {' '}
                      <Image
                        src={closeicon}
                        className='w-[9px] max-xs:w-[13px] h-auto'
                        width={9}
                        height={9}
                        priority={true}
                        alt='img_text'
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}

          {footerMobileShow == 'Tools' ? (
            <div className='toppick-header-modal z-[-1] h-full overflow-y-auto top-0 w-full left-0  ' id='modal'>
              <div className='sticky-toppick flex items-center justify-center min-height-100vh pt-4 px-4  text-center sm:block sm:p-0 '>
                <p className='sm:inline-block sm:align-middle sm:h-screen  h-[100vh]'></p>
                <div
                  className={`pick-head-bg inline-block align-center max-[576px]:pt-[${
                    scrollY > 0 ? '6rem' : '4rem'
                  }] max-[767px]:pt-[${
                    scrollY > 0 ? '6rem' : '4rem'
                  }] bg-[#F7F7F7] text-left w-full absolute left-0 h-full shadow-xl transform transition-all  sm:align-middle `}
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby='modal-headline'>
                  <div className=' head-modal-top 2xl:px-40 xl:px-30 xl:px-40 lg:px-20 md:px-16 px-4 bg-[#F7F7F7] relative overflow-y-auto h-full'>
                    <button
                      type='button'
                      onClick={() => handlecloseFooter()}
                      className='text-[#212529] cursor-pointer rounded mr-2 absolute z-10 right-0 top-0 xl:right-16 xl:top-4 lg:right-8 md:right-8 '>
                      {' '}
                      <Image
                        src={closeicon}
                        className='w-[9px] max-xs:w-[13px] h-auto'
                        width={9}
                        height={9}
                        priority={true}
                        alt='img_text'
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </>
      ) : (
        <>
          {footerMobileShow ? (
            <MobileHeader
              businessCategorydata={businessCategorydata}
              headermobile={footerMobileShow}
              headerclose={handlecloseFooter}
            />
          ) : (
            ''
          )}
        </>
      )}
      
      <div
        className='mobilefooter-con '
        onClick={() => {
          setFooterTab(3)
        }}>
        <div className='flex items-center justify-center '>
          <Link href='/about-us'>
            <Image src={aboutIcon} alt='image' width='30' height='30' className='w-[24px] h-[24px] mx-auto' />
            <p
              className={`moblie-footer-name pt-2 text-[11px]  text-center  ${
                pathname === '/about-us' && footerTab === 3 ? ' text-[#000] ' : ' !text-[#8D9CA5]'
              } max-lg:text-[11px] max-[375px]:text-[11px] font-normal`}>
              About Us
            </p>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
