import Image from 'next/image'
import React from 'react'

function Terms({ setTermsModal }) {
  return (
    <>
      <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity z-[999999]'>
        <div className='container relative top-[20%] mx-auto max-[576px]:w-[95%]  w-[650px] rounded-2xl p-[30px] bg-white tearms-modal max-[479px]:p-5 '>
          <div className='flex items-center justify-between mb-[20px] '>
            <div>
              <h3 className='text-[24px] font-semibold font-faktum max-[479px]:text-[20px]'>Terms and conditions</h3>
            </div>
            <div className='cursor-pointer' onClick={() => setTermsModal(false)}>
              <Image src='/assets/closeIcon.svg' alt='close' width={20} height={20} />
            </div>
          </div>
          <div>
            <ul className='marker:text-[#844FCF] list-inside list-disc'>
              <div className='flex items-baseline'>
                <div className='w-[15px]'>
                  <div className='w-[6px] h-[6px] bg-[#844FCF] rounded-full'></div>
                </div>
                <p className='pb-[20px] w-full max-w-[98%] leading-[20.8px] font-normal text-[13px] text-[#212529] max-[479px]:text-[12px] max-[320px]:text-[11px] max-[425px]:pb-[8px]'>
                  If the End Customer wishes to avail the services available on the Application, the End User may be
                  asked by the Advisor to supply certain information relevant to their interest including, without
                  limitation, the User’s name, User’s address, User’s phone number, Aadhar No. PAN No. and such other
                  details as required to provide services.
                </p>
              </div>
              <div className='flex items-baseline'>
                <div className='w-[15px]'>
                  <div className='w-[6px] h-[6px] bg-[#844FCF] rounded-full'></div>
                </div>
                <p className='pb-[20px] w-full max-w-[98%] leading-[20.8px] font-normal text-[13px] text-[#212529] max-[479px]:text-[12px] max-[320px]:text-[11px] max-[425px]:pb-[8px]'>
                  The End Customer represents and warrants that the advice or information, whether oral or written,
                  obtained by the End Customer on the Application will not create any warranty or guarantee by the
                  Company other than those expressly stated herein. Further, the End Customer agrees and acknowledges
                  that it shall be the responsibility of the End Customer to evaluate the accuracy, completeness, and
                  usefulness of all opinions, advice, services, merchandise, and other information provided on the
                  Application.
                </p>
              </div>
              <div className='flex items-baseline'>
                <div className='w-[15px]'>
                  <div className='w-[6px] h-[6px] bg-[#844FCF] rounded-full'></div>
                </div>
                <p className='pb-[20px] w-full max-w-[98%] leading-[20.8px] font-normal text-[13px] text-[#212529] max-[479px]:text-[12px] max-[320px]:text-[11px] max-[425px]:pb-[8px]'>
                  The End Customer shall not make any payments to the Advisor for the purchase or investment of the
                  products and the Company in no circumstances shall be held liable for such payments made by the End
                  Customer.
                </p>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Terms
