import React from 'react'

import dynamic from 'next/dynamic'

function DetailRelatedCards({ alternetRelatedproduct }) {
  const EligibileCards = dynamic(
    () => import('@/core/component/common/CommonList/ScoreDetailsComponent/EligibileProducts/EligibileProducts'),
    { ssr: false }
  )

  return (
    <>
      {alternetRelatedproduct?.alternate_product?.length > 0 ? (
        <div className=' container xl:px-4 pt-[100px] max-[576px]:pt-[50px]' id='related-card-offer'>
          <div className='flex justify-center pb-5 mx-auto  max-[1440px]:w-[90%] max-[1200px]:w-full max-[576px]:items-center px-20 max-[1200px]:px-0 '>
            <h2 className='text-[#212529] text-[28px] max-[1024px]:text-[28px] max-[771px]:text-[28px] max-[576px]:text-[22px] max-[479px]:text-[22px] max-[375px]:text-[20px] max-[320px]:text-[18px] text-center font-semibold'>
              Related Card Offers 
            </h2>
            {/* <button className='max-[320px]:hidden cursor-pointer text-[#212529] text-[18px] p-4 w-[15%] h-full font-semibold border rounded-xl border-[#212529] max-[834px]:w-[20%] max-[576px]:w-[30%] max-[479px]:w-[36%] max-[375px]:text-[15px] max-[479px]:text-[16px]'>
              View More
            </button> */}
          </div>

          <div className=' eligible-products-slider relative xl:px-16 '>
            <EligibileCards filteredDataCard={alternetRelatedproduct?.alternate_product} />
          </div>

         
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default DetailRelatedCards
