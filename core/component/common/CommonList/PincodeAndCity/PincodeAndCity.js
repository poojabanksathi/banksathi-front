/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import CommonPicodeInput from '../CommonFieldComponent/Pincode'
import { ScrollToTop } from '@/utils/util'
import { BASE_URL, COMMON } from '@/utils/alljsonfile/service'
import axios from 'axios'
import toast from 'react-hot-toast'

const PincodeAndCity = ({ userInfo, setUserInfo, city, setCity, handleInputChange }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  const [pinCode, setPinCode] = useState([])
  const [visible, setVisible] = useState(false)
  const [pinCodeError, setPinCodeError] = useState(false)

  const handlePincodeChange = () => {
    setVisible(true)
  }

  const getPinCodes = async () => {
    let url = BASE_URL + COMMON.pinCodeVerify
    await axios
      .post(
        url,
        {
          pin_code: userInfo?.pin_code
        },
        { headers: headers }
      )
      .then((response) => {
        if (response?.data?.data?.pincode_data?.pincodes?.length <= 0) {
          setPinCode([])
          setCity('')
          setVisible(false)
          setPinCodeError(true)
        } else {
          setCity(response?.data?.data?.pincode_data?.cities?.[0])
          setPinCodeError(false)
          setPinCode(response.data.data.pincode_data?.pincodes)
        }
      })
      .catch((error) => {
        console.error(error)
        setPinCode([])
        setCity('')
      })
  }

  useEffect(() => {
    if (userInfo?.pin_code?.length === 6) {
      getPinCodes()
    }
  }, [userInfo?.pin_code?.length])

  return (
    <div>
      <div className='relative mt-[20px]'>
        <CommonPicodeInput
          value={userInfo?.pin_code}
          getData={getPinCodes}
          handleChange={handleInputChange}
          handlePincodeChange={handlePincodeChange}
          pinCodeError={pinCodeError}
          //   onFocus={() => ScrollToTop(nameRef, mobileView)}
        />
        {visible && (
          <ul className='suggestions pin-suggestion top-[43%]'>
            {pinCode.map((i, v) => (
              <li
                className={''}
                key={v}
                onClick={() => {
                  setUserInfo({ ...userInfo, pin_code: i })
                  setVisible(!visible)
                }}>
                {i}
              </li>
            ))}
          </ul>
        )}
        <div className='mt-[20px]'>
          <label className='text-[13px] font-normal text-[#212529] ' htmlFor='city'>
            City
          </label>
          <input
            className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
            id='city'
            name='city'
            type='text'
            disabled={pinCodeError ? false : city || userInfo?.city}
            value={pinCodeError ? '' : city || userInfo?.city}
            placeholder='Enter your city'
            onChange={(e) => {
              if (!city && e?.target?.value) {
                // setCity(e?.target?.value)
                setUserInfo({ ...userInfo, city: e?.target?.value })
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default PincodeAndCity
