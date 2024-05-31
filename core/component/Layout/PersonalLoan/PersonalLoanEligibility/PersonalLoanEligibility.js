import React, { useEffect, useState } from 'react'
import LoanEligibilityForm from './LoanEligibilityForm/LoanEligibilityForm'
import VedioCheck from '@/core/component/common/VedioCheck'
import Image from 'next/image'
import starImage from '../../../../../public/assets/Star-18.svg'
import { eligibilityFeatures } from '@/utils/alljsonfile/personal-loan'
import { useRouter } from 'next/router'
import ParagraphBanner from '../../CategoryParagraphBanner'

const PersonalLoanEligibility = ({ metaResponseData, longTerm }) => {
  const router = useRouter()
  const [formStepper, setFormStepper] = useState(0)

  const getFeaturesSection = () => {
    return eligibilityFeatures?.map((item) => {
      return (
        <div className='flex flex-row gap-x-[12px] mb-[18px] w-full' key={item?.id}>
          <div className='w-[48px] md:w-[34px] h-[31px] p-2 bg-violet-100 rounded-full flex justify-center items-center gap-2'>
            <Image src={starImage} alt='star' width={15} height={15} />
          </div>
          <div className='flex flex-col gap-0 items-start'>
            <div className="text-neutral-800 text-[14px] lg:text-[16px] font-semibold font-['Poppins'] leading-[21px]">
              {item?.title}
            </div>
            <div className="text-neutral-800 text-[12px] lg:text-[14px] font-normal font-['Poppins'] leading-[24px]">
              {item?.subTitle}
            </div>
          </div>
        </div>
      )
    })
  }

  useEffect(() => {
    if (router?.query?.eligible) localStorage.setItem('particularLoanEligibility', true)
    else localStorage.removeItem('particularLoanEligibility')
  }, [router?.query?.eligible])

  return (
    <div className='container h-full mx-auto px-14 max-[1440px]:px-14 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 max-[991px]:max-w-full mt-[px]'>
      <div className=' grid grid-cols-2 gap-[30px] max-[771px]:grid-cols-1 max-[576px]:gap-[28px] mb-[20px]'>
        <div className='flex flex-col'>
          <div>
            <ParagraphBanner metaResponseBanner={metaResponseData} />
          </div>
          {/*
          <div className='mt-[10px]'>
            <LoanEligibleIcons formStepper={formStepper} />
          </div> */}
          <Image
            src='/assets/eligibility-personal.svg'
            height={281}
            width={300}
            alt='eligibility'
            className='my-[30px] max-sm:hidden max-[768px]:hidden'
          />
          <div className='max-sm:hidden max-[768px]:hidden'>{getFeaturesSection()}</div>
        </div>
        <div className=''>
          <LoanEligibilityForm formStepper={formStepper} setFormStepper={setFormStepper} />
        </div>
        <Image
          src='/assets/eligibility-personal.svg'
          height={281}
          width={300}
          alt='eligibility'
          className='my-[30px] lg:hidden'
        />
        <div className='lg:hidden'>{getFeaturesSection()}</div>
      </div>
      <div className='mt-[10px]'>
        <VedioCheck
          productDetailsData={longTerm}
          title={'Find Your Perfect Personal Loan Companion with Us- No Hassle, Just the Best Recommendations!'}
        />
      </div>
    </div>
  )
}

export default PersonalLoanEligibility
