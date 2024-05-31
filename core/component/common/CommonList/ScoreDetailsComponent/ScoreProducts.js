import React, { useRef, useEffect, useState } from 'react'
import SideBar from '../../SiderBarList'
import dynamic from 'next/dynamic'
import { BASE_URL, USERSET } from '@/utils/alljsonfile/service'
import axios from 'axios'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import jwt from 'jwt-decode'
import { useRouter } from 'next/router'
import { handleRemoveLocalstorage } from '@/utils/util'
import { toast } from 'react-hot-toast'

const EligibleProductCards = dynamic(
  () => import('@/core/component/common/CommonList/ScoreDetailsComponent/EligibleProductCards'),
  {
    ssr: false
  }
)

const tabProductsData = [
  { id: 0, title: 'Eligible' },
  { id: 2, title: 'Available' }
]

const ScoreProducts = ({
  SelectProductTabs,
  setSelectprodctTabs,
  productList,
  bankAccountListing,
  personalLoanList
}) => {
  const creditRef = useRef(null)
  const bankRef = useRef(null)
  const loanRef = useRef(null)

  const [tabs, setTabs] = useState(0)
  const [siderbar, setSideBar] = useState(false)
  const [paymentHistory, setPaymentHistory] = useState([])
  const [profileProductData, setProfileProductdata] = useState([])
  const [eligibleProducts, setEligibleProducts] = useState([])
  const [eligiblePersonalLoans, setEligiblePersonalLoans] = useState([])
  const [filteredBankAccountsData, setFilteredBankAccountsData] = useState([])

  const handleClick = (index) => {
    setTabs(index)
    setSelectprodctTabs(index)
  }

  const leadId = localStorage.getItem('leadprofileid')
  const token = localStorage.getItem('token')

  const router = useRouter()

  const hasProducts = eligibleProducts?.length > 0

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  const GetPaymentHistory = (e) => {
    e?.preventDefault()
    axios
      .post(
        BASE_URL + USERSET?.paymenthistory,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setPaymentHistory(response?.data?.payment_history_details)
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
        } else if (error?.response?.status == 403) {
        } else if (error?.response?.status == 500) {
        }
      })
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
          setProfileProductdata(response?.data?.data)
          const eligibleObj = response?.data?.data?.eligible_product
          const filteredDataCard = productList?.product_list
            ? productList?.product_list?.filter((obj) =>
                eligibleObj?.credit_cards?.includes(obj.url_slug.split('/').pop())
              )
            : []
          const loanFiltered = personalLoanList?.product_list
            ? personalLoanList?.product_list?.filter((obj) =>
                eligibleObj?.personal_loans?.includes(obj.url_slug.split('/').pop())
              )
            : []
          const banksFiltered = bankAccountListing?.product_list?.filter((obj) =>
            eligibleObj?.bank_accounts?.includes(obj.url_slug.split('/').pop())
          )
          setFilteredBankAccountsData(banksFiltered)
          setEligiblePersonalLoans(loanFiltered)
          setEligibleProducts(filteredDataCard)
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('userData', JSON.stringify(response?.data?.data))
        }
      })
      .catch((error) => {
        if (error?.response?.data?.data?.message == 'failed') {
        } else if (error?.response?.status == 401) {
          router.push('/login')
          toast.success(ApiMessage?.logoutmessage)
          handleRemoveLocalstorage()
        } else if (error?.response?.status == 403) {
        }
      })
  }
  const scrollIntoSection = (ref) =>
    ref?.current?.scrollIntoView({
      behavior: 'smooth'
    })

  const handleScroll = (name) => {
    console.log(name)
    if (name === 'credit') scrollIntoSection(creditRef)
    if (name === 'loan') scrollIntoSection(loanRef)
    if (name === 'bank') scrollIntoSection(bankRef)
  }

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
      GetUserSetUp()
      GetPaymentHistory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {siderbar ? (
        <div className='transition-all ease-in'>
          <SideBar setSideBar={setSideBar} />
        </div>
      ) : (
        ''
      )}
      <div className='h-full'>
        <div
          className={`pb-4 flex ${
            hasProducts ? 'justify-between' : 'justify-end'
          } max-[479px]:px-4 items-center max-[479px]:flex-col-reverse max-[479px]:gap-5`}>
          {hasProducts && (
            <div className='flex flex-row gap-2 items-center'>
              {eligibleProducts?.length > 0 && (
                <div onClick={() => handleScroll('credit')}>
                  <h3 className='text-[18px] max-sm:text-[13px] max-sm:leading-[24px] max-sm:text-center text-[#212529] px-2 cursor-pointer my-2 font-semibold font-[poppins] hover:text-[#844FCF]'>
                    Eligible Credit Cards
                  </h3>
                </div>
              )}
            </div>
          )}
          <div className='w-[25%]  max-[768px]:w-full border-1 border-[#C2CACF] max-[1440px]:w-[22%]  max-[1200px]:w-[24%] max-[1024px]:w-[22%] max-[834px]:w-[30%] max-[820px]:w-[28%] max-[771px]:w-[30%] h-[56px]  grid grid-cols-2 gap-2 bg-white rounded-full py-2 px-3 justify-between items-center  '>
            {tabProductsData?.map((tabsdata, index) => {
              return (
                <>
                  <p
                    className={`text-center cursor-pointer head-text font-[faktum]  font-semibold text-[15px] h-full flex justify-center items-center max-[479px]:text-[14px]  max-[375px]:text-[14px] max-[360px]:text-[13px] max-[320px]:text-[14px] max-[320px]:px-0 mt-0 rounded-full  max-[280px]:text-[12px] ${
                      index == SelectProductTabs ? 'bg-[#844FCF] text-white' : 'text-[#212529]'
                    }`}
                    onClick={() => handleClick(index)}>
                    {tabsdata.title}
                  </p>
                </>
              )
            })}
          </div>
        </div>
        <EligibleProductCards
          SelectProductTabs={SelectProductTabs}
          productList={productList}
          paymentHistory={paymentHistory}
          profileProductData={profileProductData}
          filteredBankAccountsData={filteredBankAccountsData}
          eligiblePersonalLoans={eligiblePersonalLoans}
          creditRef={creditRef}
          loanRef={loanRef}
          bankRef={bankRef}
        />
      </div>
    </>
  )
}

export default ScoreProducts
