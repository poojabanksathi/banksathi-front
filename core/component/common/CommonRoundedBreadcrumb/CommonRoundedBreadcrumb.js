import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import HomeBlackIcon from '../../../../public/assets/home-black.svg'
import Head from 'next/head'
import { getLink } from '@/utils/util'

const CommonRoundedBreadcrumb = (props) => {
  const breadCrumbJsonLd = () => {
    const secure = 'https:/'
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
    <div>
      <Head>
        <script type='application/ld+json' key='app-ld-json' dangerouslySetInnerHTML={breadJson} />
      </Head>
      <div className='container h-full mx-auto max-[991px]:max-w-full  max-[1024px]:px-4 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
        <div className='pt-4 container bg-[#F4F8FB] h-full px-14  mx-auto max-[991px]:max-w-full   max-[1024px]:px-8 max-[576px]:px-0 max-[479px]:px-0 max-[375px]:px-0 max-[320px]:px-0'>
          <div className={`flex items-center gap-2 max-[479px]:gap-[6px] max-[320px]:gap-2 `}>
            <Link href='/' prefetch={false} className='text-[#212529] hover:!text-[#212529]'>
              <Image
                src={HomeBlackIcon}
                width={18}
                height={18}
                alt=''
                className='max-[479px]:w-[12px] max-[479px]:h-[12px] w-auto h-auto'
              />
            </Link>
            {props?.link1Name && (
              <>
                <div>
                  <div className='w-[3px] h-[3px] rounded-full bg-[#D9D9D9]'></div>
                </div>
                <Link href={props?.link1} prefetch={false} className='text-black hover:!text-black'>
                  <p
                    className={`hover:!text-[#212529] max-[479px]:text-[11px] max-[320px]:!text-[10px] max-[280px]:!text-[9px] capitalize text-neutral-800 text-[13px] font-['Poppins'] leading-[20.80px] ${
                      props?.highlight1 ? 'font-semibold' : ''
                    }`}>
                    {props?.link1Name}
                  </p>
                </Link>
              </>
            )}
            {props?.link2Name && (
              <>
                <div>
                  <div className='w-[3px] h-[3px] rounded-full bg-[#D9D9D9]'></div>
                </div>
                {props?.link2 ? (
                  <Link href={props?.link2} prefetch={false} className='text-black hover:!text-black'>
                    <p
                      className={`text-[13px] hover:!text-[#212529] max-[479px]:text-[11px] max-[320px]:!text-[10px] max-[280px]:!text-[9px] capitalize ${
                        props?.highlight2 ? 'font-semibold' : ''
                      }`}>
                      {props?.link2Name}
                    </p>
                  </Link>
                ) : (
                  <p
                    className={`text-[13px] hover:!text-[#212529] max-[479px]:text-[11px] max-[320px]:!text-[10px] max-[280px]:!text-[9px] capitalize ${
                      props?.highlight2 ? 'font-semibold' : ''
                    }`}>
                    {props?.link2Name}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommonRoundedBreadcrumb
