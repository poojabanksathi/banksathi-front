import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import { BASE_URL, LEADAPPAPI } from '@/utils/alljsonfile/service'
import { errorHandling, getHash, sendEventToGTM } from '@/utils/util'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useEffect, useId, useState } from 'react'
import LoaderComponent from '../../Partners/LoaderComponent/LoaderComponent'
import TagManager from 'react-gtm-module'

const ApplyNowButton = ({ data, userData, addMargin = false, pdpImpressionObj, isPdp, category, position, pos , className , disabled}) => {
  const id = useId()
  const router = useRouter()

  const [fieldValue, setFieldValue] = useState()
  const [loading, setLoading] = useState(false)
  const token = typeof window !== 'undefined' && localStorage.getItem('token')
  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')

  const refOutSide = typeof window !== 'undefined' && sessionStorage?.getItem('refererOutside')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')
  const category_url = data?.url_slug?.split('/')[0]

  const h = getHash()
  const leadIPData = leadsParams && JSON?.parse(leadsParams)

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  const handleGTM = () => {
    TagManager?.dataLayer({
      dataLayer: {
        event: 'apply_card',
        product_category: category_url,
        product_name: data?.card_name || "",
      },
    });
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')
      const utm_details = refererUrl?.split('?')?.[1]

      setFieldValue(utm_details)
    }
  }, [])

  const checkIfHasAllMandatoryFields = (params) => {
    const {
      url_slug,
      gender,
      mobile_no,
      pan,
      pin_code,
      full_name,
      dob,
      email,
      occupation,
      terms,
      company_name,
      monthly_salary
    } = params
    const fieldMandatory =
      url_slug &&
      gender &&
      mobile_no &&
      pan &&
      pin_code &&
      full_name &&
      dob &&
      email &&
      occupation &&
      terms &&
      company_name &&
      monthly_salary
    return !!fieldMandatory
  }
  let categoryParam = 'Credit Cards'
  if (router?.asPath?.includes('credit-cards')) categoryParam = 'Credit Cards'
  if (router?.asPath?.includes('bank-account')) categoryParam = 'Bank Accounts'

  const callAddLeadDetails = (item) => {
    const url_slug = item?.apply_url?.split?.('/')?.pop()
    setLoading(true)
    let params = {
      lead_profile_id: leadId,
      url_slug: url_slug,
      gender: userData?.gender,
      pan: userData?.pan_no,
      full_name: userData?.full_name,
      mobile_no: String(userData?.mobile),
      dob: userData?.dob,
      email: userData?.email,
      pin_code: userData?.pin_code,
      occupation: userData?.occupation?.toLowerCase(),
      terms: 'agree',
      company_name: userData?.company_name,
      device_id: '',
      request_id: '',
      monthly_salary: userData?.monthly_salary,
      lang_id: 1,
      itr_amount: userData?.itr_amount,
      referrer_url: refOutSide || '',
      category: categoryParam,
      loan_amount: '0'
    }
    if (leadIPData?.user_agent) params = { ...params, user_agent: leadIPData?.user_agent }
    if (deviceId) params = { ...params, device_id: deviceId }
    if (leadIPData?.ip) params = { ...params, ip_address: leadIPData?.ip }
    if (fieldValue) params = { ...params, utm_details: fieldValue }
    if (h) params = { ...params, h: h }

    const flagToProceed = checkIfHasAllMandatoryFields(params)

    if (flagToProceed) {
      axios
        .post(BASE_URL + LEADAPPAPI.leadaddgloble, params, { headers: headersAuth })
        .then((response) => {
          setLoading(false)
          sendEventToGTM(sendProductPurchases)
          if (response?.data?.data?.url) {
            router.push(response?.data?.data?.url)
          }
          if (response?.data?.message == 'success') {
            if (token) {
              props?.data?.page.handlePage('leads')
              props?.data?.otp.handleOtpCheck(false)
            }
          } else {
            if (response?.data?.message === 'failed') {
              if (response?.data?.reason || response?.data?.data) {
                router.push(`/credit-cards/eligibility?eligible=${url_slug}&redirect=true`)
              }
            }
          }
        })
        .catch((error) => {
          setLoading(false)
          errorHandling(error)
        })
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem('purchaseItem', JSON.stringify(sendProductPurchases))
      }
      router?.push({ pathname: `/leads/${url_slug}` })
    }
  }

  //Apply now checkout
  const item = data
  const sendCheckout = {
    event: 'begin_checkout',
    ecommerce: {
      items: [
        {
          item_id: leadId,
          item_name: item?.card_name,
          index: position,
          item_brand: item?.bank_name,
          item_category: '',
          item_category2: '',
          item_category3: '',
          item_category4: '',
          item_category5: '',
          item_list_id: category,
          item_list_name: category,
          item_variant: item?.card_name,
          quantity: 1
        }
      ]
    }
  }

  //apply now purchases
  const sendProductPurchases = {
    event: 'purchase',
    ecommerce: {
      transaction_id: leadId,
      value: 0,
      items: [
        {
          item_id: leadId,
          item_name: item?.card_name,
          index: position,
          item_brand: item?.bank_name,
          item_category: category,
          item_category2: '',
          item_category3: '',
          item_category4: '',
          item_category5: '',
          item_list_id: category,
          item_list_name: category,
          item_variant: item?.card_name,
          quantity: 1
        }
      ]
    }
  }
  //apply now btn click
 
  const handleApplyNow = (item) => {
    if (!isPdp) {
      // pdp impression
      const sendProductDetail = {
        event: 'view_item',
        ecommerce: {
          items: [
            {
              item_id: item?.product_id?.toString(),
              item_name: item?.card_name,
              index: 1,
              item_brand: item?.bank_name,
              item_category: category,
              item_category2: '',
              item_category3: '',
              item_category4: '',
              item_category5: '',
              item_list_id: category,
              item_list_name: category,
              item_variant: item?.card_name,
              quantity: 1
            }
          ]
        }
      }
      sendEventToGTM(sendProductDetail)
    }
    sendEventToGTM(sendCheckout)
    handleGTM()
    if (userData) {
      callAddLeadDetails(item)
    } else if (!userData) {
      router.push(`/${item?.apply_url}`)
    }
  }
  const positionID = position || pos
  return (
    <>
      {loading && <LoaderComponent />}
      <button
        id={`'apply+detail+ ${positionID}'`}
        key={data?.id}
        disabled={disabled}
        onClick={() => handleApplyNow(data)}
        className={`text-[#212529] px-4 cursor-pointer business-right-text py-3 w-full lg:w-[160px] md:w-full rounded-lg  bg-[#49D49D] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px] ${disabled && "bg-[#d5d7d8]"} ${
          addMargin ? 'mr-[12px]' : ''
        } ${className}`}>
        {ListingfilterData.apllynow}
      </button>
    </>
  )
}

export default ApplyNowButton
