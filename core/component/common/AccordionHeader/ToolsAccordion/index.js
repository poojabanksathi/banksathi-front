import React, { useState } from 'react'
import Link from 'next/link'
import accordionArrowall from '../../../../../public/assets/accordion-down.svg'
import Image from 'next/image'
import { ScoreCreditJson } from '@/utils/alljsonfile/mobilefooterdata'

export default function ToolsAccordion({ businessCategorydata, headerclose }) {
  const [isActive, setIsActive] = useState(0)
  const [acoordiontab, setAcoordiontab] = useState(true)

  const handleAccordion = () => {
    setAcoordiontab(!acoordiontab)
  }
  return (
    
    <>
    <h3 id='accordion-flush-heading-1 '>
      <div className='px-4 mb-8'>
        <div
          className={`flex justify-between border-b items-center ${acoordiontab ? 'isActive-green' : ''}`}
          onClick={() => handleAccordion()}>
          <ul>
            <li className='capitalize text-[18px] font-semibold  text-[#212529]'>{ScoreCreditJson?.[0]?.title}</li>
          </ul>
          {acoordiontab ? (
            <Image
              src={accordionArrowall}
              alt='down'
              width={24}
              height={24}
              priority={true}
              className='rotate-180 w-6 h-6 shrink-0'
            />
          ) : (
            <Image src={accordionArrowall} alt='down' width={24} height={24} priority={true} className=' w-6 h-6 shrink-0' />
          )}
        </div>
      </div>
    </h3>
    {acoordiontab ? (
      <ul className='ml-10'>
      {ScoreCreditJson.map((items,index)=>{
        return(
          <>
          {items?.data?.map((dataList,index)=>{
            return <div key={index}>
            <ul>
            <li
          className={`mt-4 mx-4 duration-200 text-[14px]  pb-2 flex items-center justify-between ${
            isActive == 1 ? 'isActive-green' : ''
          } `}
          onClick={() => setIsActive(1)}>
          <Link href={`/${dataList.linkhref}`} className=' font-normal text-[#212529] ' prefetch={false}>
            {dataList.detaildata}
          </Link>
        </li>
            </ul>
            </div>
          })}
     
          </>
        )
      })}
      </ul>
    ) : (
      ''
    )}
  </>
  )
}
