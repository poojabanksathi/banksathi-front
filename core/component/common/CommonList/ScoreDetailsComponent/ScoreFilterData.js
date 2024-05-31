/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ScoreDetailsFilter, ScoreDetailsFilterMobile } from '@/utils/alljsonfile/cardsdetailsfilter'
import { ScorBrandLogo } from '@/utils/alljsonfile/scorebrandlogo'
import dynamic from 'next/dynamic'
import accordionArrowall from '../../../../../public/assets/accordion-down.svg'
import accordionWhite from '../../../../../public/assets/accordion-white-icon.svg'
import { useRouter } from 'next/router'
import { BASE_URL, COMMON, ELIGIBILITY, USERSET } from '@/utils/alljsonfile/service'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import jwt from 'jwt-decode'
import { CheckUserData, errorHandling, handleRemoveLocalstorage } from '@/utils/util'
import PersonalisedCards from './PersonalisedCards'
import LoaderComponent from '@/core/component/Partners/LoaderComponent/LoaderComponent'
import Cookies from 'js-cookie'

const CardInsights = dynamic(() => import('@/core/component/common/CommonList/ScoreDetailsComponent/CardInsights'), {
  ssr: false
})

const MyApplicationList = dynamic(
  () => import('@/core/component/common/CommonList/ScoreDetailsComponent/MyApllicationScoreList'),
  {
    ssr: false
  }
)
const ScoreProducts = dynamic(() => import('@/core/component/common/CommonList/ScoreDetailsComponent/ScoreProducts'), {
  ssr: false
})
const ScoreSupport = dynamic(() => import('@/core/component/common/CommonList/ScoreDetailsComponent/ScoreSupport'), {
  ssr: false
})

const CreditInsights = dynamic(
  () => import('@/core/component/common/CommonList/ScoreDetailsComponent/CreditInsights'),
  {
    ssr: false
  }
)

const CreditProfile = dynamic(() => import('@/core/component/common/CommonList/ScoreDetailsComponent/CreditProfile'), {
  ssr: false
})
const PersonaliseOffer = dynamic(
  () => import('@/core/component/common/CommonList/ScoreDetailsComponent/PersonaliseOffer'),
  {
    ssr: false
  }
)

