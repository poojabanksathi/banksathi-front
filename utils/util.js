import toast from 'react-hot-toast'
import { ApiMessage } from './alljsonfile/apimessage'
import moment from 'moment'

const HOSTNAME = process.env.NEXT_PUBLIC_WEBSITE_URL

export const ImageBaseUrl = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

export const isSalaried = 'salaried'
export const isSelfEmployed = 'self-employed'
export const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/
export const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
export const mobileNumberRegex = /^[1-9]\d{6,14}$/

export const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

export const getRandomColor = () => {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
export const getDeviceIdCookie = (cookies) => {
  for (let i = 0; i < cookies?.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(`${'deviceId'}=`)) {
      return cookie.substring('deviceId'.length + 1)
    }
  }
  return null
}
const getInitials = (name) => {
  let initials
  const nameSplit = name.split(' ')
  const nameLength = nameSplit.length
  if (nameLength > 1) {
    initials = nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1)
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1)
  } else return

  return initials.toUpperCase()
}

export const createImageFromInitials = (size, name, color) => {
  if (name == null) return
  name = getInitials(name)

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = canvas.height = size

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, size, size)

  context.fillStyle = `${color}50`
  context.fillRect(0, 0, size, size)

  context.fillStyle = color
  context.textBaseline = 'middle'
  context.textAlign = 'center'
  context.font = `${size / 2}px Roboto`
  context.fillText(name, size / 2, size / 2)

  return canvas.toDataURL()
}

export const handleRemoveLocalstorage = () => {
  localStorage.clear()
  localStorage.removeItem('token')
  localStorage.removeItem('leadprofileid')
  localStorage.removeItem('registerdevicedata')
  localStorage.removeItem('ShowButton')
  localStorage.removeItem('transaction_id')
  localStorage.removeItem('auth_type')
  localStorage.removeItem('istempotp')
  localStorage.removeItem('cibilOtp')
  localStorage.removeItem('auth_Otp')
  localStorage.removeItem('userName')
  localStorage.removeItem('@alternatdata')
  localStorage.removeItem('@eligibleproduct')
  localStorage.removeItem('uerySlug')
  localStorage.removeItem('LeadMobile')
  localStorage.removeItem('ValidPan')
  localStorage.removeItem('panName')
  localStorage.removeItem('@inputSlug')
  localStorage.removeItem('UserLeadID')
  localStorage.removeItem('@pan_status')
  localStorage.removeItem('loglevel')
  localStorage.removeItem('user_full_name')
  localStorage.removeItem('user_email')
  localStorage.removeItem('user_mobile')
  localStorage.removeItem('user_dob')
  localStorage.removeItem('user_pan_no')
  localStorage.removeItem('user_is_pan_verified')
  localStorage.removeItem('user_pan_gender')
  localStorage.removeItem('user_occupation')
  localStorage.removeItem('user_company_name')
  localStorage.removeItem('user_monthly_salary')
  localStorage.removeItem('user_itr_amount')
  localStorage.removeItem('user_city')
  localStorage.removeItem('user_address')
  localStorage.removeItem('user_pin_code')
  localStorage.removeItem('user_pin_code_id')
  localStorage.removeItem('user_eligible_product')
  localStorage.removeItem('is_verify_lead')
  localStorage.removeItem('eligibleProducts')
  localStorage.removeItem('userData')
  localStorage.removeItem('h')
  localStorage.removeItem('savingCalUrl')
  localStorage.removeItem('listData')
  localStorage.removeItem('offersCount')
}

