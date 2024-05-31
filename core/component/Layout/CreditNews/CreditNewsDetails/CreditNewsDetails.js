import React, { useEffect, useState } from 'react'
import SocialMediaShareComp from '@/core/component/common/CommonList/SocialMediaShareComp'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
import { useWindowSize } from '@/hooks/useWindowSize'
import profileImage from '../../../../../public/assets/profile-img.svg'
import dynamic from 'next/dynamic'
import CheckCibilCard from '@/core/component/common/CheckCibilCard/CheckCibilCard'
import { eligibilityData, scoreData } from '@/utils/alljsonfile/checkCibilCardList'
import CheckCibilCardPopup from '@/core/component/common/CheckCibilCardPopup/CheckCibilCardPopup'
const CreditNewsOffer = dynamic(() => import('../CreditScoreCard/CreditNewsOffer'), { ssr: false })

const CreditNewsDetails = (props) => {
  const { newsDetailsData, newsListData , pathRedirect , personalLoan } = props
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  const size = useWindowSize()
  const mobileSize = size?.width <= 576
  const isDesktop = size?.width >= 768
  const isTab = size?.width === 768

  const inputDate = newsDetailsData?.data?.created_at
  const formattedDate = moment(inputDate).format('MMM D ·')
  const [recentNewsData, setRecentNewsData] = useState([])
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getCreditScoreAndBestCards = () => {
    return (
      <div className=''>
        <div className='flex flex-col gap-[30px] positionForCards  max-[768px]:justify-center max-[1024px]:items-center my-6 py-2'>
          <CheckCibilCard cardData={scoreData} position={'3'} title={'Check Score'} />
          <CreditNewsOffer position={'6'} />
          {!mobileSize &&
          <CheckCibilCard cardData={eligibilityData} pathName={pathRedirect} position={'5'} title={'Check Eligibility'} />
          }
        </div>
      </div>
    )
  }

  const getHref = (urlSlug) => {
    if (props?.advisorPage) return `/advisor/blog/${urlSlug}`
    if (props?.infoPage) return `/credit-cards/i/${urlSlug}`
    if (props?.holidayPage) return `/holiday/${urlSlug}`
    if (props?.loanPage) return `/personal-loan/i/${urlSlug}`
    if (props?.bankPage) return `/bank-accounts/i/${urlSlug}`
    if (props?.aadharPage) return `/aadhar-card/${urlSlug}`
    if (props?.panCardPage) return `/pan-card/${urlSlug}`
    if (props?.taxPage) return `/tax/${urlSlug}`
    if (props?.goldRatePage) return `/gold-rate/${urlSlug}`
    if (props?.silverRatePage) return `/silver-rate/${urlSlug}`
    if (props?.ifscPage) return `/ifsc-code/${urlSlug}`
    if (props?.personalFinancePage) return `/personal-finance/${urlSlug}`
    if (props?.bankingPage) return `/banking/${urlSlug}`
    if (props?.creditScorePage) return `/credit-score-i/${urlSlug}`
    else return `/credit-cards/news/${urlSlug}`
  }

  useEffect(() => {
    if (newsListData?.data?.resulted_data) {
      const filter = newsListData?.data?.resulted_data?.filter((item) => item?.url_slug !== props?.blogUrl)
      setRecentNewsData(filter?.slice(0, 3))
    }
  }, [newsListData?.data?.resulted_data, props?.blogUrl])

  const imgWidth = isTab ? 343 : 770
  const imgHeight = isTab ? 208 : 350

  return (
    <div>
      {newsDetailsData && (
        <div className='bg-[#F4F8FB]'>
          <div className=''>
            <div>
              <div className='container px-10 max-[1024px]:px-2 mx-auto mb-[60px] max-[991px]:max-w-full mt-[22px] max-[576px]:px-6 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
                <div className='flex gap-[30px] max-sm:gap-0 md:gap-8'>
                  <div className='flex flex-col w-full'>
                    {newsDetailsData?.data?.title && (
                      <div>
                        <h1 className='text-[#212529]  max-sm:text-[18px] max-sm:leading-7  head-text font-[faktum] xl:text-[32px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[20px] font-semibold  max-[479px]:w-full md:leading-[40px] xl:leading-[48px]'>
                          {/* <h1 className='text-[36px] max-sm:text-[18px] max-sm:leading-7  leading-[50.4px] font-[500] font-[faktum] detail-blog-title'> */}
                          {newsDetailsData?.data?.title}
                        </h1>
                      </div>
                    )}
                    <div className='flex items-center gap-4 my-5'>
                      {newsDetailsData?.data?.author && (
                        <>
                          <div>
                            <p className='text-[15px] text-[#0E1B2C] max-sm:text-[14px]'>
                              {newsDetailsData?.data?.author}
                            </p>
                          </div>
                        </>
                      )}
                      {newsDetailsData?.data?.created_at && (
                        <div>
                          <p className='text-[15px] text-[#0E1B2C] max-sm:text-[14px]'>· &nbsp;{formattedDate}</p>
                        </div>
                      )}
                      {newsDetailsData?.data?.created_at && (
                        <div>
                          <p className='text-[15px] text-[#0E1B2C] max-sm:text-[14px]'>
                            {newsDetailsData?.data?.tor} min read
                          </p>
                        </div>
                      )}
                    </div>
                    {!mobileSize &&
                      <div className='mt-[30px] mb-[51px] card-img-space'>
                        <Image
                          src={`${Img_URL}/${newsDetailsData?.data?.image}`}
                          alt='news detail image'
                          className=' w-full h-[350px] rounded-2xl object-cover bolg-details-card-img'
                          width={isDesktop ? imgWidth : 343}
                          height={isDesktop ? imgHeight : 208}
                          unoptimized={true}
                        />
                      </div>
                    }
                    <div>
                      <SocialMediaShareComp productDetails={newsDetailsData?.data} />
                    </div>
                    {mobileSize &&
                      <div className="pb-6">
                        {personalLoan ?
                        
                        <Link href='/personal-loan/eligibility'>
                          <button className='bg-[#49D49D] w-full lg:w-[240px] h-[48px] rounded-md font-faktum font-semibold text-[15px] leading-[18px] tracking-wide text-[#212529]'>
                            Check Personal Loan Eligibility
                          </button>
                        </Link>
                        :
                        <Link href='/credit-cards/eligibility' prefetch={false}>
                        <button className='bg-[#49D49D] w-full lg:w-[240px] h-[48px] rounded-md font-faktum font-semibold text-[15px] leading-[18px] tracking-wide text-[#212529]'>
                          Check Credit Card Eligibility
                        </button>
                      </Link>
                      }
                      </div>
                    }
                    {/* {mobileSize &&(
                      <div className='pb-4'>
      
                         <CheckCibilCard cardData={eligibilityData} pathName={pathRedirect} position={'5'} title={'Check Eligibility'} />

                      </div>
                    )

          } */}
                    <div className={` max-sm:w-auto ${isTab ? '!w-auto' : ''}`}>
                      <p
                        className='text-[#212529] text-[15px] font-normal  longform-list mb-[40px] blog-Post-detail-table'
                        dangerouslySetInnerHTML={{
                          __html: `<div>${newsDetailsData?.data?.content}</div>`
                        }}></p>
                    </div>
                    {recentNewsData && recentNewsData?.length > 0 && (
                      <div className={isDesktop ? 'border-b-2 border-black' : ''} />
                    )}
                    {recentNewsData && recentNewsData?.length > 0 && (
                      <>
                        <div className="text-neutral-800 text-4xl font-semibold font-['Faktum'] leading-[50.40px] mt-[30px]">
                          Latest news
                        </div>
                        <div className='mt-[20px]'>
                          {recentNewsData?.map((item, index) => {
                            return (
                              <div className=' mb-6 bg-white rounded-xl max-sm:rounded-2xl' key={item?.url_slug}>
                                <div className='flex flex-row max-sm:flex-col  justify-start  gap-[15px]'>
                                  <div className='max-sm:p-0'>
                                    <Link href={`/credit-cards/i/${item?.url_slug}`}>
                                      <Image
                                        className='h-[160px] max-sm:w-full  md:max-w-none max-sm:h-[180px] max-sm:rounded-t-2xl md:rounded-s-2xl'
                                        src={`${Img_URL}/${item?.image}`}
                                        alt={`blog_img`}
                                        width={!isDesktop ? 140 : 275}
                                        height={180}
                                        unoptimized={true}
                                        maxWidth={0}
                                      />
                                    </Link>
                                  </div>
                                  <div className='items-start max-[320px]:p-2 md:pt-[20px] md:pb-[20px] max-sm:px-[10px] max-sm:pb-3 '>
                                    {item?.title && (
                                      <Link href={getHref(item?.url_slug)}>
                                        <h2 className='font-poppins font-medium text-[15px] leading-[21px]  text-[#212529]'>
                                          {item?.title}
                                        </h2>
                                      </Link>
                                    )}

                                    <div className='flex justify-start gap-2 md:mt-4 items-center'>
                                      {item?.author && (
                                        <p className='font-poppins font-semibold text-[13px] leading-[19px] text-center text-[#212529]'>
                                          {item?.author}
                                        </p>
                                      )}
                                      {item?.created_at && (
                                        <p className='font-poppins font-normal text-[13px] leading-[30px]  text-[#212529] pb-2'>
                                          {formattedDate}
                                        </p>
                                      )}
                                      {item?.tor && (
                                        <p className='font-poppins font-normal text-[13px] leading-[30px]  text-[#212529] pb-2'>
                                          {item?.tor} read
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </>
                    )}
                    {!isDesktop && getCreditScoreAndBestCards()}
                  </div>
                  {isDesktop && getCreditScoreAndBestCards()}
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreditNewsDetails
