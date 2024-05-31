import { useWindowSize } from '@/hooks/useWindowSize'
import React, { useMemo } from 'react'

const IsThatYouComp = (props) => {
  const size = useWindowSize()

  const windowSize = useMemo(() => {
    return size?.width
  }, [size?.width])

  const isDesktop = windowSize >= 768
  const getMobileFrozen = () => {
    return (
      <div className=' h-[200px] flex items-center justify-center sm:flex sm:items-center bg-white rounded-lg  pt-[40px] max-sm:[35px] min-[1500px]:px-[45px]  px-[30px] sticky top-[100%] w-[100%] rounded-t-[30px] rounded-b-[0]'>
        <div className='max-sm:mt-0 '>
          <p className=' text-[18px] font-semibold text-[#212529] max-[479px]:text-left'>{props?.question}</p>
          <div className='max-[479px]:text-center py-[35px] flex gap-[16px] items-center justify-center'>
            <button
              onClick={() => {
                props?.handleNo()
              }}
              className='text-[#212529] border w-[160px] font-semibold max-sm:w-[135px] max-[375px]:w-[120px] h-[48px] px-[24px] py-[14px] border-[#212529] rounded-lg cursor-pointer ps-2 text-[15px] max-[479px]:text-[13px]'>
              {props?.noText}
            </button>
            <button
              onClick={() => {
                props?.handleYes()
              }}
              className='text-[#fff] bg-[#49D49D] w-[160px] font-semibold max-sm:w-[135px] max-[375px]:w-[120px] h-[48px] px-[24px] py-[14px] rounded-lg cursor-pointer ps-2 text-[15px] max-[479px]:text-[13px]'>
              {props?.yesText}
            </button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className=''>
        <div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>
          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-full  items-center justify-center p-4 text-center max-sm:p-0'>
              {isDesktop || props?.isFromLogin ? (
                <div className='relative transform overflow-hidden'>
                  <div className=' flex items-center justify-center sm:flex sm:items-center bg-white rounded-lg  pt-[60px] pb-[45px] max-sm:[35px] min-[1500px]:px-[45px]  px-[45px] h-[239px]'>
                    <div className=' sm:mt-0 py-[60px] '>
                      <p className=' py-1 text-[24px] max-smtext-[15px] font-semibold max-[479px]:text-[13px] text-[#212529] max-[479px]:text-center'>
                        {props?.question}
                      </p>
                      <div className='max-[479px]:text-center py-[40px] flex gap-[16px] items-center justify-center'>
                        <button
                          onClick={() => {
                            props?.handleNo()
                          }}
                          className='text-[#212529] border w-[160px] font-semibold max-sm:w-[135px] max-[375px]:w-[120px] h-[48px] px-[24px] py-[14px] border-[#212529] rounded-md cursor-pointer ps-2 text-[15px] max-[479px]:text-[13px]'>
                          {props?.noText}
                        </button>
                        <button
                          onClick={() => {
                            props?.handleYes()
                          }}
                          className='text-[#fff] bg-[#49D49D] w-[160px] font-semibold max-sm:w-[135px] max-[375px]:w-[120px] h-[48px] px-[24px] py-[14px] rounded-md cursor-pointer ps-2 text-[15px] max-[479px]:text-[13px]'>
                          {props?.yesText}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                getMobileFrozen()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IsThatYouComp
