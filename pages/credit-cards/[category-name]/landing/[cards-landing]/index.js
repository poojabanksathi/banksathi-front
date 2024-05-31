import dynamic from 'next/dynamic'
import React, { useRef } from 'react'
import { BASE_URL, BUSINESSCATEGORY, multipleSlug } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import Link from "next/link";
import logoSticky from '../../../../../public/assets/logo-sticky.svg'
import { getDeviceIdCookie } from '@/utils/util'
import Image from 'next/image'
import { useWindowSize } from '@/hooks/useWindowSize'

const LandingPage = dynamic(() => import('@/core/component/Layout/LandingPage'), {
  ssr: false
})

export default function Index({

  categoryUrl,
  productDetailsUrl,
  productDetailsData,
  businessmetaheadtag
}) {
  const size = useWindowSize()

  const isMobile = size?.width <= 576
  return (
    <>
      <section>
        <div className='bg-[#fff]'>
        <div className='p-4 landing-header'>
          <Link href="/">
            <Image src={logoSticky} alt='img_text' className='md:w-[200px] w-[150px] header-logo-landing' />
            </Link>
          </div>
        </div>

        <LandingPage
          productDetailsData={productDetailsData}
          categoryUrl={categoryUrl}
          productDetailsUrl={productDetailsUrl}
          businessmetaheadtag={businessmetaheadtag}
        />
        {!isMobile &&
        <div className=' bg-[#EAF0F5] '>
          <div className='p-5 text-center text-[15px]'>
            All Right Reserved | © Copyright @BankSathi {new Date()?.getFullYear()}
          </div>
        </div>
        }
     
      </section>


    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const productDetails = context?.params?.['cards-landing']
    const lang_id = 1
    const categoryUrl = context?.params?.['category-name'] || ''

    const cookies = context?.req?.headers?.cookie?.split(';')
    const device_id = getDeviceIdCookie(cookies)
    
    const req3 = {
      lang_id: lang_id
    }
    
    const pdpParams = {
      lang_id: lang_id,
      url_slug: productDetails,
      device_id: device_id
    }

    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3).catch((error) => {
      return { data: 'notFound' }
    })
    const response2 = await Axios.post(BASE_URL + multipleSlug.productAllDetails, pdpParams).catch((error) => {
      return { data: null }
    })


    const [data1, data2] = await Promise.all([
      response1,
      response2,
     
    ]).then((responses) => responses.map((response) => response.data))

    return {
      props: {
        businessCategorydata: data1,
        productDetailsData: data2,
        businessmetaheadtag: data2?.product_details,
        categoryUrl: categoryUrl,
        productDetailsUrl: productDetails
      }
    }
  } catch (error) {
    return {
      props: {
        notFound: false
      }
    }
  }
}
