import Image from 'next/image'
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import PersonalLoanCompare from '../PersonalLoanCompare'
import { useWindowSize } from '@/hooks/useWindowSize'
import { getCompareTitle } from '@/utils/util'
import ExplorePDfBanner from '@/core/component/common/CommonList/ExplorePDfBanner'

const LoanComparePdf = ({ slug1, slug2, slug3, productcomparedata, link }) => {
  const targetRef = useRef(null)
  const size = useWindowSize()

  const printPage = useReactToPrint({
    content: () => targetRef?.current,
    documentTitle: 'compare-report'
  })
  return (
    <div className='bg-[#F4F8FB]'>
      <div
        className={`container  min-h-[500px] max-[1440px]:px-12 max-[1200px]:px-0 mx-auto max-[991px]:max-w-full pt-[34px] pb-[30px] px-20 rounded-2xl max-[1024px]:px-8 max-[479px]:px-0  max-[479px]:pb-0 max-[375px]:pb-7 max-[479px]:pt-7
    `}>
        <div className='flex justify-center py-4  items-center' onClick={() => printPage()}>
          <span className='w-[40px] h-[40px]  p-2  text-center cursor-pointer'>
            <Image src='/assets/download.svg' alt='download' width={40} height={40} />
          </span>
          <span className='text-[18px] cursor-pointer max-[479px]:text-[15px] text-[#212529] font-medium leading-[21px] font-[Poppins] max-[320px]:text-[11px]'>
            Print
          </span>
        </div>
        {/* PDF PART */}
        <div ref={targetRef}>
          <div className='flex justify-between max-sm:flex-col gap-4 items-baseline max-lg:items-center py-4 px-2'>
            <Image src='/assets/logo-sticky.svg' width={180} height={40} alt='image' unoptimized={true} />
            {size?.width > 768 ? (
              <h2 className='text-[#212529] text-top items-top lg:pt-2 text-[18px] font-semibold leading-[30px] max-[425px]:text-2xl max-[320px]:text-lg  font-[Faktum]'>
                {getCompareTitle(slug1, slug2, slug3, 'Personal Loan')}
              </h2>
            ) : (
              <h2 className='text-[#212529] max-lg:text-center    font-semibold leading-[25px] text-[16px] max-[425px]:text-[15px] max-[320px]:[15px]  font-[Faktum]'>
                {getCompareTitle(slug1, slug2, {}, 'Personal Loan')}
              </h2>
            )}
          </div>
          <PersonalLoanCompare
            slug1Data={slug1}
            slug2Data={slug2}
            slug3Data={slug3}
            productcomparedata={productcomparedata}
            isPdfPage={true}
          />
          <div className='pt-[100px]'>
            <ExplorePDfBanner url={link} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanComparePdf
