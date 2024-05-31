import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const CompareCardBoxed = dynamic(() => import('../../Layout/compareCard/cardBox/CompareCardBoxed'), {
  ssr: false
})

const CreditCardTrobleHaving = dynamic(
  () => import('../../Layout/compareCard/cardTrobleHaving/CreditCardTrobleHaving'),
  {
    ssr: false
  }
)

const FAQ = dynamic(() => import('../FAQ/FAQ'), {
  ssr: false
})

function CompareCardComponent({ faqdata, slug1, slug2, slug3, productcomparedata }) {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='bg-[#F4F8FB]'>
      <div
        className={`container  min-h-[500px] max-[1440px]:px-12 max-[1200px]:px-0 mx-auto max-[991px]:max-w-full pt-20 pb-[100px] px-20 rounded-2xl max-[1024px]:px-8 max-[479px]:px-0 max-[1024px]:pt-16 max-[479px]:pb-0 max-[375px]:pb-7 max-[479px]:pt-7 ${scrollY > 0 ? 'scroll-banner' : 'scroll-same'
          }`}>
        <CompareCardBoxed slug1={slug1} slug2={slug2} slug3={slug3} productcomparedata={productcomparedata} />
      </div>
      <CreditCardTrobleHaving  position={'2'}/>
      <FAQ faqdata={faqdata} />
    </div>
  )
}

export default CompareCardComponent
