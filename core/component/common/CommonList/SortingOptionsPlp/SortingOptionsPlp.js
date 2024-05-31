/* eslint-disable react-hooks/exhaustive-deps */
import { sortingOptions } from '@/utils/alljsonfile/filterdata'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const SortingOptionsPlp = ({ arrowImage, filteredData, setFilteredData, initialList }) => {
  const [showNestedSubSort, setShowNestedSort] = useState(false)
  const [sortedList, setSortedList] = useState([])

  const getNestedSortList = (item) => {
    const nestedSortCondition =
      showNestedSubSort && item?.subSortOptions && item?.subSortOptions?.[0]?.parentId === item?.id

    const handleRatingSorting = (name) => {
      if (filteredData && filteredData?.length > 0) {
        if (name === 'Low to High') {
          const list = filteredData?.sort((a, b) => {
            return a?.rating - b?.rating
          })
          return setSortedList(list)
        }
        if (name === 'High to Low') {
          const list = filteredData?.sort((a, b) => {
            return b?.rating - a?.rating
          })
          return setSortedList(list)
        }
      } else setFilteredData(initialList)
    }
    return (
      <div className='flex flex-col h-auto' onClick={() => setShowNestedSort(!showNestedSubSort)}>
        <div className='flex px-4 justify-around'>
          <div className='hover:text-[#a882dd] hover:text-[15px]'>{item?.name}</div>
          <div>
            <Image
              src={arrowImage}
              alt='arrow'
              width={24}
              height={24}
              className={showNestedSubSort ? 'rotate-180' : ''}
            />
          </div>
        </div>
        {nestedSortCondition && (
          <div
            className={`top-[6px] relative shadow-md w-[150px] h-[90px] bg-white flex flex-col gap-[14px] items-center justify-center rounded-b-xl`}>
            {item?.subSortOptions?.map((element) => {
              return (
                <div key={element?.id}>
                  <div
                    onClick={() => handleRatingSorting(element?.name)}
                    className={`text-center font-medium cursor-pointer hover:bg-white hover:text-[#a882dd] w-full duration-200 text-[15px] max-[771px]:text-[13px] submenu-reslove`}>
                    {element?.name}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
  const handleSorting = (name) => {
    if (filteredData && filteredData?.length > 0) {
      if (name === 'Annual Fee') {
        const sortedList = filteredData?.sort((a, b) => {
          return a?.annual_fee - b?.annual_fee
        })
        return setSortedList(sortedList)
      }
      if (name === 'Credit Score') {
        const sortedList = filteredData?.sort((a, b) => {
          return a?.min_credit_score - b?.min_credit_score
        })
        return setSortedList(sortedList)
      }
    } else setFilteredData(initialList)
  }

  useEffect(() => {
    if (sortedList?.length > 0) {
      setFilteredData(sortedList)
    }
  }, [sortedList?.length])

  console.log(sortedList)

  return (
    <div className='flex flex-row items-center justify-start gap-8 px-2'>
      <div className="text-center text-neutral-800 text-[17px] font-semibold font-['Poppins']">SORT BY :</div>
      <div className='flex flex-row items-center justify-center gap-8'>
        {sortingOptions?.map((item) => {
          return (
            <div key={item?.id}>
              <div className='w-[150px] shadow-md h-[50px] cursor-pointer bg-white text-center text-[14px] font-medium py-[14px] rounded-lg'>
                {item?.subSortOptions ? (
                  getNestedSortList(item)
                ) : (
                  <div
                    className='hover:text-[#a882dd] hover:text-[14px]'
                    onClick={() => {
                      handleSorting(item?.name)
                    }}>
                    {item?.name}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SortingOptionsPlp
