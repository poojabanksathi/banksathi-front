import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import LeadStepperButton from './LeadStepperButton'
import { MainContext } from './MainContext'
import SuccessIcon from '../../../public/assets/eligibility-seccess.svg'
import rightArrow from '../../../public/assets/rightArrow.svg'

function ApplicationSuccessFull({ props }) {
  const router = useRouter()

  const handleroute = () => {
    router.push('/')
  }

  const productData = useContext(MainContext)

  return (
    <>
      <div>
        <div className='pb-[30px]'>
          <Image src={SuccessIcon} alt='img' width={100} height={80} className='mx-auto pb-5 ' />
          <p className='head-text xl:text-4xl lg:text-3xl md:text-2xl text-[#212529]  max-[576px]:text-[28px] max-[479px]:text-[22px] max-[479px]:w-[100%] max-[479px]:mx-auto max-[320px]:text-[19px] text-center'>
            Application Successful
          </p>
        </div>
        {/* <div className='bg-[#844FCF] w-full h-full mx-auto rounded-2xl p-14 max-[576px]:p-7'>
          <div className='pb-[21px]'>
            <p className='text-[14px] font-normal text-white pb-1 max-[479px]:text-[13px]'>Card name</p>
            <p className='text-[18px] font-semibold text-white mt-0 max-[479px]:text-[17px] max-[375px]:text-[16px]'>
              {productData.product_details.card_name}
            </p>
          </div>
          <div className='pb-[21px]'>
            <p className='text-[14px] font-normal text-white pb-1 max-[479px]:text-[13px]'>Reward Value</p>
            <p className='text-[18px] font-semibold text-white mt-0 max-[479px]:text-[17px] max-[375px]:text-[16px]'>
              ₹ 12,999
            </p>
          </div>
          <div className='pb-[21px]'>
            <p className='text-[14px] font-normal text-white pb-1 max-[479px]:text-[13px]'>Annual Fee</p>
            {productData.product_details?.annual_fee == 0 ? (
              <p className='text-[18px] font-semibold text-white mt-0 max-[479px]:text-[17px] max-[375px]:text-[16px]'>
                Free
              </p>
            ) : (
              <p className='text-[18px] font-semibold text-white mt-0 max-[479px]:text-[17px] max-[375px]:text-[16px]'>
                &#8377; {productData.product_details?.annual_fee}
              </p>
            )}
          </div>
          <div>
            <p className='text-[14px] font-normal text-white pb-1 max-[479px]:text-[13px]'>Approval Chances</p>
            <p className='text-[18px] font-semibold text-white mt-0 max-[479px]:text-[17px] max-[375px]:text-[16px]'>
              Excellent
            </p>
          </div>
        </div> */}
        <div className='mt-10 text-center'>
          <Link className='text-center' href='/' prefetch={false}>
            <button className='flex cursor-pointer items-center gap-4 mx-auto head-text py-3 px-4 text-[18px] max-[479px]:text-[16px] max-[320px]:text-[14px] bg-[#49d49d]  w-auto rounded-lg text-[#212529] border border-[#49d49d] font-semibold '>
              Go back to the homepage
              <Image
                src={rightArrow}
                alt='img'
                className='w-[34px] h-[20px] max-[1024px]:w-[26px] max-[1024px]:h-[20px]'
                height={40}
                width={50}
              />
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ApplicationSuccessFull
