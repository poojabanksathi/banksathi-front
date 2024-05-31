import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import LeftTabs from './LeftTabs/LeftTabs'
import CardContent from './CardContent/CardContent'
import PersonalLoanExpertReview from './PersonalLoanExpertReview/PersonalLoanExpertReview'
import PersonalLoanOverallRating from './PersonalLoanOverallRating/PersonalLoanOverallRating'
import VedioCheck from '@/core/component/common/VedioCheck'
import CreditScoreDesktop from '@/core/component/common/CommonList/CreditScoreDesktop/CreditScoreDesktop'
import HowToApplyDetail from '@/core/component/common/CommonList/HowToApplyDetail'
import HelpLineComp from './HelpLineComp /HelpLineComp'
import { useWindowSize } from '@/hooks/useWindowSize'
import CheckCibilCard from '@/core/component/common/CheckCibilCard/CheckCibilCard'
import { scoreData } from '@/utils/alljsonfile/checkCibilCardList'
import ServiceTabs from '../../savingAccountList/ServiceTabs'
import PersonalLoanCards from '../PersonalLoanCards/PersonalLoanCards'
import { capitalizeFirstLetter, scrollIntoSection } from '@/utils/util'
import LoanFeatures from './LoanFeatures/LoanFeatures'
import RequiredDocuments from './RequiredDocuments/RequiredDocuments'
import LoanEligibility from './LoanEligibility/LoanEligibility'

