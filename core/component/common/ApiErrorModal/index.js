import Image from 'next/image'
import React from 'react'
import internalError from '../../../../public/assets/internal-error.png'

function ApiErrorModal() {
  return (
    <>
      <div className=' max-xs:px-6 2xl:px-[80px] xl:px-40 xl:py-24  lg:py-20 lg:px-[80px] md:px-16 max-xs:py-10 px-6 py-10'>
        <div>
          <Image
            src={internalError}
            alt='img_text'
            className='mx-auto max-[771px]:w-3/6 max-[576px]:w-3/4 max-[375px]:w-full'
          />
        </div>
        <div className='tetx-center px-6'>
          <p className='font-bold text-[35px] max-[576px]:text-[30px] max-[425px]:text-[26px] text-center mt-3 '>
            We’ll be back soon!
          </p>
          <p className=' text-[18px] max-[576px]:text-[16px] mx-auto w-4/5 max-[425px]:text-[14px] text-center mt-2  my-3  '>
            Sorry for the inconvenience. We’re performing some maintenance at the moment. If you need you can always
            follow us on Twitter for updates, otherwise we’ll be back up shortly!
          </p>
        </div>
      </div>
    </>
  )
}

export default ApiErrorModal
