import React from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI, multipleSlug } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import { useRouter } from 'next/router'

const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})
const CreditCardTrobleHaving = dynamic(
  () => import('../../../core/component/Layout/compareCard/cardTrobleHaving/CreditCardTrobleHaving'),
  {
    ssr: false
  }
)
const CompareCreditCardNew = dynamic(() => import('../../../core/component/common/CommonList/CompareCreditCard'), {
  ssr: false
})
const CompareCardPdfPage = dynamic(() => import('../../../core/component/common/CommonList/CompareCardPdfPage'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('../../../core/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

export default function Index({
  faqdata,
  slug1,
  slug2,
  slug3,
  businessCategorydata,
  productcomparedata,
  route,
}) {
  const router = useRouter()

  const isPdfPage = router?.asPath?.split('/').pop() === 'pdf'

  return (
    <>
      <div>
        {' '}
        {isPdfPage ? (
          <CompareCardPdfPage
            faqdata={faqdata}
            slug1={slug1}
            slug2={slug2}
            slug3={slug3}
            productcomparedata={productcomparedata}
            route={route}
            link={`/credit-cards`}
            title={'Compare Credit Cards'}
          />
        ) : (
          <>
            <section>
              <div className=' bg-[#844FCF]'>
                <DynamicHeader
                  slug1={slug1}
                  slug2={slug2}
                  slug3={slug3}
                  businessCategorydata={businessCategorydata}
                />
              </div>
            </section>

            <div>
              {productcomparedata && (
                <CompareCreditCardNew
                  faqdata={faqdata}
                  slug1={slug1}
                  slug2={slug2}
                  slug3={slug3}
                  productcomparedata={productcomparedata}
                  route={route}
                />
              )}
            </div>
            <div className='bg-[#F4F8FB] '>
              <CreditCardTrobleHaving creditCompare={true} position={'3'} />

              <FAQ faqdata={faqdata} />
              <MobileFooter businessCategorydata={businessCategorydata} />
            </div>
            <DynamicFooter businessCategorydata={businessCategorydata} />
            <div className='scroll-top'>
              <ScrollToTop smooth color='#000' />
            </div>
          </>
        )}{' '}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const { slug } = context.params
    const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]
    const route = context?.resolvedUrl
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
      url_slug: slug[0]
    }
    const slugTwo = {
      lang_id: lang_id,
      url_slug: slug[1]
    }
    const slugThree = {
      lang_id: lang_id,
      url_slug: slug[2]
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
        route: route,
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
