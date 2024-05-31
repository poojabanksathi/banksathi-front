import Image from 'next/image'
import React from 'react'
import workEnvironment from '../../../../../../public/assets/work-environment.svg'
import attractiveSalaries from '../../../../../../public/assets/attractive-salary.svg'
import healthInsurance from '../../../../../../public/assets/health-insurance.svg'
import leavePolicies from '../../../../../../public/assets/leave-policies.svg'

const WhyBankSathi = () => {
  return (
    <div className='mb-[100px]'>
      <div className='text-center text-neutral-800 text-[46px] font-semibold leading-[64.40px] max-sm:text-[22px]'>
        Why BankSathi
      </div>
      <div className='flex flex-wrap justify-center gap-[30px] ml-[303px] mr-[305px] mt-[20px] max-sm:mx-[16px] max-sm:gap-[20px] max-[771px]:mx-[16px] max-[1024px]:mx-[50px]'>
        <div className='flex flex-col h-[15.625rem] w-[25rem] bg-white rounded-3xl mb-[30px] max-sm:mb-0'>
          <div className='flex items-center justify-center mt-[41px]'>
            <Image src={workEnvironment} height={48} width={58} alt='work culture' />
          </div>
          <div className='flex flex-col justify-center items-center mt-[10px]'>
            <div className='flex items-center justify-center font-[Poppins] text-center text-neutral-800 text-lg font-semibold leading-[25.20px] max-sm:text-[15px] max-sm:leading-[20px]'>
              Best Working Environment
            </div>
            <div className=' flex items-center justify-center font-[Poppins] mx-[35px] text-center text-neutral-800 text-[15px] font-normal leading-normal mt-[11px] max-sm:text-[12px] max-sm:leading-[20px]'>
              Experience the pinnacle of productivity and job satisfaction, where every day is a rewarding journey.
            </div>
          </div>
        </div>
        <div className='flex flex-col h-[15.625rem] w-[25rem] bg-white rounded-3xl mb-[30px] max-sm:mb-0'>
          <div className='flex items-center justify-center mt-[41px]'>
            <Image src={attractiveSalaries} height={48} width={58} alt='work culture' />
          </div>
          <div className='flex flex-col justify-center items-center mt-[10px]'>
            <div className=' flex items-center justify-center font-[Poppins] text-center text-neutral-800 text-lg font-semibold leading-[25.20px] max-sm:text-[15px] max-sm:leading-[20px]'>
              Attractive Salaries
            </div>
            <div className=' flex items-center justify-center font-[Poppins] mx-[35px] text-center text-neutral-800 text-[15px] font-normal leading-normal mt-[11px] max-sm:text-[12px] max-sm:leading-[20px]'>
              Discover the best workspace for your professional growth and success.{' '}
            </div>
          </div>
        </div>
        <div className='flex flex-col h-[15.625rem] w-[25rem] bg-white rounded-3xl mb-[30px] max-sm:mb-0'>
          <div className='flex items-center justify-center mt-[41px]'>
            <Image src={leavePolicies} height={48} width={58} alt='work culture' />
          </div>
          <div className='flex flex-col justify-center items-center mt-[10px]'>
            <div className=' flex items-center justify-center font-[Poppins] text-center text-neutral-800 text-lg font-semibold leading-[25.20px] max-sm:text-[15px] max-sm:leading-[20px]'>
              Amazing leave policies
            </div>
            <div className=' flex items-center justify-center font-[Poppins] mx-[35px] text-center text-neutral-800 text-[15px] font-normal leading-normal mt-[11px] max-sm:text-[12px] max-sm:leading-[20px]'>
              Experience the pinnacle of productivity and job satisfaction, where every day is a rewarding journey.
            </div>
          </div>
        </div>
        <div className='flex flex-col h-[15.625rem] w-[25rem] bg-white rounded-3xl mb-[30px] max-sm:mb-0'>
          <div className='flex items-center justify-center mt-[41px]'>
            <Image src={healthInsurance} height={40} width={50} alt='work culture' />
          </div>
          <div className='flex flex-col justify-center items-center mt-[10px]'>
            <div className=' flex items-center justify-center font-[Poppins] text-center text-neutral-800 text-lg font-semibold leading-[25.20px] max-sm:text-[15px] max-sm:leading-[20px]'>
              Health Insurance
            </div>
            <div className=' flex items-center justify-center font-[Poppins] mx-[35px] text-center text-neutral-800 text-[15px] font-normal leading-normal mt-[11px] max-sm:text-[12px] max-sm:leading-[20px]'>
              Discover the best workspace for your professional growth and success.{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyBankSathi
