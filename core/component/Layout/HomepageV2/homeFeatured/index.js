import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function HomeFeatured() {
  return (
    <div>
      <div className='second-container lines-bg '>
        <div className='featured lg:px-24 pt-10 lg:pb-16 pb-10'>
          <p className='uppercase font-semibold text-center text-[15px] text-black'>Featured In</p>
          <div className='swiper featuredSwiper lg:mt-10 mt-6'>
            <div className='swiper-wrapper overflow-auto flex items-center'>
              <div className='swiper-slide lg:px-10 px-2'>
                <Image src='/assets/logo/image 418.png' className='w-full max-md:w-[160px] max-md:max-w-[160px] h-full' width={160} height={80} alt='image' />
              </div>
              <div className='swiper-slide lg:px-10 px-2'>
                <Image src='/assets/logo/image 419.png' alt='image' className='w-full max-md:w-[160px] max-md:mx-[20px] max-md:max-w-[160px] h-full' width={160} height={80} />
              </div>
              <div className='swiper-slide lg:px-10 px-2'>
                <Image src='/assets/logo/image 420.png' alt='image' className='w-full max-md:w-[160px] max-md:mx-[20px] max-md:max-w-[160px] h-full' width={160} height={80} />
              </div>
              <div className='swiper-slide lg:px-10 px-2'>
                <Image src='/assets/logo/image 421.png' alt='image' className='w-full max-md:w-[160px] max-md:mx-[20px] max-md:max-w-[160px] h-full' width={160} height={80} />
              </div>
              <div className='swiper-slide lg:px-10 px-2'>
                <Image src='/assets/logo/image 424.png' alt='image' className='w-full max-md:w-[160px] max-md:mx-[20px] max-md:max-w-[160px] h-full' width={160} height={80} />
              </div>
              <div className='swiper-slide lg:px-10 px-2'>
                <Image src='/assets/logo/image 425.png' alt='image' className='w-full max-md:w-[160px] max-md:mx-[20px] max-md:max-w-[160px] h-full' width={160} height={80} />
              </div>
            </div>
            <div className='swiper-pagination'></div>
          </div>
        </div>
        <div className='categories lg:px-24 lg:pb-24 px-6 '>
          <div className='lg:w-1/3 w-full mx-auto '>
            <div className='lg:flex inline-flex items-center'>
              <div>{/* <!-- <h2 className="lg:text-[120px] text-[60px] number leading-3">4</h2> --> */}</div>
              <div>
                <h2 className='lg:text-[28px] text-black text-[18px] ml-1 lg:text-center text-center ml-5'>
                  Explore the Best Financial Products
                </h2>
              </div>
            </div>
          </div>
          <div className='lg:mt-20 mt-10'>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-x-20 gap-y-8'>
              <div
                className='bg-white hover:bg-blue-100 transition-all cursor-pointer hover:border-r-8 hover:border-blue-300
                         hover:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] lg:p-10 p-6 rounded-[24px] categ-bg-one'>
                         <Link href={'/credit-cards'} prefetch={false}>
                <div className='flex items-center justify-center h-full'>
                  <div>
                    <h3 className='lg:text-[24px] text-[20px] '>Credit Cards</h3>
                    <p className='pop lg:text-[16px] text-[14px] lg:w-[100%] w-[90%] mt-2'>
                      Unlock Limitless Possibilities with our Credit Cards
                    </p>
                  </div>
                </div>
                </Link>
              </div>
              <div className='row-span-2 lg:block hidden'>
                <Image src='/assets/categ.svg' className='w-full h-full' width={80} height={80} alt='image' />
              </div>
              <div
                className='bg-white hover:bg-red-50 transition-all cursor-pointer hover:border-r-8 hover:border-red-300
                         hover:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] lg:p-10 p-6 rounded-[24px]
                         categ-bg-two'>
                <div className='flex items-center justify-center h-full'>
                  <div>
                    <h3 className='lg:text-[24px] text-[20px] '>Bank Accounts </h3>
                    <p className='pop lg:text-[16px] text-[14px] lg:w-[100%] w-[90%] mt-2'>
                      Seamlessly Manage Your Finances with Bank Accounts
                    </p>
                  </div>
                </div>
              </div>
              <div
                className='bg-white hover:bg-green-50 transition-all cursor-pointer hover:border-r-8 hover:border-green-500
                         hover:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] lg:p-10 p-6 rounded-[24px]
                         categ-bg-three'>
                <div className='flex items-center justify-center h-full'>
                  <div>
                    <h3 className='lg:text-[24px] text-[20px]'>Personal Loans </h3>
                    <p className='categ-details w-[ 60%] mt-2'>Achieve Your Dreams with Easy and Flexible Loans</p>
                  </div>
                </div>
              </div>
              <div
                className='bg-white hover:bg-yellow-50 transition-all cursor-pointer hover:border-r-8 hover:border-yellow-300
                         hover:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] lg:p-10 p-6 rounded-[24px]
                         categ-bg-four'>
                <div className='flex items-center justify-center h-full'>
                  <div>
                    <h3 className='lg:text-[24px] text-[20px]'>Demat Accounts </h3>
                    <p className='categ-details w-[ 60%] mt-2'>Dive into the World of Investments with Demat Accounts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='stats lg:px-24 lg:pb-24 px-6 pb-8'>
          <div className='stats-grid bg-[#2D2D2D] mt-8 lg:p-10 p-4 rounded-[24px]'>
            <div className='grid lg:grid-cols-6 grid-cols-2 gap-y-3 grid-match'>
              <div className='lg:col-span-2 col-span-2 border-1 lg:border-r-[1px] flex items-center'>
                <Image className='lg:w-[100px] w-[80px]' src='/assets/fi_3336068.svg' alt='image' width={80} height={80}/>
                <p className='md:w-[60%] lg:text-[24px] text-[18px] ml-7 text-white'>We cover 98% Pin Codes</p>
              </div>
              <div className='border-1 border-r-[1px] p-2  flex items-center justify-center'>
                <div className=''>
                  <div>
                    <p className='text-[22px] text-center text-[#49D49D]'>₹ 100Cr+</p>
                    <p className='text-[18px] text-center text-white max-[479px]:text-[16px]'>Advisor Earning</p>
                  </div>
                </div>
              </div>
              <div className='border-1 lg:border-r-[1px] p-2  flex items-center justify-center'>
                <div className=''>
                  <p className='text-[22px] text-center text-[#49D49D]'>4 Mn</p>
                  <p className='text-[18px] text-center text-white max-[479px]:text-[16px]'>Customer Base</p>
                </div>
              </div>
              <div className='border-1 border-r-[1px] p-2  flex items-center justify-center'>
                <div className=''>
                  <p className='text-[22px] text-center text-[#49D49D]'>70 +</p>
                  <p className='text-[18px] text-center text-white max-[479px]:text-[16px]'>Total Products</p>
                </div>
              </div>
              <div className=' p-2  flex items-center justify-center'>
                <div className=''>
                  <p className='text-[22px] text-center text-[#49D49D]'>1.5 Mn +</p>
                  <p className='text-[18px] text-center text-white max-[479px]:text-[16px]'>Advisors Networks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeFeatured
