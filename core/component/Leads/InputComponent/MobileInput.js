import React from 'react'
import Input from './Input'
import leadStyle from '../css/leadStyle.module.css'
import SuccessIcon from '../common/SuccessIcon'
import { useEffect } from 'react'

export default function MobileInput(props) {
  // useEffect(()=>{
  //     if(props?.profileformData?.mobile){
  //     props?.data?.handleFieldData({...props.data.fieldData,
  //                 mobile: {...mobile,value: props?.profileformData?.mobile }})
  //     }

  // },[props?.profileformData?.mobile])
  return (
    <>
      <Input
        AutoComplete='freeSolo'
        dropdownIcon={props?.data?.fieldData?.mobileArray?.length > 1 ? true : false}
        type='text'
        id='mobile'
        label='Mobile Number'
        value={props.data1}
        onKeyPress={(event) => {
          if (event.target.value.length === 0) {
            if (!/^[6-9]*$/.test(event.key)) {
              event.preventDefault()
            }
          } else {
            if (!/^[0-9]*$/.test(event.key)) {
              event.preventDefault()
            }
          }
        }}
        onInputChange={async (event) => {
          if (event?.target?.value.length !== 10) {
            if (!/^[6-9]{1}[0-9]*$/.test(event.target.value)) {
              event.preventDefault()
            }
            props?.data?.handleFieldData({
              ...props.data.fieldData,
              mobile: {
                ...mobile,
                value: event.target.value,
                valid: false,
                verified: false,
                error: 'Please enter valid mobile number'
              }
            })
          } else {
            if (!/^[6-9]{1}[0-9]{9}$/.test(event.target.value)) {
              event.preventDefault()
            } else {
              if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
              let mobileFound = props.data.fieldData.mobileArray.filter((item) => item.value == event.target.value)
              if (mobileFound.length > 0) {
                const { value, valid, verified, ...rest } = mobileFound[0]
                props.data.handleFieldData({
                  ...props.data.fieldData,
                  mobile: {
                    ...props.data.fieldData.mobile,
                    value: value,
                    valid: valid,
                    verified: verified,
                    error: null
                  }
                })
              } else {
                props.data.handleFieldData({
                  ...props.data.fieldData,
                  mobile: {
                    ...props.data.fieldData.mobile,
                    value: event.target.value,
                    valid: true,
                    verified: false,
                    error: null
                  }
                })
              }
            }
          }
        }}
        maxLength={10}
        options={
          props?.data?.fieldData?.mobileArray?.length > 1
            ? props.data.fieldData?.mobileArray?.map((option) => option)
            : []
        }
        getOptionLabel={(option) => (option?.value ? option?.value : '')}
        className={[leadStyle.input, props?.data?.fieldData?.mobile?.error ? leadStyle?.inputError : ''].join(' ')}
        placeholder='Enter your mobile number'
        error={props?.data?.fieldData?.mobile?.error}
        endAdornment={
          props?.data?.fieldData?.mobile?.valid ? props?.data?.fieldData?.mobile?.verified ? <SuccessIcon /> : '' : ''
        }
      />
    </>
  )
}
