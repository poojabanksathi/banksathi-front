import React from 'react'
import Image from 'next/image'

// import emojiIcon from '../../../../../public/assets/emoji-icon.svg'
import emojiIcon from '@/public/assets/emoji-icon.svg'

import ReactStars from 'react-stars'

const index = () => {
  const starCount = 5

  return (
    <div className=' container mx-auto  py-[50px] px-[50px]  max-[1024px]:py-3 max-[1024px]:px-8 max-[991px]:max-w-full max-[479px]:px-4 max-[375px]:px-4  max-[320px]:px-4 '>
      <div className=' bg-white rounded-3xl pt-[25px] pb-[47px] px-[32px] flex flex-col gap-[30px] items-center justify-between '>
        <h2 className='text-[#212529] text-center font-poppins text-[36px] max-sm:text-[18px] font-semibold leading-[50px]'>
          Kotak Mahindra Helpline
        </h2>
        <div className='flex h-full justify-between items-center max-sm:flex-col gap-[72px] max-sm:gap-[20px]'>
          <div className='flex flex-col'>
            <div className="text-center text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-relaxed">
              Chat
            </div>
            <div className='text-[#212529] text-center font-poppins text-[18px] font-medium leading-normal max-sm:text-[15px]'>
              https://www.kotak.com/en/digital-banking/ways-to-bank/keya.html
            </div>
          </div>
          <div className='flex flex-col'>
            <div className="text-center text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-relaxed">
              call
            </div>
            <div className='text-[#212529]  text-center font-poppins text-[18px] font-medium leading-normal max-sm:text-[15px]'>
              89 89 89 89 89
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
