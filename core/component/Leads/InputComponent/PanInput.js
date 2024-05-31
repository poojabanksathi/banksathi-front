import { useState, useEffect } from 'react'
import Axios from 'axios'
import leadStyle from '../css/leadStyle.module.css'
import { LEAD_BASE_URL, LEADSAPI } from '@/utils/alljsonfile/leadService'
import Input from './Input'
import Loader from '../common/Loader'
import SuccessIcon from '../common/SuccessIcon'
import { BASE_URL, COMMON } from '@/utils/alljsonfile/service'
import axios from 'axios'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'

export default function PanInput(props) {
  const [pan, setPan] = useState([])
  const [loading, setLoading] = useState(false)
  const [panVerifyCard, setPanVerifyCard] = useState(false)
  const [panVerifyName, setPanVerifyName] = useState()
  const [pancardError, setPancardError] = useState(false)

  useEffect(() => {
    setPan(props?.data?.fieldData.pan)
  }, [props?.data?.fieldData.pan])

  // function verifyPan(panValue) {
  //   let url = LEAD_BASE_URL + LEADSAPI.verifyPan + `?pan=${panValue}`
  //   let testPanList = [
  //     'BIYHM3987S',
  //     'FGHHS7654D',
  //     'OMIPB5643E',
  //     'OLPHK2456I',
  //     'LFUPP8650W',
  //     'QHCHA1876E',
  //     'RVSPS3212E',
  //     'CVFPL7678Y',
  //     'CELPN7654R'
  //   ]

  //   if (testPanList?.includes(panValue)) {
  //     props.data.handleFieldData({
  //       ...props.data.fieldData,
  //       pan: { ...pan, value: panValue, valid: true, verified: true, updatedFromPan: true, error: null },
  //       name: { ...props.data.fieldData.name, value: 'Pushpendra Nayadu', updatedFromPan: true }
  //     })
  //     return
  //   }

  //   Axios.get(url).then((response) => {
  //     if (response.data.data.panVerified) {
  //       props.data.handleFieldData({
  //         ...props.data.fieldData,
  //         pan: { ...pan, value: panValue, valid: true, verified: true, updatedFromPan: true, error: null },
  //         name: { ...props.data.fieldData.name, value: response.data.data.nameFromPan, updatedFromPan: true }
  //       })
  //     } else {
  //       props.data.handleFieldData({
  //         ...props.data.fieldData,
  //         pan: { ...pan, value: panValue, valid: false, verified: false }
  //       })
  //     }
  //   })
  // }

  // function allUpdate(value, profileMobiles) {
  //   let panObj = { ...pan, value: value.panNo, valid: true, verified: true, updatedFromPan: true, error: null }

  //   let otpVerified = value.otpVerified == '1' ? true : false
  //   let nameObj = { ...props.data.fieldData.name, value: '' }
  //   if (value.fullName !== null && value.fullName !== '' && value.fullName !== undefined) {
  //     nameObj = { ...props.data.fieldData.name, value: value.fullName, locked: true, updatedFromPan: true }
  //   }
  //   let emailObj = { ...props.data.fieldData.email, value: '' }
  //   if (value.email !== null && value.email !== '' && value.email !== undefined) {
  //     let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  //     if (emailRegex.test(value.email)) {
  //       emailObj = {
  //         ...props.data.fieldData.email,
  //         value: value.email,
  //         locked: true,
  //         updatedFromPan: true,
  //         valid: true
  //       }
  //     } else {
  //       emailObj = { ...props.data.fieldData.email, value: value.email, updatedFromPan: true, valid: false }
  //     }
  //   }
  //   let pincodeObj = {
  //     ...props.data?.fieldData?.pincode,
  //     value: value.value,
  //     updatedFromPan: true,
  //     pincodeId: value.pincodeId,
  //     pincodeState: value.pincodeState,
  //     pincodeCity: value.pincodeCity
  //   }

  //   var mobRegexComplete = new RegExp(/^[6-9]{1}[0-9]{9}$/)
  //   let mobileObj = {
  //     ...props.data.fieldData.mobile,
  //     value: value.mobileNo,
  //     updatedFromPan: true,
  //     verified: otpVerified,
  //     valid: mobRegexComplete.test(value.mobileNo)
  //   }

  //   let mobileArrayObj = []
  //   if (profileMobiles !== null) {
  //     mobileArrayObj.push({
  //       ...props.data.defaultFieldState,
  //       value: value.mobileNo,
  //       updatedFromPan: true,
  //       verified: otpVerified,
  //       valid: mobRegexComplete.test(value.mobileNo)
  //     })
  //     profileMobiles.forEach((element, index) => {
  //       mobileArrayObj.push({
  //         ...props.data.defaultFieldState,
  //         value: element.mobileNo,
  //         updatedFromPan: true,
  //         verified: element.isVerified == '1' ? true : false,
  //         valid: mobRegexComplete.test(element.mobileNo)
  //       })
  //     })
  //     if (mobileArrayObj.length > 1) {
  //       mobileObj = { ...props.data.defaultFieldState, updatedFromPan: true }
  //     }
  //   }

  //   let dobObject = { ...props.data.fieldData.dob, value: value.dob, updatedFromPan: true, valid: true }

  //   props.data.handleFieldData({
  //     ...props.data.fieldData,
  //     pan: panObj,
  //     mobile: mobileObj,
  //     mobileArray: mobileArrayObj,
  //     name: nameObj,
  //     email: emailObj,
  //     pincode: pincodeObj,
  //     dob: dobObject
  //   })
  //   // if(value.hasOwnProperty('hasCibil')){
  //   //     setHasCibil({...hasCibil, show: value.hasCibil});
  //   // }
  // }

  // function allUpdateRemove() {
  //   if (props.data.fieldData.pan.updatedFromPan) {
  //     return new Promise(() => {
  //       props.data.handleFieldData({
  //         ...props.data.fieldData,
  //         pan: props.data.defaultFieldState,
  //         mobile: props.data.defaultFieldState,
  //         mobileArray: [],
  //         name: { ...props.data.defaultFieldState, locked: true },
  //         email: { ...props.data.defaultFieldState, locked: true },
  //         dob: props.data.defaultFieldState,
  //         pincode: { ...props.data.defaultFieldState, pincodeId: null, pincodeState: null, pincodeCity: null }
  //       })
  //     })
  //   }
  // }

  // function fetchPanDetail(panValue) {
  //   let url = LEAD_BASE_URL + LEADSAPI.getCustomerDetails + `?panNo=${panValue}`
  //   let profileMobiles = null

  //   let search = window.location.search
  //   let params = new URLSearchParams(search)
  //   let h = params.get('h')

  //   let config = {
  //     headers: {
  //       h: h
  //     }
  //   }

  //   Axios.get(url, config)
  //     .then((response) => {
  //       if (response.data.data.customerDetail != null) {
  //         profileMobiles = response.data.data.customerDetail.hasOwnProperty('leadProfileMobile')
  //           ? response.data.data.customerDetail.leadProfileMobile
  //           : null
  //         allUpdate(response.data.data.customerDetail, profileMobiles)
  //       }
  //     })
  //     .catch(() => {
  //       verifyPan(panValue)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }

  // async function changePanNo(event) {
  //   var isVerified = pan.verified
  //   if (pan.updatedFromPan && event.target.value != pan.value) {
  //     isVerified = false
  //     await allUpdateRemove()
  //   }

  //   if (event.target.value.length > 10) return
  //   var reg = '^[a-zA-Z]{3}[pP]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$'
  //   var isValid = false
  //   var panError = null
  //   let testPanList = [
  //     'BIYHM3987S',
  //     'FGHHS7654D',
  //     'OMIPB5643E',
  //     'OLPHK2456I',
  //     'LFUPP8650W',
  //     'QHCHA1876E',
  //     'RVSPS3212E',
  //     'CVFPL7678Y',
  //     'CELPN7654R'
  //   ]
  //   if (event.target.value.match(reg) && testPanList?.includes(event.target.value)) {
  //     setLoading(true)
  //     fetchPanDetail(event.target.value.toUpperCase())
  //     isValid = true
  //     panError = null
  //   } else {
  //     if (event.target.value != '') {
  //       panError = 'Please enter valid PAN number'
  //     }
  //   }
  //   props.data.handleFieldData({
  //     ...props.data.fieldData,
  //     pan: { ...pan, value: event.target.value.toUpperCase(), valid: isValid, verified: isVerified, error: panError }
  //   })
  // }

  const handleChange = (event) => {
    setPan({ ...pan, [event?.target?.name]: event?.target?.value })
  }

  useEffect(() => {
    if (pan?.pan_no) {
      const uppercaseValue = pan?.pan_no.toUpperCase()
      setPan({ ...pan, ['pan_no']: uppercaseValue })
    }
  }, [pan?.pan_no])

  return (
    <>
      <Input
        type='text'
        id='pan_no'
        name='pan_no'
        label='PAN Card'
        // disabled={props?.token && panVerifyCard}
        value={props.profileformData?.pan_no ? props.profileformData?.pan_no : pan?.pan_no}
        onChange={(e) => handleChange(e)}
        // onBeforeInput={(event) => {
        //   if (!/^[A-Za-z0-9]*$/.test(event.data)) {
        //     event.preventDefault()
        //     event.stopPropagation()
        //   }
        // }}
        autoComplete='off'
        className={[leadStyle.input, 'uppercase placeholder:capitalize'].join(' ')}
        placeholder='Enter your pan number'
        // error={pan.error}
        // endAdornment={pan?.pan_no ? panVerifyCard ? <SuccessIcon /> : <Loader color='#49d49d' height='6' width='6' /> : "" }
      />
      {pancardError && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.pancardValidError}</p>}
    </>
  )
}
