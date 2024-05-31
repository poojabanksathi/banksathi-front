import { useWindowSize } from '@/hooks/useWindowSize'
import { ImageBaseUrl } from '@/utils/util'
import Image from 'next/image'
import React from 'react'
import alertOctagon from '../../../../../public/assets/alert-octagon.svg'

const FrozenCompareDesktop = ({
  selectedCompareData,
  setSelectedCompareData,
  handleCompareNow,
  setShowCompareModal,
  selectedIds,
  setSelectedIds
}) => {
  const size = useWindowSize()
  const disable = selectedCompareData?.length < 2 || selectedCompareData?.length == 4
  const alertMessage = size?.width <= 991 ? selectedCompareData?.length == 2 : selectedCompareData?.length == 3

  const handleClose = (data) => {
    selectedCompareData?.length > 0 &&
      setSelectedCompareData([...selectedCompareData?.filter((item) => item?.product_id !== data?.product_id)])
  }
  return (
    <>
      {alertMessage && (
        <div
          className='fixed z-50 h-[13rem] bottom-0 w-full left-0 max-[1200px]:h-[14rem] max-[991px]:h-[13rem] max-[1600px]:h-[200px]  max-xl:h-auto max-lg:h-auto max-[576px]:h-auto  max-[575px]:h-auto bg-[#FFEBF2] add-modal  max-[767px]:bottom-[8%] max-sm:bottom-[15%]'
          id='modal'>
          <div className=' 2xl:px-40 xl:px-30 xl:py-8 lg:px-20 max-sm:py-[12px] p-4 py-6 '>
            <div className='text-center flex items-center gap-2 justify-center'>
              <Image src={alertOctagon} className='' alt='img' />
              <p className='text-[15px] text-[#FF000F] text-left'>To compare another product, remove an existing one</p>
            </div>
          </div>
        </div>
      )}
      <div
        className='fixed z-50 py-[30px] max-sm:py-4 bottom-0 w-full left-0 h-[124px]  max-xl:h-auto max-lg:h-auto max-[576px]:h-auto  max-[575px]:h-auto bg-white add-modal shadow'
        id='modal'>
        <div className='flex items-center justify-center min-height-100vh  px-4  text-center sm:block sm:p-0'>
          <div className=''>
            <div className='flex max-[1820px]:flex justify-center gap-12 max-[1600px]:gap-4   max-xl:justify-center  items-center add-comapre-modal'>
              <>
                <div className='flex gap-7 max-[1200px]:flex-wrap  max-[991px]:flex-nowrap  max-[1200px]:gap-4 max-md:justify-between max-[576px]:justify-center add-comapre-card max-[320px]:gap-2'>
                  {selectedCompareData?.length <= 3 &&
                    selectedCompareData?.map((data, index) => {
                      return (
                        <div key={data?.product_id}>
                          <div className=' rounded-lg  relative '>
                            <div className='w-[146px]  rounded-md px-[18px] py-[8px] h-auto max-[991px]:w-[110px] max-[576px]:w-[90px] max-[479px]:w-[100px] max-sm:px-0 compare-img-card'>
                              <Image
                                id={`${index}+'bank=11-img'`}
                                src={`${ImageBaseUrl}/${data?.product_image}`}
                                alt='card image'
                                width={146}
                                height={50}
                                unoptimized={true}
                                className='max-sm:w-full'
                              />
                            </div>
                            <div
                              className='absolute top-[-10px] right-[-8px] border border-[#000] p-1 rounded-full bg-white text-[#212529]'
                              onClick={() => {
                                handleClose(data)
                              }}>
                              <Image
                                src={'/assets/closeIcon.svg'}
                                height={15}
                                width={15}
                                alt='img'
                                className='w-[12px] h-[12px]'
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
                <div className='flex max-[1820px]:flex max-[1820px]:gap-8  gap-5 items-center max-[576px]:gap-4 max-[320px]:gap-2 '>
                  {size?.width > 991 && selectedCompareData?.length < 2 && selectedCompareData?.length != null && (
                    <div>
                      <p className='text-[15px] text-[#212529] max-[479px]:text-[12px]'>
                        Add upto 3 products to compare
                      </p>
                    </div>
                  )}
                  <div className='max-xs:my-2'>
                    <button
                      id={`1+'data+bank'`}
                      type='button'
                      disabled={disable}
                      className={
                        disable
                          ? 'bg-[#ccc]  disabled cursor-no-drop xl:px-4 lg:text-[14px] py-3 px-6 text-white xl:text-[14px] max-[320px]:text-[10px] sm:text-[12px] text-[14px] rounded-lg'
                          : 'bg-[#49D49D] cursor-pointer xl:px-4 lg:text-[14px] py-3 px-6 text-[#212529] xl:text-[14px] max-[320px]:text-[10px] sm:text-[12px] text-[14px]  rounded-lg'
                      }
                      onClick={() => handleCompareNow()}>
                      Compare
                    </button>
                  </div>
                  <div className='max-xs:my-2'>
                    <button
                      id={`2+'bank=btn'`}
                      type='button'
                      className='  text-[#212529] cursor-pointer rounded  mr-2 max-[479px]:mr-0 text-[15px] font-semibold max-[479px]:text-[13px]'
                      onClick={() => {
                        setShowCompareModal(false)
                        setSelectedCompareData([])
                      }}>
                      {size.width <= 577 ? <>Clear</> : <>Clear All</>}
                    </button>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FrozenCompareDesktop
