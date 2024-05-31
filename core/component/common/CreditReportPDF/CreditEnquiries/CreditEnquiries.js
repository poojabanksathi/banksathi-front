import { BASE_URL, USERSET } from '@/utils/alljsonfile/service'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import likeBg from '../../../../../public/assets/likethumb.svg'

const CreditEnquiries = ({ enquiryData }) => {
  const showNoEnquiry = enquiryData?.data?.enquiry_details?.length > 0
  const enquiries = enquiryData?.data?.enquiry_details

  return (
    <div>
      {!showNoEnquiry ? (
        <div className='p-[30px]'>
          <div className='border border-[#E6ECF1] rounded-2xl p-5 relative'>
            <div className='absolute top-[-15px] right-[15px]'>
              <button className='bg-[#FFECDD] cursor-pointer text-[#D26D20] w-24 h-8 rounded-[20px] text-xs'>
                Low Impact
              </button>
            </div>
            <div className='flex items-center gap-5'>
              <Image
                src='/assets/credit-inquery.svg'
                alt='creditEnquiries'
                className='w-[46px] h-11'
                width={10}
                height={10}
              />
              <p className='text-xl font-normal font-[Poppins] max-[479px]:text-[15px] text-[#212529]'>
                You have 0 new credit enquiries
              </p>
            </div>
            <div className='pl-6 pt-2 w-full max-[479px]:pl-0'>
              <div className='flex justify-between max-lg:flex-col max-lg:gap-6  mt-4 max-[425px]:block'>
                <div className='flex w-[45%] justify-between max-[479px]:w-[80%] max-[479px]:ml-auto max-[479px]:mb-5'>
                  <div>
                    <span className='font-poppins font-semibold text-lg leading-7 max-[479px]:text-[15px] text-[#212529] max-[375px]:text-[14px]'>
                      0
                    </span>
                    <p className='font-poppins font-normal text-base leading-6 max-[479px]:text-[12px] text-[#212529]'>
                      Enquiries for loan
                    </p>
                  </div>
                  <div>
                    <span className='font-poppins font-semibold text-lg leading-7 max-[479px]:text-[15px] text-[#212529] max-[375px]:text-[14px]'>
                      0
                    </span>
                    <p className='font-poppins font-normal text-base leading-6 max-[479px]:text-[12px] text-[#212529]'>
                      Enquiries for credit card
                    </p>
                  </div>
                </div>
                <div className='bg-[#E5FFF5] py-1.5 px-6 w-[400px] max-[425px]:w-auto'>
                  <div className='flex items-center'>
                    <Image src={likeBg} alt='img' className='mr-5' />
                    <p className='text-[15px] max-[479px]:text-[12px] text-[#212529]'>
                      You have not made any credit enquiries in last 3 months
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {enquiries &&
            enquiries?.map((item, index) => {
              return (
                <div className='mt-[20px]' key=''>
                  <div className="text-neutral-800 text-xs font-semibold font-['Poppins'] leading-none">
                    Enquiry {index + 1}
                  </div>
                  <table className=' mt-[14px]  border-collapse border border-slate-400 ...'>
                    <thead>
                      <tr>
                        <th className=" py-[12px] w-[20vw] text-left pl-[10px] text-violet-600 text-[10px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                          <div className='flex justify-between'>
                            <div className=''>Search Type</div>
                            <div className="text-right text-neutral-800 text-[10px] font-medium font-['Poppins'] leading-[9.80px] pr-[6px]">
                              {item?.search_type}
                            </div>
                          </div>
                        </th>
                        <th className=" py-[12px] w-[26vw] text-left pl-[10px] text-violet-600 text-[10px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                          <div className='flex justify-between'>
                            <div className=''>Subscriber Number</div>
                            <div className="text-right text-neutral-800 text-[10px] font-medium font-['Poppins'] leading-[9.80px] pr-[6px]">
                              {item?.subscriber_number}
                            </div>
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th className=" py-[12px] w-[20vw] text-left pl-[10px] text-violet-600 text-[10px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                          <div className='flex justify-between'>
                            <div className=''>Financial Institution</div>
                            <div className="text-right text-neutral-800 text-[10px] font-medium font-['Poppins'] leading-[9.80px] pr-[6px]">
                              {item?.financial_institution}
                            </div>
                          </div>
                        </th>
                        <th className=" py-[12px] w-[26vw] text-left pl-[10px] text-violet-600 text-[10px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                          <div className='flex justify-between'>
                            <div className=''>Application Date</div>
                            <div className="text-right text-neutral-800 text-[10px] font-medium font-['Poppins'] leading-[9.80px] pr-[6px]">
                              {item?.application_date}
                            </div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default CreditEnquiries
