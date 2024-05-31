import { useWindowSize } from '@/hooks/useWindowSize'
import React,{useState,useEffect} from 'react'
// import alertOctagon from '../../../../public/assets/alert-octagon.svg'
import alertOctagon from '../../../../public/assets/alert-octagon.svg'



const AddCompareModal = () => {
  const [comparemodal, setCompareModal] = useState(false)
  const size = useWindowSize()
  useEffect(() => {
    if (selectedData.length) {
      setCompareModal(true)
    } else {
      setCompareModal(false)
    }
  }, [selectedData.length])


  return (
    <div>  {comparemodal ? (
        <>
          {size?.width <= 991
            ? selectedData?.length == 2
            : selectedData?.length == 3 && (
                <div
                  className='fixed z-50 bottom-0 w-full left-0 h-[16.5rem] max-[1200px]:h-[14rem] max-[991px]:h-[22rem] max-[1600px]:h-[17rem]  max-xl:h-auto max-lg:h-auto max-[576px]:h-auto  max-[575px]:h-auto bg-[#FFEBF2] add-modal  max-[767px]:bottom-[8%]'
                  id='modal'>
                  <div className=' 2xl:px-40 xl:px-30 xl:py-8 lg:px-20 md:px-14 p-4 py-6 '>
                    <div className='text-center flex items-center gap-2 justify-center'>
                      <Image src={alertOctagon} className='' alt='img' />
                      <p className='text-[15px] text-[#FF000F]'>Remove a card to add another card to compare</p>
                    </div>
                  </div>
                </div>
              )}
          <div
            className='fixed z-50  bottom-0 w-full left-0 h-[11rem] max-[1600px]:h-[12rem]  max-xl:h-auto max-lg:h-auto max-[576px]:h-auto  max-[575px]:h-auto bg-white add-modal comapre-card-modal'
            id='modal'>
            <div className='flex items-center justify-center min-height-100vh  px-4  text-center sm:block sm:p-0'>
              <div className=' 2xl:px-40 xl:px-30 xl:py-14 lg:px-20 md:px-14 p-4 py-8 max-[479px]:py-4 '>
                <div className='flex max-[1820px]:flex   justify-center gap-12 max-[1600px]:gap-4   max-xl:justify-center  items-center add-comapre-modal'>
                  <>
                    <div className='flex gap-7 max-[1200px]:flex-wrap  max-[991px]:flex-nowrap  max-[1200px]:gap-4 max-md:justify-between max-[576px]:justify-center add-comapre-card max-[320px]:gap-2'>
                      {selectedData.length <= 3 &&
                        selectedData.map((data, index) => {
                          return (
                            <div key={index}>
                              <div className=' rounded-lg  relative '>
                                <div className='w-[140px] h-full max-[991px]:w-[110px] max-[576px]:w-[110px] max-[479px]:w-[80px]  compare-img-card'>
                                  <Image
                                    src={`${Img_URL}/${data?.product_image}`}
                                    alt='card image'
                                    width={140}
                                    height={160}
                                    className='w-[140px]'
                                    unoptimized={true}
                                  />
                                </div>

                                <div
                                  className='absolute top-[-10px] right-[-8px] border border-[#000] p-1 rounded-full bg-white text-[#212529]'
                                  onClick={() => {
                                    document.getElementById(data.product_id).checked = false
                                    setSelectedData([
                                      ...selectedData.filter((item) => item.product_id !== data.product_id)
                                    ])
                                  }}>
                                  <Image src={CloseIcon} alt='img' height={12} width={12} priority={true} className='  w-[12px] h-[12px]' />
                                </div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                    <div className='flex max-[1820px]:flex max-[1820px]:gap-8  gap-5 items-center max-[576px]:gap-4 max-[320px]:gap-2 '>
                      {size?.width > 991 && selectedData.length < 2 && selectedData.length != null && (
                        <div>
                          <p className='text-[15px] text-[#212529] max-[479px]:text-[12px]'>
                            Add upto 3 cards to compare
                          </p>
                        </div>
                      )}
                      <div className='max-xs:my-2'>
                        <CompareNowBtn
                          compareslug={selectedData}
                          name='Compare'
                          disable={selectedData.length < 2 || selectedData.length == 4}
                        />
                      </div>
                      <div className='max-xs:my-2'>
                        <button
                          type='button'
                          className='  text-[#212529] cursor-pointer rounded  mr-2 max-[479px]:mr-0 text-[15px] font-semibold max-[479px]:text-[13px]'
                          onClick={(e) => {
                            setCompareModal(false)
                            setSelectedData([])
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
      ) : (
        ''
      )}</div>
  )
}

export default AddCompareModal