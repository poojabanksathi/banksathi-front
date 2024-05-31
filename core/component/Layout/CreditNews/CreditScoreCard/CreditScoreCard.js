import React from 'react'
import outerCircle from '../../../../../public/assets/outer-circle.svg'
import innerCircleImage from '../../../../../public/assets/inner-circle-image.svg'
import Image from 'next/image'
import Link from 'next/link'

const CreditScoreCard = ({ isFromDetails = false,savingCal }) => {
  return (
    <div className={`'container ${savingCal?'mt-0':'mt-[2rem]'}  w-full  mb-2 h-full h-autp max-[1440px]:px-[6px] max-[1200px]:px-4 max-[1024px]:px-0  mx-auto   '`}>
      <div className='bg-[#EDE3FD]  rounded-xl px-[20px] max-sm:px-0 '>
        <div className='flex flex-col gap-[24px] justify-between items-center py-[40px] '>
          <div className=' relative'>
            <Image src={outerCircle} width={'150px'} height={'140px'} alt='rounded circle' />
            <Image
              src={innerCircleImage}
              width={'101px'}
              height={'101px'}
              className='absolute top-5 right-5'
              alt='inner circle'
            />
          </div>
          <div className={isFromDetails ? 'px-[10px] gap-[10px]' : 'px-[20px] gap-[10px]'}>
            <div>
              <h2 className='font-poppins font-bold text-[18px] leading-7 text-center text-[#212529]'>
                Check Credit Score for Free
              </h2>
              <p className='font-poppins font-normal text-[15px] leading-5 text-center text-[#212529] mt-[6px]'>
                Get clear understanding of your creditworthiness & financial health
              </p>
            </div>
            <div className='mt-[20px] text-center mx-auto '>
              <Link href='/cibil-credit-score-check'>
                <button className='bg-[#49D49D] w-[248px] h-[42px] rounded-md font-faktum font-semibold text-[15px] leading-[18px] tracking-wide text-[#212529]'>
                  Check Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditScoreCard
