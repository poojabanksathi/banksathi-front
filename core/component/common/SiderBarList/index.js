import Image from 'next/image'
import CloseIcon from '../../../../public/assets/close-icon.svg'

const SideBar = ({setSideBar , siderDataApp , Img_URL , appLogData , formatDate}) => {

  return (
    <>
      <div className='relative z-50 ' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
        <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>
        <div className=' overflow-y-auto w-[480px] h-[100vh] bg-white fixed top-0 right-0 p-5 max-[479px]:w-full'>
          <div className='flex items-center justify-between'>
            <p className='text-[#844FCF] flex gap-2'>
              <Image src='/assets/credit-card-purple.svg' width={20} height={20}  alt='card-icon'/>
              {siderDataApp?.category_name}
            </p>
            <Image src='/assets/close-icon.svg' width={20} height={20} className='cursor-pointer' onClick={()=>setSideBar(false)} alt='close'/>
          </div>
          <div className='flex items-center gap-6 py-8 max-[479px]:gap-x-4 '>
            <div className='w-[58px] h-auto flex'>
              <Image
                src={`${Img_URL}/${siderDataApp?.product_image}`}
                alt='card image'
                width={58}
                height={99}
                className='w-full max-[479px]:mx-auto'
                unoptimized={true}
              />
            </div>
            <div>
              <p className='text-[18px] text-[#212529] font-semibold leading-[18px] font-[Poppins] max-[479px]:text-[15px] max-[479px]:leading-[20px]'>
                {siderDataApp?.product_name}
              </p>
              <p className='text-[15px] max-[479px]:text-[12px]'>{siderDataApp?.category_name}</p>
            </div>
          </div>
          {/* <div className='w-[400px] h-auto bg-[#F4F8FB] m-auto px-[30px] py-[20px] max-[479px]:w-full rounded-lg'>
            <p className='text-[15px] font-semibold mb-[10px]'>Remarks</p>
            <p className='text-[15px] font-normal mb-[13px]'>
              Please submit the following documents to helps us further in your application
            </p>
            <ol className='list-decimal list-inside'>
              <li className='py-0.5'>Signature verification form </li>
              <li className='py-0.5'>Passport size photograph</li>
              <li className='py-0.5'>Deceleration</li>
            </ol>
          </div> */}
          <div>
            <p className='text-[15px] font-semibold py-[30px]'>Lead Status</p>
            <div className=''>
              {appLogData?.data?.map((leadremark , index)=> {

                const inputDate = leadremark?.created_at;
                const formattedDate = formatDate(inputDate);
                return(
                  <div key={index}>
                  <div className='flex gap-4'>
                        <div className='flex flex-col items-center w-auto'>
                          <div className='w-[20px] h-[20px] rounded-full  border-4 border-[#844FCF]'></div>
                          
                          <div className='w-[2px] h-[100px] bg-[#d7d7d7]'></div>
                        </div>
                        <div>
                          <p className='text-[15px] font-semibold !capitalize'>{leadremark?.lead_status}</p>
                          <p className='text-[13px] text-[#212529]'>{formattedDate}</p>
                          <p className='text-[13px] text-[#212529]'>{leadremark?.lead_sub_remark}</p>
                        </div>
                      </div>
                  </div>
                )
              })}

             

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SideBar
