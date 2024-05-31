import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { createImageFromInitials, getRandomColor } from '@/utils/util'
import { useWindowSize } from '@/hooks/useWindowSize'
import moment from 'moment'

const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

function CreditListingBanner({ src, businessmetaheadtag, linesToShow, creditDetails, paddingTop }) {
  const [scrollY, setScrollY] = useState(0)
  const [showMore, setShowMore] = useState(false)
  const size = useWindowSize()
  const isDeskTop = size?.width >= 768
  const dateform = moment(businessmetaheadtag?.published_time || businessmetaheadtag?.published_time)

  const formatDateTime = dateform?._isValid ? dateform.format('YYYY-MM-DD') : null

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
  const paraHide = businessmetaheadtag?.paragraph
  const publishName = businessmetaheadtag?.publisher_name

  const getMobileContent = () => {
    return (
      <div className='flex items-center ml-[19px] mt-3 max-[576px]:ml-0 mb-[5px] gap-[20px]'>
        <div className='flex items-start gap-8 max-[375px]:flex-col max-[375px]:gap-2 max-[380px]:gap-0 justify-center'>
          {publishName && (
            <div className='flex'>
              <p className='text-[15px] text-[#212529] max-sm:text-[12px] flex items-center leading-[21px]'>
                Written by <span className='font-semibold ml-2'>{businessmetaheadtag?.publisher_name}</span>
              </p>
            </div>
          )}
          {formatDateTime && (
            <div className=''>
              <p className='text-[15px] text-[#212529] max-sm:text-[12px] leading-[21px] font-medium max-sm:pb-2'>
                Updated : {formatDateTime}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // to count no. of lines
  const a = typeof window !== 'undefined' && document.getElementById('description')
  const domHeight = a?.offsetHeight
  const linesHeight = 21
  const totalLines = Math.round(domHeight / linesHeight)

  useEffect(() => {
    typeof window !== 'undefined' && localStorage.setItem('readMore', showMore)
  }, [showMore])

  return (
    <>
      {businessmetaheadtag && (
        <div
          className={`container h-full  mx-auto max-[991px]:max-w-full   ${
            creditDetails ? 'max-[1024px]:px-4' : 'max-[1024px]:px-8'
          } max-[576px]:px-0 max-[479px]:px-0 max-[375px]:px-0 max-[320px]:px-0`}>
          <div
            className={` ${creditDetails && 'max-[576px]:px-[12px]'} container   ${
              creditDetails ? 'px-4' : 'px-12'
            } max-[576px]:pb-0 pb-0 max-[1200px]:px-0  max-[576px]:px-[18px]  max-[576px]:pt-[5px] max-[280px]:px-0`}>
            {businessmetaheadtag && src && (
              <div className={`flex items-center  ${paddingTop ? 'pt-[0px]' : 'pt-[15px]'} gap-[20px]   pb-0 mb-0`}>
                <Image
                  src={src}
                  alt='card image'
                  width={80}
                  height={80}
                  className=' max-md:hidden pb-6  items-start'
                  unoptimized={true}
                />
                <div className='md:max-w-max   font-semibold  max-[479px]:!leading-10  !leading-[50.4px] max-[1440px]:w-[95%] max-[1024px]:w-[95%] max-[834px]:w-[95%]0 pb-[5px] max-[576px]:pb-0 max-[576px]:w-full '>
                  <h1 className='text-[#212529]  head-text  font-[faktum] xl:text-[28px] lg:text-[20px] max-md:pl-4 max-sm:pl-0 max-md:text-[19px] md:text-[19px] leading-[22px] max-[576px]:text-[20px] max-[479px]:text-[20px] font-semibold  max-[479px]:w-full '>
                    {businessmetaheadtag?.h1_text}
                  </h1>
                </div>
              </div>
            )}
            {!isDeskTop && getMobileContent()}

            {paraHide && (
              <div className='flex flex-col text-[#212529] text-[15px] leading-[21px] mt-2 pb-[15px] ml-[10px] max-[576px]:ml-0 max-sm:px-[0px]'>
                <p id='description' className={`text text-justify ${showMore ? 'showMoreChecked' : ''}`}>
                  {businessmetaheadtag?.paragraph}
                </p>
                {totalLines >= linesToShow && (
                  <input
                    type='checkbox'
                    onChange={(e) => setShowMore(e?.target?.checked)}
                    className='text-btn text-[#49D49D] font-semibold text-[15px] pb-[10px] mt-[8px]'
                  />
                )}
              </div>
            )}
            <div>
              {isDeskTop && (
                <div className='flex justify-between mt-2 px-2 pb-4 items-center  max-sm:flex-col max-sm:items-start '>
                  {publishName && (
                    <div className='flex gap-[12px]  pl-[4px]  items-center max-sm:pl-[7px]'>
                      <p className={`text-[15px]  text-[#212529] max-sm:text-[12px] items-center leading-[21px]`}>
                        Written by <span className='font-semibold'>{businessmetaheadtag?.publisher_name}</span>
                      </p>
                    </div>
                  )}
                  {formatDateTime && (
                    <div className='items-start'>
                      <p className='text-[15px] text-[#212529] max-sm:text-[12px] leading-[21px] font-medium max-sm:ml-12 max-sm:pb-2'>
                        Updated : {formatDateTime ? formatDateTime : 'NA'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreditListingBanner
