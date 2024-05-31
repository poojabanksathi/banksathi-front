import Image from 'next/image'
import React, { useState } from 'react'
import OTPInput from 'react-otp-input'
import SubmitFormBtn from '../../SubmitFormBtn'
import Loader from '@/core/component/Leads/common/Loader'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import closeIcon from '../../../../../public/assets/closeIcon.svg'

const OtpModal = ({
  mobile,
  otp,
  time,
  setOtp,
  resendOtp,
  setOtpModal,
  showOtpModal,
  callInitiateOtp,
  verifyOtpCall
}) => {
  const [errOtp, setErrorOtp] = useState(false)

  const formatTime = (time) => {
    return time.toString().padStart(2, '0')
  }

  const handleNumberEdit = () => {
    setOtpModal(false)
    setOtp([])
  }
  const handleSubmitOtp = () => {}

  const handleResendOtp = () => {
    callInitiateOtp()
  }

  const handleChangeOtp = (e) => {
    const valueotp = e
    const extractedOtp = valueotp?.replace(/\D/g, '')
    setOtp(extractedOtp)
    if (extractedOtp?.length === 4) {
      verifyOtpCall(valueotp)
      setErrorOtp(false)
    } else {
      setErrorOtp(true)
    }
  }

  //   useEffect(() => {
  //     callInitiateOtp()
  //   }, [])

  return (
    <>
      <div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
        <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex min-h-full  items-center justify-center p-4 text-center  sm:p-0'>
            <div className='relative transform overflow-hidden'>
              <div className=' flex flex-col items-center justify-center sm:flex sm:items-center bg-white rounded-lg  pt-[60px] pb-[45px] max-sm:[35px] min-[1500px]:px-[45px]  px-[45px] min-h-full'>
                <div className=''>
                  <div className='sm:flex sm:items-center  w-full'>
                    <button
                      className='flex absolute cursor-pointer right-[2%] top-[2%]  px-2 py-1 z-[1] w-[26px]'
                      onClick={() => setOtpModal(false)}>
                      <Image
                        src={closeIcon}
                        className='w-[20px] max-xs:w-[13px] h-auto'
                        width={20}
                        height={20}
                        priority={true}
                        alt='img_text'
                      />
                    </button>
                    <div className=' sm:mt-0'>
                      <h3
                        className='text-[28px] max-[834px]:text-[32px]  max-[479px]:text-[24px]  py-2 font-semibold text-[#212529] max-[479px]:text-center'
                        id='modal-title'>
                        OTP Sent!
                      </h3>
                      <p className=' py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] max-[479px]:text-center'>
                        {ApiMessage?.otpContent}
                      </p>
                      <div className='max-[479px]:text-center'>
                        <span className=' py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] '>+91 {mobile}</span>{' '}
                        <button
                          onClick={handleNumberEdit}
                          className='text-[#49D49D] cursor-pointer ps-2 text-[15px] max-[479px]:text-[13px]'>
                          Edit Number
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <form>
                  <div className='flex mt-4 max-[479px]:justify-center '>
                    <div className='space-x-2 otp-data-box text-[#212529]'>
                      <OTPInput
                        value={otp}
                        onChange={(e) => handleChangeOtp(e)}
                        numInputs={4}
                        name='otp'
                        inputType='tel'
                        renderInput={(props) => <input {...props} />}
                      />
                      {errOtp && <p className='text-[12px] text-[#FF000F] font-no mt-2'>{ApiMessage?.otpValidError}</p>}
                    </div>
                  </div>
                  <p className='font-normal  pt-5 max-[479px]:text-center text-[#212529]'>
                    Resend OTP in 00:{formatTime(time)} Sec
                  </p>
                  <div className=' pt-4 max-[479px]:text-center'>
                    {resendOtp ? (
                      <SubmitFormBtn name={resendOtp ? 'Resend OTP' : <Loader />} onClick={handleResendOtp} />
                    ) : (
                      <SubmitFormBtn name={'Submit'} disabled={otp?.length < 4} onClick={handleSubmitOtp} />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OtpModal
