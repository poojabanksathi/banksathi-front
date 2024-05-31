import { ImageBaseUrl, getInterestRate, getLoanAmount, getLoanTenure, getRange } from '@/utils/util'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductSection = ({ productDetailsData }) => {
  const productInfo = productDetailsData?.product_details || {}
  const { interest_rate_min, interest_rate_max, loan_amount_max, loan_amount_min, loan_tenure_min, loan_tenure_max } =
    productInfo

  const interest = getInterestRate(interest_rate_min, interest_rate_max)
  const loanAmount = getLoanAmount(loan_amount_min, loan_amount_max)
  const loanTenure = getLoanTenure(loan_tenure_min, loan_tenure_max)

  const productFeatures = [
    { id: '1', title: 'Interest Rate', value: interest },
    { id: '2', title: 'Loan Amount', value: loanAmount },
    { id: '3', title: 'Processing fees', value: productInfo?.processing }
  ]

  return (
    <div className='mt-[60px] max-sm:mt-[40px] flex flex-row items-start justify-start max-sm:flex-col max-sm:gap-4'>
      <div className='w-[200px] h-auto rounded-lg border border-slate-200 flex items-center justify-center mr-[40px]'>
        <Image
          src={`${ImageBaseUrl}/${productInfo?.product_image}`}
          alt='bank image'
          width={240}
          height={100}
          className='w-full h-full'
        />
      </div>
      <div className='flex flex-col'>
        {productFeatures?.map((item) => {
          return (
            <div className='flex flex-row gap-x-[16px] mb-[18px] w-full' key={item?.id}>
              {item?.value ? (
                <>
                  <div className='w-[46px] md:w-[34px] max-sm:w-[34px] h-[31px] p-2 bg-violet-100 rounded-full flex justify-center items-center gap-2'>
                    <Image src={'/assets/Star-18.svg'} alt='star' width={15} height={15} />
                  </div>
                  <div className='flex flex-col gap-0 items-start'>
                    <div className="text-neutral-800 text-[14px] lg:text-[16px] font-semibold font-['Poppins'] leading-[21px]">
                      {item?.title}
                    </div>
                    <div className="text-neutral-800 text-[12px] lg:text-[14px] font-normal font-['Poppins'] leading-[24px]">
                      {item?.value}
                    </div>
                    {item?.title === 'Loan Amount' && (
                      <div className="text-neutral-800 text-[12px] lg:text-[14px] font-normal font-['Poppins'] leading-[24px]">
                        Tenure : {loanTenure}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          )
        })}
        {productInfo?.url_slug && (
          <p className=' max-sm:text-left md:text-left max-sm:py-4 max-sm:px-2 text-[#49D49D] font-[faktum]'>
            <Link href={'/' + productInfo?.url_slug} className='xl:text-[20px] sm:text-[18px] max-sm:text-[15px] text-[#49D49D]'>
              View Details
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductSection
