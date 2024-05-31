import React from 'react'

const CommonNextButton = ({ title, handleSubmit, disable, ref = null, width }) => {
  return (
    <div className='mt-[30px] max-sm:mb-4 text-left  h-[48px]' ref={ref}>
      <button
        type='submit'
        disabled={disable}
        onClick={() => {
          handleSubmit()
        }}
        className={
          disable
            ? `text-[18px] ${
                width || 'w-[303px]'
              } items-center cursor-pointer text-black max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[12px]  bg-[#E6ECF1] rounded-lg max-[771px]:px-3 max-sm:w-full font-semibold`
            : `text-[18px] ${
                width || 'w-[303px]'
              } items-center cursor-pointer text-black max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[12px]  bg-[#49D49D] rounded-lg max-[771px]:px-3 max-sm:w-full font-semibold`
        }>
        {title}
      </button>
    </div>
  )
}

export default CommonNextButton
