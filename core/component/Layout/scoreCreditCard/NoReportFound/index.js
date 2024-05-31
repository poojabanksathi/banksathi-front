import React from 'react'
import cancelIcon from '../../../../../public/assets/cancel-icon.svg'
import Image from 'next/image'
import Link from 'next/link'

function NoReportFound() {
  const starCount = 5

  return (
    <>
      <div className='container mx-auto py-[50px]'>

        <div className='noreport-found'>
          <div className=''>
            <Image src={cancelIcon} alt='img' width={100} height={80} className='mx-auto pb-5' />
            <p className='head-text text-[#212529] xl:text-4xl lg:text-3xl md:text-2xl leading-[45px]  max-[576px]:text-[28px] max-[479px]:text-[19px] max-[320px]:text-[19px] text-center'>
              No credit report found
            </p>
            <p className='text-[15px] font-normal text-[#212529] text-center pt-2 mt-0'>
              Possibly because of limited credit history,<br /> inaccurate information, recent activity, or errors.
            </p>
          </div>
          <div className='mt-10 text-center'>
            <Link className='text-center' href='/' prefetch={false}>
              <button className='head-text cursor-pointer py-3 px-4 text-[18px]   w-auto rounded-lg text-[#212529] border border-[#000] font-semibold '>
                Go back to homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoReportFound
