import { ImageBaseUrl } from '@/utils/util'
import Image from 'next/image'
import React from 'react'
import StarRatings from 'react-star-ratings'
import PersonalApplyNow from '../../../PersonalApplyNow/PersonalApplyNow'
import { useRouter } from 'next/router'

const IsEligibleProduct = ({ size, filteredAlternateList, eligibleProduct, productList }) => {
  const router = useRouter()
  const filterProductDetail = productList?.product_list?.filter(
    (item) => item?.url_slug?.split('/')?.pop() === eligibleProduct
  )?.[0]

  const applyNowButtonAndViewDetails = () => {
    return (
      <div className='mt-[29px] flex flex-row items-center justify-center gap-x-[20px]'>
        <PersonalApplyNow
          dimensions={{ width: 'md:w-[160px]', height: 'h-[48px]' }}
          url_slug={filterProductDetail?.url_slug?.split('/')?.pop()}
        />
        <button
          className='py-3 w-full md:w-[160px] rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'
          onClick={() => router.push(`/${filterProductDetail?.url_slug}`)}>
          View Details
        </button>
      </div>
    )
  }
  return (
    <>
      <div className={size.width <= 576 ? 'bg-[#F4F8FB] ' : 'bg-white pt-[30px]'}>
        <div className={size.width <= 576 ? 'bg-white eligibility-card px-4 py-2 ' : ' eligibility-card mb-[15px]'}>
          <div className='xl:pb-[30px] flex justify-center sm:items-center sm:gap-[30px] max-sm:gap-[12px] max-sm:pt-2'>
            <Image
              src={'/assets/eligibility-seccess.svg'}
              alt='img'
              width={size?.width > 576 ? 60 : 40}
              height={size?.width > 576 ? 60 : 40}
              className=' '
            />
            <p className='head-text text-[#212529]   lg:text-justify lg:text-2xl xl:text-[28px] md:text-2xl leading-[45px]  max-[576px]:text-[24px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
              Yay! You are eligible for this personal loan
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center max-[768px]:pb-6 max-sm:py-6 '>
          <div className='md:w-[40vw] h-[181px] bg-[#F4F8FB] rounded-xl flex flex-col  lg:flex-row  items-center justify-center gap-x-[37px]'>
            <div className='flex items-center justify-center'>
              <Image
                src={`${ImageBaseUrl}/${filterProductDetail?.product_image}`}
                alt='bank image'
                width={218}
                height={100}
                className='px-1 rounded-lg'
              />
            </div>
            <div className='flex flex-col items-center lg:items-start'>
              <div className=" text-neutral-800 text-xl font-bold font-['Poppins'] leading-7">
                {filterProductDetail?.card_name}
              </div>
              <div className="text-neutral-800 text-[13px] font-normal font-['Poppins'] leading-[20.80px] max-sm:text-center">
                {filterProductDetail?.best_of}
              </div>
              <div className='mt-2 border rounded-full py-[3.5px] px-2 flex gap-[2px] items-center justify-center max-[771px]:px-2 max-[360px]:gap-1'>
                <p className='max-[768px]:text-[12px] font-semibold max-[479px]:text-[14px] text-[15px] text-[#212529] max-[280px]:text-[11px]  flex justify-center items-center'>
                  {filterProductDetail?.rating}/5
                </p>
                <StarRatings
                  rating={filterProductDetail?.rating}
                  starRatedColor='#49d49d'
                  numberOfStars={5}
                  name='rating'
                  starDimension='12px'
                  starSpacing='0'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='max-sm:hidden max-[768px]:hidden'>{applyNowButtonAndViewDetails()}</div>
      </div>
      <div className='md:hidden'>{applyNowButtonAndViewDetails()}</div>
    </>
  )
}

export default IsEligibleProduct
