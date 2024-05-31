import React from 'react'
import ReactStars from 'react-stars'

const ExperReview = ({ expertReviews ,CONS_PROS,title}) => {
  return (<>
    {expertReviews?.cons && <div id='expert-review' className=' container pt-[30px]'>
      <div className='px-[30px] pb-6 rounded-3xl bg-white'>
       {/* { title && <h2 className='font-[poppins] pt-6 text-[18px] text-[#272727] font-semibold leading-[26px]'>Expert&apos;s Review</h2>} */}
        <div className='flex justify-start gap-8  max-sm:flex-col '>
         {expertReviews?.pros&& <div className='mt-4 basis-1/2 text-[#212529]'>
            <p className='text-[15px] text-[#212529] font-medium  leading-[22px] '>Pros</p>
            <div className='px-4 '>
            <div
                className='list-disc  space-y-2 text-[14px] product-list-data '
                dangerouslySetInnerHTML={{
                  __html: `<div className='text-[15px]  text-[#212529] font-normal  leading-[26px]' >${
                    expertReviews?.pros 
                  } </div>`
                }}></div>
            </div>
            {/* <div>
              <ul className='list-disc px-4'>
                <li className='text-[15px] text-[#212529] font-normal  leading-[26px]'>
                  SonyLiv Premium 1 year subscription worth ₹999
                </li>
                <li className='text-[15px] text-[#212529] font-normal  leading-[26px]'>
                  Rs. 600 off at AJIO, on minimum spends of Rs. 2000
                </li>
                <li className='text-[15px] text-[#212529] font-normal  leading-[26px]'>40% off on Swiggy</li>
                <li className='text-[15px] text-[#212529] font-normal  leading-[26px]'>
                  4 Complimentary Airport Lounge Access
                </li>
                <li className='text-[15px] text-[#212529] font-normal  leading-[26px]'>
                  Buy 1 Get 1 Movie Tickets on Paytm
                </li>
              </ul>
            </div> */}
          </div>}
          { expertReviews?.cons &&<div className='mt-4 basis-1/2 text-[#212529]'>
            <p className='text-[15px] text-[#212529] font-medium  leading-[22px] '>Cons</p>
            <div className='px-4'>
              <div
                className='list-disc  space-y-2 text-[14px] product-list-data '
                dangerouslySetInnerHTML={{
                  __html: `<div className='text-[15px] text-[#212529] font-normal  leading-[26px]' >${expertReviews?.cons} </div>`
                }}></div>
            </div>
            
          </div>}
        </div>
      </div>
    </div>}
    </>
  )
}

export default ExperReview
