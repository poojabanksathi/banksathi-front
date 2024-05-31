import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import { emailRegex } from '@/utils/util'
import React, { useState } from 'react'

const CommonEmailInput = ({
  handleChange,
  disabled,
  value,
  alt,
  className,
  errorHrefEmail,
  hideLabel = false,
  onFocus
}) => {
  const [errorEmail, setErrorEmail] = useState(false)

  const handleEmailChange = (event) => {
    if (event?.target?.value) {
      const isValidEmail = emailRegex.test(event.target.value)
      if (!isValidEmail) setErrorEmail(true)
      else setErrorEmail(false)
    } else setErrorEmail(false)
  }

  return (
    <>
      <div>
        {!hideLabel && (
          <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='email'>
            Email Address
          </label>
        )}
        <input
          className={
            className
              ? className
              : 'shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
          }
          alt={alt}
          id='email'
          name='email'
          type='email'
          placeholder='Valid email address'
          required
          value={value}
          onChange={(e) => {
            handleEmailChange(e)
            handleChange(e)
          }}
          onFocus={onFocus}
        />
        {errorHrefEmail && <p className='text-[12px] text-[#FF000F] font-no  mt-2'>{ApiMessage?.linkError}</p>}
        {errorEmail && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.EmailValidError}</p>}
      </div>
    </>
  )
}

export default CommonEmailInput
