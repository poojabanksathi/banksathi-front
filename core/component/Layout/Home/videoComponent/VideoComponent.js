import Image from 'next/image'
import React, { useState } from 'react'
import CloseIcon from '../../../../../public/assets/closeIcon.svg'
import { VideoSec } from '@/utils/alljsonfile/tutorialvedio'

function VideoComponent() {
  const [popup, setPopup] = useState(false)
  const [popupData, setPopupDatal] = useState(false)

  const toggleModal = (e) => {
    setPopup(!popup)
    setPopupDatal(e?.tutorialvideo)
  }


  return (
    <>
      {popup ? (
        <div className='fixed z-[9999] top-0 w-full left-0 h-full ' id='modal'>
          <div className='flex items-center justify-center min-h-full pt-4 px-4 pb-20 text-center sm:p-0'>
            <div className='fixed inset-0 transition-opacity'>
              <div className='absolute inset-0 bg-gray-900 opacity-75' />
            </div>
            <p className='sm:inline-block sm:align-middle '></p>
            <div
              className='inline-block align-center bg-white rounded-lg p-10 text-left h-auto shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-headline'>
              <div className='2xl:col-span-2 xl:col-span-2 md:col-span-2 bg-none '>
                <div className='text-right mb-3'>
                  <button
                    type='button'
                    className='  text-[#212529] cursor-pointer rounded  mr-2'
                    style={{ color: 'red' }}
                    onClick={(e) => setPopup(false)}>
                    <Image src={CloseIcon} alt='img' height={18} width={18} priority={true} className='  w-[18px] h-[18px]' />
                  </button>
                </div>
                <div className='rounded-2xl !h-[210px] mb-4 video-tutorial'>
                <iframe width="100%" height="100%" src={popupData} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      {!VideoSec&&
      <div className='container  max-[1024px]:px-8 mx-auto max-[991px]:max-w-full py-[100px] max-[576px]:px-6  max-[479px]:py-[30px] max-[375px]:px-4 max-[375px]:px-4 max-[320px]:px-4 video-slide'>
        <div className=' '>
          <div className=' w-full px-20 max-[1440px]:px-0 mx-auto gap-12 max-[1440px]:w-[90%] max-[1200px]:w-full max-[771px]:gap-4 max-[576px]:grid-cols-1 max-[576px]:gap-8 '>
            {VideoSec?.map((videodata, index) => {
              return (
                <div key={index}>
                  <div onClick={() => toggleModal(videodata)}>
                    <div className='rounded-2xl !h-[600px] mb-4 video-tutorial  max-[771px]:!h-[420px] max-[576px]:!h-[300px] max-[320px]:!h-[225px]'>
                    <iframe width="100%" height="100%" src={videodata?.tutorialvideo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>}
    </>
  )
}

export default VideoComponent
