import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import closeicon from '../../../../public/assets/closeIcon.svg'

const CreditAccordion = dynamic(() => import('../AccordionHeader/CreditAccordion'), {
  ssr: false
})

const MortgagesAccordion = dynamic(() => import('../AccordionHeader/MortgagesAccordion'), {
  ssr: false
})

const ToolsAccordion = dynamic(() => import('../AccordionHeader/ToolsAccordion'), {
  ssr: false
})

const MobileHeader = ({ headermobile, headerclose, businessCategorydata }) => {
  const [acoordiontab, setAcoordiontab] = useState()
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
    <>
      <div className='toppick-header-modal   z-[-1]  overflow-y-auto top-0 w-full left-0  ' id='modal'>
        <div className='sticky-toppick flex items-center justify-center  text-center sm:block sm:p-0 '>
          <div
            className={
              scrollY > 0
                ? 'pick-head-bg !h-[96.4%] inline-block  align-center  md:pt-0 max-[576px]:pt-[120px]  max-[479px]:pt-[120px] max-[375px]:pt-[120px] bg-[#fff]  text-left  w-full absolute top-8  left-0  transform transition-all  sm:align-middle'
                : 'pick-head-bg inline-block  align-center max-[576px]:pt-[120px]  max-[479px]:pt-[120px] max-[375px]:pt-[120px] bg-[#fff]  text-left  w-full absolute top-0  left-0    transform transition-all  sm:align-middle'
            }
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-headline'>
            <div className='head-modal-top 2xl:px-40 xl:px-30  xl:px-40 lg:px-20 md:px-16 px-0  bg-[#fff] relative h-full overflow-y-auto '>
              <div className='flex items-center justify-end px-4  mt-28 max-[576px]:mt-6   '>
                <button
                  type='button'
                  onClick={headerclose}
                  className='text-[#212529] cursor-pointer rounded mr-2 mb-4 z-10 right-2 top-3 xl:right-16 xl:top-4 lg:right-8 md:right-8 max-[576px]:top-14'>
                  <Image
                    src={closeicon}
                    className='w-[9px] max-xs:w-[13px] h-auto'
                    width={9}
                    height={9}
                    priority={true}
                    alt='img_text'
                  />
                </button>
              </div>

              {headermobile == 'All Products' ? (
                <>
                  <div id='accordion-flush text-left' className='mt-2 max-[576px]:mt-2 pb-44 '>
                    <CreditAccordion />
                  </div>
                </>
              ) : (
                ''
              )}

              {headermobile == 'Resources' ? (
                <>
                  <div id='accordion-flush text-left' className='mt-16 max-[576px]:mt-4 pb-40'>
                    <div className='mt-2'>
                      <MortgagesAccordion businessCategorydata={businessCategorydata} />
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
              {headermobile == 'Tools' ? (
                <>
                  <div id='accordion-flush text-left' className='mt-16 max-[576px]:mt-4 pb-40'>
                    <div className='mt-2'>
                      <ToolsAccordion businessCategorydata={businessCategorydata} />
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}

              <div
                className={`bg-[#D2BFED] py-6 max-[576px]:px-6 fixed bottom-0 ${
                  scrollY > 0 ? 'mobile-find-sec-scroll' : 'mobile-find-sec'
                }`}>
                <div className='text-center'>
                  <p className='text-[#212529] font-medium text-[18px] pb-4 max-[479px]:text-[16px] max-[320px]:text-[14px]'>
                    Finding the ideal credit card is simple by reviewing our tailored suggestions.
                  </p>
                  <div className=' '>
                    <Link
                      href='/credit-cards'
                      className='head-text font-[faktum] text-[#212529]  hover:!text-[#212529]  font-semibold text-[18px]  '
                      prefetch={false}>
                      <button className='text-center cursor-pointer mx-auto max-[820px]:px-4 flex gap-4 px-5 py-2 bg-white rounded-lg max-[771px]:px-3 w-auto justify-center'>
                        Find the Right Card
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileHeader
