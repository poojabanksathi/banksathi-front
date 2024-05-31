import React, { useEffect, useState } from 'react'
import RecommendationStepper from '../../common/RecommendationStepper/RecommendationStepper'
import { removeNonAlphaNumeric } from '@/utils/util'
import { useWindowSize } from '@/hooks/useWindowSize'
import CreditScoreCard from '../CreditNews/CreditScoreCard/CreditScoreCard'
import CreditScoreDesktop from '../../common/CommonList/CreditScoreDesktop/CreditScoreDesktop'
import backArrow from '../../../../public/assets/back-arrow.svg'
import Image from 'next/image'
import { mockCreditScoreRange } from '@/utils/alljsonfile/recommendation'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const RecommendationJourney = ({ topMenuCategories, creditCardsList }) => {
  const [stepper, setStepper] = useState(1)
  const [formData, setFormData] = useState(null)
  const [selectedRange, setSelectedRange] = useState(null)
  const [selectedOfferIds, setSelectedOfferIds] = useState([])
  const [monthlyError, setMonthlyError] = useState(false)
  const [offersArray, setOffersArray] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [selfEmployed, setSelfEmployed] = useState(false)
  const [employed, setEmployed] = useState(false)

  const size = useWindowSize()
  const router = useRouter()

  const isDesktop = size?.width > 768
  const incomeRegex = /^\d+(\.\d+)?$/

  const getTitle = () => {
    if (stepper === 1) return "Share a few details, We'll craft magic!"
    if (stepper === 2) return 'Your Employment Status'
    if (stepper === 3) return 'Your Annual Income'
    if (stepper === 4) return 'Your Credit Score'
    if (stepper === 5) return 'Your Desired Offers'
  }

  // -------------------------------------------------------FORMS----------------------------------------------------------------//
  // NAMES
  const getNameForm = () => {
    const first = userInfo?.full_name ? userInfo?.full_name?.split(' ')?.[0] : null
    const lastOrMiddle = userInfo?.full_name ? userInfo?.full_name?.split(' ')?.pop() : null

    const disable = (!formData?.firstName && !first) || (!formData?.lastName && !lastOrMiddle)

    const handleNameSubmit = () => {
      if ((formData?.firstName || first) && (formData?.lastName || lastOrMiddle)) {
        setFormData({ ...formData, firstName: first, lastName: lastOrMiddle })
        setStepper(2)
      }
    }

    return (
      <>
        <div className='grid grid-cols-2 gap-[20px] max-[1200px]:!grid-cols-2 max-sm:!grid-cols-1'>
          <div className=''>
            <label className='text-[13px] font-normal text-[#212529]' htmlFor='email'>
              First Name
            </label>
            <input
              className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
              id='full_name'
              name='full_name'
              type='text'
              pattern='[A-Za-z]+'
              onChange={(e) => {
                setFormData({ ...formData, firstName: e?.target?.value })
              }}
              defaultValue={formData?.firstName || first}
              onInput={(e) => {
                e.target.value = removeNonAlphaNumeric(e)
              }}
              placeholder='First Name'
            />
          </div>
          <div className=''>
            <label className='text-[13px] font-normal text-[#212529]' htmlFor='email'>
              Last Name
            </label>
            <input
              className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
              id='lastName'
              name='lastName'
              type='text'
              pattern='[A-Za-z]+'
              onChange={(e) => {
                setFormData({ ...formData, lastName: e?.target?.value })
              }}
              defaultValue={formData?.lastName || lastOrMiddle}
              onInput={(e) => {
                e.target.value = removeNonAlphaNumeric(e)
              }}
              placeholder='Last Name'
            />
          </div>
        </div>
        <CommonButton title='Next' handleSubmit={handleNameSubmit} disable={disable} />
      </>
    )
  }

  // EMPLOYMENT STATUS
  const getEmploymentStatus = () => {
    const employment = formData?.employment || userInfo?.occupation

    const handleClick = (title) => {
      if (title === 'Employed') {
        setEmployed(true)
        setSelfEmployed(false)
      } else {
        setSelfEmployed(true)
        setEmployed(false)
      }
      setFormData({ ...formData, employment: title })
    }
    const handleEmployment = () => {
      if (formData?.employment !== '' || userInfo?.occupation !== ' ') {
        setFormData({ ...formData, employment: employment })
        setStepper(3)
      }
    }

    const disable = !formData?.employment && !userInfo?.occupation

    return (
      <>
        <div className='flex flex-row gap-[20px] items-center justify-center'>
          <div
            onClick={() => handleClick('Employed')}
            className={`cursor-pointer w-[250px] max-sm:w-[147px] py-[14px] bg-[#F4F8FB rounded-lg borderjustify-center items-center gap-2.5 ${
              employed
                ? 'border border-violet-400 bg-[#E9DFF6] font-semibold'
                : 'border font-normal border-neutral-300 bg-[#F4F8FB]'
            }
            `}>
            <div className="text-center text-neutral-800 text-[15px] max-sm:text-[12px]  max-sm:leading-[18px]font-['Poppins'] leading-[18px]">
              Employed
            </div>
          </div>
          <div
            onClick={() => handleClick('Self-Employed')}
            className={`cursor-pointer w-[250px] max-sm:w-[147px] py-[14px] rounded-lg border justify-center items-center gap-2.5 ${
              selfEmployed
                ? 'border border-violet-400 bg-[#E9DFF6] font-semibold'
                : 'border font-normal border-neutral-300 bg-[#F4F8FB]'
            }
              `}>
            <div className="text-center text-neutral-800 text-[15px] max-sm:text-[12px]  max-sm:leading-[18px]font-['Poppins'] leading-[18px]">
              Self-Employed
            </div>
          </div>
        </div>
        <CommonButton title='Next' handleSubmit={handleEmployment} disable={disable} />
      </>
    )
  }

  // ANNUAL OR ITR AMOUNT
  const getMonthlyOrItrAmount = () => {
    const userMonthly = userInfo?.monthly_salary !== 0 ? userInfo?.monthly_salary : null
    const userItr = userInfo?.itr_amount !== 0 ? userInfo?.itr_amount : null

    const monthly = formData?.monthlySalary || userMonthly
    const itrAmount = formData?.itrAmount || userItr

    const handleAnnualAmt = () => {
      if (employed && monthly) {
        setFormData({ ...formData, monthlySalary: monthly })
        setStepper(4)
      } else if (selfEmployed && itrAmount) {
        setFormData({ ...formData, itrAmount: itrAmount })
        setStepper(4)
      }
    }
    const isValidIncome = (input) => {
      const extracIncome = input?.replace(/\D/g, '')
      if (extracIncome?.length === 6) {
        setMonthlyError(false)
      } else if (extracIncome?.length > 6) {
        setMonthlyError(true)
      }
      return incomeRegex?.test(input)
    }
    const disable =
      (employed && !formData?.monthlySalary && !userInfo?.monthly_salary) ||
      (selfEmployed && !formData?.itrAmount && !userInfo?.itr_amount)

    return (
      <>
        {employed ? (
          <>
            <div className='grid grid-cols-1'>
              <label className='text-[13px] font-normal text-[#212529] ' htmlFor='income'>
                Monthly Salary
              </label>
              <input
                pattern="^(?!(?:we won't accept|\d+(\.\d+)?$)).*$"
                className='shadow border rounded-lg w-[520px] max-sm:w-[280px] py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                id='monthlySalary'
                name='monthlySalary'
                value={Math.floor(formData?.monthlySalary) === 0 ? '' : monthly}
                onChange={(e) => {
                  isValidIncome(e?.target?.value)
                  setFormData({ ...formData, monthlySalary: e?.target?.value })
                }}
                type='number'
                step='1'
                placeholder='Enter monthly income'
                max={4000000}
              />
              {monthlyError && (
                <p className='text-[12px] text-[#FF000F] font-no'>
                  Please enter the Income less than or equal to 4000000
                </p>
              )}
            </div>
          </>
        ) : (
          <div className='grid grid-cols-1'>
            <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='name'>
              ITR (amount)
            </label>
            <input
              className='shadow border rounded-lg w-[520px] max-sm:w-[280px] py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
              id='itr_amount'
              name='itr_amount'
              type='number'
              pattern="^(?!(?:we won't accept|\d+(\.\d+)?$)).*$"
              required
              placeholder='Enter your ITR (amount)'
              value={itrAmount !== 0 ? itrAmount : ''}
              onChange={(e) => {
                setFormData({ ...formData, itrAmount: e?.target?.value })
              }}
            />
          </div>
        )}
        <CommonButton title='Next' handleSubmit={handleAnnualAmt} disable={disable} />
      </>
    )
  }

  // CREDIT SCORE RANGE
  const getCreditScoreRange = () => {
    const handleClick = (item) => {
      setSelectedRange(item?.id)
      setFormData({ ...formData, minimumVal: item?.range?.split('-')?.[0], maximumVal: item?.range?.split('-')?.[1] })
    }
    const handleRange = () => {
      setStepper(5)
    }
    const disable = !selectedRange || selectedRange === '0'

    return (
      <>
        <div className='flex flex-row gap-[20px] items-center justify-center max-sm:grid max-sm:grid-cols-2 max-sm:px-6'>
          {mockCreditScoreRange?.map((item) => {
            return (
              <div
                key={item?.id}
                onClick={() => handleClick(item)}
                className={`cursor-pointer w-[115px] py-[14px] bg-[#F4F8FB rounded-lg border justify-center items-center gap-2.5 ${
                  item?.id === selectedRange
                    ? 'border border-violet-400 bg-[#E9DFF6]'
                    : 'border border-neutral-300 bg-[#F4F8FB]'
                }
    `}>
                <div className="text-center text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[18px]">
                  {item?.range}
                </div>
              </div>
            )
          })}
        </div>
        <div>
          {/* {isDesktop ? (
            <CreditScoreDesktop sizeData={{ width: 'w-[40vw]', imgW: '80', imgH: '74' }} isCreditRange={true} />
          ) : (
            <div className='px-4'>
              <CreditScoreCard />
            </div>
          )} */}
        </div>
        <CommonButton title='Next' handleSubmit={handleRange} disable={disable} />
      </>
    )
  }

  // -----------SUBMIT BUTTON ----------//
  const list = creditCardsList?.product_list

  const getFilteredProductsList = () => {
    const { minimumVal, maximumVal } = formData
    if (minimumVal && maximumVal && offersArray?.length > 0 && (formData?.itrAmount || formData?.monthlySalary)) {
      const rangeFilter = list?.filter((item) => {
        return item?.min_credit_score >= minimumVal && item?.max_credit_score <= maximumVal
      })
      let filteredArray2 = []
      if (rangeFilter) {
        if (employed) {
          filteredArray2 = rangeFilter?.filter((item) => {
            return Number(item?.salary) <= Number(formData?.monthlySalary)
          })
        } else
          filteredArray2 = rangeFilter?.filter((item) => {
            return Number(item?.itr) <= Number(formData?.itrAmount)
          })
      }
      const finalArray = []
      offersArray?.map((element) => {
        filteredArray2?.length > 0 &&
          filteredArray2?.filter((item) => {
            if (item?.welcome_benefits?.includes(element)) {
              return finalArray?.push(item)
            }
          })
      })
      return finalArray?.length > 0 ? finalArray : filteredArray2
    }
  }

  const handleSubmit = () => {
    if (formData && Object.keys?.(formData)?.length > 0) {
      const list = getFilteredProductsList()
      if (list?.length > 0) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('formData', JSON.stringify(formData))
          localStorage.setItem('listData', JSON.stringify(list))
        }
        router.push('/credit-cards/recommendation/result')
      } else {
        toast.error("Sorry! Couldn't find the result. Please Try again.")
        setStepper(1)
        setFormData(null)
        setSelectedOfferIds([])
        setSelectedRange(null)
      }
    }
  }

  // OFFERS
  const getDesiredOffers = () => {
    const handleOffersData = (id, title) => {
      // for names
      if (offersArray?.includes(title)) {
        setOffersArray(offersArray?.filter((item) => item !== title))
      } else setOffersArray((prevName) => [...prevName, title])

      // for Ids
      if (selectedOfferIds?.includes(id)) {
        setSelectedOfferIds(selectedOfferIds?.filter((item) => item !== id))
      } else setSelectedOfferIds((prevId) => [...prevId, id])
    }
    // set in localstorage
    if (offersArray?.length > 0) {
      const offersArrayList = offersArray?.toString()?.split(',')?.join(', ')
      typeof window !== 'undefined' && localStorage.setItem('subCategories', offersArrayList)
    }
    const disable = selectedOfferIds?.length === 0

    return (
      <>
        <div className='grid grid-cols-3 gap-[18px] max-sm:grid-cols-2'>
          {topMenuCategories?.category_info?.map((item, index) => {
            return (
              <div
                key={item?.sort_order}
                className={`px-[30px] max-sm:px-[15px] py-[14px] cursor-pointer border w-auto rounded-lg flex justify-center items-center gap-2.5${
                  selectedOfferIds?.includes(item?.sort_order)
                    ? 'border border-violet-400 bg-[#E9DFF6]'
                    : 'border border-neutral-300 bg-[#F4F8FB]'
                }`}
                onClick={() => {
                  // setOffersArray(removeDuplicates([...offersArray, item]))
                  handleOffersData(item?.sort_order, item?.title)
                }}>
                <div className={"text-center text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-[18px]"}>
                  {item?.title}
                </div>
              </div>
            )
          })}
        </div>
        <div className='mb-4'>
          <CommonButton title='Submit' handleSubmit={handleSubmit} disable={disable} />
        </div>
      </>
    )
  }
  const onBackBtn = () => {
    if (formData?.employment === 'Employed') {
      setEmployed(true)
      setSelfEmployed(false)
    } else {
      setSelfEmployed(true)
      setEmployed(false)
    }
    setStepper(stepper - 1)
  }

  useEffect(() => {
    const userData = typeof window !== 'undefined' && localStorage.getItem('userData')
    const infoObj = userData && JSON.parse(userData)
    if (infoObj) {
      setUserInfo(infoObj)
    }
    // EMPLOYMENT INFO
    const employed = formData?.employment === 'Employed' || infoObj?.occupation?.toLowerCase() === 'salaried'
    employed && setEmployed(true)
    const selfEmployed =
      formData?.employment === 'Self-Employed' || infoObj?.occupation?.toLowerCase() === 'self-employed'
    selfEmployed && setSelfEmployed(true)

    // Remove localstorageData
    if (localStorage.getItem('listData')) {
      localStorage.removeItem('listData')
    }
    if (localStorage.getItem('subCategories')) {
      localStorage.removeItem('subCategories')
    }
  }, [])

  return (
    <>
      <div className='bg-[#F4F8FB] container mx-auto px-14 max-[1024px]:px-8'>
        <div className='bg-[#FFFFFF] mt-[20px] pt-[25px] h-auto w-full rounded-3xl'>
          <div className='flex flex-row items-center justify-center'>
            {stepper > 1 && (
              <div className='relative lg:right-[28%] right-[8%]' onClick={() => onBackBtn()}>
                <Image src={backArrow} width={40} height={40} alt='back arrow' />
              </div>
            )}
            <RecommendationStepper stepper={stepper} setStepper={setStepper} />
          </div>
          <div className='flex flex-col justify-center items-center gap-0 !gap-y-0 mb-0'>
            <h1 className=" mt-[25px] text-center text-neutral-800 text-[28px] font-semibold font-['Faktum'] leading-[43.20px] max-sm:text-[22px] max-sm:leading-relaxed">
              Best financial Products in a blink!
            </h1>
            <h2 className=" mt-[10px] text-center text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-[18px]">
              Personalized offers from top credit cards in seconds
            </h2>
            <div className="mt-[30px] max-sm:mt-[30px] text-center text-neutral-800 text-[16px] font-medium font-['Poppins'] max-sm:text-[15px]">
              {getTitle()}
            </div>
            <div className='mt-[10px]'>{stepper === 1 && getNameForm()}</div>
            <div className='mt-[10px]'>{stepper === 2 && getEmploymentStatus()}</div>
            <div className='mt-[8px]'>{stepper === 3 && getMonthlyOrItrAmount()}</div>
            <div className=''>{stepper === 4 && getCreditScoreRange()}</div>
            <div className=''>{stepper === 5 && getDesiredOffers()}</div>
          </div>
        </div>
      </div>
      {/* {stepper !== 4 && ( */}
      <div className='h-auto container px-14 mx-auto bg-[#F4F8FB] max-[1024px]:px-8 max-[991px]:max-w-full pb-[35px] max-[576px]:pb-[50px] max-[479px]:px-4 max-[479px]:530px] max-[375px]:px-4 max-[320px]:px-4'>
        {isDesktop ? <CreditScoreDesktop isCreditRange={false} /> : <CreditScoreCard />}
      </div>
      {/* )} */}
    </>
  )
}

export default RecommendationJourney

// NEXT BUTTON COMMON
export const CommonButton = ({ title, handleSubmit, disable }) => {
  return (
    <div className='mt-[30px] mb-2 max-sm:mb-4 text-left w-full h-[48px] flex items-center justify-center'>
      <button
        type='submit'
        disabled={disable}
        onClick={() => {
          handleSubmit()
        }}
        className={
          disable
            ? 'text-[15px] w-[200px] items-center cursor-pointer text-black font-medium max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[12px]  bg-[#E6ECF1] rounded-lg max-[771px]:px-3 max-sm:w-full mx-4'
            : 'text-[15px] w-[200px] items-center cursor-pointer text-black font-medium max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[12px]  bg-[#49D49D] rounded-lg max-[771px]:px-3 max-sm:w-full mx-4'
        }>
        {title}
      </button>
    </div>
  )
}
