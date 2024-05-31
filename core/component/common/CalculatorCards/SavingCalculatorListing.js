import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactStars from 'react-stars'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useRouter } from 'next/router'
import ApplyNowButton from '../ApplyNowButton/ApplyNowButton'
import { getPromotionObject, sendEventToGTM } from '@/utils/util'
import accordionArrowall from '../../../../public/assets/accordion-down.svg'
import StarRatings from 'react-star-ratings'

const SavingCalculatorListing = ({ productURlAPiData }) => {
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const starCount = 5
  const size = useWindowSize()
  const router = useRouter()

  const [fieldValue, setFieldValue] = useState()
  //saving calculator

  const [SelectIndex, setSelectIndex] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [accordianAnual, setAccordianAnual] = useState([])
  const [selectAccordion, setSelectAccordion] = useState(null)
  const [openAccordions, setOpenAccordions] = useState([])

  const recommendApiData = typeof window !== 'undefined' && localStorage.getItem('savingCalUrl')
  const recommendData = recommendApiData && JSON.parse(recommendApiData)

  const handleClick = (index) => {
    setIsActive(!isActive)
    if (SelectIndex?.includes(index)) {
      const updateValue = SelectIndex.indexOf(index)
      SelectIndex.splice(updateValue, 1)
      setSelectIndex(SelectIndex)
      setAccordianAnual(null)

      setSelectAccordion(index)
    } else {
      setSelectIndex([...SelectIndex, index])
      setAccordianAnual([]) // Close the other accordion
      setSelectAccordion(index)
    }
    setSelectAccordion(index)
  }
  const handleClickAnual = (index) => {
    setIsActive(!isActive)
    if (accordianAnual?.includes(index)) {
      const updateValue = accordianAnual.indexOf(index)
      accordianAnual.splice(updateValue, 1)
      setAccordianAnual(accordianAnual)
      setSelectIndex([])

      setSelectAccordion(null)
    } else {
      //   setAccordianAnual([...accordianAnual, index])

      setAccordianAnual([index])

      setSelectIndex([]) // Close the other accordion
      setSelectAccordion(index)
    }
    setSelectAccordion(index)
  }
  // MONTHLY FEATURES
  const getSaveMonthlyFeatures = (alldata) => {
    return (
      <ul className='bg-white w-full h-auto shadow-md rounded-md p-2  z-80'>
        <li className='flex items-center py-1 justify-between px-4 text-[12px]'>
          <p className='m-0 text-[black] font-semibold'>Online Shopping</p>
          <p className='m-0 text-[black] font-semibold'>₹ {(alldata?.online_shopping / 12).toFixed(2)}</p>
        </li>
        <li className='flex items-center py-1 justify-between px-4 text-[12px]'>
          <p className='m-0 text-[black] font-semibold'>Dining</p>
          <p className='m-0 text-[black] font-semibold'>₹ {(alldata?.dining / 12).toFixed(2)}</p>
        </li>
        <li className='flex items-center py-1 justify-between px-4 text-[12px]'>
          <p className='m-0 text-[black] font-semibold'>Fuel</p>
          <p className='m-0 text-[black] font-semibold'>₹ {(alldata?.fuel / 12).toFixed(2)}</p>
        </li>
        <li className='flex items-center py-1 justify-between px-4 text-[12px]'>
          <p className='m-0 text-[black] font-semibold'>Entertainment</p>
          <p className='m-0 text-[black] font-semibold'>₹ {(alldata?.entertainment / 12).toFixed(2)}</p>
        </li>
        <li className='flex items-center py-1 justify-between px-4 text-[12px]'>
          <p className='m-0 text-[black] font-semibold'>International</p>
          <p className='m-0 text-[black] font-semibold'>₹ {(alldata?.international / 12).toFixed(2)}</p>
        </li>
        <li className='flex items-center py-1 justify-between px-4 text-[12px]'>
          <p className='m-0 text-[black] font-semibold'>Travel</p>
          <p className='m-0 text-[black] font-semibold'>₹ {(alldata?.travel / 12).toFixed(2)}</p>
        </li>
      </ul>
    )
  }
  // .................... ADDITIONAL FEATURES COMP ............... //
  const getAdditionalFeaturesComp = (index, item) => {
    // ACCORDION OPEN CLOSE
    const handleAdditionalFeatureClick = (index) => {
      const isOpen = openAccordions?.includes(index)
      setOpenAccordions((prevOpenAccordions) =>
        isOpen ? prevOpenAccordions.filter((openIndex) => openIndex !== index) : [...prevOpenAccordions, index]
      )
    }
    return (
      <div id='accordionExample' data-active-classes='bg-none' data-inactive-classes='text-[#212529]' className=''>
        <div className={`relative bg-white  duration-300 px-6 py-[7px] border-[gray-100] border-b-0 rounded-2xl`}>
          <h3 id='accordion-flush-heading-1  '>
            <button
              id={`${'index'}+'bank-btn'`}
              type='button'
              onClick={() => handleAdditionalFeatureClick(index)}
              className='text-[#212529] gap-[16px] list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center max-sm:justify-between w-full text-left'
              data-accordion-target='#accordion-flush-body-1'
              aria-expanded='true'
              aria-controls='accordion-flush-body-1'>
              Additional Features
              {openAccordions?.includes(index) ? (
                <Image
                  src={accordionArrowall}
                  alt='down'
                  width={24}
                  height={24}
                  priority={true}
                  className='rotate-180 w-6 h-6 shrink-0'
                />
              ) : (
                <Image src={accordionArrowall} alt='down' width={24} height={24} priority={true} className='w-6 h-6 shrink-0' />
              )}
            </button>
          </h3>
          {openAccordions?.includes(index) && (
            <div aria-labelledby='accordion-flush-heading-1'>
              <div className='grid grid-cols-3 py-4 gap-8 px-6 max-[771px]:grid-cols-2 '>MAP</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  //end
  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')
  const userData = localUserData && JSON.parse(localUserData)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')
      const utm_details = refererUrl?.split('?')?.[1]

      setFieldValue(utm_details)
    }
  }, [])

  const slugUrl = recommendData?.map((item) => item?.url_slug)
  const filteredData = useMemo(() => {
    const filteredArray = productURlAPiData?.product_list.filter((value) => {
      const slug = value?.url_slug?.split('/')[2]
      return slugUrl?.includes(slug)
    })

    // Include total_saving in the filtered data
    const resultArray = filteredArray?.map((item) => {
      const matchingRecommendation = recommendData.find(
        (recommendation) => recommendation.url_slug === item.url_slug.split('/')[2]
      )
      if (matchingRecommendation) {
        return {
          ...item,
          ...matchingRecommendation,
          full_url_slug: item.url_slug
        }
      }
      return item
    })
    const sortedResultArray = resultArray?.sort((a, b) => (b.total_saving || 0) - (a.total_saving || 0))

    return sortedResultArray
  }, [slugUrl, productURlAPiData])

  const pageRoute = router?.asPath
  const clickPromotion = (index) => {
    const data = { eventName: 'select_promotion', title: 'Check free credit score', position: index, route: pageRoute }
    sendEventToGTM(getPromotionObject(data))
  }

  return (
    <div className='container  mx-auto px-20 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-10 max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4 h-auto  pt-[12px] pb-[20px] justify-around max-[576px]:py-[50px] max-[479px]:py-[10px] max-[479px]:h-auto'>
      {filteredData?.length > 0 && (
        <h1 className='text-[29px] md:text-[24px] my-2  max-sm:text-[18px] leading-[28.8px] md:leading-[34px] text-[#212529] px-2 font-semibold font-[poppins] '>
          Explore cards based on your expenses
        </h1>
      )}
      {filteredData?.map((alldata, index) => {
        const monthlySavings = (alldata?.total_saving / 12).toFixed(2)
        const isSavingsOpen = accordianAnual?.includes(index) && selectAccordion == index
        return (
          <>
            <div
              key={index}
              className='container border border-[#E6ECF1] mx-auto mt-[20px] pt-[30px] rounded-2xl bg-white filter-card-box duration-300 mb-5'>
              <div className={`flex px-[30px] max-[576px]:px-0 gap-4 relative h-auto ${isSavingsOpen ? 'h-full' : ''}`}>
                <div className=''>
                  <div className='xl:w-[240px] md:w-[180px] business-card-img sm:px-0'>
                    <Link href={`/${alldata?.full_url_slug}`} prefetch={false}>
                      <Image
                        src={`${Img_URL}/${alldata?.product_image}`}
                        alt='card image'
                        width={122}
                        height={76}
                        className='xl:w-full md:w-full max-sm:pl-[5px] '
                        unoptimized={true}
                      />
                    </Link>
                  </div>
                </div>
                <div className='px-4  xl:w-[100%] md:pr-0 md:px-[30px] max-[576px]:px-[0px]'>
                  <div className=' grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 max-[567px]:grid-cols-1'>
                    <div className='max-[768px]:col-span-2 max-[768px]:max-[1440px]:col-span-2 max-[768px]:gap-6'>
                      {alldata?.title && (
                        <Link href={`/${alldata?.full_url_slug}`} prefetch={false}>
                          <h2 className='text-[18px] font-bold text-[#212529] leading-7 pb-2'>{alldata?.title}</h2>
                        </Link>
                      )}
                      {alldata?.card_name && (
                        <Link href={`/${alldata?.full_url_slug}`} prefetch={false}>
                          <h2 className='text-[18px] font-bold text-[#212529] leading-7 pb-2'>{alldata?.card_name}</h2>
                        </Link>
                      )}

                      <span
                        className='text-[14px] comparebox-card-text  pb-6 text-[#212529]'
                        data-tooltip-target='tooltip-light'
                        data-tooltip-style='light'
                        data-te-toggle='tooltip'
                        title={`${alldata?.welcome_benefits?.replace(/["']/g, ' ')}`}>
                        {alldata?.welcome_benefits?.replace(/["']/g, ' ')}
                      </span>

                      <p className=' text-[13px] font-semibold text-[#212529] pt-3 max-[771px]:pt-2'>
                        {ListingfilterData.ratingtitle}
                      </p>

                      <div className='flex items-center gap-4 max-[576px]:gap-1 mt-3 max-[576px]:mt-2'>
                        <div className='border rounded-full '>
                          <Image
                            src={ListingfilterData.logoimg}
                            alt='img'
                            width={45}
                            height={50}
                            className=' border rounded-full p-2 w-[42px] h-[42px] border-[#e5e7eb] max-sm:h-[35px] max-sm:w-[36px] max-[375px]:w-[30px] max-[375px]:h-[30px]'
                          />
                        </div>

                        <div className='border rounded-full py-1 px-[7px] flex gap-2 items-center max-[1440px]:px-4 max-[1440px]:py-2  max-[320px]:px-2'>
                          <p className='xl:text-[18px] md:text-[14px] max-sm:text-[12px] font-semibold text-[#212529]'>
                            {alldata?.rating}/5
                          </p>
                          <StarRatings
                            rating={alldata?.rating}
                            starRatedColor='#49d49d'
                            numberOfStars={starCount}
                            name='rating'
                            starDimension={size?.width <= 576 ? "16px" : size?.width >= 764 ? '22px' : "12px"}
                            starSpacing='0'
                          />
                        </div>
                      </div>
                    </div>

                    {size?.width >= 768 && (
                      <div
                        id='save-aply-btn'
                        className='flex lg:col-span-2 md:flex-col gap-4 lg:flex-col  items-end absolute right-8'>
                        <ApplyNowButton data={alldata} userData={userData} pos='2' position={index}  disabled={alldata?.bank_name === "KOTAK MAHINDRA BANK"} />
                        <Link href={`/${alldata?.full_url_slug}`} prefetch={false}>
                          <button
                            key={alldata.id}
                            className='text-[#212529] px-4 cursor-pointer business-right-text py-3 w-full lg:w-[160px] md:w-full rounded-lg border border-[#000]  font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                            Explore Card
                          </button>
                        </Link>
                      </div>
                    )}
                    {size?.width >= 1024 && (
                      <div className='text-[#212529] max-sm:col-span-2 max-sm:hidden xl:px-4'>
                        <div className='mb-2 relative px-[10px] z-[30]'>
                          <button
                            onClick={() => {
                              // handleClick(index)
                            }}
                            className='text-[15px] text-black font-["Poppins"] font-normal'>
                            Monthly Savings - <span className='font-["Faktum"]'>₹{monthlySavings}</span>
                          </button>

                          {/* {SelectIndex?.includes(index) && selectAccordion == index && ( */}
                          {/* {getSaveMonthlyFeatures(alldata)} */}
                          {/* )} */}
                        </div>
                        <div className='my-1 relative px-[10px] z-[10]'>
                          <button
                            onClick={() => handleClickAnual(index)}
                            className='text-[15px] text-black font-["Poppins"] font-normal'>
                            {/* className='w-[260px] cursor-pointer  px-1 flex font-medium py-[5px] justify-center items-center md:h-auto  max-sm:h-[37px] gap-5 max-sm:gap-3 max-sm:text-[11px] rounded-lg  bg-[#DEF7ED] text-[15px]  text-[#212529]'> */}
                            Anuual Savings - <span className='font-["Faktum"]'>₹{alldata?.total_saving}</span>
                            {/* <Image
                              src={'/assets/accordion-down.svg'}
                              width={20}
                              height={20}
                              alt='down-arrow'
                              className={accordianAnual?.includes(index) ? 'rotate-180' : 'rotate-0'}
                            /> */}
                          </button>
                          {accordianAnual?.includes(index) && selectAccordion == index ? (
                            <ul className='bg-white w-[260px] h-auto shadow-xl rounded-md p-2'>
                              <li className='flex items-center py-1 justify-between text-[12px]'>
                                <p className='m-0 text-[black] font-semibold'>Online Shopping</p>
                                <p className='m-0 text-[black] font-semibold'>₹ {alldata?.online_shopping}</p>
                              </li>
                              <li className='flex items-center py-1 justify-between text-[12px]'>
                                <p className='m-0 text-[black] font-semibold'>Dining</p>
                                <p className='m-0 text-[black] font-semibold'>₹ {alldata?.dining}</p>
                              </li>
                              <li className='flex items-center py-1 justify-between text-[12px]'>
                                <p className='m-0 text-[black] font-semibold'>Fuel</p>
                                <p className='m-0 text-[black] font-semibold'>₹ {alldata?.fuel}</p>
                              </li>
                              <li className='flex items-center py-1 justify-between text-[12px]'>
                                <p className='m-0 text-[black] font-semibold'>Entertainment</p>
                                <p className='m-0 text-[black] font-semibold'>₹ {alldata?.entertainment}</p>
                              </li>
                              <li className='flex items-center py-1 justify-between text-[12px]'>
                                <p className='m-0 text-[black] font-semibold'>International</p>
                                <p className='m-0 text-[black] font-semibold'>₹ {alldata?.international}</p>
                              </li>
                              <li className='flex items-center py-1 justify-between text-[12px]'>
                                <p className='m-0 text-[black] font-semibold'>Travel</p>
                                <p className='m-0 text-[black] font-semibold'>₹ {alldata?.travel}</p>
                              </li>
                            </ul>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* BELOW IS SEPARATE ROW CREATED FOR EXPANDEDABLE DETAILS OF ANNUAL AND MONTHLY SAVINGS */}
              {size?.width >= 1024 && (
                <>
                  <div className='grid grid-cols-2 mt-[24px]'>
                    <div className='border border-[gray-100]  border-b-0 border-l-0 px-6 py-4 text-[#212529]'>
                      <div className='text-[13px] text-center text-black  font-normal'>
                        Save Monthly Upto <span className=''>₹{monthlySavings}</span>
                      </div>
                      <div className='mt-2 grid grid-cols-2 gap-12 xl:px-12 lg:px-2'>
                        <div className='mt-2 xl:w-[200px] lg:w-[180px]'>
                          <li className='flex items-center py-1 justify-between px-4 text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Online Shopping</p>
                            <p className='m-0 text-[black] font-semibold'>
                              ₹ {(alldata?.online_shopping / 12).toFixed(2)}
                            </p>
                          </li>
                          <li className='flex items-center py-1 justify-between px-4 text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Dining</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {(alldata?.dining / 12).toFixed(2)}</p>
                          </li>
                          <li className='flex items-center py-1 justify-between px-4 text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Fuel</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {(alldata?.fuel / 12).toFixed(2)}</p>
                          </li>
                        </div>
                        <div className='mt-2 w-[200px]'>
                          <li className='flex items-center py-1 justify-between px-4 text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Entertainment</p>
                            <p className='m-0 text-[black] font-semibold'>
                              ₹ {(alldata?.entertainment / 12).toFixed(2)}
                            </p>
                          </li>
                          <li className='flex items-center py-1 justify-between px-4 text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>International</p>
                            <p className='m-0 text-[black] font-semibold'>
                              ₹ {(alldata?.international / 12).toFixed(2)}
                            </p>
                          </li>
                          <li className='flex items-center py-1 justify-between px-4 text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Travel</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {(alldata?.travel / 12).toFixed(2)}</p>
                          </li>
                        </div>
                      </div>
                    </div>
                    <div className='border border-[gray-100]  border-b-0 border-l-0  px-6 py-4 text-[#212529]'>
                      <div className='text-[13px] text-center text-black  font-normal'>
                        Save Annually Upto <span className=''>₹{alldata?.total_saving}</span>
                      </div>
                      <div className='mt-2 grid grid-cols-2 gap-12 xl:px-12 lg:px-2'>
                        <div className='mt-2 w-[200px]'>
                          <li className='flex items-center py-1 justify-between text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Online Shopping</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {alldata?.online_shopping}</p>
                          </li>
                          <li className='flex items-center py-1 justify-between text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Dining</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {alldata?.dining}</p>
                          </li>
                          <li className='flex items-center py-1 justify-between text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Fuel</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {alldata?.fuel}</p>
                          </li>
                        </div>
                        <div className='mt-2 w-[200px]'>
                          <li className='flex items-center py-1 justify-between text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Entertainment</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {alldata?.entertainment}</p>
                          </li>
                          <li className='flex items-center py-1 justify-between text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>International</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {alldata?.international}</p>
                          </li>
                          <li className='flex items-center py-1 justify-between text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Travel</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {alldata?.travel}</p>
                          </li>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {size?.width < 768 && (
                <>
                  <div className='flex flex-col gap-4 lg:flex-col mx-[15px]  items-end mt-4'>
                    <button
                      key={alldata.id}
                      onClick={() => handleApplyNow(alldata)}
                      className='text-[#212529] cursor-pointer business-right-text py-3 w-full lg:w-[160px] md:w-full rounded-lg  bg-[#49D49D] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                      {ListingfilterData.apllynow}
                    </button>

                    <Link
                      href={`/${alldata?.full_url_slug}`}
                      prefetch={false}
                      className='cursor-pointer text-center business-right-text py-3 w-full lg:w-[160px] md:w-full rounded-lg border border-[#000]'>
                      <button
                        key={alldata.id}
                        className='text-[#212529]  font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                        Explore Card
                      </button>
                    </Link>
                  </div>
                </>
              )}
              <div className='mt-4 lg:mt-0'>
                <div
                  className={`grid lg:grid-cols-3 max-[768px]:grid-cols-2 gap-0 pt-4 lg:pt-0 ${
                    size?.width === 768 ? 'grid-cols-2 ' : ''
                  }`}>
                  <div className='border border-[gray-100] border-l-0 p-6 text-[#212529]'>
                    <p className='text-[13px] font-normal '>{ListingfilterData.fees}</p>
                    <p className='text-[15px] font-semibold pt-1'>
                      {alldata.annual_fee == 0 ? (
                        <span className='font-semibold'>Free</span>
                      ) : (
                        <span className='symbole-rupee'>₹ {alldata.annual_fee} /-</span>
                      )}
                    </p>
                  </div>
                  <div className='border border-[gray-100] border-l-0 p-6 text-[#212529]'>
                    <p className='text-[13px] font-normal'>{ListingfilterData.joiningfees}</p>
                    <p className='text-[15px] font-semibold pt-1'>
                      {alldata.joining_fee == 0 ? (
                        <span className='font-semibold'>Free</span>
                      ) : (
                        <span className='symbole-rupee'>₹ {alldata.joining_fee} /-</span>
                      )}
                    </p>
                  </div>
                  <div className='border border-[gray-100] border-l-0  p-6 text-[#212529] max-sm:col-span-2'>
                    <>
                      <p className='text-[13px] font-normal'>{ListingfilterData?.recommended}</p>
                      <div className='flex items-center gap-2'>
                        <>
                          {alldata?.min_credit_score && (
                            <p className='text-[15px] font-semibold pt-1'>{alldata?.min_credit_score}</p>
                          )}
                        </>
                        <div className='tooltip'>
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
                        </div>
                      </div>
                    </>

                    <div onClick={() => clickPromotion(index)}>
                      <Link
                        href='/cibil-credit-score-check'
                        className='text-[15px] pt-3  !underline text-[#5a5add] hover:!text-[#5a5add]'
                        prefetch={false}>
                        Check free credit score
                      </Link>
                    </div>
                  </div>
                  <div className='border border-[gray-100]  border-b-0 border-l-0 border-r-0 p-4 text-[#212529] max-sm:col-span-2 lg:hidden'>
                    <div className='mb-2 relative px-[10px] z-[30]'>
                      <button
                        onClick={() => {
                          handleClick(index)
                        }}
                        className='w-full md:h-auto max-sm:h-[37px]  cursor-pointer py-[5px] font-medium flex justify-center items-center  max-sm:gap-3 max-sm:text-[11px] rounded-lg bg-[#F0E5FF] text-[15px] text-[#212529]'>
                        Save Monthly upto ₹{monthlySavings}
                        <Image
                          src={'/assets/accordion-down.svg'}
                          width={20}
                          height={20}
                          alt='down-arrow'
                          className={'rotate-0'}
                        />
                      </button>
                      <div className='cursor-pointer bg-white lg:mt-[7px] max-sm:mt-2 text-center business-right-text mb-[15px] w-full lg:w-[160px] md:w-full rounded-md border '>
                        {size?.width < 768 && getSaveMonthlyFeatures(alldata)}
                        {size?.width === 768 &&
                          SelectIndex?.includes(index) &&
                          selectAccordion == index &&
                          getSaveMonthlyFeatures(alldata)}
                      </div>
                    </div>
                    <div className='my-1 relative px-[10px] z-[10]'>
                      <button
                        onClick={() => handleClickAnual(index)}
                        className='w-full cursor-pointer  flex font-medium py-[5px] justify-center items-center md:h-auto  max-sm:h-[37px] gap-5 max-sm:gap-3 max-sm:text-[11px] rounded-lg  bg-[#DEF7ED] text-[15px]  text-[#212529]'>
                        Save annually upto ₹{alldata?.total_saving}
                        <Image
                          src={'/assets/accordion-down.svg'}
                          width={20}
                          height={20}
                          alt='down-arrow'
                          className={accordianAnual?.includes(index) ? 'rotate-180' : 'rotate-0'}
                        />
                      </button>
                      {accordianAnual?.includes(index) && selectAccordion == index ? (
                        <ul className='bg-white w-full h-auto shadow-xl rounded-md p-2 a=bsolute'>
                          <li className='flex items-center py-1 justify-between text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Online Shopping</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {alldata?.online_shopping}</p>
                          </li>
                          <li className='flex items-center py-1 justify-between text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Dining</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {alldata?.dining}</p>
                          </li>
                          <li className='flex items-center py-1 justify-between text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Fuel</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {alldata?.fuel}</p>
                          </li>
                          <li className='flex items-center py-1 justify-between text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Entertainment</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {alldata?.entertainment}</p>
                          </li>
                          <li className='flex items-center py-1 justify-between text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>International</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {alldata?.international}</p>
                          </li>
                          <li className='flex items-center py-1 justify-between text-[12px]'>
                            <p className='m-0 text-[black] font-semibold'>Travel</p>
                            <p className='m-0 text-[black] font-semibold'>₹ {alldata?.travel}</p>
                          </li>
                        </ul>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div>{getAdditionalFeaturesComp(index, alldata)}</div> */}
            </div>
          </>
        )
      })}
    </div>
  )
}

export default SavingCalculatorListing
