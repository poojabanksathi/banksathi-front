import React from 'react'

const CommonNumberInput = ({ handleChangeNumber, handleChange, disabled, defaultValue, className, placeholder,onFocus }) => {
  return (
    <input
      type='tel'
      name='mobile'
      id='mobile'
      pattern="[0-9]*"
      disabled={disabled}
      className={
        className
          ? className
          : 'shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
      }
      placeholder={placeholder ? placeholder : 'Enter Mobile Number'}
      onChange={(e) => {
        handleChangeNumber(e)
        handleChange(e)
        e.target.value = e?.target?.value?.replace(/\D/g, '');
      }}
      defaultValue={defaultValue}
      required
      maxLength={10}
      onFocus={onFocus}
    />
  )
}

export default CommonNumberInput
