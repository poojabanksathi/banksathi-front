import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import accordionArrowall from '../../../../../public/assets/accordion-down.svg'

export default function ResourceAccordion({ headerclose, businessCategorydata }) {
  const [isActive, setIsActive] = useState(0)
  const [acoordiontab, setAcoordiontab] = useState(false)

  const handleAccordion = () => {
    setAcoordiontab(!acoordiontab)
  }
  return (
    <>
      <div>
        <h3 id='accordion-flush-heading-1 '>
          <div className='px-4 mb-8'>
            <div
              className={`flex justify-between border-b items-center ${acoordiontab ? 'isActive-green' : ''}`}
              onClick={() => handleAccordion()}>
              <ul>
                <li className='capitalize text-[18px] font-semibold text-[#212529]'>
                  {businessCategorydata?.productInfo[2]?.title}
                </li>
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
                <Image src={accordionArrowall} alt='down' width={24} height={24} priority={true} className='w-6 h-6 shrink-0' />
              )}
            </div>
          </div>
        </h3>

        {acoordiontab ? (
          <>
            <ul>
              <li
                className={`mt-4 mx-4 duration-200 text-[14px]  pb-2 flex items-center justify-between ${isActive == 1 ? 'isActive-green' : ''
                  }`}
                onClick={() => setIsActive(1)}>
                <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                  Life Insurance
                </Link>

                {isActive === 1 ? (
                  <Image
                    src={accordionArrowall}
                    alt='down'
                    width={24}
                    height={24}
                    className='rotate-180 w-6 h-6 shrink-0'
                    priority={true}
                  />
                ) : (
                  <Image src={accordionArrowall} alt='down' width={24} height={24} priority={true} className='w-6 h-6 shrink-0' />
                )}
              </li>
              {isActive === 1 && (
                <div aria-labelledby='accordion-flush-heading-1 '>
                  <ul className='bg-white p-4 '>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Term Life Insurance
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Whole Life Insurance
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Joint Life Insurance
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Unversal Life Insurance
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </ul>

            <ul>
              <li
                className={`mt-4 mx-4 duration-200 text-[14px]  pb-2 flex items-center justify-between ${isActive == 2 ? 'isActive-green' : ''
                  } `}
                onClick={() => setIsActive(2)}>
                <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                  Health or Medicare Insurance
                </Link>

                {isActive === 2 ? (
                  <Image
                    src={accordionArrowall}
                    alt='down'
                    width={24}
                    height={24}
                    className='rotate-180 w-6 h-6 shrink-0'
                    priority={true}
                  />
                ) : (
                  <Image src={accordionArrowall} alt='down' width={24} height={24} priority={true} className='w-6 h-6 shrink-0' />
                )}
              </li>
              {isActive === 2 && (
                <div aria-labelledby='accordion-flush-heading-1 '>
                  <ul className='bg-white p-4 '>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Family Health Insurance
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Individual Health Insurance
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Group Health Insurance
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Maternity Health Insurance
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Health Insurance For Diabetes
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Heart Health Insurance
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Super Top Up Health Insurance
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Cancer Insurance
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Critical Illness Insurance
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </ul>

            <ul>
              <li
                className={`mt-4 mx-4 duration-200 text-[14px]  pb-2 flex items-center justify-between ${isActive == 3 ? 'isActive-green' : ''
                  }`}
                onClick={() => setIsActive(3)}>
                <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                  Auto or Vehicle Insurance
                </Link>

                {isActive === 3 ? (
                  <Image
                    src={accordionArrowall}
                    alt='down'
                    width={24}
                    height={24}
                    priority={true}
                    className='rotate-180 w-6 h-6 shrink-0'
                  />
                ) : (
                  <Image src={accordionArrowall} alt='down' width={24} height={24} priority={true} className='w-6 h-6 shrink-0' />
                )}
              </li>
              {isActive === 3 && (
                <div aria-labelledby='accordion-flush-heading-1 '>
                  <ul className='bg-white p-4 '>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false} >
                        Two-wheeler loan
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false} >
                        Three-wheeler loan
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false} >
                        Four-wheeler loan
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false} >
                        Commercial vehicle loan
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </ul>

            <ul>
              <li
                className={`mt-4 mx-4 duration-200 text-[14px]  pb-2 flex items-center justify-between ${isActive == 4 ? 'isActive-green' : ''
                  } `}
                onClick={() => setIsActive(4)}>
                <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                  Homeowners Insurance
                </Link>

                {isActive === 4 ? (
                  <Image
                    src={accordionArrowall}
                    alt='down'
                    width={24}
                    height={24}
                    priority={true}
                    className='rotate-180 w-6 h-6 shrink-0'
                  />
                ) : (
                  <Image src={accordionArrowall} alt='down' width={24} height={24} priority={true} className='w-6 h-6 shrink-0' />
                )}
              </li>
              {isActive === 4 && (
                <div aria-labelledby='accordion-flush-heading-1 '>
                  <ul className='bg-white p-4 '>

                  </ul>
                </div>
              )}
            </ul>

            <ul>
              <li
                className={`mt-4 mx-4 duration-200 text-[14px]  pb-2 flex items-center justify-between ${isActive == 5 ? 'isActive-green' : ''
                  }`}
                onClick={() => setIsActive(5)}>
                <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                  Renters Insurance
                </Link>

                {isActive === 5 ? (
                  <Image
                    src={accordionArrowall}
                    alt='down'
                    width={24}
                    height={24}
                    priority={true}
                    className='rotate-180 w-6 h-6 shrink-0'
                  />
                ) : (
                  <Image src={accordionArrowall} alt='down' width={24} height={24} priority={true} className='w-6 h-6 shrink-0' />
                )}
              </li>
              {isActive === 5 && (
                <div aria-labelledby='accordion-flush-heading-1 '>
                  <ul className='bg-white p-4 '></ul>
                </div>
              )}
            </ul>

            <ul>
              <li
                className={`mt-4 mx-4 duration-200 text-[14px]  pb-2 flex items-center justify-between ${isActive == 6 ? 'isActive-green' : ''
                  } `}
                onClick={() => setIsActive(6)}>
                <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                  Pet Insurance
                </Link>

                {isActive === 6 ? (
                  <Image
                    src={accordionArrowall}
                    alt='down'
                    width={24}
                    height={24}
                    priority={true}
                    className='rotate-180 w-6 h-6 shrink-0'
                  />
                ) : (
                  <Image src={accordionArrowall} alt='down' width={24} height={24} priority={true} className='w-6 h-6 shrink-0' />
                )}
              </li>
              {isActive === 6 && (
                <div aria-labelledby='accordion-flush-heading-1 '>
                  <ul className='bg-white p-4 '></ul>
                </div>
              )}
            </ul>

            <ul className='pl-[42px]'>
              <li
                className='mt-4 mx-4 duration-200 text-[14px]  flex items-center justify-between'
                onClick={() => setIsActive(7)}>
                <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                  Travel Insurance
                </Link>

                {isActive === 7 ? (
                  <Image
                    src={accordionArrowall}
                    alt='down'
                    width={24}
                    height={24}
                    priority={true}
                    className='rotate-180 w-6 h-6 shrink-0'
                  />
                ) : (
                  <Image src={accordionArrowall} alt='down' width={24} height={24} priority={true} className='w-6 h-6 shrink-0' />
                )}
              </li>
              {isActive === 7 && (
                <div aria-labelledby='accordion-flush-heading-1 '>
                  <ul className='bg-white p-4 '>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        International Travel Insurance
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Student Travel Insurance
                      </Link>
                    </li>
                    <li className='  w-full hover:text-[#a882dd] duration-200 text-[14px] mb-3 pb-1 '>
                      <Link href='#' className=' font-normal text-[#212529] ' prefetch={false}>
                        Group Travel Insurance
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </ul>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  )
}