const PersonalLoanDetails = ({
  productDetailsData,
  longFormData,
  relatedAccountsData,
  reviewsData,
  overallRatingData,
  serviceTabs,
  CONS_PROS,
  url_slug
}) => {
  const expertReviewRef = useRef()
  const reqDocsRef = useRef()
  const eligibility = useRef()
  const featuresRef = useRef()
  const customerReviewsRef = useRef()
  const relatedRef = useRef()
  const videoRef = useRef()
  const howToApplyRef = useRef()
  const accountDetailsRef = useRef()

  const router = useRouter()
  const size = useWindowSize()

  const isMobile = size?.width <= 576
  const isTablet = size?.width === 768

  const [scrollId, setScrollId] = useState('card-details')
  const [selectedTab, setSelectedTab] = useState(1)
  const [viewDetailsIndex, setViewDetailsIndex] = useState([])

  const offset = 110
  const options = {
    root: null,
    threshold: 0
  }

  const handleScroll = (entries) => {
    entries.forEach((entry) => {
      const elementID = entry.target.id
      const elementTop = entry.boundingClientRect.top

      if (elementTop < offset) {
        setScrollId(elementID)
      }
    })
  }
  const observer = new IntersectionObserver(handleScroll, options)
  const targetElements = document.querySelectorAll('.target-element')
  targetElements.forEach((element) => {
    observer.observe(element)
  })

  useEffect(() => {
    const pathname = router?.asPath
    if (accountDetailsRef) {
      scrollIntoSection(pathname, '#loan-details', accountDetailsRef)
    }
    if (featuresRef) {
      scrollIntoSection(pathname, '#features', featuresRef)
    }
    if (reqDocsRef) {
      scrollIntoSection(pathname, '#req-documents', reqDocsRef)
    }
    if (eligibility) {
      scrollIntoSection(pathname, '#eligibility', eligibility)
    }
    if (customerReviewsRef) {
      scrollIntoSection(pathname, '#overall-rating', customerReviewsRef)
    }
    if (expertReviewRef) {
      scrollIntoSection(pathname, '#expert-reviews', expertReviewRef)
    }
    if (relatedRef) {
      scrollIntoSection(pathname, '#related-loan-offer', relatedRef)
    }
    if (videoRef) {
      scrollIntoSection(pathname, '#check-video', videoRef)
    }
    if (howToApplyRef) {
      scrollIntoSection(pathname, '#how-to-apply', howToApplyRef)
    }
  }, [router?.asPath])

  // FEATURES
  const features = productDetailsData?.product_details?.add_features?.split(',')
  const benefits = productDetailsData?.product_details?.benefits?.split(',')

  // DOCUMENTS
  const docs = productDetailsData?.product_details?.required_documents?.split(',')
  const length = docs?.length
  const firstFive = docs?.slice(0, 5)
  const others = docs?.slice(4, length)

  // ELIGIBILITY
  const monthlySalary = productDetailsData?.product_details?.salary
  const itrAmount = productDetailsData?.product_details?.itr

  return (
    <div className='pt-4 container h-full mx-auto px-12 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 max-[991px]:max-w-full'>
      <div className='grid 2xl:gap-8 grid-cols-5  gap-4  max-[768px]:grid-cols-1 pb-4'>
        {/* ------------LEFT TABS--------- */}
        <div className='col-span-1 bg-none relative hidden lg:block'>
          <LeftTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
        {/* -----------PDP CONTENT-------------- */}
        <div className='col-span-4 flex flex-col lg:gap-6 md:gap-4'>
          <div className='axis-card-top target-element'>
            <div className='rounded-3xl bg-white w-full' ref={accountDetailsRef}>
              <CardContent productDetailsData={productDetailsData} url_slug={url_slug} />
            </div>
            <div className='rounded-3xl bg-white w-full mb-[30px]' ref={featuresRef}>
              <LoanFeatures features={features} benefits={benefits} />
            </div>
            <div className='rounded-3xl bg-white w-full mb-[30px]' ref={reqDocsRef}>
              <RequiredDocuments docs={docs} firstFive={firstFive} others={others} length={length} />
            </div>
            {productDetailsData?.product_details && (itrAmount || monthlySalary) && (
              <div className='' ref={eligibility}>
                <div className="text-center text-neutral-800 lg:text-[28px] text-[18px] leading-[30px] font-semibold font-['Faktum'] lg:leading-[50.40px] ">
                  {capitalizeFirstLetter(productDetailsData?.product_details?.card_name?.toLowerCase()) + ' '}
                  Eligibility Criteria
                </div>
                <div className='rounded-3xl bg-white w-full mt-[24px] mb-[30px]'>
                  <LoanEligibility
                    productDetailsData={productDetailsData?.product_details}
                    monthlySalary={monthlySalary}
                    itrAmount={itrAmount}
                  />
                </div>
              </div>
            )}

            <div className='rounded-3xl bg-white w-full' ref={expertReviewRef}>
              <PersonalLoanExpertReview productDetailsData={productDetailsData} />
            </div>
            <div className='rounded-3xl bg-white w-full mt-[30px]' ref={customerReviewsRef}>
              <PersonalLoanOverallRating
                overallRatingData={overallRatingData}
                reviewsData={reviewsData}
                productDetailsData={productDetailsData}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-[30px]'>
        <HelpLineComp productDetailsData={productDetailsData?.product_details} />
      </div>
      <div className='mt-[80px]' ref={videoRef}>
        <VedioCheck productDetailsData={longFormData} title={'Know everything about SBI Personal Loan'} />
      </div>
      <div className='mt-[30px]'>
        {isMobile || isTablet ? (
          <CheckCibilCard cardData={scoreData} position={'5'} title={'Check Score'} />
        ) : (
          <CreditScoreDesktop isCreditRange={false} />
        )}
      </div>
      {relatedAccountsData?.alternate_product?.length > 0 && (
        <div className='mt-[80px]'>
          <div className='flex justify-between pb-5  max-[1200px]:w-full max-[576px]:items-center  max-[1200px]:px-0 '>
            <h2 className="text-neutral-800 text-4xl font-['Faktum'] leading-[50.40px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[22px] max-[375px]:text-[20px] max-[320px]:text-[18px] text-center font-semibold">
              Related Loans
            </h2>
            <button className='max-[320px]:hidden cursor-pointer text-[#212529] text-[18px] py-[16px] px-[] w-[15%] h-full font-semibold border rounded-xl border-[#212529] max-[834px]:w-[20%] max-[576px]:w-[30%] max-[479px]:w-[36%] max-[375px]:text-[15px] max-[479px]:text-[16px]'>
              View More
            </button>
          </div>
          <div ref={relatedRef} className='mt-[33px]'>
            <div className='w-full'>
              <PersonalLoanCards
                viewDetailsIndex={viewDetailsIndex}
                isMobile={isMobile}
                isTablet={isTablet}
                size={size}
                personalProductList={relatedAccountsData?.alternate_product} // to replace with relatedAccountsData?.alternate_product
                setViewDetailsIndex={setViewDetailsIndex}
                isDetailsPage={true}
              />
            </div>
          </div>
        </div>
      )}
      <div className='' ref={howToApplyRef}>
        <HowToApplyDetail productLongformcon={longFormData} moreAboutRef={howToApplyRef} />
      </div>
      <div className='80px'>
        <ServiceTabs serviceTabs={serviceTabs} />
      </div>
    </div>
  )
}

export default PersonalLoanDetails
