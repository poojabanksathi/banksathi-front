import Image from 'next/image'
import React from 'react'
import paidSuccess from '../../../../public/assets/paid-success.svg'
import alertCircle from '../../../../public/assets/alert-circle.svg'
import errorAlert from '../../../../public/assets/error-alert-triangle.svg'
import { creditinsightMonths } from '@/utils/alljsonfile/cardinsightsjson'

function PaymentHistoryMonths({ datapayment }) {
  const years = Array.from(new Set(Object?.keys(datapayment?.pay_history_month_wise).map((date) => date.split('-')[0])))

  const getPaymentDetails = (value) => {
    if (value === 'Yes') {
      return <Image src={paidSuccess} alt='success' className='w-[16px] h-[16px] mx-auto' />
    }
    if (value === 'NA') {
      return <div className='text-[14px] text-[#5d656c]'>NA</div>
    }
    if (value === 'No_60' || value === 'No_90') {
      return <Image src={alertCircle} alt='warning alert' className='w-[16px] h-[16px] mx-auto' />
    }
    if (value === 'No_120' || value === 'No_180' || value === 'No_150') {
      return <Image src={errorAlert} alt='error alert' className='w-[16px] h-[16px] mx-auto' />
    }
  }

  return (
    <div>
      <div className='p-5 border-b border-[#E6ECF1]'>
        <div className='pb-3'>
          <p className='font-semibold text-[15px] text-[#212529]'>Payment history of this account</p>
        </div>
        <div className='flex gap-3 max-[375px]:flex-wrap'>
          <div className='bg-[#F4F8FB] px-4 py-2.5 rounded-[4px] w-auto text-center cursor-pointer flex items-center gap-2 max-[375px]:flex-col max-[375px]:w-full'>
            <Image src={paidSuccess} alt='success' className='w-[16px] h-[16px]' />
            <p className='textr-[12px] font-normal text-[#212529]'>Paid on Time</p>
          </div>
          <div className='bg-[#F4F8FB] px-4 py-[7.5px] rounded-[4px] w-auto text-center cursor-pointer  flex items-center gap-2 max-[375px]:flex-col max-[375px]:w-full'>
            <Image src={alertCircle} alt='alertCircle' className='w-[16px] h-[16px]' />
            <p className='textr-[12px] font-normal text-[#212529]'>1-89 days late</p>
          </div>
          <div className='bg-[#F4F8FB] px-4 py-[7.5px] rounded-[4px] w-auto text-center cursor-pointer  flex items-center gap-2 max-[375px]:flex-col max-[375px]:w-full'>
            <Image src={errorAlert} alt='errorAlert' className='w-[16px] h-[16px]' />
            <p className='textr-[12px] font-normal text-[#212529]'>90+ days late</p>
          </div>
        </div>
        {years.map((year) => {
          return (
            <>
              <div className='pt-[34px] '>
                <div className='flex gap-x-[30px] max-[834px]:pb-5'>
                  <div className='flex flex-col items-center'>
                    <p className='text-[18px] font-semibold text-[#212529]'>{year}</p>
                    <div className='w-[1px] h-[36px] bg-[#E6ECF1] max-[834px]:h-full'></div>
                  </div>
                  <div className='flex w-full flex-wrap gap-x-8 max-[834px]:gap-y-4'>
                    {creditinsightMonths.map((months) => {
                      const dateKey = `${year}-${months?.value}`
                      const value = datapayment?.pay_history_month_wise[dateKey] || 'NA'
                      return (
                        <>
                          <div className='text-center '>
                            <p className='text-[15px] text-[#212529] font-normal pb-[5px]'>{months?.month}</p>
                            {getPaymentDetails(value)}
                          </div>
                        </>
                      )
                    })}
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default PaymentHistoryMonths
