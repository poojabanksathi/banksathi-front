import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactStars from 'react-stars'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import { noCibilScore } from '@/utils/alljsonfile/noCibilScore'

import { useWindowSize } from '@/hooks/useWindowSize'
import { useRouter } from 'next/router'
import useGaEvents from '@/hooks/useGaEvents'
import { sendEventToGTM } from '@/utils/util'
import ApplyNowButton from '../../common/ApplyNowButton/ApplyNowButton'

const NoCibilProducts = ({ noCibilProductsData }) => {
  const filteredData = noCibilProductsData?.product_list
  // const filteredData = noCibilProductsData?.product_list?.filter((val) => val?.min_credit_score === 0)
  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')
  const userData = localUserData && JSON.parse(localUserData)
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const starCount = 5
  const size = useWindowSize()
  const router = useRouter()
  const isMobile = size?.width <= 576

  //GTM Events Data

  const position = router?.query?.page ? (router?.query?.page - 1) * 10 : 0
  const listingItems = filteredData?.map((product, index) => {
    const pagePosition = position == 0 ? position + index + 1 : position + index + 1
    return {
      item_id: product?.product_id?.toString(),
      item_name: product?.card_name || product?.title,
      index: pagePosition,
      item_brand: product?.bank_name,
      item_category: 'my-profile/no-cibil-score',
      item_category2: '',
      item_category3: '',
      item_category4: '',
      item_category5: '',
      item_list_id: 'Eligible Products',
      item_list_name: 'Eligible Products',
      item_variant: product?.card_name || product?.title,
      quantity: 1
    }
  })
  //GtM object defined
  const eventData = {
    event: 'view_item_list',
    ecommerce: {
      item_list_id: 'Eligible Products',
      item_list_name: 'Eligible Products',
      items: listingItems
    }
  }

  // Use the custom hook to send data to GTM
  useGaEvents(eventData)

  const sendGAProductClick = (index, item) => {
    const pagePosition = position + index + 1
    const sendProductClick = {
      event: 'select_item',
      ecommerce: {
        item_list_id: 'Eligible Product Cards',
        item_list_name: 'Eligible Product Cards',
        items: [
          {
            item_id: item?.product_id?.toString(),
            item_name: item?.card_name,
            index: pagePosition,
            item_brand: item?.bank_name,
            item_category: '',
            item_category2: '',
            item_category3: '',
            item_category4: '',
            item_category5: '',
            item_list_id: 'Eligible Product Cards',
            item_list_name: 'Eligible Product Cards',
            item_variant: item?.card_name,
            quantity: 1
          }
        ]
      }
    }
    return sendEventToGTM(sendProductClick)
  }

  return (
    <>
      {filteredData?.length > 0 &&
        filteredData?.sort((a, b) => a.product_id - b.product_id)?.map((item, index) => {
          return (
            <>
              <div
                key={index}
                className='container mx-auto pt-[30px] max-sm:px-2 rounded-2xl bg-white filter-card-box duration-300 mb-5'>
                <div className='flex px-[30px] max-[576px]:px-0 gap-2.5'>
                  <div
                    onClick={() => sendGAProductClick(index, item)}
                    className='relative xl:w-[240px] md:w-[180px] max-sm:basis-1/3'>
                    <div className='xl:w-[240px]  md:w-[180px] md:h-[144px] business-card-img sm:px-0'>
                      <Link href={`/${item?.url_slug}`} prefetch={false}>
                        <Image
                          src={`${Img_URL}/${item?.product_image}`}
                          alt='card image'
                          width={isMobile ? 122 : 240}
                          height={76}
                          className='max-sm:pl-[5px]  h-full bg-cover rounded-lg'
                          unoptimized={true}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className='px-4  xl:w-[100%] md:pr-0 md:px-[30px] max-[576px]:px-[0px] max-sm:basis-2/3'>
                    <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-[567px]:grid-cols-1'>
                      <div className='col-span-3 max-[1440px]:col-span-2 gap-6'>
                        <div onClick={() => sendGAProductClick(index, item)}>
                          <Link href={`/${item?.url_slug}`} prefetch={false}>
                            <h2 className='text-[18px] max-sm:text-[15px] font-bold text-[#212529] leading-6 pb-2'>
                              {item?.card_name}
                            </h2>
                          </Link>
                        </div>
                        <span
                          className='text-[14px] comparebox-card-text  pb-6 text-[#212529]'
                          data-tooltip-target='tooltip-light'
                          data-tooltip-style='light'
                          data-te-toggle='tooltip'
                          title={`${item?.welcome_benefits?.replace(/["']/g, ' ')}`}>
                          {item?.welcome_benefits?.replace(/["']/g, ' ')}
                        </span>

                        <div className='flex items-center gap-4 max-[576px]:gap-1 mt-3 max-[576px]:mt-2'>
                          <div className='border rounded-full '>
                            <Image
                              src={ListingfilterData.logoimg}
                              alt='img'
                              width={45}
                              height={50}
                              className=' border rounded-full p-2 w-[42px] h-[42px] border-[#e5e7eb] max-sm:h-[35px] max-sm:w-[36px] max-[375px]:w-[30px] max-[375px]:h-[30px]'
                            />
                          </div>

                          <div className='border rounded-full py-1 px-[7px] flex gap-2 items-center max-[1440px]:px-4 max-[1440px]:py-2  max-[320px]:px-2'>
                            <p className='xl:text-[18px] md:text-[14px] max-sm:text-[12px] font-semibold text-[#212529]'>
                              {item?.rating}/5
                            </p>

                            <ReactStars
                              count={starCount}
                              value={item?.rating}
                              size={size?.width >= 576 ? 16 : size?.width >= 764 ? 26 : 10}
                              edit={false}
                              color1={'#ccc'}
                              color2={'#49d49d'}
                            />
                          </div>
                        </div>
                      </div>

                      {size?.width >= 768 && (
                        <div className='flex flex-col md:flex-col gap-4 lg:flex-col absolute right-4 xl:mr-[5rem]'>
                          <ApplyNowButton data={item} userData={userData} position={index} disabled={item?.bank_name === "KOTAK MAHINDRA BANK"} />

                          <Link href={`/${item?.url_slug}`} prefetch={false}>
                            <button
                              onClick={() => sendGAProductClick(index, item)}
                              className='flex items-center gap-2 justify-center cursor-pointer business-right-text py-3 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                              {noCibilScore?.explore_Card}
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {size?.width < 768 && (
                  <>
                    <div className='flex flex-col items-center justify-between  mt-4 w-full gap-4 px-2'>
                      <ApplyNowButton data={item} userData={userData} position={index} disabled={item?.bank_name === "KOTAK MAHINDRA BANK"}/>

                      <Link
                        href={`/${item?.url_slug}`}
                        prefetch={false}
                        className='flex  items-center gap-2 justify-center cursor-pointer business-right-text py-3 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                        <button onClick={() => sendGAProductClick(index, item)}>{noCibilScore?.explore_Card}</button>
                      </Link>
                    </div>
                  </>
                )}

                <div className='mt-4'>
                  <div className='grid grid-cols-3 max-[576px]:grid-cols-2 gap-0 pt-4 md:px-2'>
                    <div className='border border-[gray-100]  border-l-0 md:border-b-0 p-4 text-[#212529]'>
                      <p className='text-[15px] max-sm:text-[13px]  font-normal pt-1'>{noCibilScore?.age_heading}</p>

                      {item?.min_age > 0 && item?.max_age > 0 ? (
                        <p className='text-[15px] font-semibold text-[#212529]  max-[576px]:font-bold max-[479px]:text-[13px]'>
                          {item?.min_age}-{item?.max_age} Years
                        </p>
                      ) : (
                        'N/A'
                      )}
                    </div>
                    <div className='border border-[gray-100] border-l-0 md:border-b-0  max-sm:border-r-0 p-4 text-[#212529]'>
                      <p className='text-[15px] max-sm:text-[13px] font-normal pt-1'>{noCibilScore?.monthly_income}</p>

                      {item?.salary > 0 ? (
                        <p className='text-[15px] font-semibold text-[#212529]  max-[576px]:font-bold max-[479px]:text-[13px]'>
                          {item?.salary}
                        </p>
                      ) : (
                        'N/A'
                      )}
                    </div>
                    <div className='border border-[gray-100] border-l-0 border-r-0 md:border-b-0  max-sm:border-b-0 p-4 text-[#212529] max-sm:col-span-2'>
                      <p className='text-[15px] max-sm:text-[13px]   font-normal pt-1'>{noCibilScore?.itr_salary}</p>

                      {item?.itr > 0 ? (
                        <p className='text-[15px] font-semibold text-[#212529]  max-[576px]:font-bold max-[479px]:text-[13px]'>
                          {item?.itr}
                        </p>
                      ) : (
                        'N/A'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        })}

      {/* <div className='mt-10 max-sm: pb-10 text-center'>
        <button className='py-3 cursor-pointer  md:w-[227px]   rounded-lg text-[#212529] border border-[#000] font-semibold  max-[576px]:w-[80%]'>
        {noCibilScore?.preference_btn}
        </button>
      </div> */}
    </>
  )
}

export default NoCibilProducts
