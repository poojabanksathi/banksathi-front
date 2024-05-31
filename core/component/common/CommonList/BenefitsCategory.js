import Image from 'next/image'
import React, { useState } from 'react'
import power from '../../../../public/assets/power.svg'
import benefitInstant from '../../../../public/assets/benefit-instant.svg'
import RealTime from '../../../../public/assets/real-time.svg'
import CompletelyTrans from '../../../../public/assets/Completely-transparent.svg'
import paperWork from '../../../../public/assets/no-paperwork.svg'
import investPrice from '../../../../public/assets/invest-price.svg'
import investExpert from '../../../../public/assets/invest-expert.svg'
import investRealible from '../../../../public/assets/invest-realible.svg'
import investResourse from '../../../../public/assets/invest-resourse.svg'
import investComparesion from '../../../../public/assets/invest-comparesion.svg'

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin']
})

function BenefitsCategory() {
  const [tabs, settab] = useState(0)
  return (
    <>
      <div className='py-[80px] max-[576px]:py-[40px] max-[393px]:pb-[60px]'>
        <div className='pb-8'>
          <h2 className='head-text text-[#212529] font-[faktum] text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[25px]  max-[375px]:text-[22px] max-[320px]:text-[21px] text-center font-semibold max-[479px]:leading-6 max-[320px]:leading-8 max-[280px]:text-[18px]'>
            Benefits of using BankSathi
          </h2>
        </div>
        <div className='w-[31%]  max-[1440px]:w-[38%] max-[1200px]:w-[46%] max-[1024px]:w-[50%] max-[820px]:w-[56%] max-[771px]:w-[68%]  max-[576px]:w-[92%]  grid grid-cols-2 gap-2 bg-white py-2 px-2 mx-auto justify-between rounded-full items-center  max-[479px]:w-full benefit-tabs'>
          <p
            className={`text-center cursor-pointer head-text font-[faktum] px-4 font-semibold text-[15px] py-4 max-[479px]:text-[12px] max-[479px]:px-2 max-[375px]:text-[12px] max-[320px]:text-[10px] max-[320px]:px-0 mt-0 rounded-full ${
              tabs == 0 ? 'bg-[#844FCF] text-white' : 'text-[#212529]'
            }`}
            onClick={() => settab(0)}>
            Credit Products
          </p>
          <p
            className={`text-center cursor-pointer head-text font-[faktum] text-[15px] font-semibold rounded-full max-[479px]:text-[12px] max-[479px]:px-2 py-4 px-4 max-[375px]:text-[12px] max-[360px]:text-[11px] max-[320px]:text-[10px] max-[320px]:px-0 mt-0 max-[280px]:text-[9px] ${
              tabs == 1 ? 'bg-[#844FCF]  text-white' : ' text-[#212529]'
            }`}
            onClick={() => settab(1)}>
            Investments & Insurance
          </p>
        </div>

        {tabs === 0 && (
          <div className='flex flex-wrap  justify-center font-[Poppins]  gap-12 max-[1440px]:gap-8 mx-auto rounded-lg max-[1200px]:gap-4 pt-10 cards-box-main max-[479px]:pt-5 px-20 max-[1440px]:px-0'>
            <div className='w-[425px] max-[1440px]:w-[360px] h-[260px] max-[1200px]:w-[330px] max-[1024px]:w-[300px] max-[991px]:w-[298px] max-[576px]:w-full max-[576px]:h-full max-[576px]:py-8 max-[479px]:py-6 bg-[#fff] px-5 py-[35px] rounded-2xl benefit-box'>
              <Image src={power} className='w-[46px] h-[46px] mx-auto' alt='img' />
              <div className='mt-4 text-center max-[479px]:mt-4 product-tab-box'>
                <p className='text-[18px]  font-semibold pb-2 max-[479px]:pb-4 max-[479px]:text-[15px] text-[#212529] max-[375px]:leading-6 leading-[25.2px] max-[479px]:w-[75%] mx-auto max-[320px]:w-full '>
                  AI-Based Product Recommendation
                </p>
                <p className='text-[16px] max-[479px]:text-[12px] max-[375px]:text-[12px] text-[#212529]  '>
                  Get Financial Products For Everyone, Powered By Artificial Intelligence
                </p>
              </div>
            </div>{' '}
            <div className='w-[425px] max-[1440px]:w-[360px] h-[260px] max-[1200px]:w-[330px] max-[1024px]:w-[300px] max-[991px]:w-[298px] max-[576px]:w-full max-[576px]:h-full max-[576px]:py-8 max-[479px]:py-6 bg-[#fff] px-5 py-[35px] rounded-2xl benefit-box'>
              <Image src={benefitInstant} className='w-[46px] h-[46px] mx-auto' alt='img' />
              <div className='mt-4 text-center max-[479px]:mt-4 product-tab-box'>
                <p className='text-[18px]  font-semibold pb-2 max-[479px]:pb-4 max-[479px]:text-[15px] text-[#212529] max-[375px]:leading-6 leading-[25.2px] max-[479px]:w-[56%] mx-auto max-[320px]:w-[68%]  '>
                  Get Your Approval <br /> Instantly
                </p>
                <p className='text-[16px] max-[479px]:text-[12px] max-[375px]:text-[12px] text-[#212529] max-[479px]:w-[80%] mx-auto'>
                  Apply Now and Enjoy Hassle-Free Transactions!
                </p>
              </div>
            </div>{' '}
            <div className='w-[425px] max-[1440px]:w-[360px] h-[260px] max-[1200px]:w-[330px] max-[1024px]:w-[300px] max-[991px]:w-[298px] max-[576px]:w-full max-[576px]:h-full max-[576px]:py-8 max-[479px]:py-6 bg-[#fff] px-5 py-[35px] rounded-2xl benefit-box'>
              <Image src={RealTime} className='w-[46px] h-[46px] mx-auto' alt='img' />
              <div className='mt-4 text-center max-[479px]:mt-4 product-tab-box'>
                <p className='text-[18px]  font-semibold pb-2 max-[479px]:pb-4 max-[479px]:text-[15px] text-[#212529] max-[375px]:leading-6 leading-[25.2px] max-[479px]:w-[48%] mx-auto max-[320px]:w-[68%] '>
                  Real-Time <br /> Comparison
                </p>
                <p className='text-[16px] max-[479px]:text-[12px] max-[375px]:text-[12px] text-[#212529] '>
                  Compare Your Favorite Banking Products & take the best Decision. 
                </p>
              </div>
            </div>
            <div className='w-[425px] max-[1440px]:w-[360px] h-[260px] max-[1200px]:w-[330px] max-[1024px]:w-[300px] max-[991px]:w-[298px] max-[576px]:w-full max-[576px]:h-full max-[576px]:py-8 max-[479px]:py-6 bg-[#fff] px-5 py-[35px] rounded-2xl benefit-box'>
              <Image src={CompletelyTrans} className='w-[46px] h-[46px] mx-auto' alt='img' />
              <div className='mt-4 text-center max-[479px]:mt-4 product-tab-box'>
                <p className='text-[18px]  font-semibold pb-2 max-[479px]:pb-4 max-[479px]:text-[15px] text-[#212529] max-[375px]:leading-6 leading-[25.2px] max-[479px]:w-[69%] max-[320px]:w-[78%]  mx-auto '>
                  Completely Transparent <br /> Process
                </p>
                <p className='text-[16px] max-[479px]:text-[12px] max-[375px]:text-[12px] text-[#212529] '>
                  We are committed to offering a completely open process. 
                </p>
              </div>
            </div>{' '}
            <div className='w-[425px] max-[1440px]:w-[360px] h-[260px] max-[1200px]:w-[330px] max-[1024px]:w-[300px] max-[991px]:w-[298px] max-[576px]:w-full max-[576px]:h-full max-[576px]:py-8 max-[479px]:py-6 bg-[#fff] px-5 py-[35px] rounded-2xl benefit-box'>
              <Image src={paperWork} className='w-[46px] h-[46px] mx-auto' alt='img' />
              <div className='mt-4 text-center max-[479px]:mt-4 product-tab-box'>
                <p className='text-[18px]  font-semibold pb-2 max-[479px]:pb-4 max-[479px]:text-[15px] text-[#212529] max-[375px]:leading-6 leading-[25.2px] max-[479px]:w-[75%] mx-auto max-[320px]:w-full '>
                  No Paperwork
                </p>
                <p className='text-[16px] max-[479px]:text-[12px] max-[375px]:text-[12px] text-[#212529] '>
                  complete the process quickly and hassle-free from home. 
                </p>
              </div>
            </div>
          </div>
        )}

        {tabs === 1 && (
          <div className='flex flex-wrap  justify-center  gap-12 mx-auto rounded-lg max-[1200px]:gap-4 pt-10 cards-box-main max-[479px]:pt-5'>
            <div className='w-[425px] max-[1440px]:w-[360px] h-[260px] max-[1200px]:w-[330px] max-[1024px]:w-[300px] max-[991px]:w-[298px] max-[576px]:w-full max-[576px]:h-full max-[576px]:py-8 max-[479px]:py-6 bg-[#fff] px-5 py-[35px] rounded-2xl benefit-box'>
              <Image src={investPrice} className='w-[46px] h-[46px] mx-auto' alt='img' />
              <div className='mt-4 text-center max-[479px]:mt-4 product-tab-box'>
                <p className='text-[18px]  font-semibold pb-2 max-[479px]:pb-4 max-[479px]:text-[15px] text-[#212529] max-[375px]:leading-6 leading-[25.2px] '>
                  Best Price Guaranteed
                </p>
                <p className='text-[16px] max-[479px]:text-[12px] max-[375px]:text-[12px] text-[#212529] max-[479px]:w-[80%] mx-auto'>
                  Choose from a plethora of plans and prices. Find the plan that matches your needs and pocket.
                </p>
              </div>
            </div>{' '}
            <div className='w-[425px] max-[1440px]:w-[360px] h-[260px] max-[1200px]:w-[330px] max-[1024px]:w-[300px] max-[991px]:w-[298px] max-[576px]:w-full max-[576px]:h-full max-[576px]:py-8 max-[479px]:py-6 bg-[#fff] px-5 py-[35px] rounded-2xl benefit-box'>
              <Image src={investExpert} className='w-[46px] h-[46px] mx-auto' alt='img' />
              <div className='mt-4 text-center max-[479px]:mt-4 product-tab-box'>
                <p className='text-[18px]  font-semibold pb-2 max-[479px]:pb-4 max-[479px]:text-[15px] text-[#212529] max-[375px]:leading-6 leading-[25.2px] '>
                  Unbiased expert advice
                </p>
                <p className='text-[16px] max-[479px]:text-[12px] max-[375px]:text-[12px] text-[#212529] max-[479px]:w-[80%] mx-auto'>
                  No favouritism! 100% transparency in product details, perks, and rates.
                </p>
              </div>
            </div>{' '}
            <div className='w-[425px] max-[1440px]:w-[360px] h-[260px] max-[1200px]:w-[330px] max-[1024px]:w-[300px] max-[991px]:w-[298px] max-[576px]:w-full max-[576px]:h-full max-[576px]:py-8 max-[479px]:py-6 bg-[#fff] px-5 py-[35px] rounded-2xl benefit-box'>
              <Image src={investRealible} className='w-[46px] h-[46px] mx-auto' alt='img' />
              <div className='mt-4 text-center max-[479px]:mt-4 product-tab-box'>
                <p className='text-[18px]  font-semibold pb-2 max-[479px]:pb-4 max-[479px]:text-[15px] text-[#212529] max-[375px]:leading-6 leading-[25.2px] '>
                  100% reliable
                </p>
                <p className='text-[16px] max-[479px]:text-[12px] max-[375px]:text-[12px] text-[#212529] max-[479px]:w-[80%] mx-auto'>
                  IRDAI Regulated
                </p>
              </div>
            </div>
            <div className='w-[425px] max-[1440px]:w-[360px] h-[260px] max-[1200px]:w-[330px] max-[1024px]:w-[300px] max-[991px]:w-[298px] max-[576px]:w-full max-[576px]:h-full max-[576px]:py-8 max-[479px]:py-6 bg-[#fff] px-5 py-[35px] rounded-2xl benefit-box'>
              <Image src={investResourse} className='w-[46px] h-[46px] mx-auto' alt='img' />
              <div className='mt-4 text-center max-[479px]:mt-4 product-tab-box'>
                <p className='text-[18px]  font-semibold pb-2 max-[479px]:pb-4 max-[479px]:text-[15px] text-[#212529] max-[375px]:leading-6 leading-[25.2px] '>
                  Resources
                </p>
                <p className='text-[16px] max-[479px]:text-[12px] max-[375px]:text-[12px] text-[#212529] max-[479px]:w-[80%] mx-auto'>
                  Blogs and tools to further guide you through the best deals.
                </p>
              </div>
            </div>{' '}
            <div className='w-[425px] max-[1440px]:w-[360px] h-[260px] max-[1200px]:w-[330px] max-[1024px]:w-[300px] max-[991px]:w-[298px] max-[576px]:w-full max-[576px]:h-full max-[576px]:py-8 max-[479px]:py-6 bg-[#fff] px-5 py-[35px] rounded-2xl benefit-box'>
              <Image src={investComparesion} className='w-[46px] h-[46px] mx-auto' alt='img' />
              <div className='mt-4 text-center max-[479px]:mt-4 product-tab-box'>
                <p className='text-[18px]  font-semibold pb-2 max-[479px]:pb-4 max-[479px]:text-[15px] text-[#212529] max-[375px]:leading-6 leading-[25.2px] '>
                  Comparison before Decision
                </p>
                <p className='text-[16px] max-[479px]:text-[12px] max-[375px]:text-[12px] text-[#212529] max-[479px]:w-[80%] mx-auto'>
                  No confusion anymore. Shortlist and compare plans based on crucial factors.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default BenefitsCategory
