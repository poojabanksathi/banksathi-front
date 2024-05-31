import { KeyScorefactore } from '@/utils/alljsonfile/keyfactorescore'
import React from 'react'
import ScorePlayer from '../../../../../public/assets/score-player.svg'
import KeyBgcredit from '../../../../../public/assets/key-factor-credit.svg'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import VedioCheck from '@/core/component/common/VedioCheck'

const style = {
  backgroundImage: `url(${KeyBgcredit.src})`
}

function KeyFactore() {
  return (
    <div>
      <h1 className=' text-[#212529] head-text font-[faktum] max-[834px]:leading-[50px] max-[479px]:leading-10 text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[32px] max-[479px]:text-[26px] max-[375px]:text-[26px] max-[320px]:text-[22px] leading-[64.4px] w-[48%] max-[1440px]:w-[58%] max-[1200px]:!w-[74%] max-[576px]:!w-full font-semibold text-center mx-auto emproving-title'>
        Key Factors Impacting Your Credit Score
      </h1>
      <div className='grid grid-cols-4 gap-16 max-[834px]:gap-4 max-[771px]:grid-cols-2 justify-around text-lg pt-[50px] pb-[70px] items-baseline   max-[1200px]:w-full max-[576px]:grid-cols-1 max-[576px]:gap-8 max-[479px]:py-[30px]'>
        {KeyScorefactore.map((factordata, index) => {
          return (
            <div key={index}>
              <div>
                <div className='step-one bg-[#E9DFF6] p-4 rounded-full w-[90px] h-[90px] mx-auto flex items-center justify-center mb-2'>
                  <p className='head-text text-[#844FCF] text-[36px] font-semibold max-[479px]:text-[36px]'>
                    {factordata?.factornum}
                  </p>
                </div>
                <div className='pt-[30px] max-[771px]:pt-4'>
                  <p className='head-text font-semibold text-[18px] text-center pb-3 text-[#212529]'>
                    {factordata?.factortitle}{' '}
                  </p>
                  <p className='text-[#212529] text-[15px] font-normal  text-center mx-auto mt-0 font-[Poppins]'>
                    {factordata?.factoresubtitle}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <VedioCheck productDetailsData={{video_url:'https://youtu.be/XHIR6JdhNZc'}} hideTitle={true}/>
    </div>
  )
}

export default KeyFactore
