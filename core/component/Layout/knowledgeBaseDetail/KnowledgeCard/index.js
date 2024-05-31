/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PaginationRounded from '@/core/component/common/Pagination'
import moment from 'moment'
import axios from 'axios'
import { BASE_URL, BLOG } from '@/utils/alljsonfile/service'
import { useRouter } from 'next/router'

function ScoreBanner({ getAllBlog }) {
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const [showData, setShowData] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9
  const [updatedBlogs, setUpdatedBlogs] = useState([])
  const [filterBlogs, setFilterBlogs] = useState([])
  const [blogListData, setblogListData] = useState(getAllBlog?.data?.resulted_data)
  const totalItems = getAllBlog?.data?.total_count
  const router = useRouter()
  const firstDataRef = useRef(null)
  useEffect(() => {
    if (getAllBlog?.data?.resulted_data?.length > 0) {
      setUpdatedBlogs(getAllBlog)
    }
  }, [getAllBlog?.data?.resulted_data?.length])

  // const onPageChange = (page) => {
  //   setCurrentPage(page)
  //   const queryParams = new URLSearchParams(window.location.search)
  //   queryParams.set('page', page)
  //   const newUrl = `${window.location.pathname}?${queryParams.toString()}`
  //   window.history.pushState({ path: newUrl }, '', newUrl)
  //   const pagedata = {
  //     offset: page,
  //     limit: 9
  //   }
  //   axios.post(BASE_URL + BLOG.blogList, pagedata).then((data) => {
  //     setFilterBlogs(data?.data)
  //   })
  //   if (firstDataRef.current) {
  //     firstDataRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  //   }
  // }
  // function splitArrayIntoGroups(array, groupSize) {
  //   const result = []
  //   for (let i = 0; i < array?.length; i += groupSize) {
  //     result.push(array.slice(i, i + groupSize))
  //   }
  //   return result
  // }
  // const groupedArrays = splitArrayIntoGroups(
  //   filterBlogs?.data ? filterBlogs?.data : updatedBlogs?.data?.resulted_data,
  //   3
  // )

  //pagination logic

  const getNewsListData = (page) => {
    const newsReq = {
      offset: page,
      limit: 9
    }
    axios
      .post(BASE_URL + BLOG.blogList, newsReq)
      .then((response) => {
        if (response?.data) {
          setblogListData(response?.data?.data?.resulted_data)
          router?.push({
            pathname: '/blog',
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

  return (
    <>
      {blogListData?.length > 0 && (
        <div>
          <h1 className='head-text font-[faktum] text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px]  max-[479px]:text-[28px] max-[375px]:text-[24px] max-[320px]:text-[22px] text-center font-semibold pt-[30px] text-[#212529] max-[576px]:leading-10]  '>
            BankSathi Blog
          </h1>
        </div>
      )}
      <div className=' container  max-[1024px]:px-8 mx-auto  pt-[30px] max-[576px]:px-6 max-[479px]:px-4  max-[479px]:py-[30px] max-[375px]:px-4 max-[320px]:px-4'>
        <div className='  h-full  grid grid-cols-1 gap-y-[30px] my-6 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] justify-center w-full'>
          {blogListData?.map((data, i) => {
            const formattedDate = moment(data?.created_at).format('MMM D')
            return (
              <div key={i} className='h-full  rounded-[30px] overflow-hidden filter-card-box duration-300 bg-white'>
                <Link href={`blog/${data?.url_slug}`} prefetch={false}>
                  <Image
                    src={`${Img_URL}/${data?.image}`}
                    alt={`blog_img`}
                    width={10}
                    height={10}
                    className='w-full object-center mx-auto h-auto'
                    unoptimized={true}
                  />
                </Link>

                <div className='p-6'>
                 {data?.title && <Link href={`blog/${data?.url_slug}`} prefetch={false}>
                    <h2 className='text-[18px] max-xl:text-[13px] font-poppins leading-[28px] max-[320px]:text-[12px] pt-[15px]  text-[#212529] font-[500]'>
                      {data?.title}
                    </h2>
                  </Link>}
                  {data?.tor && (
                    <p className='text-[13px] max-[320px]:text-[11px] pt-[15px] text-[#212529] font-[400] create-date-blog'>
                      {formattedDate} . {data?.tor} min read
                    </p>
                  )}
                </div>
              </div>
              // </Link>
            )
          })}
        </div>

        <div className='mt-5 max-sm:ml-6 sm:ml-10'>
          <div className='flex  mx-auto pt-4  font-bold items-center justify-center'>
            <PaginationRounded
              showData={showData}
              items={totalItems}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ScoreBanner
