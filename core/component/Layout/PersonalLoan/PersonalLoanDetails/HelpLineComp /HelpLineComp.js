import React from 'react'

const HelpLineComp = ({ productDetailsData }) => {
  return (
    (productDetailsData?.availability || productDetailsData?.contact_no || productDetailsData?.email) && (
      <>
        <h1 className="mb-[30px] text-center text-neutral-800 text-[32px] font-semibold font-['Faktum'] leading-[50.40px] max-sm:text-[18px] max-sm:leading-[25.2px]">
          {`${productDetailsData?.card_name} Customer Care Details`}
        </h1>
        <div className='w-full max-sm:px-2 h-[139px] max-sm:py-[23px] max-sm:h-auto bg-white rounded-3xl flex flex-col gap-[20px] md:gap-y-[40px] items-center justify-center'>
          <div className='flex flex-row max-md:flex-col items-center justify-center lg:gap-x-[85px] gap-[20px]'>
            {productDetailsData?.contact_no && (
              <div className='flex flex-col items-center justify-center'>
                <div className="text-center text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-relaxed">
                  Contact Number
                </div>
                <div className="text-center text-neutral-800 text-lg mt-2 font-semibold max-sm:leading-normal font-['Poppins'] leading-relaxed max-sm:text-[15px]">
                  {productDetailsData?.contact_no}
                </div>
              </div>
            )}
            {productDetailsData?.email && (
              <div className='flex flex-col items-center justify-center'>
                <div className="text-center text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-relaxed">
                  Email Address
                </div>
                <div className="text-center text-neutral-800 text-lg mt-2 max-sm:text-[15px] font-semibold max-sm:leading-normal font-['Poppins'] leading-relaxed">
                  {productDetailsData?.email}
                </div>
              </div>
            )}
            {productDetailsData?.availability && (
              <div className='flex flex-col items-center justify-center'>
                <div className="text-center text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-relaxed">
                  Availability
                </div>
                <div className="text-center text-neutral-800 text-lg mt-2  font-['Poppins'] leading-relaxed max-sm:text-[15px] font-semibold max-sm:leading-normal">
                  {productDetailsData?.availability}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )
  )
}

export default HelpLineComp