function ScoreFilterData({ productList, faqdata, bankAccountListing, personalLoanList }) {
  const [idData, setIdData] = useState(1)
  const [querySlug, setQuerySlug] = useState('credit-reports')
  const [querySlugInsight, setQuerySlugInsight] = useState('payment-history')
  const [queryProduct, setQueryProduct] = useState('eligible-products')
  const [brandlogoactive, setBrandLogoactive] = useState(1)
  const [indexData, setIndexData] = useState(0)
  const [scoreActive, setScoreActive] = useState(false)
  const [tabsActive, setTabsActive] = useState(false)
  const [supportActive, setSupportActive] = useState(false)
  const [selectIndexCardScore, setSelectIndexCardScore] = useState(0)
  const [selectProductTabs, setSelectProductTabs] = useState(0)
  const [selectSupportTabs, setSelectSupportTabs] = useState(0)
  const [accordianProduct, setAccordianProduct] = useState(false)
  const [accordianSupport, setAccordianSupport] = useState(false)
  const [scoreCurrent, setScoreCurrent] = useState()
  const [creditInsightsTab, setCreditInsightsTab] = useState(0)
  const [creditInsightAccordian, setCreditInsightAccordian] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [bestFitCards, setBestFitCards] = useState([])
  const [offerCount, setOfferCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')
  const token = typeof window !== 'undefined' && localStorage.getItem('token')
  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const refOutSide = typeof window !== 'undefined' && sessionStorage?.getItem('refererOutside')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')
  const refererUrl = typeof window !== 'undefined' && localStorage?.getItem('url')

  const utm_details = refererUrl ? refererUrl?.split('?')?.[1] : ''
  const leadIPData = leadsParams && JSON?.parse(leadsParams)
  const userData = localUserData && JSON.parse(localUserData)

  const offersCount = typeof window !== 'undefined' ? localStorage.getItem('offersCount') || offerCount : 0
  const excludedSlugs = ['others', 'credit-reports', 'profile', 'my-applications', 'products', 'support', 'my-offer']

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  const handleClickInsight = (index) => {
    setScoreActive(!scoreActive)
    setSelectIndexCardScore(index)
  }

  const handleClickProduct = (index) => {
    setTabsActive(!tabsActive)
    setSelectProductTabs(index)
  }
  const handleClickSupport = (index) => {
    setSupportActive(!supportActive)
    setSelectSupportTabs(index)
  }

  const handleClick = (index) => {
    setIndexData(index)
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
    }
  }, [])

  const eligibilityApiCall = () => {
    setIsLoading(true)
    const checkAllEligibilityFields = CheckUserData(userData)
    if (checkAllEligibilityFields) {
      let params = {
        pan_no: userData?.pan_no || null,
        mobile_no: userData?.mobile ? String(userData?.mobile) : '',
        full_name: userData?.full_name || '',
        pin_code: userData?.pin_code || '',
        email: userData?.email || '',
        occupation: userData?.occupation?.toLowerCase() || '',
        company_name: userData?.company_name || '',
        monthly_salary: userData?.monthly_salary || '',
        dob: userData?.dob || '',
        terms: 'agree',
        device_id: deviceId,
        request_id: '',
        url_slug: null,
        lang_id: 1,
        lead_profile_id: leadId || null,
        itr_amount: userData?.itr_amount
      }
      if (refOutSide) params = { ...params, referrer_url: refOutSide }
      if (leadIPData?.user_agent) params = { ...params, user_agent: leadIPData?.user_agent }
      if (leadIPData?.ip) params = { ...params, ip_address: leadIPData?.ip }
      if (utm_details) params = { ...params, utm_details: utm_details }
      axios
        .post(BASE_URL + ELIGIBILITY?.eligibilityRegister, params, { headers: headersAuth })
        .then((response) => {
          setIsLoading(false)
          if (response?.data?.message == 'success') {
            const alternateProducts = response?.data?.data?.alternate_product
              ? JSON.stringify(response?.data?.data?.alternate_product)
              : ''
            localStorage.setItem('@alternatdata', alternateProducts)
            localStorage.setItem('@eligibleproduct', response?.data?.data?.eligible_product)
            localStorage.setItem('@inputSlug', response?.data?.data?.input_slug)
          }
          if (response?.data?.message == 'failed') toast.error(response?.data?.data)
        })
        .catch((error) => {
          setIsLoading(false)
          errorHandling(error)
        })
    } else setIsLoading(false)
  }
  // --------------------- SCORE HISTORY API ----------------- //
  const GetScoreHistory = (afterRefresh = false) => {
    setShowLoader(true)
    // e?.preventDefault()
    axios
      .post(
        BASE_URL + USERSET?.creditscorehistory,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        setShowLoader(false)
        if (response?.data?.message == 'success') {
          setScoreCurrent(response?.data)
          if (afterRefresh) {
            eligibilityApiCall()
          }
        }
      })
      .catch((error) => {
        setShowLoader(false)
      })
  }
  // ---------------------- BEST FIT CARDS API ----------------------- //
  const getCards = (...arg) => {
    if (arg && productList) {
      const slugs = arg?.[0]
      const sortedList = []

      slugs?.map((element) => {
        const sorted = productList?.product_list?.filter((item) => {
          return item?.url_slug?.split('/')?.pop() === element
        })
        sortedList.push(sorted?.[0])
      })
      setBestFitCards(sortedList)
      setOfferCount(sortedList?.length)

      if (sortedList?.length === 0 && querySlug === 'my-offer') {
        router.push('/my-profile/my-offer')
      }
      localStorage.setItem('offersCount', sortedList?.length)
    }
  }

  const getBestFitCards = () => {
    if (querySlug === 'credit-reports' || querySlug === 'my-offer') {
      const params = {
        lead_profile_id: leadId
      }
      axios
        .post(BASE_URL + COMMON.bestFitCards, params, { headers: headersAuth })
        .then((res) => {
          if (res?.data.message === 'success') {
            getCards(res?.data?.data)
          }
        })
        .catch((error) => {
          console.log(error, 'Error while fetching best fit cards')
          localStorage.setItem('offersCount', 0)
        })
    }
  }

  useEffect(() => {
    setQuerySlug(router.pathname)
  }, [router.pathname])

  useEffect(() => {
    if (router?.pathname === '/my-profile') {
      setQuerySlug('credit-reports')
    } else if (router?.pathname === '/my-profile/profile') {
      setQuerySlug('profile')
    } else if (router?.pathname === '/my-profile/credit-reports') {
      setQuerySlug('credit-reports')
      setShowInsights(true)
      setCreditInsightAccordian(true)
    } else if (router?.pathname === '/my-profile/my-applications') {
      setQuerySlug('my-applications')
    } else if (router?.pathname === '/my-profile/products') {
      setQuerySlug('products')
      setAccordianProduct(true)
    } else if (router?.pathname === '/my-profile/support') {
      setQuerySlug('support')
      setAccordianSupport(true)
    } else if (router?.pathname === '/my-profile/my-offer') {
      setQuerySlug('my-offer')
    }
  }, [router?.pathname])

  useEffect(() => {
    if (token) {
      GetScoreHistory()
    }
    getBestFitCards()
  }, [])

  return (
    <>
      {(showLoader || isLoading) && <LoaderComponent />}
      <Toaster />

      <div className=''>
        <div
          className={`grid 2xl:gap-8 grid-cols-5  gap-4  max-[1024px]:grid-cols-1 max-[479px]:block ${
            querySlug === 'my-applications' || querySlug === 'support'
              ? 'pb-[100px] max-[1024px]:pb-[40px] max-[576px]:pb-[40px] max-[479px]:pb-2.5'
              : 'pb-0'
          } ${
            querySlug === 'products'
              ? 'pb-[190px]  max-[1024px]:pb-[100px] max-[576px]:pb-[80px] max-[479px]:pb-[50px] max-[320px]:pb-[40px]'
              : 'pb-0'
          }`}>
          <div className='col-span-1 bg-none  relative  block max-[1024px]:hidden'>
            <div className='p-3 bg-white filter-credit sticky top-20 rounded-3xl'>
              <div className='pt-4 '>
                {ScoreDetailsFilter?.filter((obj) => (scoreCurrent?.current_score === 0 ? obj?.id !== 3 : obj)).map(
                  (data, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          onClick={() => {
                            if (querySlug === 'products') {
                              setAccordianProduct(!accordianProduct)
                            } else if (querySlug === 'support') {
                              setAccordianSupport(!accordianSupport)
                            } else if (querySlug === 'credit-reports') {
                              setCreditInsightAccordian(!creditInsightAccordian)
                            }
                            setIdData(data?.id)
                          }}>
                          <Link href={`/my-profile/${data?.linkhref}`} prefetch={false}>
                            <p
                              className={
                                querySlug === data?.linkhref
                                  ? 'p-4 mb-2 bg-[#844FCF] active:bg-[#844FCF] flex items-center justify-between  duration-150 rounded-full hover:text-white text-white text-[15px] font-semibold detail-filter'
                                  : 'p-4 mb-2 hover:bg-[#844FCF] active:bg-[#844FCF] flex items-center justify-between duration-150 rounded-full hover:text-white text-[#212529] text-[15px] font-semibold detail-filter max-[1200px]:text-[13px]'
                              }>
                              {data.detaildata}
                              <div>
                                {data?.subData && (
                                  <div>
                                    {!creditInsightAccordian ? (
                                      <Image
                                        src={idData === data.id && data.subData ? accordionArrowall : accordionWhite}
                                        alt='up'
                                        width={24}
                                        height={24}
                                        className='Accordian w-6 h-6 shrink-0'
                                      />
                                    ) : (
                                      <Image
                                        src={idData === data.id && data.subData ? accordionArrowall : accordionWhite}
                                        alt='up'
                                        width={24}
                                        height={24}
                                        className='rotate-180 w-6 h-6 shrink-0'
                                      />
                                    )}
                                  </div>
                                )}
                                {data?.subDataProduct && (
                                  <div>
                                    {!accordianProduct ? (
                                      <Image
                                        src={
                                          idData === data.id && data.subDataProduct ? accordionWhite : accordionArrowall
                                        }
                                        alt='up'
                                        width={24}
                                        height={24}
                                        className=' w-6 h-6 shrink-0'
                                      />
                                    ) : (
                                      <Image
                                        src={
                                          idData === data.id && data.subDataProduct ? accordionWhite : accordionArrowall
                                        }
                                        alt='up'
                                        width={24}
                                        height={24}
                                        className='rotate-180 w-6 h-6 shrink-0'
                                      />
                                    )}
                                  </div>
                                )}

                                {data?.subDataSupport && (
                                  <div>
                                    {!accordianSupport ? (
                                      <Image
                                        src={
                                          idData === data.id && data.subDataSupport ? accordionWhite : accordionArrowall
                                        }
                                        alt='up'
                                        width={24}
                                        height={24}
                                        className=' w-6 h-6 shrink-0'
                                      />
                                    ) : (
                                      <Image
                                        src={
                                          idData === data.id && data.subDataSupport ? accordionWhite : accordionArrowall
                                        }
                                        alt='up'
                                        width={24}
                                        height={24}
                                        className='rotate-180 w-6 h-6 shrink-0'
                                      />
                                    )}
                                  </div>
                                )}
                                {data?.slug === 'my-offer' && offersCount && (
                                  <div className='w-[24px] h-[24px] bg-[#49D49D] rounded-full flex items-center justify-center'>
                                    <p className='text-black font-semibold'>{offersCount}</p>
                                  </div>
                                )}
                              </div>
                            </p>
                          </Link>
                        </div>

                        {creditInsightAccordian &&
                          data.subData?.map((data, index) => {
                            return (
                              <div key={index}>
                                <div
                                  id='accordionExample2'
                                  data-active-classes='bg-none'
                                  data-inactive-classes='text-[#212529]'>
                                  <button
                                    className='flex cursor-pointer filter-allof items-center justify-between w-full py-1 px-4 font-medium text-left text-gray-500 rounded-t-xl'
                                    type='button'
                                    id='headingTwo'
                                    data-te-collapse-init
                                    onClick={() => {
                                      handleClickInsight(index)
                                      setQuerySlugInsight(data?.sublinkdata)
                                    }}
                                    data-te-target='#collapseTwo'
                                    aria-expanded='true'
                                    aria-controls='collapseTwo'>
                                    <p
                                      className={`text-[15px] ${
                                        selectIndexCardScore === index ? ' text-[#844FCF]' : 'text-[#212529]'
                                      } hover:!text-[#844FCF] font-normal leading-[30px]`}>
                                      {data?.subtitle}
                                    </p>
                                  </button>
                                </div>
                              </div>
                            )
                          })}

                        {accordianProduct &&
                          data?.subDataProduct?.map((selectdata, index) => {
                            return (
                              <div key={index}>
                                <div
                                  id='accordionExample2'
                                  data-active-classes='bg-none'
                                  data-inactive-classes='text-[#212529]'>
                                  <button
                                    className='flex cursor-pointer filter-allof items-center justify-between w-full py-1 px-4 font-medium text-left text-gray-500 rounded-t-xl'
                                    type='button'
                                    id='headingTwo'
                                    data-te-collapse-init
                                    onClick={() => {
                                      handleClickProduct(index)
                                      setQueryProduct(selectdata?.sublinkdata)
                                    }}
                                    data-te-target='#collapseTwo'
                                    aria-expanded='true'
                                    aria-controls='collapseTwo'>
                                    <p
                                      className={`text-[15px] ${
                                        selectProductTabs === index ? ' text-[#844FCF]' : 'text-[#212529]'
                                      } hover:!text-[#844FCF] font-normal leading-[30px]`}>
                                      {selectdata?.subtitle}
                                    </p>
                                  </button>
                                </div>
                              </div>
                            )
                          })}

                        {accordianSupport &&
                          data?.subDataSupport?.map((selectdata, index) => {
                            return (
                              <div key={index}>
                                <div
                                  id='accordionExample2'
                                  data-active-classes='bg-none'
                                  data-inactive-classes='text-[#212529]'>
                                  <button
                                    className='flex cursor-pointer filter-allof items-center justify-between w-full py-1 px-4 font-medium text-left text-gray-500 rounded-t-xl'
                                    type='button'
                                    id='headingTwo'
                                    data-te-collapse-init
                                    onClick={() => {
                                      handleClickSupport(index)
                                      setQueryProduct(selectdata?.sublinkdata)
                                    }}
                                    data-te-target='#collapseTwo'
                                    aria-expanded='true'
                                    aria-controls='collapseTwo'>
                                    <p
                                      className={`text-[15px] ${
                                        selectSupportTabs === index ? ' text-[#844FCF]' : 'text-[#212529]'
                                      } hover:!text-[#844FCF] font-normal leading-[30px]`}>
                                      {selectdata?.subtitle}
                                    </p>
                                  </button>
                                </div>
                              </div>
                            )
                          })}
                      </>
                    )
                  }
                )}
              </div>
            </div>
          </div>
          <div className='col-span-1 bg-none  relative flex hidden max-[1024px]:block mb-5 max-sm:mb-0 max-[576px]:col-span-4'>
            <div className='border-b border-[#E6ECF1] list-none flex gap-8  max-[771px]:gap-8  max-[771px]:overflow-x-scroll max-[771px]:whitespace-nowrap !scrollbar-hide list-t max-[771px]:justify-start  w-full  px-[30px] max-[1440px]:px-12  max-[1200px]:px-8 max-[1024px]:px-8  max-[576px]:gap-8 tab-credit-box'>
              {ScoreDetailsFilterMobile?.map((insightData, index) => {
                return (
                  <div key={index} className='relative'>
                    <div
                      className={
                        querySlug === insightData?.linkhref
                          ? 'pb-3 w-auto max-[1440px]:w-full tab-box-res cursor-pointer border-b-2 border-[#844FCF]'
                          : 'pb-3 w-auto max-[1440px]:w-full tab-box-res cursor-pointer'
                      }
                      onClick={() => {
                        setQuerySlug(insightData?.linkhref)
                        handleClick(index)
                      }}>
                      <Link href={`/my-profile/${insightData?.linkhref}`} prefetch={false}>
                        <p
                          className={
                            querySlug === insightData?.linkhref
                              ? 'font-[faktum] font-normal text-[15px] text-[#844FCF] max-[1024px]:text-[16px]  max-[991px]:text-[15px] max-[479px]:text-[13px] flex items-center gap-2'
                              : 'font-[faktum] font-normal text-[15px] max-[1024px]:text-[16px] text-[#212529]  max-[991px]:text-[15px] max-[479px]:text-[13px] flex items-center gap-2'
                          }>
                          {insightData?.detaildata}
                          <div>
                            {insightData?.slug === 'my-offer' && offersCount && (
                              <div className='w-[24px] h-[24px] bg-[#49D49D] rounded-full flex items-center justify-center'>
                                <p className='text-black'>{offersCount}</p>
                              </div>
                            )}
                          </div>
                        </p>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className='col-span-4 flex flex-col '>
            {!excludedSlugs.includes(querySlug) ? (
              <div className='brand-logo-score flex items-center gap-2 pb-6 max-[479px]:px-4'>
                {ScorBrandLogo?.map((logobrand, index) => {
                  return (
                    <>
                      <div
                        onClick={() => setBrandLogoactive(logobrand?.id)}
                        className={`py-4 px-10 
                        bg-white rounded-full shadow-lg
                        `}>
                        <Image src={logobrand?.scorbrand} width={68} height={68} alt='img' className='' />
                      </div>
                    </>
                  )
                })}
              </div>
            ) : (
              ''
            )}
            <div className='h-full'>
              {querySlug === 'my-applications' ? (
                <MyApplicationList headersAuth={headersAuth} token={token} leadId={leadId} />
              ) : (
                ''
              )}
              {querySlug === 'my-offer' ? (
                <>
                  <PersonalisedCards
                    productList={productList}
                    bankAccountListing={bankAccountListing}
                    bestFitCards={bestFitCards}
                  />
                </>
              ) : (
                ''
              )}
              {querySlug === 'products' ? (
                <ScoreProducts
                  queryProduct={queryProduct}
                  SelectProductTabs={selectProductTabs}
                  setSelectprodctTabs={setSelectProductTabs}
                  productList={productList}
                  bankAccountListing={bankAccountListing}
                  personalLoanList={personalLoanList}
                />
              ) : (
                ''
              )}
              {querySlug === 'support' ? (
                <ScoreSupport
                  queryProduct={queryProduct}
                  SelectSupportTabs={selectSupportTabs}
                  setSelectSupportTabs={setSelectSupportTabs}
                  faqdata={faqdata}
                />
              ) : (
                ''
              )}
              {querySlug === 'credit-reports' && showInsights ? (
                <div className=''>
                  <CreditInsights
                    creditInsightsTab={creditInsightsTab}
                    querySlugInsight={querySlugInsight}
                    // enquiryDetails={profileformData?.enquiry_details}
                    SelectIndexCardScore={selectIndexCardScore}
                    setSelectIndexCardScore={setSelectIndexCardScore}
                    ScoreCurrent={scoreCurrent}
                    GetScoreHistory={GetScoreHistory}
                    // creditEnquiryData={enquiryData}
                    bankAccountListing={bankAccountListing}
                    productList={productList}
                    bestFitCards={bestFitCards}
                  />
                </div>
              ) : (
                ''
              )}

              {querySlug === 'profile' ? (
                <div className={querySlug === 'profile' ? ' pt-0' : 'pt-10'}>
                  <CreditProfile />
                </div>
              ) : (
                ''
              )}
            </div>

            <>
              {querySlug !== 'my-applications' &&
                querySlug !== 'products' &&
                querySlug !== 'support' &&
                querySlug !== 'profile' && (
                  <div>
                    <PersonaliseOffer
                      querySlug={querySlug}
                      productList={productList}
                      bankAccountListing={bankAccountListing}
                    />
                  </div>
                )}
            </>

            {querySlug === 'credit-reports' && showInsights && (
              <div className='pb-10 pt-[30px]'>
                <CardInsights
                  setCreditInsightsTab={setCreditInsightsTab}
                  querySlugInsight={querySlugInsight}
                  ScoreCurrent={scoreCurrent}
                  bestFitCards={bestFitCards}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ScoreFilterData
