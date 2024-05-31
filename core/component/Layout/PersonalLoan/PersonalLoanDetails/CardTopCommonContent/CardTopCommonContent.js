import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import StarRatings from 'react-star-ratings'

const CardTopCommonContent = ({
  creditScoreText,
  rating,
  interestRate,
  loanAmount,
  loanTenure,
  processingFees,
  minScore,
  bankImage,
  isListingPage = false,
  forClosureCharge,
  cardHref,
  cardName,
  bestOfName
}) => {
  return (
    <div className='flex flex-col gap-y-[15px]'>
      <div className='flex flex-row items-start justify-start gap-x-[14px]'>
        <div className='w-[160px] h-auto  bg-white rounded-lg border border-slate-200 flex items-center justify-center'>
          <Image src={bankImage} alt='bank image' width={160} height={78} className='rounded-lg' />
        </div>
        <div className='flex flex-col gap-y-[4px] items-start justify-center'>
          {cardName && (
            <Link href={cardHref} prefetch={false}>
              <div className="text-neutral-800 text-[15px] font-semibold font-['Faktum'] leading-[21px] mb-[1px]">
                {cardName}
              </div>
            </Link>
          )}
          {bestOfName && (
            <div className="text-neutral-800 text-xs font-normal font-['Poppins'] leading-none mb-[4px]">
              {bestOfName}
            </div>
          )}
          <div className='flex flex-row gap-0 items-center justify-center gap-x-1'>
            <div className='border rounded-full py-[3.5px] px-2 flex gap-[2px] items-center justify-center max-[771px]:px-2 max-[360px]:gap-1'>
              <p className='max-[768px]:text-[12px] font-semibold max-[479px]:text-[14px] text-[15px] text-[#212529] max-[280px]:text-[11px]  flex justify-center items-center'>
                {rating}/5
              </p>
              <StarRatings
                rating={rating}
                starRatedColor='#49d49d'
                numberOfStars={5}
                name='rating'
                starDimension='12px'
                starSpacing='0'
              />
            </div>
          </div>
          <div className="text-violet-600 text-[10px] font-normal font-['Poppins'] leading-[14px] pl-1">
            BankSathi Expert Review
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 place-items-start gap-[20px]'>
        <div className='flex flex-col items-start justify-center'>
          <div className="text-neutral-800 lg:text-[15px] font-normal font-['Poppins'] leading-normal">
            Interest Rate
          </div>
          <div className="text-neutral-800 lg:text-[15px] font-semibold font-['Poppins'] leading-normal max-sm:text-[12px] md:text-[12px]">
            {interestRate}
          </div>
        </div>
        <div className='flex flex-col items-start justify-center'>
          <div className="text-neutral-800 lg:text-[15px] font-normal font-['Poppins'] leading-normal">Loan Amount</div>
          <div className="text-neutral-800 lg:text-[15px] font-semibold font-['Poppins'] leading-normal max-sm:text-[12px] md:text-[12px] symbole-rupee">
            {loanAmount}
          </div>
          <div className="text-neutral-800 text-xs font-normal font-['Poppins'] leading-tight">{loanTenure}</div>
        </div>
        <div className='flex flex-col items-start justify-center'>
          <div className="text-neutral-800 lg:text-[15px] font-normal font-['Poppins'] leading-normal">
            Processing Fee
          </div>
          <div className="text-neutral-800 lg:text-[15px] font-semibold font-['Poppins'] leading-normal max-sm:text-[12px] md:text-[12px]">
            {processingFees}
          </div>
        </div>
        <div className='flex flex-col gap-1 items-start'>
          <div className="text-neutral-800 text-sm font-normal font-['Poppins'] leading-tight">
            Minimum credit score
          </div>
          <div className='flex items-center gap-2'>
            <p className='text-[15px] font-semibold pt-1'>{minScore}</p>
            <div className='tooltip'>
              <Image src={ListingfilterData?.helpimg} className='w-5 h-5' alt='img' width={20} height={20} />
              <span className='tooltiptext'>{creditScoreText}</span>
            </div>
          </div>
        </div>
        {forClosureCharge && (
          <div className='flex flex-col items-start justify-center'>
            <div className="text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-normal">
              Foreclosure charges
            </div>
            <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-normal max-sm:text-[12px] symbole-rupee">
              {forClosureCharge}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardTopCommonContent
