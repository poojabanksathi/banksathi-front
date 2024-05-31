import React from 'react'
import Image from 'next/image'
import starImage from '../../../public/assets/Star-18.svg'
import { useContext } from 'react'
import { MainContext } from '@/core/component/Leads/MainContext.js'
import Link from 'next/link'
import { useWindowSize } from '@/hooks/useWindowSize'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'

const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

export default function LeftProductDesc() {
  const productData = useContext(MainContext)

  const bankAccounts = productData?.product_details?.url_slug?.includes('bank-accounts')

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [productData])
  const size = useWindowSize()
  return (
    <>
      {size?.width >= 768 && productData?.product_details?.card_name && (
        <h2 className='font-[faktum]  text-[24px] 2xl:text-[24px] text-[#212529] leading-8 max-[320px]:!leading-7'>
          Application for {productData?.product_details?.card_name}
        </h2>
      )}
      <div className='flex max-sm:flex-col md:justify-center md:gap-8 md:pt-8 lg:pt-2 lg:justify-between lg:items-start max-sm:items-start max-sm:pt-8 max-sm:pb-6'>
        <div className='lg:pt-8 lg:basis-1/2'>
          <Image
            src={`${Img_URL}/${productData?.product_details?.product_image}`}
            alt='card image'
            width={316}
            height={280}
            className='md:mx-auto  lg:block lg:w-[80%] w-[70%] mb-4'
            unoptimized={true}
          />
        </div>
        {size?.width < 768 && productData?.product_details?.card_name && (
          <h2 className='font-[faktum] pt-4 text-center text-[18px] 2xl:text-[24px] text-[#212529] leading-8 max-[320px]:!leading-7'>
            {productData?.product_details?.card_name}
          </h2>
        )}

        <div className='lg:basis-1/2'>
          <div className='flex'>
            <ul className='mt-4 max-sm:pt-4  lg:block m-auto w-auto'>
              <li className='feature-list flex '>
                <div className='pr-[15px] pt-[10px]'>
                  <Image src={starImage} className='mx-auto' alt='img' />
                </div>
                {bankAccounts ? (
                  <div className=''>
                    <h4 className='text-[#212529] font-[700] leading-6 text-[16px]'>
                      {ListingfilterData?.interest_rate}
                    </h4>
                    <p className='text-[#212529] text-[14px]'>
                      <span className=''>{productData?.product_details?.rate_of_interest}%</span>
                    </p>
                  </div>
                ) : (
                  <div className=''>
                    <h4 className='text-[#212529] font-[700] leading-6 text-[16px]'>{ListingfilterData?.fees}</h4>
                    <p className='text-[#212529] text-[14px]'>
                      {productData?.product_details?.annual_fee == 0 ? (
                        <span className='font-semibold'>Free</span>
                      ) : (
                        <span className='symbole-rupee'>₹ {productData?.product_details?.annual_fee} /-</span>
                      )}
                    </p>
                  </div>
                )}
              </li>
              <li className='feature-list  flex mt-4'>
                <div className='pr-[15px] pt-[10px]'>
                  <Image src={starImage} className='mx-auto' alt='img' />
                </div>
                {bankAccounts ? (
                  <div className=''>
                    <h4 className='text-[#212529] font-[700] leading-6 text-[16px]'>{ListingfilterData?.month_bal}</h4>
                    <p className='text-[#212529] text-[14px]'>
                      <span className='symbole-rupee'>₹ {productData?.product_details?.avg_mon_bal}</span>
                    </p>
                  </div>
                ) : (
                  <div className=''>
                    <h4 className='text-[#212529] font-[700] leading-6 text-[16px]'>
                      {ListingfilterData?.joiningfees}
                    </h4>
                    <p className='text-[#212529] text-[14px]'>
                      {productData?.product_details?.joining_fee == 0 ? (
                        <span className='font-semibold'>Free</span>
                      ) : (
                        <span className='symbole-rupee'>₹ {productData?.product_details?.joining_fee} /-</span>
                      )}
                    </p>
                  </div>
                )}
              </li>
              <li className='feature-list  flex mt-4 text-[#212529]'>
                <div className='pr-[15px] pt-[10px]'>
                  <Image src={starImage} className='mx-auto' alt='img' />
                </div>
                {/*  */}
                {bankAccounts ? (
                  <div className=''>
                    <h4 className='text-[#212529] font-[700] leading-6 text-[16px]'>
                      {ListingfilterData?.min_bal_open_ac}
                    </h4>
                    <p className='text-[#212529] text-[14px]'>
                      <span className='symbole-rupee'>₹{productData?.product_details?.min_bal_to_open_ac}</span>
                    </p>
                  </div>
                ) : (
                  <div className=''>
                    <h4 className='text-[#212529] font-[700] leading-6 text-[16px]'>
                      {ListingfilterData?.recommended}
                    </h4>
                    <p className='flex text-[#212529] text-[14px'>
                      {productData?.product_details?.min_credit_score} -{' '}
                      {productData?.product_details?.max_credit_score}
                      <div className='tooltip'>
                        <svg
                          fill='none'
                          stroke='#49d49d'
                          strokeWidth='1.5'
                          className='w-5 h-5 ml-2 cursor-pointer'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                          aria-hidden='true'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'></path>
                        </svg>
                        <span className='tooltiptext'>
                          Having a credit score within or above the recommended range increases your likelihood of
                          approval for various financial applications, but it does not provide an absolute guarantee.
                        </span>
                      </div>
                    </p>
                    <Link
                      href='/cibil-credit-score-check'
                      className='text-[#212529] text-[14px] !underline !hover:underline'>
                      Check free credit score
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>

          <p className=' max-sm:text-left md:text-left max-sm:py-4 max-sm:px-2 text-[#49D49D] lg:mt-8 mt-2 font-[faktum]'>
            <Link
              href={'/' + productData?.product_details?.url_slug}
              className='xl:text-[20px] sm:text-[18px] max-sm:text-[15px] '>
              View Details
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
