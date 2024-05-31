import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Star from '../../../../public/assets/Star.svg'
import creditCard from '../../../../public/assets/creditcardbanner.svg'


const ExplorePDfBanner = ({url}) => {
  return (
    <div className='flex justify-between bg-[#844FCF] max-[479px]:gap-4  relative h-36 items-center rounded-xl px-16 py-[2.5]  max-[1200px]:px-8 max-[771px]:px-4  max-[1024px]:px-8 max-[576px]:h-full max-[576px]:flex-col max-[576px]:gap-8  max-[576px]:py-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
        <div className='flex items-center gap-8 max-[479px]:flex-col max-[479px]:gap-4  max-[771px]:gap-4 max-[1024px]:gap-4 '>
          <Image src={Star} alt='star' width={9} height={9} />
          <Image
            src={creditCard}
            alt='img_text'
            className='w-[11%] max-[771px]:w-[16%] max-[479px]:w-[26%] max-[479px]:bottom-20'
            width={56}
            height={56}
          />
          <div className='text-[#FFFFFF] text-[20px]  max-[834px]:text-[22px] max-[479px]:text-[22px] font-semibold max-[479px]:text-center  '>
            Discover the perfect credit card to meet your requirements.
          </div>
          <Link href={url} target='_blank'>
            <div className='flex items-center custom-max-content  w-[20%] gap-2 px-5 py-2 pb-[12px] bg-white justify-center rounded-lg '>
              <button className='text-center text-slate-950 text-[18px] font-semibold font-[Faktum] leading-normal'>
                Explore cards
              </button>
            </div>
          </Link>
        </div>
      </div>
  )
}

export default ExplorePDfBanner