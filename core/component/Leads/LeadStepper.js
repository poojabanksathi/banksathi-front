/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import LoaderLogo from '../../../public/assets/logo-loader.gif'

import Image from 'next/image'
import { useWindowSize } from '@/hooks/useWindowSize'

const steps = ['Contact Detail', 'Personal Detail', 'Income Detail', 'Documentation']
const ContactDetails = dynamic(() => import('@/core/component/Leads/ContactDetails'), {
  ssr: false
})
const LeadStepperButton = dynamic(() => import('@/core/component/Leads/LeadStepperButton'), {
  ssr: false
})
const LeadApplyNowForm = dynamic(() => import('@/core/component/Leads/LeadApplyNowForm'), {
  ssr: false
})

function validateSubmit(data, props, step = 1) {
  if (step == 1) {
    // PAN validation
    if (data.fieldData?.pan_no == '') {
      props.handleFieldData({
        ...data.fieldData,
        pan_no: { ...data.fieldData?.pan_no, error: 'Please enter PAN number' }
      })
      return false
    } else if (!/^[a-zA-Z]{3}[pP]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/.test(data.fieldData?.pan_no?.value)) {
      data.handleFieldData({
        ...data.fieldData,
        pan_no: { ...data.fieldData?.pan_no, error: 'Please enter valid PAN number' }
      })
      return false
    } else {
      data.handleFieldData({ ...data.fieldData, pan_no: { ...data.fieldData?.pan_no?.value, error: null } })
    }

    //Name validation
    if (data.fieldData.full_name?.value == '') {
      data.handleFieldData({
        ...data.fieldData,
        full_name: { ...data.fieldData?.full_name, error: 'Please enter full name' }
      })
      return false
    } else if (!/^[a-zA-Z ]+$/.test(data.fieldData.full_name?.value)) {
      data.handleFieldData({
        ...data.fieldData,
        full_name: { ...data.fieldData?.full_name, error: 'Please enter valid name' }
      })
      return false
    } else {
      data.handleFieldData({ ...data.fieldData, full_name: { ...data.fieldData?.full_name, error: null } })
    }

    //Mobile validation
    if (data?.fieldData?.mobile?.value == '') {
      data.handleFieldData({
        ...data.fieldData,
        mobile: { ...data.fieldData?.mobile, error: 'Please enter mobile number' }
      })
      return false
    } else if (!/^[6-9]{1}[0-9]*$/.test(data?.fieldData?.mobile?.value)) {
      data.handleFieldData({
        ...data.fieldData,
        mobile: { ...data.fieldData?.mobile, error: 'Please enter valid mobile number' }
      })
      return false
    } else {
      data.handleFieldData({ ...data?.fieldData, mobile: { ...data.fieldData?.mobile, error: null } })
    }

    //Email validation
    if (data.fieldData?.email?.value == '') {
      data.handleFieldData({ ...data.fieldData, email: { ...data.fieldData?.email, error: 'Please enter your email' } })
      return false
    } else if (
      !/^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
        data.fieldData?.email?.value
      )
    ) {
      data.handleFieldData({
        ...data.fieldData,
        email: { ...data.fieldData?.email, error: 'Please enter valid email' }
      })
      return false
    } else {
      data.handleFieldData({ ...data.fieldData, email: { ...data.fieldData?.email, error: null } })
    }

    //Pincode validation
    if (data.fieldData?.pin_code?.value == '' || data.fieldData?.pin_code?.pincodeId == null) {
      data.handleFieldData({
        ...data.fieldData,
        pin_code: { ...data.fieldData?.pin_code, error: 'Please select pincode' }
      })
      return false
    } else {
      data.handleFieldData({ ...data?.fieldData, pin_code: { ...data.fieldData?.pin_code, error: null } })
    }

    //consent validation
    if (data.fieldData?.consent?.visible && data.fieldData?.consent.value == false) {
      data.handleFieldData({
        ...data.fieldData,
        consent: { ...data.fieldData?.consent, error: 'Please give consent to access your data, by mark check' }
      })
      return false
    } else {
      data.handleFieldData({ ...data.fieldData, consent: { ...data.fieldData.consent, error: null } })
    }
  } else if (step == 2) {
  }

  return true
}

export default function LeadStepper(props) {
  const { data } = props

  const [isLoading, setLoading] = useState(false)
  const [isLoadingOtp, setLoadingOtp] = useState(false)
  const [formDataChange, setFormDataChange] = useState(1)

  return (
    <>
      <Toaster />
      {isLoading || isLoadingOtp ? (
        <div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>

          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center  sm:p-0'>
              <div className='relative transform overflow-hidden'>
                <Image src={LoaderLogo} className='w-[150px] h-[150px] bg-white rounded-full' alt='imageloader' />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className='bg-white relative rounded-[16px] h-full lg:px-16 max-[1200px]:!px-12 md:px-10 px-6 py-10 max-[280px]:!px-4'>
        <div className='md:px-8 lg:px-4 xl:px-8 max-[1200px]:!px-0 max-[834px]:pb-0'>
          <LeadApplyNowForm
            formFields={data?.formFields}
            formDataChange={formDataChange}
            setFormDataChange={setFormDataChange}
            FData={props?.data}
            // submit={LeadeAddGloble}
          />
        </div>
      </div>
    </>
  )
}
