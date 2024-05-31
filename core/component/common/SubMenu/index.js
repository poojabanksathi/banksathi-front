import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CloseIcon from '../../../../public/assets/closeIcon.svg'
import { topBanksMenuData, topMenuLoanData, topmenusData } from '@/utils/alljsonfile/topmenusubtitle'
import { CardMobileCalculatorJson } from '@/utils/alljsonfile/cardcalculator'
import { ScoreCreditJson } from '@/utils/alljsonfile/mobilefooterdata'
import menuBorder from '../../../../public/assets/menuBorderPurple.svg'

export default function CreditSubmenu({ footerMobileShow, sethoverClose, hoverclose }) {
  const [toppickLink, setToppickLink] = useState(0)
  const [activeCategory, setActiveCategory] = useState(1)
  const [subCategoryData, setSubCategoryData] = useState(topmenusData)

  useEffect(() => {
    if (activeCategory === 1) setSubCategoryData(topmenusData)
    if (activeCategory === 2) setSubCategoryData(topBanksMenuData)
    if (activeCategory === 3) setSubCategoryData(topMenuLoanData)
  }, [activeCategory])

  return (
    <>
      <div
        className={
          footerMobileShow == 'All Products '
            ? 'h-full '
            : `${hoverclose ? '' : ' nav_top_submenu container max-[991px]:max-w-full mx-auto'}  `
        }>
        {!hoverclose && (
          <>
            <button
              type='button'
              className={`text-[#212529] cursor-pointer rounded  absolute z-10 right-2 top-2 xl:right-16 xl:top-4 lg:right-8 md:right-8 sm:right-8 sm:top-4 xs:right-4 xs:top-2 max-[767px]:hidden
          `}
              onClick={() => sethoverClose(!hoverclose)}>
              <Image src={CloseIcon} width={16} height={16} priority={true} className='' alt='CloseIcon' />
            </button>
            <div className='px-20 py-[30px] max-[1200px]:px-12 max-[1024px]:py-6 max-[1024px]:px-8  relative h-full'>
              <div className='grid grid-cols-4  max-[771px]:grid-cols-3   h-[85%] menulist-static'>
                <div className='flex flex-row gap-[20px] mt-[20px]'>
                  <div className='flex flex-col'>
                    <div>
                      <>
                        <div className='flex flex-row gap-[80px] items-center'>
                          <div
                            onMouseOver={() => setActiveCategory(1)}
                            className={`${
                              activeCategory === 1 ? 'text-violet-600 ' : 'text-neutral-800'
                            } text-[17.5px] font-semibold font-['Poppins'] leading-[28.80px] p-2 pt-[20px] cursor-pointer`}>
                            Credit Card
                          </div>
                          {activeCategory === 1 && (
                            <div className='relative left-[10%]'>
                              <Image src={menuBorder} width={4} height={60} className='' alt='menuBorder' />
                            </div>
                          )}
                        </div>
                      </>
                      <>
                        <div className='flex flex-row gap-[50px] items-center'>
                          <div
                            onMouseOver={() => setActiveCategory(2)}
                            className={`${
                              activeCategory === 2 ? 'text-violet-600 ' : 'text-neutral-800'
                            } text-[17.5px] font-semibold font-['Poppins'] leading-[28.80px] p-2 pt-[18px] cursor-pointer`}>
                            Bank Accounts
                          </div>
                          {activeCategory === 2 && (
                            <div className='relative left-[11%]'>
                              <Image src={menuBorder} width={4} height={60} className='' alt='menuBorder' />
                            </div>
                          )}
                        </div>
                      </>
                      <>
                        <div className='flex flex-row gap-[50px] items-center'>
                          <div
                            onMouseOver={() => setActiveCategory(3)}
                            className={`${
                              activeCategory === 3 ? 'text-violet-600 ' : 'text-neutral-800'
                            } text-[17.5px] font-semibold font-['Poppins'] leading-[28.80px] p-2 pt-[18px] cursor-pointer`}>
                            Personal Loan
                          </div>
                          {activeCategory === 3 && (
                            <div className='relative left-[11%]'>
                              <Image src={menuBorder} width={4} height={60} className='' alt='menuBorder' />
                            </div>
                          )}
                        </div>
                      </>
                    </div>
                  </div>
                  <div className='border-r h-full border-slate-200' />
                </div>
                {subCategoryData &&
                  subCategoryData?.length > 0 &&
                  subCategoryData?.map((topmenulist, index) => {
                    return (
                      <div key={index}>
                        <div
                          className={
                            footerMobileShow == 'All Products'
                              ? '  w-full px-5  h-full max-[771px]:px-4  border-r  overflow-y-auto max-[834px]:px-4 '
                              : ' w-full px-5 h-full  max-[771px]:px-4  border-r  overflow-y-auto max-[834px]:px-4'
                          }>
                          <div>
                            <>
                              <p className='p-2 mt-2 text-[13px] font-bold text-[#212529] pt-[15px] max-[820px]:px-0'>
                                {topmenulist?.title?.toUpperCase()}
                              </p>
                              <ul>
                                {topmenulist?.data?.map((categorydata, subindex) => {
                                  return (
                                    <div key={subindex}>
                                      <li
                                        className='h-[30px] mt-2  hover:border-[#a882dd] flex items-center hover:bg-white w-full hover:text-[#a882dd] duration-200 text-[14px] max-[771px]:text-[13px]'
                                        onMouseOver={() => setToppickLink(1)}>
                                        <Link
                                          href={categorydata?.sublink}
                                          className='p-2 font-normal text-[#212529] leading-[20px]  max-[820px]:px-0 '
                                          onClick={() => sethoverClose(true)}
                                          prefetch={false}>
                                          {categorydata?.subtitlemenu}
                                        </Link>
                                      </li>
                                    </div>
                                  )
                                })}
                              </ul>
                            </>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
              <div className='bg-[#D2BFED] px-20 max-[1200px]:px-12 max-[1024px]:px-8  py-6 max-[576px]:px-6 max-[1024px]:px-8 max-[834px]:px-4 absolute bottom-0 left-0 right-0 '>
                <div className='flex items-center gap-32 justify-between px-5 max-[1200px]:gap-12 max-[834px]:gap-4'>
                  <p className='text-[#212529] font-medium text-[18px] max-[1200px]:text-[16px] max-[834px]:text-[16px]'>
                    Finding the ideal credit card is simple by reviewing our tailored suggestions.
                  </p>
                  <div className='head-text font-[faktum] flex gap-4 px-5 py-2 max-[820px]:px-4 bg-white rounded-lg max-[771px]:px-3 w-auto max-[479px]:justify-center'>
                    <Link
                      href='/credit-cards'
                      className='head-text text-[#212529] hover:!text-[#212529] font-semibold text-[18px] max-[1200px]:text-[16px] max-[834px]:text-[14px]'
                      prefetch={false}>
                      <button className='text-center cursor-pointer'>Find the Right Card</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>{' '}
    </>
  )
}

export function ResourceSubmenu({ footerMobileShow, sethoverClose, hoverclose, businessCategorydata }) {
  const [toppickLink, setToppickLink] = useState(0)

  return (
    <>
      <div
        className={
          footerMobileShow == 'Resources'
            ? 'h-full '
            : `${hoverclose ? 'closeheader ' : ' nav_top_submenu container max-[991px]:max-w-full mx-auto'}  `
        }>
        <button
          type='button'
          className={`text-black rounded  absolute z-10 right-2 top-2 xl:right-16 xl:top-4 lg:right-8 md:right-8 sm:right-8 sm:top-4 xs:right-4 xs:top-2 max-[767px]:hidden`}
          onClick={() => sethoverClose(!hoverclose)}>
          <Image src={CloseIcon} width={16} height={16} priority={true} className='' alt='CloseIcon' />
        </button>
        <div className='px-20 py-[30px] max-[1200px]:px-12 max-[1024px]:py-6 max-[1024px]:px-8 relative h-full'>
          <div className='grid grid-cols-3  max-[771px]:grid-cols-3 h-[85%] menulist-static'>
            {CardMobileCalculatorJson?.map((calculatordata, index) => {
              return (
                <div key={index}>
                  <div
                    className={
                      footerMobileShow == 'All Products'
                        ? ' w-full px-5  h-full max-[771px]:px-4  border-r  overflow-y-auto max-[834px]:px-4 '
                        : ' w-full px-5 h-full  max-[771px]:px-4  border-r  overflow-y-auto max-[834px]:px-4'
                    }>
                    <div>
                      <>
                        <p className='p-2 text-[14px] font-bold text-[#212529] pt-[15px] max-[820px]:px-0 '>
                          {calculatordata?.title?.toUpperCase()}
                        </p>
                        <ul>
                          {calculatordata?.data?.map((categorydata, subindex) => {
                            return (
                              <div key={subindex}>
                                <li
                                  className='mt-2  hover:border-[#a882dd] flex items-center hover:bg-white w-full hover:text-[#a882dd] duration-200 text-[14px] max-[771px]:text-[13px]'
                                  onMouseOver={() => setToppickLink(1)}>
                                  <Link
                                    href={`${categorydata.linkpage}`}
                                    className='p-1 font-normal text-[#212529] leading-[20px] max-[820px]:px-0 '
                                    prefetch={false}>
                                    {categorydata?.cardTitle}
                                  </Link>
                                </li>
                              </div>
                            )
                          })}
                        </ul>
                      </>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='bg-[#D2BFED] px-20 max-[1200px]:px-12 max-[1024px]:px-8  py-6 max-[576px]:px-6 max-[1024px]:px-8 max-[834px]:px-4 absolute bottom-0 left-0 right-0 '>
            <div className='flex items-center gap-32 justify-between px-5 max-[1200px]:gap-12 max-[834px]:gap-4'>
              <p className='text-[#212529] font-medium text-[18px] max-[1200px]:text-[16px] max-[834px]:text-[16px]'>
                Finding the ideal credit card is simple by reviewing our tailored suggestions.
              </p>
              <div className='head-text font-[faktum] flex gap-4 px-5 py-2 max-[820px]:px-4 bg-white rounded-lg max-[771px]:px-3 w-auto max-[479px]:justify-center'>
                <Link
                  href='/credit-cards'
                  className='head-text text-[#212529] hover:!text-[#212529] font-semibold text-[18px] max-[1200px]:text-[16px] max-[834px]:text-[14px]'
                  prefetch={false}>
                  <button className='text-center cursor-pointer'>Find the Right Card</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function ToolsSubmenu({ footerMobileShow, sethoverClose, hoverclose }) {
  const [toppickLink, setToppickLink] = useState(0)

  return (
    <>
      <div
        className={
          footerMobileShow == 'Tools'
            ? 'h-full '
            : `${hoverclose ? 'closeheader ' : ' nav_top_submenu container max-[991px]:max-w-full mx-auto'}  `
        }>
        <button
          type='button'
          className={`text-black rounded  absolute z-10 right-2 top-2 xl:right-16 xl:top-4 lg:right-8 md:right-8 sm:right-8 sm:top-4 xs:right-4 xs:top-2 max-[767px]:hidden
          `}
          onClick={() => sethoverClose(!hoverclose)}>
          <Image src={CloseIcon} width={16} height={16} priority={true} className='' alt='CloseIcon' />
        </button>
        <div className='px-20 py-[30px] max-[1200px]:px-12 max-[1024px]:py-6 max-[1024px]:px-8  relative h-full'>
          <div className='grid grid-cols-3  max-[771px]:grid-cols-3   h-[85%] menulist-static'>
            {ScoreCreditJson?.map((tollData, index) => {
              return (
                <div key={index}>
                  <div
                    className={
                      footerMobileShow == 'All Products'
                        ? '  w-full px-5  h-full max-[771px]:px-4  border-r  overflow-y-auto max-[834px]:px-4 '
                        : ' w-full px-5 h-full  max-[771px]:px-4  border-r  overflow-y-auto max-[834px]:px-4'
                    }>
                    <div>
                      <>
                        <p className='p-2 text-[13px] font-bold text-[#212529] pt-[15px] max-[820px]:px-0'>
                          {tollData?.title?.toUpperCase()}
                        </p>
                        <ul>
                          {tollData?.data?.map((categorydata, subindex) => {
                            return (
                              <div key={subindex}>
                                <li
                                  className='h-[30px] mt-2  hover:border-[#a882dd] flex items-center hover:bg-white w-full hover:text-[#a882dd] duration-200 text-[14px] max-[771px]:text-[13px]'
                                  onMouseOver={() => setToppickLink(1)}>
                                  <Link
                                    href={`${categorydata?.linkhref}`}
                                    className='p-2 font-normal text-[#212529] leading-[20px]  max-[820px]:px-0 '
                                    prefetch={false}>
                                    {categorydata?.detaildata}
                                  </Link>
                                </li>
                              </div>
                            )
                          })}
                        </ul>
                      </>
                      {/* ) : (
                        ''
                      )} */}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='bg-[#D2BFED] px-20 max-[1200px]:px-12 max-[1024px]:px-8  py-6 max-[576px]:px-6 max-[1024px]:px-8 max-[834px]:px-4 absolute bottom-0 left-0 right-0 '>
            <div className='flex items-center gap-32 justify-between px-5 max-[1200px]:gap-12 max-[834px]:gap-4'>
              <p className='text-[#212529] font-medium text-[18px] max-[1200px]:text-[16px] max-[834px]:text-[16px]'>
                Finding the ideal credit card is simple by reviewing our tailored suggestions.
              </p>
              <div className='head-text font-[faktum] flex gap-4 px-5 py-2 max-[820px]:px-4 bg-white rounded-lg max-[771px]:px-3 w-auto max-[479px]:justify-center'>
                <Link
                  href='/credit-cards'
                  className='head-text text-[#212529] hover:!text-[#212529] font-semibold text-[18px] max-[1200px]:text-[16px] max-[834px]:text-[14px]'
                  prefetch={false}>
                  <button className='text-center cursor-pointer'>Find the Right Card</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
