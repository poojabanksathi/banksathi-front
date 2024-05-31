import Image from 'next/image'
import React from 'react'

const BottomInfoComp = () => {
  const mockInfo = [
    {
      id: '1',
      image: '/assets/quick-results.svg',
      title: 'Quick Results',
      subTitle: 'Provide a few details & get loan suggestions according to your needs and preferences'
    },
    {
      id: '2',
      image: '/assets/compare-and-apply.svg',
      title: 'Compare & Apply',
      subTitle: 'Explore, compare & choose loan that aligns seamlessly with your financial requirements.'
    },
    {
      id: '3',
      image: '/assets/data-privacy.svg',
      title: 'Data Privacy',
      subTitle: 'Your data remains secure; we uphold strict privacy standards and do not share it with third parties.'
    }
  ]
  return (
    <div className='mt-[20px] flex flex-row max-sm:flex-col items-center justify-center gap-x-[50px] max-sm:gap-[30px]'>
      {mockInfo?.map((item) => {
        return (
          <div className='flex flex-col items-center justify-center' key={item?.id}>
            <Image src={item?.image} height={110} width={110} alt='inforimage' />
            <div className="text-center text-neutral-800 text-lg max-sm:text-[18px] font-medium font-['Poppins'] leading-[25.20px] mt-[16px]">
              {item?.title}
            </div>
            <div className=" text-center text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-[21px] mt-[12px]">
              {item?.subTitle}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BottomInfoComp
