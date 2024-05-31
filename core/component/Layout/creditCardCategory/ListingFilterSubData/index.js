/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useEffect, useState, useRef, useId } from 'react'
import Image from 'next/image'
import accordionArrowall from '../../../../../public/assets/accordion-down.svg'
import CloseIcon from '../../../../../public/assets/closeIcon.svg'
import BackArrow from '../../../../../public/assets/left-arrow.svg'
import alertOctagon from '../../../../../public/assets/alert-octagon.svg'
import FilterIcon from '../../../../../public/assets/filter-icon.svg'
import successBgIcon from '../../../../../public/assets/success-bg-icon.svg'
import Link from 'next/link'
import {
  CardIssuer,
  CardNetwork,
  CreditScoreMore,
  FilaterData,
  TopPickFilter,
  sortingOptions
} from '@/utils/alljsonfile/filterdata'
import dynamic from 'next/dynamic'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useRouter } from 'next/router'
import ReactStars from 'react-stars'
import InputRange from 'react-input-range'
import toast, { Toaster } from 'react-hot-toast'
import { BASE_URL, USERSET, BUSINESSSUBCATEGORY } from '@/utils/alljsonfile/service'
import axios from 'axios'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import jwt from 'jwt-decode'
import SuccessIcon from '@/core/component/Leads/common/SuccessIcon'
import {
  errorHandling,
  getHash,
  getPromotionObject,
  getSortKeyCreditCards,
  handleRemoveLocalstorage,
  lowToHigh,
  lowToHighSort,
  removeDuplicates,
  sendEventToGTM
} from '@/utils/util'
import Cookies from 'js-cookie'
import ApplyNowButton from '@/core/component/common/ApplyNowButton/ApplyNowButton'
import LoaderLogo from '../../../../../public/assets/logo-loader.gif'
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

