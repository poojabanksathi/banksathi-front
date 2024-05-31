import Image from 'next/image'
import React from 'react'
import multipleProducts from '../../../../public/assets/multiple-products.svg'
import safety from '../../../../public/assets/safety.svg'
import support from '../../../../public/assets/support.svg'
import trustedBrands from '../../../../public/assets/trusted-brands.svg'
import riskManagememt from '../../../../public/assets/risk-manage.svg'
import excellentResults from '../../../../public/assets/excellent-result.svg'
import dynamic from 'next/dynamic'

const PartnersBottomBanner = dynamic(
  () => import('@/core/component/Partners/PartnersBottomBanner/PartnersBottomBanner'),
  {
    ssr: false
  }
)
const PartnersInfo = ({ windowSize, formRef }) => {
  const getInTouchText = 'Get in Touch'

  const getMobileComponent = () => {
    return (
      <div className=' bg-white  rounded-[30px] flex flex-col gap-[25px] items-start justify-center mt-[42px] p-[20px] mx-[20px]'>
        <div className='flex items-start gap-[16px]'>
          <div className='flex flex-col items-start'>
            <div className='w-[38px] h-[38px] flex bg-violet-600 rounded-[90px]' />
            <div className='flex text-white text-[21.33px] font-semibold relative bottom-[35px] left-[37%]'>1</div>
            <div className='w-[42.05px] border border-dashed rotate-90'></div>
          </div>
          <div className='flex flex-col items-start gap-[10px]'>
            <div className=' flex text-black text-lg font-semibold'>{getInTouchText}</div>
            <div className='flex h-[41px] text-black text-[15px] font-medium'>
              Connect with Us Today: Let&apos;s start something great!
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center gap-[16px]'>
          <div className='flex flex-col items-start'>
            <div className='w-[38px] h-[38px] flex bg-violet-600 rounded-[90px]' />
            <div className='flex text-white text-[21.33px] font-semibold relative bottom-[35px] left-[37%]'>2</div>
            <div className='w-[42.05px] border border-dashed rotate-90'></div>
          </div>
          <div className='flex flex-col items-start gap-[10px]'>
            <div className=' flex text-black text-lg font-semibold'>Discuss</div>
            <div className='flex h-[41px] text-black text-[15px] font-medium'>
              Engage in Dialogue: Ignite ideas and foster collaborative opportunities
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center gap-[16px]'>
          <div className='flex flex-col items-start'>
            <div className='w-[38px] h-[38px] flex bg-violet-600 rounded-[90px]' />
            <div className='flex text-white text-[21.33px] font-semibold relative bottom-[35px] left-[37%]'>3</div>
          </div>
          <div className='flex flex-col items-start gap-[10px]'>
            <div className=' flex text-black text-lg font-semibold'>It’s Live</div>
            <div className='flex h-[41px] text-black text-[15px] font-medium'>
              Product Launched: Watch your revenue and profit grow.
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex items-center justify-center mt-[88px] max-sm:mt-[41px] text-center text-neutral-500 text-sm font-semibold uppercase mx-auto  '>
          Seize the Opportunity: Unlock Growth
        </div>
        <div className='flex items-center justify-center mx-auto max-sm:flex-wrap'>
          <div className='flex items-center justify-center mt-[57px] gap-[80px] ml-[30px] max-sm:ml-[30px] max-sm:mt-[28px]'>
            <div className='flex flex-col items-center'>
              <div className='flex items-center text-center text-violet-600 text-[44px] font-semibold max-sm:text-[34px] max-sm:leading-[42px]'>
                100+
              </div>
              <div className='flex items-center text-center text-black text-lg font-medium max-sm:text-[14px] max-sm:leading-[21px]'>
                Partners Onboarded
              </div>
            </div>
            {windowSize >= 770 && <div className='w-[67px] rotate-90 border border-stone-300'></div>}
          </div>
          <div className='flex items-center justify-center mt-[57px] gap-[80px] ml-[30px] max-sm:ml-[30px] max-sm:mt-[28px]'>
            <div className='flex flex-col items-center'>
              <div className='flex items-center text-center text-violet-600 text-[44px] font-semibold max-sm:text-[34px] max-sm:leading-[42px]'>
                18K+
              </div>
              <div className='flex items-center text-center text-black text-lg font-medium max-sm:text-[14px] max-sm:leading-[21px]'>
                PinCodes Covered
              </div>
            </div>
            {windowSize >= 770 && <div className='w-[67px] rotate-90 border border-stone-300'></div>}
          </div>
          <div className='flex items-center justify-center mt-[57px] gap-[80px] ml-[30px] max-sm:ml-[30px] max-sm:mt-[28px]'>
            <div className='flex flex-col items-center'>
              <div className='flex items-center text-center text-violet-600 text-[44px] font-semibold max-sm:text-[34px] max-sm:leading-[42px]'>
                1.5Mn+
              </div>
              <div className='flex items-center text-center text-black text-lg font-medium max-sm:text-[14px] max-sm:leading-[21px]'>
                Advisor Community
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex items-center justify-center mt-[96px] max-sm:mt-[46px] mx-[308px] gap-[2px] max-sm:mx-[20px] max-[1024px]:mx-[30px]`}>
        <div className='text-center'>
          <span className='text-black text-4xl font-semibold min-[1440px]:text-4xl  max-sm:text-[20px] max-sm:leading-[25px] min-[768px]:leading-[25px] min-[768px]:text-[20px] '>
            Partner with us for:{' '}
          </span>
          <span className='text-emerald-400 text-4xl font-semibold min-[1440px]:text-4xl  max-sm:text-[20px] max-sm:leading-[25px] min-[768px]:leading-[25px] min-[768px]:text-[20px]'>
            Mutual Growth,
          </span>
          <span className='text-black text-4xl font-semibold min-[1440px]:text-4xl  max-sm:text-[20px] max-sm:leading-[25px] min-[768px]:leading-[25px] min-[768px]:text-[20px]'>
            {' '}
            Extended Reach & Collaborative Success
          </span>
        </div>
      </div>
      <div
        className={`grid grid-cols-3 mt-[93px] mx-[125px] max-sm:mx-[16px] gap-[50px] max-sm:mt-[35px] max-sm:grid-cols-1 max-sm:gap-[24px] max-[1024px]:grid-cols-2 max-[1024px]:mx-[20px]`}>
        <div className='flex flex-col items-center justify-center h-[326px] bg-white rounded-[32px]'>
          <Image src={multipleProducts} width={131} height={81} alt='image' />
          <div className='text-center text-black text-[22px] font-semibold mt-[30px]'>Multiple Products</div>
          <div className='text-center text-black text-sm font-medium mt-[10px] mx-[22px]'>
            Variety of products, one platform – your ultimate destination for diverse choices & convenience.
          </div>
        </div>
        <div className='flex flex-col items-center justify-center h-[326px] bg-white rounded-[32px]'>
          <Image src={safety} width={166} height={95} alt='image' />
          <div className='text-center text-black text-[22px] font-semibold mt-[30px]'>Safety & Transparency</div>
          <div className='text-center text-black text-sm font-medium mt-[10px] mx-[22px]'>
            Transparent process <br></br> We are Committed to Providing a Safe, secure and clear approach
          </div>
        </div>
        <div className='flex flex-col items-center justify-center h-[326px] bg-white rounded-[32px]'>
          <Image src={support} width={96} height={108} alt='image' />
          <div className='text-center text-black text-[22px] font-semibold mt-[30px]'>Support & Engagement</div>
          <div className='text-center text-black text-sm font-medium mt-[10px] mx-[22px]'>
            Consistent insights: Stay informed on product performance, key metrics, & conversion updates.
          </div>
        </div>
        <div className='flex flex-col items-center justify-center h-[326px] bg-white rounded-[32px]'>
          <Image src={trustedBrands} width={127} height={111} alt='image' />
          <div className='text-center text-black text-[22px] font-semibold mt-[30px]'>Trusted Brand Name</div>
          <div className='text-center text-black text-sm font-medium mt-[10px] mx-[22px]'>
            India&apos;s leading financial distributor, entrusted by leading institutions for exceptional services and
            expertise.
          </div>
        </div>
        <div className='flex flex-col items-center justify-center h-[326px] bg-white rounded-[32px]'>
          <Image src={riskManagememt} width={92} height={95} alt='image' />
          <div className='text-center text-black text-[22px] font-semibold mt-[30px]'>Risk Management</div>
          <div className='text-center text-black text-sm font-medium mt-[10px] mx-[39px]'>
            Empowering Partners with Cutting-edge Risk Management Solutions for Financial Success.
          </div>
        </div>
        <div className='flex flex-col items-center justify-center h-[326px] bg-white rounded-[32px]'>
          <Image src={excellentResults} width={71} height={98} alt='image' />
          <div className='text-center text-black text-[22px] font-semibold mt-[30px]'>Excellent results</div>
          <div className='text-center text-black text-sm font-medium mt-[10px] mx-[55px]'>
            Enhanced leads, elevated conversions – achieving more with our optimized strategies.
          </div>
        </div>
      </div>
      <div className='mt-[56px] max-sm:mt-[39px]'>
        <div className='text-center text-black text-[32px] font-semibold max-sm:text-[16px]'>
          Open to collaboration?
        </div>
        {windowSize >= 1024 ? (
          <div className='flex items-center justify-center mt-[75px]'>
            <div className='flex items-center w-auto mx-auto h-[97px] bg-white rounded-[90px]'>
              <div className='flex items-center relative bottom-[20px] px-[20px]'>
                <div className='flex items-center gap-[18px]'>
                  <div className='flex items-center w-[63px] h-[63px] bg-violet-600 rounded-[90px] relative top-[16px]'>
                    <div className='text-white text-[32px] font-semibold relative left-[41%] top-[3%]'>1</div>
                  </div>
                  <div className='flex text-center text-black text-[26px] font-semibold relative top-[18px]'>
                    {getInTouchText}
                  </div>
                  <div className='w-[202px] border border-dashed flex items-center mx-[30px] relative top-[18px] max-[1024px]:w-[100px]'></div>
                </div>
                <div className='flex items-center gap-[18px]'>
                  <div className='flex items-center w-[63px] h-[63px] bg-violet-600 rounded-[90px] relative top-[16px]'>
                    <div className='text-white text-[32px] font-semibold relative left-[41%] top-[3%]'>2</div>
                  </div>
                  <div className='flex text-center text-black text-[26px] font-semibold relative top-[18px]'>
                    Discuss
                  </div>
                  <div className='w-[202px] border border-dashed flex items-center mx-[30px] relative top-[18px] max-[1024px]:w-[100px]'></div>
                </div>
                <div className='flex items-center gap-[18px]'>
                  <div className='flex items-center w-[63px] h-[63px] bg-violet-600 rounded-[90px] relative top-[16px]'>
                    <div className='text-white text-[32px] font-semibold relative left-[41%] top-[3%]'>3</div>
                  </div>
                  <div className='flex text-center text-black text-[26px] font-semibold relative top-[18px]'>
                    It’s Live
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          getMobileComponent()
        )}
      </div>
      <PartnersBottomBanner windowSize={windowSize} formRef={formRef} />
    </>
  )
}

export default PartnersInfo
