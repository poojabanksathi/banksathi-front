import CreditCardsRoundButton from '@/core/component/common/CreditCardsRoundButton'
import {
  bankAccountsCategory,
  creditCardsSubCategory,
  loansCategory,
  productsTitle
} from '@/utils/alljsonfile/homepagejson'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const TopSellingProducts = () => {
  const [categoryActive, setCategoryActive] = useState(['Personal Loan'])
  const [productsData, setProductsData] = useState(loansCategory)

  const handleTabClick = (item) => {
    if (categoryActive?.includes(item?.name)) {
      setCategoryActive(categoryActive.filter((iten) => iten !== item?.name))
    } else {
      setCategoryActive([item?.name])
    }
    if (item?.name === 'Personal Loan') setProductsData(loansCategory)
    if (item?.name === 'Credit Card') setProductsData(creditCardsSubCategory)
    if (item?.name === 'Bank Account') setProductsData(bankAccountsCategory)
  }
  const getHref = (item) => {
    if (item?.urlSlug) {
      return item?.urlSlug
    } else return '#'
  }
  return (
    <>
      <Image
        src={'/assets/star-bg-home.svg'}
        height={24}
        width={24}
        alt='img'
        priority={true}
        className='relative left-[85%] pb-[10px] max-[768px]:w-[24px] max-[768px]:h-[24px]'
      />
      <div className='flex flex-col gap-y-[24px] max-sm:gap-y-[20px] items-center justify-center max-sm:mt-6'>
        <div className="text-center text-neutral-800 text-[40px] max-[576px]:text-[22px] max-sm:leading-[26.4px] max-[768px]:text-[24px] max-[768px]:leading-[25px] font-semibold font-['Faktum'] leading-[48px]">
          Our Best Categories
        </div>
        <div className='flex flex-row gap-x-[10px] max-sm:overflow-x-scroll max-sm:w-full category-btn-scroll'>
          {productsTitle?.map((item) => {
            return (
              <div key={item?.id}>
                <CreditCardsRoundButton
                  name={item?.name}
                  onClick={() => {
                    handleTabClick(item)
                  }}
                  className={
                    categoryActive?.includes(item?.name)
                      ? 'tabsActive rounded-[6px] head-text font-[faktum] capitalize w-[145px]'
                      : 'text-[#212529] w-[145px]  head-text font-[faktum] border border-[#212529] bg-transparent xl:py-3  xl:px-4 md:py-3 md:px-4 sm:py-3 sm:px-4 px-6 py-3 text-[15px] max-[1440px]:text-[14px] rounded-[6px] hover:bg-[#844FCF] hover:border-[#844FCF] hover:text-white capitalize list-resolov-credit '
                  }
                />
              </div>
            )
          })}
        </div>
        <div className={`mt-[15px] max-sm:mt-[20px]`}>
          <div className='max-sm:grid max-sm:grid-cols-2 flex flex-wrap md:w-[100vw] lg:w-[90vw] xl:w-[50vw] gap-[16px] justify-center items-center'>
            {productsData?.map((item) => {
              return (
                <Link href={getHref(item)} key={item?.id} prefetch={false}>
                  <div className='w-[225px] flex items-center justify-center flex-col cursor-pointer h-[80px] max-sm:w-[150px] max-sm:h-[75px] bg-white rounded-lg shadow filter-card-box duration-300'>
                    <Image src={item?.icon} height={30} width={26} alt='icons' className='' priority={true}/>
                    <div className="text-center text-neutral-800 text-xs font-medium font-['Poppins'] leading-3 pt-[8px]">
                      {item?.name}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <Image
        src={'/assets/green-dot-bg.svg'}
        height={15}
        width={15}
        alt='img'
        priority={true}
        className='relative bottom-[40px] max-[768px]:w-[10px] max-[768px]:h-[10px] max-[768px]:bottom-0 top-4'
      />
    </>
  )
}

export default TopSellingProducts
