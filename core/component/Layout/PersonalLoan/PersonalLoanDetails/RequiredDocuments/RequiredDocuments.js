import React from 'react'

const RequiredDocuments = ({ length, firstFive, others }) => {
  return (
    (firstFive || others) && (
      <div className='flex flex-col items-start justify-start lg:p-[30px] p-[16px] w-full'>
        <div className="text-neutral-800  text-[15px] lg:text-lg font-semibold font-['Poppins'] leading-relaxed">
          Required Documents
        </div>
        <div className={`mt-[16px] ${length > 5 ? 'grid grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-x-[6rem]`}>
          <div>
            {firstFive?.map((item, index) => {
              return (
                <div className='flex gap-x-[15px] lg:mb-[15px] mb-[10px] items-center justify-center' key={item?.id}>
                  <div className='bg-[#EEE3FF] lg:w-[29px] w-[25px] rounded-full'>
                    <div className="text-neutral-800 text-[12px] lg:text-md  font-normal font-['Poppins'] leading-[21px] text-center">
                      {index + 1}
                    </div>
                  </div>
                  <div className="w-full text-neutral-800 text-[12px] lg:text-[15px] font-normal font-['Poppins'] leading-[21px]">
                    {item}
                  </div>
                </div>
              )
            })}
          </div>
          <div>
            {others?.map((item, index) => {
              return (
                <div className='flex gap-x-[15px] lg:mb-[15px] mb-[10px] items-center justify-center' key={item?.id}>
                  <div className='bg-[#EEE3FF] lg:w-[29px] w-[25px] rounded-full'>
                    <div className="text-neutral-800 text-[12px] lg:text-md font-normal font-['Poppins'] leading-[21px] text-center">
                      {index + 6}
                    </div>
                  </div>
                  <div className="w-full text-neutral-800 text-[12px] lg:text-[15px] font-normal font-['Poppins'] leading-[21px]">
                    {item}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  )
}

export default RequiredDocuments
