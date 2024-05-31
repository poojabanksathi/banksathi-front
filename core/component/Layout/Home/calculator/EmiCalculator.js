import dynamic from 'next/dynamic'
import React, { useState } from 'react'

const Chartdough = dynamic(() => import('../../../common/Graph/Chartdough'), {
  ssr: false
})

function EmiCalculator() {
  const [tabs, settab] = useState(0)
  const [value, setValue] = useState(50)

  function handleChange(event) {
    setValue(event.target.value)
  }

  return (
    <div className='bg-[#F4F8FB] '>
      <div className=' container   max-[1024px]:px-8 mx-auto max-[991px]:max-w-full py-[100px] max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 max-[375px]:hidden'>
        <div className='w-[78%] mx-auto max-[1440px]:w-[90%] max-[1200px]:w-full'>
          <div className='pb-10'>
            <h3 className='head-text font-[faktum] font-semibold text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px]  max-[576px]:text-[34px] max-[479px]:text-[28px] max-[479px]:leading-10 max-[375px]:text-[24px] max-[320px]:text-[22px] text-left text-[#212529]'>
              EMI Calculator
            </h3>
            <p className='text-[24px] font-normal max-[771px]:text-[20px] max-[576px]:text-[18px] max-[375px]:text-[18px] max-[320px]:text-[16px] text-[#212529] youtub-sub'>
              Invest the way you want
            </p>
          </div>
          <div className='pb-8'>
            <div className='benefit-tabs emi-tabs w-[26%] max-[1440px]:w-[28%] max-[1200px]:w-[30%] max-[1024px]:w-[32%] max-[820px]:w-[42%] max-[771px]:w-[45%] max-[576px]:w-[60%] flex gap-2  bg-white py-2 px-2 justify-between rounded-full items-center max-[479px]:w-full'>
              <p
                className={`head-text font-[faktum] px-6 font-semibold text-[15px] py-2  max-[320px]:px-4 rounded-full ${
                  tabs == 0 ? 'bg-[#844FCF] text-white' : 'text-[#212529]'
                }`}
                onClick={() => settab(0)}>
                Personal Loan
              </p>
              <p
                className={`head-text font-[faktum] text-[15px] font-semibold rounded-full py-2 px-6 max-[320px]:px-4 mt-0 ${
                  tabs == 1 ? 'bg-[#844FCF]  text-white' : ' text-[#212529]'
                }`}
                onClick={() => settab(1)}>
                Home Loan
              </p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 w-[78%] gap-8 mx-auto max-[1440px]:w-[90%] max-[1200px]:w-full max-[576px]:grid-cols-1 max-[576px]:gap-12 '>
          <div>
            <div className='pb-14'>
              <div className='flex w-full justify-between items-center pb-5'>
                <p className='font-semibold text-[20px] max-[576px]:text-[18px] max-[479px]:text-[16px] max-[320px]:text-[16px] text-[#212529] max-[820px]:text-[18px]'>
                  Loan Ammount
                </p>
                <button className='bg-[#DEF7ED] cursor-pointer text-[#212529] py-2 px-6 font-semibold text-[18px] w-auto text-right  max-[479px]:text-[16px] max-[320px]:text-[14px] range-number max-[820px]:text-[16px]'>
                  <span className='symbole-rupee'>₹</span> 10,00,000
                </button>
              </div>
              <div>
                <input
                  type='range'
                  className='w-full slider'
                  id='vol'
                  name='vol'
                  min='0'
                  max='100'
                  value={value}
                  onChange={handleChange}
                  style={{
                    background:
                      'linear-gradient(to right, green 0%, green ' + value + '%, #ddd ' + value + '%, #ddd 100%)'
                  }}
                />
              </div>
            </div>
            <div className='pb-14'>
              <div className='flex w-full justify-between items-center pb-5'>
                <p className='font-semibold text-[20px] max-[576px]:text-[18px] max-[479px]:text-[16px] max-[320px]:text-[16px] text-[#212529] max-[820px]:text-[18px]'>
                  Rate of Interest (p.a)
                </p>
                <button className='bg-[#DEF7ED] cursor-pointer text-[#212529] py-2 px-6 font-semibold text-[18px] w-auto text-right  max-[479px]:text-[16px] max-[320px]:text-[14px] range-number max-[820px]:text-[16px]'>
                  10.5%
                </button>
              </div>
              <div>
                <input
                  type='range'
                  className='w-full slider'
                  id='vol'
                  name='vol'
                  min='0'
                  max='100'
                  value={value}
                  onChange={handleChange}
                  style={{
                    background:
                      'linear-gradient(to right, green 0%, green ' + value + '%, #ddd ' + value + '%, #ddd 100%)'
                  }}
                />
              </div>
            </div>
            <div>
              <div className='flex w-full justify-between items-center pb-5'>
                <p className='font-semibold text-[20px] max-[576px]:text-[18px] max-[479px]:text-[16px] max-[320px]:text-[16px] text-[#212529] max-[820px]:text-[18px]'>
                  Loan Tenure
                </p>
                <button className='bg-[#DEF7ED] cursor-pointer text-[#212529] py-2 px-6 font-semibold text-[18px] w-auto text-right  max-[479px]:text-[16px] max-[320px]:text-[14px] range-number max-[820px]:text-[16px]'>
                  5Yr
                </button>
              </div>
              <div>
                <input
                  type='range'
                  className='w-full slider'
                  id='vol'
                  name='vol'
                  min='0'
                  max='100'
                  style={{
                    background:
                      'linear-gradient(to right, green 0%, green ' + value + '%, #ddd ' + value + '%, #ddd 100%)'
                  }}
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 max-[820px]:items-center bg-white rounded-2xl py-8 px-8 max-[771px]:grid-cols-2  max-[771px]:items-center max-[771px]:gap-4 max-[576px]:px-2 max-[320px]:grid-cols-1'>
            <div className='chart'>
              <Chartdough />
            </div>
            <div className='ml-10 grid grid-cols-1 gap-4 max-[479px]:ml-0 max-[771px]:ml-0 max-[320px]:text-center max-[820px]:ml-6'>
              <div className='pb-4'>
                <p className='text-[15px] font-normal max-[375px]:text-[14px] max-[320px]:text-[12px] text-[#212529]'>
                  Monthly EMI
                </p>
                <p className='text-[20px] font-semibold max-[576px]:text-[18px] max-[375px]:text-[16px] max-[320px]:text-[16px] text-[#212529]'>
                  <span className='symbole-rupee'>₹</span> 21,494
                </p>
              </div>
              <div className='pb-4'>
                <p className='text-[15px] font-normal max-[375px]:text-[14px] max-[320px]:text-[12px] text-[#212529]'>
                  Loan Amount
                </p>
                <p className='text-[20px] font-semibold max-[576px]:text-[18px] max-[375px]:text-[16px] max-[320px]:text-[16px] text-[#212529]'>
                  <span className='symbole-rupee'>₹</span> 10,00,000
                </p>
              </div>
              <div className='pb-4'>
                <p className='text-[15px] font-normal max-[375px]:text-[14px] max-[320px]:text-[12px] text-[#212529]'>
                  Total Interest Payable
                </p>
                <p className='text-[20px] font-semibold max-[576px]:text-[18px] max-[375px]:text-[16px] max-[320px]:text-[16px] text-[#212529]'>
                  <span className='symbole-rupee'>₹</span> 2,89,634
                </p>
              </div>
              <div className=''>
                <p className='text-[15px] font-normal max-[375px]:text-[14px] max-[320px]:text-[12px] text-[#212529]'>
                  Total Amount Payable
                </p>
                <p className='text-[20px] font-semibold max-[576px]:text-[18px] max-[375px]:text-[16px] max-[320px]:text-[16px] text-[#212529]'>
                  <span className='symbole-rupee'>₹</span> 12,89,634
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmiCalculator
