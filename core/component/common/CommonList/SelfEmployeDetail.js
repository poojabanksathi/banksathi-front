import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'


function SelfEmployeDetail() {

  return (
    <>
      <div className=' px-20 max-[1200px]:px-0 '>
        <div className='eligibility-criteria '>
          <div className=' py-[30px]  rounded-3xl bg-white'>
            <div className='grid grid-cols-3 gap-24 px-6 max-[1200px]:gap-8 max-[771px]:grid-cols-2 max-[771px]:gap-0 max-[576px]:grid-cols-1 max-[576px]:gap-5 self-sec'>
              <div className='card-left'>
                <div className='mt-4 text-[#212529]'>
                  <h4 className='pb-8 text-[24px] font-semibold max-[991px]:text-[22px] max-[576px]:text-center max-[479px]:text-[18px] self-employee-title'>
                    Self-Employed Professional
                  </h4>
                  <div className='grid grid-cols-2 gap-12 max-[771px]:gap-8'>
                    <div>
                      <h4 className='text-[18px] font-semibold text-[#212529] pb-2 max-[576px]:font-bold max-[479px]:text-[15px]'>
                        21 Years
                      </h4>
                      <p className='text-[13px] font-normal max-[479px]:text-[12px]'>Minimum age of the applicant</p>
                    </div>
                    <div>
                      <h4 className='text-[18px] font-semibold text-[#212529] pb-2 max-[576px]:font-bold max-[479px]:text-[15px]'>
                        65 Years
                      </h4>
                      <p className='text-[13px] font-normal max-[479px]:text-[12px]'>Maximum age of the applicant</p>
                    </div>
                    <div>
                      <h4 className='text-[18px] font-semibold text-[#212529] pb-2 max-[576px]:font-bold max-[479px]:text-[15px]'>
                        50K-60K
                      </h4>
                      <p className='text-[13px] font-normal max-[479px]:text-[12px]'>Minimum monthly income</p>
                    </div>
                    <div>
                      <h4 className='text-[18px] font-semibold text-[#212529] pb-2 max-[576px]:font-bold max-[479px]:text-[15px]'>
                        Indian or NRI
                      </h4>
                      <p className='text-[13px] font-normal max-[479px]:text-[12px]'>Residential Status</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card-right col-span-2 pl-6 border-[#E6ECF1] border-l max-[771px]:col-span-1 max-[576px]:border-t max-[576px]:border-l-0  max-[576px]:pl-0'>
                <div className='mt-4 text-[#212529]'>
                  <h4 className='pb-4 text-[18px] font-semibold max-[479px]:text-center max-[479px]:text-[16px]'>
                    Documents required
                  </h4>
                  <p className='text-[15px]  py-1 leading-6 w-[90%] max-[576px]:w-full max-[479px]:text-[12px] max-[479px]:leading-4 max-[479px]:text-center'>
                    If you are planning on applying for the credit card, please keep your documents for Credit Card
                    ready.
                  </p>
                  <div className='py-4'>
                    <div className='flex items-center py-2'>
                      <div className='bg-[#E9DFF6] rounded-full w-7 h-7 text-center flex items-center justify-center mr-3'>
                        <p className='text-[14px]'>1</p>
                      </div>
                      <p className='text-[15px] font-normal max-[771px]:w-4/5 max-[479px]:text-[12px]'>
                        PAN card photocopy or Form 60
                      </p>
                    </div>
                    <div className='flex items-center py-2'>
                      <div className='bg-[#E9DFF6] rounded-full w-7 h-7 text-center flex items-center justify-center mr-3'>
                        <p className='text-[14px]'>2</p>
                      </div>
                      <p className='text-[15px] font-normal max-[771px]:w-4/5 max-[479px]:text-[12px]'>
                        Latest payslip/Form 16/IT return copy as proof of income
                      </p>
                    </div>
                    <div className='flex items-center py-2'>
                      <div className='bg-[#E9DFF6] rounded-full w-7 h-7 text-center flex items-center justify-center mr-3'>
                        <p className='text-[14px]'>3</p>
                      </div>
                      <p className='text-[15px] font-normal max-[771px]:w-4/5 max-[479px]:text-[12px]'>
                        Residence proof{' '}
                      </p>
                    </div>
                  </div>

                  <p className='italic text-[13px] font-normal max-[576px]:hidden'>
                    **This list is only indicative. Documents required may vary on a case-to-case basis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-8 flex justify-between items-center gap-8 max-[479px]:flex-col text-[#212529]'>
          <p className='text-[14px] italic max-[479px]:text-center'>
            ** These criteria are only indicative. The bank reserves the right to approve or decline applications for
            credit cards.
          </p>
          <Link href='/eligibility' className='max-[991px]:w-[20%] max-[771px]:w-[28%] max-[576px]:w-[70%]' prefetch={false}>
            <button  className=' text-[18px] cursor-pointer max-[1024px]:text-[16px] max-[771px]:text-[15px] py-3 w-full lg:w-[185px] md:w-full rounded-lg text-[#212529] bg-[#49D49D] font-semibold max-[320px]:text-[14px]'>
              Check Eligibility
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default SelfEmployeDetail
