import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import InOffer from '../../../../../public/assets/InOffer.svg'
import maxLife from '../../../../../public/assets/max-life-insurance.svg'
import trueIcon from '../../../../../public/assets/true-icon.svg'

function InsuranceOffers() {
  return (
    <>
      <div className='insurance-offer-card'>
        <div className='pb-4'>
          <p className='text-[#212529] head-text font-[faktum] xl:text-4xl lg:text-3xl md:text-2xl  max-[576px]:text-[28px] max-[479px]:text-[22px] font-semibold max-[479px]:text-center '>
            Insurance Offers
          </p>
        </div>
        <div>
          <div className='rounded-3xl bg-white card-insight mb-8'>
            <div className='px-6 pt-5 cards-details-filter border-b max-[479px]:border-b-0'>
              <div>
                <button className='bg-[#E5FFF5] cursor-pointer text-[#49D49D] py-2 px-3 gap-2 text-xs flex items-center font-[Poppins] font-semibold'>
                  <Image src={InOffer} alt='payment' className='w-3.5 h-4' width={10} height={10} />
                  Insurance Offer
                </button>
              </div>
              <div className='flex justify-between gap-5 max-[479px]:flex-col'>
                <div className='flex items-center gap-6 max-[479px]:flex-col max-[479px]:items-start max-[479px]:gap-0'>
                  <div className='w-[100px] h-[99px] flex'>
                    <Image
                      src={maxLife}
                      alt='card image'
                      width={100}
                      height={99}
                      className='xl:w-full md:w-full max-[479px]:mx-auto'
                      unoptimized={true}
                    />
                  </div>
                  <div>
                    <p className='text-[24px] text-[#212529] font-medium leading-[33.6px] font-[Poppins] max-[479px]:text-[15px]'>
                      Max Life Insurance
                    </p>
                    <p className='text-[15px] text-[#844FCF] font-medium leading-[21px] font-[Poppins] max-[479px]:text-[12px]'>
                      Get ₹5 Lac Health Cover @ ₹300/month
                    </p>
                  </div>
                </div>
                <div className='flex max-[479px]:hidden items-center gap-5'>
                  <Link href='#' prefetch={false}>
                    <button className='business-right-text cursor-pointer text-[15px] px-4 py-3.5 w-full rounded-lg text-white bg-[#49D49D] font-semibold max-[320px]:text-[14px] font-[Faktum]'>
                      Get Insured
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-5 px-6  py-5 font-[Montserrat] max-[479px]:block'>
              <div className='flex items-center gap-2 leading-[26px]'>
                <Image src={trueIcon} width={15} height={15} alt='img' className='' />
                <p className='text-[15px] font-medium'>No room rent limit</p>
              </div>
              <div className='flex items-center gap-2 leading-[26px]'>
                <Image src={trueIcon} width={15} height={15} alt='img' className='' />
                <p className='text-[15px] font-medium'>Unlimited restoration of cover</p>
              </div>
              <div className='flex items-center gap-2 leading-[26px]'>
                <Image src={trueIcon} width={15} height={15} alt='img' className='' />
                <p className='text-[15px] font-medium'>3.5 Lacs no claim bonus</p>
              </div>
            </div>
            <div className='hidden max-[479px]:block items-center gap-5 px-6 w-fit pb-5'>
              <Link href='#' prefetch={false}>
                <button className='business-right-text cursor-pointer text-[15px] px-4 py-3.5 w-full rounded-lg text-[#212529] bg-[#49D49D] font-semibold max-[320px]:text-[14px] font-[Faktum]'>
                  Get Insured
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InsuranceOffers
