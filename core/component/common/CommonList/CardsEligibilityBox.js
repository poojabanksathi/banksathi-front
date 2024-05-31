import React from 'react'

import dynamic from 'next/dynamic'

const EligibileCards = dynamic(
  () => import('@/core/component/common/CommonList/ScoreDetailsComponent/EligibileProducts/EligibileProducts'),
  { ssr: false }
)

function CardsEligibilityBox({ alternetRelatedproduct, alternat_product, eligible_product }) {
  const finalArray = alternat_product?.credit_cards

  const filteredDataCard = alternetRelatedproduct?.product_list?.filter((obj) =>
    finalArray?.includes(obj.url_slug.split('/').pop())
  )

  return (
    <>
      {alternetRelatedproduct?.product_list?.length > 0 && (
        <>
          <>
            {filteredDataCard?.length > 0 && (
              <div className='youare-eligible sm:my-6 sm:mb-12'>
                <p className='head-text xl:text-4xl text-[#212529] lg:text-3xl md:text-2xl  max-[576px]:text-[25px] max-[479px]:text-[22px] max-[479px]:pb-5 max-[320px]:text-[19px] text-center'>
                  You are also eligible for these credit cards
                </p>
              </div>
            )}
            <div className=' eligible-products-slider relative my-8 xl:px-16'>
              <EligibileCards filteredDataCard={filteredDataCard} creditFirst={true} />
            </div>
          </>
        </>
      )}
    </>
  )
}

export default CardsEligibilityBox
