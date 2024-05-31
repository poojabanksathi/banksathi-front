import Image from 'next/image'
import React from 'react'

const CommonPicodeInput = ({
  onChange,
  value,
  disabled,
  placeholder,
  className,
  getData,
  handleChange,
  handlePincodeChange,
  defaultValue,
  onFocus,
  pinCodeError = false,
  showPin = false
}) => {
  return (
    <>
      <label className={`text-[13px] font-normal text-[#212529] ${showPin ? 'hidden' : ''}`} htmlFor='pinCode'>
        Pin Code
      </label>
      {showPin && (
        <Image src='/assets/map-pin.svg' alt='map-pin' height={20} width={20} className='relative top-[39px] left-3' />
      )}
      <input
        AutoComplete
        type='zipcode-number'
        id='pin_code'
        name='pin_code'
        maxLength={6}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={
          onChange
            ? onChange
            : (e) => {
                e.target.value = e.target.value?.replace(/\D/g, '')
                if (e.target.value?.length > 3) {
                  getData(e?.target?.value)
                }
                handleChange(e)
                handlePincodeChange(e)
              }
        }
        onFocus={onFocus}
        className={
          className
            ? className
            : `shadow border rounded-lg w-full py-4 pl-10 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 ${
                pinCodeError ? 'border-[#FF000F]' : ''
              } border-[#C2CACF]`
        }
        placeholder={placeholder ? placeholder : 'Pin Code'}
        autoComplete='off'
      />
      {pinCodeError && <p className='text-[12px] text-[#FF000F] font-no mt-2'>Please enter a valid pin code</p>}
    </>
  )
}

export default CommonPicodeInput
