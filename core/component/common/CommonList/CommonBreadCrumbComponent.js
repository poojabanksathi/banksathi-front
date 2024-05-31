import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import accordionArrowall from '../../../../public/assets/accordion-down.svg'
import HomeIcon from '../../../../public/assets/home-icon.svg'
import { getLink } from '@/utils/util'
import Head from 'next/head'

const CommonBreadCrumbComponent = (props) => {
  const secure = 'https:/'
  const breadCrumbJsonLd = () => {
    let postionLists = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${secure}/${process.env.NEXT_PUBLIC_WEBSITE_URL}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: props?.link1Name,
        item: getLink(`${props?.link1}`)
      }
    ]
    if (props?.link2Name) {
      postionLists = [
        ...postionLists,
        { '@type': 'ListItem', position: 3, name: props?.link2Name, item: getLink(`${props?.link2}`) }
      ]
    }
    if (props?.link3Name) {
      postionLists = [...postionLists, { '@type': 'ListItem', position: 4, name: props?.link3Name }]
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

  const breadJson = breadCrumbJsonLd()
  return (
    <>
      <Head>
        <script type='application/ld+json' key='app-ld-json' dangerouslySetInnerHTML={breadJson} />
      </Head>
      <div className='container h-full  mx-auto max-[991px]:max-w-full max-[768px]:px-10 max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
        <div
          className={`pt-5 px-12 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-0 items-center max-[576px]:grid-cols-1 max-[576px]:gap-8`}>
          <div className='flex items-center gap-[2px] justify-start max-[479px]:gap-[2px] max-[320px]:gap-0'>
            <Link href='/' prefetch={false} className='text-[#212529] hover:!text-[#212529]'>
              <Image
                src={HomeIcon}
                width={18}
                height={18}
                alt='img'
                className='max-[479px]:w-[12px] max-[479px]:h-[12px]'
              />
            </Link>
            <div>
              <Image
                src={accordionArrowall}
                width={14}
                height={14}
                priority={true}
                className='w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 rotate-[270deg]'
                alt='img'
              />
            </div>
            <Link
              href={props?.link1}
              prefetch={false}
              className='text-[#212529] hover:!text-[#212529] bredcrumb-title-respo'>
              <p className='text-[13px]  max-[771px]:text-[10px]text-[#212529] max-[479px]:text-[10px] max-[430px]:text-[9px] max-[375px]:!text-[8px] max-[320px]:!text-[10px] max-[280px]:text-[8px] '>
                {props?.link1Name}
              </p>
            </Link>

            {props?.link2Name && (
              <>
              {props?.link2 &&
                <div>
                  <Image
                    src={accordionArrowall}
                    width={14}
                    height={14}
                    priority={true}
                    className='w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 rotate-[270deg]'
                    alt='img'
                  />
                </div>
              }
                {props?.link2 ? (
                  <Link
                    href={props?.link2}
                    prefetch={false}
                    className='text-[#212529] hover:!text-[#212529] bredcrumb-title-respo'>
                    <p className='text-[13px] text-[#212529] max-[771px]:text-[13px] hover:!text-[#212529]  max-[479px]:text-[10px] max-[375px]:!text-[8px] max-[320px]:!text-[10px] max-[280px]:text-[8px] capitalize'>
                      {props?.link2Name}
                    </p>
                  </Link>
                ) : (
                  // <div className='text-[#212529] hover:!text-[#212529] bredcrumb-title-respo'>
                  //   <p className='text-[13px] text-[#212529] max-[771px]:text-[13px] hover:!text-[#212529]  max-[479px]:text-[10px] max-[375px]:!text-[8px] max-[320px]:!text-[10px] max-[280px]:text-[8px] capitalize'>
                  //     {props?.link2Name}
                  //   </p>
                  // </div>
                  <></>
                )}
              </>
            )}

            {/* {props?.link3Name && (
              <>
                <div>
                  <Image
                    src={accordionArrowall}
                    width={14}
                    height={14}
                    priority={true}
                    className='w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 rotate-[270deg]'
                    alt='img'
                  />
                </div>
                <p className='text-[13px]  max-[771px]:text-[10px]  text-[#212529] font-semibold max-[479px]:text-[10px] max-[375px]:!text-[8px] max-[320px]:!text-[10px] max-[280px]:text-[8px]  bredcrumb-title-respo'>
                  {props?.link3Name}
                </p>
              </>
            )} */}
          </div>
        </div>
      </div>
    </>
  )
}

export default CommonBreadCrumbComponent
