import React from 'react'
import LoanRupee from '../../../../public/assets/loan-rupee-icon.svg'
import Image from 'next/image'
import Link from 'next/link'
import { CardCalculatorJson } from '@/utils/alljsonfile/cardcalculator'

function CalculatorCards() {
  return (
    <>
      <div className='container h-full  mx-auto max-[991px]:max-w-full py-[80px]  max-[834px]:py-[35px] max-[576px]:py-[52px] max-[479px]:py-[20px] max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
        <div className=' px-20 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-0 max-[576px]:gap-8 max-[479px]:px-0 '>
          <div className='grid grid-cols-4 gap-[30px] max-[834px]:grid-cols-2'>
            <div className='col-span-2 bg-white rounded-3xl  p-[30px] hover:shadow-lg duration-200 h-full max-[479px]:gap-[20px] calc-box-bg'>
              <div className='pb-[60px] max-[576px]:pb-[30px] image-box-cal'>
                <Image
                  src={LoanRupee}
                  alt='icon'
                  className='w-[85px] h-[85px] max-[576px]:w-[60px] max-[576px]:h-[60px] calc-icon-card'
                />
              </div>
              <div>
                <p className='text-head text-[20px] font-semibold leading-[25px] pb-5 calc-card-text'>
                  Loan EMI Calculator
                </p>
                <Link
                  href='/calculators/loan-emi-calculator'
                  prefetch={false}
                  className='text-[#212529] text-center hover:text-white '>
                  <button className='!text-[#212529] cursor-pointer hover:!text-white duration-300 hover:border-[#49d49d] mb-2 hover:bg-[#49d49d]  head-text font-[faktum] text-[15px] px-6 py-2  w-auto h-full font-semibold border rounded-lg border-[#212529]  '>
                    Try Now
                  </button>
                </Link>
              </div>
            </div>
            {CardCalculatorJson?.map((cardData, index) => {
              return (
                <div key={index}>
                  <div className='bg-white rounded-3xl p-[30px] hover:shadow-lg duration-200 h-full max-[479px]:p-4 calc-box-bg flex flex-col justify-between calc-card-text'>
                    <div className='pb-[60px] max-[576px]:pb-[30px] image-box-cal'>
                      <Image
                        src={`${cardData?.cardIcon}`}
                        alt='icon'
                        width={85}
                        height={85}
                        className='w-[85px] h-[85px] max-[576px]:w-[60px] max-[576px]:h-[60px] max-[576px]:mx-auto calc-icon-card'
                      />
                    </div>
                    <div className='max-[576px]:text-center'>
                      <p className='text-head text-[20px] font-semibold leading-[25px] pb-5 max-[576px]:text-[18px] max-[479px]:text-[15px] calc-card-text'>
                        {cardData?.cardTitle}
                      </p>
                    </div>
                    <div className='max-[576px]:text-center'>
                      <Link
                        href={`/calculators/${cardData?.linkpage}`}
                        prefetch={false}
                        className='text-[#212529] hover:text-white '>
                        <button className='!text-[#212529] cursor-pointer hover:!text-white duration-300 hover:border-[#49d49d] mb-2 hover:bg-[#49d49d]  head-text font-[faktum] text-[15px] px-6 py-2  w-auto h-full font-semibold border rounded-lg border-[#212529] max-[479px]:text-[14px] '>
                          {cardData?.cardtrybutton}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default CalculatorCards
