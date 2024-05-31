import React from 'react'
import dynamic from 'next/dynamic'

const KnowledgeCard = dynamic(() => import('@/core/component/Layout/knowledgeBaseDetail/KnowledgeCard'), {
  ssr: false
})

const KnowledgeBase = dynamic(() => import('@/core/component/common/CommonList/KnowledgeBase'), {
  ssr: false
})

const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})

function KnowledgeBaseDetail({ faqdata, getAllBlog }) {
  return (
    <>
      <div>
        <KnowledgeCard getAllBlog={getAllBlog} />
      </div>
      <div className='bg-[#F4F8FB]'>
        <div className='pt-12 container h-full  mx-auto max-[991px]:max-w-full max-[1440px]:px-[35px]  max-[1024px]:px-8 max-[479px]:px-0'>
          {/* <KnowledgeBase title={'More Articles'}/> */}
           {/*<FAQ faqdata={faqdata} />*/}
        </div>
      </div>
    </>
  )
}

export default KnowledgeBaseDetail
