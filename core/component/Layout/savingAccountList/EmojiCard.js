import React from 'react'
import Image from 'next/image'

// import emojiIcon from '../../../../../public/assets/emoji-icon.svg'
import emojiIcon from '@/public/assets/emoji-icon.svg'

import ReactStars from 'react-stars'

const index = () => {
  const starCount = 5

  return (
    <div className=' container mx-auto  py-[50px] px-[50px]  max-[1024px]:py-3 max-[1024px]:px-8 max-[991px]:max-w-full max-[479px]:px-4 max-[375px]:px-4  max-[320px]:px-4 '>
      <div className=' bg-white py-[50px] px-[32px] flex flex-col gap-[30px] items-center justify-between '>
        <h2 className='text-[#212529] text-center font-poppins text-[36px] max-sm:text-[18px] font-semibold leading-[50px]'>
          Kotak Mahindra Helpline
        </h2>
        <div className='flex h-full justify-between items-center max-sm:flex-col gap-[72px] max-sm:gap-[20px]'>
          <div className=''>
            <p className='text-[#212529]  text-center font-poppins text-[15px] font-normal leading-normal'>
              chat
            </p>
            <p className='text-[#212529] text-center font-poppins text-[18px] font-medium leading-normal break-keep whitespace-wrap'>
              {/* 'https://www.kotak.com/en/digital-banking/ways-to-bank/keya.html' */}
              link texdt is commented here please remove it okay okay 
            </p>
          </div>
          <div className=''>
            <p className='text-[#212529]  text-center font-poppins text-[15px] font-normal leading-normal'>
              call
            </p>
            <p className='text-[#212529]  text-center font-poppins text-[18px] font-medium leading-normal break-normal'>
              89 89 89 89 89
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
