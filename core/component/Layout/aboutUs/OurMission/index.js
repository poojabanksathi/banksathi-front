import React from 'react'

function OurMission() {
  return (
    <>
      <div className=' pt-[60px] max-[834px]:pt-[50px] pb-[30px] w-[92%] mx-auto max-[1200px]:w-[85%] max-[991px]:w-[90%] max-[576px]:w-full ourmission-resolution'>
        <div className='grid grid-cols-2  gap-8 max-[479px]:grid-cols-1'>
          <div className='bg-[#ACECD2] rounded-2xl p-14 max-[991px]:p-8 max-[576px]:p-4'>
            <h4 className='head-text font-[faktum] xl:text-4xl lg:text-3xl md:text-2xl  max-[576px]:text-[28px] max-[479px]:text-[22px] max-[320px]:text-[20px] font-semibold mx-auto max-[479px]:text-center !leading-[50.4px] weare-title text-[#212529]'>
              Our Mission
            </h4>
            <p className='text-[18px] font-[Poppins] text-[#212529] leading-7 pt-4 max-[479px]:text-center'>
              Our mission is to provide innovative financial solutions that enable our customers to achieve their
              financial goals. We aim to be a customer-centric organisation that prioritises the needs and preferences
              of our customers.
            </p>
          </div>

          <div className='bg-[#D2BFED] rounded-2xl p-14 max-[991px]:p-8 max-[576px]:p-4'>
            <h4 className='head-text font-[faktum] xl:text-4xl lg:text-3xl md:text-2xl  max-[576px]:text-[28px] max-[479px]:text-[22px] max-[320px]:text-[20px] font-semibold mx-auto max-[479px]:text-center !leading-[50.4px] weare-title text-[#212529]'>
              Our Vision
            </h4>
            <p className='text-[18px] font-[Poppins] text-[#212529] leading-7 pt-4 max-[479px]:text-center'>
              We envision a world where banking and financial services are accessible, affordable, and convenient for
              all. Our aim is to provide innovative and personalized solutions to our customers. We strive to build a
              trusted relationship with our customers, where we not only provide financial solutions but also educate
              and empower them to make informed financial decisions.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurMission
