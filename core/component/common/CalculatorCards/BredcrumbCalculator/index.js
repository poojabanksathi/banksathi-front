import Image from 'next/image'
import React from 'react'
import HomeIcon from '../../../../../public/assets/home-white.svg'
import HomeBlackIcon from '../../../../../public/assets/home-black.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getLink } from '@/utils/util'
import Head from 'next/head'
function BredcrumbCalculator({ newsBredCrumb, creditCard }) {
  const router = useRouter()

  const routebredcrumb = router?.pathname?.split('/')[2]
  const routesecgeneral = router?.pathname?.split('/')[1]

  function convertToTitleCase(routebredcrumb) {
    return routebredcrumb
      ?.split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  function BredcrumbGeneral(routesecgeneral) {
    return routesecgeneral
      ?.split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  const slug = routebredcrumb
  const slugGeneral = routesecgeneral //1st route
  const convertedStringRoute = convertToTitleCase(slug) // 2nd route
  const genralStringRoute = BredcrumbGeneral(slugGeneral)

  const breadCrumbJsonLd = () => {
    const secure = 'https:/'
    let postionLists = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${secure}/${process.env.NEXT_PUBLIC_WEBSITE_URL}`  },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Calculators',
        item: getLink(`/calculators`)
      }
    ]
    if (convertedStringRoute) {
      postionLists = [
        ...postionLists,
        { '@type': 'ListItem', position: 3, name: slugGeneral, item: getLink(`/calculators/${convertedStringRoute}`) }
      ]
    }
    const jsonObj = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: postionLists
    }
    const jsonBreadCrumb = JSON.stringify(jsonObj)
    return {
      __html: jsonBreadCrumb
    }
  }
  return (
    <>
      <Head>
        <script type='application/ld+json' key='app-ld-json' dangerouslySetInnerHTML={breadCrumbJsonLd()} />
      </Head>
      <div className='container h-full  mx-auto max-[991px]:max-w-full  max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
        <div
          className={`pt-5 px-12 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-0 items-center max-[576px]:grid-cols-1 max-[576px]:gap-8   ${
            newsBredCrumb === 'true' ? 'max-[576px]:px-0' : 'max-[576px]:px-0'
          }`}>
          <div
            className={`flex items-center gap-2 justify-start max-[479px]:gap-[2px] max-[320px]:gap-0 max-[576px]:justify-left  ${
              newsBredCrumb === 'true' ? 'max-[576px]:justify-left' : 'max-[576px]:justify-left'
            }`}>
            {convertedStringRoute ? (
              <Link
                href='/'
                prefetch={false}
                className={`text-[#212529] hover:!text-[#212529] ${creditCard && '!text-black'}`}>
                <Image
                  src={HomeBlackIcon}
                  width={18}
                  height={18}
                  alt='image'
                  className={`max-[479px]:w-[12px] max-[479px]:h-[12px] w-auto h-auto ${creditCard && '!text-black'}`}
                />
              </Link>
            ) : (
              <Link
                href='/calculators'
                prefetch={false}
                className={`text-white hover:!text-white ${creditCard && '!text-black'}`}>
                <Image
                  src={HomeIcon}
                  width={18}
                  height={18}
                  alt='image'
                  className='max-[479px]:w-[12px] max-[479px]:h-[12px]'
                />
              </Link>
            )}
            <div>
              <div className='w-[3px] h-[3px] rounded-full bg-[#D9D9D9]'></div>
            </div>
            <Link href='/calculators' prefetch={false} className='text-white hover:!text-white'>
              <p
                className={`text-[13px] ${creditCard && '!text-black'} ${
                  convertedStringRoute ? 'text-[#212529]' : 'text-white'
                } hover:${
                  convertedStringRoute ? '!text-[#212529]' : '!text-white'
                }  max-[479px]:text-[11px] max-[320px]:!text-[10px] max-[280px]:!text-[9px] capitalize`}>
                {genralStringRoute}
              </p>
            </Link>
            {convertedStringRoute && (
              <>
                <div>
                  <div className='w-[3px] h-[3px] rounded-full bg-[#D9D9D9]'></div>
                </div>
                <p
                  className={`text-[13px] ${creditCard && '!text-black'} ${
                    convertedStringRoute ? 'text-[#212529]' : 'text-white'
                  } font-semibold max-[479px]:text-[11px] max-[320px]:!text-[10px] max-[280px]:!text-[9px]`}>
                  {convertedStringRoute}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default BredcrumbCalculator
