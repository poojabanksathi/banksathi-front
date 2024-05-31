import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import leadStyle from './css/leadStyle.module.css'
import Input from './InputComponent/Input'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, COMMON, USERSET } from '@/utils/alljsonfile/service'
import Loader from './common/Loader'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import jwt from 'jwt-decode'
import toast, { Toaster } from 'react-hot-toast'
import CommonPicodeInput from '@/core/component/common/CommonList/CommonFieldComponent/Pincode'
import { useRouter } from 'next/router'
import { handleRemoveLocalstorage } from '@/utils/util'


const PanInput = dynamic(() => import('@/core/component/Leads/InputComponent/PanInput'), {
  ssr: false
})
const MobileInput = dynamic(() => import('@/core/component/Leads/InputComponent/MobileInput'), {
  ssr: false
})
const PincodeInput = dynamic(() => import('@/core/component/Leads/InputComponent/PincodeInput'), {
  ssr: false
})





export default function IncomeDetails(props) {

  const [profileformData, setProfileFormdata] = useState([])
  const [pincodeNumber, setPincodeNumber] = useState()
  const [pinCode, setPinCode] = useState([])
  const [visible, setVisibility] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cityPin, setCityPin] = useState()
  const [statePin, setStatePin] = useState()





  const leadId = localStorage.getItem('leadprofileid')
  const token = localStorage.getItem('token')

  const router = useRouter()

  

  useEffect(() => {
    if(token){
      
      const decordtoken =  jwt(token);
    
      const timecurrrunt = Date.now();
      const timestampexp = decordtoken?.exp; 
    
      const CurruntTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timecurrrunt)
    
      function formatUnixTimestamp(timestampexp) {
        const dateObj = new Date(timestampexp * 1000); 
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedDate = `${month}/${day}/${year}, ${formatTimeexp(hours)}:${formatTimeexp(minutes)}:${formatTimeexp(seconds)} ${ampm}`;
        return formattedDate;
      }
      
      function formatTimeexp(time) {
        return time < 10 ? '0' + time : time;
      }
      
      const formattedDateExp = formatUnixTimestamp(timestampexp);
    
      if (CurruntTime === formattedDateExp) {
        router.push('/login');
        toast.success(ApiMessage?.logoutmessage)
        handleRemoveLocalstorage()
      }
    
    
    }
    },[])

  const handleChange = (event) => {
    setVisibility(true)
    setProfileFormdata({ ...profileformData, [event.target?.name]: event.target?.value })
  }



  useEffect(() => {
    setProfileFormdata({
      ...profileformData,
      pin_code: pincodeNumber
    })
  }, [pincodeNumber])

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  const GetUserSetUp = (e) => {
    e?.preventDefault()
    axios
      .post(
        BASE_URL + USERSET?.getusersetup,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setProfileFormdata(response?.data?.data)
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.reason)
        }else if (error?.response?.status == 401) {
          router.push('/login')
      toast.success(ApiMessage?.logoutmessage)
      handleRemoveLocalstorage()

      } 
         else if (error?.response?.status == 403) {
        }
      })
  }

  // const getUserData = JSON.parse(localStorage.getItem('get_user_data'));

  useEffect(() => {
    if (token) {
      GetUserSetUp()
      // setProfileFormdata(getUserData)
    }
  }, [])



  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

  useEffect(() => {
    if (profileformData?.pin_code?.length === 6) {
      PinCodeVerify()
    }
  }, [profileformData?.pin_code?.length === 6])

  const PinCodeVerify = (e) => {
    axios
      .post(
        BASE_URL + COMMON?.pinCodeVerify,
        {
          pin_code: profileformData?.pin_code
        },
        { headers: headers }
      )
      .then((response) => {
          if(response?.data?.message == 'success'){
            setCityPin(response?.data?.data?.pincode_data?.cities[0])
            setStatePin(response?.data?.data?.pincode_data?.states[0])

          }
        setLoading(false)
      })

      .catch((error) => {
        setLoading(true)
      })
  }




  const previousController = useRef()

  const getData = (searchPinCode) => {
    if (previousController.current) {
      previousController.current.abort()
    }
    const controller = new AbortController()

    previousController.current = controller
    let url = BASE_URL + COMMON.pinCodeVerify

    let search = window.location.search
    let params = new URLSearchParams(search)

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }

    axios
      .post(
        url,
        {
          pin_code: searchPinCode
        },
        { headers: headers }
      )
      .then((response) => {
        setPinCode(response.data.data.pincode_data?.pincodes)
        // setLoading(false);
      })
      .catch((error) => {
        console.error(error)
        setPinCode([])
        // setLoading(false);
      })
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setVisibility(false)
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)





  return (
    <>
      <Toaster/>
    
    <div className='grid grid-cols-12 md:mt-[30px] gap-x-4 font-sans'>
      <div className=' mb-6 col-span-12'>
        <p className=' text-[#212529]'>Employment Type</p>
        <div className='flex pt-[10px] gap-4'>
          <div>
            <label htmlFor='gender' className=' form-redio flex gap-2 items-center text-[#212529]'>
              <input
                type='radio'
                name='gender'
                value={props?.formData?.occupation  === 'Salaried' ? props?.formData?.occupation  === 'Salaried' :  props.formFields.fieldData.salaried?.value}
                checked={props?.formData?.occupation === 'Salaried'}

              />
              Salaried
            </label>
          </div>
          <div>
            <label htmlFor='gender' className=' form-redio flex gap-2 items-center text-[#212529]'>
              <input
                type='radio'
                name='gender'
                value={props?.formData?.occupation === 'Self-employed' ? props?.formData?.occupation === 'Self-employed' : props.formFields.fieldData.selfemployed?.value}
                checked={props?.formData?.occupation === 'Self-employed'}
              />
              Self - Employed
            </label>
          </div>
          <div>
            <label htmlFor='gender' className=' form-redio flex gap-2 items-center text-[#212529]'>
              <input
                type='radio'
                name='gender'
                value={props.formFields.fieldData.bussiness?.value}
              />
              Bussiness
            </label>
          </div>
        </div>
      </div>

      <div className='mb-6 col-span-6 max-sm:col-span-12'>
        <label className='text-[14px] font-normal text-[#212529] mb-2' htmlFor='date'>
        Your Profession
        </label>
        <select
          id='profession'
          defaultValue='select'
          value={props.formFields.fieldData.profession?.value}
          className={[
            leadStyle.input,
            props.formFields.fieldData.profession?.error ? leadStyle.inputError : ''
          ].join(' ')}>
          <option disabled value='select'>
            select
          </option>
        </select>
      </div>
      <div className='mb-6 col-span-6 max-sm:col-span-12'>
        <label className='text-[14px] font-normal text-[#212529] mb-2' htmlFor='date'>
        Industry Type
        </label>
        <select
          id='industry'
          defaultValue='select'
          value={props.formFields.fieldData.industry?.value}
          className={[leadStyle.input, props.formFields.fieldData.industry?.error ? leadStyle.inputError : ''].join(
            ' '
          )}>
          <option disabled value='select'>
            select
          </option>
        </select>
      </div>
      <div className='mb-6 col-span-6 max-sm:col-span-12'>
      <Input
          type='text'
          id='company'
          label='Company Name'
          value={props?.formData?.company_name ? props?.formData?.company_name : props.formFields.fieldData.company?.value}
          className={[leadStyle.input, props.formFields.fieldData.company?.error ? leadStyle.inputError : ''].join(' ')}
          placeholder='Enter company name'
          onBeforeInput={(event) => {
            if (!/^[A-Za-z]*$/.test(event.data)) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          disabled={props.formFields.fieldData.company?.locked}
          error={props.formFields.fieldData.company?.error}
        />

       
      </div>
      <div className='mb-6 col-span-6  max-sm:col-span-12'>
        <Input
          type='text'
          id='designation'
          label='Designation'
          value={props.formFields.fieldData.designation?.value}
          className={[leadStyle.input, props.formFields.fieldData.designation?.error ? leadStyle.inputError : ''].join(' ')}
          placeholder='Enter your Designation'
          onBeforeInput={(event) => {
            if (!/^[A-Za-z]*$/.test(event.data)) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          disabled={props.formFields.fieldData.designation?.locked}
          error={props.formFields.fieldData.designation?.error}
        />
      </div>
      <div className='mb-6 col-span-6  max-sm:col-span-12'>
        <Input
          type='text'
          id='monthlyincome'
          label='Monthly Gross Income'
          value={ props?.formData?.monthly_salary ? props?.formData?.monthly_salary : props.formFields.fieldData.monthlyincome?.value}
          className={[leadStyle.input, props.formFields.fieldData.monthlyincome?.error ? leadStyle.inputError : ''].join(' ')}
          placeholder='00'
          onBeforeInput={(event) => {
            if (!/^[0-9]*$/.test(event.data)) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          disabled={props.formFields.fieldData.monthlyincome?.locked}
          error={props.formFields.fieldData.monthlyincome?.error}
        />
      </div>
      <div className='mb-6 col-span-6  max-sm:col-span-12'>
        <Input
          type='text'
          id='annualincome'
          label='Annual Gross Income'
          value={props.formFields.fieldData.annualincome?.value}
          className={[leadStyle.input, props.formFields.fieldData.annualincome?.error ? leadStyle.inputError : ''].join(' ')}
          placeholder='00'
          onBeforeInput={(event) => {
            if (!/^[0-9]*$/.test(event.data)) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          disabled={props.formFields.fieldData.annualincome?.locked}
          error={props.formFields.fieldData.annualincome?.error}
        />
      </div>
      <div className='mb-6 col-span-6  max-sm:col-span-12'>
        <Input
          type='text'
          id='totalexperience'
          label='Total Year of experience'
          value={props.formFields.fieldData.totalexperience?.value}
          className={[leadStyle.input, props.formFields.fieldData.totalexperience?.error ? leadStyle.inputError : ''].join(' ')}
          placeholder='00'
          onBeforeInput={(event) => {
            if (!/^[0-9]*$/.test(event.data)) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          disabled={props.formFields.fieldData.totalexperience?.locked}
          error={props.formFields.fieldData.totalexperience?.error}
        />
      </div>
      <div className='mb-6 col-span-6  max-sm:col-span-12'>
        <Input
          type='text'
          id='salaryaccount'
          label='Salary Account'
          value={props.formFields.fieldData.salaryaccount?.value}
          className={[leadStyle.input, props.formFields.fieldData.salaryaccount?.error ? leadStyle.inputError : ''].join(' ')}
          placeholder='00'
          onBeforeInput={(event) => {
            if (!/^[A-Za-z]*$/.test(event.data)) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          disabled={props.formFields.fieldData.salaryaccount?.locked}
          error={props.formFields.fieldData.salaryaccount?.error}
        />
      </div>
      <div className="mb-6 col-span-6 max-sm:col-span-12">
                <Input 
                    type="email"
                    id="email"
                    label="Office Email"
                    value={props.formFields.fieldData.officeemail?.value}
                    className={[leadStyle.input, 
                                props.formFields.fieldData.officeemail?.error ? leadStyle.inputError : ''
                            ].join(' ')
                    }
                    onChange={(event) => {
                        let emailRegex =  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
                        if(emailRegex.test(event.target.value)){
                            props.formFields.handleFieldData({...props.formFields.fieldData,
                                officeemail: {...props.formFields?.fieldData?.officeemail, 
                                    value: event.target.value.toLowerCase(),
                                    valid: true,
                                    error: null
                                } 
                            })
                        }else{
                            props.formFields.handleFieldData({...props.formFields.fieldData,
                                officeemail: {...props.formFields.fieldData?.officeemail, 
                                    value: event.target.value.toLowerCase(),
                                    valid: false,
                                    error: "Please enter valid email"
                                } 
                            })
                        }
                    }}
                    onBeforeInput={ (event) => {
                        if(event.target.value.slice(-1)){
                            if(event.data == ' '){
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }else{
                            if(!/^\w*$/.test(event.data)){
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }}
                    placeholder="Enter your office address"
                    disabled={props.formFields.fieldData.officeemail?.locked}
                    error={props.formFields.fieldData.officeemail?.error}
                />
            </div>
      <div className='mb-6 col-span-6  max-sm:col-span-12'>
        <Input
          type='text'
          id='proofincome'
          label='Proof of Income'
          value={props.formFields.fieldData.proofincome?.value}
          className={[leadStyle.input, props.formFields.fieldData.proofincome?.error ? leadStyle.inputError : ''].join(' ')}
          placeholder='00'
          onBeforeInput={(event) => {
            if (!/^[A-Za-z]*$/.test(event.data)) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          disabled={props.formFields.fieldData.proofincome?.locked}
          error={props.formFields.fieldData.proofincome?.error}
        />
      </div>
      <div className='mb-6 col-span-12  max-sm:col-span-12'>
        <Input
          type='text'
          id='officeaddress'
          label='Office Address'
          value={props.formFields.fieldData.officeaddress?.value}
          className={[leadStyle.input, props.formFields.fieldData.officeaddress?.error ? leadStyle.inputError : ''].join(' ')}
          placeholder='Enter your office address'
          onBeforeInput={(event) => {
            if (!/^[A-Za-z]*$/.test(event.data)) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          disabled={props.formFields.fieldData.officeaddress?.locked}
          error={props.formFields.fieldData.officeaddress?.error}
        />
      </div>
      {/* <div className='mb-6 col-span-6  max-sm:col-span-12'>
        <Input
          type='text'
          id='totalexperience'
          label='Total Year of experience'
          value={props.formFields.fieldData.totalexperience?.value}
          className={[leadStyle.input, props.formFields.fieldData.totalexperience?.error ? leadStyle.inputError : ''].join(' ')}
          placeholder='00'
          onBeforeInput={(event) => {
            if (!/^[0-9]*$/.test(event.data)) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          disabled={props.formFields.fieldData.totalexperience?.locked}
          error={props.formFields.fieldData.totalexperience?.error}
        />
      </div> */}
      {/* <div className='mb-6 col-span-6  max-sm:col-span-12'>
        <Input
          type='text'
          id='annualincome'
          label='Annual Gross Income'
          value={props.formFields.fieldData.annualincome?.value}
          className={[leadStyle.input, props.formFields.fieldData.annualincome?.error ? leadStyle.inputError : ''].join(' ')}
          placeholder='00'
          onBeforeInput={(event) => {
            if (!/^[0-9]*$/.test(event.data)) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          disabled={props.formFields.fieldData.annualincome?.locked}
          error={props.formFields.fieldData.annualincome?.error}
        />
      </div> */}

      <div className='mb-6 col-span-6 max-sm:col-span-12 relative'>
        {/* <PincodeInput value={props.formFields} setPincodeNumber={setPincodeNumber} /> */}
        <CommonPicodeInput
        //  disabled={profileformData?.pin_code && token ? true : false}
          value={profileformData?.pin_code ? profileformData?.pin_code : props.formFields.fieldData?.pin_code}
          onChange={(e) => {
            if(e.target.value?.length > 3){

            getData(e.target.value)
            }
            handleChange(e)
          }}
          className={[leadStyle.input, props?.data?.fieldData?.pin_code?.error ? leadStyle.inputError : ''].join(' ')}
            placeholder='Enter your pincode'
          />
        {visible && (
          <ul className='suggestions pin-suggestion top-[100%]' ref={wrapperRef}>
            {pinCode.map((i, v) => (
              <li
                className={''}
                key={v}
                onClick={() => {
                  setProfileFormdata({ ...profileformData, pin_code: i })
                  setVisibility(!visible)
                }}>
                {i}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='mb-6 col-span-6  max-sm:col-span-12'>
        <label className='text-[14px] font-normal text-[#212529] mb-2' htmlFor='date'>
          City
        </label>
        <input
          id='city'
          // defaultValue='select'
          value={props?.formData?.city ? props?.formData?.city : cityPin }
          className={[leadStyle.input, props.formFields.fieldData.city?.error ? leadStyle.inputError : ''].join(' ')}>
          {/* <option disabled value='select'>
            select
          </option> */}
        </input>
      </div>
      <div className='mb-6 col-span-6  max-sm:col-span-12'>
        <label className='text-[14px] font-normal text-[#212529] mb-2' htmlFor='date'>
          State
        </label>
        <input
          id='state'
          // defaultValue='select'
          value={statePin ? statePin : props.formFields.fieldData.state?.value}
          className={[leadStyle.input, props.formFields.fieldData.state?.error ? leadStyle.inputError : ''].join(' ')}>
          {/* <option disabled value='select'>
            select
          </option> */}
        </input>
      </div>
    </div>
    </>
  )
}
