import * as React from 'react'
import leftArrowImage from '../../../../public/assets/back-page.svg'

import rightArrowImage from '../../../../public/assets/next-page.svg'
import Image from 'next/image'

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize)

  if (pagesCount <= 1) return null
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1)

  const renderPageNumbers = () => {
    if (pagesCount <= 3) {
      return pages.map((page) => (
        <li
          key={page}
          className={`${
            page === currentPage ? 'bg-[#49d49d] text-[#212529]' : 'bg-[#F4F8FB] text-[#212529]'
          } w-8 h-8 flex items-center justify-center cursor-pointer border border-[#212529] rounded-md`}>
          <button onClick={() => onPageChange(page)} className='w-full h-full focus:outline-none'>
            {page}
          </button>
        </li>
      ))
    } else {
      const visiblePages = []
      const ellipsis = (
        <button key='ellipsis' disabled={true}>
          ...
        </button>
      )

      if (currentPage <= 2) {
        visiblePages.push(pages.slice(0, 3))
        visiblePages.push(ellipsis)
        visiblePages.push(pages.slice(pagesCount - 1))
      } else if (currentPage >= pagesCount - 2) {
        visiblePages.push(pages.slice(0, 1))
        visiblePages.push(ellipsis)
        visiblePages.push(pages.slice(pagesCount - 3))
      } else {
        visiblePages.push(pages.slice(0, 1))
        visiblePages.push(ellipsis)
        visiblePages.push(pages.slice(currentPage - 1, currentPage + 2))
        visiblePages.push(ellipsis)
        visiblePages.push(pages.slice(pagesCount - 1))
      }

      return visiblePages.flat().map((page) => (
        <li
          key={page}
          className={`${
            page === currentPage ? 'bg-[#49d49d] text-[#212529]' : 'bg-[#F4F8FB] text-[#212529]'
          } w-8 h-8 flex items-center justify-center cursor-pointer border border-[#212529] rounded-md`}>
          <button onClick={() => onPageChange(page)} className='w-full h-full focus:outline-none'>
            {page}
          </button>
        </li>
      ))
    }
  }

  return (
    <div className='flex w-40 h-40 p-10 justify-center items-center gap-10 relative'>
      <ul className='flex space-x-3 absolute right-0 top-0'>
        <li className='w-8 h-8 flex items-center justify-center cursor-pointer border border-[#212529] rounded-md'>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className='w-full h-full focus:outline-none text-center'
            disabled={currentPage === 1}>
            <Image width={10} height={10} className='ml-[.4rem]' src={leftArrowImage} alt='Previous' />
          </button>
        </li>
        {renderPageNumbers()}
        <li className='w-8 h-8 flex items-center justify-center cursor-pointer border border-[#212529] rounded-md'>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className='w-full h-full focus:outline-none'
            disabled={currentPage === pagesCount}>
            <Image width={10} height={10} className='ml-[.5rem]' src={rightArrowImage} alt='Next' />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
