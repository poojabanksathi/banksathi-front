import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import optionArrow from '../../../../../../public/assets/arrow-down-gray.svg'
import SearchIcon from '../../../../../../public/assets/searchIcon.svg'
import { mockOpeningsData } from '../data'

const CurrentOpenings = () => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isHoveredTitle, setIsHoveredTitle] = useState();

  const navigateToJobDetails = () => {
    router.push({ pathname: '/careers/jobdetails' })
  }
  return (
    <>
      <div className='flex flex-col mx-[135px] max-sm:ml-[16px] max-sm:mr-[85px] max-[771px]:mx-[40px]'>
        <div className='flex items-center justify-center pt-[50px] max-[771px]:flex max-[771px]:justify-start'>
          <div className='text-center text-neutral-800 text-[46px] font-semibold leading-[64.40px] font-[Faktum] max-sm:text-[22px] max-sm:leading-[30px] max-[771px]:text-[22px] max-[768px]:leading-[30px] max-sm:text-start max-[771px]:text-start'>
            Explore Current Openings
          </div>
        </div>
        <div>
          <div className='flex justify-between items-center pt-[50px] max-sm:flex-col max-sm:gap-0 max-[771px]:flex-row max-[771px]:pt-[10px] max-[771px]:flex max-[771px]:gap-[40px] max-sm:pt-[20px] max-sm:items-start'>
            <div className='flex mb-[41px] max-sm:mb-[20px] max-[771px]'>
              <div className='w-[166px] h-[25px] justify-start items-start gap-[19px] inline-flex'>
                <div className='text-neutral-800 text-lg font-semibold leading-[25.20px] font-[Poppins] max-sm:leading-[21px]ppins] max-sm:text-[15px] max-sm:leading-[21px]'>
                  Location:
                </div>
                <div className='justify-start items-center gap-[9px] flex'>
                  <div className='text-neutral-800 text-lg font-semibold leading-[25.20px] font-[Poppins] max-sm:leading-[21px]ppins] max-sm:text-[15px] max-sm:leading-[21px]'>
                    India
                  </div>
                </div>
                <div>
                  <Image
                    src={optionArrow}
                    alt='up'
                    width={4}
                    height={18}
                    className='cursor-pointer w-6 h-6 ml-1 relative max-sm:h-[7px] max-sm:w-[10px] max-sm:top-[7px] max-sm:right:[12px]'
                  />
                </div>
              </div>
            </div>
            <div className='flex h-[48px] rounded-xl border border-slate-300 pl-[20px] mb-[30px] max-sm:mr-[17px] max-sm:w-[120%] max-sm:rounded-lg'>
              <div className='flex items-center justify-between gap-[60px]'>
                <input
                  type='search'
                  className='text-neutral-800 text-[15px] font-normal font-[Poppins]'
                  placeholder='Search Job'
                 
                />
                <Image src={SearchIcon} alt='search' className='h-[14px] w-[22px]' />
              </div>
            </div>
          </div>
          <div className=' flex flex-col justify-center'>
            <div className='border border-dashed mb-[30px] max-sm:w-[124%]' />
            <div className='justify-start items-start gap-[29px] inline-flex w-auto flex-wrap'>
              <div className='text-neutral-800 text-[15px] font-normal cursor-pointer'>All Jobs</div>
              <div className='text-emerald-400 text-[15px] font-semibold'>Sales</div>
              <div className='text-neutral-800 text-[15px] font-normal cursor-pointer'>Category 2</div>
              <div className='text-neutral-800 text-[15px] font-normal cursor-pointer'>Category 3</div>
              <div className='text-neutral-800 text-[15px] font-normal cursor-pointer'>Category 4</div>
              <div className='text-neutral-800 text-[15px] font-normal cursor-pointer'>Category 5</div>
            </div>
          </div>
          <div className='flex flex-col justify-center mt-[40px]'>
            <div className='text-neutral-800 text-2xl font-semibold leading-[28.80px]'>Sales</div>
          </div>
          <div className='grid grid-cols-3 gap-[30px] pt-[24px] max-sm:flex max-sm:flex-col max-sm:gap-[20px] max-[771px]:grid-cols-2'>
            {mockOpeningsData?.map((item) => {
              return (
                <div
                  key=''
                  onMouseEnter={() => {
                    setIsHoveredTitle(item?.id)
                    item?.id === isHoveredTitle ?  setIsHovered(true) : setIsHovered(false)
                  }}
                  className={`flex flex-col justify-center items-center h-[120px] ${
                    isHovered && item?.id === '1' ? 'bg-white shadow border border-slate-50' : 'bg-slate-50'
                  } rounded-xl w-auto max-[375px]:w-[125%] max-[425px]:w-[120%] max-sm:h-[100px] max-sm:items-start max-sm:pl-[20px] cursor-pointer`}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => navigateToJobDetails()}>
                  <div
                    className={`${
                      isHovered && item?.id === '1' ? 'text-emerald-400' : 'text-neutral-800'
                    } text-lg font-semibold leading-[25.20px] font-[Poppins] mb-[7px] max-sm:text-[15px] max-sm:leading-[21px]`}>
                    {item?.jobTitle}
                  </div>
                  <div className='flex flex-row items-center justify-center gap-[8px]'>
                    <div className='text-neutral-800 text-center text-[13px] font-normal leading-[20.80px]'>
                      {item?.jobLocation}
                    </div>
                    <div className='w-[3px] h-[3px] bg-neutral-800 rounded-full' />
                    <div className='text-neutral-800 text-[13px] font-normal leading-[20.80px]'>{item?.jobType}</div>
                  </div>
                </div>
              )
            })}
           </div>
        </div>
      </div>
    </>
  )
}

export default CurrentOpenings
