import React from 'react'

function AboutBanner() {
  return (
    <div className='container h-full  mx-auto max-[991px]:max-w-full py-[100px] max-[1440px]:pt-[50px] max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4  about-banner-resolve'>
      <div className=' px-20 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-0 items-centermax-[576px]:gap-8 max-[479px]:px-0 '>
        <div>
          <div className='pb-[58px] text-center max-[479px]:pb-[30px]'>
            <h4 className='head-text font-[faktum] text-[46px] max-[1024px]:text-[42px] max-[834px]:w-[85%] max-[834px]:text-[38px] max-[834px]:pb-[12px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[28px] max-[375px]:text-[24px] max-[320px]:text-[22px] max-[479px]:text-center text-white pb-[30px] font-semibold leading-[50px] w-[60%] mx-auto max-[1440px]:w-[72%] max-[1200px]:w-[78%] max-[771px]:w-full max-[479px]:leading-8 about-title-resolution'>
              We provide innovative financial solutions to achieve financial goals.
            </h4>
            <p className='text-[24px] max-[834px]:text-[22px] max-[479px]:text-[18px] max-[375px]:text-[15px] text-white max-[1200px]:w-full font-normal max-[479px]:text-center w-[60%] max-[1440px]:w-[72%] mx-auto font-[Poppins]'>
              We aim to be a customer-centric organization that prioritizes the needs and preferences of our customers.
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default AboutBanner
