/* eslint-disable react-hooks/exhaustive-deps */
import { AvailableProduct, EligibilityCardBox, ProductEligibleCardBox } from '@/utils/alljsonfile/cardseligibility'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'

import { useEffect } from 'react'
import chevronDown from '../../../../../public/assets/chevronDown.svg'

import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import jwt from 'jwt-decode'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { handleRemoveLocalstorage } from '@/utils/util'
import PaymentHistoryMonths from '../../PaymentHistoryMonths'
import dynamic from 'next/dynamic'

const EligibleProductsListing = dynamic(() => import('./EligibleProductsListing'), { ssr: false })

const tabProductsData = [
  { id: 1, title: 'Active', value: 'Active' },
  { id: 2, title: 'Closed', value: 'Inactive' }
]

function EligibleProductCards({
  SelectProductTabs,
  productList,
  paymentHistory,
  profileProductData,
  filteredBankAccountsData,
  eligiblePersonalLoans,
  creditRef,
  bankRef,
  loanRef
}) {
  const [activeArrow, setActiveArrow] = useState('right')
  const [profileformData, setProfileFormdata] = useState([])
  const [SelectIndexCardScore, setSelectIndexCardScore] = useState(0)
  const [viewDetailsShow, setViewDetailsShow] = useState([])
  const [selectProductsActivity, setSelectProductsActivity] = useState(0)
  const [selectStatus, setSelectStatus] = useState('Active')
  const [uniqueAccountTypes, setUniqueAccountTypes] = useState([])
  const [selectType, setSelectType] = useState()
  const filteredDataCard = productList?.product_list?.filter((obj) =>
    profileProductData?.eligible_product?.credit_cards?.includes(obj.url_slug.split('/').pop())
  )

  const handleHideShow = (index) => {
    setViewDetailsShow(viewDetailsShow === index ? null : index)
  }
  const sliderRef = useRef(null)
  const handleArrowClick = (arrow) => {
    setActiveArrow(arrow)
    if (sliderRef.current) {
      if (arrow === 'left') {
        sliderRef.current.slickPrev()
      } else if (arrow === 'right') {
        sliderRef.current.slickNext()
      }
    }
  }
  const leadId = localStorage.getItem('leadprofileid')
  const token = localStorage.getItem('token')

  const router = useRouter()

  const tabData = [
    { id: 1, title: 'All' },
    { id: 2, title: 'Credit Cards' },
    { id: 3, title: 'Personal Loans' },
    { id: 4, title: 'Car Loan' },
    { id: 5, title: 'Home Loan' },
    { id: 6, title: 'Others' }
  ]

  useEffect(() => {
    if (token) {
      const decordtoken = jwt(token)

      const timecurrrunt = Date.now()
      const timestampexp = decordtoken?.exp

      const CurruntTime = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(timecurrrunt)

      function formatUnixTimestamp(timestampexp) {
        const dateObj = new Date(timestampexp * 1000)
        const month = dateObj.getMonth() + 1
        const day = dateObj.getDate()
        const year = dateObj.getFullYear()
        const hours = dateObj.getHours()
        const minutes = dateObj.getMinutes()
        const seconds = dateObj.getSeconds()
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const formattedDate = `${month}/${day}/${year}, ${formatTimeexp(hours)}:${formatTimeexp(
          minutes
        )}:${formatTimeexp(seconds)} ${ampm}`
        return formattedDate
      }

      function formatTimeexp(time) {
        return time < 10 ? '0' + time : time
      }

      const formattedDateExp = formatUnixTimestamp(timestampexp)

      if (CurruntTime === formattedDateExp) {
        router.push('/login')
        toast.success(ApiMessage?.logoutmessage)
        handleRemoveLocalstorage()
      }
    }
  }, [])

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const handleClick = (index, insightData) => {
    setSelectType(insightData)
    setSelectIndexCardScore(index + 1)
  }
  const handleClickActivity = (index, tabsdata) => {
    setSelectProductsActivity(index)
    setSelectStatus(tabsdata)
  }

  const sliderScroll = document.querySelector('.category-scroll-parent')
  let mouseDown = false
  let startX, scrollLeft

  let startDragging = function (e) {
    mouseDown = true
    startX = e.pageX - sliderScroll.offsetLeft
    scrollLeft = sliderScroll.scrollLeft
  }
  let stopDragging = function (event) {
    mouseDown = false
  }
  sliderScroll?.addEventListener('mousemove', (e) => {
    e.preventDefault()
    if (!mouseDown) {
      return
    }
    const x = e.pageX - sliderScroll.offsetLeft
    const scroll = x - startX
    sliderScroll.scrollLeft = scrollLeft - scroll
  })

  // Add the event listeners
  sliderScroll?.addEventListener('mousedown', startDragging, false)
  sliderScroll?.addEventListener('mouseup', stopDragging, false)
  sliderScroll?.addEventListener('mouseleave', stopDragging, false)

  useEffect(() => {
    if (paymentHistory?.total_accounts_data?.length > 0) {
      const accountTypeSet = new Set()
      paymentHistory?.total_accounts_data?.forEach((item) => {
        accountTypeSet.add(item.account_type)
      })
      const uniqueTypesArray = Array.from(accountTypeSet)
      setUniqueAccountTypes(uniqueTypesArray)
    }
  }, [paymentHistory?.total_accounts_data?.length > 0])
  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  return (
    <>
      <Toaster />

      {SelectProductTabs === 0 && (
        <>
          {filteredDataCard?.length > 0 ? (
            <div className=''>
              <div className=' eligible-products-slider relative max-sm:px-4' ref={creditRef}>
                <EligibleProductsListing
                  eligbileHeading={true}
                  filteredDataCard={filteredDataCard}
                  creditFirst={true}
                  filteredBankAccountsData={filteredBankAccountsData}
                  eligiblePersonalLoans={eligiblePersonalLoans}
                  loanRef={loanRef}
                  bankRef={bankRef}
                />
              </div>
            </div>
          ) : (
            <div className='h-full flex justify-center items-center'>
              <p className='align-item-center-p text-[20px] text-center max-[479px]:text-[18px] max-[479px]:px-4'>
                No eligible product available Please click here to{' '}
                <Link href='/credit-cards/eligibility' prefetch={false}>check eligibility</Link>
              </p>
            </div>
          )}
        </>
      )}

      {SelectProductTabs === 1 && (
        <>
          {uniqueAccountTypes?.length > 0 ? (
            <div className='rounded-3xl bg-white  '>
              <div className='border-b  border-[#E6ECF1] list-none flex gap-8  max-[771px]:gap-8 pt-5 max-[771px]:justify-start  w-full  px-[30px] max-[1440px]:px-12  max-[1200px]:px-8 max-[1024px]:px-8  max-[576px]:gap-8 !overflow-x-scroll !whitespace-nowrap !scrollbar-hide'>
                <div className='category-scroll-parent'>
                  <div className='category-scroll-child'>
                    <div
                      className={
                        SelectIndexCardScore === 0
                          ? 'pb-3   cursor-pointer border-b-2 border-[#844FCF]'
                          : 'pb-3   cursor-pointer text-[#212529]'
                      }
                      onClick={() => setSelectIndexCardScore(0)}>
                      <p
                        className={
                          SelectIndexCardScore === 0
                            ? 'font-[faktum] font-normal text-[15px] text-[#844FCF] max-[1024px]:text-[16px]  max-[991px]:text-[15px] max-[479px]:text-[13px]'
                            : 'font-[faktum] font-normal text-[15px] max-[1024px]:text-[16px]  max-[991px]:text-[15px] max-[479px]:text-[13px] text-[#212529]'
                        }>
                        All
                      </p>
                    </div>
                    {uniqueAccountTypes?.length > 0 &&
                      uniqueAccountTypes?.map((insightData, index) => {
                        return (
                          <div key={index} className='relative'>
                            <div
                              className={
                                index + 1 === SelectIndexCardScore
                                  ? 'pb-3  max-[1440px]:w-full w-max  cursor-pointer border-b-2 border-[#844FCF]'
                                  : 'pb-3  max-[1440px]:w-full  w-max cursor-pointer text-[#212529]'
                              }
                              onClick={() => handleClick(index, insightData)}>
                              <p
                                className={
                                  index + 1 === SelectIndexCardScore
                                    ? 'font-[faktum] font-normal w-max text-[15px] text-[#844FCF] max-[1024px]:text-[16px]  max-[991px]:text-[15px] max-[479px]:text-[13px] !capitalize'
                                    : 'font-[faktum] font-normal w-max text-[15px] max-[1024px]:text-[16px]  max-[991px]:text-[15px] max-[479px]:text-[13px] text-[#212529] !capitalize'
                                }>
                                {toTitleCase(insightData)}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>

              {/* ==== payment history ======= */}
              {SelectIndexCardScore === 0 && (
                <>
                  <div className='p-[30px]'>
                    <div className='w-[25%] border-1 border-[#C2CACF] max-[1440px]:w-[22%] max-[1200px]:w-[24%] max-[1024px]:w-[22%] max-[820px]:w-[28%] max-[771px]:w-[30%] h-[56px]  max-[576px]:w-[70%] max-[479px]:w-[60%] max-[375px]:w-[75%] grid grid-cols-2 gap-2 bg-[#F4F8FB] py-2 px-3 justify-between rounded-full items-center  '>
                      {tabProductsData?.map((tabsdata, index) => {
                        return (
                          <>
                            <p
                              className={`text-center cursor-pointer head-text font-[faktum]  font-semibold text-[15px] h-full flex justify-center items-center max-[479px]:text-[14px]  max-[375px]:text-[14px] max-[360px]:text-[13px] max-[320px]:text-[14px] max-[320px]:px-0 mt-0 rounded-full  max-[280px]:text-[12px] ${
                                index == selectProductsActivity ? 'bg-[#844FCF] text-white' : 'text-[#212529]'
                              }`}
                              onClick={() => {
                                handleClickActivity(index, tabsdata.value)
                              }}>
                              {tabsdata.title}
                            </p>
                          </>
                        )
                      })}
                    </div>
                    {Array.isArray(paymentHistory?.total_accounts_data) &&
                      paymentHistory?.total_accounts_data
                        ?.filter((obj) => obj?.status === selectStatus)
                        .map((datapayment, index) => {
                          return (
                            <div key={index}>
                              <div className='border border-[#E6ECF1] rounded-2xl mt-3'>
                                <div className='p-5 flex border-b border-[#E6ECF1]'>
                                  <div className=' w-full flex  gap-2'>
                                    <div className='pl-2 max-[479px]:pl-0 flex w-full  justify-between max-[576px]:flex-wrap max-[576px]:gap-y-4 max-[576px]:gap-x-4'>
                                      <div>
                                        <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                          {datapayment?.bank_name}
                                        </span>
                                        <p className='font-poppins font-normal text-xs leading-6 text-[#212529] !capitalize'>
                                          {datapayment?.account_type}
                                        </p>
                                      </div>
                                      <div>
                                        <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                          Account Number
                                        </p>
                                        {datapayment?.account_no && (
                                          <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                            {datapayment?.account_no}
                                          </span>
                                        )}
                                      </div>
                                      <div>
                                        <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                          On-Time Payments
                                        </p>
                                        {datapayment?.on_time_payment && (
                                          <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                            {datapayment?.on_time_payment}
                                          </span>
                                        )}
                                      </div>
                                      <div>
                                        <div>
                                          <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                            Status
                                          </p>
                                          {datapayment?.status && (
                                            <span
                                              className={`font-poppins font-semibold text-[15px] leading-7  ${
                                                datapayment?.status == 'Active' ? 'text-[#49D49D]' : 'text-[red]'
                                              }`}>
                                              {datapayment?.status == 'Active' ? 'Active' : 'Closed'}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {viewDetailsShow === index && (
                                  <>
                                    <PaymentHistoryMonths datapayment={datapayment} />
                                  </>
                                )}

                                <div className='p-3'>
                                  <button
                                    onClick={() => handleHideShow(index)}
                                    className='text-[#49D49D] cursor-pointer text-[13px] w-full font-semibold flex items-center gap-2 justify-center font-[Faktum]'>
                                    {viewDetailsShow === index ? 'Hide Details' : 'View Details'}

                                    {viewDetailsShow === index ? (
                                      <Image src={chevronDown} alt='up' className='rotate-180  w-3 h-3 shrink-0' />
                                    ) : (
                                      <Image src={chevronDown} alt='up' className=' w-3 h-3 shrink-0' />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                  </div>
                </>
              )}
              {/* ==== credit Utilisation ==== */}
              {SelectIndexCardScore !== 0 && (
                <div className='p-[30px]'>
                  <div>
                    {' '}
                    {Array.isArray(paymentHistory?.total_accounts_data) &&
                      paymentHistory?.total_accounts_data
                        ?.filter((obj) => obj?.account_type == selectType)
                        .map((datapayment, index) => {
                          return (
                            <div key={index}>
                              <div className='border border-[#E6ECF1] rounded-2xl mt-3'>
                                <div className='p-5 flex border-b border-[#E6ECF1]'>
                                  <div className=' w-full flex  gap-2'>
                                    <div className='pl-2 max-[479px]:pl-0 flex w-full  justify-between max-[576px]:flex-wrap max-[576px]:gap-y-4 max-[576px]:gap-x-4'>
                                      <div>
                                        <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                          {datapayment?.bank_name}
                                        </span>
                                        <p className='font-poppins font-normal text-xs leading-6 text-[#212529] !capitalize'>
                                          {datapayment?.account_type}
                                        </p>
                                      </div>
                                      <div>
                                        <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                          Account Number
                                        </p>
                                        {datapayment?.account_no && (
                                          <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                            {datapayment?.account_no}
                                          </span>
                                        )}
                                      </div>
                                      <div>
                                        <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                          On-Time Payments
                                        </p>
                                        {datapayment?.on_time_payment && (
                                          <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                            {datapayment?.on_time_payment}
                                          </span>
                                        )}
                                      </div>
                                      <div>
                                        <div>
                                          <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                            Status
                                          </p>
                                          {datapayment?.status && (
                                            <span
                                              className={`font-poppins font-semibold text-[15px] leading-7  ${
                                                datapayment?.status == 'Active' ? 'text-[#49D49D]' : 'text-[red]'
                                              }`}>
                                              {datapayment?.status == 'Active' ? 'Active' : 'Closed'}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {viewDetailsShow === index && (
                                  <>
                                    <PaymentHistoryMonths datapayment={datapayment} />
                                  </>
                                )}

                                <div className='p-3'>
                                  <button
                                    onClick={() => handleHideShow(index)}
                                    className='text-[#49D49D] cursor-pointer text-[13px] w-full font-semibold flex items-center gap-2 justify-center font-[Faktum]'>
                                    {viewDetailsShow === index ? 'Hide Details' : 'View Details'}

                                    {viewDetailsShow === index ? (
                                      <Image src={chevronDown} alt='up' className='rotate-180  w-3 h-3 shrink-0' />
                                    ) : (
                                      <Image src={chevronDown} alt='up' className=' w-3 h-3 shrink-0' />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className='h-full flex justify-center items-center '>
              <p className='align-item-center-p text-[20px] text-center max-[479px]:text-[18px] max-[479px]:px-4'>
                No available product available Please click here to{' '}
                <Link href='/credit-cards/eligibility' prefetch={false}>check eligibility</Link>
              </p>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default EligibleProductCards
