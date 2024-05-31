import React from 'react'
import Getmobileapp from '../../../../../public/assets/getmobileapp.svg'
import GetmobileBg from '../../../../../public/assets/get-mobile-bg.svg'
import Playstore from '../../../../../public/assets/playstore.svg'
import Image from 'next/image'

function GetMobileApp() {
  const style = {
    backgroundImage: `url(${Getmobileapp.src})`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover'
  }
  const Getmobilestyle = {
    backgroundImage: `url(${GetmobileBg.src})`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover'
  }

  return (
    <>
      <div style={style} className='bg-center bg-no-repeat bg-black max-[576px]:hidden  '>
        <div className='container min-h-[750px] max-[1024px]:px-8 mx-auto max-[991px]:max-w-full py-[100px] flex items-center max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
          <div className='grid grid-cols-2 max-[820px]:grid-cols-1  w-[78%] mx-auto max-[1440px]:w-[90%] max-[1200px]:w-full get-banksathi-mobile'>
            <div>
              <div className='pb-14'>
                <h2 className='head-text font-[faktum] text-[65px] max-[1440px]:text-[62px] max-[1024px]:text-[56px] max-[820px]:w-[70%] max-[991px]:text-[54px] w-[96%] max-[771px]:w-[80%] max-[576px]:w-full leading-[78px] text-white pb-8 font-semibold max-[479px]:text-center max-[479px]:text-[30px] max-[479px]:leading-10 max-[479px]:pb-4 get-mobile-title'>
                  Get the <span className='text-[#49D49D]'>BankSathi</span> mobile app
                </h2>
                <p className='text-[24px] text-white  max-[479px]:text-center'>
                  Take charge of your financial requirements from anywhere and at any time.
                </p>
              </div>
              <div className='flex  gap-5 max-[479px]:justify-center '>
              
                <button className='px-4 cursor-pointer py-2 border text-[18px] max-[479px]:text-[16px] max-[375px]:text-[15px] border-white bg-white rounded-md text-[#212529] w-[35%]  max-[1200px]:w-[80%] max-[991px]:w-[40%] max-[479px]:w-[46%] max-[375px]:w-[50%] flex items-center justify-center  gap-3 duration-200 font-semibold store-btn-mobile'>
                  <Image
                    src={Playstore}
                    alt='img'
                    className='w-[40px] h-[40px] max-[991px]:w-[30px] max-[991px]:h-[30px]'
                    width={40}
                    height={40}
                  />
                  Play Store
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={Getmobilestyle} className='bg-center bg-no-repeat bg-black hidden max-[576px]:block '>
        <div className='container min-h-[750px] max-[1024px]:px-8 mx-auto max-[991px]:max-w-full py-[100px] flex items-center max-[479px]:px-4 max-[576px]:py-8 max-[576px]:min-h-[560px] max-[425px]:min-h-[560px] max-[375px]:px-4 max-[320px]:px-4 max-[479px]:items-start'>
          <div className='grid grid-cols-2 max-[771px]:grid-cols-1  w-[78%] mx-auto max-[1440px]:w-[90%] max-[1200px]:w-full'>
            <div>
              <div className='pb-14 max-[576px]:pb-8'>
                <h2 className='head-text font-[faktum] text-[65px] max-[1024px]:text-[56px] max-[991px]:text-[54px] w-[96%] max-[771px]:w-[80%] max-[576px]:w-full leading-[78px] text-white pb-8 font-semibold max-[479px]:text-center max-[479px]:text-[30px] max-[479px]:leading-10 max-[479px]:pb-4'>
                  Get the <span className='text-[#49D49D]'>BankSathi</span> mobile app
                </h2>
                <p className='text-[18px] text-white w-[65%] max-[1200px]:w-full max-[479px]:text-center max-[479px]:text-[12px]'>
                  Take charge of your financial requirements from anywhere and at any time.
                </p>
              </div>
              <div className='flex  gap-5 max-[479px]:justify-center '>
                <button className='px-4 cursor-pointer py-2 border text-[18px] max-[479px]:text-[16px] max-[375px]:text-[15px] border-white bg-white rounded-md text-[#212529] w-[35%]  max-[1200px]:w-[80%] max-[991px]:w-[40%] max-[479px]:w-[46%] max-[375px]:w-[50%] max-[320px]:w-[56%] flex items-center justify-center  gap-3 duration-200 font-semibold'>
                  <Image
                    src={Playstore}
                    alt='img'
                    className='w-[40px] h-[40px] max-[991px]:w-[30px] max-[991px]:h-[30px]'
                    width={40}
                    height={40}
                  />
                  Play Store
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GetMobileApp
