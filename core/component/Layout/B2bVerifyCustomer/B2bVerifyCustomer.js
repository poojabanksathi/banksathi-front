import React, { useEffect, useMemo, useState } from 'react'
import gradientSmallBg from '../../../../public/assets/gradient-strip.svg'
import experianImage from '../../../../public/assets/experian-logo.svg'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useWindowSize } from '@/hooks/useWindowSize'
import CommonEmailInput from '../../common/CommonList/CommonFieldComponent/EmailAdd'
import { emailRegex } from '@/utils/util'

const InformCustomer = dynamic(
  () => import('@/core/component/Layout/B2bVerifyCustomer/InformCustomer/InformCustomer'),
  {
    ssr: false
  }
)
const CommonOtpComponent = dynamic(
  () => import('@/core/component/Layout/B2bVerifyCustomer/CommonOtpComponent/CommonOtpComponent'),
  {
    ssr: false
  }
)
const B2bVerifyCustomer = ({ customerDetails }) => {
  const size = useWindowSize()

  const [isChecked, setIsChecked] = useState(false)
  const [otpOpen, setOtpOpen] = useState(false)
  const [callApi, setCallApi] = useState(false)
  const [disableButton, setDisableButton] = useState(false)
  const [customerData, setCustomerData] = useState(customerDetails)
  const [emailValid, setEmailValid] = useState(true)

  const windowSize = useMemo(() => {
    return size?.width
  }, [size?.width])

  const isDesktop = windowSize >= 768

  const checkAllFields = () => {
    if (
      !customerDetails?.name ||
      !customerDetails?.mobile ||
      (!customerDetails?.email && !customerData?.email) ||
      !customerDetails?.pan ||
      !customerDetails?.pin_code
    ) {
      return false
    } else return true
  }
  const hasAllFields = checkAllFields()

  const getButtonComp = () => {
    return (
      <div className='mt-[32px]'>
        <button
          type='submit'
          disabled={disableButton}
          onClick={() => {
            // setOtpOpen(true)
            setCallApi(true)
          }}
          className={`head-text font-medium  font-[faktum] w-[328px] h-[50px] text-center bg-[#49D49D] !text-[#212529] py-2 pl-2 pr-2 rounded-lg text-[15px]  mx-auto flex items-center justify-center gap-4 max-sm:w-[127px] max-sm:h-[40px] max-sm:text-[12px] ${
            !disableButton ? '' : 'disableClassBtn'
          }`}>
          Generate OTP
        </button>
      </div>
    )
  }
  const handleChange = (event) => {
    if (event?.target?.name === 'email') {
      const isValidEmail = emailRegex.test(event.target.value)
      if (!isValidEmail) setEmailValid(false)
      else setEmailValid(true)
      setCustomerData({ ...customerData, email: event?.target?.value })
    }
    setCustomerData({ ...customerData, [event?.target?.name]: event?.target?.value })
  }

  useEffect(() => {
    if (!customerData?.email || !isChecked || !hasAllFields || !emailValid) {
      setDisableButton(true)
    } else setDisableButton(false)
  }, [customerData?.email, isChecked, hasAllFields, emailValid])

  return (
    <>
      <div>
        <div className='flex flex-col items-center justify-center pt-[30px]'>
          <div className='text-center text-black text-lg font-medium max-sm:text-[18px]'>Confirm your details</div>
          <div className='mt-[10px]'>
            <Image src={gradientSmallBg} width={isDesktop ? 296 : 246} height={isDesktop ? 36 : 30} alt='credit' />
            <div className='text-black text-sm font-normal textClass max-sm:left-[14%] max-sm:text-[12px]'>
              Get your Credit score for FREE
            </div>
          </div>
          <div className='flex flex-row items-center justify-center gap-[7px]'>
            <div className='text-right text-neutral-800 text-[10px] font-normal leading-[14px]'>Powered by </div>
            <Image src={experianImage} width={71} height={29} alt='credit' />
          </div>
          <div className={`text-black text-sm font-normal mt-[25px] max-sm:text-[12px] max-sm:px-[16px] `}>
            Your application has been initiated. Confirm your details and Get OTP {isDesktop && <br></br>}to generate an
            Cibil information report.
          </div>
          <div
            className={`w-[500px] max-sm:w-[92vw] h-auto bg-white rounded-xl px-[16px] pt-[20px] pb-[29px] mt-[20px] ${
              otpOpen ? 'opacity-[50%]' : ''
            }`}>
            <div className='grid grid-cols-2 max-sm:grid-cols-1 max-sm:gap-[3px]'>
              <div className='flex flex-col items-start gap-[4px]'>
                <div className='text-neutral-400 text-xs font-normal leading-none'>Full Name</div>
                <div className='text-black text-sm font-normal leading-tight'>{customerDetails?.name}</div>
              </div>
              <div className='flex flex-col items-start gap-[4px] max-sm:mt-[16px]'>
                <div className='text-neutral-400 text-xs font-normal leading-none'>Mobile Number</div>
                <div className='text-black text-sm font-normal leading-tight'>+91 {customerDetails?.mobile}</div>
              </div>
            </div>
            <div className='grid grid-cols-2 max-sm:grid-cols-1 max-sm:gap-[3px] mt-[16px]'>
              <div className='flex flex-col items-start gap-[4px]'>
                <div className='text-neutral-400 text-xs font-normal leading-none'>Pincode</div>
                <div className='text-black text-sm font-normal leading-tight'>{customerDetails?.pin_code}</div>
              </div>
              <div className='flex flex-col items-start gap-[4px] max-sm:mt-[16px]'>
                <div className='text-neutral-400 text-xs font-normal leading-none'>PAN Card</div>
                <div className='text-black text-sm font-normal leading-tight'>{customerDetails?.pan}</div>
              </div>
            </div>
          </div>
          {!customerDetails?.email && (
            <div
              className={`w-[500px] max-sm:w-[92vw] h-auto bg-white rounded-xl px-[16px] pt-[20px] pb-[29px] mt-[20px] ${
                otpOpen ? 'opacity-[50%]' : ''
              }`}>
              <div className='px-[10px]'>
                <CommonEmailInput value={customerData?.email} handleChange={handleChange} />
              </div>
            </div>
          )}
          <div className='flex justify-center gap-[8px] mt-[21px] mr-[90px] max-sm:ml-[20px] '>
            <input
              className='w-6 h-5 flex items-center text-white accent-[#49D49D] '
              type='checkbox'
              value={isChecked}
              onChange={(e) => {
                setIsChecked(e?.target?.checked)
              }}
            />
            <div className='text-black text-sm font-normal flex items-center max-sm:text-[12px]'>
              I hereby provide consent to BS Fintech Private Limited.
            </div>
          </div>
          {isDesktop && !otpOpen && getButtonComp()}
          <div className='mt-[25px] mb-[100px]'>
            <InformCustomer
              isDesktop={isDesktop}
              isChecked={isChecked}
              otpOpen={otpOpen}
              callApi={callApi}
              setOtpOpen={setOtpOpen}
              setCallApi={setCallApi}
              disableButton={disableButton}
            />
          </div>
        </div>
        <div>
          <div>
            <CommonOtpComponent
              otpOpen={otpOpen}
              setOtpOpen={setOtpOpen}
              customerDetails={customerData || customerDetails}
              callApi={callApi}
              setCallApi={setCallApi}
              hasAllFields={hasAllFields}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default B2bVerifyCustomer
