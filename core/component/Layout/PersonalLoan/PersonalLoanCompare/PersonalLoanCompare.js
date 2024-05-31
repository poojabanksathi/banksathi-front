import { useWindowSize } from '@/hooks/useWindowSize'
import React, { useRef, useState } from 'react'
import HeaderSection from './HeaderSection/HeaderSection'
import Image from 'next/image'
import StarRatings from 'react-star-ratings'
import {
  ImageBaseUrl,
  getInterestRate,
  getLoanAmount,
  getLoanTenure,
  getProcessingFee,
  localUserData,
  starCount
} from '@/utils/util'
import PersonalApplyNow from '../PersonalApplyNow/PersonalApplyNow'
import SearchableDropdown from '@/core/component/common/SearchableDropdown/SearchableDropdown'
import { useRouter } from 'next/router'
import LoanMobileCompareTable from './LoanMobileCompareTable/LoanMobileCompareTable'
import Link from 'next/link'
import CreditCardTrobleHaving from '../../compareCard/cardTrobleHaving/CreditCardTrobleHaving'

const PersonalLoanCompare = ({ slug1Data, slug2Data, slug3Data, productcomparedata, isPdfPage }) => {
  const placeHolder = 'Select lender'

  const targetRef = useRef(null)
  const size = useWindowSize()
  const router = useRouter()
  const { query } = router

  const [searchValue, setSearchValue] = useState({ name: null })

  const isDesktop = size?.width > 768
  const tabBasis = size?.width > 577 && size?.width < 769

  // banks
  const banksArray =
    productcomparedata?.product_list?.length > 0 &&
    productcomparedata?.product_list?.filter(
      (obj) =>
        obj?.card_name !== slug1Data?.product_details?.card_name &&
        obj?.card_name !== slug2Data?.product_details?.card_name
    )

  const banksName = banksArray?.map((item, index) => {
    {
      const array = [
        {
          id: index + 1,
          name: item?.card_name,
          url_slug: item?.url_slug
        }
      ]
      return array?.[0]
    }
  })

  const getSlugsArray = () => {
    if (slug1Data && slug2Data && slug3Data) return [slug1Data, slug2Data, slug3Data]
    if (slug1Data && slug2Data) return [slug1Data, slug2Data]
    if (slug1Data) return [slug1Data]
  }

  const slugsArray = getSlugsArray()

  const handleReplace = (slug) => {
    const slugurlreplace = slug?.product_details?.url_slug?.split('/')
    if (query?.personal_loan_slug?.length > 1) {
      const updatedParams = query['personal_loan_slug']?.filter(
        (param) => param !== slugurlreplace[2],
        query?.personal_loan_slug
      )
      const updatedQuery = {
        ...query,
        ['personal_loan_slug']: updatedParams
      }
      router.push({
        pathname: router?.pathname,
        query: updatedQuery
      })
    } else {
      delete query?.personal_loan_slug[slugurlreplace[2]]
      router.push(`/personal-loan/compare/none`)
    }
  }

  const handleDelete = (_id) => {
    const data = query?.personal_loan_slug
    delete router?.query[_id]
    if (!query?.personal_loan_slug?.length) {
      router.push(`/personal-loan/compare/none`)
    }
  }
  const slugImageComp = (data) => {
    return (
      <th className={`${tabBasis ? 'basis-1/2  border-r  border-slate-200' : 'basis-1/4  border-r  border-slate-200'}`}>
        <div className='text-[#212529]'>
          <div className='px-[30px] pt-10 mb-[25px] max-sm:px-2'>
            <div className='xl:w-[230px] md:w-full h-auto relative max-sm:w-auto max-sm:px-0 bg-white rounded-lg border border-slate-200 flex !items-center justify-center'>
              <Link href={`/${data?.product_details?.url_slug}`} prefetch={false}>
                <Image
                  src={`${ImageBaseUrl}/${data?.product_details?.product_image}`}
                  alt='bank image'
                  width={230}
                  height={140}
                  className='max-sm:w-auto max-sm:h-auto md:w-full'
                />
              </Link>
              <button
                className='flex absolute right-[-0.5rem] top-[-1.5rem] h-[30px]  cursor-pointer bottom-[33px] bg-[#FFFFFF] px-2 py-1 rounded-full  z-[1] w-[30px] border border-[#E6ECF1] drop-shadow-lg'
                onClick={() => handleReplace(data)}>
                <Image
                  src={'/assets/closeIcon.svg'}
                  className='w-[15px] max-xs:w-[13px]'
                  onClick={() => handleDelete(data)}
                  width={15}
                  height={15}
                  alt='img_text'
                />
              </button>
            </div>
            <div className="mt-[25px] text-center text-neutral-800 text-[17px] max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
              {data?.product_details?.card_name}
            </div>
            {data?.product_details?.rating === 0 ? (
              <div className='my-2'>NA</div>
            ) : (
              <div className='flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2  pt-[12px]'>
                <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[13px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                  {data?.product_details?.rating}
                </p>
                <div className='flex  items-center justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                  <StarRatings
                    count={starCount}
                    rating={data?.product_details?.rating}
                    starRatedColor='#49d49d'
                    numberOfStars={starCount}
                    name='rating'
                    starDimension={isDesktop ? '22px' : '15px'}
                    starSpacing='0'
                  />
                </div>
              </div>
            )}
            <div className='flex items-center justify-center gap-1.5 mb-[30px]'></div>
            <div id='comp-3-aply-btn' className='text-center'>
              <PersonalApplyNow
                dimensions={{ width: 'w-[250px]', height: 'h-[48px]' }}
                url_slug={data?.product_details?.url_slug?.split('/')?.pop()}
              />
            </div>
          </div>
        </div>
      </th>
    )
  }

  const handleClick = (slug_add) => {
    if (slug_add) {
      const data = query?.personal_loan_slug
      const newSlug = slug_add
      if (data.length) {
        const slug1Data = data[0]
        const slug2Data = data[1]
        const slug3Data = data[2] == undefined || !data[2] ? newSlug : data[2]
        if (query?.personal_loan_slug[0] === 'none' && slug1Data === 'none') {
          router.push(`/personal-loan/compare/${newSlug}`, `/personal-loan/compare/${newSlug}`, undefined, {
            scroll: false
          })
          setSearchValue({ name: 'Select lender' })
        } else if (slug1Data && !slug2Data && !slug3Data) {
          router.push(
            `/personal-loan/compare/${slug1Data}/${newSlug}`,
            `/personal-loan/compare/${slug1Data}/${newSlug}`,
            undefined,
            {
              scroll: false
            }
          )
          setSearchValue({ name: 'Select lender' })
        } else if (slug1Data && !slug2Data && slug2Data === undefined) {
          router.push(
            `/personal-loan/compare/${slug1Data}/${newSlug}`,
            `/personal-loan/compare/${slug1Data}/${newSlug}`,
            undefined,
            {
              scroll: false
            }
          )
          setSearchValue({ name: 'Select lender' })
        } else if (slug1Data && slug2Data && slug3Data) {
          router.push(
            `/personal-loan/compare/${slug1Data}/${slug2Data}/${slug3Data}`,
            `/personal-loan/compare/${slug1Data}/${slug2Data}/${slug3Data}`,
            undefined,
            { scroll: false }
          )
          setSearchValue({ name: 'Select lender' })
        } else if (query?.personal_loan_slug[0] === 'none' || slug1Data === 'none') {
          router.push(`/personal-loan/compare/${newSlug}`, `/personal-loan/compare/${newSlug}`, undefined, {
            scroll: false
          })
          setSearchValue({ name: 'Select lender' })
        }
      } else {
        router.push(`/personal-loan/compare/none`)
      }
    }
  }
  const mapKeyValuePair = (array, minKeyValue, maxKeyValue) => {
    return array?.map((item) => {
      const min = item?.product_details?.[minKeyValue]
      const max = item?.product_details?.[maxKeyValue]
      const getValue = (key) => {
        let val = 'NA'
        switch (true) {
          case key?.includes('interest_rate_min'):
            val = getInterestRate(min, max)
            break
          case key?.includes('tenure'):
            val = getLoanTenure(min, max)
            break
          case key?.includes('amount'):
            val = getLoanAmount(min, max)
            break
          case key?.includes('processing'):
            val = min ? `${min}` : 'NA'
            break
          case key?.includes('part_payment_charges'):
            val = min ? `${min}` : 'NA'
            break
          case key?.includes('part_payment_facility'):
            min === 1 ? (val = 'Yes') : (val = 'No')
            break
          default:
            val = min ? `${min}` : 'NA'
        }
        return val
      }
      return size?.width <= 576 ? (
        <p className='symbole-rupee'>{getValue(minKeyValue)} </p>
      ) : (
        <td
          key={item?.product_details?.product_id}
          className={`border-r border border-t-0 text-center border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}>
          <p className='symbole-rupee'>{getValue(minKeyValue)} </p>
        </td>
      )
    })
  }
  return (
    <div className='bg-[#F4F8FB]'>
      <div
        className={`container min-h-[500px] ${
          isPdfPage ? '' : 'max-[1440px]:px-12 px-20'
        } max-[1200px]:px-0 mx-auto max-[991px]:max-w-full pt-[10px] pb-[30px] rounded-2xl max-[1024px]:px-8 max-[479px]:px-0  max-[479px]:pb-0 max-[375px]:pb-7 max-[479px]:pt-2
    `}>
        {!isPdfPage && <HeaderSection size={size} slug1Data={slug1Data} slug2Data={slug2Data} slug3Data={slug3Data} />}
        {size?.width > 576 && size?.width !== 768 ? (
          <div ref={targetRef}>
            <table className='border-collapse border-b-0 border-0 w-full bg-white rounded-xl   ...'>
              <thead className='grid grid-cols-4'>
                {size?.width > 768 ? (
                  <th className='basis-1/4'>
                    <>
                      <div className='border-r  h-full border-slate-200 flex items-center justify-center'>
                        <h3 className="px-8 text-neutral-800 text-[13px] text-left mt-[20px] font-normal leading-[22px] font-['Poppins']">
                          Compare loans on interest rates, loan amounts, tenure, processing fees, part payment, instant
                          approval, and prepayment charges for informed decisions.
                        </h3>
                      </div>
                    </>
                  </th>
                ) : (
                  ''
                )}
                {slug1Data && slugImageComp(slug1Data)}
                {slug2Data && slugImageComp(slug2Data)}
                {slug3Data && Object(slug3Data).keys?.length > 0 && isDesktop ? slugImageComp(slug3Data) : ''}
                {(
                  size.width >= 992
                    ? slug1Data === null || slug2Data === null || slug3Data === null
                    : slug1Data === null || slug2Data === null
                ) ? (
                  <th className='basis-1/4 max-[768px]:basis-1/2'>
                    {!isPdfPage && (
                      <div className='max-[576px]:pt-10 max-[576px]:p-4  pb-8 pt-10 px-6 '>
                        <h2 className='text-left mb-[34px] text-[15px] font-semibold leading-6'>
                          Select lender from the list to compare
                        </h2>
                        <div className='w-full max-[576px]:w-full'>
                          <SearchableDropdown
                            options={banksName}
                            label='name'
                            id='id'
                            selectedVal={searchValue?.name}
                            handleChange={(val) => {
                              setSearchValue(val?.name)
                              handleClick(val?.url_slug?.split('/')?.pop())
                            }}
                            placeholder={placeHolder}
                          />
                        </div>
                      </div>
                    )}
                  </th>
                ) : (
                  slugImageComp(slug3Data)
                )}
              </thead>
              {size?.width > 768 ? (
                <>
                  <h2 className='text-neutral-800 pl-[24px]  bg-slate-50 text-[15px] font-semibold font-[Poppins] uppercase max-sm:text-center max-sm:text-[12px]'>
                    PERSONAL LOAN FEATURES
                  </h2>
                  <tbody>
                    <tr className='grid grid-cols-4'>
                      <td className='border border-l-0 border-t-0 border-slate-200 text-center p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                        Interest Rates
                      </td>
                      {mapKeyValuePair(slugsArray, 'interest_rate_min', 'interest_rate_max')}
                    </tr>
                    <tr className='grid grid-cols-4 bg-[#EAECED]'>
                      <td className='border border-l-0 border-r-0 border-t-0 border-slate-200 text-center p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                        Loan Amount Range
                      </td>
                      {mapKeyValuePair(slugsArray, 'loan_amount_min', 'loan_amount_max')}
                    </tr>
                    <tr className='grid grid-cols-4'>
                      <td className='border border-l-0 border-t-0 border-slate-200 text-center p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                        Loan Tenure
                      </td>
                      {mapKeyValuePair(slugsArray, 'loan_tenure_min', 'loan_tenure_max')}
                    </tr>
                    <tr className='grid grid-cols-4 bg-[#EAECED]'>
                      <td className='border border-l-0 border-r-0 border-t-0 border-slate-200 text-center p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                        Processing Fees
                      </td>
                      {mapKeyValuePair(slugsArray, 'processing')}
                    </tr>
                    <tr className='grid grid-cols-4'>
                      <td className='border border-l-0 border-t-0 border-slate-200 text-center p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                        Part payment Charges
                      </td>
                      {mapKeyValuePair(slugsArray, 'part_payment_charges')}
                    </tr>
                    <tr className='grid grid-cols-4 bg-[#EAECED]'>
                      <td className='border border-l-0 border-r-0 border-t-0 border-slate-200 text-center p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                        Part-payment Facility
                      </td>
                      {mapKeyValuePair(slugsArray, 'part_payment_facility')}
                    </tr>
                    <tr className='grid grid-cols-4'>
                      <td className='border border-l-0 border-t-0 border-slate-200 text-center p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                        Salary Required
                      </td>
                      {mapKeyValuePair(slugsArray, 'salary')}
                    </tr>
                    <tr className='grid grid-cols-4 bg-[#EAECED]'>
                      <td className='border border-l-0 border-r-0 border-t-0 border-slate-200 text-center p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                        ITR Amount Required
                      </td>
                      {mapKeyValuePair(slugsArray, 'itr')}
                    </tr>
                    <tr className='grid grid-cols-4'>
                      <td className='border border-l-0 border-t-0 border-slate-200 text-center p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                        Approval TAT
                      </td>
                      {mapKeyValuePair(slugsArray, 'instant_approval')}
                    </tr>
                    <tr className='grid grid-cols-4 bg-[#EAECED]'>
                      <td className='border border-l-0 border-r-0 border-t-0 border-slate-200 text-center p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                        Minimum Cibil Required
                      </td>
                      {mapKeyValuePair(slugsArray, 'min_cibil_required')}
                    </tr>
                    <tr className='grid grid-cols-4 bg-white'>
                      <td className='border border-l-0 border-r-0 border-t-0 border-slate-200 text-center p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                        Foreclosure charges
                      </td>
                      {mapKeyValuePair(slugsArray, 'forclosure_charges')}
                    </tr>
                  </tbody>
                </>
              ) : (
                ''
              )}
            </table>
          </div>
        ) : (
          <LoanMobileCompareTable
            targetRef={targetRef}
            size={size}
            slug1Data={slug1Data}
            slug2Data={slug2Data}
            slug3Data={slug3Data}
            slugImageComp={slugImageComp}
            banksName={banksName}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            slugsArray={slugsArray}
            handleClick={handleClick}
            mapKeyValuePair={mapKeyValuePair}
          />
        )}
        {!isPdfPage && (
          <div className='mt-10 max-sm: pb-5 text-center'>
            <Link className='text-center' href='/personal-loan' prefetch={false}>
              <button className='py-3 cursor-pointer  md:w-[160px]  rounded-lg text-[#212529] border border-[#000] font-semibold  max-[576px]:w-[50%]'>
                Go Back to Listing
              </button>
            </Link>
          </div>
        )}
      </div>
      {!isPdfPage && (
        <div className='py-4'>
          <CreditCardTrobleHaving position={'2'} />
        </div>
      )}
    </div>
  )
}

export default PersonalLoanCompare
