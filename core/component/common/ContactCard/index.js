import Image from 'next/image'
import React from 'react'
import callImg from '@/public/assets/call-contact.svg'
import msgImg from '@/public/assets/msg-contact.svg'
import locImg from '@/public/assets/loc-contact.svg'


const index = () => {
  return (
    <div className=' container mx-auto  py-[20px]  max-[1024px]:py-3 max-[1024px]:px-8 max-[991px]:max-w-full max-[479px]:px-4 max-[375px]:px-4  max-[320px]:px-4 '>
      <div>
        <h2 className='text-[24px] leading-[33.6px] text-[Faktum] font-semibold'>Contact us</h2>
        <p className='text-[15px] leading-[24px] text-[Poppins] font-normal'>
          If you have any concerns or discrepancies regarding your information/data processing at Banksathi.com, please
          contact our Data Grievance Officer. Name and contact details are provided below:
        </p>
      </div>
      <div className='rounded-xl  bg-[#FFF] my-6 py-6 px-8 max-[320px]:px-2'>
        <div className='  flex flex-row max-lg:flex-col max-lg:items-start max-md:px-4 gap-5 pb-4 px-8 max-[320px]:px-0 justify-evenly items-center '>
          <div className='  lg:border-r-2 max-md:border-b-2 max-md:pb-8 max-md:px-4 border-[#E6ECF1] basis-1/3 px-6'>
                      <a href='https://www.facebook.com/banksathi/'rel='nofollow' style={{width:"32px", height:"32px", backgroundPosition:"-1995px -5px"}} className='spriteImages bg-no-repeat  py-6'></a>


            <p className='text-[15px] leading-[15px] text-[Poppins] font-normal text-[#212529]'>Raj Singh</p>
            <p className='text-[18px] leading-[18px] text-[Poppins] font-medium text-[#212529] max-[320px]:text-[17px]'>+91 8150-025844</p>
          </div>
          <div className=' lg:border-r-2 max-md:border-b-2 max-md:pb-8 max-md:px-4 border-[#E6ECF1] basis-1/3 px-8'>
            <a href='https://www.facebook.com/banksathi/'rel='nofollow' style={{width:"32px", height:"30px", backgroundPosition:"-2029px -5px"}} className='spriteImages bg-no-repeat  py-6'></a>

            <p className='text-[15px] leading-[15px] text-[Poppins] font-normal text-[#212529]'>Email us at</p>
            <p className='text-[18px] leading-[18px] text-[Poppins] font-medium text-[#212529] max-[320px]:text-[17px] break-words max-[375px]:w-[158px]'>grievance@banksathi.com</p>
            <p className='text-[15px] leading-[21px] text-[Poppins] font-normal text-[#212529]'>(Anytime 24x7)</p>
          </div>
          <div className='  basis-1/3 px-8 max-md:px-4'>
            <a href='https://www.facebook.com/banksathi/'rel='nofollow' style={{width:"29px", height:"32px", backgroundPosition:"-1965px -5px"}} className='spriteImages bg-no-repeat  py-6'></a>

            <p className='text-[15px] leading-[24px] text-[Poppins] font-normal text-[#212529]'>First Floor, Plot No 3/1, Attic Smart Square Complex, , Indiranagar, Bengaluru, Karnataka-560038</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
