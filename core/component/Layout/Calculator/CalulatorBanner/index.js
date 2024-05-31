import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CalculatorImg from '../../../../../public/assets/calculator-img.svg'
import CreditListingBanner from '../../creditCardList/CreditListingBanner'

function CalulatorBanner({ metaData, cal_head }) {
  const [scrollY, setScrollY] = useState(0)

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

  return (
    <>
      <div
        className={`container h-full  mx-auto max-[991px]:max-w-full max-[834px]:py-[15px] max-[479px]:py-[18px] max-[1024px]:px-2 max-[479px]:px-2 max-[375px]:px-2 max-[320px]:px-2 ${
          scrollY > 0 ? 'scroll-banner' : 'scroll-same'
        }`}>
        <div>
          {cal_head && (
            <div className=' container  px-14 py-2 max-[576px]:pb-0 pb-0 max-[1200px]:px-2 max-[991px]:max-w-full   max-[1024px]:px-10  max-[576px]:px-4  max-[576px]:pt-[5px] max-[280px]:px-0'>
              <h1 className='text-[28px] font-Faktum max-sm:text-[18px] max-sm:leading-[28.8px] text-[#212529] font-semibold'>
                Smart Calculators: Best Financial Decisions
              </h1>
              <p className='text-[15px] mt-[2px] font-Faktum max-sm:text-[13px]  text-[#212529] font-medium'>
                Empower your financial decision-making process with the help of our range of calculators.
              </p>
            </div>
          )}
        </div>
        {metaData && metaData !== null && (
          <div className=' py-[5px]'>
            <CreditListingBanner
              businessmetaheadtag={metaData}
              src={metaData?.h1_paragraph?.product_image ? `${Img_URL}/${metaData?.h1_paragraph?.product_image}` : null}
              linesToShow={2}
              paddingTop={true}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default CalulatorBanner
