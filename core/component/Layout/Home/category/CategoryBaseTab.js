import React from 'react'
import ProductBg from '../../../../../public/assets/Products.svg'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Content from '../content/Content'
import TopSellingProducts from '../../NewHomePage/TopSellingProducts/TopSellingProducts'
import TroubleComp from '../../NewHomePage/TroubleComp/TroubleComp'

const CategoryTabsHome = dynamic(() => import('@/core/component/common/CategoryTabsHome'), {
  ssr: false
})

function CategoryBaseTab({ businessCategorydata, isDesktop }) {
  return (
    <>
      <div className='bg-[#F4F8FB]'>
        <div className='container h-auto pt-[32px] max-sm:pt-[24px] max-[1024px]:px-8 mx-auto max-[991px]:max-w-full  max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 relative z-[1]'>
          <>
            <div className='products-mark flex flex-col items-center justify-center gap-y-[16px] max-sm:gap-y-[6px]'>
              <h1 className='leading-[22px] max-sm:leading-[24px] text-[#212529] head-text font-[faktum] max-[834px]:leading-[22px] max-[479px]:leading-[22px] text-[28px] max-[1024px]:text-[28px] max-[771px]:text-[24px] max-[576px]:text-[20px] max-[479px]:text-[20px] max-[375px]:text-[20px] max-[320px]:text-[20px] max-[576px]:w-full font-semibold text-center '>
                Why compromise when you can have the best!
              </h1>
              <h2 className='text-center text-neutral-800 text-[18px] max-sm:text-[15px] max-sm:leading-[20px] font-normal font-["Poppins"] leading-[18px]'>
                Choose Smart & Personalized financial solutions
              </h2>
            </div>
            <Image
              src={ProductBg}
              className='absolute z-[-1] left-[30%] max-[1440px]:left-[26%] max-[1200px]:left-[16%] top-[3%] max-[1440px]:top-[15%] max-[771px]:top-[24%] w-[42%] max-[1440px]:w-[550px] max-[771px]:w-3/5 max-[771px]:left-[22%] max-[576px]:w-3/4 max-[576px]:left-[12%] max-[576px]:top-[72%] max-[479px]:top-[62%]'
              alt='img'
              height={110}
              width={645}
              priority={true}
            />
          </>
        </div>
        <div className='!bg-[#F4F8FB] mt-[26px] max-sm:mt-[19px] h-auto'>
          <CategoryTabsHome businessCategorydata={businessCategorydata} isDesktop={isDesktop} />
          <Content isDesktop={isDesktop} />
        </div>
        <div className='lg:mt-[40px] max-sm:mt-0 bg-[#F4F8FB] container mx-auto max-[768px]:px-[12px] max-[768px]:pt-[30px] md:mt-[50px] '>
          <TopSellingProducts isDesktop={isDesktop} />
        </div>
        <div className='mt-[40px] max-sm:mt-[30px]'>
          <TroubleComp />
        </div>
      </div>
    </>
  )
}

export default CategoryBaseTab
