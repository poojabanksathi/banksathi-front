import Image from 'next/image'
import React from 'react'
import Card_image_loan from '../../../../../../public/assets/card-img-loan-calc.png'
import Link from 'next/link'

function EmiSliderRightPanel() {
  return (
    <div>
      <div className='h-[357px] bg-[#DEF7ED] rounded p-[30px] max-sm:p-[20px] insured-now-box'>
        <div className='flex justify-center'>
          <Image src={Card_image_loan} width={180} height={161} alt='load-card' />
        </div>
        <div className='text-center'>
          <h6 className='text-[18px] font-bold text-[#212529]'>Get Insured now</h6>
          <p className='pt-[7px]'>Don&apos;t wait for the unexpected: Secure your future today</p>
          <Link href={"/credit-cards"}>
          <button className='bg-[#49D49D] cursor-pointer text-[15px] text-[#212529] px-[20px] py-[15px] mt-[20px] w-full rounded-[8px]'>
            Explore Products
          </button>
          </Link>
        </div>
      </div>
      <div className='h-[190] bg-white rounded-xl mt-5'>
        <div className=''>
          <div className='border-b-[1px] h-[50px] border-[#E6ECF1]'>
            <h6 className='text-[15px] font-semibold py-3 pl-5 text-[#212529]'>Popular Calculators</h6>
          </div>
          <div className='listCibil pl-10 pr-6 py-4'>
            <ul>
              <ul>
                <Link href={'/calculators/home-loan-calculator'} prefetch={false}>
                  <li className='text-[#212529] text-[15px] font-medium pb-1'>Home Loan Calculator</li>
                </Link>
                <Link href={'/calculators/personal-loan-calculator'} prefetch={false}>
                  <li className='text-[#212529] text-[15px] font-medium pb-1'>Personal Loan Calculator </li>
                </Link>
                <Link href={'/calculators/car-loan-calculator'} prefetch={false}>
                  <li className='text-[#212529] text-[15px] font-medium pb-1'>Car Loan Calculator</li>
                </Link>
              </ul>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default EmiSliderRightPanel
