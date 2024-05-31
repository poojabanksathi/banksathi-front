import React, { useState, useEffect } from 'react'
import logo from '../../../../../public/assets/logo.svg'
import rightArrow from '../../../../../public/assets/rightArrow.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Content({ isDesktop }) {
  const [scrollY, setScrollY] = useState(0)
  const [showFrozen, setShowFrozen] = useState(false)

  const handleCloseClick = () => {
    const value = sessionStorage.setItem('creditScoreFroze', false)
    setShowFrozen(value)
  }

  useEffect(() => {
    const showPane = typeof window !== 'undefined' && sessionStorage.getItem('creditScoreFroze')
    if (showPane) {
      if (showPane === 'false') {
        setShowFrozen(false)
      }
    } else setShowFrozen(true)

    // scroll event
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    showFrozen &&
    (isDesktop ? (
      <div className='max-w-[1550px] w-full max-sm:w-auto mx-auto  h-auto py-[15px] max-sm:py-[30px] md:px-[16px] max-sm:px-[16px] bg-neutral-800 flex flex-row justify-center gap-x-[30px] max-sm:gap-y-[20px] items-center'>
        <div className='flex justify-center items-center flex-row xl:gap-x-[30px] md:gap-x-[20px] max-sm:flex-col max-sm:items-center max-sm:gap-y-[16px] max-sm:justify-center'>
          <Image src={logo} alt='img' height={50} width={50} className='max-sm:w-[40px] max-sm:h-[40px]' />
          <p className='max-sm:text-center'>
            <span className="text-white xl:text-2xl md:text-[18px] max-sm:text-[20px] font-semibold font-['Faktum'] xl:leading-[28.80px] md:leading-[22px] max-sm:leading-[24px]">
              Checking your{' '}
            </span>
            <span className="text-emerald-400 xl:text-2xl md:text-[18px] max-sm:text-[20px] font-semibold font-['Faktum'] xl:leading-[28.80px] md:leading-[22px] max-sm:leading-[24px]">
              Credit score
            </span>
            <span className="text-white xl:text-2xl md:text-[18px] font-semibold max-sm:text-[20px] font-['Faktum'] xl:leading-[28.80px] md:leading-[22px] max-sm:leading-[24px]">
              {' '}
              is easier than cooking Maggi!
            </span>
          </p>
        </div>
        <Link
          href='/cibil-credit-score-check'
          className='head-text font-[faktum] flex gap-4 px-5 py-2 bg-[#49D49D] rounded-lg max-[771px]:px-3 max-[771px]:w-[27%] max-[576px]:w-[36%] max-[479px]:w-[58%] max-[375px]:w-[56%] max-[320px]:w-[65%] max-[479px]:justify-center max-[280px]:w-[78%]'>
          <button className='text-[18px] cursor-pointer text-[#212529] max-[375px]:text-[16px] max-[771px]:text-[15px] max-[280px]:text-[14px]'>
            Check Now
          </button>
          <Image src={rightArrow} alt='img' className='w-[34px] h-[30px]' height={40} width={50} />
        </Link>
      </div>
    ) : (
      <>
        <div className='w-full h-auto bg-[#2D2D2D] py-[12px] px-[16px] flex items-center justify-center gap-[5px]'>
          <div className='flex justify-center items-center  gap-x-[11px]'>
            <Image src={logo} alt='img' height={40} width={40} />
            <p className='text-left'>
              <span className="text-white text-[15px] font-semibold font-['Faktum'] leading-[18px]">
                Checking your{' '}
              </span>
              <span className="text-emerald-400 text-[15px] font-semibold font-['Faktum'] leading-[18px]">
                Credit score
              </span>
              <span className="text-white text-[15px] font-semibold font-['Faktum'] leading-[18px]">
                {' '}
                is easier than cooking Maggi!
              </span>
            </p>
          </div>
          <Link
            href='/cibil-credit-score-check'
            className='bg-[#49D49D] rounded-lg w-[80px] h-[40px] flex items-center justify-center'>
            <Image src={rightArrow} alt='img' height={6} width={16} />
          </Link>
        </div>
      </>
    ))
  )
}
