import ProgressBars from '@/core/component/common/ProgressBars'
import { createImageFromInitials, errorHandling, getEmojiImageAndText, getRandomColor } from '@/utils/util'
import Image from 'next/image'
import React, { useState } from 'react'
import StarRatings from 'react-star-ratings'
import ReactStars from 'react-stars'
import likeIcon from '../../../../../../public/assets/like-icon.svg'
import likeBg from '../../../../../../public/assets/likethumb.svg'
import dislikeIcon from '../../../../../../public/assets/dislike-icon.svg'
import dislikeBg from '../../../../../../public/assets/dislike-thumb.svg'
import { BASE_URL, PRODUCTSAPI } from '@/utils/alljsonfile/service'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'

const PersonalLoanOverallRating = ({ overallRatingData, reviewsData, productDetailsData }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

  const token = typeof window !== 'undefined' && localStorage.getItem('token')
  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')
  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')
  const userData = localUserData && JSON.parse(localUserData)

  const productUrlSlug = productDetailsData?.product_details?.url_slug.split('/')[2]

  const sortObject = Object.keys(overallRatingData?.data?.rating)?.sort((a, b) => b - a)
  const [reviewsFilterOpen, setReviewsFilterOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectUnlikeId, setselectUnlikeId] = useState(null)
  const [customerRating, setCustomerRating] = useState(0)
  const [showLoginPopUp, setShowLoginPop] = useState(false)
  const [commentData, setCommentData] = useState(null)
  const [reviewError, setReviewError] = useState(false)
  const [errorHref, setErrorHref] = useState(false)

  const handleSubmit = () => {}

  const handleWriteReview = (e) => {
    setReviewError(false)
    setErrorHref(false)
    const { value } = e?.target
    const hrefRegex = /(https?:\/\/\S+|www\.\S+)/gi
    if (!hrefRegex.test(value)) {
      setCommentData(value)
    } else {
      setErrorHref(true)
    }
  }

  const addProductReview = (e) => {
    e?.preventDefault()
    if (!token) {
      setShowLoginPop(true)
    } else {
      if (customerRating === undefined || customerRating === null) {
        toast.error('Please Select Rating')
      } else if (commentData === undefined || commentData === null || commentData === '') {
        setReviewError(true)
      } else {
        axios
          .post(
            BASE_URL + PRODUCTSAPI?.reviewProductadd,
            {
              lead_profile_id: leadId,
              language_id: 1,
              product_url_slug: productUrlSlug,
              comment: commentData,
              rating: String(customerRating)
            },
            { headers: headers }
          )
          .then((response) => {
            if (response?.data?.message == 'success') {
              setReviewError(false)
              toast.success(ApiMessage?.addreview)
              setReviewButton(false)
            }
          })
          .catch((error) => {
            errorHandling(error)
          })
      }
    }
  }

  const onChangeRating = (e) => {
    setCustomerRating(parseInt(e))
  }

  const getEmojiStatus = () => {
    const value = getEmojiImageAndText(customerRating)
    if (value?.image && value?.text) {
      return (
        <>
          <Image src={value?.image} className='mx-auto' width={72} height={73} alt='img' />
          <p className='text-[18px] font-semibold pt-2'>{value?.text}</p>
        </>
      )
    }
  }
  const overAll = overallRatingData?.data?.over_all_rating
  return (
    <div className='py-[30px] max-sm:p-[16px]'>
      <div className='grid grid-cols-3 gap-32 px-[30px] max-[1024px]:grid-cols-2 max-[1024px]:gap-8 max-[576px]:grid-cols-1 max-[576px]:gap-8 max-[479px]:border-b-0'>
        <div className='text-[#212529]'>
          <h2 className='text-[18px] font-semibold max-[479px]:text-center max-[479px]:pb-8'>Overall Rating</h2>
          <div className='bg-[#DEF7ED] py-[10px] px-5 rounded-xl text-center max-[479px]:mb-4'>
            <p className=' text-[30px] font-bold text-center'>
              {overAll ? overallRatingData?.data?.over_all_rating : 'NA'}{' '}
            </p>
            <div className='text-center over-rate-star flex justify-center '>
              {overAll ? (
                <StarRatings
                  rating={overallRatingData?.data?.over_all_rating}
                  starRatedColor='#49d49d'
                  numberOfStars={5}
                  name='rating'
                  starDimension='20px'
                  starSpacing='0'
                />
              ) : (
                ''
              )}
            </div>
            {overallRatingData?.data?.total_reviews ? (
              <p className='text-[13px] text-[#272727] font-semibold mt-[8px]'>
                Based on {overallRatingData?.data?.total_reviews} reviews
              </p>
            ) : (
              ''
            )}
          </div>
          {sortObject?.map((item) => {
            const ratingValue = overallRatingData?.data?.rating[item] || 0
            const totalRating = Object.values(overallRatingData?.data?.rating).reduce((acc, cur) => acc + cur, 0)
            return (
              <div className='flex items-center gap-6 justify-start pt-4' key={item}>
                <p className='text-[15px] text-[#212529] font-medium flex items-center gap-2'>
                  <Image src={'/assets/star-rate.svg'} className='' alt='img' width={16} height={16} />
                  {item}
                </p>
                <div className='flex items-center gap-2 max-[1024px]:w-full w-full'>
                  <ProgressBars rating={ratingValue} maxRating={totalRating} />
                  <p className='text-[15px] font-bold text-[#212529] '>
                    {overallRatingData?.data?.rating[item] ? overallRatingData?.data?.rating[item] : 'NA'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <div className='card-right col-span-2 max-[1024px]:col-span-1 '>
          <div className='text-[#212529]'>
            <h2 className='pb-4 text-[18px] font-semibold max-[479px]:text-[20px] max-[479px]:text-center'>
              Customer Review
            </h2>
            <form
              onSubmit={handleSubmit}
              className='rounded-2xl border px-14 py-8 text-center max-[1024px]:px-8  max-[479px]:p-0  max-[479px]:border-0'>
              <p className='text-[15px] text-[#212529] '>Let us know how you feel about the card</p>
              <div className='py-2.5'>{getEmojiStatus()}</div>
              <div className='text-center over-rate-star flex justify-center'>
                <ReactStars
                  count={5}
                  size={30}
                  onChange={onChangeRating}
                  value={parseInt(customerRating)}
                  isHalf={true}
                  color1={'#ccc'}
                  color2={'#49d49d'}
                />
              </div>

              <div>
                <p className='text-[15px] font-semibold pt-4 pb-2'>Write a review</p>
                <textarea
                  id='review'
                  name='review'
                  className={
                    errorHref || reviewError
                      ? 'border !border-red-500 rounded-xl focus:outline-none p-4 text-[15px] w-full'
                      : 'border rounded-xl focus:outline-none p-4 text-[15px] w-full'
                  }
                  onChange={(e) => handleWriteReview(e)}
                  placeholder='Let us know what you liked or disliked '
                  rows='6'
                  value={commentData}
                  cols='50'></textarea>
              </div>
              <div className='mt-5'>
                <button
                  type='submit'
                  onClick={addProductReview}
                  className='py-3 w-full cursor-pointer lg:w-[160px] md:w-full text-[15px] rounded-lg text-[#212529] border border-[#000] font-semibold'>
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* --------------------------------TOP REVIEWS----------------------------------- */}
      {reviewsData && reviewsData?.length > 0 && (
        <div className='pt-10 px-[30px] text-[#212529] details-top-review border-t mt-[30px]'>
          <div className='flex justify-between items-center pb-8'>
            <h3 className='text-[18px] font-semibold'>Top Reviews</h3>
            <div className='relative'>
              <button
                className='inline-flex cursor-pointer w-full justify-between gap-x-1.5 rounded-md bg-[#E6ECF133] text-[15px] px-3 py-2 text-sm font-normal text-gray-900 shadow-sm border border-[#E6ECF1] '
                type='button'
                //   ref={dropdownRef}
                onClick={(e) => setReviewsFilterOpen(!reviewsFilterOpen)}>
                Latest Reviews
                <span className=' w-5'>
                  <Image
                    src={'/assets/accordion-down.svg'}
                    alt='up'
                    width={24}
                    height={24}
                    className={reviewsFilterOpen ? '' : 'rotate-180 w-5 h-5 shrink-0'}
                  />
                </span>
              </button>
              {reviewsFilterOpen ? (
                <ul className='absolute z-[1000] float-left m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left p-2 text-base shadow-lg dark:bg-neutral-700 w-full'>
                  <li>Most Recent</li>
                  <li>Positive First</li>
                  <li>Negative First</li>
                </ul>
              ) : (
                ''
              )}
            </div>
          </div>
          {reviewsData?.map((reviewdata, index) => {
            return (
              <div key={index}>
                <div className='pb-8 border-b text-[#212529]'>
                  <div className='flex  gap-4 pt-5 '>
                    <Image
                      id='preview'
                      width={60}
                      height={60}
                      className='h-[60px] w-[60px] rounded-full'
                      alt='profile-pic'
                      src={createImageFromInitials(500, reviewdata?.reviewer_name, getRandomColor())}
                    />
                    <div>
                      <h4 className='text-[15px] font-semibold'>{reviewdata?.reviewer_name}</h4>
                      {reviewdata?.rating === 0 ? (
                        'NA'
                      ) : (
                        <ReactStars
                          count={5}
                          size={24}
                          value={reviewdata?.rating}
                          edit={false}
                          color1={'#ccc'}
                          color2={'#49d49d'}
                        />
                      )}
                      <div className=''>
                        <p className='pt-3 text-[15px] font-normal text-justify'> {reviewdata?.comment}</p>
                        <div className='flex items-center gap-3 pt-4'>
                          <p className='text-[13px] font-normal'>Was this helpful? </p>
                          <div className='flex items-center cursor-pointer gap-3'>
                            <button onClick={(e) => handleLike(reviewdata?.review_pk)}>
                              <Image
                                src={selectedId === reviewdata?.review_pk ? likeBg : likeIcon}
                                className='cursor-pointer'
                                alt='img'
                              />
                            </button>
                            <button onClick={(e) => handleUnLike(reviewdata?.review_pk)}>
                              <Image
                                src={selectUnlikeId === reviewdata?.review_pk ? dislikeBg : dislikeIcon}
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
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default PersonalLoanOverallRating
