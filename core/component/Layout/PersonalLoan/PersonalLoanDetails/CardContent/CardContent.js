import Image from 'next/image'
import React from 'react'
import StarRatings from 'react-star-ratings'
import CreditListingBanner from '../../../creditCardList/CreditListingBanner'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import { useWindowSize } from '@/hooks/useWindowSize'
import CardTopCommonContent from '../CardTopCommonContent/CardTopCommonContent'
import { ImageBaseUrl, getInterestRate, getLoanAmount, getLoanTenure } from '@/utils/util'
import PersonalApplyNow from '../../PersonalApplyNow/PersonalApplyNow'
import SuccessIcon from '@/core/component/Leads/common/SuccessIcon'
import { useRouter } from 'next/router'

const CardContent = ({ productDetailsData, url_slug }) => {
  const size = useWindowSize()

  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')
  const userInfo = localUserData ? JSON.parse(localUserData) : null
  const personalProductDetails = productDetailsData?.product_details
  const starCount = 5
  const isMobile = size?.width <= 576

  const creditScoreText =
    'Having a credit score within or above the recommended range increases your likelihood of approval for various financial applications, but it does not provide an absolute guarantee. Having a credit score within or above the recommended range increases your likelihood of approval for various financial applications, but it does not provide an absolute guarantee.'

  const router = useRouter()

  const getEligibilityName = () => {
    const list = userInfo?.eligible_product?.personal_loans
    if (list?.includes(personalProductDetails?.url_slug?.split('/')?.pop())) {
      return 'Eligible'
    }
    return 'Check Eligibility'
  }

  return (
    <div className='pt-[30px] mb-[30px]'>
      <div className='flex flex-col'>
        <div className='flex flex-row max-sm:flex-col justify-between items-center max-sm:px-[18px] md:px-4 xl:px-[20px]'>
          {isMobile ? (
            <CardTopCommonContent
              creditScoreText={creditScoreText}
              rating={personalProductDetails?.rating}
              interestRate={getInterestRate(
                personalProductDetails?.interest_rate_min,
                personalProductDetails?.interest_rate_max
              )}
              loanAmount={getLoanAmount(
                personalProductDetails?.loan_amount_min,
                personalProductDetails?.loan_amount_max
              )}
              loanTenure={`Tenure: ${getLoanTenure(
                personalProductDetails?.loan_tenure_min,
                personalProductDetails?.loan_tenure_max
              )}`}
              processingFees={personalProductDetails?.processing}
              minScore={personalProductDetails?.min_cibil_required}
              bankImage={`${ImageBaseUrl}/${personalProductDetails?.product_image}`}
              forClosureCharge={personalProductDetails?.forclosure_charges}
              cardName={personalProductDetails?.card_name}
              cardHref={personalProductDetails?.url_slug}
              detailsPage={true}
            />
          ) : (
            // DESKTOP
            <div className='flex flex-row max-sm:hidden gap-[20px]'>
              <div className='w-[230px] xl:mr-4 h-auto max-md:w-[180px] bg-white rounded-lg border border-slate-200 flex items-center justify-center'>
                <Image
                  src={`${ImageBaseUrl}/${personalProductDetails?.product_image}`}
                  alt='bank image'
                  width={230}
                  height={42}
                  className='rounded-lg max-md:w-[180px] max-md:h-[112.5px] '
                />
              </div>
              <div className='flex flex-col gap-[13px] max-md:gap-[16px]'>
                <div className='flex flex-col gap-0 max-md:items-center'>
                  <div className="text-neutral-800 text-lg font-bold font-['Poppins'] leading-[25.20px] text-left max-md:text-[15px] max-md:leading-[21px]">
                    {personalProductDetails?.card_name}
                  </div>
                  <div className="text-neutral-800 text-[13px] font-normal font-['Poppins'] leading-[20.80px] max-md:text-[12px] max-md:leading-[19.2px]">
                    {productDetailsData?.product_details?.best_of}
                  </div>
                </div>
                <div className='flex flex-col gap-y-[6px]'>
                  <div className='flex items-center gap-x-[8px]'>
                    <div className='border rounded-full py-1 px-2 flex gap-[8px] items-center justify-center max-[771px]:px-2 max-[360px]:gap-1'>
                      <p className='xl:text-[14px] lg:text-[14px] max-[768px]:text-[12px] font-semibold max-[479px]:text-[14px] text-[15px] text-[#212529] max-[280px]:text-[11px] h-[30px] flex justify-center items-center'>
                        {personalProductDetails?.rating}/5
                      </p>
                      <div className='mobile-rating'>
                        <StarRatings
                          rating={personalProductDetails?.rating}
                          starRatedColor='#49d49d'
                          numberOfStars={starCount}
                          name='rating'
                          starDimension='15px'
                          starSpacing='0'
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-violet-600 text-xs font-normal font-['Poppins'] leading-none">
                    BankSathi Expert Review
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            className={`${
              isMobile ? 'fixed z-[999] bottom-0 bg-[#FFF] left-0 px-4 py-3 w-full justify-between items-center' : ''
            }  flex md:flex-col lg:flex-col  items-center gap-[14px]`}
            id='comp-8-aply-btn'>
            <PersonalApplyNow url_slug={url_slug} />
            {getEligibilityName() === 'Eligible' ? (
              <button
                id={`+${url_slug}+'pl-btn'`}
                className='flex cursor-pointer items-center gap-2 justify-center business-right-text py-3 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                <SuccessIcon />
                Eligible
              </button>
            ) : (
              <button
                id={`+${url_slug}+'pl-btn'`}
                onClick={() => {
                  router.push(`/personal-loan/eligibility?eligible=${url_slug}`)
                }}
                className='py-3 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                Check Eligibility
              </button>
            )}
          </div>
        </div>
        <div className='my-[24px] max-md:y-[20px]'>
          <CreditListingBanner businessmetaheadtag={personalProductDetails} linesToShow={2} creditDetails={true} />
        </div>
      </div>
      <div className='border-t pt-[24px] pb-[30px] max-sm:hidden'>
        <div className='grid grid-cols-3 xl:gap-y-[30px] xl:gap-x-32 gap-10 place-items-start px-[30px] max-sm:px-[16px] max-sm:grid-cols-1 max-sm:gap-y-[20px]'>
          <div className='flex flex-col gap-1 items-start'>
            <div className="text-neutral-800 text-sm font-normal font-['Poppins'] leading-tight">Interest Rate</div>
            <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px]">
              {getInterestRate(personalProductDetails?.interest_rate_min, personalProductDetails?.interest_rate_max)}
            </div>
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <div className="text-neutral-800 text-sm font-normal font-['Poppins'] leading-tight">Loan Amount</div>
            <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px] symbole-rupee">
              {getLoanAmount(personalProductDetails?.loan_amount_min, personalProductDetails?.loan_amount_max)}
            </div>
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <div className="text-neutral-800 text-sm font-normal font-['Poppins'] leading-tight">Tenure</div>
            <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px]">
              {`${getLoanTenure(personalProductDetails?.loan_tenure_min, personalProductDetails?.loan_tenure_max)}`}
            </div>
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <div className="text-neutral-800 text-sm font-normal font-['Poppins'] leading-tight">
              Part payment Charges
            </div>
            <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px] xl:w-[20vw]">
              {personalProductDetails?.part_payment_charges ? personalProductDetails?.part_payment_charges : 'NA'}
            </div>
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <div className="text-neutral-800 text-sm font-normal font-['Poppins'] leading-tight">Processing Fee</div>
            <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px] symbole-rupee">
              {personalProductDetails?.processing || 'NA'}
            </div>
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <div className="text-neutral-800 text-sm font-normal font-['Poppins'] leading-tight">
              Minimum credit score
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-[15px] font-semibold pt-1'>{personalProductDetails?.min_cibil_required}</p>
              <div className='tooltip'>
                <Image src={ListingfilterData?.helpimg} className='w-5 h-5' alt='img' width={20} height={20} />
                <span className='tooltiptext'>{creditScoreText}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <div className="text-neutral-800 text-sm font-normal font-['Poppins'] leading-tight">
              Foreclosure charges
            </div>
            <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px] symbole-rupee">
              {personalProductDetails?.forclosure_charges || 'NA'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardContent
