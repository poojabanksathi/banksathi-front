import React, { useEffect, useState } from 'react'
import CommonPicodeInput from '../../../../../common/CommonList/CommonFieldComponent/Pincode'
import CommonNextButton from '../../../../../common/CommonList/CommonNextButton/CommonNextButton'
import CommonEmploymentDropdown from '@/core/component/common/CommonList/CommonEmploymentDropdown/CommonEmploymentDropdown'
import { BASE_URL, COMMON } from '@/utils/alljsonfile/service'
import { headers, removeNonAlphaNumeric } from '@/utils/util'
import axios from 'axios'

const ApplyProfessionalForm = ({
  setDateOfBirth,
  handleInputChange,
  userInformation,
  setUserInformation,
  setShowLoader,
  errorNameLast,
  handleValidation,
  url_slug,
  dateOfBirth,
  callApplyNowApi,
  pinCodeError,
  setPinCodeError,
  productDetailsData,
  isEligible
}) => {
  console.log("🚀 ~ userInformation:", userInformation)
  const isSalaried = userInformation?.occupation === 'Salaried'

  const category_url = productDetailsData?.product_details?.url_slug?.split('/')[0]
  const category_name = productDetailsData?.product_details?.card_name

  const incomeValue = isSalaried ? userInformation?.monthly_salary : userInformation?.itr_amount

  const disable =
    !userInformation?.occupation ||
    !incomeValue ||
    !userInformation?.dob ||
    !userInformation?.pin_code ||
    !userInformation?.company_name ||
    !userInformation?.full_name ||
    pinCodeError

  const [pinCode, setPinCode] = useState([])
  const [visible, setVisible] = useState(false)

  const handlePincodeChange = () => setVisible(true)

  const getData = async () => {
    const url = BASE_URL + COMMON.pinCodeVerify
    await axios
      .post(
        url,
        {
          pin_code: userInformation?.pin_code
        },
        { headers: headers }
      )
      .then((response) => {
        if (response?.data?.data?.pincode_data?.pincodes?.length <= 0) {
          setPinCode([])
          setVisible(false)
          setPinCodeError(true)
          handleGTM()
        } else {
          setPinCodeError(false)
          setPinCode(response.data.data.pincode_data?.pincodes)
        }
      })
      .catch((error) => {
        console.error(error)
        setPinCode([])
      })
  }

  useEffect(() => {
    if (userInformation?.pin_code?.length === 6) {
      getData()
    }
  }, [userInformation?.pin_code?.length])

  const handleGTM = () => {
    TagManager?.dataLayer({
      dataLayer: {
        event: 'applied_card',
        product_category: category_url,
        product_name: category_name,
        eligible_status: isEligible,
      },
    });
  }


  return (
    <>
      <div className={errorNameLast ? ' border-[#FF000F]' : ' mt-[21px]'}>
        <label className='text-[13px] font-normal text-[#212529]' htmlFor='full_name'>
          Full Name
        </label>
        <input
          className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
          id='full_name'
          name='full_name'
          type='text'
          pattern='[A-Za-z]+'
          onChange={(e) => {
            handleInputChange(e)
            handleValidation(e)
          }}
          value={userInformation?.full_name}
          onInput={(e) => {
            e.target.value = removeNonAlphaNumeric(e)
          }}
          // onFocus={() => ScrollToTop(nameRef, mobileView)}
          placeholder='Enter your name according to pan'
        />
        {errorNameLast && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.letterNameErr}</p>}
      </div>
      <CommonEmploymentDropdown
        userInformation={userInformation}
        handleInputChange={handleInputChange}
        setUserInformation={setUserInformation}
      />
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-x-[20px]'>
        <div className='datepicker mt-[20px]'>
          <label className='text-[13px] font-normal text-[#212529] ' htmlFor='birthDate'>
            Date of Birth
          </label>
          <div className='datepicker'>
            <input
              type='date'
              showYearDropdown
              dropdownMode='select'
              dateFormat='dd-MM-yyyy'
              name='dob'
              id='dob'
              className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
              onChange={(e) => {
                setDateOfBirth(e)
                handleInputChange(e)
              }}
              value={userInformation?.dob}
              max={new Date().toISOString().split('T')[0]}
              required
              defaultValue={userInformation?.dob}
              todayButton={'Today'}
            />
          </div>
        </div>
        <div className='relative my-[20px] '>
          <CommonPicodeInput
            value={userInformation?.pin_code}
            getData={getData}
            handleChange={handleInputChange}
            handlePincodeChange={handlePincodeChange}
            pinCodeError={pinCodeError}
          />
          {visible && (
            <ul className='suggestions pin-suggestion top-[97%]'>
              {pinCode?.map((i, v) => (
                <li
                  className={''}
                  key={v}
                  onClick={() => {
                    setUserInformation({ ...userInformation, pin_code: i })
                    setVisible(!visible)
                  }}>
                  {i}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <CommonNextButton title='Submit' handleSubmit={callApplyNowApi} disable={disable} />
    </>
  )
}

export default ApplyProfessionalForm
