import SocialMediaShareComp from '@/core/component/common/CommonList/SocialMediaShareComp'
import { getCompareTitle } from '@/utils/util'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import downloadIcon from '../../../../../../public/assets/download.svg'

const HeaderSection = ({ size, slug1Data, slug2Data, slug3Data }) => {
  const router = useRouter()

  //navigate to pdf page
  const navigateToPdfPage = () => {
    router?.push(`${router?.asPath}/pdf`)
  }

  return (
    <div>
      {size?.width > 768 && (
        <div>
          <h2 className='text-[#212529]  pb-4  text-[22px] font-semibold leading-[30px] max-[425px]:text-2xl max-[320px]:text-lg  font-[Faktum]'>
            {getCompareTitle(slug1Data, slug2Data, slug3Data, 'Personal Loan')}
          </h2>
        </div>
      )}
      {size?.width <= 768 ? (
        <div className='flex justify-center  max-lg:flex-col  max-[375px]:gap-3 gap-3 mb-7 relative'>
          <div className='max-lg:text-center  max-[320px]:px-1 '>
            <h2 className='text-[#212529]  text-[18px] font-semibold leading-[25px] max-[425px]:text-[18px] max-[320px]:text-[15px]  font-[Faktum]'>
              {getCompareTitle(slug1Data, slug2Data, {}, 'Personal Loan')}
            </h2>
          </div>

          {slug1Data && (
            <div className='flex gap-4 justify-between items-center max-sm:flex-col '>
              <Link href={`${router?.asPath}/pdf`} prefetch={false} target='_blank'>
                <div className='flex justify-start gap-2  items-start cursor-pointer'>
                  <span className='  px-2 text-center cursor-pointer' onClick={() => navigateToPdfPage()}>
                    <Image src={downloadIcon} alt='download' width={20} height={20} />
                  </span>
                  <span className='text-[18px] max-[479px]:text-[15px] text-[#212529] font-medium leading-[21px] font-[Poppins] max-[320px]:text-[13px]'>
                    View & Print
                  </span>
                </div>
              </Link>

              <span className=''>
                <SocialMediaShareComp />
              </span>
            </div>
          )}
        </div>
      ) : (
        slug1Data && (
          <div className='flex justify-between items-baseline  max-lg:flex-col md:gap-4 relative'>
            <div className='  cursor-pointer'>
              <Link
                className='flex justify-start items-center gap-2'
                href={`${router?.asPath}/pdf`}
                prefetch={false}
                target='_blank'>
                <div className='    cursor-pointer' onClick={() => navigateToPdfPage()}>
                  <Image src={downloadIcon} alt='download' width={25} height={25} />
                </div>
                <div className='text-[15px] pt-2 max-[479px]:text-[15px] text-[#212529] font-medium leading-[21px] font-[Poppins] max-[320px]:text-[13px]'>
                  View & Print
                </div>
              </Link>
            </div>

            <div className='pt-2'>
              <SocialMediaShareComp />
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default HeaderSection
