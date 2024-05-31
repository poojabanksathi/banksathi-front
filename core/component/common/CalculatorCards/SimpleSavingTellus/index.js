import React, { useEffect } from 'react'
import InputRange from 'react-input-range'
import { useState } from 'react'
import Input from '@/core/commonInsideComponent/Input'
import { BASE_URL, COMMON, BUSINESSCATEGORY } from '@/utils/alljsonfile/service'
import axios from 'axios'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const ParagraphBanner = dynamic(() => import('@/core/component/Layout/CategoryParagraphBanner'), {
  ssr: false
})
function SimpleSavingTellUs({ metaData }) {
  const router = useRouter()

  const [responseData, setResponseData] = useState([])
  const [expenses, setExpenses] = useState([
    { Title: 'Online Shopping', name: 'online_shopping', maxValue: 1000000, principle: 0 },
    { Title: 'Dining', name: 'dining', maxValue: 500000, principle: 0 },
    { Title: 'Travel', name: 'travel', maxValue: 500000, principle: 0 },

    { Title: 'Fuel', name: 'fuel', maxValue: 500000, principle: 0 },
    { Title: 'Entertainment', name: 'entertainment', maxValue: 500000, principle: 0 },

    { Title: 'Inernational', name: 'international', maxValue: 1000000, principle: 0 }
  ])
  const [paramData, setParamData] = useState({})
  const [productListData, setProductListData] = useState()

  const handleInputChange = (name, index, value, maxValue) => {
    const newValue = value ? parseInt(value) : 0
    const updatedExpenses = [...expenses]
    updatedExpenses[index].principle = newValue
    setExpenses(updatedExpenses)
    setParamData({ ...paramData, [name]: newValue })
  }

  const getUrlSlug = () => {
    const updatedParamData = { ...paramData }
    expenses.forEach((expense) => {
      if (typeof updatedParamData[expense.name] === 'undefined') {
        updatedParamData[expense.name] = 0
      }
    })

    axios
      .post(BASE_URL + COMMON?.recommendProductSavingCal, updatedParamData)
      .then((response) => {
        setResponseData(response?.data?.data)
        localStorage.setItem('savingCalUrl', JSON.stringify(response?.data?.data))
      })
      .catch((error) => {
        console.error('Error fetching common data:', error)
      })
  }

  // Handle the "Calculate" button click
  const handleCalculateClick = () => {
    getUrlSlug()
    router.push('/credit-cards/saving-calculator/result')
  }

  const getProductsList = () => {
    const param = {
      lang_id: 1,
      business_category_url_slug: 'credit-cards'
    }
    axios
      .post(BASE_URL + BUSINESSCATEGORY?.productListCategory, param)
      .then((response) => {
        setProductListData(response?.data)
      })
      .catch((error) => {
        console.error('Error fetching common data:', error)
      })
  }

  const slugUrlArray = responseData?.map((item) => item?.url_slug)
  let filteredArray = []

  const getFilteredData = () => {
    productListData?.product_list?.forEach((value) => {
      const slug = value?.url_slug?.split('/')?.[2]
      if (slugUrlArray?.includes(slug)) {
        filteredArray?.push(value)
      }
    })
    return filteredArray
  }

  const checkIfAnyOneSelected = () => {
    if (expenses && expenses?.length > 0) {
      const list = expenses?.filter((item) => item?.principle !== 0)
      if (list?.length > 0) {
        return false
      } else return true
    } else return true
  }

  useEffect(() => {
    getProductsList()
    typeof window !== 'undefined' && localStorage.setItem('savingSlugUrlArr', slugUrlArray)
  }, [])

  const filteredData = getFilteredData()
  const disable = checkIfAnyOneSelected()
  
  return (
    <>
      <div className='container h-full  mx-auto max-[991px]:max-w-full py-[30px] max-[834px]:py-[25px] max-[576px]:py-[35px] max-[479px]:py-[10px] max-[1024px]:px-8 max-[576px]:px-4 '>
        <div className=' px-20 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-0 max-[576px]:gap-4 max-[479px]:px-0 '>
          <div className='grid grid-cols-2 gap-[30px] max-[1024px]:grid-cols-1 max-[479px]:grid-cols-1'>
            <div className='flex flex-col'>
              <h1 className='sm:text-[28px] px-2 max-sm:text-[24px] max-xs:text-[18px] font-semibold  text-[#212529] sm:leading-[45px] max-sm:leading-[33px]  font-[poppins]'>
                Credit Card Saving Calculator to boost your Savings
              </h1>
              <div className=''>
                <ParagraphBanner metaResponseBanner={metaData} />
              </div>
            </div>

            <div className='loan-calculator-bg bg-white px-[82px] py-[50px] rounded-3xl max-[479px]:px-5'>
              {expenses?.map((expense, index) => (
                <>
                  <div className='flex items-center justify-between mt-5 mb-2'>
                    <div>
                      <h3 className='text-[15px] text-[#212529] font-semibold'>{expense?.Title}</h3>
                    </div>
                    <div className='bg-[#F4F8FB] w-[200px] max-sm:w-[130px] flex justify-center gap-[26px] px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
                      <span className='symbole-rupee text-right pl-[15px]'>₹</span>
                      <Input
                        className='m-0 w-full bg-[#F4F8FB] text-right outline-none symbole-rupee'
                        name={expense?.name}
                        max={50000}
                        onChange={(e) => handleInputChange(expense?.name, index, e.target.value, expense?.maxValue)}
                        value={`${expense?.principle}`}
                      />
                    </div>
                  </div>
                  <div className='mt-[16px]'>
                    <InputRange
                      minValue={0}
                      maxValue={expense?.maxValue}
                      name={expense?.name}
                      value={`${expense?.principle}`}
                      onChange={(value) => handleInputChange(expense?.name, index, value, expense?.maxValue)}
                    />
                  </div>
                </>
              ))}
              <div className='text-center mt-10'>
                <button
                  type='submit'
                  disabled={disable}
                  onClick={handleCalculateClick}
                  className={`${
                    disable ? ' bg-[#E6ECF1]' : ''
                  } bg-[#49D49D] cursor-pointer text-[#212529] rounded-lg w-[180px] h-[56px]`}>
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SimpleSavingTellUs