function ListingFilterSubData({
  productlistdataSub,
  morecategoryleftfilter,
  businessmetaheadtag,
  url_slug,
  isInViewPort,
  credit_url_slug,
  sub_cat_url
}) {
  const [isActive, setIsActive] = useState(false)
  const [networkActive, setNetworkActive] = useState(false)
  const [subSelecteCategory, setSubSelecteCategory] = useState('')
  const [SelectIndex, setSelectIndex] = useState([])
  const [SelectIndexCardNetwork, setSelectIndexCardNetwork] = useState()
  const [filterdata, setFilterData] = useState([])
  const [filtedAfterData, setFilteredData] = useState(productlistdataSub?.product_list)
  const [modal, setModal] = useState(false)
  const [comparemodal, setCompareModal] = useState(false)
  const [compareslug, setCompareSlug] = useState([])
  const [checkFilter, setCheckFilter] = useState([])
  const [checkboxValues, setCheckboxValues] = useState([])
  const [cardNetworkCheck, setCardNetworkCheck] = useState([])
  const [ratingstar, setRatingstar] = useState(null)
  const [isChecked, setIsChecked] = useState(false)
  const [isLougeValue, setIsLougeValue] = useState('')
  const [selectedData, setSelectedData] = useState([])
  const [filterBankSub, setFilterBankSub] = useState([])
  const [fetureAccordion, setFetureAccordion] = useState(false)
  const [fetureIndex, setFetureIndex] = useState([])
  const [welcomeAccordion, setWelcomeAccordion] = useState(false)
  const [welcomeIndex, setWelcomeIndex] = useState([])
  const [getdatauser, setGetDataUser] = useState([])
  const [showData, setShowData] = useState(true)
  const [applyUrlState, setApplyUrlState] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [clickedOnce, setClickedOnce] = useState(false)
  const [fieldValue, setFieldValue] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [pageID, setPageID] = useState()
  const [mobileLoader, setMobileLoader] = useState(false)
  const [pageParam, setPageParam] = useState(0)
  const [isTheLastChild, setIsTheLastChild] = useState(false)
  const [listingFilteredData, setListingFilteredData] = useState([])
  const [openSortBy, setOpenSortBy] = useState(false)
  const [selectedSortOption, setSelectedSortOption] = useState('Default')
  const [visibleItems, setVisibleItems] = useState(10) // Number of items to display initially
  const [vieMoreAccordion, setVieMoreAccordion] = useState(false)
  const [vieMoreIndex, setVieMoreIndex] = useState([])

  const id = useId()
  const size = useWindowSize()
  const router = useRouter()

  const pageSize = 20
  const isSubCatBankPage = router.asPath?.includes('-bank')

  const firstDataRef = useRef(null)
  const lastChildRef = useRef(null)

  const finalArray = getdatauser?.eligible_product?.credit_cards
  const scrollValue = typeof window !== 'undefined' && window?.scrollY

  //leadparams details

  const windowSize = useMemo(() => {
    return size?.width
  }, [size?.width])

  const isMobile = windowSize <= 576
  const fetchListingFilterData = async () => {
    try {
      const requestParams = {
        lang_id: 1,
        business_category_url_slug: credit_url_slug,
        business_sub_category_url_slug: sub_cat_url,
        offset: 0,
        limit: 200
      }
      const response = await axios.post(BASE_URL + BUSINESSSUBCATEGORY.productListCatSub, requestParams)
      const data = await response?.data?.product_list
      setListingFilteredData(data)
    } catch (error) {
      return errorHandling(error)
    }
  }

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

  const handleMobileAccordion = (index) => {
    setFetureAccordion(!fetureAccordion)
    if (fetureIndex?.includes(index)) {
      const updateValue = fetureIndex.indexOf(index)
      fetureIndex.splice(updateValue, 1)
      setFetureIndex(fetureIndex)
    } else {
      setFetureIndex([...fetureIndex, index])
    }
  }
  const handleWelcomAccordion = (index) => {
    setWelcomeAccordion(!welcomeAccordion)
    if (welcomeIndex?.includes(index)) {
      const updateValue = welcomeIndex.indexOf(index)
      welcomeIndex.splice(updateValue, 1)
      setWelcomeIndex(welcomeIndex)
    } else {
      setWelcomeIndex([...welcomeIndex, index])
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

  const { query } = router
  const token = localStorage.getItem('token')
  const leadId = localStorage.getItem('leadprofileid')

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

  const GetScoreHistory = (e) => {
    if (leadId) {
      e?.preventDefault()
      axios
        .post(
          BASE_URL + USERSET?.creditscorehistory,
          {
            lead_profile_id: leadId
          },
          { headers: headersAuth }
        )
        .then((response) => {
          if (response?.data?.message == 'success') {
            setScoreData(response?.data?.current_score)
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message == 'failed') {
          } else if (error?.response?.status == 403) {
          }
        })
    }
  }

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
            setGetDataUser(response?.data?.data)
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message == 'failed') {
            toast.error(error?.response?.data?.reason)
          } else if (error?.response?.status == 401) {
            router.push('/login')
            toast.success(ApiMessage?.logoutmessage)
            handleRemoveLocalstorage()
          } else if (error?.response?.status == 403) {
          }
        })
    }
  }

  useEffect(() => {
    if (token) {
      GetScoreHistory()
      GetUserSetUp()
    }
  }, [])

  const h = getHash()

  const handleCheckboxChangeForLouge = (event) => {
    setShowData(false)
    const ischeck = event.target.checked
    setIsChecked((prev) => !prev)
    if (!ischeck) {
      setIsLougeValue('0')
      setFilteredData(productlistdataSub?.product_list)
    } else {
      setIsLougeValue('1')
      const filtered = listingFilteredData?.filter((el) => {
        return el.lounge_access === '1'
      })
      setFilteredData(filtered)
    }
  }

  const handleRatingdata = (rating) => {
    setShowData(false)
    setRatingstar(rating)
    if (listingFilteredData) {
      const filtered = listingFilteredData?.filter((el) => {
        return el.rating == rating
      })
      setFilteredData(filtered)
    } else {
      setFilteredData(productlistdataSub?.product_list)
    }
  }

  const handleClick = (data) => {
    setIsActive(!isActive)
    if (SelectIndex?.includes(data)) {
      const updateValue = SelectIndex?.indexOf(data)
      SelectIndex.splice(updateValue, 1)
      setSelectIndex(SelectIndex)
    } else {
      setSelectIndex([...SelectIndex, data])
    }
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
  }, [selectedData.length])

  const Removehendler = (index) => {
    filterdata?.splice(index, 1)
    // setFilterData([...filterdata])
    checkboxValues?.splice(index, 1)
    setFilteredData(productlistdataSub?.product_list)
    setCheckFilter([...checkboxValues])
    cardNetworkCheck?.splice(index, 1)
    setCheckFilter([...cardNetworkCheck])
    setSubSelecteCategory([...subSelecteCategory])
  }

  const Removehendler1 = (index) => {
    cardNetworkCheck?.splice(index, 1)
    setFilteredData(productlistdataSub?.product_list)
    setCheckFilter([...cardNetworkCheck])
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
        filterdata?.includes(el?.card_network) ||
        filterdata.some((res) => {
          return el?.welcome_benefits
            ?.replace(/^'+|'+$/g, '')
            .trim()
            ?.toLowerCase()
            ?.includes(res)
        })
      )
    })

    setFilteredData(filtered)
  }
  useEffect(() => {
    getFilteredProductData(productlistdataSub)
  }, [productlistdataSub?.product_list, filterdata])

  useEffect(() => {
    if (listingFilteredData) {
      const filtered = listingFilteredData?.filter((el) => {
        return el.rating == ratingstar
      })
      setFilteredData(ratingstar ? filtered : productlistdataSub?.product_list)
    }
  }, [productlistdataSub?.product_list, listingFilteredData, ratingstar])

  useEffect(() => {
    const checkfiltered = productlistdataSub?.product_list?.filter((el) => {
      return checkFilter?.includes(el.card_name.toLowerCase())
    })
    setCheckFilter(checkfiltered)
  }, [productlistdataSub?.product_list])

  const combinedBenefits = listingFilteredData
    ?.map((str) => str?.welcome_benefits?.replace(/["']/g, ' ')?.split(','))
    .reduce((acc, arr) => acc.concat(arr), [])

  const combinedLounge = listingFilteredData
    ?.map((str) => str?.lounge_access)

    .reduce((acc, arr) => acc.concat(arr), [])

  const combinedcardNetwork = listingFilteredData
    ?.map((str) => str?.card_network)

    .reduce((acc, arr) => acc.concat(arr), [])

  const combinedcardProvider = listingFilteredData
    ?.map((str) => str?.bank_name)
    .reduce((acc, arr) => acc.concat(arr), [])

  // const combineWelcome = productlistdataSub?.map((str) => str?.bank)
  const combineTopPick = morecategoryleftfilter?.top_category?.map((str) => str)
  const combineMoreCredit = morecategoryleftfilter?.more_by_category?.map((str) => str)
  const combineCardIssuer = morecategoryleftfilter?.more_way_to_browse?.map((str) => str)

  const newDataCardNetwork = [...new Set(combinedcardNetwork)]
  const newDataCardProvider = [...new Set(combinedcardProvider)]
  const newDataCardTopPick = [...new Set(combineTopPick)]
  const newDataMoreCredit = [...new Set(combineMoreCredit)]
  const newDataCardIssuer = [...new Set(combineCardIssuer)]
  const newWelcomebenfits = [...new Set(combinedBenefits)]

  const uniqueArray = newWelcomebenfits?.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
  const sortedArray = uniqueArray?.map((str) => str.replace(/["']/g, '')).sort()

  const handleCardNetwork = (event) => {
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
      setFilteredData(checkboxValues?.length > 0 ? filteredList : productlistdataSub?.product_list)
    }
  }, [productlistdataSub?.product_list, listingFilteredData, checkboxValues])

  useEffect(() => {
    if (listingFilteredData) {
      const filteredList = listingFilteredData?.filter((item) => {
        return cardNetworkCheck?.includes(item.card_network)
      })
      setFilteredData(cardNetworkCheck?.length > 0 ? filteredList : productlistdataSub?.product_list)
    }
  }, [productlistdataSub?.product_list, listingFilteredData, cardNetworkCheck])

  // ====================== JOINING FESS RANGE SLIDER====================================

  const [minJoiningFees, setMinJoiningFees] = useState(0)
  const [maxJoiningFees, setMaxJoiningFees] = useState(0)
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

  // joining fee filter function
  const handleRangeJoining = (newValue) => {
    setShowData(false)
    setJoiningFeeRange(newValue)
    if (listingFilteredData && newValue) {
      const filtered = listingFilteredData.filter(
        (item) => item.joining_fee >= newValue.min && item.joining_fee <= newValue.max
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(productlistdataSub?.product_list)
    }
  }

  // ====== ANUUAL SLIDER RANGE ======

  const [minAnnualFees, setMinAnnualFees] = useState(0)
  const [maxAnnualFees, setMaxAnnualFees] = useState(0)
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

  // useEffect(() => {
  //   if (listingFilteredData) {
  //     const filtered = listingFilteredData.filter(
  //       (item) => item.annual_fee >= annualFeeRange.min && item.annual_fee <= annualFeeRange.max
  //     )
  //     setFilteredData(filtered)
  //   } else {
  //     setFilteredData(productlistdataSub?.product_list)

  //   }
  // }, [productlistdataSub?.product_list, listingFilteredData, annualFeeRange])

  //Annaul fee filter function
  const handleAnnualFeeChange = (value) => {
    setShowData(false)
    setAnnualFeeRange(value)
    if (listingFilteredData && value) {
      const filtered = listingFilteredData.filter(
        (item) => item.annual_fee >= value?.min && item.annual_fee <= value?.max
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(productlistdataSub?.product_list)
    }
  }

  // ====== APR SLIDER RANGE ======

  const [minAprData, setMinAprData] = useState(0)
  const [maxAprData, setMaxAprData] = useState(100)
  const [aprRange, setAprRange] = useState({ min: minAprData, max: maxAprData })

  useEffect(() => {
    if (listingFilteredData) {
      const minFee = Math.min(...listingFilteredData.map((card) => card.apr))
      const maxFee = Math.max(...listingFilteredData.map((card) => card.apr))
      setMinAprData(minFee)
      setMaxAprData(maxFee)
      setAprRange({ min: minFee, max: maxFee })
    }
  }, [listingFilteredData])

  // useEffect(() => {
  //   if (listingFilteredData) {
  //     const filtered = listingFilteredData.filter(
  //       (item) => item.apr >= aprRange.min && item.apr <= aprRange.max
  //     )
  //     setFilteredData(filtered)
  //   } else {
  //     setFilteredData(productlistdataSub?.product_list)

  //   }
  // }, [productlistdataSub?.product_list, listingFilteredData, aprRange])
  //Apr filter function
  const handleAprDataChange = (value) => {
    setShowData(false)
    setAprRange(value)
    if (listingFilteredData && value) {
      const filtered = listingFilteredData.filter((item) => item.apr >= value?.min && item?.apr <= value?.max)
      setFilteredData(filtered)
    } else {
      setFilteredData(productlistdataSub?.product_list)
    }
  }

  // ====== CREDIT SCORE SLIDER RANGE ======

  const [minCreditScoreData, setMinCreditScoreData] = useState(0)
  const [maxCreditScoreData, setMaxCreditScoreData] = useState(0)
  const [creditScoreRange, setCreditScoreRange] = useState({ min: minCreditScoreData, max: maxCreditScoreData })
  const [creditScore, setCreditScore] = useState(minCreditScoreData || 0)

  useEffect(() => {
    if (listingFilteredData) {
      const minFee = Math.min(...listingFilteredData.map((card) => card.min_credit_score))
      const maxFee = Math.max(...listingFilteredData.map((card) => card.max_credit_score))
      setMinCreditScoreData(minFee)
      setMaxCreditScoreData(maxFee)
      setCreditScoreRange({ min: minFee, max: maxFee })
      // setCreditScoreRange([minFee, maxFee])
    }
  }, [listingFilteredData])

  //handle credit score function
  const handleCreditScoreChange = (value) => {
    setCreditScore(value)
    setShowData(false)
    // setCreditScoreRange(value)
    if (listingFilteredData && value) {
      const filtered = listingFilteredData?.filter(
        (card) => value >= card?.min_credit_score && value <= card?.max_credit_score
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(productlistdataSub?.product_list)
    }
  }

  const filterwithbank = (bank) => {
    if (filterBankSub?.includes(bank)) {
      setFilterBankSub(filterBankSub.filter((selectedBank) => selectedBank !== bank))
    } else {
      setFilterBankSub([...filterBankSub, bank])
    }
  }

  useEffect(() => {
    if (listingFilteredData && filterBankSub?.length > 0) {
      const filtered = listingFilteredData?.filter((el) => {
        return filterBankSub?.includes(el.bank_name)
      })
      setFilteredData(filterBankSub?.length > 0 ? filtered : productlistdataSub?.product_list)
    }
  }, [productlistdataSub?.product_list, listingFilteredData, filterBankSub?.length, filterBankSub])

  const handleRemoveBank = (index) => {
    filterBankSub?.splice(index, 1)
    setFilterBankSub([...filterBankSub])
    setFilteredData(productlistdataSub?.product_list)
  }

  const filterwelcomebenefits = (data) => {
    setSubSelecteCategory(data)
    const value = filterdata.filter((obj) => obj === data)
    if (value?.includes(data)) {
      setFilterData(filterdata.filter((selectedBank) => selectedBank !== data))
    } else {
      setFilterData([...filterdata, data])
    }
  }

  useEffect(() => {
    if (productlistdataSub?.product_list) {
      const filtered = productlistdataSub?.product_list?.filter((el) => {
        return filterdata.find((res) => {
          return el?.welcome_benefits?.toLowerCase()?.includes(res?.trim().toLowerCase())
        })
      })
      setFilteredData(filtered?.length > 0 ? filtered : productlistdataSub?.product_list)
    }
  }, [productlistdataSub?.product_list, filterdata])

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
    setFilteredData(productlistdataSub?.product_list)
    // setListingFilteredData(productlistdataSub?.product_list)
    setRatingstar(null)
    setCheckboxValues([])
    setCardNetworkCheck([])
    setIsChecked(false)
    setModal(false)
    setSubSelecteCategory('')
    setShowData(true)
    setAnnualFeeRange({ min: minAnnualFees, max: maxAnnualFees })
    setAprRange({ min: minAprData, max: maxAprData })
    setCreditScore(minCreditScoreData)
    setCreditScoreRange({ min: minCreditScoreData, max: maxCreditScoreData })
    setJoiningFeeRange({ min: minJoiningFees, max: maxJoiningFees })
  }

  useEffect(() => {
    setFilteredData(productlistdataSub?.product_list)
  }, [])

  // pagination server side
  const totalItems = productlistdataSub?.total_count
  const urlToSend = typeof window !== 'undefined' && window?.location?.pathname?.split('/')?.pop()

  const onPageChange = (page) => {
    setIsLoading(true)
    setCurrentPage(page)
    if (firstDataRef?.current) {
      firstDataRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    router?.push({
      pathname: `/credit-cards/${urlToSend}`,
      query: `page=${page}`
    })
    setIsLoading(false)
  }

  // ......................................... SORTING OPTIONS................................. //

  const handleLowToHigh = (parentName) => {
    const sortKey = getSortKeyCreditCards(parentName)
    const list = lowToHighSort(listingFilteredData || productlistdataSub?.product_list, sortKey)
    setFilteredData(list)
    setOpenSortBy(false)
  }

  const handleHighToLow = (parentName) => {
    const sortKey = getSortKeyCreditCards(parentName)
    const list = lowToHighSort(listingFilteredData || productlistdataSub?.product_list, sortKey)
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
            <div type='button' onClick={() => setOpenSortBy(!openSortBy)}>
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
                  isSubCatBankPage
                    ? scrollValue === 0
                      ? readMoreOpen === 'true'
                        ? 'top-[565px]'
                        : 'top-[530px]'
                      : readMoreOpen === 'true'
                        ? 'top-[520px]'
                        : 'top-[480px]'
                    : scrollValue === 0
                      ? readMoreOpen === 'true'
                        ? 'top-[540px]'
                        : 'top-[500px]'
                      : readMoreOpen === 'true'
                        ? 'top-[490px]'
                        : 'top-[450px]'
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
          <div className='text-[15px] max-[1024px]:text-[14px] font-semibold pb-2 text-[#212529]'>Sort By :</div>
          <div className={`h-auto  bg-white flex flex-col items-start justify-start`}>
            {sortingOptions?.map((item) => {
              return (
                <div key={item?.id} className=''>
                  <div
                    className='text-[#212529] hover:text-[#212529] hover:!underline'
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
  const getBanksSelected = () => {
    return (
      <>
        <ul className='list-none flex gap-4 list-t flex-wrap mb-4 '>
          {filterBankSub?.map((value, index) => {
            return (
              <div key={index}>
                <li className='active inline-flex'>
                  <button className='bg-none p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                    {value}
                    <Image
                      src={CloseIcon}
                      alt='image'
                      className='align-middle cursor-pointer ml-2 w-[16px] h-[16px] '
                      height={16}
                      width={16}
                      priority={true}
                      onClick={() => handleRemoveBank(index)}
                    />
                  </button>
                </li>
              </div>
            )
          })}
          {filterdata?.map((value, index) => {
            return (
              <div key={index}>
                <li className='active inline-flex'>
                  <button className='bg-none p-2 cursor-pointer  px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                    {value}
                    <Image
                      src={CloseIcon}
                      alt='image'
                      height={16}
                      width={16}
                      priority={true}
                      className='align-middle ml-2 w-[16px] h-[16px]'
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
                <li className='active inline-flex'>
                  <button className='bg-none cursor-pointer p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                    {value1}
                    <Image
                      src={CloseIcon}
                      alt='image'
                      height={16}
                      width={16}
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
                <li className='active inline-flex'>
                  <button className='bg-none cursor-pointer p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                    {value1}
                    <Image
                      src={CloseIcon}
                      alt='image'
                      height={16}
                      width={16}
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
      </>
    )
  }

  // Attach a scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && visibleItems < filtedAfterData?.length) {
        // Increase the number of visible items when scrolled to the bottom
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [visibleItems, filtedAfterData?.length])
  // ===Mobile Loader======
  useEffect(() => {
    if (checkboxValues?.length === 0) {
      setShowData(true)
    }
  }, [checkboxValues])

  const listCondition = filtedAfterData?.length ? filtedAfterData : productlistdataSub?.product_list
  const position = router?.query?.page ? (router?.query?.page - 1) * 10 : 0

  const listingItems = productlistdataSub?.product_list?.map((product, index) => {
    const pagePosition = position == 0 ? position + index + 1 : position + index + 1
    return {
      item_id: product?.product_id?.toString(),
      item_name: product?.card_name,
      index: pagePosition,
      item_brand: product?.bank_name,
      item_category: `Credit Cards ${url_slug}`,
      item_category2: '',
      item_category3: '',
      item_category4: '',
      item_category5: '',
      item_list_id: `Credit Cards ${url_slug}`,
      item_list_name: `Credit Cards ${url_slug}`,
      item_variant: product?.card_name,
      quantity: 1
    }
  })
  //GtM object defined
  const eventData = {
    event: 'view_item_list',
    ecommerce: {
      item_list_id: `Credit Cards ${url_slug}`,
      item_list_name: `Credit Cards ${url_slug}`,
      items: listingItems
    }
  }
  // Use the custom hook to send data to GTM
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
            item_category: `Credit Cards ${url_slug}`,
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
  //click promotion
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

  // more data for mobile
  const fetchMoreCardsData = () => {
    if (!isInViewPort) {
      setMobileLoader(true)
      const requestParams = {
        lang_id: '1',
        business_category_url_slug: credit_url_slug,
        business_sub_category_url_slug: url_slug,
        offset: pageParam + 1,
        limit: 20
      }
      axios
        .post(BASE_URL + BUSINESSSUBCATEGORY.productListCatSub, requestParams)
        .then((response) => {
          setMobileLoader(false)
          if (response?.data?.product_list?.length > 0) {
            const combineData = [...filtedAfterData, ...response?.data?.product_list]
            setFilteredData(removeDuplicates(combineData))
            setIsTheLastChild(false)
            setPageParam(pageParam + 1)
          }
        })
        .catch((error) => {
          setMobileLoader(false)
          setPageParam(0)
          // errorHandling(error)
        })
    }
  }

  useEffect(() => {
    if (isTheLastChild) {
      fetchMoreCardsData()
    }
  }, [isTheLastChild])

  useEffect(() => {
    const handleScroll = () => {
      const lastChildRect = lastChildRef?.current?.getBoundingClientRect()
      if (lastChildRect?.bottom <= window?.innerHeight) {
        if (totalItems !== filtedAfterData?.length && isMobile && lastChildRef?.current) {
          console.log('Last child element is visible!')
          setIsTheLastChild(true)
        }
      }
    }
    // Add scroll event listener to the window object
    window.addEventListener('scroll', handleScroll)
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastChildRef, totalItems, filtedAfterData?.length, isMobile])

  //sub cat api call for filter
  useEffect(() => {
    fetchListingFilterData()
  }, [])

  useEffect(() => {
    if (isSubCatBankPage || businessmetaheadtag?.is_bank === 0) {
      setSelectedSortOption('Default')
    }
  }, [router?.pathname])

  const showClearAll =
    isChecked !== false ||
    checkboxValues?.length !== 0 ||
    cardNetworkCheck?.length !== 0 ||
    joiningFeeRange?.min !== minJoiningFees ||
    joiningFeeRange?.max !== maxJoiningFees ||
    annualFeeRange?.min !== minAnnualFees ||
    annualFeeRange?.max !== maxAnnualFees ||
    aprRange?.min !== minAprData ||
    aprRange?.max !== maxAprData ||
    creditScore !== 0 ||
    ratingstar != null

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
        {businessmetaheadtag?.is_bank === 0 ? (
          <div className='list-none items-center flex gap-4 max-[1440px]:gap-2 !overflow-x-scroll !whitespace-nowrap scrollbar-hide list-t px-4 max-[1440px]:px-4 max-[1200px]:px-0 mx-auto pb-4 category-btn-scroll max-[479px]:pb-0'>
            {productlistdataSub?.product_list?.length > 0 && (
              <Image src={FilterIcon} className='w-6 h-6 lg:hidden' alt='filtericon' onClick={(e) => toggleModal(e)} />
            )}
            <div className='category-scroll-parent'>
              <div className='category-scroll-child'>
                {newDataCardProvider
                  .sort((a, b) => a - b)
                  ?.map((data, index) => {
                    return (
                      <div key={index}>
                        <CreditCardsRoundButton
                          name={data}
                          onClick={() => filterwithbank(data)}
                          className={
                            filterBankSub?.includes(data)
                              ? ' recommendation-category head-text font-[faktum] capitalize  '
                              : 'text-[#212529] head-text font-[faktum] border border-[#212529] bg-transparent xl:py-3  xl:px-4 md:py-3 md:px-4 sm:py-3 sm:px-4 px-4 py-3 text-[15px] max-[1440px]:text-[14px] rounded-[5px] hover:bg-[#844FCF] hover:border-[#844FCF] hover:text-white capitalize list-resolov-credit'
                          }
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        ) : (
          <div className='list-none items-center flex gap-4 max-[1440px]:gap-2 max-[1024px]:overflow-x-scroll max-[1024px]:whitespace-nowrap scrollbar-hide list-t px-4 max-[1440px]:px-4 max-[1200px]:px-0 mx-auto  pb-4 category-btn-scroll'>
            {productlistdataSub?.product_list?.length > 0 && (
              <Image src={FilterIcon} className='w-6 h-6 lg:hidden' alt='filtericon' onClick={(e) => toggleModal(e)} />
            )}
            <div className='category-scroll-parent'>
              <div id={'bank-cat'} className='category-scroll-child'>
                {sortedArray &&
                  sortedArray
                    ?.sort((a, b) => a - b)
                    .map((toplist, index) => {
                      return (
                        <div id={`${index}+'bank-round'++`} key={index}>
                          <CreditCardsRoundButton
                            name={toplist}
                            onClick={() => filterwelcomebenefits(toplist)}
                            className={
                              filterdata?.includes(toplist)
                                ? ' recommendation-category head-text font-[faktum] capitalize  '
                                : 'text-[#212529] head-text font-[faktum] border border-[#212529] bg-transparent xl:py-3  xl:px-4 md:py-3 md:px-4 sm:py-3 sm:px-4 px-4 py-3 text-[15px] max-[1440px]:text-[14px] rounded-[5px] hover:bg-[#844FCF] hover:border-[#844FCF] hover:text-white capitalize  list-resolov-credit'
                            }
                          />
                        </div>
                      )
                    })}
              </div>
            </div>
          </div>
        )}

        {filterdata && (
          <ul className='list-none flex gap-4  list-t  lg:hidden max-[1024px]:overflow-x-scroll max-[1024px]:whitespace-nowrap scrollbar-hide py-4'>
            {filterdata?.map((value, index) => {
              return (
                <div key={index}>
                  <li className='active inline-flex'>
                    <button className='bg-none cursor-pointer p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                      {value}
                      <Image
                        src={CloseIcon}
                        alt='image'
                        height={16}
                        width={16}
                        priority={true}
                        className='align-middle ml-2 w-[16px] h-[16px] '
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
                  <li className='active inline-flex'>
                    <button className='bg-none cursor-pointer p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                      {value1}
                      <Image
                        src={CloseIcon}
                        alt='image'
                        height={16}
                        width={16}
                        priority={true}
                        className='align-middle ml-2 w-[16px] h-[16px] '
                        onClick={() => Removehendler(index)}
                      />
                    </button>
                  </li>
                </div>
              )
            })}
            {cardNetworkCheck?.map((value1, index) => {
              return (
                <div key={index}>
                  <li className='active inline-flex'>
                    <button className='bg-none cursor-pointer p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                      {value1}
                      <Image
                        src={CloseIcon}
                        alt='image'
                        height={16}
                        width={16}
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
                  <div className='2xl:col-span-2 xl:col-span-2 md:col-span-2 bg-none '>
                    <div className='md:px-8 md:pt-8  p-5  shadow-md filter-credit w-full pb-4 bg-white'>
                      <div className='flex items-center gap-3'>
                        <button
                          type='button'
                          className='  text-[#212529] cursor-pointer rounded  mr-2'
                          style={{ color: 'red' }}
                          onClick={(e) => setModal(false)}>
                          <Image src={BackArrow} alt='img' className='  w-[30px] h-auto' />
                        </button>

                        <p className=' font-bold text-[18px] text-[#212529] uppercase'>Filters</p>
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
                      {productlistdataSub?.product_list?.length > 0 && (
                        <>
                          <div className='pt-4 loungeaccess-sec'>
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
                                        <div className=' font-light p-[8px] '>
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
                                                  step={0.3}
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
                                                    half={true}
                                                    value={ratingstar}
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
                                          <div className='h-14 overflow-y-scroll'>
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

                      {morecategoryleftfilter?.top_category?.length > 0 && (
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
                                        <p>
                                          <Link
                                            href={`/credit-cards/[key]`}
                                            as={`/credit-cards/${data?.url_slug}`}
                                            prefetch={false}
                                            className='text-[#212529] hover:text-[#212529] hover:!underline'>
                                            {data.title}
                                          </Link>
                                        </p>
                                      </div>
                                    )
                                  })}
                              </div>
                            )
                          })}
                        </div>
                      )}
                      {morecategoryleftfilter?.more_by_category?.length > 0 && (
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
                                        <p>
                                          <Link
                                            href={`/credit-cards/[key]`}
                                            as={`/credit-cards/${data?.url_slug}`}
                                            prefetch={false}
                                            className='text-[#212529] hover:text-[#212529] hover:!underline'>
                                            {data.title}
                                          </Link>
                                        </p>
                                      </div>
                                    )
                                  })}
                              </div>
                            )
                          })}
                        </div>
                      )}
                      {morecategoryleftfilter?.more_way_to_browse?.length > 0 && (
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
                                        <p>
                                          <Link
                                            href={`/credit-cards/[key]`}
                                            as={`/credit-cards/${data?.url_slug}`}
                                            prefetch={false}
                                            className='text-[#212529] hover:text-[#212529] hover:!underline'>
                                            {data.title}
                                          </Link>
                                        </p>
                                      </div>
                                    )
                                  })}
                              </div>
                            )
                          })}
                        </div>
                      )}
                      <div className='mt-4 mb-[6rem]'> {getMobileSortingOptions()}</div>
                    </div>
                  </div>
                </div>

                {(isChecked !== false ||
                  checkboxValues?.length !== 0 ||
                  joiningFeeRange?.min !== 0 ||
                  annualFeeRange?.min !== 0 ||
                  aprRange?.min !== 0 ||
                  creditScore !== minCreditScoreData ||
                  cardNetworkCheck?.length !== 0 ||
                  ratingstar != null) && (
                  <>
                    <div className='fixed  bottom-0 z-[9999] left-0 w-full py-4 px-5 bg-white grid grid-cols-2 justify-between items-center md:px-8 modal-sticky-clear'>
                      <button
                        onClick={clearallfunc}
                        className='text-[#212529] cursor-pointer font-bold text-[15px] text-left'>
                        Close
                      </button>
                      <button
                        onClick={(e) => {
                          setModal(false)
                        }}
                        className=' py-3 w-full lg:w-[160px] md:w-full cursor-pointer rounded-lg text-[#212529] bg-[#49D49D] max-[320px]:text-[14px]'>
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

        {comparemodal ? (
          <>
            {size?.width <= 991
              ? selectedData?.length == 2
              : selectedData?.length == 3 && (
                  <div
                    className='fixed z-50 bottom-0 w-full left-0 h-[16.5rem] max-[1200px]:h-[14rem] max-[991px]:h-[22rem] max-[1600px]:h-[17rem]  max-xl:h-auto max-lg:h-auto max-[576px]:h-auto  max-[575px]:h-auto bg-[#FFEBF2] add-modal  max-[767px]:bottom-[8%]'
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
                <div className=' 2xl:px-40 xl:px-30 xl:py-14 lg:px-20 md:px-14 p-4 py-8 max-[479px]:py-4'>
                  <div className='flex max-[1820px]:flex   justify-center gap-12 max-[1600px]:gap-4   max-xl:justify-center  items-center add-comapre-modal'>
                    <>
                      <div className='flex gap-7 max-[1200px]:flex-wrap  max-[991px]:flex-nowrap  max-[1200px]:gap-4 max-md:justify-between max-[576px]:justify-center add-comapre-card max-[320px]:gap-2'>
                        {selectedData.length <= 3 &&
                          selectedData.map((data, index) => {
                            return (
                              <div key={index}>
                                <div className=' rounded-lg  relative '>
                                  <div
                                    id={`${index}+'bank-img'++`}
                                    onClick={() => sendGAProductClick(data, index)}
                                    className='w-[140px] h-full max-[991px]:w-[110px] max-[576px]:w-[110px] max-[479px]:w-[80px]  compare-img-card'>
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
                                    <Image src={CloseIcon} alt='img' height={12} width={12} priority={true} className='  w-[12px] h-[12px]' />
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
                            className='  text-[#212529] rounded cursor-pointer  mr-2 max-[479px]:mr-0 text-[15px] font-semibold max-[479px]:text-[13px]'
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
          <div className='hidden lg:block'>
            <div className='grid 2xl:gap-8 2xl:grid-cols-5 xl:grid-cols-5  md:grid-cols-5 lg:grid-cols-5 gap-4 mt-6'>
              {productlistdataSub?.product_list?.length > 0 && (
                <div className='2xl:col-span-1 xl:col-span-1 md:col-span-1 bg-none  relative'>
                  <div
                    className={`xl:py-8  lg:py-4  border border-[#C2CACF] border-l-0 filter-credit sticky ${
                      morecategoryleftfilter?.more_way_to_browse?.length > 2
                        ? 'category-left-sticky'
                        : 'category-filter-left'
                    }`}>
                    <div className='flex items-center justify-between pb-2 xl:pr-[17px] lg:pr-4 md:pr-4'>
                      <p className='font-bold text-[18px] text-[#212529] uppercase'>Filters</p>
                      {showClearAll && (
                        <button onClick={clearallfunc} className='text-[#49D49D] cursor-pointer font-bold text-[15px]'>
                          Clear All
                        </button>
                      )}
                    </div>

                    {productlistdataSub?.product_list?.length > 0 && (
                      <>
                        <div className=' border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4 filter-scroll'>
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
                                      <div
                                        className={
                                          data.slug === 'rating'
                                            ? 'pb-0 pt-0 font-light '
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
                                                step={0.3}
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
                                      <div className='pb-3 pt-2 font-light   '>
                                        {/* <div className='h-14 overflow-y-scroll'> */}
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
                                                      checked={cardNetworkCheck.includes(data)}
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

                    {morecategoryleftfilter?.top_category?.length > 0 && (
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
                                        <p>
                                          <Link
                                            href={`/credit-cards/[key]`}
                                            as={`/credit-cards/${data?.url_slug}`}
                                            prefetch={false}
                                            className='text-[#212529] hover:text-[#212529] hover:!underline'>
                                            {data.title}
                                          </Link>
                                        </p>
                                      </div>
                                    )
                                  })}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {morecategoryleftfilter?.more_by_category?.length > 0 && (
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
                                        <p>
                                          <Link
                                            href={`/credit-cards/[key]`}
                                            as={`/credit-cards/${data?.url_slug}`}
                                            prefetch={false}
                                            className='text-[#212529] hover:text-[#212529] hover:!underline'>
                                            {data.title}
                                          </Link>
                                        </p>
                                      </div>
                                    )
                                  })}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {morecategoryleftfilter?.more_way_to_browse?.length > 0 && (
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
                                        <p>
                                          <Link
                                            href={`/credit-cards/[key]`}
                                            as={`/credit-cards/${data?.url_slug}`}
                                            prefetch={false}
                                            className='text-[#212529] hover:text-[#212529] hover:!underline'>
                                            {data.title}
                                          </Link>
                                        </p>
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
              )}

              <div
                className={
                  productlistdataSub?.product_list?.length == 0 || productlistdataSub?.product_list?.length == undefined
                    ? 'col-span-5 2xl:col-span-5 md:col-span-5 flex flex-col  '
                    : 'col-span-4 2xl:col-span-4 md:col-span-4 flex flex-col  '
                }>
                <div className='flex flex-row justify-between pb-[1rem] gap-x-0'>
                  {getBanksSelected()}
                  {getSortingOptionsPlp()}
                </div>
                {/* SELECTED BANKS OPTIONS HERE */}
                {filtedAfterData?.length > 0 ? (
                  <>
                    {(filtedAfterData?.length ? filtedAfterData : productlistdataSub?.product_list)
                      // ?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                      .map((alldata, index) => {
                        return (
                          <div key={index} ref={index === 0 ? firstDataRef : null}>
                            <div>
                              <div className=' py-[30px]  rounded-3xl bg-white filter-card-box duration-300 mb-5'>
                                <div className='flex max-[1024px]:justify-between px-[30px] '>
                                  <div className=''>
                                    <div
                                      id={`${index}+'bank-img'++`}
                                      onClick={() => sendGAProductClick(alldata, index)}
                                      className='xl:w-[240px] md:w-[180px] business-card-img'>
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
                                    <div className=' grid grid-cols-3 max-[1440px]:grid-cols-3'>
                                      <div className='col-span-2 max-[1440px]:col-span-2'>
                                        <div
                                          id={`${index}+'bank-name'++`}
                                          onClick={() => sendGAProductClick(alldata, index)}>
                                          <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                                            <h2 className='text-[18px] font-bold text-[#212529] leading-7 pb-2'>
                                              {alldata.card_name}
                                            </h2>
                                          </Link>
                                        </div>

                                        <span
                                          className='text-[14px] comparebox-card-text  pb-6 text-[#212529]'
                                          data-tooltip-target='tooltip-light'
                                          data-tooltip-style='light'
                                          data-te-toggle='tooltip'
                                          title={`${alldata?.welcome_benefits.replace(/["']/g, ' ')}`}>
                                          {alldata?.welcome_benefits.replace(/["']/g, ' ')}
                                        </span>

                                        <p className=' text-[13px] font-semibold text-[#212529] pt-6 max-[771px]:pt-2'>
                                          {alldata?.rating_based_text}
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

                                          {alldata?.rating === 0 ? (
                                            'NA'
                                          ) : (
                                            <div className='border rounded-full py-1 px-4 flex gap-2 items-center max-[320px]:px-2'>
                                              <p className='xl:text-[18px] md:text-[14px] font-semibold text-[#212529]'>
                                                {alldata?.rating}/5
                                              </p>
                                              {/* <ReactStars
                                                count={starCount}
                                                value={alldata?.rating}
                                                // onChange={ratingChanged}
                                                size={24}
                                                edit={false}
                                                color1={'#ccc'}
                                                color2={'#49d49d'}
                                              /> */}
                                              <StarRatings
                                                rating={alldata?.rating}
                                                starRatedColor='#49d49d'
                                                numberOfStars={starCount}
                                                name='rating'
                                                starDimension='24px'
                                                starSpacing='0'
                                              />
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      <div
                                        id={`${index}+'ba'+'bb'`}
                                        className='flex md:flex-col gap-4 lg:flex-col  items-end'>
                                        <ApplyNowButton
                                          data={alldata}
                                          userData={getdatauser}
                                          pos='21'
                                          position={index}
                                          category={`credit cards ${url_slug}`}
                                          disabled={alldata?.bank_name === "KOTAK MAHINDRA BANK"}
                                        />
                                        {filteredDataCard(alldata?.url_slug) == 'Eligible' ? (
                                             <button
                                             id={`${index}+'bank=bt'++`}
                                             className='flex items-center gap-2 justify-center cursor-pointer business-right-text  w-full lg:w-[160px] md:w-full  text-[#212529] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
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
                                            id={`${index}+'bank-btn'++`}
                                            onClick={() => {
                                              router.push(
                                                `/credit-cards/eligibility?eligible=${alldata?.url_slug.split('/')[2]}`
                                              )
                                              // token
                                              //   ? router.push(
                                              //       `/credit-cards/eligibility?eligible=${
                                              //         alldata?.url_slug.split('/')[2]
                                              //       }`
                                              //     )
                                              //   : router.push(`/credit-cards/eligibility/`)
                                            }}
                                            className=' business-right-text cursor-pointer py-3 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                                            {filteredDataCard(alldata?.url_slug)}
                                            {/* {ListingfilterData.checkelig} */}
                                          </button>
                                        )}

                                        {/* </Link> */}

                                        {/* <div className='custom-max-content'>
                                          <label className='block text-gray-500 font-bold flex max-[576px]:gap-1 items-center'>
                                            <input
                                              className='mr-2 leading-tight  w-[16px] h-[16px]'
                                              type='checkbox'
                                              id={alldata.product_id}
                                              // checked={selectedData?.includes(alldata)}
                                              checked={selectedData.some(
                                                (selectedItem) => selectedItem.product_id === alldata.product_id
                                              )}
                                              disabled={
                                                size?.width <= 991
                                                  ? selectedData.length >= 2 && !selectedData?.includes(alldata)
                                                  : selectedData.length >= 3 && !selectedData?.includes(alldata)
                                              }
                                              onChange={(e) => handlecompareModal(e, alldata)}
                                            />
                                            <p className='text-[15px] font-semibold  text-[#212529] business-right-text'>
                                              {ListingfilterData.compare}
                                            </p>
                                          </label>
                                        </div> */}
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
                                            {/* <span className='font-normal text-[12px] mt-[4px]'>
                                              *Applicable Taxes
                                            </span> */}
                                          </div>
                                        ) : (
                                          <div className='flex flex-col'>
                                            <span className='symbole-rupee'>₹ {alldata.annual_fee} /-</span>
                                            <span className='font-normal text-[12px] mt-[4px]'>
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
                                            {/* <span className='font-normal text-[12px] mt-[4px]'>
                                              *Applicable Taxes
                                            </span> */}
                                          </div>
                                        ) : (
                                          <div className='flex flex-col'>
                                            <span className='symbole-rupee'>₹ {alldata.joining_fee} /-</span>
                                            <span className='font-normal text-[12px] mt-[4px]'>
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
                                          {alldata?.min_credit_score && alldata?.max_credit_score && (
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
                                      {alldata?.min_credit_score !== null && alldata?.max_credit_score !== null && (
                                        <div onClick={() => clickPromotion(index)}>
                                          <Link
                                            href='/cibil-credit-score-check'
                                            className='text-[15px] pt-3  !underline text-[#5a5add] hover:!text-[#5a5add]'
                                            prefetch={false}>
                                            Check free credit score
                                          </Link>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className='grid grid-cols-2 pt-4 gap-4 px-6 items-center'>
                                <div className='custom-max-content'>
                                          <label className='block text-gray-500 font-bold flex max-[576px]:gap-1 items-center'>
                                            <input
                                              className='mr-2 leading-tight  w-[16px] h-[16px]'
                                              type='checkbox'
                                              id={alldata.product_id}
                                              // checked={selectedData?.includes(alldata)}
                                              checked={selectedData.some(
                                                (selectedItem) => selectedItem.product_id === alldata.product_id
                                              )}
                                              disabled={
                                                size?.width <= 991
                                                  ? selectedData.length >= 2 && !selectedData?.includes(alldata)
                                                  : selectedData.length >= 3 && !selectedData?.includes(alldata)
                                              }
                                              onChange={(e) => handlecompareModal(e, alldata)}
                                            />
                                            <p className='text-[15px] font-semibold  text-[#212529] business-right-text'>
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
                            // items={filtedAfterData?.length}
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
                    btnActive='Go Back'
                    btnTransparent='Reset Filter'
                    btnActiveLink='/credit-cards'
                    btnTransparentLink='/'
                    btn={true}
                    subTitle='Kindly reset filters or Go back to Previous page'
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`grid 2xl:grid-cols-4 xl:mt-8  xl:grid-cols-3 xl:gap-4 lg:grid-cols-3 lg:gap-2 ${
              filtedAfterData?.length > 0 ? 'md:grid-cols-2' : 'md:grid-cols-1'
            } md:mt-0 grid-cols-1 md:gap-8 sm:mt-4  sm:gap-[30px] gap-4 mt-4 lg:px-16 lg:hidden max-[479px]:mt-0 max-[479px]:gap-[30px]`}>
            {/* mobile */}
            {filtedAfterData?.length > 0 ? (
              <>
                {listCondition?.map((alldata, index) => {
                  return (
                    <div
                      key={index}
                      ref={index === filtedAfterData?.length - 1 ? lastChildRef : index === 0 ? firstDataRef : null}>
                      <div className='pt-6 bg-white  rounded-2xl   h-full  filter-card-box duration-300'>
                        <div className='px-4 pb-4'>
                        {size.width <= 576 && filteredDataCard(alldata?.url_slug) == 'Eligible' && (
                              <button
                              id={`${index}+'bank-gg'++`}
                              className='flex items-center gap-2 justify-end cursor-pointer business-right-text  w-full lg:w-[160px] md:w-full  text-[#212529] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                              {filteredDataCard(alldata?.url_slug)}
                              <Image
                                src={successBgIcon}
                                alt='img'
                                width={20}
                                height={20}
                                className=''
                              />
                            </button>
                          ) }
                        </div>
                        <div className='flex gap-3 !px-6 max-[768px]:!px-4 max-[280px]:!px-2'>
                          <div className=''>
                            <div
                              id={`${index}+'bank-img'++`}
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
                                <div id={`${index}+'bank-title'++`} onClick={() => sendGAProductClick(alldata, index)}>
                                  <Link
                                    href={`/${alldata?.url_slug}`}
                                    prefetch={false}
                                    className='text-[#212529] hover:!text-[#212529] '>
                                    <h2
                                      className='text-[20px] whitespace-nowrap overflow-ellipsis overflow-hidden max-[425px]:text-[15px] font-bold pb-2 max-[991px]:text-[18px] text-[#212529] leading-7 pb-2'
                                      data-tooltip-target='tooltip-light'
                                      data-tooltip-style='light'
                                      data-te-toggle='tooltip'
                                      title={`${alldata?.card_name.replace(/["']/g, ' ')}`}>
                                      {alldata.card_name}
                                    </h2>
                                  </Link>
                                </div>
                                <span
                                  className='text-[14px] comparebox-card-text pb-3 text-[#212529]'
                                  data-tooltip-target='tooltip-light'
                                  data-tooltip-style='light'
                                  data-te-toggle='tooltip'
                                  title={`${alldata?.welcome_benefits.replace(/["']/g, ' ')}`}>
                                  {alldata?.welcome_benefits.replace(/["']/g, ' ')}
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

                                  {alldata?.rating === 0 ? (
                                    'NA'
                                  ) : (
                                    <div className='border rounded-full py-1 px-4 flex gap-2 items-center  max-[771px]:px-2 max-[360px]:gap-1'>
                                      <p className='xl:text-[18px] md:text-[14px] font-semibold max-[479px]:text-[14px] text-[15px] text-[#212529] max-[375px]:text-[11px]'>
                                        {alldata?.rating}/5
                                      </p>
                                      <div className=''>
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
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          id={`${index}+'bank-btn'++`}
                          className='flex max-[576px]:flex-col items-center gap-4 my-6 px-4 max-[280px]:!px-2 listing-apply'>
                          <ApplyNowButton
                            data={alldata}
                            userData={getdatauser}
                            pos='22'
                            position={index}
                            category={`credit cards ${url_slug}`}
                            className="max-[771px]:text-[13px]"
                            disabled={alldata?.bank_name === "KOTAK MAHINDRA BANK"}
                          />

                          {size.width >= 576 && filteredDataCard(alldata?.url_slug) == 'Eligible' && (
                              <button
                              id={`${index}+'bank-gg'++`}
                              className='flex items-center gap-2 justify-center cursor-pointer business-right-text max-[771px]:text-[13px] w-full lg:w-[160px] md:w-full  text-[#212529] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
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
                          
                          {filteredDataCard(alldata?.url_slug) !== 'Eligible' && (
                            <button
                              id={`${index}+'bank-bt'++`}
                              onClick={() => {
                                router.push(`/credit-cards/eligibility?eligible=${alldata?.url_slug.split('/')[2]}`)
                                // token
                                //   ? router.push(`/credit-cards/eligibility?eligible=${alldata?.url_slug.split('/')[2]}`)
                                //   : router.push(`/credit-cards/eligibility/`)
                              }}
                              className=' business-right-text cursor-pointer py-3 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                              {filteredDataCard(alldata?.url_slug)}
                            </button>
                          )}
                          {/* </Link> */}
                        </div>
                        {/* <div className='py-5 px-4 border-b max-[280px]:!px-2 '>
                          <label className='block text-gray-500 font-bold flex max-[576px]:gap-1 justify-center items-center'>
                            <input
                              className='mr-2 leading-tight  w-[16px] h-[16px]'
                              type='checkbox'
                              id={alldata.product_id}
                              disabled={
                                size?.width <= 991
                                  ? selectedData.length >= 2 && !selectedData?.includes(alldata)
                                  : selectedData.length >= 3 && !selectedData?.includes(alldata)
                              }
                              checked={selectedData.some(
                                (selectedItem) => selectedItem.product_id === alldata.product_id
                              )}
                              onChange={(e) => handlecompareModal(e, alldata)}
                            />
                            <p className='text-[15px] font-semibold  text-[#212529] '>{ListingfilterData.compare} </p>
                          </label>
                        </div> */}

                        <div className='pb-5 border-b text-[#212529] max-[280px]:!px-2 grid grid-cols-2'>
                          <div className='py-6 px-4 border border-[gray-100] border-l-0 border-t-0 text-[#212529]'>
                            <p className='text-[13px] font-normal'>{ListingfilterData.fees}</p>
                            {alldata.annual_fee == 0 ? (
                              <div className='flex flex-col'>
                                <p className='text-[15px] font-semibold pt-1'>Free</p>
                                {/* <span className='font-normal text-[12px] mt-[4px]'>*Applicable Taxes</span> */}
                              </div>
                            ) : (
                              <div className='flex flex-col'>
                                <p className='text-[15px] font-semibold pt-1 symbole-rupee'>
                                  ₹ {alldata.annual_fee} /-
                                </p>
                                <span className='font-normal text-[12px] mt-[4px]'>*Applicable Taxes</span>
                              </div>
                            )}
                          </div>
                          <div className='px-4 py-6 border border-[gray-100] border-l-0 border-t-0 border-r-0 text-[#212529]'>
                            <p className='text-[13px] font-normal'>{ListingfilterData.joiningfees}</p>
                            {alldata.joining_fee == 0 ? (
                              <div className='flex flex-col'>
                                <p className='text-[15px] font-semibold pt-1'>Free</p>
                                {/* <span className='font-normal text-[12px] mt-[4px]'>*Applicable Taxes</span> */}
                              </div>
                            ) : (
                              <div className='flex flex-col'>
                                <p className='text-[15px] font-semibold pt-1 symbole-rupee'>
                                  ₹ {alldata.joining_fee} /-
                                </p>
                                <span className='font-normal text-[12px] mt-[4px]'>*Applicable Taxes</span>
                              </div>
                            )}
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
                                {alldata?.min_credit_score && alldata?.max_credit_score && (
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
                                      likelihood of approval for various financial applications, but it does not provide
                                      an absolute guarantee.
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            {alldata?.min_credit_score !== null && alldata?.max_credit_score !== null && (
                              <div onClick={() => clickPromotion(index)}>
                                <Link
                                  href='/cibil-credit-score-check'
                                  className='text-[15px] pt-3  !underline text-[#5a5add] hover:!text-[#5a5add]'
                                  prefetch={false}>
                                  Check free credit score
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className='grid grid-cols-2 py-4 gap-4 px-4 items-center'>
                        <div className='custom-max-content'>
                          <label className='block text-gray-500 font-bold flex max-[576px]:gap-1 items-center'>
                            <input
                              className='mr-2 leading-tight  w-[16px] h-[16px]'
                              type='checkbox'
                              id={alldata.product_id}
                              disabled={
                                size?.width <= 991
                                  ? selectedData.length >= 2 && !selectedData?.includes(alldata)
                                  : selectedData.length >= 3 && !selectedData?.includes(alldata)
                              }
                              checked={selectedData.some(
                                (selectedItem) => selectedItem.product_id === alldata.product_id
                              )}
                              onChange={(e) => handlecompareModal(e, alldata)}
                            />
                            <p className='text-[15px] font-semibold  text-[#212529] max-[771px]:text-[14px]  max-[320px]:text-[12px]'>{ListingfilterData.compare} </p>
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
                  )
                })}
                {size.width > 576 && size.width <= 992 && showData && totalItems > 10 && (
                  <div className={`relative top-[107%] ${filtedAfterData?.length > 1 ? 'left-10' : ''}`}>
                    <div className='flex flex-end mt-1 absolute right-0 top-0 font-bold'>
                      <PaginationData
                        showData={showData}
                        // items={listCondition?.length}
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

export default ListingFilterSubData
