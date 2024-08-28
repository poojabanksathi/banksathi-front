import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MobileFooterData } from '@/utils/alljsonfile/mobilefooterdata'
import MobileFooterBox from '../MobileFooterBox'
import MobileHeader from '../MobileHeader'
import CreditSubmenu from '../SubMenu'
import aboutIcon from '../../../../public/assets/about-icon.svg'
import closeicon from '../../../../public/assets/closeIcon.svg'
import { useWindowSize } from '@/hooks/useWindowSize'

const MobileFooter = React.memo(({ businessCategorydata }) => {
  const [footerTab, setFooterTab] = useState(0)
  const [footerMobileShow, setMobileShow] = useState('')
  const [scrollY, setScrollY] = useState(0)
  const { pathname } = useRouter()
  const size = useWindowSize()

  const handleHeader = useCallback((name) => {
    setMobileShow(name)
  }, [])

  const handleCloseFooter = useCallback(() => {
    setMobileShow('')
  }, [])

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

  const renderFooterBox = useCallback((item, index) => (
    <div key={index} onClick={() => setFooterTab(index)} className='mobilefooter-con'>
      <MobileFooterBox
        name={item.name}
        Card={item.image}
        headermobile={index}
        handleHeader={handleHeader}
        footerMobileShow={footerMobileShow}
        footerTab={footerTab}
        setFooterTab={setFooterTab}
        handleCloseFooter={handleCloseFooter}
      />
    </div>
  ), [footerMobileShow, footerTab, handleHeader, handleCloseFooter])

  const modalStyles = `toppick-header-modal z-[-1] h-full overflow-y-auto top-0 w-full left-0 ${scrollY > 0 ? 'pt-24' : 'pt-16'}`
  const modalContent = (content) => (
    <div className={modalStyles} id='modal'>
      <div className='sticky-toppick flex items-center justify-center min-height-100vh pt-4 px-4 text-center sm:block sm:p-0'>
        <div className='pick-head-bg inline-block align-center bg-[#F7F7F7] text-left w-full absolute top-14 left-0 h-full shadow-xl transform transition-all sm:align-middle'>
          <div className='head-modal-top 2xl:px-40 xl:px-30 lg:px-20 md:px-16 px-4 bg-[#F7F7F7] relative overflow-y-auto h-full'>
            <button
              type='button'
              onClick={handleCloseFooter}
              className='text-[#212529] cursor-pointer rounded mr-2 absolute z-10 right-0 top-0 xl:right-16 xl:top-4 lg:right-8 md:right-8'
            >
              <Image
                src={closeicon}
                className='w-9 max-xs:w-13 h-auto'
                width={9}
                height={9}
                priority
                alt='Close icon'
              />
            </button>
            {content}
          </div>
        </div>
      </div>
    </div>
  )

  return pathname === '/' ? (
    <div className='mobile-footer md:hidden grid grid-cols-4 py-2 px-2 bg-white m-auto z-[1] fixed bottom-0 w-full'>
      {MobileFooterData.map(renderFooterBox)}
      {size.width >= 767 && (
        <>
          {footerMobileShow === 'All Products' && modalContent(<CreditSubmenu footerMobileShow={footerMobileShow} />)}
          {footerMobileShow === 'Resources' && modalContent(null)}
          {footerMobileShow === 'Tools' && modalContent(null)}
        </>
      )}
      {!size.width >= 767 && footerMobileShow && (
        <MobileHeader
          businessCategorydata={businessCategorydata}
          headermobile={footerMobileShow}
          headerclose={handleCloseFooter}
        />
      )}
      <div className='mobilefooter-con' onClick={() => setFooterTab(3)}>
        <div className='flex items-center justify-center'>
          <Link href='/about-us'>
            <Image src={aboutIcon} alt='About Us icon' width={30} height={30} className='w-6 h-6 mx-auto' />
            <p className={`moblie-footer-name pt-2 text-xs text-center ${pathname === '/about-us' && footerTab === 3 ? 'text-black' : 'text-[#8D9CA5]'} font-normal`}>
              About Us
            </p>
          </Link>
        </div>
      </div>
    </div>
  ) : null
})

export default MobileFooter
