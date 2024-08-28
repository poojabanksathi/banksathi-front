import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import moment from 'moment'
import { useWindowSize } from '@/hooks/useWindowSize'

const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

const CreditListingBanner = React.memo(({ src, businessmetaheadtag, linesToShow, creditDetails, paddingTop }) => {
  const [scrollY, setScrollY] = useState(0)
  const [showMore, setShowMore] = useState(false)
  const size = useWindowSize()
  const isDeskTop = size?.width >= 768

  const dateform = moment(businessmetaheadtag?.published_time || businessmetaheadtag?.published_time)
  const formatDateTime = dateform.isValid() ? dateform.format('YYYY-MM-DD') : null

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const paraHide = businessmetaheadtag?.paragraph
  const publishName = businessmetaheadtag?.publisher_name

  const getMobileContent = useCallback(() => (
    <div className='flex items-center mt-3 gap-5'>
      <div className='flex items-start gap-8 max-[375px]:flex-col max-[375px]:gap-2 max-[380px]:gap-0 justify-center'>
        {publishName && (
          <div className='flex'>
            <p className='text-sm text-gray-800 flex items-center leading-6 text-[15px] max-sm:text-[12px] '>
              Written by <span className='font-semibold ml-2'>{publishName}</span>
            </p>
          </div>
        )}
        {formatDateTime && (
          <div>
            <p className='text-sm text-gray-800 leading-6 font-medium  text-[15px] max-sm:text-[12px] '>
              Updated : {formatDateTime}
            </p>
          </div>
        )}
      </div>
    </div>
  ), [publishName, formatDateTime])

  const a = typeof window !== 'undefined' && document.getElementById('description')
  const domHeight = a?.offsetHeight
  const linesHeight = 21
  const totalLines = Math.round(domHeight / linesHeight)


  // const totalLines = typeof window !== 'undefined' && document.getElementById('description')?.offsetHeight / 21

  useEffect(() => {
    // typeof window !== 'undefined' && localStorage.setItem('readMore', JSON.stringify(showMore))
    typeof window !== 'undefined' && localStorage.setItem('readMore', showMore)

  }, [showMore])

  return (
    <>
      {businessmetaheadtag && (
        <div className={`container  mx-auto max-[991px]:max-w-full max-[576px]:px-0 ${creditDetails ? 'max-[1024px]:px-4' : 'max-[1024px]:px-8'}  ${paddingTop ? 'pt-0' : 'pt-4'}`}>
          <div className={`container ${creditDetails ? 'max-[576px]:px-[18px]  px-4' : 'max-[576px]:px-[18px] max-[1200px]:px-0 px-12'} pb-0`}>
            {businessmetaheadtag && src && (
              <div className={`flex items-center gap-5 ${paddingTop ? 'pt-0' : 'pt-4'} mb-0 `}>
                <Image
                  src={src}
                  alt='card image'
                  width={80}
                  height={80}
                  className='hidden md:block pb-6'
                  unoptimized
                />
                  <div className='md:max-w-max   font-semibold  max-[479px]:!leading-10  !leading-[50.4px] max-[1440px]:w-[95%] max-[1024px]:w-[95%] max-[834px]:w-[95%]0 pb-[5px] max-[576px]:pb-0 max-[576px]:w-full '>
                  <h1 className='text-[#212529]  head-text xl:text-[28px] lg:text-[20px] max-md:pl-4 max-sm:pl-0 max-md:text-[19px] md:text-[19px] leading-[22px] max-[576px]:text-[20px] max-[479px]:text-[20px] font-semibold  max-[479px]:w-full '>
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
                 checked={showMore}
                 onChange={(e) => setShowMore(e?.target?.checked)}
                 className='text-btn text-[#49D49D] font-semibold text-[15px] pb-[10px] mt-[8px]'
               />
             )}


           </div>
           
            )}
            {isDeskTop && (
              <div className='flex justify-between mt-2 px-2 pb-4 items-center flex-row'>
                {publishName && (
                  <div className='flex gap-3 items-center'>
                    <p className='text-sm text-gray-800 leading-6'>
                      Written by <span className='font-semibold'>{publishName}</span>
                    </p>
                  </div>
                )}
                {formatDateTime && (
                  <div>
                    <p className='text-sm text-gray-800 leading-6 font-medium'>
                      Updated : {formatDateTime || 'NA'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
})

export default CreditListingBanner
