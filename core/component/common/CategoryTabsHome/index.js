import { useWindowSize } from '@/hooks/useWindowSize'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function CategoryTabsHome({ businessCategorydata, isDesktop }) {
  const [creditTab, setCreditTab] = useState(businessCategorydata?.productInfo?.[0]?.url_slug)
  const filterData =
    businessCategorydata?.productInfo?.length > 0 &&
    businessCategorydata?.productInfo?.filter((d) => d?.url_slug == creditTab)

  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const sortedData = businessCategorydata?.productInfo?.sort((a, b) => a?.sort_order - b?.sort_order)

  const size = useWindowSize()

  const getHref = (name) => {
    if (creditTab === 'bank-accounts') return '/bank-accounts/compare/none'
    if (creditTab === 'personal-loan') return '/personal-loan/compare/none'
    else return '/credit-cards/compare/none'
  }
  return (
    <>
      {sortedData?.length > 0 && (
        <div className='max-w-[1550px] xl:px-14 mx-auto !bg-[#844FCF] w-full pt-[8px] max-[771px]:py-4 max-[576px]:py-[12px] h-full pb-[18px]'>
          <div className='border-b border-[#a0a0a0] justify-between list-none flex gap-4  max-[771px]:gap-x-[25px] max-[771px]:overflow-x-scroll max-[771px]:whitespace-nowrap !scrollbar-hide list-t w-[78%] max-[771px]:justify-start  w-full  px-20 max-[1440px]:px-20  max-[1200px]:px-20 max-[1024px]:px-8  max-[576px]:gap-x-[24px] max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 tab-credit-box'>
            {sortedData?.length > 0 &&
              sortedData?.map((catdata, index) => {
                return (
                  <div key={index} className='relative'>
                    <div
                      className='text-center  pb-5 w-[150px] max-[1440px]:w-full tab-box-res cursor-pointer'
                      onClick={() => {
                        setCreditTab(catdata?.url_slug)
                      }}>
                      <Image
                        src={`${Img_URL}/${catdata?.category_icon}`}
                        alt='img'
                        width={80}
                        height={60}
                        className='w-[34px] h-[34px] mx-auto my-2'
                        unoptimized={true}
                        priority={true}
                      />
                      {catdata.title && (
                        <p
                          className={`category-tab-title head-text font-[faktum] text-[17px] max-[1024px]:text-[16px]  max-[991px]:text-[15px] max-[479px]:text-[13px]  ${
                            creditTab == catdata?.url_slug
                              ? 'text-white relative max-[771px]:before:absolute max-[771px]:before:w-full max-[771px]:before:left-0 max-[771px]:before:bottom-[-1.1rem] tabs-credit-line'
                              : 'text-[#BB98EC]'
                          }`}>
                          {catdata.title}
                        </p>
                      )}
                      {creditTab == catdata?.url_slug ? (
                        <div
                          className={
                            size?.width === 768
                              ? 'hidden'
                              : `absolute bottom-0 max-sm:bottom-[10%] left-0 w-full h-[1px]  bg-[#fff] tabs-credit-line`
                          }>
                          <span className='absolute left-2/5 top-[-4px] w-2.5 h-2.5 bg-[#844FCF] border-r border-b border-[#fff]'></span>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                )
              })}
          </div>

          {creditTab == filterData[0]?.url_slug && (
            <div>
              <div className='grid grid-cols-2 py-6 px-20 max-[1024px]:px-8 items-center max-[576px]:grid-cols-1 max-[576px]:gap-8 max-[576px]:py-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 tabs-sub-sec max-[479px]:pb-0'>
                <div>
                  <div>
                    <p className='head-text font-[faktum] text-[28px] max-[479px]:text-[22px] max-[375px]:text-[20px] text-white pb-2 font-semibold max-[479px]:pb-2 '>
                      {filterData[0]?.title}
                    </p>
                    {filterData[0]?.short_description && (
                      <div
                        className='text-[16px] font-[poppins] text-white max-[1200px]:w-full  max-[479px]:text-[12px] max-[375px]:text-[12px]'
                        dangerouslySetInnerHTML={{
                          __html: `<div>${filterData[0]?.short_description}</div>`
                        }}></div>
                    )}
                  </div>
                  <div className='flex flex-col gap-5 mt-8'>
                    {filterData[0]?.button_two_name && (
                      <Link href={getHref(filterData[0]?.button_two_name)} prefetch={false}>
                        <button className='head-text cursor-pointer font-[faktum] p-4 border text-[16px] max-[771px]:text-[14px] max-[479px]:!text-[13px] max-[320px]:!text-[12px] max-[280px]:!text-[10px] border-white rounded-md text-white w-[72%] max-[1200px]:w-[86%] max-[820px]:w-full  hover:text-white hover:shadow-xl duration-200 font-semibold b'>
                          {filterData[0]?.button_two_name}
                        </button>
                      </Link>
                    )}

                    {filterData[0]?.button_one_name && (
                      <Link href={`${filterData[0]?.url_slug}`} prefetch={false}>
                        <button className='head-text  cursor-pointer font-[faktum] p-4 border text-[16px] max-[479px]:!text-[13px] max-[320px]:!text-[12px] max-[280px]:!text-[10px] border-white  rounded-md text-[#212529] bg-white  w-[72%] max-[1200px]:w-[86%] max-[820px]:w-full hover:bg-[#844FCF] hover:text-white hover:shadow-xl duration-200 font-semibold perfect-btn-tabs'>
                          {filterData[0]?.button_one_name}
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
                <div>
                  {isDesktop && (
                    <Image
                      src={`${Img_URL}/${filterData[0]?.category_image}`}
                      alt={`${filterData[0]?.alt_text ? filterData[0]?.alt_text : ''}`}
                      width={400}
                      height={400}
                      className='mx-auto max-[1200px]:w-[78%] max-[1024px]:w-[50%] max-[771px]:w-[60%] tab-card-img max-[280px]:w-full'
                      unoptimized={true}
                      priority={true}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default CategoryTabsHome
