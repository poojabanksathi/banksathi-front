import React, { useEffect, useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import accordionArrowall from '../../../../public/assets/accordion-down.svg'
import successBgIcon from '../../../../public/assets/success-bg-icon.svg'
import CloseIcon from '../../../../public/assets/closeIcon.svg'
import BackArrow from '../../../../public/assets/left-arrow.svg'
import alertOctagon from '../../../../public/assets/alert-octagon.svg'
import FilterIcon from '../../../../public/assets/filter-icon.svg'
import LoaderLogo from '../../../../public/assets/logo-loader.gif'

import Link from 'next/link'
import {
  CardIssuer,
  CardNetwork,
  CreditScoreMore,
  FilaterData,
  ProviderFilter,
  TopPickFilter,
  sortingOptions
} from '@/utils/alljsonfile/filterdata'
import ReactStars from 'react-stars'
import dynamic from 'next/dynamic'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useRouter } from 'next/router'
import InputRange from 'react-input-range'
import { BASE_URL, BUSINESSCATEGORY, USERSET } from '@/utils/alljsonfile/service'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import jwt from 'jwt-decode'
import {
  errorHandling,
  getHash,
  getPromotionObject,
  getSortKeyCreditCards,
  lowToHigh,
  lowToHighSort,
  removeDuplicates,
  sendEventToGTM
} from '@/utils/util'
import ApplyNowButton from '../ApplyNowButton/ApplyNowButton'
import useGaEvents from '@/hooks/useGaEvents'
import StarRatings from 'react-star-ratings'

const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

const CompareNowBtn = dynamic(() => import('@/core/component/common/CompareNowBtn'), {
  ssr: false
})
const CreditCardsRoundButton = dynamic(() => import('@/core/component/common/CreditCardsRoundButton'), {
  ssr: false
})
const FilterNotFound = dynamic(() => import('@/core/component/common/FilterNotFound'), {
  ssr: false
})
const PaginationData = dynamic(() => import('@/core/component/common/Pagination'), {
  ssr: false
})

