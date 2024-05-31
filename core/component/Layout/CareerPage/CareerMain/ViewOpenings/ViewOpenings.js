import Image from 'next/image'
import React from 'react'
import openingsImage from '../../../../../../public/assets/openings-image.svg'
import rightArrow from '../../../../../../public/assets/rightArrow.svg'
import { useWindowSize } from '@/hooks/useWindowSize'

const ViewOpenings = () => {
  const size = useWindowSize()
  return (
    <>
      <div className='pt-[50px] container mb-[100px] mx-auto px-20 max-[991px]:max-w-full max-[1440px]:px-0 pb-0 max-[1200px]:px-0 max-[1024px]:px-8 max-[576px]:px-6 max-[479px]:px-4  max-[479px]:pt-[30px] max-[280px]:px-0 max-sm:mb-[40px]'>
        <div className='flex justify-between bg-white w-full max-[1440px]:w-[90%] max-[1200px]:w-full mx-auto max-[479px]:gap-0 relative h-[250px] items-center rounded-3xl px-16 py-[2.5] max-[771px]:px-4  max-[1024px]:px-8 max-[576px]:h-full max-[576px]:flex-col max-[576px]:gap-8  max-[576px]:py-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 credit-having-box  max-[479px]:pt-[100px] max-[375px]:pt-24 recometroble-card max-[479px]:mt-12 max-[375px]:mt-20  max-[320px]:mt-20'>
          <div className='flex items-center gap-8 max-[1200px]:gap-4 max-[479px]:flex-col max-[479px]:gap-4  max-[771px]:gap-4  '>
            <div className='relative bottom-[0.6rem] w-[26%] max-[1200px]:w-[20%] max-[1024px]:w-[22%] max-[1024px]:bottom-[0.6rem] max-[991px]:w-[25%] max-[1200px]:bottom-[0.3rem] max-[834px]:w-[36%] max-[820px]:w-[37%] max-[771px]:w-[38%] max-[479px]:w-[35%] max-[479px]:bottom-40 max-[425px]:!bottom-44 max-[375px]:!bottom-44 max-[320px]:bottom-44 max-[320px]:w-[40%] having-user-img max-[479px]:absolute  max-[280px]:w-[44%] max-[280px]:bottom-44 view-openings-responsive'>
              <Image
                src={openingsImage}
                height={size?.width >= 1200 || size?.width >= 771 ? 301 : 200}
                width={size?.width >= 1200 || size?.width >= 771 ? 230 : 150}
                alt='image'
              />
            </div>
            <div className='flex flex-col items-center justify-center !pt-[1rem] ml-[10px] max-sm:mb-[20px] max-[771px]:items-center'>
              <div className='flex justify-center items-center text-neutral-800 text-[46px] font-semibold leading-[64.40px] max-sm:text-[22px] max-sm:leading-[30px] max-sm:text-center max-[771px]:text-[22px] max-[771px]:leading-[30px]'>
                Explore opportunities
                <br />
                at BankSathi
              </div>
              <div className='pt-[10px]'>
                <div className='flex justify-center items-center w-auto text-neutral-800 text-lg font-normal leading-[28.80px] mb-[10px] max-sm:text-center max-sm:text-[12px] max-sm:leading-[20px] max-[771px]:text-[12px] max-[771px]:leading-[20px]'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, {size?.width >= 576 ? <br /> : ''}
                  sed, Lorem ipsum dolor sit amet, consectetur adipiscing
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div className='head-text font-[faktum] text-center bg-[#49D49D] !text-[#212529] py-2 pl-2 pr-2 rounded-lg text-lg w-[210px] h-[56px] mx-auto flex items-center justify-center gap-4 max-sm:w-[160px] max-sm:h-[40px] max-sm:text-[12px]'>
            <button className=' cursor-pointer'>View Openings</button>
            <Image
              src={rightArrow}
              alt='img'
              className='w-[34px] h-[30px] max-sm:w-[25px] max-sm:h-[10px]'
              height={40}
              width={50}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewOpenings
