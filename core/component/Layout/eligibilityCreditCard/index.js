import React, { useMemo, useState } from 'react'
import EligibilityBanner from '../../../../public/assets/eligbilileSliderImg.svg'
import sliderLine from '../../../../public/assets/sliderLine.svg'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useWindowSize } from '@/hooks/useWindowSize'

// const EligibilityCredit = dynamic(() => import('/EligibilityCredit'), {
//   ssr: false
// })

const CategoryParagraphBanner = dynamic(() => import('@/core/component/Layout/CategoryParagraphBanner'), {
  ssr: false
})
const EligibilityFormVerification = dynamic(
  () => import('@/core/component/Layout/EligibilityFormVerification/EligibilityFormVerification'),
  {
    ssr: false
  }
)
// const EligibilityFormPersonal = dynamic(() => import('@/core/component/Layout/EligibilityFormPersonalInfo'), {
//   ssr: false
// })
// const EligibilityFormProfessional = dynamic(() => import('@/core/component/Layout/EligibilityFormProfessional'), {
//   ssr: false
// })

export const EligbilitySliderVerification = ({ formDataChange, setVerificationStep }) => {
  return (
    <>
      {formDataChange === 1 && (
        <div className='w-[300px] max-sm:w-[100%] max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center'>
          <Image src={EligibilityBanner} alt='slider' width={70} height={40} />
          <div className='leading-[25px]  pt-[24px] '>
            <p className='text-[15px] font-medium  text-[#212529] font-[poppins] text-justify'>
              No credit score impact
            </p>
          </div>
          <div className='leading-[21px text-center pt-[12px]'>
            <p className='text-[15px] font-normal  text-[#212529] font-[poppins] text-justify'>
              Rest assured that your credit score will not be impacted as we perform a soft credit check.
            </p>
          </div>
          <div className='flex flex-start gap-[10px] pt-[30px] max-sm:pt-[24px]'>
            <Image src={sliderLine} alt='line' width={'40px'} height={0} />
            <Image src={sliderLine} alt='line' width={'40px'} height={0} />

            <Image src={sliderLine} alt='line' width={'40px'} height={0} />
          </div>
        </div>
      )}
    </>
  )
}
export const EligbilitySliderPersonal = ({ formDataChange }) => {
  return (
    <>
      {/* {formDataChange===2 && ( */}
      <div className='w-[300px] max-sm:w-[100%] max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center'>
        <Image src={EligibilityBanner} alt='slider' width={70} height={40} />
        <div className='leading-[25px] text-center pt-[26px] max-sm:pt-[24px]'>
          <p className='text-[15px] font-medium  text-[#212529] font-[poppins] text-justify'>
            Your Data is safe with us
          </p>
        </div>
        <div className='leading-[21px text-center pt-[12px]'>
          <p className='text-[15px] font-normal  text-[#212529] font-[poppins] text-justify'>
            We use 256-bit encryption for your personal information and data.
          </p>
        </div>
        <div className='flex flex-start gap-[10px] pt-[30px] max-sm:pt-[24px]'>
          <Image src={sliderLine} alt='line' width={'40px'} height={0} />
          <Image src={sliderLine} alt='line' width={'40px'} height={0} />

          <Image src={sliderLine} alt='line' width={'40px'} height={0} />
        </div>
      </div>
      {/* )} */}
    </>
  )
}
export const EligbilitySliderProfessional = ({ formDataChange }) => {
  return (
    <>
      {/* {formDataChange===3 && ( */}
      <div className='w-[300px] max-sm:w-[100%] max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center'>
        <Image src={EligibilityBanner} alt='slider' width={70} height={40} />
        <div className='leading-[25px] text-justify pt-[26px] max-sm:pt-[24px]'>
          <p className='text-[15px] font-medium  text-[#212529] font-[poppins] text-justify'>
            Check Your Personalized Offers
          </p>
        </div>
        <div className='leading-[21px text-justify pt-[12px]'>
          <p className='text-[15px] font-normal  text-[#212529] font-[poppins] text-justify'>
            Discover exclusive deals and pre-qualified matches tailored to your credit profile.
          </p>
        </div>
        <div className='flex flex-start gap-[10px] pt-[30px] max-sm:pt-[24px]'>
          <Image src={sliderLine} alt='line' width={'40px'} height={0} />
          <Image src={sliderLine} alt='line' width={'40px'} height={0} />

          <Image src={sliderLine} alt='line' width={'40px'} height={0} />
        </div>
      </div>
      {/* )} */}
    </>
  )
}

