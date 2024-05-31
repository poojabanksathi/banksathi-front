import React, { useEffect, useState } from 'react'
import moment from 'moment'

const ParagraphBanner = ({ metaResponseBanner }) => {
  const [scrollY, setScrollY] = useState(0)
  const [showMore, setShowMore] = useState(false)
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
  const dateform = metaResponseBanner?.published_time && moment(metaResponseBanner?.published_time)
  const formatDateTime = dateform?._isValid ? dateform.format('YYYY-MM-DD') : null
  // to count no. of lines
  const linesToShow = 2
  const a = typeof window !== 'undefined' && document.getElementById('description')
  const domHeight = a?.offsetHeight
  const linesHeight = 21
  const totalLines = Math.round(domHeight / linesHeight)
  useEffect(() => {}, [])
  return (
    <div
      className={`container sm:mb-4  mx-auto max-[991px]:max-w-full max-[1024px]:px-0   max-[576px]:px-0 max-[479px]:px-0 max-[375px]:px-0 max-[320px]:px-0`}>
      <div className=''>
        <div className='flex justify-between items-center max-[320px]:flex-col max-[320px]:items-start'>
          {metaResponseBanner?.publisher_name && (
            <div className='pb-[8px] pt-[12px] leading-[21px]'>
              <p className='text-[12px] sm:text-[15px] font-normal   text-[#212529] py-['>
                Written by <span className='font-semibold'> {metaResponseBanner?.publisher_name}</span>
              </p>
            </div>
          )}
          {formatDateTime && (
            <div className='py-[6px] leading-[21px]'>
              <p className='text-[12px] sm:text-[15px]  font-normal  text-[#212529]'>
                {' '}
                Updated: {formatDateTime ? formatDateTime : 'NA'}
              </p>
            </div>
          )}
        </div>
        {metaResponseBanner?.paragraph && (
          <div className='py-[6px] leading-[21px] '>
            <div className='flex flex-col text-[#212529] text-[12px] sm:text-[15px]  leading-[21px]  pb-[15px]   max-sm:px-[0px]'>
              <p id='description' className={`text ${showMore ? 'showMoreChecked' : ''}`}>
                {metaResponseBanner?.paragraph}
              </p>
              {totalLines >= linesToShow && (
                <input
                  type='checkbox'
                  onChange={(e) => setShowMore(e?.target?.checked)}
                  className='text-btn text-[#49D49D] font-semibold text-[12px] sm:text-[15px]  pb-[10px] mt-[8px]'
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ParagraphBanner
