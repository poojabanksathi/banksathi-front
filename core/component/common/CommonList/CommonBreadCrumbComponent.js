import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import accordionArrowall from '../../../../public/assets/accordion-down.svg'
import HomeIcon from '../../../../public/assets/home-icon.svg'
import { getLink } from '@/utils/util'

const CommonBreadCrumbComponent = React.memo(({ link1, link1Name, link2, link2Name, link3Name }) => {
  const secure = 'https:/'
  
  // Memoize breadcrumb JSON-LD data
  const breadCrumbJsonLd = useMemo(() => {
    const postionLists = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${secure}/${process.env.NEXT_PUBLIC_WEBSITE_URL}` },
      { '@type': 'ListItem', position: 2, name: link1Name, item: getLink(link1) },
      ...(link2Name ? [{ '@type': 'ListItem', position: 3, name: link2Name, item: getLink(link2) }] : []),
      ...(link3Name ? [{ '@type': 'ListItem', position: 4, name: link3Name }] : []),
    ]

    const jsonObj = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: postionLists
    }

    const jsonBreadCrumb = JSON.stringify(jsonObj)

    return {
      __html: jsonBreadCrumb
    }
  }, [link1, link1Name, link2, link2Name, link3Name])

  return (
    <>
      <Head>
        <script type='application/ld+json' key='app-ld-json' dangerouslySetInnerHTML={breadCrumbJsonLd} />
      </Head>
      <div className='container mx-auto px-4 sm:px-8 md:px-10 lg:px-12'>
        <div className='pt-5 flex items-center gap-2'>
          <Link href='/' prefetch={false} className='text-[#212529] hover:text-[#212529]'>
            <Image src={HomeIcon} width={18} height={18} alt='Home' priority className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
          </Link>
          <Image src={accordionArrowall} width={14} height={14} alt='Arrow' className='w-5 h-5 rotate-[270deg]' />
          <Link
              href={`${link1}`}
              prefetch={false}
              className='text-[#212529] hover:!text-[#212529] bredcrumb-title-respo'>
              <p className='text-[13px]  max-[771px]:text-[10px]text-[#212529] max-[479px]:text-[10px] max-[430px]:text-[9px] max-[375px]:!text-[8px] max-[320px]:!text-[10px] max-[280px]:text-[8px] '>
                {link1Name}
              </p>
            </Link>
            {link2Name && (
              <>
                {link2 && (
                  <div>
                    <Image
                      src={accordionArrowall}
                      width={14}
                      height={14}
                      priority={true}
                      className='w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 rotate-[270deg]'
                      alt='Arrow'
                    />
                  </div>
                )}
                {link2 ? (
                  <Link
                    href={`${link2}`}
                    prefetch={false}
                    className='text-[#212529] hover:!text-[#212529] bredcrumb-title-respo'>
                    <p className='text-[13px] max-[771px]:text-[13px] max-[479px]:text-[10px] max-[375px]:!text-[8px] max-[320px]:!text-[10px] max-[280px]:text-[8px] capitalize'>
                      {link2Name}
                    </p>
                  </Link>
                ) : (
                  <div className='text-[#212529] hover:!text-[#212529] bredcrumb-title-respo'>
                    <p className='text-[13px] text-[#212529] max-[771px]:text-[13px] hover:!text-[#212529]  max-[479px]:text-[10px] max-[375px]:!text-[8px] max-[320px]:!text-[10px] max-[280px]:text-[8px] capitalize'>
                      {link2Name}
                    </p>
                  </div>
                )}
              </>
            )}
          {/* Uncomment and adapt as needed for link3Name */}
          {/* {link3Name && (
            <>
              <Image src={accordionArrowall} width={14} height={14} alt='Arrow' className='w-5 h-5 rotate-90' />
              <p className='text-xs sm:text-sm md:text-base font-semibold'>{link3Name}</p>
            </>
          )} */}
        </div>
      </div>
    </>
  )
})

export default CommonBreadCrumbComponent
