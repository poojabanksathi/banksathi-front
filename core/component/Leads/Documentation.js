import React from 'react'
import dynamic from 'next/dynamic'
import leadStyle from './css/leadStyle.module.css'
import Input from './InputComponent/Input'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import CommonDatePicker from '../common/CommonList/CommonFieldComponent/Datepicker'

const PanInput = dynamic(() => import('@/core/component/Leads/InputComponent/PanInput'), {
  ssr: false
})
const MobileInput = dynamic(() => import('@/core/component/Leads/InputComponent/MobileInput'), {
  ssr: false
})
const PincodeInput = dynamic(() => import('@/core/component/Leads/InputComponent/PincodeInput'), {
  ssr: false
})

export default function Documentation(props) {
  const [startDate, setDate] = useState(null)
  const today = new Date()

  const selectDateHandler = (d) => {
    setDate(d)
  }


  const dateform = moment(props.formFields); 
  const formatDateTime = dateform.format('DD-MM-YYYY'); 
  return (
    <div className='grid grid-cols-12 md:mt-[30px] gap-x-4 font-sans'>
      <div className=' mb-6 col-span-12'>
        <p className=' text-[#212529]'>Do you have an existing SCB credit card ?</p>
        <div className='flex pt-[10px] gap-4'>
          <div>
            <label htmlFor='gender' className=' form-redio flex gap-2 items-center text-[#212529]'>
              <input type='radio' name='gender' value={props.formFields.fieldData.scbyes?.value} />
              Yes
            </label>
          </div>
          <div>
            <label htmlFor='gender' className=' form-redio flex gap-2 items-center text-[#212529]'>
              <input type='radio' name='gender' value={props.formFields.fieldData.scbno?.value} />
              No
            </label>
          </div>
        </div>
      </div>
      <div className=' mb-6 col-span-12'>
        <p className=' text-[#212529]'>Are you an existing SCB customer ?</p>
        <div className='flex pt-[10px] gap-4'>
          <div>
            <label htmlFor='gender' className=' form-redio flex gap-2 items-center text-[#212529]'>
              <input type='radio' name='gender' value={props.formFields.fieldData.customeryes?.value} />
              Yes
            </label>
          </div>
          <div>
            <label htmlFor='gender' className=' form-redio flex gap-2 items-center text-[#212529]'>
              <input type='radio' name='gender' value={props.formFields.fieldData.customerno?.value} />
              No
            </label>
          </div>
        </div>
      </div>

      <div className='mb-6 col-span-6 max-sm:col-span-12 datepicker   '>
        <Input
          type='text'
          id='numberdependents'
          label='Number of Dependents'
          value={props.formFields.fieldData.numberdependents?.value}
          className={[
            leadStyle.input,
            props.formFields.fieldData.numberdependents?.error ? leadStyle.inputError : ''
          ].join(' ')}
          placeholder='00'
          onBeforeInput={(event) => {
            if (!/^[A-Za-z]*$/.test(event.data)) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          disabled={props.formFields.fieldData.numberdependents?.locked}
          error={props.formFields.fieldData.numberdependents?.error}
        />
      </div>
      <div className='mb-6 col-span-6 max-sm:col-span-12'>
        <Input
          type='email'
          id='email'
          label='Card Mailing Address'
          value={props.formFields.fieldData.cardemail?.value}
          className={[leadStyle.input, props.formFields.fieldData.cardemail?.error ? leadStyle.inputError : ''].join(
            ' '
          )}
          onChange={(event) => {
            let emailRegex =
              /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
            if (emailRegex.test(event.target.value)) {
              props.formFields.handleFieldData({
                ...props.formFields.fieldData,
                cardemail: {
                  ...props.formFields.fieldData?.cardemail,
                  value: event.target.value.toLowerCase(),
                  valid: true,
                  error: null
                }
              })
            } else {
              props.formFields.handleFieldData({
                ...props.formFields.fieldData,
                cardemail: {
                  ...props.formFields.fieldData?.cardemail,
                  value: event.target.value.toLowerCase(),
                  valid: false,
                  error: 'Please enter valid email'
                }
              })
            }
          }}
          onBeforeInput={(event) => {
            if (event.target.value.slice(-1)) {
              if (event.data == ' ') {
                event.preventDefault()
                event.stopPropagation()
              }
            } else {
              if (!/^\w*$/.test(event.data)) {
                event.preventDefault()
                event.stopPropagation()
              }
            }
          }}
          placeholder='Enter your address'
          disabled={props.formFields.fieldData.cardemail?.locked}
          error={props.formFields.fieldData.cardemail?.error}
        />
      </div>
      <div className='mb-6 col-span-12 max-sm:col-span-12'>
        <Input
          type='text'
          id='creditcardsinput'
          label='Credit Cards'
          value={props.formFields.fieldData.creditcardsinput?.value}
          className={[
            leadStyle.input,
            props.formFields.fieldData.creditcardsinput?.error ? leadStyle.inputError : ''
          ].join(' ')}
          placeholder=''
          onBeforeInput={(event) => {
            if (!/^[A-Za-z]*$/.test(event.data)) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          disabled={props.formFields.fieldData.creditcardsinput?.locked}
          error={props.formFields.fieldData.creditcardsinput?.error}
        />
      </div>
      <div className='mb-6 col-span-6 max-sm:col-span-12'>
        <Input
          type='text'
          id='documenttype'
          label='Document Type'
          value={props.formFields.fieldData.documenttype?.value}
          className={[leadStyle.input, props.formFields.fieldData.documenttype?.error ? leadStyle.inputError : ''].join(
            ' '
          )}
          placeholder=''
          onBeforeInput={(event) => {
            if (!/^[A-Za-z]*$/.test(event.data)) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          disabled={props.formFields.fieldData.documenttype?.locked}
          error={props.formFields.fieldData.documenttype?.error}
        />
      </div>
      <div className='mb-6 col-span-6  max-sm:col-span-12'>
        <Input
          type='text'
          id='documentnumber'
          label='Document Number'
          value={props.formFields.fieldData.documentnumber?.value}
          className={[
            leadStyle.input,
            props.formFields.fieldData.documentnumber?.error ? leadStyle.inputError : ''
          ].join(' ')}
          placeholder=''
          onBeforeInput={(event) => {
            if (!/^[A-Za-z]*$/.test(event.data)) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          disabled={props.formFields.fieldData.documentnumber?.locked}
          error={props.formFields.fieldData.documentnumber?.error}
        />
      </div>

      <div className='mb-6 col-span-6 max-sm:col-span-12'>
        <label className='text-[14px] font-normal text-[#212529] ' htmlFor='date'>
          Document Expiry
        </label>
        {/* <DatePicker
         showYearDropdown
                      dropdownMode='select'
          dateFormat='yyyy/MM/dd'
          name='expiry'
          id='expiry'
          className={[leadStyle.input, props.formFields.fieldData.expiry?.error ? leadStyle.inputError : ''].join(' ')}
          selected={startDate}
          onChange={(e) => {
            selectDateHandler(e)
          }}
          maxDate={today}
          value={props.formFields ? formatDateTime : 'DD/MM/YYYY' }
          required
          todayButton={'Today'}
        /> */}
        <CommonDatePicker
          name='expiry'
          id='expiry'
          startDate={startDate}
          onChange={(e) => {
            selectDateHandler(e)
          }}
          value={props.formFields.fieldData.expiry ? formatDateTime : 'DD/MM/YYYY' }
          className={[leadStyle.input, props.formFields.fieldData.expiry?.error ? leadStyle.inputError : ''].join(' ')}
        />
      </div>
    </div>
  )
}
