import LoaderComponent from '@/core/component/Partners/LoaderComponent/LoaderComponent'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import { BASE_URL, LEADAPPAPI } from '@/utils/alljsonfile/service'
import { errorHandling, getHash } from '@/utils/util'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const PersonalApplyNow = ({ data, dimensions, url_slug }) => {
  const token = typeof window !== 'undefined' && localStorage?.getItem('token')
  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')
  const refOutSide = typeof window !== 'undefined' && sessionStorage?.getItem('refererOutside')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const storedLoanAmount = typeof window !== 'undefined' && localStorage?.getItem('loanAmount')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')
  const leadIPData = leadsParams && JSON?.parse(leadsParams)

  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')
  const userData = localUserData && JSON.parse(localUserData)

  const refererUrl = typeof window !== 'undefined' && localStorage?.getItem('url')
  const utm_details = refererUrl ? refererUrl?.split('?')?.[1] : null

  const h = getHash()
  const router = useRouter()

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }
  const isSalaried = userData?.occupation === 'Salaried'
  const isSelfEmployed = userData?.occupation === 'Self-employed'
  const incomeValue = isSalaried ? userData?.monthly_salary : userData?.itr_amount

  const [loading, setLoading] = useState(false)

  const checkAllLoanFields = () => {
    if (
      !incomeValue ||
      !url_slug ||
      !userData?.gender ||
      !userData?.pan_no ||
      !userData?.full_name ||
      !userData?.dob ||
      !userData?.email ||
      !userData?.pin_code ||
      !userData?.occupation ||
      !userData?.company_name ||
      (!userData?.loan_amount && !storedLoanAmount)
    ) {
      return false
    } else return true
  }
  // ------------------------------ADD LEADS API CALL --------------------- //
  const callApplyNowApi = () => {
    setLoading(true)
    let params = {
      lead_profile_id: leadId,
      url_slug: url_slug, // M
      gender: userData?.gender, // M
      pan: userData?.pan_no, // M
      full_name: userData?.full_name, // M
      dob: userData?.dob, // M
      email: userData?.email, // M
      pin_code: userData?.pin_code, // M
      occupation: userData?.occupation?.toLowerCase(), // M
      terms: 'agree', // M
      company_name: userData?.company_name, // M
      request_id: '',
      lang_id: 1,
      referrer_url: refOutSide || '',
      category: 'Personal Loan'
    }
    if (userData?.mobile) params = { ...params, mobile_no: String(userData?.mobile) } // M
    if (userData?.mobile_no) params = { ...params, mobile_no: String(userData?.mobile_no) }
    if (isSalaried) params = { ...params, monthly_salary: userData?.monthly_salary } // M
    if (userData?.loan_amount) params = { ...params, loan_amount: userData?.loan_amount }
    if (storedLoanAmount) params = { ...params, loan_amount: storedLoanAmount }
    if (isSelfEmployed) params = { ...params, itr_amount: userData?.itr_amount }
    if (refOutSide) params = { ...params, referrer_url: refOutSide }
    if (leadIPData?.user_agent) params = { ...params, user_agent: leadIPData?.user_agent }
    if (leadIPData?.ip) params = { ...params, ip_address: leadIPData?.ip }
    if (utm_details) params = { ...params, utm_details: utm_details }
    if (deviceId) params = { ...params, device_id: deviceId }
    if (h) params = { ...params, h: h }

    axios
      .post(BASE_URL + LEADAPPAPI.leadaddgloble, params, { headers: headersAuth })
      .then((response) => {
        setLoading(false)
        const url = response?.data?.data?.url
        if (url) router.push(url)
        if (token) {
          props?.data?.page.handlePage('leads')
          props?.data?.otp.handleOtpCheck(false)
        }
        if (response?.data?.reason) {
          toast.error(response?.data?.reason)
          router.push(`/personal-loan/eligibility?eligible=${url_slug}`)
        } else {
          toast.error(response?.data?.data)
        }
      })
      .catch((error) => {
        setLoading(false)
        errorHandling(error)
      })
  }
  const handleApplyNow = () => {
    const checkAllPersonalLoanFields = checkAllLoanFields()
    if (checkAllPersonalLoanFields) {
      callApplyNowApi()
    } else {
      router.push(`/personal-loan/leads/${url_slug}`)
    }
  }
  return (
    <>
      {loading && <LoaderComponent />}
      <button
        id={`'apply+detail+ ${'positionID'}'`}
        key={data?.id}
        onClick={() => handleApplyNow(data)}
        className={`text-[#212529] px-4 cursor-pointer business-right-text py-3 ${dimensions?.width} ${dimensions?.height} rounded-lg w-full bg-[#49D49D] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]`}>
        {ListingfilterData.apllynow}
      </button>
    </>
  )
}

export default PersonalApplyNow
