import Image from 'next/image'
import React from 'react'
import Card_image_loan from '../../../../../../public/assets/card-img-loan-calc.png'
import Link from 'next/link'

function EmiSliderRightPanel() {
  return (
    <div className='flex flex-col gap-[30px]'>
      <div className='h-[357px] bg-[#DEF7ED] rounded p-[30px] max-sm:p-[20px] insured-now-box'>
        <div className='flex justify-center'>
          <Image src={Card_image_loan} width={180} height={161} alt='load-card' />
        </div>
        <div className='text-center'>
          <h6 className='text-[18px] font-medium text-[#212529]'>Get Insured now</h6>
          <p className='pt-[7px] font-[15px] text-[#545454]'>Don't wait for the unexpected: Secure your future today</p>
          <Link href={"/credit-cards"}>
          <button className='bg-[#49D49D] cursor-pointer font-semibold text-[15px] text-[#212529] px-[20px] py-[15px] mt-[20px] w-full rounded-[8px]'>
            Explore Products
          </button>
          </Link>
        </div>
      </div>
      <div className='h-auto bg-white rounded-2xl '>
        <div className=''>
          <div className='border-b-[1px] py-4 px-[30px] border-[#E6ECF1]'>
            <h6 className='text-[15px] font-semibold  text-[#212529]'>Popular Calculators</h6>
          </div>
          <div className='listCibil pl-10 pr-6 py-4'>
            <ul>
              <ul>
                <Link href={'/calculators/home-loan-calculator'} prefetch={false}>
                  <li className='text-[#212529] text-[15px] font-normal pb-1'>Home Loan Calculator</li>
                </Link>
                <Link href={'/calculators/personal-loan-calculator'} prefetch={false}>
                  <li className='text-[#212529] text-[15px] font-normal pb-1'>Personal Loan Calculator </li>
                </Link>
                <Link href={'/calculators/car-loan-calculator'} prefetch={false}>
                  <li className='text-[#212529] text-[15px] font-normal pb-1'>Car Loan Calculator</li>
                </Link>
              </ul>
            </ul>
          </div>
        </div>
      </div>
      <div className='h-auto bg-white rounded-2xl '>
        <div className=''>
          <div className='border-b-[1px] py-4 px-[30px] border-[#E6ECF1]'>
            <h6 className='text-[15px] font-semibold  text-[#212529]'>More EMI Calculators</h6>
          </div>
          <div className='listCibil pl-10 pr-6 py-4'>
            <ul>
              <ul>
                <Link href={'/calculators/epf-calculator'} prefetch={false}>
                  <li className='text-[#212529] text-[15px] font-normal pb-1'>EPF Calculator</li>
                </Link>
                <Link href={'/calculators/mortgage-loan-calculator'} prefetch={false}>
                  <li className='text-[#212529] text-[15px] font-normal pb-1'>Mortgage Calculator </li>
                </Link>
                <Link href={'/calculators/Income-tax-calculator'} prefetch={false}>
                  <li className='text-[#212529] text-[15px] font-normal pb-1'>Income Tax Calculator</li>
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
