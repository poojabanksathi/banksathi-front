import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function SavingAccountBanner() {
  return (
    <>
      <div className='container h-full  mx-auto max-[991px]:max-w-full  max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
        <div className='pt-[50px] container px-20  pb-0 max-[1200px]:px-0 max-[1024px]:px-8  max-[479px]:px-4  max-[479px]:py-[30px] max-[280px]:px-0'>
          <div className='text-[#212529] head-text font-[faktum] xl:text-4xl lg:text-3xl md:text-2xl  max-[576px]:text-[28px] max-[479px]:text-[20px] max-[320px]:text-[19px] font-semibold  max-[479px]:!leading-10  !leading-[50.4px] max-[1440px]:w-[74%] max-[834px]:w-[84%] mx-auto pb-[40px] max-[576px]:w-full'>
            <h1 className='text-[#212529] head-text font-[faktum] xl:text-4xl lg:text-3xl md:text-2xl leading-[50.4px] max-[576px]:text-[24px] max-[479px]:text-[24px] max-[479px]:!leading-[33.6px]  font-semibold max-[479px]:text-center max-[771px]:w-[90%] max-[479px]:w-full '>
              Explore the Best online savings accounts you can apply for:
            </h1>
          </div>
          <div>
            <div className='flex gap-[12px] pb-[24px] items-center max-sm:justify-center'>
              <div>
                <Image
                  src={'/assets/people_blog.svg'}
                  width={35}
                  height={35}
                  alt='blog-image'
                  className='rounded-full'
                />
              </div>
              <p className='text-[15px] leading-[21px]'>
                Written by <span className='font-semibold'>Tanya Sharma</span>
              </p>
            </div>
            <div className='text-[15px] leading-[21px]'>
              Selling Savings Accounts through Banksathi: Your Financial Partner. Select from a wide range of savings
              account that suits your specific needs and preferences effectively.
            </div>
            <p className='text-[#49D49D] font-semibold text-[15px] pb-[40px]'>
              <Link href='#'>Read more</Link>
            </p>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default SavingAccountBanner
