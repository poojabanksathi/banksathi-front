import Image from 'next/image'
import React from 'react'
import { mockData } from '../data'
import dynamic from 'next/dynamic'

const InformCustomer = ({ isDesktop, isChecked, otpOpen, setOtpOpen, setCallApi, disableButton }) => {
  const data = mockData

  const CommonOtpComponent = dynamic(
    () => import('@/core/component/Layout/B2bVerifyCustomer/CommonOtpComponent/CommonOtpComponent'),
    {
      ssr: false
    }
  )

  return (
    <>
      <div className='flex flex-col items-start'>
        <div
          className={`bg-[#E0E7FB] rounded-xl w-[500px] h-[272px] px-[16px] max-sm:w-[92vw] max-sm:mb-[10px] ${
            otpOpen ? 'opacity-[50%]' : ''
          }`}>
          <div className='text-black text-xs font-semibold text-start mt-[15px]'>Inform Customer</div>
          {data?.informCustomerData?.map((item) => {
            return (
              <div className='flex items-center mt-[16px]' key={item?.id}>
                <Image src={item?.bg1} width={36} height={36} alt='bg blue' />
                <Image
                  src={item?.icon}
                  width={20}
                  height={20}
                  alt='thumb'
                  className='innerImageClasses max-sm:right-[27px]'
                />
                <div className='w-[399px] text-black text-xs font-normal leading-none'>{item?.text} </div>
              </div>
            )
          })}
        </div>
      </div>
      {!isDesktop && !otpOpen && (
        <>
          <div className='flex items-center fixed bottom-0 left-0 justify-center w-[100vw] h-[85px]  bg-white '>
            <div className='mt-[32px]'>
              <button
                onClick={() => {
                  // setOtpOpen(true)
                  setCallApi(true)
                }}
                disabled={disableButton}
                className={`head-text font-medium font-[faktum] w-[85vw] h-[50px] text-center bg-[#49D49D] !text-[#212529] rounded-lg text-[15px]  mx-auto flex items-center justify-center gap-4 relative bottom-[16px] ${
                  !disableButton ? '' : 'disableClassBtn'
                }`}>
                Generate OTP
              </button>
            </div>
          </div>
          <div>
            {otpOpen && (
              <div>
                <CommonOtpComponent
                  setOtpOpen={setOtpOpen}
                  isDesktop={isDesktop}
                  otpOpen={otpOpen}
                  callApi={callApi}
                  setCallApi={setCallApi}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default InformCustomer
