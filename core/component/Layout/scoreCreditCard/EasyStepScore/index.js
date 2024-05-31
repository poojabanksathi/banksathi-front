import Image from 'next/image'
import React from 'react'
import stepScorone from '../../../../../public/assets/scoreStepOne.svg'
import VerifyOtp from '../../../../../public/assets/verify-otp.svg'
import stepThreeScore from '../../../../../public/assets/stepThreeScore.svg'
import dynamic from 'next/dynamic'

const CheckWhy = dynamic(() => import('@/core/component/Layout/scoreCreditCard/CheckWhy'), {
  ssr: false
})

function EasyStepScore() {
  return (
    <>
      <div className='bg-[#F4F8FB] text-[#212529] h-full  pb-[100px] max-[771px]:py-[50px] max-[576px]:h-full'>
        <div className='container mx-auto max-[991px]:max-w-full max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
          <div
            className={` bg-[#fff] w-[91%] max-[1200px]:w-[90%] max-[834px]:w-full max-[479px]:gap-4 text-[#212529] relative bottom-24 max-[771px]:bottom-36 max-sm:bottom-[5rem] h-auto items-center rounded-xl  max-[771px]:px-8 px-8 py-8 max-[1024px]:px-8 max-[576px]:h-full max-[576px]:flex-col max-[576px]:gap-8  max-[576px]:py-8 max-[479px]:px-4 max-[479px]:py-6 max-[375px]:px-4 max-[320px]:px-4 z-[1] mx-auto ${
              scrollY > 0 ? 'score-banner-top' : 'score-banner-bottom'
            }`}>
            <p className='head-text font-[faktum] story-text text-[#212529] pb-2 text-[24px] max-[320px]:text-[20px] mb-4 relative text-center'>
              In just 3 easy steps
            </p>
            <div className='grid grid-cols-3 max-[1200px]:gap-4 max-[576px]:grid-cols-1 font-[Poppins] gap-12 max-[1440px]:gap-8 max-[834px]:gap-4'>
              <div className='w-auto max-[1220px]:w-full h-full border max-[834px]:p-4 border-[#E6ECF1] rounded-2xl p-7 '>
                <div>
                  <Image src={stepScorone} className='mx-auto pb-4' alt='image' />
                  <p className='text-[15px] max-[771px]:text-[14px] text-center text-[#212529]'> STEP 01 </p>
                  <p className='text-[18px] max-[771px]:text-[16px] text-center text-[#212529] font-semibold leading-8 max-[834px]:leading-6 mt-0'>
                    {' '}
                    Enter your Details{' '}
                  </p>
                </div>
              </div>
              <div className='w-auto max-[1220px]:w-full h-full border max-[834px]:p-4 border-[#E6ECF1] rounded-2xl p-7 '>
                <div>
                  <Image src={VerifyOtp} className='mx-auto pb-4' alt='image' />
                  <p className='text-[15px] max-[771px]:text-[14px] text-center text-[#212529]'> STEP 02 </p>
                  <p className='text-[18px] max-[771px]:text-[16px] text-center text-[#212529] font-semibold leading-7 mt-0 w-[68%] max-[1200px]:w-[80%] max-[1024px]:w-full mx-auto max-[834px]:leading-6'>
                    {' '}
                    Verify with OTP & Login
                  </p>
                </div>
              </div>
              <div className='w-auto max-[1220px]:w-full h-full border max-[834px]:p-4 border-[#E6ECF1] rounded-2xl p-7 '>
                <div>
                  <Image src={stepThreeScore} className='mx-auto pb-4' alt='image' />
                  <p className='text-[15px] max-[771px]:text-[14px] text-center text-[#212529]'> STEP 03 </p>
                  <p className='text-[18px] max-[771px]:text-[16px] text-center text-[#212529] font-semibold leading-8 mt-0 max-[834px]:leading-6'>
                    {' '}
                    Your Credit Score will be ready in a blink{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <CheckWhy />
        </div>
      </div>
    </>
  )
}

export default EasyStepScore
