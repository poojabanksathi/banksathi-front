import React, { useState, useRef } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useWindowSize } from '@/hooks/useWindowSize'
import moment from 'moment'
import axios from 'axios'
import Link from 'next/link'
import { BASE_URL, BLOG } from '@/utils/alljsonfile/service'
import { useRouter } from 'next/router'
const PaginationData = dynamic(() => import('@/core/component/common/Pagination'), {
  ssr: false
})
const CreditNewsListComp = ({
  CreditNewsList,
  advisorPage,
  infoPage,
  holidayPage,
  bankPage,
  loanPage,
  aadharPage,
  panCardPage,
  taxPage,
  goldRatePage,
  silverRatePage,
  ifscPage,
  personalFinancePage,
  bankingPage,
  creditScorePage
}) => {
  const firstDataRef = useRef(null)
  const size = useWindowSize()
  const router = useRouter()

  const pageSize = 10
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  const [showData, setShowData] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [newsListData, setNewsListData] = useState(CreditNewsList?.data?.resulted_data)

  const totalItems = CreditNewsList?.data?.total_count

  const getNewsListData = (page) => {
    let pathname = ''
    let newsReq = { offset: page, limit: 10 }
    switch (true) {
      case infoPage:
        pathname = '/credit-cards/i'
        newsReq = { ...newsReq, blog_url_slug: 'credit-cards', identifier: 'category' }
        break
      case advisorPage:
        pathname = '/advisor/blog'
        newsReq = { ...newsReq, blog_url_slug: 'advisor', identifier: 'subcategory' }
        break
      case bankPage:
        pathname = '/bank-accounts/i'
        newsReq = { ...newsReq, blog_url_slug: 'bank-accounts', identifier: 'category' }
        break
      case loanPage:
        pathname = '/personal-loan/i'
        newsReq = { ...newsReq, blog_url_slug: 'personal-loan', identifier: 'category' }
        break
      case holidayPage:
        pathname = '/holiday'
        newsReq = { ...newsReq, blog_url_slug: 'holiday', identifier: 'subcategory' }
        break
      case aadharPage:
        pathname = '/aadhar-card'
        newsReq = { ...newsReq, blog_url_slug: 'aadhar-card', identifier: 'category' }
        break
      case panCardPage:
        pathname = '/pan-card'
        newsReq = { ...newsReq, blog_url_slug: 'pan-card', identifier: 'category' }
        break
      case taxPage:
        pathname = '/tax'
        newsReq = { ...newsReq, blog_url_slug: 'tax', identifier: 'category' }
        break
      case goldRatePage:
        pathname = '/gold-rate'
        newsReq = { ...newsReq, blog_url_slug: 'gold-rate', identifier: 'category' }
        break
      case silverRatePage:
        pathname = '/silver-rate'
        newsReq = { ...newsReq, blog_url_slug: 'silver-rate', identifier: 'category' }
        break
      case ifscPage:
        pathname = '/ifsc-code'
        newsReq = { ...newsReq, blog_url_slug: 'ifsc-code', identifier: 'category' }
        break
      case personalFinancePage:
        pathname = '/personal-finance'
        newsReq = { ...newsReq, blog_url_slug: 'personal-finance', identifier: 'category' }
        break
      case bankingPage:
        pathname = '/banking'
        newsReq = { ...newsReq, blog_url_slug: 'banking', identifier: 'category' }
        break
      case creditScorePage:
        pathname = '/credit-score-i'
        newsReq = { ...newsReq, blog_url_slug: 'credit-score-i', identifier: 'category' }
        break
      default:
        pathname = '/credit-cards/news'
        newsReq = { ...newsReq, blog_url_slug: 'credit-cards', identifier: 'subcategory' }
    }
    axios
      .post(BASE_URL + BLOG.newsList, newsReq)
      .then((response) => {
        if (response?.data) {
          setNewsListData(response?.data?.data?.resulted_data)
          router?.push({
            pathname: pathname,
            query: `page=${page + 1}`
          })
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  const onPageChange = (page) => {
    setCurrentPage(page)
    getNewsListData(page - 1)
    if (firstDataRef.current) {
      firstDataRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  const getHref = (urlSlug) => {
    if (advisorPage) return `/advisor/blog/${urlSlug}`
    if (infoPage) return `/credit-cards/i/${urlSlug}`
    if (holidayPage) return `/holiday/${urlSlug}`
    if (loanPage) return `/personal-loan/i/${urlSlug}`
    if (bankPage) return `/bank-accounts/i/${urlSlug}`
    if (aadharPage) return `/aadhar-card/${urlSlug}`
    if (panCardPage) return `/pan-card/${urlSlug}`
    if (taxPage) return `/tax/${urlSlug}`
    if (goldRatePage) return `/gold-rate/${urlSlug}`
    if (silverRatePage) return `/silver-rate/${urlSlug}`
    if (ifscPage) return `/ifsc-code/${urlSlug}`
    if (personalFinancePage) return `/personal-finance${urlSlug}`
    if (bankingPage) return `/banking/${urlSlug}`
    if (creditScorePage) return `/credit-score-i/${urlSlug}`
    else return `/credit-cards/news/${urlSlug}`
  }

  return (
    <div className='container my-6  w-full h-full  max-[1440px]:px-[24px] max-[1200px]:px-4 max-[1024px]:px-0 max-[479px]:px-4 max-[320px]:px-4   mx-auto '>
      <div className='py-2'>
        {newsListData?.map((card) => {
          const formattedDate = moment(card?.created_at).format('MMM D')
          return (
            <>
              <div className=' mb-6 bg-white rounded-xl max-sm:rounded-2xl'>
                <div className='flex flex-row max-sm:flex-col  justify-start  gap-[15px]'>
                  <div className='max-sm:p-0'>
                    <Link href={getHref(card?.url_slug)}>
                      <Image
                        className='h-[150px] max-sm:w-[400px]  md:max-w-none max-sm:h-[160px] max-sm:rounded-t-2xl md:rounded-s-2xl'
                        src={`${Img_URL}/${card?.image}`}
                        alt={`blog_img`}
                        width={size?.width >= 768 && size?.width < 1024 ? 210 : 285}
                        height={180}
                        unoptimized={true}
                        maxWidth={0}
                      />
                    </Link>
                  </div>
                  <div className='items-start max-[320px]:p-2 md:pt-[20px] md:pb-[20px] max-sm:px-[10px] max-sm:pb-3 '>
                    {card?.title && (
                      <Link href={getHref(card?.url_slug)}>
                        <h2 className='font-poppins font-medium text-[15px] leading-[21px]  text-[#212529]'>
                          {card?.title}
                        </h2>
                      </Link>
                    )}

                    <div className='flex justify-start gap-2 md:mt-4 items-center'>
                      {card?.author && (
                        <p className='font-poppins font-semibold text-[13px] leading-[19px] text-center text-[#212529]'>
                          {card?.author}
                        </p>
                      )}
                      {card?.created_at && (
                        <p className='font-poppins font-normal text-[13px] leading-[30px]  text-[#212529] pb-2'>
                          {formattedDate}
                        </p>
                      )}
                      {card?.tor && (
                        <p className='font-poppins font-normal text-[13px] leading-[30px]  text-[#212529] pb-2'>
                          {card?.tor} min read
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div>
      {size?.width >= 768 && newsListData?.length > 0 && (
        <div className='relative flex   top-0 pb-6'>
          <div className=' mt-1 absolute right-0 font-bold'>
            <PaginationData
              items={totalItems}
              currentPage={currentPage}
              showData={showData}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CreditNewsListComp
