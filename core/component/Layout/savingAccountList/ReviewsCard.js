import React, { useEffect, useMemo, useRef, useState } from 'react'
import accordionArrowall from '../../../../public/assets/accordion-down.svg'
import ReviewImg from '../../../../public/assets/saving-review-img.svg'
import emojiIcon from '../../../../public/assets/emoji-icon.svg'
import likeIcon from '../../../../public/assets/like-icon.svg'
import likeBg from '../../../../public/assets/likethumb.svg'
import dislikeIcon from '../../../../public/assets/dislike-icon.svg'
import closeicon from '../../../../public/assets/closeIcon.svg'
import dislikeBg from '../../../../public/assets/dislike-thumb.svg'
import ReactStars from 'react-stars'
import Image from 'next/image'
import { createImageFromInitials, getRandomColor } from '@/utils/util'

const ReviewsCard = ({ reviewsData }) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsactive] = useState(false)

  const handledropdown = () => {
    setIsactive(!isActive)
  }
  const starCount = 5
  return (
    <div className='container mt-[20px]'>
      <div className='pt-10 px-6 text-[#212529] details-top-review border-t'>
        <div className='flex justify-between items-center pb-8'>
          <h3 className='text-[18px] font-semibold max-[320px]:text-[14px]'>Top Reviews</h3>
          <select className='inline-flex max-[320px]:text-[14px] cursor-pointer  justify-between gap-x-1.5 rounded-md bg-[#E6ECF133] text-[18px] px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm border leading-[26px] border-[#E6ECF1]'>
            <option>Latest Reviews</option>
            <option>Most Recent</option>
            <option>Positive First</option>
            <option>Negative First</option>
          </select>
        </div>
        <div className='pb-8 text-[#212529]'>
          {reviewsData?.map((item) => {
            return (
              <div className='flex  gap-4 pt-5 '>
                <Image
                  id='preview'
                  width={60}
                  height={60}
                  className='h-[60px] w-[60px] rounded-full'
                  alt='profile-pic'
                  src={createImageFromInitials(500, item?.reviewer_name, getRandomColor())}
                />
                <div>
                  <h4 className='text-[15px] font-semibold'>{item?.reviewer_name}</h4>
                  {/* {reviewdata?.rating === 0 ? (
                      'NA'
                    ) : ( */}
                  <ReactStars count={starCount} size={24} value={item?.rating} edit={false} color1={'#ccc'} color2={'#49d49d'} />
                  {/* )} */}
                  <div className=''>
                    <p className='pt-3 text-[15px] font-normal text-justify'>
                      {' '}
                      {item?.comment}
                      {/* With the Discover it® Cash Back credit card you can 5% cash back on everyday purchases at different
                  places each quarter like amazon.com, grocery stores, restaurants, and gas stations, up to the
                  quarterly maximum when you activate. plus, earn unlimited 1% cash back on all other purchases */}
                    </p>
                    <div className='flex items-center gap-3 pt-4'>
                      <p className='text-[13px] font-normal'>Was this helpful? </p>
                      <div className='flex items-center cursor-pointer gap-3'>
                        {/* <button onClick={(e) => handleLike(reviewdata?.review_pk)}> */}
                        <button>
                          <Image
                            //src={selectedId === reviewdata?.review_pk ? likeBg : likeIcon}
                            src={likeIcon}
                            className='cursor-pointer'
                            alt='img'
                          />
                        </button>
                        {/* <button onClick={(e) => handleUnLike(reviewdata?.review_pk)}> */}
                        <button>
                          <Image
                            //src={selectUnlikeId === reviewdata?.review_pk ? dislikeBg : dislikeIcon}
                            src={dislikeIcon}
                            className='cursor-pointer'
                            alt='img'
                          />
                        </button>
                      </div>
                      <p className='text-[13px] font-normal'>Report </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ReviewsCard
