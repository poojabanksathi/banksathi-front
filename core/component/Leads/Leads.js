import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const LeadPage = dynamic(() => import('@/core/component/Leads/LeadPage'), {
  ssr: false
})

const OtpPage = dynamic(() => import('@/core/component/Leads/OtpPage'), {
  ssr: false
})

export default function Leads({ leadsField, referer }) {
  const [page, setPage] = useState('leads')
  function handlePage(value) {
    setPage(value)
  }
  const [otpCheck, setOtpCheck] = useState(true)
  function handleOtpCheck(value) {
    setOtpCheck(value)
  }
  const [formActiveStep, setFormActiveStep] = useState(1)
  function handleFormActiveStep(value) {
    setFormActiveStep(value)
  }
  const defaultFieldState = {
    value: '',
    valid: false,
    verified: false,
    locked: false,
    error: null,
    visible: true,
    updatedFromPan: false,
    updatedFromId: false
  }

  const [fieldData, setFieldData] = useState({
    pan: defaultFieldState,
    mobile: defaultFieldState,
    mobileArray: [],
    name: { ...defaultFieldState },
    email: { ...defaultFieldState },
    pincode: { ...defaultFieldState, pincodeId: null, pincodeState: null, pincodeCity: null },
    consent: { ...defaultFieldState, value: false }
  })

  function handleFieldData(value) {
    setFieldData(value)
  }

  useEffect(() => {
    fieldData.mobile?.verified ? setOtpCheck(false) : setOtpCheck(true)
  }, [fieldData.mobile?.verified])

  return (
    <>
      {/* {page == 'otp' ? (
        <div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-black bg-opacity-0 transition-opacity'></div>
          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center  sm:p-0'>
              <div className='relative transform overflow-hidden rounded-lg p-8 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white '>
                  <div className='sm:flex sm:items-center justify-center w-full'>
                    <OtpPage
                      setShowPersonalForm={setShowPersonalForm}
                      data={{
                        page: { page, handlePage },
                        step: { formActiveStep, handleFormActiveStep },
                        otp: { otpCheck, handleOtpCheck },
                        formFields: { defaultFieldState, fieldData, handleFieldData },
                        showPersonalForm: { showPersonalForm }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : ( */}
        <LeadPage
          leadsField={leadsField}
          referer={referer}
         
          data={{
            page: { page, handlePage },
            step: { formActiveStep, handleFormActiveStep },
            otp: { otpCheck, handleOtpCheck },
            formFields: { defaultFieldState, fieldData, handleFieldData }
          }}
        />
      {/* )} */}
    </>
  )
}
