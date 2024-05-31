import Image from 'next/image'
import React, { useEffect, useMemo } from 'react'
import HomeIcon from '../../../../public/assets/home-icon.svg'
import accordionArrowall from '../../../../public/assets/accordion-down.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { capitalizeFirstLetter, getLink } from '@/utils/util'

function DetailBredcrumb({ productDetailsData, url_slug, paddingTop }) {
  const ulrDetails = productDetailsData?.product_details?.url_slug?.split('/')[1]
  const urlDetaisSecond = productDetailsData?.product_details?.url_slug?.split('/')[2]
  const router = useRouter()

  const breadCrumbJsonLd = () => {
    const secure = 'https:/'
    let positionList = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${secure}/${process.env.NEXT_PUBLIC_WEBSITE_URL}`  },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Credit Cards',
        item: getLink('/credit-cards')
      }
    ]
    if (ulrDetails || url_slug) {
      positionList = [
        ...positionList,
        {
          '@type': 'ListItem',
          position: 3,
          name: capitalizeFirstLetter(ulrDetails || url_slug),
          item: getLink(`/credit-cards/${ulrDetails || url_slug}`)
        }
      ]
    }
    if (productDetailsData?.product_details?.card_name) {
      positionList = [
        ...positionList,
        {
          '@type': 'ListItem',
          position: 4,
          name: productDetailsData?.product_details?.card_name
        }
      ]
    }
    const jsonObj = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: positionList
    }
    const jsonBreadCrumb = JSON.stringify(jsonObj)

    return {
      __html: jsonBreadCrumb
    }
  }

  return (
    <>
      <Head>
        <script type='application/ld+json' dangerouslySetInnerHTML={breadCrumbJsonLd()} />
      </Head>
      <div
      className={`container bg-[#F4F8FB] h-full lg:px-12  max-2xl:px-16 2xl:px-16 py-5 mx-auto max-[991px]:max-w-full  max-[1024px]:px-0 max-[771px]:px-8 md:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 `}
        >
        <div className='flex items-center gap-[2px] justify-start   max-[479px]:gap-[0px] max-[320px]:gap-0'>
          <Link href='/' prefetch={false} className='text-[#212529] hover:!text-[#212529]'>
            <Image src={HomeIcon} width={18} height={18} alt='home' className='max-[479px]:w-[12px] max-[479px]:h-[12px]' />
          </Link>
          <div>
            <Image
              src={accordionArrowall}
              width={14}
              height={14}
              priority={true}
              className='w-5 h-5 max-[479px]:w-4 max-[479px]:h-4 rotate-[270deg]'
              alt='img'
            />
          </div>
          <Link
            href='/credit-cards'
            prefetch={false}
            className='text-[#212529] hover:!text-[#212529] bredcrumb-title-respo'>
            <p className='text-[13px]  max-[771px]:text-[10px]  text-[#212529] max-[479px]:text-[8px] max-[430px]:text-[8px] max-[375px]:!text-[8px] max-[320px]:!text-[8px] max-[280px]:text-[8px] '>
              Credit Cards
            </p>
          </Link>

          <div>
            {(productDetailsData?.product_details?.bank_name || url_slug) && (
              <Image
                src={accordionArrowall}
                width={14}
                height={14}
                priority={true}
                className='w-5 h-5 max-[479px]:w-4 max-[479px]:h-4 rotate-[270deg]'
                alt='img'
              />
            )}
          </div>
          {ulrDetails && (
            <Link
              href={`/credit-cards/${ulrDetails}`}
              prefetch={false}
              className='text-[#212529] hover:!text-[#212529] bredcrumb-title-respo'>
              <p className='text-[13px] text-[#212529] max-[771px]:text-[10px] hover:!text-[#212529]  max-[479px]:text-![8px]  capitalize'>
                {productDetailsData?.product_details?.bank_name || url_slug}
              </p>
            </Link>
          )}
          {!productDetailsData && (
            <p className='text-[13px] text-[#212529] max-[771px]:text-[10px] hover:!text-[#212529]  max-[479px]:text-![8px] capitalize'>
              {productDetailsData?.product_details?.bank_name || url_slug}
            </p>
          )}
          <div>
            {productDetailsData?.product_details?.card_name && (
              <Image
                src={accordionArrowall}
                width={14}
                height={14}
                priority={true}
                className='w-5 h-5 max-[479px]:w-4 max-[479px]:h-4 rotate-[270deg]'
                alt='img'
              />
            )}
          </div>
          <p className='text-[13px]  max-[771px]:text-[10px]  text-[#212529] font-semibold max-[479px]:text-[8px]  bredcrumb-title-respo'>
            {productDetailsData?.product_details?.card_name}
          </p>
        </div>
      </div>
    </>
  )
}

export default DetailBredcrumb