function EligibilityCreditCard({ productList, metaResponseData }) {
  const size = useWindowSize()
  const [verificationStep, setVerificationStep] = useState(true)
  const [personalStep, setPersonalStep] = useState(false)

  const [professionalStep, setProfessionalStep] = useState(false)
  const [formDataChange, setFormDataChange] = useState(1)

  const windowSize = useMemo(() => {
    return size?.width
  }, [size?.width])

  const isDesktop = windowSize >= 768
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  return (
    <>
      <div className='container bg-[#F4F8FB] mx-auto px-14 max-[991px]:max-w-full max-[1440px]:px-12 max-md:px-8  max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4 h-auto  pt-[20px] pb-[60px] justify-around max-[576px]:pt-[10px] max-[576px]:pb-[30px] max-[479px]:pt-4 max-[479px]:pb-10 max-[479px]:h-auto'>
        <div className=' grid grid-cols-2 gap-[30px] max-[771px]:grid-cols-1 max-[576px]:gap-[28px] '>
          <div className='flex flex-col'>
            <h1 className='sm:text-[28px] max-sm:text-[24px] max-xs:text-[18px] font-semibold  text-[#212529] sm:leading-[50px] max-sm:leading-[33px]  font-[poppins]'>
              Are you eligible? Let’s check!
            </h1>
            <div>
              <CategoryParagraphBanner
                metaResponseBanner={metaResponseData}
                linesToShow={2}
                // src={`${Img_URL}/${metaResponseData?.metaResponse?.h1_paragraph?.sub_category_image}`}
              />
            </div>
            {isDesktop && formDataChange === 1 && (
              <div className=''>
                <EligbilitySliderVerification formDataChange={formDataChange} setFormDataChange={setFormDataChange} />
              </div>
            )}
            {isDesktop && formDataChange === 2 && (
              <EligbilitySliderPersonal formDataChange={formDataChange} setFormDataChange={setFormDataChange} />
            )}

            {isDesktop && formDataChange === 3 && (
              <EligbilitySliderProfessional formDataChange={formDataChange} setFormDataChange={setFormDataChange} />
            )}
            {/* {isDesktop && personalStep && (
              <EligbilitySliderPersonal formDataChange={formDataChange}
              setFormDataChange={setFormDataChange} />
            )}

            {isDesktop && professionalStep && (
              <EligbilitySliderProfessional
              formDataChange={formDataChange}
              setFormDataChange={setFormDataChange}
              />
            )} */}
          </div>

          <div>
            <div className='w-full h-auto bg-white rounded-[24px] shadow-lg   pt-[40px] px-[80px] pb-[50px] max-[1024px]:px-[50px] max-[834px]:p-[30px] max-[479px]:py-4 max-[479px]:px-4 '>
              {/* <EligibilityCredit productList={productList} /> */}
              {verificationStep && (
                <EligibilityFormVerification formDataChange={formDataChange} setFormDataChange={setFormDataChange} productList={productList}/>
              )}
              {/* {personalStep && (
                <EligibilityFormPersonal personalStep={personalStep} setPersonalStep={setPersonalStep} />
              )}
              {professionalStep && (
                <EligibilityFormProfessional
                  professionalStep={professionalStep}
                  setProfessionalStep={setProfessionalStep}
                />
              )} */}
            </div>
          </div>
          {!isDesktop && formDataChange === 1 && (
            <EligbilitySliderVerification formDataChange={formDataChange} setFormDataChange={setFormDataChange} />
          )}
          {!isDesktop && formDataChange === 2 && (
            <EligbilitySliderPersonal formDataChange={formDataChange} setFormDataChange={setFormDataChange} />
          )}

          {!isDesktop && formDataChange === 3 && (
            <EligbilitySliderProfessional formDataChange={formDataChange} setFormDataChange={setFormDataChange} />
          )}
        </div>
      </div>
    </>
  )
}

export default EligibilityCreditCard
