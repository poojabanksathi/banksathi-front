import Image from 'next/image'
import React from 'react'
import HomeBlackIcon from '../../../../../public/assets/home-black.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'
import accordionArrowall from '../../../../../public/assets/accordion-down.svg'
function BredcrumbCalculator() {
  const router = useRouter()

  const routebredcrumb = router?.query['blog-details']
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
  const slugGeneral = routesecgeneral
  const convertedStringRoute = convertToTitleCase(slug)
  const genralStringRoute = BredcrumbGeneral(slugGeneral)
  return (
    <>
      <div className='container h-full mx-auto max-[991px]:max-w-full  max-[1024px]:px-0 max-[479px]:px-0 max-[375px]:px-0 max-[320px]:px-0'>
        <div className='pt-5 px-14 max-[1440px]:px-14 max-[1200px]:px-0 max-[1024px]:px-4 items-center max-[576px]:grid-cols-1 max-[576px]:gap-8  max-[479px]:px-0'>
          <div className='flex items-center gap-2  max-[479px]:gap-[2px] max-[320px]:gap-0'>
            {convertedStringRoute ? (
              <Link href='/' prefetch={false} className='text-[#212529] hover:!text-[#212529]'>
                <Image
                  src={HomeBlackIcon}
                  width={18}
                  height={18}
                  alt='img'
                  className='max-[479px]:w-[12px] max-[479px]:h-[12px] w-auto h-auto'
                />
                {/* <p className='text-[13px] text-[#212529] max-[479px]:text-[10px] '>Homepage</p> */}
              </Link>
            ) : (
              <Link href='/' prefetch={false} className='text-black hover:!text-[#212529]'>
                <Image
                  src={HomeBlackIcon}
                  width={18}
                  height={18}
                  alt='img'
                  className='max-[479px]:w-[12px] max-[479px]:h-[12px] w-auto h-auto'
                />
                {/* <p className='text-[13px] text-[#212529] max-[479px]:text-[10px] '>Homepage</p> */}
              </Link>
            )}
            <div>
              {/* <div className='w-[3px] h-[3px] rounded-full bg-[#D9D9D9]'></div> */}
              <Image
                src={accordionArrowall}
                width={14}
                height={14}
                priority={true}
                className='w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 rotate-[270deg]'
                alt='img'
              />
            </div>
            <Link href='/blog' prefetch={false} className='text-black hover:!text-black'>
              <p
                className={`text-[13px] ${convertedStringRoute ? 'text-[#212529]' : 'text-[#212529]'} hover:${
                  convertedStringRoute ? '!text-[#212529]' : '!text-[#212529]'
                }  max-[479px]:text-[11px] max-[320px]:!text-[10px] max-[280px]:!text-[9px] capitalize`}>
                {/* Check Now          */}
                {genralStringRoute}
              </p>
            </Link>
            {convertedStringRoute && (
              <>
                {/* <div>
                  <Image
                src={accordionArrowall}
                width={14}
                height={14}
                priority={true}
                className='w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 rotate-[270deg]'
                alt='img'
              />
                </div>
                <p
                  className={`text-[13px] ${
                    convertedStringRoute ? 'text-[#212529]' : 'text-[#212529]'
                  } font-semibold max-[479px]:text-[11px] max-[320px]:!text-[10px] max-[280px]:!text-[9px]`}>
                  {convertedStringRoute}
                </p> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default BredcrumbCalculator
