import React from 'react'
import SuccessIcon from '../../../../../public/assets/eligibility-seccess.svg'
import ScoreApprove from '../../../../../public/assets/scoreapprovel.svg'
import Image from 'next/image'
import Link from 'next/link'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import ReactStars from 'react-stars'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useRouter } from 'next/router'
import StarRatings from 'react-star-ratings'

function EligibilityCreditTwo({ alternetRelatedproduct, eligible_product, alternat_product }) {
  const eligibleArray = eligible_product?.split(',')
  const router = useRouter()
  const starCount = 5
  const size = useWindowSize()
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  const filteredDataCard = alternetRelatedproduct?.product_list?.filter((obj) =>
    eligibleArray?.includes(obj.url_slug?.split('/')?.pop())
  )
  const isDesktop = window.innerWidth >= 577

  return (
    <>
      <div className={size.width <= 576 ? 'bg-[#F4F8FB]' : 'bg-white'}>
        <div className='container  mx-auto px-20 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4 h-auto  pt-[35px] pb-[20px] justify-around max-[576px]:py-[50px] max-[479px]:py-10 max-[479px]:h-auto'>
          <div className='w-full h-auto  px-[80px] max-[1024px]:px-[50px] max-[834px]:py-[10px] max-[834px]:px-[30px] max-[576px]:py-0 max-[576px]:px-0 '>
            {filteredDataCard && (
              <div
                className={
                  size.width <= 576 ? 'bg-white eligibility-card px-4 py-6   rounded-2xl' : ' eligibility-card'
                }>
                {/* <div className='pb-[30px]'>
                  <Image src={SuccessIcon} alt='img' width={100} height={80} className='mx-auto pb-5 ' />
                  <p className='head-text xl:text-4xl lg:text-3xl md:text-2xl text-[#212529]  max-[576px]:text-[28px] max-[479px]:text-[22px] max-[479px]:w-[80%] max-[479px]:mx-auto max-[320px]:text-[19px] text-center'>
                    Yay! You are eligible for this credit cards 
                  </p>
                </div> */}
                <div className='pb-[30px] flex justify-center sm:items-center sm:gap-[30px] max-sm:gap-[12px]   '>
                  <Image
                    src={SuccessIcon}
                    alt='img'
                    width={size?.width > 576 ? 60 : 40}
                    height={size?.width > 576 ? 60 : 40}
                    className=' '
                  />

                  <p className='head-text text-[#212529] max-sm:text-justify  text-justify lg:text-2xl xl:text-[28px] md:text-2xl leading-[45px]  max-[576px]:text-[24px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
                    Yay! You are eligible for this credit card
                  </p>

                  {/* {size?.width > 576 ? (
                <p className='head-text text-[#212529] max-sm:text-justify  text-justify lg:text-2xl xl:text-[28px] md:text-2xl leading-[45px]  max-[576px]:text-[24px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
                  Unfortunately, you are not currently eligible for any credit card.
                </p>
              ) : (
                <p className='head-text text-[#212529] max-sm:text-justify   lg:text-2xl xl:text-[28px] md:text-xl leading-[45px]  max-[576px]:text-[24px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
                  Unfortunately, you are not currently eligible for any credit card.
                </p>
              )} */}
                </div>
                <div>
                  {filteredDataCard?.map((eleigibledata, index) => {
                    return (
                      <div key={index}>
                        <div className='bg-[#F4F8FB] w-[650px] h-auto mx-auto rounded-2xl p-6 max-[576px]:w-full max-[479px]:h-full max-[320px]:px-4'>
                          <div className='flex gap-[30px] max-[576px]:gap-4 max-[479px]:flex-col max-[479px]:text-center'>
                            <div>
                              <Image
                                src={`${Img_URL}/${eleigibledata?.product_image}`}
                                alt='card'
                                width={240}
                                height={151}
                                className='max-[479px]:mx-auto'
                                unoptimized={true}
                                onClick={() => router.push(`/${eleigibledata?.url_slug}`)}
                              />
                            </div>

                            <div className='flex flex-col justify-between  '>
                              <div>
                                <Link
                                  href={`/${eleigibledata?.url_slug}`}
                                  className='text-[#212529] hover:!text-[#212529]'
                                  prefetch={false}>
                                  <p className='text-[20px] font-bold  text-[#212529] max-[320px]:text-[18px]'>
                                    {eleigibledata?.card_name}
                                  </p>
                                </Link>
                                <div className='flex items-center gap-3 pt-1 max-[576px]:justify-center'>
                                  <p
                                    className='text-[13px] font-normal text-[#212529]'
                                    data-tooltip-target='tooltip-light'
                                    data-tooltip-style='light'
                                    data-te-toggle='tooltip'
                                    title={`${eleigibledata?.welcome_benefits?.replace(/["']/g, ' ')}`}>
                                    {eleigibledata?.welcome_benefits?.replace(/["']/g, ' ')}
                                  </p>
                                </div>
                              </div>

                              <div className='flex items-center gap-4 mt-2 max-[479px]:justify-center max-[479px]:mt-4 max-[320px]:gap-2'>
                                <div>
                                  <Image
                                    src={ListingfilterData.logoimg}
                                    alt='img'
                                    width={45}
                                    height={50}
                                    className='bg-white border rounded-full p-2 w-[45px] h-[45px] border-[#e5e7eb]'
                                  />
                                </div>

                                <Link href='#' className='text-[#212529]' prefetch={false}>
                                  {eleigibledata?.rating === 0 ? (
                                    'NA'
                                  ) : (
                                    <div className='border rounded-full py-1 px-4 flex gap-2 items-center max-[320px]:px-2 eligible-rating'>
                                      <p className='xl:text-[18px] md:text-[14px] font-semibold text-[#212529]'>
                                        {eleigibledata?.rating}/5
                                      </p>
                                      <StarRatings
                                        rating={eleigibledata?.rating}
                                        starRatedColor='#49d49d'
                                        numberOfStars={starCount}
                                        name='rating'
                                        starDimension={isDesktop ? '24px' : '16px'}
                                        starSpacing='0'
                                      />
                                    </div>
                                  )}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div className='flex gap-5 justify-center mt-[30px] max-[280px]:gap-4'>
                    <Link href={`/${filteredDataCard[0]?.url_slug}`} prefetch={false}>
                      <button className='custom-max-content text-[#212529] cursor-pointer business-right-text py-3 px-6 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[12px] h-full max-[320px]:px-4 max-[280px]:text-[11px]'>
                        {ListingfilterData.details}
                      </button>
                    </Link>
                    {/* <Link href={`/${filteredDataCard[0]?.apply_url}`} prefetch={false}> */}
                    <button
                      onClick={() => router.push(`/${filteredDataCard[0]?.apply_url}`)}
                      className='cursor-pointer business-right-text py-3 px-6 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] bg-[#49D49D] font-semibold max-[320px]:text-[12px] h-full max-[320px]:px-4'>
                      {ListingfilterData.apllynow}
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default EligibilityCreditTwo
