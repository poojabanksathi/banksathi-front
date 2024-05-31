import Image from 'next/image'
import React from 'react'

const LoanFeatures = ({ features, benefits }) => {
  return (
    (features || benefits) && (
      <div className='flex flex-col items-start justify-start lg:py-[30px] lg:px-[20px] p-[16px] w-full'>
        <div className="text-neutral-800 lg:text-lg font-semibold font-['Poppins'] leading-relaxed text-[15px] ">
          Features and benefits
        </div>
        {features && features?.length > 0 && (
          <div className='flex flex-row items-start justify-start gap-x-[10.4px] mt-[16px] w-full overflow-x-scroll category-btn-scroll mb-[22px]'>
            {features?.map((item, index) => {
              return (
                <div
                  key={index}
                  className='lg:w-[200px] h-[58px]  w-full px-[15px] py-[13px] bg-violet-100 rounded-lg flex justify-center items-center gap-[9px]'>
                  <div className="max-sm:w-[130px] md:w-[140px] text-black text-[13px] text-center font-normal font-['Poppins'] leading-[18px]">
                    {item}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {benefits && benefits?.length > 0 && (
          <>
            <div className='border-b w-full border-slate-200 lg:mb-[27px] mb-[20px]' />
            <div className='flex flex-row flex-wrap items-start justify-start gap-x-[20px] gap-y-[16px]'>
              {benefits?.map((item, index) => {
                return (
                  <div className='flex gap-[8px] items-center justify-center w-auto' key={index}>
                    <Image src='/assets/purple-check.svg' alt='check circle' height={16} width={16} className='' />
                    <div className="text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-relaxed">
                      {item}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    )
  )
}

export default LoanFeatures
