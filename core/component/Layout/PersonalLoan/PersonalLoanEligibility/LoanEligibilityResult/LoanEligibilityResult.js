import { useWindowSize } from '@/hooks/useWindowSize'
import React, { useEffect, useState } from 'react'
import AlternateProductsList from './AlternateProductsList/AlternateProductsList'
import NotEligibleForAny from './NotEligibleForAny/NotEligibleForAny'
import IsEligibleProduct from './IsEligibleProduct/IsEligibleProduct'
import ParticularLoanEligibility from './ParticularLoanEligibility/ParticularLoanEligibility'

const LoanEligibilityResult = ({ productList, alternetRelatedproduct }) => {
  const size = useWindowSize()

  const [eligibleProduct, setEligibleProduct] = useState(null)
  const [alternateProducts, setAlternateProducts] = useState(null)
  const [inputSlug, setInputSlug] = useState(null)
  const [isForParticularLoan, setIsForParticularLoan] = useState(false)

  const isMobile = size?.width <= 576
  const isTablet = size?.width === 768

  const filteredAlternateList = productList?.product_list?.filter((item) =>
    alternateProducts?.includes(item?.url_slug?.split('/')?.pop())
  )

  const isEligible = eligibleProduct !== '' && inputSlug !== 'null'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const alt = localStorage.getItem('loan-alternate-products')
        ? JSON.parse(localStorage.getItem('loan-alternate-products'))
        : null
      const eligible = localStorage.getItem('loan-eligible-product')
      const slug = localStorage.getItem('loan-input-slug')
      const value = localStorage.getItem('particularLoanEligibility')
      setIsForParticularLoan(Boolean(value))
      setInputSlug(slug)
      setEligibleProduct(eligible ? JSON.parse(eligible) : '')
      setAlternateProducts(alt?.personal_loans)
    }
  }, [])
  return (
    <>
      <div className={isEligible ? 'bg-white lg:mb-[60px]' : ''}>
        <div
          className={`container mx-auto px-20 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4 h-auto  pt-[35px] pb-[60px] justify-around max-[576px]:py-[50px] max-[479px]:py-10 max-[479px]:h-auto`}>
          {eligibleProduct === '' && alternateProducts?.length > 0 && !isForParticularLoan && (
            <AlternateProductsList
              size={size}
              isMobile={isMobile}
              isTablet={isTablet}
              filteredAlternateList={filteredAlternateList}
              hideCheckEligibleButton={true}
              title='Congratulations! You qualify for these Personal Loans.'
            />
          )}
          {eligibleProduct === '' && alternateProducts?.length <= 0 && <NotEligibleForAny size={size} />}
          {isEligible ? (
            <IsEligibleProduct
              size={size}
              filteredAlternateList={filteredAlternateList}
              eligibleProduct={eligibleProduct}
              productList={productList}
            />
          ) : isForParticularLoan ? (
            <ParticularLoanEligibility
              alternateProducts={alternateProducts}
              filteredAlternateList={filteredAlternateList}
              isMobile={isMobile}
              isTablet={isTablet}
              size={size}
            />
          ) : (
            ''
          )}
        </div>
      </div>
      <>
        {isEligible && (
          <div className='container mx-auto px-20 md:mt-4 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4 h-auto  pb-[20px] justify-around max-[576px]:py-[50px] max-[479px]:py-10 max-[479px]:h-auto'>
            <AlternateProductsList
              size={size}
              isMobile={isMobile}
              isTablet={isTablet}
              filteredAlternateList={filteredAlternateList}
              title='You are also eligible for these Personal Loan'
            />
          </div>
        )}
      </>
    </>
  )
}

export default LoanEligibilityResult
