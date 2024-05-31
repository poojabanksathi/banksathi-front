import React from 'react'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import Image from 'next/image'
import Link from 'next/link'


const EligiblityCriteria = ({ isTab }) => {
  const width = typeof window !== 'undefined' && window?.innerWidth

  return (
    <div className={`  container mx-auto  py-[50px] px-16  max-[1024px]:py-3 max-[1024px]:px-8 max-[991px]:max-w-full max-[479px]:px-4  `}>
      <div className='pt-[80px]  max-[1200px]:px-0 max-[576px]:py-[50px]' id='eligibility-criteria'>
        <div className='pb-10 text-[#212529] max-[479px]:w-[80%] max-[320px]:w-full mx-auto'>
          <h2 className='head-text text-[32px] max-[1024px]:text-[32px] max-[771px]:text-[32px] max-[576px]:text-[30px] max-[479px]:text-[24px] max-[375px]:text-[22px] max-[320px]:text-[22px] max-[576px] max-[425px]:leading-10 leading-[64.4px] font-semibold text-center mx-auto  max-[1600px]:w-full max-[576px]:font-bold'>
            Kotak’s Savings Account Eligibility Criteria
          </h2>
        </div>
        <div className='eligibility-criteria '>
          <div className=' py-[26px] px-[55px] max-sm:px-[10px] rounded-3xl bg-white'>
            {width <= 568 && (
              <div className="text-center text-neutral-800 text-lg font-semibold font-['Faktum'] leading-relaxed">
                Salaried Professional
              </div>
            )}
            <div className=' gap-24 max-[1200px]:gap-8 max-[771px]:grid-cols-2 max-[771px]:gap-0 max-[576px]:grid-cols-2 max-[576px]:gap-5 self-sec'>
              <div className='card-left'>
                <div className='mt-4 text-[#212529] '>
                  <div className='flex max-sm:px-4 justify-between max-[771px]:gap-8 max-[834px]:grid max-[834px]:grid-cols-2 max-[834px]:gap-8 max-[479px]:grid-cols-2 max-[479px]:gap-[5px] max-[375px]:gap-[18px]'>
                    <div className='text-center max-sm:text-justify max-sm:w-[90%]'>
                      {/* {productDetailsData?.product_details?.min_age > 0 &&
                      productDetailsData?.product_details?.max_age > 0 ? ( */}
                      <p className='text-[18px] font-semibold text-[#212529]  max-[576px]:font-bold max-[479px]:text-[15px]'>
                        21-65 Years
                      </p>
                      {/* //   ) : (
                    //     'N/A'
                    //   )} */}

                      <p className='text-[13px] font-normal pt-2 mt-2 max-[479px]:mt-0 sm:w-[96%]'>
                        Minimum & Maximum age of the applicant
                      </p>
                    </div>

                    <div className='text-center max-sm:text-justify max-sm:w-[90%]'>
                      {/* {productDetailsData?.product_details?.salary > 0 ? ( */}
                      <p className='text-[18px] font-semibold text-[#212529]  max-[576px]:font-bold max-[479px]:text-[15px]'>
                        {/* {productDetailsData?.product_details?.salary} */}
                        25000
                      </p>
                      {/* ) : (
                        'N/A'
                      )} */}

                      <p className='text-[13px] font-normal pt-2 sm:mx-auto sm:w-[80%] mt-2 max-[479px]:mt-0'>
                        Minimum monthly income
                      </p>
                    </div>

                    <div className='text-center max-sm:text-justify max-sm:w-[90%]'>
                      {/* {productDetailsData?.product_details?.itr > 0 ? ( */}
                      <p className='text-[18px] font-semibold text-[#212529]  max-[576px]:font-bold max-[479px]:text-[15px]'>
                        {/* {productDetailsData?.product_details?.itr} */}
                        600000
                      </p>
                      {/* ) : (
                        'N/A'
                      )} */}

                      <p className='text-[13px] font-normal pt-2 sm:mx-auto w-[80%] mt-2 max-[479px]:mt-0'>
                        ITR(For Non-Salaried Person)
                      </p>
                    </div>

                    <div className='text-center max-sm:text-justify max-sm:w-[90%]'>
                      <div className='flex items-center gap-2 sm:justify-center'>
                        {/* {productDetailsData?.product_details?.min_credit_score > 0 &&
                        productDetailsData?.product_details?.max_credit_score > 0 ? ( */}
                        <p className='text-[18px] font-semibold text-[#212529]  max-[576px]:font-bold max-[479px]:text-[15px]'>
                          {/* {productDetailsData?.product_details?.min_credit_score}-
                            {productDetailsData?.product_details?.max_credit_score} */}
                          700-900
                        </p>
                        {/* ) : (
                          'N/A'
                        )} */}

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
                            approval for various financial applications, but it does not provide an absolute guarantee.
                          </span>
                        </div>
                      </div>

                      <p className='text-[13px] font-normal pt-2 sm:mx-auto smw-[80%] mt-2 max-[479px]:mt-0'>Credit Score</p>
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
            // href={`/credit-cards/eligibility?eligible=${router.query['cards-details']}`}
            href={'#'}
            // className='max-[991px]:w-[20%] max-[771px]:w-[28%] max-[576px]:w-[70%] max-[834px]:w-[30%]'
            prefetch={false}>
            <button  className=' text-[18px]  bank_accounts_eligibility_btn cursor-pointer max-[1024px]:text-[16px] max-[771px]:text-[15px] py-3 w-full lg:w-[185px]  rounded-lg text-[#212529] bg-[#49D49D] font-semibold max-[320px]:text-[14px]'>
              Check Eligibility
            </button>
          </Link>
        </div>
      </div>{' '}
  </div>
  )
}

export default EligiblityCriteria
