import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import { useRouter } from 'next/router'
import { getPromotionObject, sendEventToGTM } from '@/utils/util'

function EligibilityCriteriaDetail({ productDetailsData, position }) {
  const router = useRouter()
  const pageRoute = router?.asPath
  const data = { eventName: 'select_promotion', title: 'Check Eligibility', position: position, route: pageRoute }

  const { card_name, min_age, max_age, salary, itr, min_credit_score, max_credit_score } =
    productDetailsData?.product_details || {}

  const hasEligibilityCriteria =
    card_name || min_age > 0 || max_age > 0 || salary > 0 || itr > 0 || min_credit_score > 0 || max_credit_score > 0

  return (
    <>
      {hasEligibilityCriteria ? (
        <div className='pt-[100px] px-20 max-[1200px]:px-0 max-[576px]:py-[50px]' id='eligibility-criteria'>
          <div className='pb-10 text-[#212529] max-[479px]:w-[80%] max-[320px]:w-full mx-auto'>
            <h2 className='head-text text-[32px] max-[1024px]:text-[32px] max-[771px]:text-[32px] max-[576px]:text-[30px] max-[479px]:text-[24px] max-[375px]:text-[22px] max-[320px]:text-[22px] max-[576px] max-[425px]:leading-10 leading-[64.4px] font-semibold text-center mx-auto  max-[1600px]:w-full max-[576px]:font-bold'>
              {productDetailsData?.product_details?.card_name} Eligibility Criteria
            </h2>
          </div>
          <div className='eligibility-criteria '>
            <div className=' py-[30px] px-[30px] rounded-3xl bg-white'>
              <div className=' gap-24  max-[1200px]:gap-8 max-[771px]:grid-cols-2 max-[771px]:gap-0 max-[576px]:grid-cols-1 max-[576px]:gap-5 self-sec'>
                <div className='card-left'>
                  <div className='mt-4 text-[#212529]'>
                    <div className='flex justify-between max-[771px]:gap-8 max-[834px]:grid max-[834px]:grid-cols-2 max-[834px]:gap-8 max-[479px]:grid-cols-1 max-[479px]:gap-6'>
                      <div className='text-center'>
                        {productDetailsData?.product_details?.min_age > 0 &&
                        productDetailsData?.product_details?.max_age > 0 ? (
                          <p className='text-[18px] font-semibold text-[#212529]  max-[576px]:font-bold max-[479px]:text-[15px]'>
                            {productDetailsData?.product_details?.min_age}-
                            {productDetailsData?.product_details?.max_age} Years
                          </p>
                        ) : (
                          'N/A'
                        )}

                        <p className='text-[13px] font-normal pt-2 mx-auto w-[80%] mt-2 max-[479px]:mt-0'>
                          Minimum & Maximum age of the applicant
                        </p>
                      </div>

                      <div className='text-center'>
                        {productDetailsData?.product_details?.salary > 0 ? (
                          <p className='text-[18px] font-semibold text-[#212529]  max-[576px]:font-bold max-[479px]:text-[15px]'>
                            {productDetailsData?.product_details?.salary}
                          </p>
                        ) : (
                          'N/A'
                        )}

                        <p className='text-[13px] font-normal pt-2 mx-auto w-[80%] mt-2 max-[479px]:mt-0'>
                          Minimum monthly income
                        </p>
                      </div>

                      <div className='text-center'>
                        {productDetailsData?.product_details?.itr > 0 ? (
                          <p className='text-[18px] font-semibold text-[#212529]  max-[576px]:font-bold max-[479px]:text-[15px]'>
                            {productDetailsData?.product_details?.itr}
                          </p>
                        ) : (
                          'N/A'
                        )}

                        <p className='text-[13px] font-normal pt-2 mx-auto w-[80%] mt-2 max-[479px]:mt-0'>
                          ITR(For Non-Salaried Person)
                        </p>
                      </div>

                      <div className='text-center'>
                        <div className='flex items-center gap-2 justify-center'>
                          {productDetailsData?.product_details?.min_credit_score > 0 ? (
                            <p className='text-[18px] font-semibold text-[#212529]  max-[576px]:font-bold max-[479px]:text-[15px]'>
                              {productDetailsData?.product_details?.min_credit_score}
                            </p>
                          ) : (
                            'N/A'
                          )}

                          <div className='tooltip eleigibility-tooltip'>
                            <Image
                              src={ListingfilterData?.helpimg}
                              className='w-5 h-5'
                              alt='img'
                              width={20}
                              height={20}
                            />
                            <span className='tooltiptext'>
                              Having a credit score within or above the recommended range increases your likelihood of
                              approval for various financial applications, but it does not provide an absolute
                              guarantee.
                            </span>
                          </div>
                        </div>

                        <p className='text-[13px] font-normal pt-2 mx-auto w-[80%] mt-2 max-[479px]:mt-0'>
                         Minimum Credit Score
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='pt-8 flex justify-between items-center gap-8 max-[479px]:flex-col text-[#212529]'>
            <p className='text-[14px] italic max-[479px]:text-center'>
              ** These criteria are only indicative. The bank reserves the right to approve or decline applications for
              credit cards.
            </p>
            <Link
              href={`/credit-cards/eligibility?eligible=${router.query['cards-details']}`}
              className='max-[991px]:w-[20%] max-[771px]:w-[28%] max-[576px]:w-[70%] max-[834px]:w-[30%]'
              prefetch={false}>
              <button
                onClick={() => sendEventToGTM(getPromotionObject(data))}
                className=' text-[18px] cursor-pointer max-[1024px]:text-[16px] max-[771px]:text-[15px] py-3 w-full lg:w-[185px] md:w-full rounded-lg text-[#212529] bg-[#49D49D] font-semibold max-[320px]:text-[14px]'>
                Check Eligibility
              </button>
            </Link>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default EligibilityCriteriaDetail
