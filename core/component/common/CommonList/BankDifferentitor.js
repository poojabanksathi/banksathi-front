import React from 'react'
import Lockicon from '../../../../public/assets/lockicon.svg'
import SpamCall from '../../../../public/assets/spam-call.svg'
import PressurizationGoal from '../../../../public/assets/pressurization-goal.svg'
import Image from 'next/image'

function BankDifferentitor() {
  return (
    <>
      <div className='pb-[80px] max-[576px]:!pb-[40px] max-[479px]:!pb-[30px] different-bank'>
        <div className='pb-4'>
          <h2 className='head-text font-[faktum] text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[24px] max-[375px]:text-[24px] max-[320px]:text-[22px] text-center font-semibold  text-[#212529] max-[479px]:leading-8 w-[50%]  max-[1440px]:w-[54%] max-[1200px]:w-[80%] max-[576px]:w-full mx-auto leading-[64.4px] max-[576px]:leading-[50.2px] max-[479px]:leading-10 bankdifferent-title'>
            BankSathi’s Differentiator: Providing consumers with best deals for wealth creation.
          </h2>
          <p className='text-[18px] font-[Poppins] w-[40%] mx-auto text-center pt-4 max-[1600px]:text-[16px] max-[1200px]:w-3/6 max-[576px]:w-[85%] max-[479px]:w-full max-[479px]:text-[15px] text-[#212529]'>
            We advocate our users to financial institutions for getting the best in class deals that enable wealth
            creation.
          </p>
        </div>

        <div className='grid grid-cols-3 justify-center px-20 gap-12 mx-auto rounded-lg max-[1200px]:gap-4 pt-16 w-full max-[1440px]:w-full max-[1200px]:px-0 max-[1200px]:w-full max-[576px]:grid-cols-1 max-[576px]:gap-12 max-[479px]:gap-12 max-[479px]:pt-8'>
          <div>
            <div className='w-full max-[1440px]:w-[360px] h-full max-[1200px]:w-[330px] max-[1024px]:w-full bg-[#fff] p-12 max-[576px]:py-10 rounded-2xl relative  max-[771px]:p-6 home-box-cards'>
              <Image
                src={Lockicon}
                className='w-[130px] h-[110px] max-[771px]:w-[90px] max-[771px]:h-[90px] mx-auto absolute top-[-25%] left-0 right-0 max-[479px]:w-[85px] max-[479px]:h-[85px] max-[479px]:top-[-35px]'
                alt='img'
              />
              <div className='mt-10 text-center'>
                <p className='text-[15px] font-[Poppins] font-medium max-[479px]:text-[13px] text-[#212529] max-[375px]:w-[80%] mx-auto'>
                  Have access to the platform without any charge
                </p>
              </div>
            </div>
          </div>
          <div className='w-full max-[1440px]:w-[360px] h-full max-[1200px]:w-[330px] max-[1024px]:w-full bg-[#fff] p-12 max-[820px]:p-6 max-[576px]:py-10 rounded-2xl relative max-[771px]:p-6 home-box-cards'>
            <Image
              src={SpamCall}
              className='w-[130px] h-[110px] max-[771px]:w-[90px] max-[771px]:h-[90px] mx-auto absolute top-[-25%] left-0 right-0 max-[479px]:w-[85px] max-[479px]:h-[85px] max-[479px]:top-[-35px]'
              alt='img'
            />
            <div className='mt-10 text-center'>
              <p className='text-[15px] font-[Poppins] font-medium  max-[479px]:text-[13px] text-[#212529]'>
                No spam calls
              </p>
            </div>
          </div>
          <div className='w-full max-[1440px]:w-[360px] h-full max-[1200px]:w-[330px] max-[1024px]:w-full bg-[#fff] p-12 max-[820px]:p-6 max-[576px]:py-10 rounded-2xl relative max-[771px]:p-6 home-box-cards'>
            <Image
              src={PressurizationGoal}
              className='w-[130px] max-[771px]:w-[90px] max-[771px]:h-[90px] h-[110px] mx-auto absolute top-[-25%] left-0 right-0 max-[479px]:w-[85px] max-[479px]:h-[85px] max-[479px]:top-[-35px]'
              alt='img'
            />
            <div className='mt-10 text-center'>
              <p className='text-[15px] font-[Poppins] font-medium  max-[479px]:text-[13px] text-[#212529]'>
                Create awareness without pressure - your goal, your choice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BankDifferentitor
