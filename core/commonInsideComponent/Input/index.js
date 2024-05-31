import React from 'react'

function Input(props) {
  return (
      <input
        type={props.type}
        className={
          props?.className
            ? props?.className
            : 'shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline mt-1'
        }
        name={props?.name}
        onChange={props?.onChange}
        value={props?.value}
        defaultValue={props?.defaultValue}
        onBlur={props?.onBlur}
        placeholder={props?.placeholder}
        disabled={props?.disabled}
        maxLength={props?.maxLength}
        minLength={props?.minLength}
        id={props?.id}
        max={props?.max}
      />
  )
}

export default Input