function ListingFilter({ productlistdata, categorytopmenulist, moreleftmenucredit, url_slug, isInViewPort }) {
  const [isActive, setIsActive] = useState(false)
  const [providerActive, setProviderActive] = useState(true)
  const [networkActive, setNetworkActive] = useState(false)
  const [categoryactive, setrCategoryactive] = useState('credit-cards')
  const [SelectIndex, setSelectIndex] = useState([])
  const [SelectIndexProvider, setSelectIndexProvider] = useState(0)
  const [SelectIndexCardNetwork, setSelectIndexCardNetwork] = useState()
  const [filterdata, setFilterData] = useState([])
  const [filteredData, setFilteredData] = useState(productlistdata?.product_list)
  const [modal, setModal] = useState(false)
  const [comparemodal, setCompareModal] = useState(false)
  const [compareslug, setCompareSlug] = useState([])
  const [checkFilter, setCheckFilter] = useState([])
  const [checkboxValues, setCheckboxValues] = useState([])
  const [cardNetworkCheck, setCardNetworkCheck] = useState([])
  const [ratingstar, setRatingstar] = useState(null)
  const [isChecked, setIsChecked] = useState(false)
  const [isLougeValue, setIsLougeValue] = useState('')
  const [slugData, setSlugData] = useState(false)
  const [getdatauser, setGetDataUser] = useState([])
  const [showData, setShowData] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [fieldValue, setFieldValue] = useState()
  const [mobileLoader, setMobileLoader] = useState(false)
  const [pageParam, setPageParam] = useState(0)
  const [isTheLastChild, setIsTheLastChild] = useState(false)
  const [listingFilteredData, setListingFilteredeData] = useState([])
  const [openSortBy, setOpenSortBy] = useState(false)
  const [selectedSortOption, setSelectedSortOption] = useState('Default')
  const [vieMoreAccordion, setVieMoreAccordion] = useState(false)
  const [vieMoreIndex, setVieMoreIndex] = useState([])

  const pageSize = 20
  const finalArray = getdatauser?.eligible_product?.credit_cards
  const userData = typeof window !== 'undefined' && localStorage?.getItem('userData')
  const scrollValue = typeof window !== 'undefined' && window?.scrollY

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')
      const utm_details = refererUrl?.split('?')?.[1]
      setFieldValue(utm_details)
    }
  }, [])

  const filteredDataCard = (datas) => {
    const finalData = datas.split('/').pop()
    return finalArray?.includes(finalData) ? 'Eligible' : 'Check Eligibility'
  }
  const fetchListingFilterData = async () => {
    try {
      const requestParams = {
        lang_id: 1,
        business_category_url_slug: 'credit-cards',
        offset: 0,
        limit: 200
      }
      const response = await axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, requestParams)
      const data = await response?.data?.product_list
      setListingFilteredeData(data)
    } catch (error) {
      return errorHandling(error)
    }
  }

  const handleViewMoreAccordion = (index) => {
    setVieMoreAccordion(!vieMoreAccordion)
    if (vieMoreIndex?.includes(index)) {
      const updateValue = vieMoreIndex.indexOf(index)
      vieMoreIndex.splice(updateValue, 1)
      setVieMoreIndex(vieMoreIndex)
    } else {
      setVieMoreIndex([...vieMoreIndex, index])
    }
  }

  const starCount = 5
  const size = useWindowSize()
  const router = useRouter()
  const token = localStorage.getItem('token')
  const leadId = localStorage.getItem('leadprofileid')

  const windowSize = useMemo(() => {
    return size?.width
  }, [size?.width])

  const isMobile = windowSize <= 576

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
        localStorage.removeItem('token')
        localStorage.removeItem('leadprofileid')
        localStorage.removeItem('registerdevicedata')
        localStorage.removeItem('ShowButton')
        localStorage.removeItem('transaction_id')
        localStorage.removeItem('auth_type')
        localStorage.removeItem('cibilOtp')
        localStorage.removeItem('auth_Otp')
        localStorage.removeItem('userName')
        localStorage.removeItem('@alternatdata')
        localStorage.removeItem('@eligibleproduct')
        localStorage.removeItem('uerySlug')
        localStorage.removeItem('LeadMobile')
        localStorage.removeItem('ValidPan')
        localStorage.removeItem('panName')
      }
    }
  }, [token])

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }
  const h = getHash()

  const GetUserSetUp = (e) => {
    if (leadId) {
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
            if (typeof window !== 'undefined') {
              localStorage.setItem('userData', JSON.stringify(response?.data?.data))
              setGetDataUser(response?.data?.data)
            }
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message == 'failed') {
            toast.error(error?.response?.data?.reason)
          } else if (error?.response?.status == 403) {
          }
        })
    }
  }

  useEffect(() => {
    if (userData) {
      const finalData = JSON.parse(userData)
      finalData && setGetDataUser(finalData)
    } else if (!userData) {
      GetUserSetUp()
    }
  }, [userData])

  const handleCheckboxChangeForLouge = (event) => {
    setShowData(false)
    const ischeck = event.target.checked
    setIsChecked(ischeck)
    if (ischeck) {
      setIsLougeValue('1')
      const filtered = listingFilteredData?.filter((el) => el.lounge_access === '1')
      setFilteredData(filtered)
    } else {
      setIsLougeValue('0')
      setFilteredData(productlistdata?.product_list)
    }
  }

  const handleRatingdata = (rating) => {
    setRatingstar(rating)

    const filtered = listingFilteredData?.filter((el) => {
      return el.rating == rating
    })

    if (filtered.length === 0) {
      setFilteredData([])
    } else {
      setFilteredData(filtered)
    }
  }

  const handleClick = (index) => {
    setIsActive(!isActive)
    if (SelectIndex?.includes(index)) {
      const updateValue = SelectIndex.indexOf(index)
      SelectIndex.splice(updateValue, 1)
      setSelectIndex(SelectIndex)
    } else {
      setSelectIndex([...SelectIndex, index])
    }
  }

  const handleClickProvider = (index) => {
    setProviderActive(providerActive)
    setSelectIndexProvider(index)
  }
  const handleClickNetwork = (index) => {
    setNetworkActive(!networkActive)
    setSelectIndexCardNetwork(index)
  }

  const handledata = (data) => {
    const value = filterdata.filter((obj) => obj === data?.option1)
    if (value.length >= 1) {
      setFilterData([...filterdata])
    } else {
      setFilterData([...filterdata, data])
    }
  }

  const toggleModal = (e) => {
    setModal(!modal)
  }

  const Removehendler = (index) => {
    filterdata?.splice(index, 1)
    setFilterData([...filterdata])
    checkboxValues?.splice(index, 1)
    setFilteredData(productlistdata?.product_list)
    setCheckFilter([...checkboxValues])
    setCheckFilter([...cardNetworkCheck])
    cardNetworkCheck?.splice(index, 1)
  }
  const Removehendler1 = (index) => {
    setCheckFilter([...cardNetworkCheck])
    cardNetworkCheck?.splice(index, 1)
    checkboxValues?.splice(index, 1)
    setCheckFilter([...checkboxValues])
    setFilteredData(productlistdata?.product_list)
    setShowData(true)
  }

  const getFilteredProductData = (item) => {
    const filtered = item?.product_list?.filter((el) => {
      return (
        filterdata?.includes(el.card_name.toLowerCase()) ||
        filterdata?.includes(el.bank_name?.toLowerCase()) ||
        filterdata?.includes(el.joining_fee) ||
        filterdata?.includes(el?.annual_fee) ||
        filterdata?.includes(el?.rating) ||
        filterdata?.includes(el?.min_credit_score) ||
        filterdata?.includes(el?.lounge_access) ||
        filterdata?.includes(el?.apr) ||
        filterdata?.includes(el?.card_network)
      )
    })
    setFilteredData(filtered)
  }

  useEffect(() => {
    getFilteredProductData(productlistdata)
  }, [productlistdata?.product_list, filterdata])

  useEffect(() => {
    if (listingFilteredData) {
      const filtered = listingFilteredData?.filter((el) => {
        return el.rating == ratingstar
      })
      setFilteredData(ratingstar ? filtered : productlistdata?.product_list)
    }
  }, [productlistdata?.product_list, listingFilteredData, ratingstar])

  useEffect(() => {
    if (listingFilteredData) {
      const checkfiltered = listingFilteredData?.filter((el) => {
        return checkFilter?.includes(el.card_name.toLowerCase())
      })
      setCheckFilter(checkfiltered)
    } else {
      setCheckFilter(productlistdata?.product_list)
    }
  }, [productlistdata?.product_list, listingFilteredData])

  const combinedcardNetwork = listingFilteredData
    ?.map((str) => str?.card_network)
    .reduce((acc, arr) => acc.concat(arr), [])

  const combinedcardProvider = listingFilteredData
    ?.map((str) => str?.bank_name?.split(','))
    .reduce((acc, arr) => acc.concat(arr), [])

  const combineTopPick = moreleftmenucredit?.top_category?.map((str) => str)
  const combineMoreCredit = moreleftmenucredit?.more_by_category?.map((str) => str)
  const combineCardIssuer = moreleftmenucredit?.more_way_to_browse?.map((str) => str)
  const newDataCardNetwork = [...new Set(combinedcardNetwork)]
  const newDataCardProvider = [...new Set(combinedcardProvider)]
  const newDataCardTopPick = [...new Set(combineTopPick)]
  const newDataMoreCredit = [...new Set(combineMoreCredit)]
  const newDataCardIssuer = [...new Set(combineCardIssuer)]

  const handleCheckboxChange = (event) => {
    setShowData(false)
    const { value, checked } = event.target
    if (checked) {
      setCheckboxValues([...checkboxValues, value])
    } else {
      setCheckboxValues(checkboxValues.filter((v) => v !== value))
    }
  }
  const handleCardNetwork = (event) => {
    setShowData(false)
    const { value, checked } = event.target
    if (checked) {
      setCardNetworkCheck([...cardNetworkCheck, value])
    } else {
      setCardNetworkCheck(cardNetworkCheck.filter((v) => v !== value))
    }
  }
  useEffect(() => {
    if (listingFilteredData) {
      const filteredList = listingFilteredData?.filter((item) => {
        return checkboxValues?.includes(item.bank_name)
      })
      setFilteredData(checkboxValues?.length > 0 ? filteredList : productlistdata?.product_list)
    }
  }, [productlistdata?.product_list, listingFilteredData, checkboxValues])

  useEffect(() => {
    if (listingFilteredData && cardNetworkCheck?.length > 0) {
      const filteredList = listingFilteredData?.filter((item) => {
        return cardNetworkCheck?.includes(item.card_network)
      })
      setFilteredData(cardNetworkCheck?.length > 0 ? filteredList : productlistdata?.product_list)
    }
    //  else {
    //   setFilteredData(productlistdata?.product_list)
    // }
  }, [productlistdata?.product_list, listingFilteredData, cardNetworkCheck])

  // =========== JOINING SLIDER RANGE ===========

  const [minJoiningFees, setMinJoiningFees] = useState()
  const [maxJoiningFees, setMaxJoiningFees] = useState()
  const [joiningFeeRange, setJoiningFeeRange] = useState({ min: minJoiningFees, max: maxJoiningFees })

  useEffect(() => {
    if (listingFilteredData) {
      const minFee = Math.min(...listingFilteredData.map((card) => card.joining_fee))
      const maxFee = Math.max(...listingFilteredData.map((card) => card.joining_fee))
      setMinJoiningFees(minFee)
      setMaxJoiningFees(maxFee)
      setJoiningFeeRange({ min: minFee, max: maxFee })
    }
  }, [listingFilteredData])

  const handleRangeJoining = (newValue) => {
    setJoiningFeeRange(newValue)
    if (listingFilteredData && newValue) {
      const filtered = listingFilteredData?.filter(
        (item) => item.joining_fee >= newValue?.min && item.joining_fee <= newValue.max
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(productlistdata?.product_list)
    }
  }

  // ====== ANUUAL SLIDER RANGE ======

  const [minAnnualFees, setMinAnnualFees] = useState()
  const [maxAnnualFees, setMaxAnnualFees] = useState()
  const [annualFeeRange, setAnnualFeeRange] = useState({ min: minAnnualFees, max: maxAnnualFees })

  useEffect(() => {
    if (listingFilteredData) {
      const minFee = Math.min(...listingFilteredData.map((card) => card.annual_fee))
      const maxFee = Math.max(...listingFilteredData.map((card) => card.annual_fee))
      setMinAnnualFees(minFee)
      setMaxAnnualFees(maxFee)
      setAnnualFeeRange({ min: minFee, max: maxFee })
    }
  }, [listingFilteredData])

  const handleAnnualFeeChange = (value) => {
    setAnnualFeeRange(value)
    if (listingFilteredData && value) {
      const filtered = listingFilteredData.filter(
        (item) => item.annual_fee >= value?.min && item.annual_fee <= value?.max
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(productlistdata?.product_list)
    }
  }

  // ====== APR SLIDER RANGE ======
  const [minAprData, setMinAprData] = useState()
  const [maxAprData, setMaxAprData] = useState()
  const [aprRange, setAprRange] = useState({ min: minAprData, max: maxAprData })

  useEffect(() => {
    if (listingFilteredData) {
      const minFee = Math.min(...listingFilteredData.map((card) => card?.apr))
      const maxFee = Math.max(...listingFilteredData.map((card) => card?.apr))
      setMinAprData(minFee)
      setMaxAprData(maxFee)
      setAprRange({ min: minFee, max: maxFee })
    }
  }, [listingFilteredData, slugData])

  const handleAprDataChange = (value) => {
    setShowData(false)
    setSlugData(true)
    setAprRange(value)
    if (listingFilteredData && value) {
      const filtered = listingFilteredData.filter((item) => item.apr >= value?.min && item.apr <= value?.max)
      setFilteredData(filtered)
    } else {
      setFilteredData(productlistdata?.product_list)
    }
  }

  // ====== CREDIT SCORE SLIDER RANGE ======

  const [minCreditScoreData, setMinCreditScoreData] = useState()
  const [maxCreditScoreData, setMaxCreditScoreData] = useState()
  const [creditScoreRange, setCreditScoreRange] = useState({ minCreditScoreData })
  const [creditScore, setCreditScore] = useState(minCreditScoreData || 0)

  useEffect(() => {
    if (listingFilteredData) {
      const minFee = Math.min(...listingFilteredData.map((card) => card?.min_credit_score))
      const maxFee = Math.max(...listingFilteredData.map((card) => card?.max_credit_score))
      setMinCreditScoreData(minFee)
      setMaxCreditScoreData(maxFee)
      setCreditScoreRange({ min: minFee, max: maxFee })
    }
  }, [listingFilteredData])

  const handleCreditScoreChange = (value) => {
    setCreditScore(value)
    setShowData(false)
    if (listingFilteredData && value) {
      const filtered = listingFilteredData?.filter(
        (card) => value >= card?.min_credit_score && value <= card?.max_credit_score
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(productlistdata?.product_list)
    }
  }

  useEffect(() => {
    setFilteredData(productlistdata?.product_list)
  }, [])

  const [selectedData, setSelectedData] = useState([])

  const getMatchPathUrl = (urlPath) => {
    const regex = /\/([^/]+)$/
    const matches = regex.exec(urlPath)
    if (matches && matches.length > 1) {
      const extractedString = matches[1]
      return extractedString
    }
  }

  const handlecompareModal = (event, item) => {
    const slugurl = getMatchPathUrl(item?.url_slug)

    if (event.target.checked) {
      setSelectedData((prevSelectedData) => {
        if (!prevSelectedData.some((selectedItem) => selectedItem.product_id === item.product_id)) {
          return [...prevSelectedData, item]
        }
        return prevSelectedData
      })
      setCompareSlug((prevSelectedSlugs) => {
        if (!prevSelectedSlugs?.includes(slugurl)) {
          return [...prevSelectedSlugs, slugurl]
        }
        return prevSelectedSlugs
      })
    } else {
      setSelectedData((prevSelectedData) =>
        prevSelectedData.filter((selectedItem) => selectedItem.product_id !== item.product_id)
      )
      setCompareSlug((prevSelectedSlugs) => prevSelectedSlugs.filter((selectedSlug) => selectedSlug !== slugurl))
    }
  }
  useEffect(() => {
    if (selectedData.length) {
      setCompareModal(true)
    } else {
      setCompareModal(false)
    }
  }, [selectedData?.length])

  const slider = document.querySelector('.category-scroll-parent')
  let mouseDown = false
  let startX, scrollLeft

  let startDragging = function (e) {
    mouseDown = true
    startX = e.pageX - slider.offsetLeft
    scrollLeft = slider.scrollLeft
  }
  let stopDragging = function (event) {
    mouseDown = false
  }

  slider?.addEventListener('mousemove', (e) => {
    e.preventDefault()
    if (!mouseDown) {
      return
    }
    const x = e.pageX - slider.offsetLeft
    const scroll = x - startX
    slider.scrollLeft = scrollLeft - scroll
  })

  // Add the event listeners
  slider?.addEventListener('mousedown', startDragging, false)
  slider?.addEventListener('mouseup', stopDragging, false)
  slider?.addEventListener('mouseleave', stopDragging, false)

  const clearallfunc = () => {
    setFilteredData(productlistdata?.product_list)
    setRatingstar(null)
    setCheckboxValues([])
    setCardNetworkCheck([])
    setIsChecked(false)
    setFilterData([])
    setShowData(true)
    setAnnualFeeRange({ min: minAnnualFees, max: maxAnnualFees })
    setAprRange({ min: minAprData, max: maxAprData })
    setCreditScore(minCreditScoreData)
    setCreditScoreRange({ min: minCreditScoreData, max: maxCreditScoreData })
    setJoiningFeeRange({ min: minJoiningFees, max: maxJoiningFees })
  }
  const isDesktop = window.innerWidth >= 577

  const firstDataRef = useRef(null)
  const cardsListRef = useRef(null)
  const lastChildRef = useRef(null)
  const containerRef = useRef(null)

  const totalItems = productlistdata?.total_count

  const onPageChange = async (page) => {
    setIsLoading(true)
    setCurrentPage(page)
    if (firstDataRef.current) {
      firstDataRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    router?.push({
      pathname: '/credit-cards',
      query: `page=${page}`
    })
    setIsLoading(false)
  }

  const [visibleItems, setVisibleItems] = useState(10) 

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && visibleItems < filteredData?.length) {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [visibleItems, filteredData?.length])


  useEffect(() => {
    if (checkboxValues?.length === 0) {
      setShowData(true)
    }
  }, [checkboxValues])

  const route = router?.pathname
  const position = router?.query?.page ? (router?.query?.page - 1) * 10 : 0

  const listingItems = productlistdata?.product_list?.map((product, index) => {
    const pagePosition = position + index + 1
    return {
      item_id: product?.product_id?.toString(),
      item_name: product?.card_name,
      index: pagePosition,
      item_brand: product?.bank_name,
      item_category: 'Credit Cards',
      item_category2: '',
      item_category3: '',
      item_category4: '',
      item_category5: '',
      item_list_id: 'Credit Cards Products',
      item_list_name: 'Credit Cards Products',
      item_variant: product?.card_name,
      quantity: 1
    }
  })
  const eventData = {
    event: 'view_item_list',
    ecommerce: {
      item_list_id: 'Credit Cards Products',
      item_list_name: 'Credit Cards Products',
      items: listingItems
    }
  }

  useGaEvents(eventData)
  const sendGAProductClick = (item, index) => {
    const pagePosition = position + index + 1
    const sendProductClick = {
      event: 'select_item',
      ecommerce: {
        item_list_id: 'Credit Card Products',
        item_list_name: 'Credit Card Products',
        items: [
          {
            item_id: item?.product_id?.toString(),
            item_name: item?.card_name,
            index: pagePosition,
            item_brand: item?.bank_name,
            item_category: 'Credit Cards',
            item_category2: '',
            item_category3: '',
            item_category4: '',
            item_category5: '',
            item_list_id: 'Credit Card Products',
            item_list_name: 'Credit Card Products',
            item_variant: item?.card_name,
            quantity: 1
          }
        ]
      }
    }
    return sendEventToGTM(sendProductClick)
  }

  const pageRoute = router?.asPath

  const clickPromotion = (index) => {
    const data = {
      eventName: 'select_promotion',
      title: 'Check free credit score',
      position: index + 1,
      route: pageRoute
    }
    sendEventToGTM(getPromotionObject(data))
  }

  const handleScroll = () => {
    const ref = firstDataRef?.current || cardsListRef?.current
    if (ref) {
      window.scrollTo(0, 0)
      ref?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  const getTabletListing = () => {
    return showData ? (
      <>
        {(filteredData?.length ? filteredData : productlistdata?.product_list).map((alldata, index) => {
          return (
            <div key={index} ref={index === 0 ? firstDataRef : null}>
              <div className='pt-6 bg-white  rounded-3xl   h-full  filter-card-box duration-300'>
                <div className='flex gap-3 !px-6 max-[768px]:!px-4 max-[280px]:!px-2'>
                  <div className=''>
                    <div
                      id={`+${index} + 'cc-img'`}
                      onClick={() => sendGAProductClick(alldata, index)}
                      className='w-[160px] max-[771px]:w-[100px] max-[768px]:w-[120px] max-[425px]:w-[120px] max-[360px]:w-[100px] max-[320px]:!w-[84px] mobile-card-crdit'>
                      <Image
                        src={`${Img_URL}/${alldata?.product_image}`}
                        alt='card image'
                        width={200}
                        height={160}
                        className='xl:w-full md:w-full'
                        unoptimized={true}
                      />
                    </div>
                  </div>
                  <div className=' xl:w-[100%] '>
                    <div className=' grid grid-cols-1'>
                      <div className='text-[#212529]'>
                        <div onClick={() => sendGAProductClick(alldata, index)}>
                          <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                            <h2
                              id={` +${index} + 'cc'`}
                              
                              className='text-[20px] max-[425px]:text-[15px] font-bold max-[991px]:text-[18px] text-[#212529] leading-7 pb-2'>
                              {alldata.card_name}
                            </h2>
                          </Link>
                        </div>
                        <span
                          className='text-[14px] comparebox-card-text pb-3 text-[#212529]'
                          data-tooltip-target='tooltip-light'
                          data-tooltip-style='light'
                          data-te-toggle='tooltip'
                          title={`${alldata?.welcome_benefits?.replace(/["']/g, ' ')}`}>
                          {alldata?.welcome_benefits?.replace(/["']/g, ' ')}
                        </span>

                        <p className=' text-[13px] font-semibold text-[#212529] pt-6 max-[771px]:pt-2'>
                          {ListingfilterData.ratingtitle}
                        </p>

                        <div className='flex items-center gap-2 mt-2 max-[360px]:gap-1'>
                          <div>
                            <Image
                              src={ListingfilterData.logoimg}
                              alt='img'
                              width={45}
                              height={50}
                              className=' border rounded-full p-2 w-[36px] h-[36px]'
                            />
                          </div>

                          <Link href='#' className='text-[#212529]' prefetch={false}>
                            {alldata?.rating === 0 ? (
                              'NA'
                            ) : (
                              <div className='border rounded-full py-1 px-2 flex gap-[2px] items-center justify-center max-[771px]:px-2 max-[360px]:gap-1'>
                                <p className='xl:text-[18px] lg:text-[14px] max-[768px]:text-[12px] font-semibold max-[479px]:text-[14px] text-[15px] text-[#212529] max-[280px]:text-[11px] '>
                                  {alldata?.rating}/5
                                </p>
                                <div className='mobile-rating'>
                                  <StarRatings
                                    rating={alldata?.rating}
                                    starRatedColor='#49d49d'
                                    numberOfStars={starCount}
                                    name='rating'
                                    starDimension='15px'
                                    starSpacing='0'
                                  />
                                </div>
                              </div>
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id='comp-8-aply-btn' className='flex items-center gap-4 mt-6 px-4  max-[280px]:!px-2 listing-apply'>
                  <ApplyNowButton
                    userData={getdatauser}
                    data={alldata}
                    category={'credit-cards'}
                    pos='12'
                    position={index}
                    className="max-[771px]:text-[13px]"
                    disabled={alldata?.bank_name === "KOTAK MAHINDRA BANK"}
                  />

                  {filteredDataCard(alldata?.url_slug) == 'Eligible' ? (
                    <button
                      id={`+${index}+'cc-btn'`}
                      className='flex items-center gap-2 justify-center cursor-pointer business-right-text max-[771px]:text-[13px] w-full lg:w-[160px] md:w-full  text-[#212529] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                      {' '}
                      {filteredDataCard(alldata?.url_slug)}
                      <Image
                        src={successBgIcon}
                        alt='img'
                        width={20}
                        height={20}
                        className=''
                      />
                    </button>
                  ) : (
                    <button
                      id={`+${index}+'cc-btn'`}
                      onClick={() => {
                        router.push(`/credit-cards/eligibility?eligible=${alldata?.url_slug.split('/')[2]}`)
                      }}
                      className='py-3 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                      {filteredDataCard(alldata?.url_slug)}
                    </button>
                  )}
                </div>

                <div className='px-4  py-6 border-b text-[#212529] max-[280px]:!px-2'>
                  <div className='pb-4'>
                    <p className='text-[13px] font-normal'>{ListingfilterData.fees}</p>
                    {alldata.annual_fee == 0 ? (
                      <div className='flex flex-row items-center gap-4'>
                        <p className='text-[15px] font-semibold pt-1'>Free</p>
                      </div>
                    ) : (
                      <div className='flex flex-row items-center gap-4'>
                        <p className='text-[15px] font-semibold pt-1 symbole-rupee'>&#8377; {alldata.annual_fee} /-</p>
                        <span className='font-normal text-[12px] mt-[1px]'>(*Applicable Taxes)</span>
                      </div>
                    )}
                  </div>
                  <div className='pb-4'>
                    <p className='text-[13px] font-normal'>{ListingfilterData.joiningfees}</p>
                    {alldata.joining_fee == 0 ? (
                      <div className='flex flex-row items-center gap-4'>
                        <p className='text-[15px] font-semibold pt-1'>Free</p>
                      </div>
                    ) : (
                      <div className='flex flex-row items-center gap-4'>
                        <p className='text-[15px] font-semibold pt-1 symbole-rupee'>&#8377; {alldata.joining_fee} /-</p>
                        <span className='font-normal text-[12px] mt-[1px]'>(*Applicable Taxes)</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className='text-[13px] font-normal'>{ListingfilterData?.recommended}</p>
                    <div className='flex items-center gap-2'>
                      {alldata?.min_credit_score !== null && (
                        <>
                          <p className='text-[15px] font-semibold pt-1'>{alldata?.min_credit_score}</p>
                        </>
                      )}
                      <div className='tooltip'>
                        {alldata?.min_credit_score !== null && alldata?.max_credit_score && (
                          <>
                            <Image
                              src={ListingfilterData?.helpimg}
                              className='w-5 h-5'
                              alt='img'
                              width={20}
                              height={20}
                            />
                            <span className='tooltiptext'>
                              Having a credit score within or above the recommended range increases your likelihood of
                              approval for various financial applications, but it does not provide an absolute
                              guarantee.
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <Link
                      href='/cibil-credit-score-check'
                      className='text-[15px]  pt-3  !underline text-[#5a5add] hover:!text-[#5a5add]'
                      prefetch={false}>
                      Check free credit score
                    </Link>
                  </div>
                </div>
                <div className='grid grid-cols-2 py-4 gap-4 px-4 items-center'>
                                  <div className='custom-max-content'>
                                      <label className=' text-gray-500 font-bold flex items-center'>
                                        <input
                                          className='mr-2 leading-tight w-[16px] h-[16px]'
                                          type='checkbox'
                                          id={alldata.product_id}
                                          disabled={
                                            size?.width <= 991
                                              ? selectedData.length >= 2 && !selectedData?.includes(alldata)
                                              : selectedData.length >= 3 && !selectedData?.includes(alldata)
                                          }
                                          onChange={(e) => handlecompareModal(e, alldata)}
                                          checked={selectedData.some(
                                            (selectedItem) => selectedItem.product_id === alldata.product_id
                                          )}
                                        />
                                        <p className='text-[15px] font-semibold  text-[#212529] business-right-text cursor-pointer'>
                                          {ListingfilterData.compare}
                                        </p>
                                      </label>
                                    </div>
                                    <div
                                      id='accordionExample'
                                      data-active-classes='bg-none'
                                      data-inactive-classes='text-[#212529]'
                                      className='h-[25px]'>
                                      {(alldata?.features || alldata?.welcome_offer) && (
                                        <div className='  relative  duration-300 h-full'>
                                          <h3 id='accordion-flush-heading-1' className="h-full">
                                            <button
                                              id={` + ${index} +'cc-btn'`}
                                              onClick={() => handleViewMoreAccordion(index)}
                                              type='button'
                                              className='text-[#212529] h-full list-none font-semibold relative text-[15px] gap-3 max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center justify-end w-full text-left'
                                              data-accordion-target='#accordion-flush-body-1'
                                              aria-expanded='true'
                                              aria-controls='accordion-flush-body-1'>
                                              {ListingfilterData.view_more}

                                              {vieMoreIndex?.includes(index) ? (
                                                <Image
                                                  src={accordionArrowall}
                                                  alt='down'
                                                  width={24}
                                                  height={24}
                                                  priority={true}
                                                  className='rotate-180 w-6 h-6 shrink-0'
                                                />
                                              ) : (
                                                <Image
                                                  src={accordionArrowall}
                                                  alt='down'
                                                  width={24}
                                                  height={24}
                                                  priority={true}
                                                  className='w-6 h-6 shrink-0'
                                                />
                                              )}
                                            </button>
                                          </h3>
                                          
                                        </div>
                                      )}
                                    </div>
                                    
                                  </div>
                                  <div className="px-6 pb-4">
                                  {vieMoreIndex?.includes(index) && (
                                            <div aria-labelledby='accordion-flush-heading-1'>
                                              {alldata?.features && (
                                                <div className='mt-4 text-[#212529]'>
                                                  <p className='text-[15px] font-semibold '>{ListingfilterData.features}</p>
                                                  <div className='mt-4'>
                                                    <div
                                                      className='list-disc  space-y-2 text-[14px] product-list-data'
                                                      dangerouslySetInnerHTML={{
                                                        __html: `<div>${alldata?.features}</div>`
                                                      }}></div>
                                                  </div>
                                                </div>
                                              )}
                                              {alldata?.welcome_offer && (
                                                <div className='mt-4 text-[#212529]'>
                                                  <p className='text-[15px] font-semibold'>{ListingfilterData.welcomeoffer}</p>

                                                  <div className='mt-4'>
                                                    <div
                                                      className='list-disc  space-y-2 text-[14px] product-list-data'
                                                      dangerouslySetInnerHTML={{
                                                        __html: `<div>${alldata?.welcome_offer}</div>`
                                                      }}></div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                  </div>
              </div>
            </div>
          )
        })}
      </>
    ) : (
      <>
        {(filteredData?.length ? filteredData : productlistdata?.product_list)
          .map((alldata, index) => {
            return (
              <div key={index}>
                <div className='pt-6 bg-white  rounded-3xl   h-full  filter-card-box duration-300'>
                  <div className='flex gap-3 !px-6 max-[768px]:!px-4 max-[280px]:!px-2'>
                    <div className=''>
                      <div
                        id={`+${index} +'cc-img'`}
                        onClick={() => sendGAProductClick(alldata, index)}
                        className='w-[160px] max-[771px]:w-[100px] max-[768px]:w-[120px] max-[425px]:w-[120px] max-[360px]:w-[100px] max-[320px]:!w-[84px] mobile-card-crdit'>
                        <Image
                          src={`${Img_URL}/${alldata?.product_image}`}
                          alt='card image'
                          width={200}
                          height={160}
                          className='xl:w-full md:w-full'
                          unoptimized={true}
                        />
                      </div>
                    </div>
                    <div className=' xl:w-[100%] '>
                      <div className=' grid grid-cols-1'>
                        <div className='text-[#212529]'>
                          <div onClick={() => sendGAProductClick(alldata, index)}>
                            <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                              <h2
                                id={`+ ${index} +'cc'`}
                                className='text-[20px] max-[425px]:text-[15px] font-bold max-[991px]:text-[18px] text-[#212529] leading-7 pb-2'>
                                {alldata.card_name}
                              </h2>
                            </Link>
                          </div>
                          <span
                            className='text-[14px] comparebox-card-text pb-3 text-[#212529]'
                            data-tooltip-target='tooltip-light'
                            data-tooltip-style='light'
                            data-te-toggle='tooltip'
                            title={`${alldata?.welcome_benefits?.replace(/["']/g, ' ')}`}>
                            {alldata?.welcome_benefits?.replace(/["']/g, ' ')}
                          </span>

                          <p className=' text-[13px] font-semibold text-[#212529] pt-6 max-[771px]:pt-2'>
                            {ListingfilterData.ratingtitle}
                          </p>

                          <div className='flex items-center gap-2 mt-2 max-[360px]:gap-1'>
                            <div>
                              <Image
                                src={ListingfilterData.logoimg}
                                alt='img'
                                width={45}
                                height={50}
                                className=' border rounded-full p-2 w-[36px] h-[36px]'
                              />
                            </div>

                            <Link href='#' className='text-[#212529]' prefetch={false}>
                              {alldata?.rating === 0 ? (
                                'NA'
                              ) : (
                                <div className='border rounded-full py-1 px-4 flex gap-2 items-center  max-[771px]:px-2 max-[360px]:gap-1'>
                                  <p className='xl:text-[18px] md:text-[14px] font-semibold max-[479px]:text-[14px] text-[15px] text-[#212529] max-[280px]:text-[11px]'>
                                    {alldata?.rating}/5
                                  </p>
                                  <div className='mobile-rating'>
                                    <StarRatings
                                      rating={alldata?.rating}
                                      starRatedColor='#49d49d'
                                      numberOfStars={starCount}
                                      name='rating'
                                      starDimension='24px'
                                      starSpacing='0'
                                    />
                                  </div>
                                </div>
                              )}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id='comp-8-aply-btn' className='flex items-center gap-4 mt-6 px-4  max-[280px]:!px-2'>
                    <ApplyNowButton
                      userData={getdatauser}
                      data={alldata}
                      category={'credit-cards'}
                      pos='13'
                      position={index}
                      disabled={alldata?.bank_name === "KOTAK MAHINDRA BANK"}

                    />

                    {filteredDataCard(alldata?.url_slug) == 'Eligible' ? (
                      <button
                        id={`+${index}+'cc-btn'`}
                        className='flex items-center gap-2 justify-center cursor-pointer business-right-text  w-full lg:w-[160px] md:w-full  text-[#212529] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                        {' '}
                        {filteredDataCard(alldata?.url_slug)}
                        <Image
                          src={successBgIcon}
                          alt='img'
                          width={20}
                          height={20}
                          className=''
                        />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          router.push(`/credit-cards/eligibility?eligible=${alldata?.url_slug.split('/')[2]}`)
                        }}
                        className='py-3 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                        {filteredDataCard(alldata?.url_slug)}
                      </button>
                    )}
                  </div>

                  <div className='py-5 px-4 border-b max-[280px]:!px-2'>
                    <label className='text-gray-500 font-bold flex items-center'>
                      <input
                        className='mr-2 leading-tight  w-[16px] h-[16px]'
                        type='checkbox'
                        id={alldata.product_id}
                        disabled={
                          size?.width <= 991
                            ? selectedData.length >= 2 && !selectedData?.includes(alldata)
                            : selectedData.length >= 3 && !selectedData?.includes(alldata)
                        }
                        onChange={(e) => handlecompareModal(e, alldata)}
                        checked={selectedData.some((selectedItem) => selectedItem.product_id === alldata.product_id)}
                      />
                      <p className='text-[15px] font-semibold  text-[#212529] '>{ListingfilterData.compare}</p>
                    </label>
                  </div>

                  <div className='px-4  py-6 border-b text-[#212529] max-[280px]:!px-2'>
                    <div className='pb-4'>
                      <p className='text-[13px] font-normal'>{ListingfilterData.fees}</p>
                      {alldata.annual_fee == 0 ? (
                        <div className='flex flex-col'>
                          <p className='text-[15px] font-semibold pt-1'>Free</p>
                          <span className='font-normal text-[12px] mt-[1px]'>*Applicable Taxes</span>
                        </div>
                      ) : (
                        <div className='flex flex-col'>
                          <p className='text-[15px] font-semibold pt-1 symbole-rupee'>
                            &#8377; {alldata.annual_fee} /-
                          </p>
                          <span className='font-normal text-[12px] mt-[1px]'>*Applicable Taxes</span>
                        </div>
                      )}
                    </div>
                    <div className='pb-4'>
                      <p className='text-[13px] font-normal'>{ListingfilterData.joiningfees}</p>
                      {alldata.joining_fee == 0 ? (
                        <div className='flex flex-col'>
                          <p className='text-[15px] font-semibold pt-1'>Free</p>
                          <span className='font-normal text-[12px] mt-[1px]'>*Applicable Taxes</span>
                        </div>
                      ) : (
                        <div className='flex flex-col'>
                          <p className='text-[15px] font-semibold pt-1 symbole-rupee'>
                            &#8377; {alldata.joining_fee} /-
                          </p>
                          <span className='font-normal text-[12px] mt-[1px]'>*Applicable Taxes</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className='text-[13px] font-normal'>{ListingfilterData?.recommended}</p>
                      <div className='flex items-center gap-2'>
                        {alldata?.min_credit_score !== null && (
                          <>
                            <p className='text-[15px] font-semibold pt-1'>{alldata?.min_credit_score}</p>
                          </>
                        )}
                        <div className='tooltip'>
                          {alldata?.min_credit_score !== null && alldata?.max_credit_score && (
                            <>
                              <Image
                                src={ListingfilterData?.helpimg}
                                className='w-5 h-5'
                                alt='img'
                                width={20}
                                height={20}
                              />
                              <span className='tooltiptext'>
                                Having a credit score within or above the recommended range increases your likelihood of
                                approval for various financial applications, but it does not provide an absolute
                                guarantee.
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div onClick={() => clickPromotion(index)}>
                        <Link
                          href='/cibil-credit-score-check'
                          className='text-[15px] pt-3  !underline text-[#5a5add] hover:!text-[#5a5add]'
                          prefetch={false}>
                          Check free credit score
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 py-4 gap-4 px-4 items-center'>
                                  <div className='custom-max-content'>
                                      <label className=' text-gray-500 font-bold flex items-center'>
                                        <input
                                          className='mr-2 leading-tight w-[16px] h-[16px]'
                                          type='checkbox'
                                          id={alldata.product_id}
                                          disabled={
                                            size?.width <= 991
                                              ? selectedData.length >= 2 && !selectedData?.includes(alldata)
                                              : selectedData.length >= 3 && !selectedData?.includes(alldata)
                                          }
                                          onChange={(e) => handlecompareModal(e, alldata)}
                                          checked={selectedData.some(
                                            (selectedItem) => selectedItem.product_id === alldata.product_id
                                          )}
                                        />
                                        <p className='text-[15px] font-semibold  text-[#212529] business-right-text cursor-pointer'>
                                          {ListingfilterData.compare}
                                        </p>
                                      </label>
                                    </div>
                                    <div
                                      id='accordionExample'
                                      data-active-classes='bg-none'
                                      data-inactive-classes='text-[#212529]'
                                      className='h-[25px]'>
                                      {(alldata?.features || alldata?.welcome_offer) && (
                                        <div className='  relative  duration-300 h-full'>
                                          <h3 id='accordion-flush-heading-1' className="h-full">
                                            <button
                                              id={` + ${index} +'cc-btn'`}
                                              onClick={() => handleViewMoreAccordion(index)}
                                              type='button'
                                              className='text-[#212529] h-full list-none font-semibold relative text-[15px] gap-3 max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center justify-end w-full text-left'
                                              data-accordion-target='#accordion-flush-body-1'
                                              aria-expanded='true'
                                              aria-controls='accordion-flush-body-1'>
                                              {ListingfilterData.view_more}

                                              {vieMoreIndex?.includes(index) ? (
                                                <Image
                                                  src={accordionArrowall}
                                                  alt='down'
                                                  width={24}
                                                  height={24}
                                                  priority={true}
                                                  className='rotate-180 w-6 h-6 shrink-0'
                                                />
                                              ) : (
                                                <Image
                                                  src={accordionArrowall}
                                                  alt='down'
                                                  width={24}
                                                  height={24}
                                                  priority={true}
                                                  className='w-6 h-6 shrink-0'
                                                />
                                              )}
                                            </button>
                                          </h3>
                                          
                                        </div>
                                      )}
                                    </div>
                                    
                                  </div>
                                  <div className="px-6 pb-4">
                                  {vieMoreIndex?.includes(index) && (
                                            <div aria-labelledby='accordion-flush-heading-1'>
                                              {alldata?.features && (
                                                <div className='mt-4 text-[#212529]'>
                                                  <p className='text-[15px] font-semibold '>{ListingfilterData.features}</p>
                                                  <div className='mt-4'>
                                                    <div
                                                      className='list-disc  space-y-2 text-[14px] product-list-data'
                                                      dangerouslySetInnerHTML={{
                                                        __html: `<div>${alldata?.features}</div>`
                                                      }}></div>
                                                  </div>
                                                </div>
                                              )}
                                              {alldata?.welcome_offer && (
                                                <div className='mt-4 text-[#212529]'>
                                                  <p className='text-[15px] font-semibold'>{ListingfilterData.welcomeoffer}</p>

                                                  <div className='mt-4'>
                                                    <div
                                                      className='list-disc  space-y-2 text-[14px] product-list-data'
                                                      dangerouslySetInnerHTML={{
                                                        __html: `<div>${alldata?.welcome_offer}</div>`
                                                      }}></div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                  </div>
                </div>
              </div>
            )
          })}
      </>
    )
  }
  const fetchMoreCardsData = () => {
    if (!isInViewPort) {
      setMobileLoader(true)
      const requestParams = {
        lang_id: '1',
        business_category_url_slug: url_slug,
        offset: pageParam + 1,
        limit: 20
      }
      axios
        .post(BASE_URL + BUSINESSCATEGORY.productListCategory, requestParams)
        .then((response) => {
          setMobileLoader(false)
          if (response?.data?.product_list?.length > 0) {
            const combineData = [...filteredData, ...response?.data?.product_list]
            setFilteredData(removeDuplicates(combineData))
            setIsTheLastChild(false)
            setPageParam(pageParam + 1)
          }
        })
        .catch((error) => {
          setMobileLoader(false)
          setPageParam(0)
        })
    }
  }

  // ......................................... SORTING OPTIONS................................. //

  const handleLowToHigh = (parentName) => {
    const sortKey = getSortKeyCreditCards(parentName)
    const list = lowToHighSort(listingFilteredData, sortKey)
    setFilteredData(list)
    setOpenSortBy(false)
  }

  const handleHighToLow = (parentName) => {
    const sortKey = getSortKeyCreditCards(parentName)
    const list = lowToHighSort(listingFilteredData, sortKey)
    setFilteredData(list?.reverse())
    setOpenSortBy(false)
  }

  const handleSortingOptionClick = (name) => {
    setShowData(false)
    setSelectedSortOption(name)
    const values = name?.split(':')
    if (values?.[1] === lowToHigh) {
      handleLowToHigh(values?.[0])
    } else handleHighToLow(values?.[0])
    setModal(false)
  }

  // ----------DESKTOP ------ //
  const getSortingOptionsPlp = () => {
    const readMoreOpen = typeof window !== 'undefined' && localStorage.getItem('readMore')

    return (
      <div className='flex flex-row items-center justify-end md:gap-2 gap-4 px-2 max-[628px]:overflow-x-scroll !whitespace-nowrap scrollbar-hide category-btn-scroll'>
        <div className="text-neutral-800 md:text-[14px] text-[13px] font-semibold font-['Poppins']">SORT BY :</div>
        <div className='flex flex-col items-center justify-center md:gap-0' onMouseLeave={() => setOpenSortBy(false)}>
          <div
            onMouseOver={() => setOpenSortBy(true)}
            className={`xl:w-[225px] lg:w-[230px] shadow-md flex flex-row justify-between px-[15px] items-start ${
              !openSortBy
              ? 'border border-[#212529] rounded-[5px]'
              : 'border border-[#212529] border-b-0 rounded-t-[5px]'
              } md:h-[50px] h-auto cursor-pointer bg-white text-center text-[14px] font-medium md:py-[14px] max-[628px]:py-[12px] relative`}>
            <div className='hover:text-[14px] font-medium '>{selectedSortOption}</div>
            <div type='button'>
              <Image
                src={accordionArrowall}
                alt='arrow'
                width={17}
                height={17}
                priority={true}
                className={openSortBy ? 'rotate-180 relative top-[2px]' : 'relative top-[2px]'}
              />
            </div>
          </div>
          {openSortBy && (
            <>
              <div
                className={`border-t-0 border border-[#212529] shadow-md rounded-b-[5px] xl:w-[225px] lg:w-[230px] px-[14px] h-auto  bg-white flex flex-col gap-[12px] items-start justify-start absolute ${
                  scrollValue === 0
                  ? readMoreOpen === 'true'
                    ? 'top-[547px]'
                    : 'top-[515px]'
                  : readMoreOpen === 'true'
                    ? 'top-[500px]'
                    : 'top-[460px]'
                  }`}>
                {sortingOptions?.map((item) => {
                  return (
                    <div key={item?.id} className='last:pb-4 first:pt-2'>
                      <div
                        className='hover:text-[#a882dd] cursor-pointer hover:text-[14px]'
                        onClick={() => handleSortingOptionClick(item?.name)}>
                        {item?.name}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  // ----------MOBILE -------- //
  const getMobileSortingOptions = () => {
    return (
      <>
        <div className='flex flex-col items-start justify-start'>
          <div className='text-[15px] max-[1024px]:text-[14px] font-semibold pb-4 text-[#212529]'>Sort By :</div>
          <div className={`h-auto  bg-white flex flex-col gap-[5px] items-start justify-start`}>
            {sortingOptions?.map((item) => {
              return (
                <div key={item?.id} className=''>
                  <div
                    className='hover:text-[#a882dd] text-[15px] flex items-center gap-2 text-[#000]  filter-box-text hover:!underline'
                    onClick={() => handleSortingOptionClick(item?.name)}>
                    {item?.name}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
  // ----------------- CHECKBOX LIST OF SELECTED BANKS ------------------ //
  const getCheckBoxesList = () => {
    return (
      <>
        {filterdata && (
          <ul className='list-none flex   max-md:gap-4 gap-1 list-t flex-wrap pb-5'>
            {filterdata?.map((value, index) => {
              return (
                <div key={index}>
                  <li className='active inline-flex mt-4'>
                    <button className='bg-none cursor-pointer p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                      {value}
                      <Image
                        src={CloseIcon}
                        alt='image'
                        className='align-middle ml-2 w-[16px] h-[16px]'
                        width={16}
                        height={16}
                        priority={true}
                        onClick={() => Removehendler(index)}
                      />
                    </button>
                  </li>
                </div>
              )
            })}

            {checkboxValues?.map((value1, index) => {
              return (
                <div key={index}>
                  <li className='active inline-flex mt-4'>
                    <button className='bg-none cursor-pointer p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                      {value1}
                      <Image
                        src={CloseIcon}
                        alt='image'
                        className='align-middle ml-2 w-[16px] h-[16px] '
                        width={16}
                        height={16}
                        priority={true}
                        onClick={() => Removehendler1(index)}
                      />
                    </button>
                  </li>
                </div>
              )
            })}

            {cardNetworkCheck?.map((value1, index) => {
              return (
                <div key={index}>
                  <li className='active inline-flex mt-4'>
                    <button className='bg-none cursor-pointer p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                      {value1}
                      <Image
                        src={CloseIcon}
                        alt='image'
                        width={16}
                        height={16}
                        priority={true}
                        className='align-middle ml-2 w-[16px] h-[16px] '
                        onClick={() => Removehendler1(index)}
                      />
                    </button>
                  </li>
                </div>
              )
            })}
          </ul>
        )}
      </>
    )
  }
  const renderCondition = size?.width <= 991 ? selectedData?.length == 2 : selectedData?.length == 3

  useEffect(() => {
    if (isTheLastChild) {
      fetchMoreCardsData()
    }
  }, [isTheLastChild])

  useEffect(() => {
    const handleScroll = () => {
      const lastChildRect = lastChildRef?.current?.getBoundingClientRect()
      if (lastChildRect?.bottom <= window?.innerHeight) {
        if (totalItems !== filteredData?.length && isMobile && lastChildRef?.current) {
          setIsTheLastChild(true)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastChildRef, totalItems, filteredData?.length, isMobile])

  useEffect(() => {
    fetchListingFilterData()
  }, [])

  return (
    <>
      <Toaster />

      {isLoading ||
        (mobileLoader && (
          <div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
            <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>

            <div className='fixed inset-0 z-50 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center  sm:p-0'>
                <div className='relative transform overflow-hidden'>
                  <Image
                    src={LoaderLogo}
                    className={
                      mobileLoader
                        ? 'w-[70px] h-[70px] bg-white rounded-full'
                        : 'w-[150px] h-[150px] bg-white rounded-full'
                    }
                    alt='imageloader'
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      <div className='container px-20 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-0 mx-auto max-[991px]:max-w-full'>
        <div className='list-none  items-center flex gap-4 max-[1440px]:gap-2 !overflow-x-scroll !whitespace-nowrap scrollbar-hide list-t px-4 max-[1440px]:px-4 max-[1200px]:px-0 mx-auto  pb-4 category-btn-scroll max-[479px]:pb-0'>
          <Image src={FilterIcon} className='w-6 h-6 lg:hidden' alt='filtericon' onClick={(e) => toggleModal(e)} />
          <div className='category-scroll-parent'>
            <div id={'1' + 'cc-child'} className='category-scroll-child'>
              {categorytopmenulist?.category_info.length > 0 &&
                categorytopmenulist?.category_info
                  ?.sort((a, b) => a - b)
                  .map((toplist, index) => {
                    return (
                      <div id={`${index} +'cc-cc-child'`} key={index}>
                        {toplist?.url_slug === 'credit-cards' ? (
                          <Link href={`/${toplist?.url_slug}`} prefetch={false}>
                            <CreditCardsRoundButton
                              name={toplist?.title}
                              onClick={() => setrCategoryactive(toplist?.url_slug)}
                              className={
                                categoryactive == toplist?.url_slug
                                  ? ' recommendation-category head-text font-[faktum] capitalize  '
                                  : 'text-[#212529] head-text font-[faktum] border border-[#212529] bg-transparent xl:py-3  xl:px-4 md:py-3 md:px-4 sm:py-3 sm:px-4 px-4 py-3 text-[15px] max-[1440px]:text-[14px] rounded-[5px] hover:bg-[#844FCF] hover:border-[#844FCF] hover:text-white capitalize list-resolov-credit '
                              }
                            />
                          </Link>
                        ) : (
                          <Link href={`/credit-cards/${toplist?.url_slug}`} prefetch={false}>
                            <CreditCardsRoundButton
                              name={toplist?.title}
                              onClick={() => setrCategoryactive(toplist?.url_slug)}
                              className={
                                categoryactive == toplist?.url_slug
                                  ? ' recommendation-category head-text font-[faktum] capitalize  '
                                  : 'text-[#212529] head-text font-[faktum] border border-[#212529] bg-transparent xl:py-3  xl:px-4 md:py-3 md:px-4 sm:py-3 sm:px-4 px-4 py-3 text-[15px] max-[1440px]:text-[14px] rounded-[5px] hover:bg-[#844FCF] hover:border-[#844FCF] hover:text-white capitalize list-resolov-credit '
                              }
                            />
                          </Link>
                        )}
                      </div>
                    )
                  })}
            </div>
          </div>
        </div>
        {filterdata && (
          <ul className='list-none flex gap-4 mt-2 list-t  lg:hidden max-[1024px]:overflow-x-scroll max-[1024px]:whitespace-nowrap scrollbar-hide py-4'>
            {filterdata?.map((value, index) => {
              return (
                <div key={index}>
                  <li className='active cursor-pointer inline-flex'>
                    <button className='bg-none p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                      {value}
                      <Image
                        src={CloseIcon}
                        alt='image'
                        className='align-middle ml-2 w-[16px] h-[16px] '
                        width={16}
                        height={16}
                        priority={true}
                        onClick={() => Removehendler(index)}
                      />
                    </button>
                  </li>
                </div>
              )
            })}
            {checkboxValues?.map((value1, index) => {
              return (
                <div key={index}>
                  <li className='active cursor-pointer inline-flex'>
                    <button className='bg-none p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                      {value1}
                      <Image
                        src={CloseIcon}
                        alt='image'
                        width={16}
                        height={16}
                        priority={true}
                        className='align-middle ml-2 w-[16px] h-[16px] '
                        onClick={() => Removehendler1(index)}
                      />
                    </button>
                  </li>
                </div>
              )
            })}
            {cardNetworkCheck?.map((value1, index) => {
              return (
                <div key={index}>
                  <li className='active cursor-pointer inline-flex'>
                    <button className='bg-none p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                      {value1}
                      <Image
                        src={CloseIcon}
                        alt='image'
                        width={16}
                        height={16}
                        priority={true}
                        className='align-middle ml-2 w-[16px] h-[16px] '
                        onClick={() => Removehendler1(index)}
                      />
                    </button>
                  </li>
                </div>
              )
            })}
          </ul>
        )}

        {modal ? (
          <>
            <div className='fixed z-[9999] overflow-y-auto top-0 w-full left-0 ' id='modal'>
              <div className='flex items-center justify-center min-height-100vh  text-center sm:block '>
                <div className='fixed inset-0 transition-opacity'>
                  <div className='absolute inset-0 bg-gray-900 opacity-75' />
                </div>
                <p className='sm:inline-block sm:align-middle sm:h-screen  h-[100vh]'></p>
                <div
                  className=' relative inline-block align-center bg-white  text-left h-[100vh] overflow-y-scroll shadow-xl transform transition-all  sm:align-middle w-full'
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby='modal-headline'>
                  <div className='2xl:col-span-2 xl:col-span-2 md:col-span-2 bg-white '>
                    <div className='md:px-8 md:pt-8  p-5  shadow-md filter-credit w-full pb-4 bg-white'>
                      <div className='flex cursor-pointer items-center gap-3'>
                        <button
                          type='button'
                          className='  text-[#212529] rounded  mr-2'
                          style={{ color: 'red' }}
                          onClick={(e) => setModal(false)}>
                          <Image src={BackArrow} alt='img' className='  w-[30px] h-auto' />
                        </button>

                        <p className=' font-bold text-[18px] text-[#212529] uppercase'>Filters</p>
                        {(isChecked ||
                          checkboxValues?.length !== 0 ||
                          cardNetworkCheck?.length !== 0 ||
                          joiningFeeRange?.min !== 0 ||
                          annualFeeRange?.min !== 0 ||
                          aprRange?.min !== minAprData ||
                          aprRange?.max !== maxAprData ||
                          creditScore !== minCreditScoreData ||
                          ratingstar != null) && (
                            <button
                              onClick={clearallfunc}
                              className='text-[#49D49D] cursor-pointer font-bold text-[18px] ml-32'>
                              Clear All
                            </button>
                          )}
                      </div>
                    </div>
                    <div
                      className={`md:px-8 md:pt-8  p-5  rounded-lg   filter-credit w-full ${
                        isChecked == false &&
                        checkboxValues?.length == 0 &&
                        cardNetworkCheck?.length == 0 &&
                        ratingstar == null
                        ? ''
                        : 'pb-[5rem]'
                        }`}>
                      {productlistdata?.product_list.length > 0 && (
                        <>
                          <div className='pb-4 border-b'>
                            {ProviderFilter.map((selectdata, index) => {
                              return (
                                <div key={index}>
                                  <div
                                    id='accordionExample2'
                                    data-active-classes='bg-none'
                                    data-inactive-classes='text-[#212529]'>
                                    <button
                                      className='flex cursor-pointer filter-allof items-center justify-between w-full py-3 font-medium text-left text-gray-500 rounded-t-xl'
                                      type='button'
                                      id='headingTwo'
                                      data-te-collapse-init
                                      onClick={() => {
                                        handleClickProvider(index)
                                      }}
                                      data-te-target='#collapseTwo'
                                      aria-expanded='true'
                                      aria-controls='collapseTwo'>
                                      <p className='text-[15px] text-[#212529] font-semibold '>{selectdata?.Titlef}</p>
                                    </button>

                                    {index === SelectIndexProvider && providerActive && (
                                      <div
                                        id='collapseTwo'
                                        className='!visible'
                                        data-te-collapse-item
                                        data-te-collapse-show
                                        aria-labelledby='headingTwo'
                                        data-te-parent='#accordionExample2'>
                                        <div className='pb-3 pt-2  font-light  h-36 overflow-y-scroll'>
                                          {selectdata.slug === 'providername' &&
                                            newDataCardProvider?.sort().map((data, index) => {
                                              return (
                                                <div key={index}>
                                                  <div className='flex pb-1'>
                                                    <input
                                                      type='checkbox'
                                                      id='vehicle1'
                                                      className='mr-3'
                                                      value={data}
                                                      checked={checkboxValues?.includes(data)}
                                                      onChange={handleCheckboxChange}
                                                    />
                                                    <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] !capitalize  filter-box-text   '>
                                                      {data}
                                                    </span>
                                                  </div>
                                                </div>
                                              )
                                            })}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          <div className='pt-4 loungeaccess-sec'>
                            <div className='container-range flex items-center justify-between py-3'>
                              <p className='text-[15px] text-[#212529] font-medium filter-text-resolution '>
                                Lounge Access
                              </p>
                              <label htmlFor='vehicle1' className='text-[15px]  flex items-center gap-2 text-[#000]  '>
                                <input
                                  className='mr-1 w-4 h-4'
                                  type='checkbox'
                                  checked={isChecked}
                                  onChange={handleCheckboxChangeForLouge}
                                />
                              </label>
                            </div>
                          </div>

                          <div className='pb-4  border-b'>
                            {FilaterData.map((data, index) => {
                              return (
                                <div key={index}>
                                  <div
                                    id='accordionExample'
                                    data-active-classes='bg-none'
                                    data-inactive-classes='text-[#212529]'>
                                    <button
                                      className='flex cursor-pointer filter-allof items-center justify-between w-full py-3 font-medium text-left text-gray-500rounded-t-xl'
                                      type='button'
                                      id='headingOne'
                                      data-te-collapse-init
                                      onClick={() => {
                                        handleClick(index)
                                      }}
                                      data-te-target='#collapseOne'
                                      aria-expanded='true'
                                      aria-controls='collapseOne'>
                                      <p className='text-[15px] text-[#212529] font-medium filter-text-resolution'>
                                        {data.Titlef}
                                      </p>
                                      {SelectIndex?.includes(index) ? (
                                        <Image
                                          src={accordionArrowall}
                                          alt='up'
                                          width={24}
                                          height={24}
                                          priority={true}
                                          className='rotate-180 w-6 h-6 shrink-0'
                                        />
                                      ) : (
                                        <Image
                                          src={accordionArrowall}
                                          alt='down'
                                          width={24}
                                          height={24}
                                          priority={true}
                                          className='w-6 h-6 shrink-0'
                                        />
                                      )}
                                    </button>

                                    {SelectIndex?.includes(index) && (
                                      <div
                                        id='collapseOne'
                                        className='!visible'
                                        data-te-collapse-item
                                        data-te-collapse-show
                                        aria-labelledby='headingOne'
                                        data-te-parent='#accordionExample'>
                                        <div className='pb-3 pt-2 font-light p-[8px] '>
                                          <ul className='list-none'>
                                            {data.slug === 'joiningfee' && (
                                              <>
                                                <InputRange
                                                  minValue={minJoiningFees}
                                                  maxValue={maxJoiningFees}
                                                  value={joiningFeeRange}
                                                  onChange={handleRangeJoining}
                                                />
                                              </>
                                            )}

                                            {data.slug === 'apr' && (
                                              <>
                                                <InputRange
                                                  minValue={minAprData}
                                                  maxValue={maxAprData}
                                                  step={0.33}
                                                  value={aprRange}
                                                  onChange={handleAprDataChange}
                                                  formatLabel={(value) => value?.toFixed(2)}
                                                />
                                              </>
                                            )}

                                            {data.slug === 'anualfee' && (
                                              <>
                                                <InputRange
                                                  minValue={minAnnualFees}
                                                  maxValue={maxAnnualFees}
                                                  value={annualFeeRange}
                                                  onChange={handleAnnualFeeChange}
                                                />
                                              </>
                                            )}

                                            {data.slug === 'creditscore' && (
                                              <>
                                                <InputRange
                                                  minValue={minCreditScoreData}
                                                  maxValue={maxCreditScoreData}
                                                  value={creditScore}
                                                  name='Principle'
                                                  onChange={handleCreditScoreChange}
                                                />
                                              </>
                                            )}

                                            {data.slug === 'rating' && (
                                              <>
                                                <li className='text-[#212529] text-[15px]  font-normal filter-benefits-truncate'>
                                                  <ReactStars
                                                    count={starCount}
                                                    onChange={handleRatingdata}
                                                    size={24}
                                                    value={ratingstar}
                                                    half={true}
                                                    color1={'#ccc'}
                                                    color2={'#49d49d'}
                                                  />
                                                </li>
                                              </>
                                            )}

                                            <li
                                              className='text-[#212529] text-[15px] font-normal'
                                              onClick={() => handledata(data.option1.toLowerCase())}>
                                              {data.option1}
                                            </li>
                                            <li
                                              className='text-[#212529] text-[15px]  font-normal'
                                              onClick={() => handledata(data.option2.toLowerCase())}>
                                              {data.option2}
                                            </li>
                                            <li
                                              className='text-[#212529] text-[15px]  font-normal'
                                              onClick={() => handledata(data.option3.toLowerCase())}>
                                              {data.option3}
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            })}

                            {CardNetwork.map((selectdata, index) => {
                              return (
                                <div key={index}>
                                  <div
                                    id='accordionExample2'
                                    data-active-classes='bg-none'
                                    data-inactive-classes='text-[#212529]'>
                                    <button
                                      className='flex cursor-pointer filter-allof items-center justify-between w-full py-3 font-medium text-left text-gray-500 rounded-t-xl'
                                      type='button'
                                      id='headingTwo'
                                      data-te-collapse-init
                                      onClick={() => {
                                        handleClickNetwork(index)
                                      }}
                                      data-te-target='#collapseTwo'
                                      aria-expanded='true'
                                      aria-controls='collapseTwo'>
                                      <p className='text-[15px] text-[#212529] font-medium filter-text-resolution'>
                                        {selectdata?.Titlef}
                                      </p>
                                      {index === SelectIndexCardNetwork && networkActive ? (
                                        <Image
                                          src={accordionArrowall}
                                          alt='up'
                                          width={24}
                                          height={24}
                                          priority={true}
                                          className='rotate-180 w-6 h-6 shrink-0'
                                        />
                                      ) : (
                                        <Image
                                          src={accordionArrowall}
                                          alt='down'
                                          width={24}
                                          height={24}
                                          priority={true}
                                          className='w-6 h-6 shrink-0'
                                        />
                                      )}
                                    </button>

                                    {index === SelectIndexCardNetwork && networkActive && (
                                      <div
                                        id='collapseTwo'
                                        className='!visible'
                                        data-te-collapse-item
                                        data-te-collapse-show
                                        aria-labelledby='headingTwo'
                                        data-te-parent='#accordionExample2'>
                                        <div className='pb-3 pt-2 font-light  '>
                                          <div className=''>
                                            {selectdata.slug === 'cardnetwork' &&
                                              newDataCardNetwork?.sort().map((data, index) => {
                                                return (
                                                  <div key={index}>
                                                    <div className='flex pb-1'>
                                                      <input
                                                        type='checkbox'
                                                        id='vehicle1'
                                                        className='mr-3'
                                                        value={data}
                                                        checked={cardNetworkCheck?.includes(data)}
                                                        onChange={handleCardNetwork}
                                                      />
                                                      <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] filter-box-text '>
                                                        {data}
                                                      </span>
                                                    </div>
                                                  </div>
                                                )
                                              })}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </>
                      )}

                      {moreleftmenucredit?.top_category?.length > 0 && (
                        <div className='pt-4  border-b'>
                          <p className='text-[15px] max-[1024px]:text-[14px] font-semibold pb-4 text-[#212529]'>
                            Top Picks For You
                          </p>
                          {TopPickFilter.map((selectdata, index) => {
                            return (
                              <div key={index}>
                                {selectdata.slug === 'toppickfilter' &&
                                  newDataCardTopPick?.map((data, index) => {
                                    return (
                                      <div key={index}>
                                        <Link
                                          href={`/credit-cards/[key]`}
                                          as={`/credit-cards/${data?.url_slug}`}
                                          prefetch={false}>
                                          <p className='text-[15px] flex items-center gap-2 text-[#000]  filter-box-text hover:!underline'>
                                            {' '}
                                            {data.title}
                                          </p>
                                        </Link>
                                      </div>
                                    )
                                  })}
                              </div>
                            )
                          })}
                        </div>
                      )}

                      {moreleftmenucredit?.more_by_category?.length > 0 && (
                        <div className='pt-4  border-b'>
                          <p className='text-[15px] max-[1024px]:text-[14px] font-semibold pb-4 text-[#212529]'>
                            Credit Cards by credit score
                          </p>
                          {CreditScoreMore.map((selectdata, index) => {
                            return (
                              <div key={index}>
                                {selectdata.slug === 'creditscoremore' &&
                                  newDataMoreCredit?.map((data, index) => {
                                    return (
                                      <div key={index}>
                                        <Link href={`/credit-cards/${data?.url_slug}`}>
                                          <p className='text-[15px] flex items-center gap-2 text-[#000]  filter-box-text  hover:!underline'>
                                            {' '}
                                            {data.title}
                                          </p>
                                        </Link>
                                      </div>
                                    )
                                  })}
                              </div>
                            )
                          })}
                        </div>
                      )}

                      {moreleftmenucredit?.more_way_to_browse?.length > 0 && (
                        <div className='pt-4  border-b'>
                          <p className='text-[15px] max-[1024px]:text-[14px] font-semibold pb-4 text-[#212529]'>
                            Credit Cards by Issuer
                          </p>
                          {CardIssuer.map((selectdata, index) => {
                            return (
                              <div key={index}>
                                {selectdata.slug === 'cardissuer' &&
                                  newDataCardIssuer?.map((data, index) => {
                                    return (
                                      <div key={index}>
                                        <Link
                                          href={`/credit-cards/[key]`}
                                          as={`/credit-cards/${data?.url_slug}`}
                                          prefetch={false}>
                                          <p className='text-[15px] flex items-center gap-2 text-[#000]  filter-box-text hover:!underline '>
                                            {' '}
                                            {data.title}
                                          </p>
                                        </Link>
                                      </div>
                                    )
                                  })}
                              </div>
                            )
                          })}
                        </div>
                      )}
                      <div className='mt-4'> {getMobileSortingOptions()}</div>
                    </div>
                  </div>
                </div>
                {(isChecked !== false ||
                  checkboxValues?.length !== 0 ||
                  joiningFeeRange?.min !== 0 ||
                  annualFeeRange?.min !== 0 ||
                  aprRange?.min !== 0 ||
                  creditScoreRange?.min !== 0 ||
                  cardNetworkCheck?.length !== 0 ||
                  ratingstar != null) && (
                    <>
                      <div className='fixed bottom-0 z-[9999] left-0 w-full py-4 px-5 bg-white grid grid-cols-2 justify-between items-center md:px-8 modal-sticky-clear'>
                        <button
                          onClick={(e) => {
                            setModal(false)
                          }}
                          className='text-[#212529] cursor-pointer font-bold text-[15px] text-left'>
                          Close
                        </button>
                        <button
                          onClick={(e) => {
                            setModal(false)
                          }}
                          className=' py-3 w-full lg:w-[160px] cursor-pointer md:w-full  rounded-lg text-[#212529] bg-[#49D49D] max-[320px]:text-[14px]'>
                          Apply Filters
                        </button>
                      </div>
                    </>
                  )}
              </div>
            </div>
          </>
        ) : (
          ''
        )}
        {/* ...................................... COMPARE BOTTOM FROZEN MODAL ................................ */}
        {comparemodal ? (
          <>
            {renderCondition && (
              <div
                className='fixed z-50 bottom-0 w-full left-0 h-[16.5rem] max-[1200px]:h-[14rem] max-[991px]:h-[22rem] max-[1600px]:h-[17rem]  max-xl:h-auto max-lg:h-auto max-[576px]:h-auto  max-[575px]:h-auto bg-[#FFEBF2] add-modal  max-[767px]:bottom-[15%]'
                id='modal'>
                <div className=' 2xl:px-40 xl:px-30 xl:py-8 lg:px-20 md:px-14 p-4 py-6 '>
                  <div className='text-center flex items-center gap-2 justify-center'>
                    <Image src={alertOctagon} className='' alt='img' />
                    <p className='text-[15px] text-[#FF000F]'>Remove a card to add another card to compare</p>
                  </div>
                </div>
              </div>
            )}
            <div
              className='fixed z-50  bottom-0 w-full left-0 h-[11rem] max-[1600px]:h-[12rem]  max-xl:h-auto max-lg:h-auto max-[576px]:h-auto  max-[575px]:h-auto bg-white add-modal comapre-card-modal'
              id='modal'>
              <div className='flex items-center justify-center min-height-100vh  px-4  text-center sm:block sm:p-0'>
                <div className=' 2xl:px-40 xl:px-30 xl:py-10 lg:px-20 md:px-14 p-4 py-8 max-[479px]:py-4 '>
                  <div className='flex max-[1820px]:flex  items-center justify-center gap-12 max-[1600px]:gap-4   max-xl:justify-center  items-center add-comapre-modal'>
                    <>
                      <div className='flex gap-7 max-[1200px]:flex-wrap  max-[991px]:flex-nowrap  max-[1200px]:gap-4 max-md:justify-between max-[576px]:justify-center add-comapre-card max-[320px]:gap-2'>
                        {selectedData.length <= 3 &&
                          selectedData.map((data, index) => {
                            return (
                              <div key={index}>
                                <div className=' rounded-lg  relative '>
                                  <div
                                    id={` +${index} + 'cc-img'`}
                                    className='w-[140px] h-full max-[991px]:w-[110px] max-[576px]:w-[110px] max-[479px]:w-[80px]  compare-img-card'
                                    onClick={() => sendGAProductClick(data, index)}>
                                    <Image
                                      src={`${Img_URL}/${data?.product_image}`}
                                      alt='card image'
                                      width={140}
                                      height={160}
                                      className='w-[140px]'
                                      unoptimized={true}
                                    />
                                  </div>

                                  <div
                                    className='absolute top-[-10px] right-[-8px] border border-[#000] p-1 rounded-full bg-white text-[#212529]'
                                    onClick={() => {
                                      document.getElementById(data.product_id).checked = false
                                      setSelectedData([
                                        ...selectedData.filter((item) => item.product_id !== data.product_id)
                                      ])
                                    }}>
                                    <Image src={CloseIcon} alt='img' className='  w-[12px] h-[12px]' height={12} width={12} priority={true} />
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                      <div className='flex max-[1820px]:flex max-[1820px]:gap-8  gap-5 items-center max-[576px]:gap-4 max-[320px]:gap-2 '>
                        {size?.width > 991 && selectedData.length < 2 && selectedData.length != null && (
                          <div>
                            <p className='text-[15px] text-[#212529] max-[479px]:text-[12px]'>
                              Add upto 3 cards to compare
                            </p>
                          </div>
                        )}
                        <div className='max-xs:my-2'>
                          <CompareNowBtn
                            compareslug={selectedData}
                            name='Compare'
                            disable={selectedData.length < 2 || selectedData.length == 4}
                          />
                        </div>
                        <div className='max-xs:my-2'>
                          <button
                            type='button'
                            className='  text-[#212529] cursor-pointer rounded  mr-2 max-[479px]:mr-0 text-[15px] font-semibold max-[479px]:text-[13px]'
                            onClick={(e) => {
                              setCompareModal(false)
                              setSelectedData([])
                            }}>
                            {size.width <= 577 ? <>Clear</> : <>Clear All</>}
                          </button>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
        {size.width >= 992 ? (
          <div className=''>
            <div className='grid 2xl:gap-8 2xl:grid-cols-5 xl:grid-cols-5  md:grid-cols-5 lg:grid-cols-5 gap-4 mt-6'>
              <div className='2xl:col-span-1 xl:col-span-1 md:col-span-1 bg-none  relative'>
                <div
                  className={`xl:py-8  lg:py-4  border border-[#C2CACF] border-l-0 filter-credit sticky  filter-resolution ${
                    moreleftmenucredit?.more_way_to_browse?.length > 3 ? ' filter-left-sticky' : 'credit-left-filter'
                    }`}>
                  <div className='flex items-center justify-between pb-2 xl:pr-[17px] lg:pr-4 md:pr-4'>
                    <p className='font-bold text-[18px] text-[#212529] uppercase'>Filters</p>

                    {(isChecked ||
                      checkboxValues?.length !== 0 ||
                      cardNetworkCheck?.length !== 0 ||
                      joiningFeeRange?.min !== 0 ||
                      annualFeeRange?.min !== 0 ||
                      aprRange?.min !== minAprData ||
                      creditScore !== minCreditScoreData ||
                      ratingstar != null) && (
                        <button onClick={clearallfunc} className='text-[#49D49D] cursor-pointer font-bold text-[15px]'>
                          Clear All
                        </button>
                      )}
                  </div>

                  {productlistdata?.product_list.length > 0 && (
                    <>
                      <div className='pb-6 border-b border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4 filter-scroll'>
                        {ProviderFilter.map((selectdata, index) => {
                          return (
                            <div key={index}>
                              <div
                                id='accordionExample2'
                                data-active-classes='bg-none'
                                data-inactive-classes='text-[#212529]'>
                                <button
                                  className='flex filter-allof cursor-pointer items-center justify-between w-full py-3 font-medium text-left text-gray-500 rounded-t-xl'
                                  type='button'
                                  id='headingTwo'
                                  data-te-collapse-init
                                  onClick={() => {
                                    handleClickProvider(index)
                                  }}
                                  data-te-target='#collapseTwo'
                                  aria-expanded='true'
                                  aria-controls='collapseTwo'>
                                  <p className='text-[15px] font-semibold text-[#212529]'>{selectdata?.Titlef}</p>
                                </button>

                                {index === SelectIndexProvider && providerActive && (
                                  <div
                                    id='collapseTwo'
                                    className='!visible'
                                    data-te-collapse-item
                                    data-te-collapse-show
                                    aria-labelledby='headingTwo'
                                    data-te-parent='#accordionExample2'>
                                    <div className='pb-3 pt-2 font-light h-36 overflow-y-scroll'>
                                      {selectdata.slug === 'providername' &&
                                        newDataCardProvider?.sort().map((data, index) => {
                                          return (
                                            <div key={index}>
                                              <div className='flex pb-1'>
                                                <input
                                                  type='checkbox'
                                                  id='vehicle1'
                                                  className='mr-3'
                                                  value={data}
                                                  checked={checkboxValues?.includes(data)}
                                                  onChange={handleCheckboxChange}
                                                />
                                                <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] !capitalize  filter-box-text  '>
                                                  {data}
                                                </span>
                                              </div>
                                            </div>
                                          )
                                        })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      <div className='py-6 border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4 border-b filter-scroll'>
                        <div className='loungeaccess-sec'>
                          <div className='container-range flex items-center justify-between py-3'>
                            <p className='text-[15px] text-[#212529] font-medium filter-text-resolution'>
                              Lounge Access
                            </p>
                            <label htmlFor='vehicle1' className='text-[15px]  flex items-center gap-2 text-[#000]  '>
                              <input
                                className='mr-1 w-4 h-4'
                                type='checkbox'
                                checked={isChecked}
                                onChange={handleCheckboxChangeForLouge}
                              />
                            </label>
                          </div>
                        </div>

                        {FilaterData.map((data, index) => {
                          return (
                            <div key={index}>
                              <div
                                id='accordionExample'
                                data-active-classes='bg-none'
                                data-inactive-classes='text-[#212529]'>
                                <button
                                  className='flex filter-allof cursor-pointer items-center justify-between w-full py-3 font-medium text-left text-gray-500rounded-t-xl'
                                  type='button'
                                  id='headingOne'
                                  data-te-collapse-init
                                  onClick={() => {
                                    handleClick(index)
                                  }}
                                  data-te-target='#collapseOne'
                                  aria-expanded='true'
                                  aria-controls='collapseOne'>
                                  <p className='text-[15px] text-[#212529] font-medium filter-text-resolution'>
                                    {data.Titlef}
                                  </p>
                                  {SelectIndex?.includes(index) ? (
                                    <Image
                                      src={accordionArrowall}
                                      alt='up'
                                      width={24}
                                      height={24}
                                      priority={true}
                                      className='rotate-180 w-6 h-6 shrink-0'
                                    />
                                  ) : (
                                    <Image
                                      src={accordionArrowall}
                                      alt='down'
                                      width={24}
                                      height={24}
                                      priority={true}
                                      className='w-6 h-6 shrink-0'
                                    />
                                  )}
                                </button>

                                {SelectIndex?.includes(index) && (
                                  <div
                                    id='collapseOne'
                                    className='!visible'
                                    data-te-collapse-item
                                    data-te-collapse-show
                                    aria-labelledby='headingOne'
                                    data-te-parent='#accordionExample'>
                                    <div
                                      className={
                                        data.slug === 'rating'
                                          ? 'pb-0 pt-0 font-light'
                                          : 'pb-3 pt-2 font-light px-[8px] '
                                      }>
                                      <ul className='list-none'>
                                        {data.slug === 'joiningfee' && (
                                          <>
                                            <InputRange
                                              minValue={minJoiningFees}
                                              maxValue={maxJoiningFees}
                                              value={joiningFeeRange}
                                              onChange={handleRangeJoining}
                                            />
                                          </>
                                        )}
                                        {data.slug === 'apr' && (
                                          <>
                                            <InputRange
                                              minValue={minAprData}
                                              maxValue={maxAprData}
                                              step={0.33}
                                              value={aprRange}
                                              onChange={handleAprDataChange}
                                              formatLabel={(value) => value?.toFixed(2)}
                                            />
                                          </>
                                        )}

                                        {data.slug === 'anualfee' && (
                                          <>
                                            <InputRange
                                              minValue={minAnnualFees}
                                              maxValue={maxAnnualFees}
                                              value={annualFeeRange}
                                              onChange={handleAnnualFeeChange}
                                            />
                                          </>
                                        )}

                                        {data.slug === 'creditscore' && (
                                          <>
                                            <InputRange
                                              maxValue={maxCreditScoreData}
                                              minValue={minCreditScoreData}
                                              name='Principle'
                                              value={creditScore}
                                              onChange={handleCreditScoreChange}
                                            />
                                          </>
                                        )}

                                        {data.slug === 'rating' && (
                                          <>
                                            <li className='text-[#212529] text-[15px]  font-normal filter-benefits-truncate'>
                                              <ReactStars
                                                count={starCount}
                                                onChange={handleRatingdata}
                                                size={24}
                                                value={ratingstar}
                                                half={true}
                                                color1={'#ccc'}
                                                color2={'#49d49d'}
                                              />
                                            </li>
                                          </>
                                        )}

                                        <li
                                          className='text-[#212529] text-[15px] font-normal'
                                          onClick={() => handledata(data.option1.toLowerCase())}>
                                          {data.option1}
                                        </li>
                                        <li
                                          className='text-[#212529] text-[15px]  font-normal'
                                          onClick={() => handledata(data.option2.toLowerCase())}>
                                          {data.option2}
                                        </li>
                                        <li
                                          className='text-[#212529] text-[15px]  font-normal'
                                          onClick={() => handledata(data.option3.toLowerCase())}>
                                          {data.option3}
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}

                        {CardNetwork.map((selectdata, index) => {
                          return (
                            <div key={index}>
                              <div
                                id='accordionExample2'
                                data-active-classes='bg-none'
                                data-inactive-classes='text-[#212529]'>
                                <button
                                  className='flex cursor-pointer  filter-allof items-center justify-between w-full py-3 font-medium text-left text-gray-500 rounded-t-xl'
                                  type='button'
                                  id='headingTwo'
                                  data-te-collapse-init
                                  onClick={() => {
                                    handleClickNetwork(index)
                                  }}
                                  data-te-target='#collapseTwo'
                                  aria-expanded='true'
                                  aria-controls='collapseTwo'>
                                  <p className='text-[15px] text-[#212529] font-medium filter-text-resolution'>
                                    {selectdata?.Titlef}
                                  </p>
                                  {index === SelectIndexCardNetwork && networkActive ? (
                                    <Image
                                      src={accordionArrowall}
                                      alt='up'
                                      width={24}
                                      height={24}
                                      priority={true}
                                      className='rotate-180 w-6 h-6 shrink-0'
                                    />
                                  ) : (
                                    <Image
                                      src={accordionArrowall}
                                      alt='down'
                                      width={24}
                                      height={24}
                                      priority={true}
                                      className='w-6 h-6 shrink-0'
                                    />
                                  )}
                                </button>

                                {index === SelectIndexCardNetwork && networkActive && (
                                  <div
                                    id='collapseTwo'
                                    className='!visible'
                                    data-te-collapse-item
                                    data-te-collapse-show
                                    aria-labelledby='headingTwo'
                                    data-te-parent='#accordionExample2'>
                                    <div className='pb-3 pt-2 font-light  '>
                                      <div className=''>
                                        {selectdata.slug === 'cardnetwork' &&
                                          newDataCardNetwork?.sort().map((data, index) => {
                                            return (
                                              <div key={index}>
                                                <div className='flex pb-1'>
                                                  <input
                                                    type='checkbox'
                                                    id='vehicle1'
                                                    className='mr-3'
                                                    value={data}
                                                    checked={cardNetworkCheck?.includes(data)}
                                                    onChange={handleCardNetwork}
                                                  />
                                                  <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] filter-box-text '>
                                                    {data}
                                                  </span>
                                                </div>
                                              </div>
                                            )
                                          })}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </>
                  )}
                  {moreleftmenucredit?.top_category?.length > 0 && (
                    <div className='py-6  border-b border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4 filter-scroll'>
                      <p className='text-[15px] max-[1024px]:text-[14px] font-semibold pb-4 text-[#212529]'>
                        Top Picks For You
                      </p>
                      <div className=''>
                        {TopPickFilter.map((selectdata, index) => {
                          return (
                            <div key={index}>
                              {selectdata.slug === 'toppickfilter' &&
                                newDataCardTopPick?.map((data, index) => {
                                  return (
                                    <div key={index}>
                                      <Link
                                        href={`/credit-cards/[key]`}
                                        as={`/credit-cards/${data?.url_slug}`}
                                        prefetch={false}>
                                        <p className='text-[15px] flex items-center gap-2 text-[#000]  filter-box-text hover:!underline'>
                                          {' '}
                                          {data.title}
                                        </p>
                                      </Link>
                                    </div>
                                  )
                                })}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {moreleftmenucredit?.more_by_category?.length > 0 && (
                    <div className='py-6  border-b border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4 filter-scroll'>
                      <p className='text-[15px] max-[1024px]:text-[14px] font-semibold pb-4 text-[#212529]'>
                        Credit Cards by credit score
                      </p>
                      <div className=''>
                        {CreditScoreMore.map((selectdata, index) => {
                          return (
                            <div key={index}>
                              {selectdata.slug === 'creditscoremore' &&
                                newDataMoreCredit?.map((data, index) => {
                                  return (
                                    <div key={index}>
                                      <Link href={`/credit-cards/${data?.url_slug}`} prefetch={false}>
                                        <p className='text-[15px] flex items-center gap-2 text-[#000]  filter-box-text  hover:!underline'>
                                          {' '}
                                          {data.title}
                                        </p>
                                      </Link>
                                    </div>
                                  )
                                })}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {moreleftmenucredit?.more_way_to_browse?.length > 0 && (
                    <div className='py-6 xl:pr-[17px] lg:pr-4 md:pr-4 filter-scroll'>
                      <p className='text-[15px] max-[1024px]:text-[14px] font-semibold pb-4 text-[#212529]'>
                        Credit Cards by Issuer
                      </p>
                      <div className=''>
                        {CardIssuer.map((selectdata, index) => {
                          return (
                            <div key={index}>
                              {selectdata.slug === 'cardissuer' &&
                                newDataCardIssuer?.map((data, index) => {
                                  return (
                                    <div key={index}>
                                      <Link
                                        href={`/credit-cards/[key]`}
                                        as={`/credit-cards/${data?.url_slug}`}
                                        prefetch={false}>
                                        <p className='text-[15px] flex items-center gap-2 text-[#000]  filter-box-text hover:!underline '>
                                          {' '}
                                          {data.title}
                                        </p>
                                      </Link>
                                    </div>
                                  )
                                })}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className='col-span-4 2xl:col-span-4 md:col-span-4 flex flex-col'>
                <div className='flex flex-row justify-between pb-[1rem] gap-x-0'>
                  <div className=''>{getCheckBoxesList()}</div>
                  <div className=''>{getSortingOptionsPlp()}</div>
                </div>
                {showData ? (
                  <>
                    {filteredData?.length > 0 ? (
                      <>
                        {filteredData.map((alldata, index) => {
                          return (
                            <div key={index} ref={index === 0 ? firstDataRef : null}>
                              <div>
                                <div className=' py-[30px]  rounded-2xl bg-white filter-card-box duration-300 mb-5'>
                                  <div className='flex max-[1024px]:justify-between px-[30px] '>
                                    <div className=''>
                                      <div
                                        id={` +${index} + 'cc-img'`}
                                        className='xl:w-[240px] md:w-[180px] business-card-img'
                                        onClick={() => sendGAProductClick(alldata, index)}>
                                        <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                                          <Image
                                            src={`${Img_URL}/${alldata?.product_image}`}
                                            alt='card image'
                                            width={200}
                                            height={160}
                                            className='xl:w-full md:w-full'
                                            unoptimized={true}
                                          />
                                        </Link>
                                      </div>
                                    </div>

                                    <div className='px-4  xl:w-[100%] md:pr-0 md:px-[30px]'>
                                      <div className=' grid grid-cols-4 max-[1440px]:grid-cols-3'>
                                        <div className='col-span-3 max-[1440px]:col-span-2'>
                                          <div onClick={() => sendGAProductClick(alldata, index)}>
                                            <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                                              <h2
                                                id={`+${index} +'cc-title'`}
                                                className='text-[18px] font-bold text-[#212529] leading-7 pb-2'>
                                                {alldata.card_name}
                                              </h2>
                                            </Link>
                                          </div>

                                          <span
                                            className='text-[14px] comparebox-card-text  pb-6 text-[#212529]'
                                            data-tooltip-target='tooltip-light'
                                            data-tooltip-style='light'
                                            data-te-toggle='tooltip'
                                            title={`${alldata?.welcome_benefits?.replace(/["']/g, ' ')}`}>
                                            {alldata?.welcome_benefits?.replace(/["']/g, ' ')}
                                          </span>

                                          <p className=' text-[13px] font-semibold text-[#212529] pt-6 max-[771px]:pt-2'>
                                            {ListingfilterData.ratingtitle}
                                          </p>

                                          <div className='flex items-center gap-4 mt-2'>
                                            <div>
                                              <Image
                                                src={ListingfilterData.logoimg}
                                                alt='img'
                                                width={45}
                                                height={50}
                                                className=' border rounded-full p-2 w-[45px] h-[45px] border-[#e5e7eb]'
                                              />
                                            </div>

                                            <div className='border rounded-full py-1 px-4 flex gap-2 items-center max-[320px]:px-2'>
                                              <p className='xl:text-[18px] md:text-[14px] font-semibold text-[#212529]'>
                                                {alldata?.rating}/5
                                              </p>
                                              <StarRatings
                                                rating={alldata?.rating}
                                                starRatedColor='#49d49d'
                                                numberOfStars={starCount}
                                                name='rating'
                                                starDimension='24px'
                                                starSpacing='0'
                                              />
                                            </div>
                                            
                                          </div>
                                        </div>

                                        <div
                                          id='comp-6-aply-btn'
                                          className='flex md:flex-col gap-4 lg:flex-col  items-end'>
                                          <ApplyNowButton
                                            userData={getdatauser}
                                            data={alldata}
                                            category={'credit-cards'}
                                            pos='10'
                                            position={index}
                                            disabled={alldata?.bank_name === "KOTAK MAHINDRA BANK"}

                                          />
                                          {filteredDataCard(alldata?.url_slug) == 'Eligible' ? (
                                            <button
                                              id={`+${index}+'cc-btn'`}
                                              className='flex items-center gap-2 justify-center cursor-pointer business-right-text  w-full lg:w-[160px] md:w-full  text-[#212529] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                                              {' '}
                                              {filteredDataCard(alldata?.url_slug)}
                                              <Image
                                                src={successBgIcon}
                                                alt='img'
                                                width={20}
                                                height={20}
                                                className=''
                                              />
                                            </button>
                                          ) : (
                                            <button
                                              onClick={() => {
                                                router.push(
                                                  `/credit-cards/eligibility?eligible=${alldata?.url_slug.split('/')[2]
                                                  }`
                                                )
                                              }}
                                              className=' business-right-text py-3 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                                              {filteredDataCard(alldata?.url_slug)}
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='mt-4'>
                                    <div className='grid grid-cols-3 gap-0 pt-4'>
                                      <div className='border border-[gray-100] border-l-0 p-6 text-[#212529]'>
                                        <p className='text-[13px] font-normal '>{ListingfilterData.fees}</p>
                                        <p className='text-[15px] font-semibold pt-1'>
                                          {alldata.annual_fee == 0 ? (
                                            <div className='flex flex-col'>
                                              <span className='font-semibold'>Free</span>
                                            </div>
                                          ) : (
                                            <div className='flex flex-col'>
                                              <span className='symbole-rupee'>₹ {alldata.annual_fee} /-</span>
                                              <span className='font-normal text-[12px] mt-[1px]'>
                                                *Applicable Taxes
                                              </span>
                                            </div>
                                          )}
                                        </p>
                                      </div>
                                      <div className='border border-[gray-100] border-l-0 p-6 text-[#212529]'>
                                        <p className='text-[13px] font-normal'>{ListingfilterData.joiningfees}</p>
                                        <p className='text-[15px] font-semibold pt-1'>
                                          {alldata.joining_fee == 0 ? (
                                            <div className='flex flex-col'>
                                              <span className='font-semibold'>Free</span>
                                            </div>
                                          ) : (
                                            <div className='flex flex-col'>
                                              <span className='symbole-rupee'>₹ {alldata.joining_fee} /-</span>
                                              <span className='font-normal text-[12px] mt-[1px]'>
                                                *Applicable Taxes
                                              </span>
                                            </div>
                                          )}
                                        </p>
                                      </div>
                                      <div className='border border-[gray-100] border-l-0 border-r-0 p-6 text-[#212529]'>
                                        <p className='text-[13px] font-normal'>{ListingfilterData?.recommended}</p>
                                        <div className='flex items-center gap-2'>
                                          {alldata?.min_credit_score !== null && (
                                            <>
                                              <p className='text-[15px] font-semibold pt-1'>
                                                {alldata?.min_credit_score}
                                              </p>
                                            </>
                                          )}
                                          <div className='tooltip'>
                                            {alldata?.min_credit_score !== null && alldata?.max_credit_score && (
                                              <>
                                                <Image
                                                  src={ListingfilterData?.helpimg}
                                                  className='w-5 h-5'
                                                  alt='img'
                                                  width={20}
                                                  height={20}
                                                />
                                                <span className='tooltiptext'>
                                                  Having a credit score within or above the recommended range increases
                                                  your likelihood of approval for various financial applications, but it
                                                  does not provide an absolute guarantee.
                                                </span>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                        <Link
                                          href='/cibil-credit-score-check'
                                          className='text-[15px] pt-3   !underline text-[#5a5add] hover:!text-[#5a5add]'
                                          prefetch={false}>
                                          Check free credit score
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='grid grid-cols-2 pt-4 gap-4 px-6'>
                                  <div className='custom-max-content'>
                                      <label className=' text-gray-500 font-bold flex items-center'>
                                        <input
                                          className='mr-2 leading-tight w-[16px] h-[16px]'
                                          type='checkbox'
                                          id={alldata.product_id}
                                          disabled={
                                            size?.width <= 991
                                              ? selectedData.length >= 2 && !selectedData?.includes(alldata)
                                              : selectedData.length >= 3 && !selectedData?.includes(alldata)
                                          }
                                          onChange={(e) => handlecompareModal(e, alldata)}
                                          checked={selectedData.some(
                                            (selectedItem) => selectedItem.product_id === alldata.product_id
                                          )}
                                        />
                                        <p className='text-[15px] font-semibold  text-[#212529] business-right-text cursor-pointer'>
                                          {ListingfilterData.compare}
                                        </p>
                                      </label>
                                    </div>
                                    <div
                                      id='accordionExample'
                                      data-active-classes='bg-none'
                                      data-inactive-classes='text-[#212529]'
                                      className='h-[25px]'>
                                      {(alldata?.features || alldata?.welcome_offer) && (
                                        <div className='  relative  duration-300 h-full'>
                                          <h3 id='accordion-flush-heading-1' className="h-full">
                                            <button
                                              id={` + ${index} +'cc-btn'`}
                                              onClick={() => handleViewMoreAccordion(index)}
                                              type='button'
                                              className='text-[#212529] h-full list-none font-semibold relative text-[15px] gap-3 max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center justify-end w-full text-left'
                                              data-accordion-target='#accordion-flush-body-1'
                                              aria-expanded='true'
                                              aria-controls='accordion-flush-body-1'>
                                              {ListingfilterData.view_more}

                                              {vieMoreIndex?.includes(index) ? (
                                                <Image
                                                  src={accordionArrowall}
                                                  alt='down'
                                                  width={24}
                                                  height={24}
                                                  priority={true}
                                                  className='rotate-180 w-6 h-6 shrink-0'
                                                />
                                              ) : (
                                                <Image
                                                  src={accordionArrowall}
                                                  alt='down'
                                                  width={24}
                                                  height={24}
                                                  priority={true}
                                                  className='w-6 h-6 shrink-0'
                                                />
                                              )}
                                            </button>
                                          </h3>
                                          
                                        </div>
                                      )}
                                    </div>
                                    
                                  </div>
                                  <div className="px-6">
                                  {vieMoreIndex?.includes(index) && (
                                            <div aria-labelledby='accordion-flush-heading-1'>
                                              {alldata?.features && (
                                                <div className='mt-4 text-[#212529]'>
                                                  <p className='text-[15px] font-semibold '>{ListingfilterData.features}</p>
                                                  <div className='mt-4'>
                                                    <div
                                                      className='list-disc  space-y-2 text-[14px] product-list-data'
                                                      dangerouslySetInnerHTML={{
                                                        __html: `<div>${alldata?.features}</div>`
                                                      }}></div>
                                                  </div>
                                                </div>
                                              )}
                                              {alldata?.welcome_offer && (
                                                <div className='mt-4 text-[#212529]'>
                                                  <p className='text-[15px] font-semibold'>{ListingfilterData.welcomeoffer}</p>

                                                  <div className='mt-4'>
                                                    <div
                                                      className='list-disc  space-y-2 text-[14px] product-list-data'
                                                      dangerouslySetInnerHTML={{
                                                        __html: `<div>${alldata?.welcome_offer}</div>`
                                                      }}></div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                        {showData && totalItems > 10 && (
                          <div className='relative'>
                            <div className='flex flex-end mt-1 absolute right-0 top-0 font-bold'>
                              <PaginationData
                                showData={showData}
                                items={totalItems}
                                currentPage={currentPage}
                                pageSize={pageSize}
                                onPageChange={onPageChange}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <FilterNotFound
                        resetFilter={clearallfunc}
                        btnActive='Go Back'
                        btnActiveLink='/credit-cards'
                        btnTransparentLink='/'
                        btnTransparent='Reset Filter'
                        btn={true}
                        showPadding={false}
                        subTitle='Kindly reset filters or Go back to Previous page'
                      />
                    )}
                  </>
                ) : (
                  <>
                    {' '}
                    {filteredData?.length > 0 ? (
                      <>
                        {filteredData?.map((alldata, index) => {
                          return (
                            <div key={index} ref={index === 0 ? firstDataRef : null}>
                              <div>
                                <div className=' py-[30px]  rounded-2xl bg-white filter-card-box duration-300 mb-5'>
                                  <div className='flex max-[1024px]:justify-between px-[30px] '>
                                    <div className=''>
                                      <div
                                        id={`+${index}+'cc-img'`}
                                        onClick={() => sendGAProductClick(alldata, index)}
                                        className='xl:w-[240px] md:w-[180px] business-card-img'>
                                        <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                                          <Image
                                            src={`${Img_URL}/${alldata?.product_image}`}
                                            //
                                            alt='card image'
                                            width={200}
                                            height={160}
                                            className='xl:w-full md:w-full'
                                            unoptimized={true}
                                          />
                                        </Link>
                                      </div>
                                    </div>

                                    <div className='px-4  xl:w-[100%] md:pr-0 md:px-[30px]'>
                                      <div className=' grid grid-cols-4 max-[1440px]:grid-cols-3'>
                                        <div className='col-span-3 max-[1440px]:col-span-2'>
                                          <div onClick={() => sendGAProductClick(alldata, index)}>
                                            <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                                              <h2
                                                id={` +${index} +'cc-name'`}
                                                className='text-[18px] font-bold text-[#212529] leading-7 pb-2'>
                                                {alldata.card_name}
                                              </h2>
                                            </Link>
                                          </div>

                                          <span
                                            className='text-[14px] comparebox-card-text  pb-6 text-[#212529]'
                                            data-tooltip-target='tooltip-light'
                                            data-tooltip-style='light'
                                            data-te-toggle='tooltip'
                                            title={`${alldata?.welcome_benefits?.replace(/["']/g, ' ')}`}>
                                            {alldata?.welcome_benefits?.replace(/["']/g, ' ')}
                                          </span>

                                          <p className=' text-[13px] font-semibold text-[#212529] pt-6 max-[771px]:pt-2'>
                                            {ListingfilterData?.ratingtitle}
                                          </p>

                                          <div className='flex items-center gap-4 mt-2'>
                                            <div>
                                              <Image
                                                src={ListingfilterData?.logoimg}
                                                alt='img'
                                                width={45}
                                                height={50}
                                                className=' border rounded-full p-2 w-[45px] h-[45px] border-[#e5e7eb]'
                                              />
                                            </div>

                                            <Link href='#' className='text-[#212529]' prefetch={false}>
                                              <div className='border rounded-full py-1 px-4 flex gap-2 items-center max-[320px]:px-2'>
                                                <p className='xl:text-[18px] md:text-[14px] font-semibold text-[#212529]'>
                                                  {alldata?.rating}/5
                                                </p>
                                                <StarRatings
                                                  rating={alldata?.rating}
                                                  starRatedColor='#49d49d'
                                                  numberOfStars={starCount}
                                                  name='rating'
                                                  starDimension='24px'
                                                  starSpacing='0'
                                                />
                                              </div>
                                            </Link>
                                          </div>
                                        </div>

                                        <div
                                          id='comp-7-aply-btn'
                                          className='flex md:flex-col gap-4 lg:flex-col  items-end'>
                                          <ApplyNowButton
                                            userData={getdatauser}
                                            data={alldata}
                                            category={'credit-cards'}
                                            pos='11'
                                            position={index}
                                            disabled={alldata?.bank_name === "KOTAK MAHINDRA BANK"}

                                          />

                                          {filteredDataCard(alldata?.url_slug) == 'Eligible' ? (
                                            <button
                                              id={`+${index}+'cc-btn'`}
                                              className='flex items-center gap-2 justify-center cursor-pointer business-right-text  w-full lg:w-[160px] md:w-full  text-[#212529] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                                              {' '}
                                              {filteredDataCard(alldata?.url_slug)}
                                              <Image
                                                src={successBgIcon}
                                                alt='img'
                                                width={20}
                                                height={20}
                                                className=''
                                              />
                                            </button>
                                          ) : (
                                            <button
                                              id={`+${index}+'cc-btn'`}
                                              onClick={() => {
                                                router.push(
                                                  `/credit-cards/eligibility?eligible=${alldata?.url_slug.split('/')[2]
                                                  }`
                                                )
                                              }}
                                              className=' business-right-text py-3 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                                              {filteredDataCard(alldata?.url_slug)}
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='mt-4'>
                                    <div className='grid grid-cols-3 gap-0 pt-4'>
                                      <div className='border border-[gray-100] border-l-0 p-6 text-[#212529]'>
                                        <p className='text-[13px] font-normal '>{ListingfilterData.fees}</p>
                                        <p className='text-[15px] font-semibold pt-1'>
                                          {alldata.annual_fee == 0 ? (
                                            <div className='flex flex-col'>
                                              <span className='font-semibold'>Free</span>
                                            </div>
                                          ) : (
                                            <div className='flex flex-col'>
                                              <span className='symbole-rupee'>₹ {alldata.annual_fee} /-</span>
                                              <span className='font-normal text-[12px] mt-[1px]'>
                                                *Applicable Taxes
                                              </span>
                                            </div>
                                          )}
                                        </p>
                                      </div>
                                      <div className='border border-[gray-100] border-l-0 p-6 text-[#212529]'>
                                        <p className='text-[13px] font-normal'>{ListingfilterData.joiningfees}</p>
                                        <p className='text-[15px] font-semibold pt-1'>
                                          {alldata.joining_fee == 0 ? (
                                            <div className='flex flex-col'>
                                              <span className='font-semibold'>Free</span>
                                            </div>
                                          ) : (
                                            <div className='flex flex-col'>
                                              <span className='symbole-rupee'>₹ {alldata.joining_fee} /-</span>
                                              <span className='font-normal text-[12px] mt-[1px]'>
                                                *Applicable Taxes
                                              </span>
                                            </div>
                                          )}
                                        </p>
                                      </div>
                                      <div className='border border-[gray-100] border-l-0 border-r-0 p-6 text-[#212529]'>
                                        <p className='text-[13px] font-normal'>{ListingfilterData?.recommended}</p>
                                        <div className='flex items-center gap-2'>
                                          {alldata?.min_credit_score !== null && (
                                            <>
                                              <p className='text-[15px] font-semibold pt-1'>
                                                {alldata?.min_credit_score}
                                              </p>
                                            </>
                                          )}
                                          <div className='tooltip'>
                                            {alldata?.min_credit_score !== null && alldata?.max_credit_score && (
                                              <>
                                                <Image
                                                  src={ListingfilterData?.helpimg}
                                                  className='w-5 h-5'
                                                  alt='img'
                                                  width={20}
                                                  height={20}
                                                />
                                                <span className='tooltiptext'>
                                                  Having a credit score within or above the recommended range increases
                                                  your likelihood of approval for various financial applications, but it
                                                  does not provide an absolute guarantee.
                                                </span>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                        <div onClick={() => clickPromotion(index)}>
                                          <Link
                                            href='/cibil-credit-score-check'
                                            className='text-[15px] pt-3  !underline text-[#5a5add] hover:!text-[#5a5add]'
                                            prefetch={false}>
                                            Check free credit score
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='grid grid-cols-2 pt-4 gap-4 px-6'>
                                  <div className='custom-max-content'>
                                      <label className=' text-gray-500 font-bold flex items-center'>
                                        <input
                                          className='mr-2 leading-tight w-[16px] h-[16px]'
                                          type='checkbox'
                                          id={alldata.product_id}
                                          disabled={
                                            size?.width <= 991
                                              ? selectedData.length >= 2 && !selectedData?.includes(alldata)
                                              : selectedData.length >= 3 && !selectedData?.includes(alldata)
                                          }
                                          onChange={(e) => handlecompareModal(e, alldata)}
                                          checked={selectedData.some(
                                            (selectedItem) => selectedItem.product_id === alldata.product_id
                                          )}
                                        />
                                        <p className='text-[15px] font-semibold  text-[#212529] business-right-text cursor-pointer'>
                                          {ListingfilterData.compare}
                                        </p>
                                      </label>
                                    </div>
                                    <div
                                      id='accordionExample'
                                      data-active-classes='bg-none'
                                      data-inactive-classes='text-[#212529]'
                                      className='h-[25px]'>
                                      {(alldata?.features || alldata?.welcome_offer) && (
                                        <div className='  relative  duration-300 h-full'>
                                          <h3 id='accordion-flush-heading-1' className="h-full">
                                            <button
                                              id={` + ${index} +'cc-btn'`}
                                              onClick={() => handleViewMoreAccordion(index)}
                                              type='button'
                                              className='text-[#212529] h-full list-none font-semibold relative text-[15px] gap-3 max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center justify-end w-full text-left'
                                              data-accordion-target='#accordion-flush-body-1'
                                              aria-expanded='true'
                                              aria-controls='accordion-flush-body-1'>
                                              {ListingfilterData.view_more}

                                              {vieMoreIndex?.includes(index) ? (
                                                <Image
                                                  src={accordionArrowall}
                                                  alt='down'
                                                  width={24}
                                                  height={24}
                                                  priority={true}
                                                  className='rotate-180 w-6 h-6 shrink-0'
                                                />
                                              ) : (
                                                <Image
                                                  src={accordionArrowall}
                                                  alt='down'
                                                  width={24}
                                                  height={24}
                                                  priority={true}
                                                  className='w-6 h-6 shrink-0'
                                                />
                                              )}
                                            </button>
                                          </h3>
                                          
                                        </div>
                                      )}
                                    </div>
                                    
                                  </div>
                                  <div className="px-6">
                                  {vieMoreIndex?.includes(index) && (
                                            <div aria-labelledby='accordion-flush-heading-1'>
                                              {alldata?.features && (
                                                <div className='mt-4 text-[#212529]'>
                                                  <p className='text-[15px] font-semibold '>{ListingfilterData.features}</p>
                                                  <div className='mt-4'>
                                                    <div
                                                      className='list-disc  space-y-2 text-[14px] product-list-data'
                                                      dangerouslySetInnerHTML={{
                                                        __html: `<div>${alldata?.features}</div>`
                                                      }}></div>
                                                  </div>
                                                </div>
                                              )}
                                              {alldata?.welcome_offer && (
                                                <div className='mt-4 text-[#212529]'>
                                                  <p className='text-[15px] font-semibold'>{ListingfilterData.welcomeoffer}</p>

                                                  <div className='mt-4'>
                                                    <div
                                                      className='list-disc  space-y-2 text-[14px] product-list-data'
                                                      dangerouslySetInnerHTML={{
                                                        __html: `<div>${alldata?.welcome_offer}</div>`
                                                      }}></div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                        {showData && totalItems > 10 && (
                          <div className='relative'>
                            <div className='flex flex-end mt-1 absolute right-0 top-0 font-bold'>
                              <PaginationData
                                showData={showData}
                                items={totalItems}
                                currentPage={currentPage}
                                pageSize={pageSize}
                                onPageChange={onPageChange}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <FilterNotFound
                        resetFilter={clearallfunc}
                        btnActive='Go Back'
                        btnActiveLink='/credit-cards'
                        btnTransparentLink='/'
                        btnTransparent='Reset Filter'
                        btn={true}
                        subTitle='Kindly reset filters or Go back to Previous page'
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className=''>
            {filteredData?.length > 0 ? (
              <>
                {size.width < 992 && size.width > 576 ? (
                  <>
                    {' '}
                    <div className='grid 2xl:grid-cols-4 xl:mt-8 xl:gap-2 xl:grid-cols-3 xl:gap-4 lg:grid-cols-3 lg:gap-2 md:grid-cols-2 md:mt-0 grid-cols-1 md:gap-8 sm:mt-4  sm:gap-[30px] gap-4 mt-4 max-[479px]:mt-0 lg:px-16 max-[479px]:gap-[30px]'>
                      {getTabletListing()}
                    </div>
                  </>
                ) : size.width <= 576 ? (
                  <>
                    <div className='grid 2xl:grid-cols-4 xl:mt-8 xl:gap-2 xl:grid-cols-3 xl:gap-4 lg:grid-cols-3 lg:gap-2 md:grid-cols-2 md:mt-0 grid-cols-1 md:gap-8 sm:mt-4  sm:gap-[30px] gap-4 mt-4 max-[479px]:mt-0 lg:px-16 max-[479px]:gap-[30px]'>
                      {filteredData?.map((alldata, index) => {
                        return (
                          <div
                            key={index}
                            ref={index === filteredData?.length - 1 ? lastChildRef : index === 0 ? firstDataRef : null}
                            id='product-list'>
                            <div
                              id='element'
                              className='pt-6 bg-white  rounded-3xl   h-full  filter-card-box duration-300 relative'>
                              <div>
                                {filteredDataCard(alldata?.url_slug) == 'Eligible' && (
                                  <button
                                    id={`+${index}+'cc-btn'`}
                                    className='flex items-center px-6 gap-2 justify-end pb-4 cursor-pointer business-right-text  w-full lg:w-[160px] md:w-full  text-[#212529] font-semibold max-[375px]:text-[13px]  max-[280px]:text-[11px]'>
                                    {' '}
                                    {filteredDataCard(alldata?.url_slug)}
                                    <Image
                                      src={successBgIcon}
                                      alt='img'
                                      width={20}
                                      height={20}
                                      className=''
                                    />
                                  </button>
                                )}
                              </div>
                              <div className='flex gap-3 !px-6 max-[768px]:!px-4 max-[280px]:!px-2'>
                                <div className=''>
                                  <div
                                    id={` +${index} + 'cc'`}
                                    onClick={() => sendGAProductClick(alldata, index)}
                                    className='w-[160px] max-[771px]:w-[100px] max-[768px]:w-[120px] max-[425px]:w-[120px] max-[360px]:w-[100px] max-[320px]:!w-[84px] mobile-card-crdit'>
                                    <Image
                                      src={`${Img_URL}/${alldata?.product_image}`}
                                      //
                                      alt='card image'
                                      width={200}
                                      height={160}
                                      className='xl:w-full md:w-full'
                                      unoptimized={true}
                                    />
                                  </div>
                                </div>
                                <div className=' xl:w-[100%] '>
                                  <div className=' grid grid-cols-1'>
                                    <div className='text-[#212529]'>
                                      <div onClick={() => sendGAProductClick(alldata, index)}>
                                        <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                                          <h2
                                            id={`+ ${index} + 'cc'`}
                                            //
                                            className='text-[20px] whitespace-nowrap overflow-ellipsis overflow-hidden max-[425px]:text-[15px] font-bold max-[991px]:text-[18px] text-[#212529] leading-7 pb-2'
                                          >
                                            {alldata?.card_name}
                                          </h2>
                                        </Link>
                                      </div>
                                      <span
                                        className='text-[14px] comparebox-card-text pb-3 text-[#212529]'
                                        data-tooltip-target='tooltip-light'
                                        data-tooltip-style='light'
                                        data-te-toggle='tooltip'
                                        title={`${alldata?.welcome_benefits?.replace(/["']/g, ' ')}`}>
                                        {alldata?.welcome_benefits?.replace(/["']/g, ' ')}
                                      </span>

                                      <p className=' text-[13px] font-semibold text-[#212529] pt-6 max-[771px]:pt-2'>
                                        {ListingfilterData.ratingtitle}
                                      </p>

                                      <div className='flex items-center gap-2 mt-2 max-[360px]:gap-1'>
                                        <div>
                                          <Image
                                            src={ListingfilterData.logoimg}
                                            alt='img'
                                            width={45}
                                            height={50}
                                            className=' border rounded-full p-2 w-[36px] h-[36px] pl-0'
                                          />
                                        </div>

                                        <Link href='#' className='text-[#212529]' prefetch={false}>
                                          {alldata?.rating === 0 ? (
                                            'NA'
                                          ) : (
                                            <div className='border rounded-full py-1 px-4 flex gap-2 items-center justify-center max-[771px]:px-2 max-[360px]:gap-1'>
                                              <p className='xl:text-[18px] md:text-[14px] font-semibold max-[479px]:text-[12px] text-[15px] text-[#212529] max-[280px]:text-[11px] text-center'>
                                                {alldata?.rating}/5
                                              </p>
                                              <div className='mobile-rating'>
                                                <StarRatings
                                                  rating={alldata?.rating}
                                                  starRatedColor='#49d49d'
                                                  numberOfStars={starCount}
                                                  name='rating'
                                                  starDimension='17px'
                                                  starSpacing='0'
                                                />
                                              </div>
                                            </div>
                                          )}
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id='comp-9-aply-btn'
                                className='flex flex-col items-center gap-4 my-6 px-4  max-[280px]:!px-2'>
                                <ApplyNowButton
                                  userData={getdatauser}
                                  data={alldata}
                                  category={'credit-cards'}
                                  pos='14'
                                  position={index}
                                  disabled={alldata?.bank_name === "KOTAK MAHINDRA BANK"}

                                />

                                {filteredDataCard(alldata?.url_slug) !== 'Eligible' && (
                                  <button
                                    id={` + ${index}+ 'cc-btn'`}
                                    onClick={() => {
                                      router.push(
                                        `/credit-cards/eligibility?eligible=${alldata?.url_slug.split('/')[2]}`
                                      )
                                    }}
                                    className='py-3 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                                    {filteredDataCard(alldata?.url_slug)}
                                  </button>
                                )}
                              </div>

                              <div className='pb-5 border-b text-[#212529] max-[280px]:!px-2 grid grid-cols-2'>
                                <div className='p-6 border border-[gray-100] border-l-0 border-t-0 text-[#212529]'>
                                  <div className=''>
                                    <p className='text-[13px] font-normal'>{ListingfilterData.fees}</p>
                                    {alldata.annual_fee == 0 ? (
                                      <div className='flex flex-col'>
                                        <p className='text-[15px] font-semibold pt-1'>Free</p>
                                      </div>
                                    ) : (
                                      <div className='flex flex-col'>
                                        <p className='text-[15px] font-semibold pt-1 symbole-rupee'>
                                          &#8377; {alldata.annual_fee} /-
                                        </p>
                                        <span className='font-normal text-[12px] mt-[1px]'>
                                          *Applicable Taxes
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className='p-6 border border-[gray-100] border-l-0 border-t-0 border-r-0 text-[#212529]'>
                                  <div className=''>
                                    <p className='text-[13px] font-normal'>{ListingfilterData.joiningfees}</p>
                                    {alldata.joining_fee == 0 ? (
                                      <div className='flex flex-col'>
                                        <p className='text-[15px] font-semibold pt-1'>Free</p>
                                      </div>
                                    ) : (
                                      <div className='flex flex-col'>
                                        <p className='text-[15px] font-semibold pt-1 symbole-rupee'>
                                          &#8377; {alldata.joining_fee} /-
                                        </p>
                                        <span className='font-normal text-[12px] mt-[1px]'>
                                          *Applicable Taxes
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className='pl-6 pt-6 col-span-2 pb-1'>
                                  <p className='text-[13px] font-normal'>{ListingfilterData?.recommended}</p>
                                  <div className='flex items-center gap-2'>
                                    {alldata?.min_credit_score !== null && (
                                      <>
                                        <p className='text-[15px] font-semibold pt-1'>{alldata?.min_credit_score}</p>
                                      </>
                                    )}
                                    <div className='tooltip'>
                                      {alldata?.min_credit_score !== null && alldata?.max_credit_score && (
                                        <>
                                          <Image
                                            src={ListingfilterData?.helpimg}
                                            className='w-5 h-5'
                                            alt='img'
                                            width={20}
                                            height={20}
                                          />
                                          <span className='tooltiptext'>
                                            Having a credit score within or above the recommended range increases your
                                            likelihood of approval for various financial applications, but it does not
                                            provide an absolute guarantee.
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  <div onClick={() => clickPromotion(index)}>
                                    <Link
                                      href='/cibil-credit-score-check'
                                      className='text-[15px] pt-3  !underline text-[#5a5add] hover:!text-[#5a5add]'
                                      prefetch={false}>
                                      Check free credit score
                                    </Link>
                                  </div>
                                </div>
                              </div>

                              <div className='grid grid-cols-2 py-4 gap-4 px-4 items-center'>
                                  <div className='custom-max-content'>
                                      <label className=' text-gray-500 font-bold flex items-center'>
                                        <input
                                          className='mr-2 leading-tight w-[16px] h-[16px]'
                                          type='checkbox'
                                          id={alldata.product_id}
                                          disabled={
                                            size?.width <= 991
                                              ? selectedData.length >= 2 && !selectedData?.includes(alldata)
                                              : selectedData.length >= 3 && !selectedData?.includes(alldata)
                                          }
                                          onChange={(e) => handlecompareModal(e, alldata)}
                                          checked={selectedData.some(
                                            (selectedItem) => selectedItem.product_id === alldata.product_id
                                          )}
                                        />
                                        <p className='text-[15px] font-semibold  text-[#212529] business-right-text max-[375px]:text-[14px] max-[320px]:text-[12px] cursor-pointer'>
                                          {ListingfilterData.compare}
                                        </p>
                                      </label>
                                    </div>
                                    <div
                                      id='accordionExample'
                                      data-active-classes='bg-none'
                                      data-inactive-classes='text-[#212529]'
                                      className='h-[25px]'>
                                      {(alldata?.features || alldata?.welcome_offer) && (
                                        <div className='  relative  duration-300 h-full'>
                                          <h3 id='accordion-flush-heading-1' className="h-full">
                                            <button
                                              id={` + ${index} +'cc-btn'`}
                                              onClick={() => handleViewMoreAccordion(index)}
                                              type='button'
                                              className='text-[#212529] h-full list-none font-semibold relative text-[15px] gap-3 max-[375px]:text-[14px] max-[320px]:text-[12px] cursor-pointer faq-quation-title flex items-center justify-end w-full text-left'
                                              data-accordion-target='#accordion-flush-body-1'
                                              aria-expanded='true'
                                              aria-controls='accordion-flush-body-1'>
                                              {ListingfilterData.view_more}

                                              {vieMoreIndex?.includes(index) ? (
                                                <Image
                                                  src={accordionArrowall}
                                                  alt='down'
                                                  width={24}
                                                  height={24}
                                                  priority={true}
                                                  className='rotate-180 w-6 h-6 shrink-0'
                                                />
                                              ) : (
                                                <Image
                                                  src={accordionArrowall}
                                                  alt='down'
                                                  width={24}
                                                  height={24}
                                                  priority={true}
                                                  className='w-6 h-6 shrink-0'
                                                />
                                              )}
                                            </button>
                                          </h3>
                                          
                                        </div>
                                      )}
                                    </div>
                                    
                                  </div>
                                  <div className="px-6 pb-4">
                                  {vieMoreIndex?.includes(index) && (
                                            <div aria-labelledby='accordion-flush-heading-1'>
                                              {alldata?.features && (
                                                <div className='mt-4 text-[#212529]'>
                                                  <p className='text-[15px] font-semibold max-[375px]:text-[14px] '>{ListingfilterData.features}</p>
                                                  <div className='mt-4 max-[375px]:mt-2'>
                                                    <div
                                                      className='list-disc  space-y-2 text-[14px] product-list-data'
                                                      dangerouslySetInnerHTML={{
                                                        __html: `<div>${alldata?.features}</div>`
                                                      }}></div>
                                                  </div>
                                                </div>
                                              )}
                                              {alldata?.welcome_offer && (
                                                <div className='mt-4 text-[#212529]'>
                                                  <p className='text-[15px] font-semibold max-[375px]:text-[14px] '>{ListingfilterData.welcomeoffer}</p>

                                                  <div className='mt-4 max-[375px]:mt-2'>
                                                    <div
                                                      className='list-disc  space-y-2 text-[14px] product-list-data'
                                                      dangerouslySetInnerHTML={{
                                                        __html: `<div>${alldata?.welcome_offer}</div>`
                                                      }}></div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                  </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                ) : (
                  ''
                )}

                {size.width >= 577 && showData && totalItems > 10 && (
                  <div className='relative flex justify-end mt-4  top-2'>
                    <div className=' mt-1 absolute  font-bold'>
                      <PaginationData
                        items={totalItems}
                        currentPage={currentPage}
                        showData
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <FilterNotFound
                resetFilter={clearallfunc}
                btnActive='Go Back'
                btnActiveLink='/credit-cards'
                btnTransparentLink='/'
                btnTransparent='Reset Filter'
                btn={true}
                subTitle='Kindly reset filters or Go back to Previous page'
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default ListingFilter
