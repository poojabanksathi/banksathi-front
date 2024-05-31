import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import accordionArrowall from '../../../../../public/assets/accordion-down.svg'
import { CardMobileCalculatorJson } from '@/utils/alljsonfile/cardcalculator'

export default function MortgagesAccordion({ businessCategorydata }) {
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
              <li className='capitalize text-[18px] font-semibold  text-[#212529]'>Calculators</li>
            </ul>
            {acoordiontab ? (
              <Image
                src={accordionArrowall}
                alt='down'
                width={24}
                height={24}
                className='rotate-180 w-6 h-6 shrink-0'
                priority={true}
              />
            ) : (
              <Image src={accordionArrowall} alt='down' width={24} height={24} priority={true} className=' w-6 h-6 shrink-0' />
            )}
          </div>
        </div>
      </h3>
      {acoordiontab ? (
        <ul className='ml-10'>
          {CardMobileCalculatorJson?.map((items, index) => {
            return (
              <>
                {items?.data.map((listData, index) => {
                  return <div key={index}>
                    <ul>
                    <li
                  className={`mt-4 mx-4 duration-200 text-[14px]  pb-2 flex items-center justify-between ${
                    isActive == 1 ? 'isActive-green' : ''
                  } `}
                  onClick={() => setIsActive(1)}>
                  <Link
                    href={`/calculators/${listData.linkpage}`}
                    className=' font-normal text-[#212529] '
                    prefetch={false}>
                    {listData.cardTitle}
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
