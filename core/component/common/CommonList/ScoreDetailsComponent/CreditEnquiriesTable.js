import React from 'react'


const CreditEnquiriesTable = ({ enquiryData }) => {

  return (
    <div>
      <div className=''>
        <p className='text-[18px]  font-medium leading-[25px] pb-2 pl-2 '>Total Enquiries</p>
        {enquiryData?.enquiry_details?.map((item,index) => {
          return (
            <div key={index} className='border border-[#E6ECF1] rounded-2xl mt-3'>
              <div className='p-5 flex '>
                <div className='flex gap-2 w-full'>
                  <div className='pl-2 max-[479px]:pl-0 flex w-full justify-between max-[576px]:flex-wrap max-[576px]:gap-y-4 max-[576px]:gap-x-4'>
                    <div>
                      <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>Search Type</p>
                      <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                        {item?.search_type}
                      </span>
                    </div>
                    <div>
                      <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>Subscriber Number</p>
                      <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                        {item?.subscriber_number}
                      </span>
                    </div>
                    <div>
                      <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>Financial Institution</p>
                      <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                        {item?.financial_institution}
                      </span>
                    </div>
                    <div>
                      <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>Application Date</p>
                      <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                        {item?.application_date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CreditEnquiriesTable
