import { useWindowSize } from '@/hooks/useWindowSize'
import { BASE_URL, LEADAPPAPI } from '@/utils/alljsonfile/service'
import { errorHandling, getHash, leadId, localUserData, token } from '@/utils/util'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import Cookies from 'js-cookie'

const FrozenCompareCards = ({ slug1, slug2, slug3 }) => {
  const [fieldValue, setFieldValue] = useState()

  const refOutSide = typeof window !== 'undefined' && sessionStorage?.getItem('refererOutside')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')

      const utm_details = refererUrl?.split('?')?.[1]

      setFieldValue(utm_details)
    }
  }, [])
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const starCount = 5

  const size = useWindowSize()
  const router = useRouter()
  const isDesktop = size?.width > 768

  const [scrollY, setScrollY] = useState(0)

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }
  const userData = localUserData && JSON.parse(localUserData)

  const getSlugsArray = () => {
    let slugsArray = []
    if (slug1) {
      slugsArray.push(slug1)
    }
    if (slug2) {
      slugsArray.push(slug2)
    }
    if (slug3) {
      slugsArray.push(slug3)
    }
    return slugsArray
  }
  const slugsArray = getSlugsArray()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window?.scrollY)
    }
    handleScroll()
    typeof window !== 'undefined' && window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    getSlugsArray()
  }, [])

  const h = getHash()

  // ADD LEADS API CALL
  const leadIPData = leadsParams && JSON?.parse(leadsParams)

  const callAddLeadDetails = (applyUrl) => {
    const url_slug = applyUrl?.split?.('/')?.pop()
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
      referrer_url: refOutSide || ''
    }

    if (leadIPData?.user_agent) {
      params = { ...params, user_agent: leadIPData?.user_agent }
    }
    if (deviceId) {
      params = { ...params, device_id: deviceId }
    }
    if (leadIPData?.ip) {
      params = { ...params, ip_address: leadIPData?.ip }
    }
    if (fieldValue) {
      params = { ...params, utm_details: fieldValue }
    }
    if (h) {
      params = { ...params, h: h }
    }
    axios
      .post(BASE_URL + LEADAPPAPI.leadaddgloble, params, { headers: headersAuth })
      .then((response) => {
        if (response?.data?.data?.url) {
          router.push(response?.data?.data?.url)
        }
        if (response?.data?.message == 'success') {
          if (token) {
            props?.data?.page.handlePage('leads')
            props?.data?.otp.handleOtpCheck(false)
          }
        } else {
          toast.error(response?.data?.data)
        }
      })
      .catch((error) => {
        errorHandling(error)
        // router.push(`/${applyUrl}`)
      })
  }

  const handleApplyNow = (applyUrl) => {
    if (userData) {
      callAddLeadDetails(applyUrl)
    } else if (!userData) {
      router.push(`/${applyUrl}`)
    }
  }

  const getMobileFrozen = () => {
    const slugs = slugsArray?.length === 3 ? slugsArray?.splice(0, 2) : slugsArray
    return (
      slugs &&
      slugs?.map((item) => {
        return (
          <div className='flex' key=''>
            <div className='flex flex-col gap-[10px]'>
              <div className="w-[163px] text-center text-neutral-800 text-xs font-bold font-['Poppins'] leading-none">
                {item?.product_details?.card_name || ''}
              </div>
              <div className='text-center mt-[10px]'>
                <button
                  onClick={() => handleApplyNow(item?.product_details?.apply_url)}
                  className=' py-3 cursor-pointer w-[90px] rounded-lg text-[#212529] bg-[#49D49D] font-semibold '>
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        )
      })
    )
  }
  return (
    scrollY > 0 && (
      <div className='fixed h-[213px] max-sm:h-[144px] z-20 w-full top-0 bg-white mx-auto border-t border-[#D8D9DA]  flex justify-between items-center'>
        <div
          className={`container mx-auto pl-[350px] min-[1550px]:pl-![336px] max-sm:items-center max-sm:justify-center flex max-sm:pl-0 ${
            size?.width === 768 ? '!pl-12' : ''
          }`}>
          {slugsArray &&
            isDesktop &&
            slugsArray?.map((slug) => {
              return (
                <div className='h-[131px] w-auto flex gap-[21px] mr-[20px]' key=''>
                  <div className='w-[100px] h-[61.54px] py-[10px] flex justify-center bg-white rounded-md border border-slate-200 '>
                    <Image
                      src={`${Img_URL}/${slug?.product_details?.product_image}`}
                      id='2'
                      alt={`img`}
                      width={80}
                      height={20}
                      unoptimized={true}
                    />
                  </div>
                  <div className='flex flex-col gap-[12px] items-start'>
                    <div className="w-[163px] text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px]">
                      {slug?.product_details?.card_name || ''}
                    </div>

                    <div className='flex flex-row gap-[10px] items-center'>
                      {slug?.product_details?.rating ? (
                        <>
                          <div className="text-neutral-800 text-[15px] font-bold font-['Poppins'] leading-[21px]">
                            {slug?.product_details?.rating}
                          </div>
                          <div className=''>
                            <ReactStars
                              count={starCount}
                              size={14}
                              value={slug?.product_details?.rating}
                              edit={false}
                              color1={'#ccc'}
                              color2={'#49d49d'}
                            />
                          </div>
                        </>
                      ) : (
                        'NA'
                      )}
                    </div>

                    <div className='text-center'>
                      <button
                        onClick={() => handleApplyNow(slug?.product_details?.apply_url)}
                        className=' py-3 cursor-pointer w-[130px] rounded-lg text-[#212529] bg-[#49D49D] font-semibold '>
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          {!isDesktop && <div className='flex items-center justify-center mx-auto gap-[20px]'>{getMobileFrozen()}</div>}
        </div>
      </div>
    )
  )
}

export default FrozenCompareCards
