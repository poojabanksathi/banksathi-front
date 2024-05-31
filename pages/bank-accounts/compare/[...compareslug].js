import React from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI, multipleSlug } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import { useRouter } from 'next/router'

const CommonBreadCrumbComponent = dynamic(
  () => import('@/core/component/common/CommonList/CommonBreadCrumbComponent'),
  {
    ssr: false
  }
)
const MobileFooter = dynamic(() => import('../../../core/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

const CompareBankAccounts = dynamic(() => import('@/core/component/Layout/savingAccountList/CompareBankAccounts'), {
  ssr: false
})
const CompareBankPdfPage = dynamic(() => import('@/core/component/Layout/savingAccountList/CompareBankPdfPage'), {
  ssr: false
})
export async function getServerSideProps(context) {
  try {
    const { compareslug } = context.params
    const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]
    const lang_id = 1
    const url_slug = ''
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref = context?.req?.headers?.referer || ''
    const ip = context?.req?.headers?.['x-forwarded-for']?.split(',')?.[0] || ''
    const user_agent = context?.req?.headers?.['user-agent'] || ''
    const leadsParams = { user_agent, ip }

    const req1 = {
      lang_id: lang_id,
      url_slug: url_slug
    }

    const slugOne = {
      lang_id: 1,
      url_slug: compareslug?.[0]
    }
    const slugTwo = {
      lang_id: lang_id,
      url_slug: compareslug?.[1]
    }
    const slugThree = {
      lang_id: lang_id,
      url_slug: compareslug?.[2]
    }
    const req3 = {
      search_string: url_slug,
      lang_id: lang_id
    }
    const req4 = {
      lang_id: lang_id,
      business_category_url_slug: context_params
    }

    const response1 = Axios.post(BASE_URL + FAQAPI.productFaq, req1).catch((error) => {
      return { data: null }
    })
    const slug1 = await Axios.post(BASE_URL + multipleSlug.productAllDetails, slugOne).catch((error) => {
      return { data: null }
    })
    const slug2 = await Axios.post(BASE_URL + multipleSlug.productAllDetails, slugTwo).catch((error) => {
      return { data: null }
    })
    const slug3 = Axios.post(BASE_URL + multipleSlug.productAllDetails, slugThree).catch((error) => {
      return { data: null }
    })
    const response6 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req4).catch((error) => {
      return { data: 'notFound' }
    })
    const response8 = Axios.post(BASE_URL + BUSINESSCATEGORY?.productListCategory, req4).catch((error) => {
      return { data: 'notFound' }
    })

    const [data1, data2, data3, data4, data6, data8] = await Promise?.all([
      response1,
      slug1,
      slug2,
      slug3,
      response6,
      response8
    ]).then((responses) => responses.map((response) => response?.data))
    return {
      props: {
        faqdata: data1,
        slug1: data2,
        slug2: data3,
        slug3: data4,
        businessCategorydata: data6,
        productcomparedata: data8,
        referer: ref,
        leadsParams: leadsParams
      }
    }
  } catch (error) {
    // return {
    //   props: {
    //     notFound: false
    //   }
    // }
  }
}
export default function Index({
  faqdata,
  slug1,
  slug2,
  slug3,
  businessCategorydata,
  productcomparedata,
}) {
  const router = useRouter()
  const isPdfPage = router?.asPath?.split('/').pop() === 'pdf'

  const windowHref = typeof window !== 'undefined' && window?.location?.href
  const url = windowHref

  return (
    <>
      {isPdfPage ? (
        <CompareBankPdfPage
          faqdata={faqdata}
          slug1={slug1}
          slug2={slug2}
          slug3={slug3}
          productcomparedata={productcomparedata}
          link={`/bank-accounts`}
          title={'Compare Savings Accounts'}
        />
      ) : (
        <div>
          <section>
            <div className=' bg-[#844FCF]'>
              <DynamicHeader
                businessCategorydata={businessCategorydata}
                showCreditScore={false}
                slug1={slug1}
                slug2={slug2}
                slug3={slug3}
              />

              <div></div>
            </div>
          </section>
          <div className='pb-4 bg-[#F4F8FB]'>
            <CommonBreadCrumbComponent
              link1={'/bank-accounts'}
              link1Name='Bank Accounts'
              link2Name={'Compare'}
              link2={router?.asPath}
              title={'Bank Accounts'}
            />
          </div>
          <div>
            {productcomparedata && (
              <CompareBankAccounts
                faqdata={faqdata}
                slug1={slug1}
                slug2={slug2}
                slug3={slug3}
                productcomparedata={productcomparedata}
              />
            )}
            <MobileFooter />
          </div>
          <DynamicFooter />
          <div className='scroll-top'>
            <ScrollToTop smooth color='#000' />
          </div>
        </div>
      )}
    </>
  )
}