export const removeNonAlphaNumeric = (e) => {
  return e?.target?.value.replace(/[^A-Za-z ]+/g, '')
}
export const removeDuplicates = (arr) => {
  let unique = []
  arr?.length > 0 &&
    arr?.forEach((element) => {
      if (!unique?.includes(element)) {
        unique?.push(element)
      }
    })
  return unique
}
export const capitalizeFirstLetter = (string) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1)
}
export const errorHandling = (error) => {
  if (error?.response?.data?.message == 'failed') {
    toast.error(error?.response?.data?.reason)
  } else if (error?.response?.status === 422) {
    toast.error(error?.response?.data?.detail[0]?.msg)
    if (error?.response?.data?.message?.fullName) {
      toast.error(error?.response?.data?.message?.fullName[0])
    }
    if (error?.response?.data?.message?.panNo) {
      toast.error(error?.response?.data?.message?.panNo[0])
    }
  } else if (error?.response?.status == 500) {
    toast.error(ApiMessage?.internalServerError)
  }
}

export const getLink = (url) => {
  return `https://${HOSTNAME}${url}`
}

export const token = typeof window !== 'undefined' && localStorage?.getItem('token')
export const leadId = typeof window !== 'undefined' && localStorage?.getItem('leadprofileid')
export const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')

