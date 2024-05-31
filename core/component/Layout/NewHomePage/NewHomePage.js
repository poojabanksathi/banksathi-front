import React from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'
import dynamic from 'next/dynamic'

const CategoryBaseTab = dynamic(() => import('../Home/category/CategoryBaseTab'), { ssr: false })
const PersonalisedProduct = dynamic(() => import('./PersonalisedProduct/PersonalisedProduct'), { ssr: false })
const CustomerReviews = dynamic(() => import('./CustomerReviews/CustomerReviews'), { ssr: false })
const KnowledgeBaseComp = dynamic(() => import('./KnowledgeBaseComp/KnowledgeBaseComp'), { ssr: false })

export const NewHomePage = ({ businessCategorydata, blogData }) => {
  const size = useWindowSize()
  const isDesktop = size?.width >= 768

  return (
    <>
      <CategoryBaseTab isDesktop={isDesktop} businessCategorydata={businessCategorydata} />
      <div className='pt-[50px] max-sm:pt-[30px]'>
        <PersonalisedProduct />
      </div>
      <div className='h-auto container pt-[50px] max-[768px]:pt-12 mx-auto bg-[#F4F8FB] max-[1024px]:px-8 max-[991px]:max-w-full max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
        <CustomerReviews />
      </div>
      {blogData?.data?.resulted_data?.length > 0 && (
        <div className='bg-white max-w-[1550px] mx-auto mt-[60px]'>
          <KnowledgeBaseComp blogData={blogData} />
        </div>
      )}
    </>
  )
}

export default NewHomePage
