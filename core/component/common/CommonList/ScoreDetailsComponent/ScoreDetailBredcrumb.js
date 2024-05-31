import Image from 'next/image'
import React from 'react'
import HomeIcon from '../../../../../public/assets/home-icon.svg'
import accordionArrowall from '../../../../../public/assets/accordion-down.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'

function ScoreDetailBredcrumb({ productDetailsData }) {

  const router = useRouter()


  const routebredcrumb = router?.pathname?.split('/')[2];
  const routesecgeneral = router?.pathname?.split('/')[1];


  function convertToTitleCase(routebredcrumb) {
    return routebredcrumb?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  function BredcrumbGeneral(routesecgeneral) {
    return routesecgeneral?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  const slug = routebredcrumb;
  const slugGeneral = routesecgeneral;
  const convertedStringRoute = convertToTitleCase(slug);
  const genralStringRoute = BredcrumbGeneral(slugGeneral);

  console.log("slugslugslug", slug, routebredcrumb, routebredcrumb);


  return (
    <>
      <div className='py-5 px-8 max-[1440px]:px-8 max-[1200px]:px-4 max-[1024px]:px-0  max-[479px]:px-4'>
        <div className='flex items-center gap-[2px] justify-start max-[479px]:gap-[2px] max-[320px]:gap-0 max-[479px]:justify-center'>
          <Link href='/' prefetch={false} className='text-[#212529] hover:!text-[#212529]'>
            <Image src={HomeIcon} width={18} height={18} alt='Home' className='max-[479px]:w-[12px] max-[479px]:h-[12px]' />
          </Link>
          <div>
            <Image src={accordionArrowall} width={14} height={14} priority={true} className='w-5 h-5 max-[320px]:w-4 max-[320px]:h-4 rotate-[270deg]' alt='img' />
          </div>
          <Link href="/cibil-credit-score-check" prefetch={false} className='text-[#212529] hover:!text-[#212529]'>
            <p className='text-[13px] text-[#212529] hover:!text-[#212529]  max-[479px]:text-[11px] max-[320px]:!text-[10px] max-[280px]:!text-[9px] capitalize'>
              {/* Check Now          */}
              {genralStringRoute}
            </p>
          </Link>
          {convertedStringRoute && (
            <>
              <div>
                <Image src={accordionArrowall} width={14} height={14} priority={true} className='w-5 h-5 max-[320px]:w-4 max-[320px]:h-4 rotate-[270deg]' alt='img' />
              </div>
              <p className='text-[13px] text-[#212529] font-semibold max-[479px]:text-[11px] max-[320px]:!text-[10px] max-[280px]:!text-[9px]'>
                {convertedStringRoute}
              </p>
            </>)}
        </div>
      </div>
    </>
  )
}

export default ScoreDetailBredcrumb
