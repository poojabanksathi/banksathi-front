import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Resultnotfound from '../../../../public/assets/not-found.svg'

function FilterNotFound({
  resetFilter,
  subTitle,
  btn,
  btnActive,
  btnActiveLink,
  btnTransparentLink,
  btnTransparent,
  showPadding = true,
  isTab
}) {
  return (
    <div
      className={`flex justify-center items-center max-[991px]:h-[85vh] max-[576px]:pb-[50px] bg-[#F4F8FB] max-[576px]:h-full ${
        isTab ? 'mt-[145px]' : ''
      } ${showPadding ? ' py-[50px] h-full ' : 'pt-[50px]'}`}>
      <div className='text-center px-6 '>
        <div className='pb-[30px]'>
          <p className='font-semibold text-[24px] max-[576px]:text-[24px] max-[425px]:text-[24px] max-[320px]:text-[22px] text-center mt-3 text-[#212529]'>
            Results not found
          </p>
          {subTitle && (
            <p className=' xl:w-[90%] font-normal lg:w-[90%] md:w-[80%] max-[576px]:w-[85%] max-[390px]:w-full  mx-auto text-[18px] max-[576px]:text-[16px] max-[425px]:text-[14px] text-center mt-2  my-3  text-[#212529] max-[320px]:text-[12px]'>
              {subTitle}
            </p>
          )}
        </div>

        <Image
          src={Resultnotfound}
          alt='img_text'
          className='mx-auto max-[771px]:w-full max-[375px]:w-full py-[20px]'
        />
        {btn === true ? (
          <div className='flex items-center justify-center gap-5 pt-[60px] mb-3'>
            {btnActive && (
              <Link href={btnActiveLink} className='mt-3 ' prefetch={false}>
                <button className='bg-[#49D49D] font-faktum cursor-pointer font-semibold flex mx-auto xl:px-4 lg:text-[10px] py-3 px-6 text-[#212529] xl:text-[15px] max-[320px]:text-[12px] sm:text-[12px] text-[14px] rounded-lg'>
                  {btnActive}
                </button>
              </Link>
            )}
            {btnTransparent && (
              <Link href={btnTransparentLink} className='mt-3 ' prefetch={false}>
                <button
                  onClick={resetFilter}
                  className='bg-transparent cursor-pointer font-semibold flex mx-auto xl:px-4 lg:text-[10px] py-3 px-6 text-[#212529] xl:text-[15px] max-[320px]:text-[12px] sm:text-[12px] text-[14px] rounded-lg border border-[#212529] '>
                  {btnTransparent}
                </button>
              </Link>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default FilterNotFound
