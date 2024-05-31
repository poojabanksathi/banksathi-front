import React from 'react'
import StarRatings from 'react-star-ratings'

const PersonalLoanExpertReview = ({ productDetailsData }) => {
  const experReviewsData = [
    {
      id: '1',
      title: 'Rating',
      rating: productDetailsData?.product_details?.rating
    }
  ]

  return (
    <div className='p-[30px] max-md:p-[16px]'>
      <div className='grid grid-cols-1 gap-x-[40px] max-[1200px]:gap-8 max-[1024px]:grid-cols-1  max-[1024px]:gap-6 max-[576px]:grid-cols-1 max-[576px]:gap-5 expert-review'>
        <div className=''>
          <div className='text-[#212529]'>
            <h2 className='text-[18px] font-semibold max-sm:text-[15px]'>Expert Review & Ratings</h2>
          </div>
          {experReviewsData?.map((item) => {
            return (
              <div
                key={item?.id}
                className='flex flex-row gap-x-[20px] gap-y-[20px] items-center pb-[20px] justify-start'>
                <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] leading-snug">
                  {item?.title}
                </div>
                <div className='flex flex-row gap-x-[12px] items-center justify-center'>
                  <StarRatings
                    rating={Number(item?.rating)}
                    starRatedColor='#49d49d'
                    numberOfStars={5}
                    name='rating'
                    starDimension='14px'
                    starSpacing='0'
                  />
                  <div className="text-neutral-800 text-[15px] font-bold font-['Poppins'] leading-snug">
                    {item?.rating}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {/* --------------------------------ADVICE FROM EXPERTS-------------------------------------------------- */}
        <div className='col-span-2 max-[1024px]:col-span-1'>
          <div className='text-[#212529]'>
            <h2 className='text-[18px] font-semibold max-sm:text-[15px]'>
              {productDetailsData?.product_details?.rating_header}
            </h2>
            <p className='text-[15px] max-sm:text-[12px] max-sm:leading-[19.2px] leading-6 w-[100%] text-justify max-[576px]:w-full'>
              {productDetailsData?.product_details?.rating_details}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalLoanExpertReview
