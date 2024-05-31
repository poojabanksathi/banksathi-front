import React from 'react'
import Image from 'next/image'
import { firstFive, others, secondSix, thirdFive, toolCards } from '@/utils/alljsonfile/partnerBrand'
import { useRouter } from 'next/router'

const TrustedPartner = ({ isDesktop }) => {
  const router = useRouter()
  const mobileArray = [...firstFive, ...others]
  const getMobileTools = () => {
    return (
      <>
        <div className='pb-8'>
          <h2 className='font-normal text-[#212529]  font-[faktum] max-[771px]:text-[28px] max-[576px]:text-[24px] max-[479px]:text-[20px]  max-[375px]:text-[18px] max-[320px]:text-[15px] text-center font-semibold max-[479px]:leading-6 max-[320px]:leading-8 max-[280px]:text-[13px]'>
            Our tool, your Savings
          </h2>
          <div className='flex flex-col items-center justify-center gap-[20px] pt-[20px]'>
            <div
              onClick={() => router.push({ pathname: toolCards?.[0]?.urlSlug })}
              className='bg-white rounded-[24px] cursor-pointer w-full p-[24px] hover:shadow-lg duration-200 h-full max-[479px]:px-[24px] calc-box-bg flex flex-col justify-start items-center calc-card-text'>
              <div className='pb-[60px] max-[576px]:pb-[30px] image-box-cal '>
                <Image
                  src={`${toolCards?.[0]?.cardIcon}`}
                  alt='icon'
                  width={85}
                  height={85}
                  className='w-[85px] h-[85px] max-[576px]:w-[60px] max-[576px]:h-[60px] max-[576px]:mx-auto calc-icon-card'
                />
              </div>
              <div className='max-[576px]:text-left'>
                <p className='text-head text-[20px] !text-[#212529] font-semibold leading-[25px] max-[576px]:text-[18px] max-[479px]:text-[15px] calc-card-text'>
                  {toolCards?.[0]?.cardTitle}
                </p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-[20px]'>
              <div
                onClick={() => router.push({ pathname: toolCards?.[1]?.urlSlug })}
                className='bg-white rounded-[24px] cursor-pointer w-full p-[24px] hover:shadow-lg duration-200 h-full max-[479px]:px-[24px] calc-box-bg flex flex-col justify-start items-center calc-card-text'>
                <div className='pb-[60px] max-[576px]:pb-[30px] image-box-cal '>
                  <Image
                    src={`${toolCards?.[1]?.cardIcon}`}
                    alt='icon'
                    width={85}
                    height={85}
                    className='w-[85px] h-[85px] max-[576px]:w-[60px] max-[576px]:h-[60px] max-[576px]:mx-auto calc-icon-card'
                  />
                </div>
                <div className='max-[576px]:text-left'>
                  <p className='text-head text-[20px] !text-[#212529] font-semibold leading-[25px] max-[576px]:text-[18px] max-[479px]:text-[15px] calc-card-text'>
                    {toolCards?.[1]?.cardTitle}
                  </p>
                </div>
              </div>
              <div
                onClick={() => router.push({ pathname: toolCards?.[2]?.urlSlug })}
                className='bg-white rounded-[24px] cursor-pointer w-full p-[24px] hover:shadow-lg duration-200 h-full max-[479px]:px-[24px] calc-box-bg flex flex-col justify-start items-center calc-card-text'>
                <div className='pb-[60px] max-[576px]:pb-[30px] image-box-cal '>
                  <Image
                    src={`${toolCards?.[2]?.cardIcon}`}
                    alt='icon'
                    width={85}
                    height={85}
                    className='w-[85px] h-[85px] max-[576px]:w-[60px] max-[576px]:h-[60px] max-[576px]:mx-auto calc-icon-card'
                  />
                </div>
                <div className='max-[576px]:text-left'>
                  <p className='text-head text-[20px] !text-[#212529] font-semibold leading-[25px] max-[576px]:text-[18px] max-[479px]:text-[15px] calc-card-text'>
                    {toolCards?.[2]?.cardTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <div className='bg-[#F9F8FD] max-[576px]:pt-[40px] px-12 h-auto container mx-auto bg-[#F4F8FB] max-[1024px]:px-8 max-[991px]:max-w-full max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
      <div className={isDesktop ? 'bg-image' : 'bg-imageMobile'}>
        <div className='pb-8 '>
          <h2 className='font-normal text-[#212529]  font-[faktum] text-[40px] max-[1024px]:text-[36px] max-[771px]:text-[28px] max-[576px]:text-[24px] max-[479px]:text-[20px]  max-[375px]:text-[18px] max-[320px]:text-[18px] text-center font-semibold max-[479px]:leading-6 max-[320px]:leading-8 max-[280px]:text-[13px]'>
            BankSathi: a trusted partner for <br /> your financial needs
          </h2>
        </div>
        <div className='flex flex-col gap-[30px] justify-center items-center'>
          {isDesktop ? (
            <>
              <div className='grid grid-cols-5 gap-[30px]'>
                {firstFive.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='lg:w-40 min-[768px]:w-full h-[95px] bg-white rounded-xl shadow px-[20px] py-[31px] flex items-center justify-center'>
                      <Image src={item?.brandlogo} width={160} height={95} alt='img' />
                    </div>
                  )
                })}
              </div>
              <div className='grid grid-cols-6 gap-[30px]'>
                {secondSix.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='lg:w-40 min-[768px]:w-full h-[95px] bg-white rounded-xl shadow px-[20px] py-[31px] flex items-center justify-center'>
                      <Image src={item?.brandlogo} width={160} height={95} alt='img' />
                    </div>
                  )
                })}
              </div>
              <div className='grid grid-cols-5 gap-[30px]'>
                {thirdFive.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='lg:w-40 min-[768px]:w-fullh-[95px] bg-white rounded-xl shadow px-[20px] py-[31px] flex items-center justify-center'>
                      <Image src={item?.brandlogo} width={160} height={95} alt='img' />
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <>
              <div className='grid grid-cols-3 gap-[16px]'>
                {mobileArray?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='w-[101px] max-[320px]:w-full h-[60px] bg-white rounded-xl shadow px-[20px] py-[31px] flex items-center justify-center'>
                      <Image src={item?.brandlogo} width={160} height={95} alt='img' />
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <div className='mt-[90px] max-sm:mt-[60px]'>{isDesktop ? <ToolSavingCards /> : getMobileTools()}</div>
    </div>
  )
}

