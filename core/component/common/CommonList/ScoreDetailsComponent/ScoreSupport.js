import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import SideBar from '../../SiderBarList'
import FAQ from '../../FAQ/FAQ'
import CreditIcon from '../../../../../public/assets/icon-credit.svg'
import ScoreCreditIcon from '../../../../../public/assets/score-icon-credit.svg'

import { ContactUS } from '@/utils/alljsonfile/contactus'

const tabProductsData = [
  { id: 1, title: 'FAQs' },
  { id: 2, title: 'Contact US' }
]

const ScoreSupport = ({ SelectSupportTabs, setSelectSupportTabs, faqdata }) => {
  const [tabs, settab] = useState(0)
  const [siderbar, setSideBar] = useState(false)

  const handleClick = (index) => {
    setSelectSupportTabs(index)
  }

  return (
    <>
      {siderbar ? (
        <div className='transition-all ease-in'>
          <SideBar setSideBar={setSideBar} />
        </div>
      ) : (
        ''
      )}
      <div>
        <div className='pb-[30px] flex justify-between max-[479px]:px-4 items-center max-[479px]:flex-col-reverse max-[479px]:gap-5'>
          <p className='head-text font-[faktum] text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[24px] max-[375px]:text-[24px] max-[320px]:text-[22px] font-semibold  text-[#212529]  max-[576px]:w-full leading-[64.4px] max-[576px]:leading-[50.2px] max-[479px]:leading-10'>
            {SelectSupportTabs === 0 && 'FAQs'}
            {SelectSupportTabs === 1 && 'Contact Us'}
          </p>
          <div className='w-[25%] bg-white max-[1440px]:w-[30%] max-[1200px]:w-[30%] max-[1024px]:w-[26%] max-[834px]:w-[30%] max-[820px]:w-[30%] max-[771px]:w-[30%] h-[56px]  max-[576px]:w-[90%] max-[479px]:w-[60%] max-[375px]:w-[75%] grid grid-cols-2 gap-2 bg-[#F4F8FB] py-2 px-2 justify-between rounded-full items-center  '>
            {tabProductsData?.map((tabsdata, index) => {
              return (
                <>
                  <p
                    className={`text-center cursor-pointer head-text font-[faktum]  font-semibold text-[15px] h-full flex justify-center items-center max-[479px]:text-[14px]  max-[375px]:text-[14px] max-[360px]:text-[13px] max-[320px]:text-[14px] max-[320px]:px-0 mt-0 rounded-full  max-[280px]:text-[12px] ${
                      index == SelectSupportTabs ? 'bg-[#844FCF] text-white' : 'text-[#212529]'
                    }`}
                    onClick={() => handleClick(index)}>
                    {tabsdata.title}
                  </p>
                </>
              )
            })}
          </div>
        </div>

        {SelectSupportTabs === 0 && (
          <>
            <div className='flex gap-4 pb-[30px] max-[479px]:px-4 h-24'>
              <div
                className={` rounded-lg  px-5 py-4 flex items-center gap-3  ${
                  tabs == 0
                    ? 'bg-[#E9DFF6] border-2 border-[#A882DD] max-[479px]:px-4'
                    : 'text-[#212529] max-[479px]:px-4 bg-white border-2 border-white'
                }`}
                onClick={() => settab(0)}>
                <Image src={CreditIcon} alt='CreditIcon' className='' />
                

                <p
                  className='text-center cursor-pointer head-text font-[faktum]  font-semibold text-[15px] max-[479px]:text-[12px] max-[479px]:px-2 max-[375px]:px-0 max-[375px]:text-[12px] max-[320px]:text-[10px] max-[320px]:px-0 mt-0
            '>
                  Credit Card
                </p>
              </div>
              <div
                className={` rounded-lg  px-5 py-4 flex items-center gap-3 bg-contain  ${
                  tabs == 1
                    ? 'bg-[#E9DFF6] border-2 border-[#A882DD] max-[479px]:px-4'
                    : 'text-[#212529] max-[479px]:px-4 bg-white border-2 border-white'
                }`}
                onClick={() => settab(1)}>
                <Image src={ScoreCreditIcon} alt='ScoreCreditIcon' className='' />
               

                <p
                  className='text-center cursor-pointer  font-[faktum]  font-semibold text-[15px] max-[479px]:text-[12px] max-[479px]:px-2 max-[375px]:text-[12px] max-[320px]:text-[10px] max-[320px]:px-0 mt-0 
            '>
                  Credit Score
                </p>
              </div>
            </div>
            <FAQ faqdata={faqdata} SelectSupportTabs={SelectSupportTabs} />
          </>
        )}

        {SelectSupportTabs === 1 && (
          <>
            <div className='pb-5 max-[479px]:px-4'>
              <p className='text-[24px] text-[#212529] font-semibold leading-[33.6px]'>How can I Help you?</p>
              <p className='text-[#212529] text-[15px] font-normal leading-[24px] w-[78%]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation{' '}
              </p>
            </div>

            <div className='max-[479px]:px-4 max-[479px]:pb-14'>
              <div className='bg-white rounded-3xl p-[30px] max-[576px]:px-[40px]'>
                <div className='grid grid-cols-3 max-[576px]:grid-cols-1 max-[576px]:gap-0 '>
                  <div className='border-r px-8 max-[834px]:px-4 max-[576px]:!border-r-0 max-[576px]:!border-b max-[576px]:pb-8 max-[576px]:px-0'>
                    <Image src={ContactUS?.callicon} alt='img' width={30} height={30} className='pb-6 ' />

                    <div>
                      <p className='text-[15px] text-[#212529] font-normal leading-[15px] pb-3'>Toll free number</p>
                      <Link
                        href='tel:+91 7412933933'
                        className='leading-[18px] text-[18px] text-[#212529] font-medium max-[771px]:text-[16px]'
                        prefetch={false}>
                        {ContactUS.callnumber}
                      </Link>
                      <p className='leading-[21px] text-[15px] max-[576px]:text-[13px] text-[#212529] mt-3'>
                        {ContactUS.calltime}
                      </p>
                    </div>
                  </div>
                  <div className='border-r px-8 max-[834px]:px-4 max-[576px]:!border-r-0 max-[576px]:!border-b max-[576px]:py-8 max-[576px]:px-0'>
                    <Image src={ContactUS?.emailicon} alt='img' width={30} height={30} className='pb-6 ' />

                    <div>
                      <p className='text-[15px] text-[#212529] font-normal leading-[15px] pb-3'>
                        {ContactUS?.emailtitleprofile}
                      </p>
                      <Link
                        href='mailto:Customer@banksathi.com'
                        className='leading-[18px] text-[18px] text-[#212529] font-medium max-[771px]:text-[16px]'
                        prefetch={false}>
                        {ContactUS?.email}
                      </Link>
                      <p className='leading-[21px] text-[15px] max-[576px]:text-[13px] text-[#212529] mt-3'>
                        {ContactUS?.anytime}
                      </p>
                    </div>
                  </div>
                  <div className='px-8 max-[834px]:px-4 max-[576px]:pt-8 max-[576px]:px-0 '>
                    <Image src={ContactUS?.locicon} alt='img' width={30} height={30} className='pb-6 ' />

                    <div>
                      <p className='leading-[24px] text-[15px] max-[576px]:text-[13px] text-[#212529] mb-2'>
                        {ContactUS.meetsub}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ScoreSupport
