import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const BankSecurityCards = dynamic(() => import('../../../common/CommonList/BankSecurityCards'), {
  ssr: false
})
function BankOverview() {
  return (
    <>
      <div className='bg-[#49D49D]'>
        <div className='container  min-h-[500px] max-[1024px]:px-8 mx-auto max-[479px]:min-h-[1178px] max-[991px]:max-w-full py-[100px] max-[576px]:px-6 max-[479px]:px-4  max-[479px]:py-[30px] max-[375px]:px-4 max-[320px]:px-4 bank-overview'>
          <div className='grid grid-cols-2 px-20 mx-auto gap-8 items-center max-[1200px]:w-full max-[1200px]:px-0 max-[576px]:grid-cols-1 max-[576px]:gap-12 max-[479px]:gap-2'>
            <div className=''>
              <div className='pb-10 '>
                {/* <Link href='/about-us' prefetch={false}> */}
                  <h2 className='head-text font-[faktum] font-semibold text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-center max-[479px]:text-[28px] text-left text-[#212529] pb-5'>
                    Why BankSathi?
                  </h2>
                {/* </Link> */}
                <p className='text-[#212529] font-[Poppins] text-[18px] max-[479px]:text-[16px] max-[425px]:text-[12px] max-[375px]:text-[12px] font-normal pb-5 w-[80%] max-[820px]:w-full max-[479px]:text-center why-bank-sub'>
                  At BankSathi, our vision is to increase awareness about financial products and make it easy for you to
                  choose and use them at the appropriate time. 
                </p>

                <p className='text-[#212529] font-[Poppins] text-[18px] max-[479px]:text-[16px] max-[425px]:text-[12px] max-[375px]:text-[12px] font-normal pb-5 w-[80%] max-[820px]:w-full max-[479px]:text-center why-bank-sub'>
                  We advocate our users to financial institutions for getting the best in class deals that enable wealth
                  creation.
                </p>
                <div className='max-[479px]:text-center'>
                  <Link href='/about-us' prefetch={false}>
                    <button className='text-[#212529] cursor-pointer head-text font-[faktum]  py-[15px] px-[27px] mt-4 rounded-lg border border-[#000] text-[14px] font-semibold recome-card-btn'>
                      About BankSathi
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='grid grid-cols-2 max-[479px]:grid-cols-1 gap-8 pb-10 max-[479px]:!pb-[35px] max-[479px]:gap-[30px]'>
                <div className='max-[479px]:text-center'>
                  <p className='text-[36px] font-[faktum] font-semibold text-[#212529] max-[771px]:text-[28px] max-[479px]:text-[24px] max-[375px]:text-[24px] max-[320px]:text-[24px] '>
                    24+ Lacs
                  </p>
                  <p className='text-[18px] font-[Poppins] text-[#212529] max-[479px]:text-[17px] mt-0'>
                    Happy Customers
                  </p>
                </div>
                <div className='max-[479px]:text-center'>
                  <p className='text-[36px] font-[faktum] font-semibold text-[#212529] max-[771px]:text-[28px] max-[479px]:text-[24px] max-[375px]:text-[24px] max-[320px]:text-[20px]'>
                    15+ Lacs
                  </p>
                  <p className='text-[18px] font-[Poppins] text-[#212529] max-[479px]:text-[17px] mt-0'>
                    Advisors all over India
                  </p>
                </div>
                <div className='max-[479px]:text-center'>
                  <p className='text-[36px] font-[faktum] font-semibold text-[#212529] max-[771px]:text-[28px] max-[479px]:text-[24px] max-[375px]:text-[24px] max-[320px]:text-[20px]'>
                    5.6+ Lacs
                  </p>
                  <p className='text-[18px] font-[Poppins] text-[#212529] max-[479px]:text-[17px] mt-0'>
                    Products Sold
                  </p>
                </div>
                <div className='max-[479px]:text-center'>
                  <p className='text-[36px] font-[faktum] font-semibold text-[#212529] max-[771px]:text-[28px] max-[479px]:text-[24px] max-[375px]:text-[24px] max-[320px]:text-[20px]'>
                    154+
                  </p>
                  <p className='text-[18px] font-[Poppins] text-[#212529] max-[479px]:text-[17px] mt-0'>
                    Financial institutions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BankSecurityCards />
    </>
  )
}

export default BankOverview
