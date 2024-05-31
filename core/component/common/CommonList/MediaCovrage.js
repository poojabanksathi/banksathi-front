import Image from 'next/image'
import React from 'react'
import mediaFirst from '../../../../public/assets/mediacovrage-one.svg'
import mediaSec from '../../../../public/assets/media-two.svg'
import mediaThird from '../../../../public/assets/media-three.svg'
import mediaMOobiletwo from '../../../../public/assets/covrage-mobile-sec.svg'
import mediaMOobileone from '../../../../public/assets/covrage-mobile-first.svg'
import Link from 'next/link'
import {useRouter} from 'next/router'

function MediaCovrage() {
  const style = {
    backgroundImage: `url(${mediaFirst.src})`
  }
  const secoundmedia = {
    backgroundImage: `url(${mediaSec.src})`
  }
  const Thirdmedia = {
    backgroundImage: `url(${mediaThird.src})`
  }
  const router= useRouter();
  return (
    <>
      <div className='max-[479px]:px-4'>
        <div className='flex justify-between w-full px-20 max-[1440px]:px-0 mx-auto pb-10  max-[1440px]:w-[90%] max-[1200px]:w-full max-[479px]:justify-center max-[479px]:pb-0 tutorial-resolution'>
          <h2 className='head-text font-[faktum] text-[46px] text-center font-semibold max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[32px] max-[479px]:text-[28px] max-[375px]:text-[24px] max-[320px]:text-[22px] text-[#212529]'>
            Media Coverage
          </h2>
          <Link href="#"  className='text-[#212529] text-center head-text font-[faktum] max-[479px]:hidden text-[18px] p-4 w-[15%] h-full font-semibold border rounded-xl border-[#212529] max-[820px]:w-[20%] max-[576px]:w-[30%] media-seemore' prefetch={false}>
            <button className="cursor-pointer" onClick={()=>router.push("/media-coverage")}> 
            
              Show More
            </button>
          </Link>
        </div>
        <div className='grid grid-cols-2 justify-between w-full px-20 max-[1440px]:px-0 mx-auto h-[60vh] gap-4 max-[1440px]:w-[90%] max-[1200px]:w-full max-[576px]:grid-cols-1 max-[576px]:gap-8 max-[576px]:h-[100vh] max-[479px]:h-full font-[Poppins]'>
          <Link rel='nofollow' href='https://yourstory.com/2023/01/fintech-startup-banksathi-pre-series-a-round' >
            <div
              style={style}
              className=' bg-cover bg-no-repeat bg-center w-full h-full rounded-2xl bg-black relative max-[576px]:hidden'>
              <h3 className='text-[24px] text-white leading-8 w-[90%] font-bold mx-auto pt-8 max-[771px]:text-[18px] media-text-sub max-[479px]:text-[17px]'>
                Fintech startup BankSathi raises $4M in Pre-series a round
              </h3>
            </div>
          </Link>

          <div className='grid  gap-4 max-[576px]:hidden'>
            <Link rel='nofollow' href='https://www.bizzbuzz.news/markets/banksathi-adds-3-languages-to-bring-financial-inclusion-to-its-30-lakh-users-1181086' >
              <div
                style={secoundmedia}
                className=' bg-cover bg-no-repeat bg-center w-full h-full rounded-2xl bg-black relative'>
                <h3 className='text-[24px] text-white leading-8 w-[90%] font-bold mx-auto pt-8 max-[771px]:text-[20px] media-text-sub max-[479px]:text-[17px]'>
                  BankSathi adds 3 languages to bring financial inclusion to its 30 lakh users
                </h3>
              </div>
            </Link>
            <Link rel='nofollow' href='https://economictimes.indiatimes.com/small-biz/sme-sector/kunal-shah-backed-banksathi-adds-3-indian-languages-to-bring-financial-inclusion-to-its-30-lakh-users/articleshow/95200349.cms?from=mdr' >
              <div
                style={Thirdmedia}
                className=' bg-cover bg-no-repeat bg-center w-full h-full rounded-2xl bg-black relative'>
                <h3 className='text-[24px] text-white leading-8  w-[90%] font-bold mx-auto pt-8 max-[771px]:text-[20px] media-text-sub max-[479px]:text-[17px]'>
                  Kunal Shah backed BankSathi adds 3 Indian languages to bring financial inclusion to its 30 lakh users
                </h3>
              </div>
            </Link>
          </div>


          {/* ========= Mobile ======== */}
          <Link href='https://yourstory.com/2023/01/fintech-startup-banksathi-pre-series-a-round' className='relative sm:hidden max-[576px]:flex '  prefetch={false}>

            <div className=''>
              <Image src={mediaFirst} className='w-full' alt='img' />
              <h3 className='text-[24px] text-white leading-8 w-[90%] max-[280px]:leading-5 font-bold mx-auto pt-8 max-[771px]:text-[20px] max-[479px]:text-[17px] max-[280px]:text-[16px] absolute bottom-10 max-[479px]:bottom-6 max-[320px]:bottom-6 left-0 right-0 max-[479px]:leading-6 max-[320px]:text-[15px]'>
                Fintech startup BankSathi raises $4M in Pre-series a round
              </h3>
            </div>
          </Link>

          <div className='grid gap-4 sm:hidden max-[576px]:grid-cols-2 '>
            <Link rel='nofollow' href='https://www.bizzbuzz.news/markets/banksathi-adds-3-languages-to-bring-financial-inclusion-to-its-30-lakh-users-1181086' >
              <div>
                <Image src={mediaMOobileone} className='w-full' alt='img' />
                <h3 className='text-[15px] text-[#212529] leading-4 w-full font-medium mx-auto pt-8 max-[479px]:pt-4 max-[479px]:text-[12px] '>
                  BankSathi adds 3 languages to bring financial inclusion to its 30 lakh users
                </h3>
              </div>
            </Link>
            <Link rel='nofollow' prefetch={false} href='https://economictimes.indiatimes.com/small-biz/sme-sector/kunal-shah-backed-banksathi-adds-3-indian-languages-to-bring-financial-inclusion-to-its-30-lakh-users/articleshow/95200349.cms?from=mdr' >

              <div>
                <Image src={mediaMOobiletwo} className='w-full' alt='img' />
                <h3 className='text-[15px] text-[#212529] leading-4 w-full font-medium mx-auto pt-8 max-[479px]:pt-4 max-[479px]:text-[12px]'>
                  Kunal Shah backed BankSathi adds 3 Indian languages to bring financial inclusion to its 30 lakh users
                </h3>
              </div>
            </Link>
          </div>
        </div>
        <div className='text-center hidden max-[479px]:block mt-8'>
         
          <button className='text-[#212529] cursor-pointer head-text text-[18px] py-2 px-12 w-auto h-full font-semibold border rounded-xl border-[#212529]  max-[576px]:text-[15px] max-[479px]:text-[14px]  capitalize'>
            Show more
          </button>
        </div>
      </div>
    </>
  )
}

export default MediaCovrage