export const setHash = (h) => {
  if (typeof window !== 'undefined') {
    return localStorage.setItem('h', h)
  }
}
export const getHash = () => {
  if (typeof window !== 'undefined') {
    const h = localStorage.getItem('h')
    return h
  }
}
export const checkIfHasAllMandatoryFields = (params) => {
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
export const sendEventToGTM = (data) => {
  if (typeof window !== 'undefined' && window?.dataLayer) {
    window.dataLayer.push({ ecommerce: null })
    window.dataLayer.push(data)
  }
}

export const ScrollToTop = (ref1, isMobile) => {
  const ref = ref1
  if (ref?.current && isMobile) {
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
export const ScrollToTop2 = (data) => {
  const ref = data?.ref
  if (ref?.current && data?.isMobile) {
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
export const getFormattedDate = (date) => {
  const targetYear = date[2]
  const targetMonth = date[1] - 1
  const targetDay = date[0]
  const targetDate = new Date(targetYear, targetMonth, targetDay)
  return targetDate
}
export const getPromotionObject = (data) => {
  const promotionObj = {
    event: data?.eventName,
    ecommerce: {
      creative_name: data?.route,
      creative_slot: data?.position,
      promotion_id: data?.title,
      promotion_name: data?.title,
      items: [
        {
          item_id: data?.title,
          item_name: data?.title,
          affiliation: '',
          coupon: '',
          discount: '',
          index: '',
          item_brand: '',
          item_category: '',
          item_category2: '',
          item_category3: '',
          item_category4: '',
          item_category5: '',
          item_list_id: '',
          item_list_name: '',
          item_variant: '',
          location_id: '',
          price: 0,
          quantity: 1
        }
      ]
    }
  }
  return promotionObj
}

export const CheckUserData = (userObject) => {
  const dob = userObject?.dob || ''
  const pin = userObject?.pin_code || ''
  const gender = userObject?.gender || ''
  const email = userObject?.email || ''
  const monthSalary = userObject?.monthly_salary || ''
  const itrAmt = userObject?.itr_amount || ''
  const companyName = userObject?.company_name || ''
  const occupation = userObject?.occupation || ''

  const itrAmtMonth = (monthSalary !== '' && monthSalary !== '0') || (itrAmt !== '' && itrAmt !== '0')

  const companyAndOccupation = companyName !== '' && occupation !== ''
  const others = dob !== '' && pin !== '' && gender !== '' && email !== ''

  if (itrAmtMonth && companyAndOccupation && others) {
    return true
  } else false
}
export const getKeyValueInfo = (list, key) => {
  const array = []
  list?.length > 0 &&
    list?.map((item) => {
      if (item?.[key]) {
        array.push(item[key])
      }
    })
  return array
}
export const checkIfAllElementsAreSame = (arr) => {
  if (arr?.length === 0) {
    return true
  } else return arr?.every((element) => element === arr[0])
}
export const scrollIntoSection = (pathname, key, ref) => {
  if (pathname?.includes(key) && ref?.current) {
    ref?.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }
}
export const getFilteredValueForRanges = (list, obj, listKey, arrKey) => {
  return list?.filter((item) => item?.[listKey] >= obj?.[arrKey])
}
export const getCompareTitle = (obj1, obj2, obj3, title) => {
  if (obj1?.product_details?.card_name && obj2?.product_details?.card_name && obj3?.product_details?.card_name) {
    return `${obj1?.product_details?.card_name} vs ${obj2?.product_details?.card_name} vs ${obj3?.product_details?.card_name}`
  } else if (obj1?.product_details?.card_name && obj2?.product_details?.card_name) {
    return `${obj1?.product_details?.card_name} vs ${obj2?.product_details?.card_name}`
  } else if (obj1?.product_details?.card_name) {
    return `${obj1?.product_details?.card_name}`
  } else return `Compare ${title}`
}
export const getMatchPathUrl = (urlPath) => {
  const regex = /\/([^/]+)$/
  const matches = regex.exec(urlPath)
  if (matches && matches.length > 1) {
    const extractedString = matches[1]
    return extractedString
  }
}
export const formatInYearsAndMonths = (months) => {
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (years === 0) {
    return `${remainingMonths} months`
  } else return `${years} years and ${remainingMonths} months`
}
export const addRatingJsonLd = (productDetailsData, ratingData, offerKey) => {
  const formattedRatingDate = moment(productDetailsData?.product_details?.published_time)?.format('DD-MM-YYYY')
  const ratingValue =
    ratingData?.over_all_rating && ratingData?.over_all_rating !== 0 ? ratingData?.over_all_rating : '5'
  const ratingCount = ratingData?.total_reviews && ratingData?.total_reviews !== 0 ? ratingData?.total_reviews : '1'
  const price = productDetailsData?.product_details?.[offerKey]

  const reviewJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: productDetailsData?.product_details?.card_name || ''
    },
    author: {
      '@type': 'Person',
      name: productDetailsData?.product_details?.publisher_name
    },
    datePublished: formattedRatingDate || '',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: productDetailsData?.product_details?.rating || '5',
      bestRating: '5'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue,
      bestRating: '5',
      ratingCount: ratingCount
    },
    offers: {
      '@type': 'Offer',
      price: price, //joining fee
      priceCurrency: 'INR'
    },
    reviewBody: productDetailsData?.product_details?.rating_details || ''
  }
  const jsonLdString = JSON.stringify(reviewJsonLd)

  return {
    __html: jsonLdString
  }
}

export const formatDateInString = (date) => {
  if (date) {
    const year = date?.slice(0, 4)
    const month = date?.slice(4, 6)
    const day = date?.slice(6, date?.length)
    const formatted = `${day}-${month}-${year}`
    return formatted
  }
}
export const lowToHighSort = (list, key) => {
  return list?.sort((a, b) => a?.[key] - b?.[key])
}
export const highToLowSort = (list, key) => {
  return list?.sort((b, a) => b?.[key] - a?.[key])
}
export const getSortKeyCreditCards = (name) => {
  const annualFee = 'Annual Fee'
  const creditScore = 'Credit Score'
  const rating = 'Rating'

  let sortKey
  switch (name) {
    case rating:
      sortKey = 'rating'
      break
    case annualFee:
      sortKey = 'annual_fee'
      break
    case creditScore:
      sortKey = 'min_credit_score'
      break
    default:
      break
  }
  return sortKey
}
export const getSortKeyPersonalLoan = (name) => {
  const creditScore = 'Credit Score'
  const rating = 'Rating'
  let sortKey = ''
  switch (name) {
    case creditScore:
      sortKey = 'min_cibil_required'
      break
    case rating:
      sortKey = 'rating'
    default:
      break
  }
  return sortKey
}
export const getSortKeyBankAccounts = (name) => {
  const minimumBalToOpen = 'Minimum Balance to Open Account'
  const interestRate = 'Interest Rate'
  const minimumMonthlyBal = 'Minimum Monthly Balance'
  let sortKey = ''
  switch (name) {
    case minimumBalToOpen:
      sortKey = 'min_bal_to_open_ac'
      break
    case interestRate:
      sortKey = 'rate_of_interest'
      break
    case minimumMonthlyBal:
      sortKey = 'avg_mon_bal'
      break
    default:
      break
  }
  return sortKey
}
export const lowToHigh = ' Low to High'

export const isZeroNumber = (number) => {
  if (!isNaN(parseFloat(number)) && number !== 0) {
    if (number == '0000000000') {
      return true
    } else return false
  }
}
export const starCount = 5

export const commonMinMaxInputRangeFilter = (value, list, minKey, maxKey) => {
  const filter = list?.filter((item) => {
    return value >= item?.[minKey] && value <= item?.[maxKey]
  })
  return filter
}
export const getEmojiImageAndText = (customerRating) => {
  let image = ''
  let text = ''
  if (customerRating) {
    switch (customerRating) {
      case 0:
      case 0.5:
        image = '/assets/good.svg'
        text = 'okay'
        break
      case 1:
      case 1.5:
        image = '/assets/very-sad.svg'
        text = 'Very Bad!'
        break
      case 2:
      case 2.5:
        image = '/assets/satisfied.svg'
        text = 'Satisfied!'
        break
      case 3:
      case 3.5:
        image = '/assets/good.svg'
        text = 'Good!'
        break
      case 4:
      case 4.5:
        image = '/assets/very-good.svg'
        text = 'Very Good!'
        break
      case 5:
        image = '/assets/amazing.svg'
        text = 'Amazing!'
        break
      default:
        break
    }
    return { image, text }
  }
}
export const getInterestRate = (min, max) => {
  if (max && min) return `${min} - ${max}%`
  if (min && !max) return `${min}%`
  if (max && !min) return `${max}%`
  if (!min && !max) return 'NA'
}
export const getLoanAmount = (min, max) => {
  if (max && min) return `₹${min} - ₹${max}`
  if (min && !max) return `₹${min}`
  if (max && !min) return `₹${max}`
  if (!min && !max) return 'NA'
}
export const getLoanTenure = (min, max) => {
  if (max && min) return `${min} - ${max} months`
  if (min && !max) return `${min} month`
  if (max && !min) return `${max} month`
  if (!min && !max) return 'NA'
}
export const isDateWithinLast30Days = (currentScore) => {
  const oldDateStr = currentScore?.credit_history[0]?.time
  if (oldDateStr) {
    const targetDateParts = oldDateStr?.split('-')
    const targetYear = parseInt(targetDateParts[2], 10)
    const targetMonth = parseInt(targetDateParts[1], 10) - 1
    const targetDay = parseInt(targetDateParts[0], 10)
    const targetDate = new Date(targetYear, targetMonth, targetDay)
    const currentDate = new Date()
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(currentDate.getDate() - 30)
    return targetDate >= thirtyDaysAgo && targetDate <= currentDate
  } else {
    return false
  }
}
export const formatUnixTimestamp = (timestampexp) => {
  const formatTimeexp = (time) => {
    return time < 10 ? '0' + time : time
  }
  const dateObj = new Date(timestampexp * 1000)
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()
  const seconds = dateObj.getSeconds()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedDate = `${month}/${day}/${year}, ${formatTimeexp(hours)}:${formatTimeexp(minutes)}:${formatTimeexp(
    seconds
  )} ${ampm}`
  return formattedDate
}
export const getBlogDetailsBreadCrumb = (url) => {
  const splitArray = url?.split('-')
  const upperCase = splitArray?.map((item) => {
    return item?.charAt(0)?.toUpperCase() + item?.slice(1)
  })
  const breadCrumSlug = upperCase?.join(' ')
  return breadCrumSlug
}