export default TrustedPartner

export const ToolSavingCards = () => {
  const router = useRouter()

  return (
    <>
      <div className='pb-8'>
        <h2 className='font-normal text-[#212529]  font-[faktum] text-[40px] max-[1024px]:text-[36px] max-[771px]:text-[28px] max-[576px]:text-[24px] max-[479px]:text-[20px]  max-[375px]:text-[18px] max-[320px]:text-[15px] text-center font-semibold  max-[280px]:text-[13px]'>
          Our tool, your Savings
        </h2>
      </div>
      <div className='grid grid-cols-3 gap-[30px] max-[834px]:grid-cols-2 max-sm:grid-cols-1'>
        {toolCards?.map((cardData, index) => {
          return (
            <div key={index} onClick={() => router.push({ pathname: cardData?.urlSlug })}>
              <div className='bg-white rounded-[24px] cursor-pointer xl:w-[370px] xl: md:w-full hover:shadow-lg duration-200 h-full max-[479px]:p-4 calc-box-bg flex flex-col gap-y-[30px] items-center justify-center calc-card-text'>
                <div className='max-[576px]:pb-[30px] image-box-cal pt-[30px]'>
                  <Image
                    src={`${cardData?.cardIcon}`}
                    alt='icon'
                    width={85}
                    height={85}
                    className='w-[85px] h-[85px] max-[576px]:w-[60px] max-[576px]:h-[60px] max-[576px]:mx-auto calc-icon-card'
                  />
                </div>
                <div className='max-[576px]:text-center'>
                  <div className='text-[20px] !text-[#212529] pb-[40px] font-semibold leading-[25px] max-[576px]:text-[18px] max-[479px]:text-[15px] calc-card-text'>
                    {cardData?.cardTitle}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
