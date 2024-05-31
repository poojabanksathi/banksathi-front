import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import HomeBlackIcon from '../../../../../public/assets/home-black.svg'
import UploadIcon from '../../../../../public/assets/upload-icon.svg'
import Input from '@/core/component/Leads/InputComponent/Input'
import CommonEmailInput from '../../../common/CommonList/CommonFieldComponent/EmailAdd'
import CommonNumberInput from '../../../common/CommonList/CommonFieldComponent/MobileNumber'
import { useWindowSize } from '@/hooks/useWindowSize'

const JobApplication = () => {
  const size = useWindowSize()

  const [firstNameError, setFirstNameError] = useState(false)
  const [applicationData, setApplicationData] = useState({})
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <div className='flex items-center justify-center mb-[56px] pt-[25px]'>
        <div className='flex justify-center items-center gap-1.5'>
          <div className='w-[18px] h-[18px]'>
            <div className='w-[18px]'></div>
            <Image
              src={HomeBlackIcon}
              width={18}
              height={18}
              alt='home'
              className='max-[479px]:w-[12px] max-[479px]:h-[12px] w-auto h-auto'
            />
          </div>
          <div className='w-[3px] h-[3px] bg-zinc-300 rounded-full' />
          <div className='text-neutral-800 text-[13px] font-normal leading-[20.80px]'>Career</div>
          <div className='w-[3px] h-[3px] bg-zinc-300 rounded-full' />
          <div className='text-neutral-800 text-[13px] font-normal leading-[20.80px]'>Details</div>
          <div className='w-[3px] h-[3px] bg-zinc-300 rounded-full' />
          <div className='text-neutral-800 text-[13px] font-semibold leading-[20.80px]'>Application</div>
        </div>
      </div>
      <div className='flex items-center justify-center text-center text-neutral-800 text-[15px] font-normal leading-normal mb-[16px]'>
        You are applying for
      </div>
      <div className='flex items-center justify-center text-center text-neutral-800 text-[46px] font-semibold leading-[55.20px] mb-[40px] max-sm:text-[22px] max-sm:leading-[30px] max-sm:mx-[66px] md:text-[22px] max-md:leading-[30px] max-md:mx-[66px]'>
        Business Development Manager
      </div>
      <div>
        <div className='flex flex-col justify-center bg-white rounded-3xl mx-[320px] max-sm:rounded-none max-[479px]:mx-0 max-[771px]:mx-0'>
          <div className='flex items-center justify-center text-center text-neutral-800 text-[15px] font-normal leading-normal m-[40px] max-[479px]:text-[12px] max-[479px]:leading-[20px] max-[479px]:m-[16px]'>
            Provide personal details to proceed with the application. This info aids application{' '}
            {size?.width >= 1200 || size?.width >= 771 ? <br /> : ''}
            evaluation. Your data remains secure and confidential.
          </div>
          <div className='mx-[40px] max-sm:mx-[16px]'>
            <form>
              <div className='mb-4'>
                <div className='grid grid-cols-2 gap-[20px] max-[479px]:grid-cols-1 pt-6'>
                  <div>
                    <label className='text-[13px] font-normal text-[#212529] ' htmlFor='firstName'>
                      First Name
                    </label>
                    <Input
                      className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 ${
                        firstNameError ? 'border-red-500' : 'border-["#C2CACF"]'
                      }`}
                      id='first_name'
                      name='first_name'
                      type='text'
                      required
                      placeholder='First Name'
                      disabled={false}
                      value={applicationData?.first}
                      onChange={(e) => {
                        setApplicationData({ ...applicationData, first: e?.target?.value })
                      }}
                    />
                    {firstNameError ? (
                      <p className='text-[12px] text-[#FF000F] font-no'>{'This field is Required'}</p>
                    ) : (
                      ''
                    )}
                  </div>
                  <div>
                    <label className='text-[13px] font-normal text-[#212529] ' htmlFor='Last Name'>
                      Last Name
                    </label>
                    <Input
                      className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 ${
                        firstNameError ? 'border-red-500' : 'border-["#C2CACF"]'
                      }`}
                      id='last_name'
                      name='last_name'
                      type='text'
                      required
                      placeholder='Last Name'
                      disabled={false}
                      value={applicationData?.second}
                      onChange={(e) => {
                        setApplicationData({ ...applicationData, second: e?.target?.value })
                      }}
                    />
                    {firstNameError ? (
                      <p className='text-[12px] text-[#FF000F] font-no'>{'This field is Required'}</p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4 max-[479px]:grid-cols-1 pt-6'>
                  <CommonEmailInput
                    value={''}
                   
                  />
                  <div>
                    <label className='text-[13px] font-normal text-[#212529] ' htmlFor='mobile'>
                      Mobile Number
                    </label>
                    <div>
                      <CommonNumberInput
                        disabled={false}
                        defaultValue={''}
                       
                      />
                    </div>
                    {firstNameError && <p className='text-[12px] text-[#FF000F] font-no'>{'This Field Is Required'}</p>}
                    
                  </div>
                </div>
                <div className='mt-[24px] mb-[30px]'>
                  <label className='text-[13px] font-normal text-[#212529] ' htmlFor='mobile'>
                    Upload CV or Resume
                  </label>

                  <div className='flex items-center justify-center w-full'>
                    <label
                      for='dropzone-file'
                      className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mb-[3px]'>
                      <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                        <Image src={UploadIcon} width={24} height={24} alt='upload' className='mb-[8px]' />
                        <p className='mb-[4px] text-center text-neutral-800 text-[15px] dark:text-gray-400'>
                          <span className='font-normal'>Upload a file</span>
                        </p>
                        <p className='text-center text-neutral-800 text-[13px] font-normal leading-[18.20px] dark:text-gray-400'>
                          Click to browse, or <br /> drag & drop a file here
                        </p>
                      </div>
                      <input id='dropzone-file' type='file' className='hidden' onChange={(e) => handleFileChange(e)} />
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='flex items-center justify-center mb-[41px] max-sm:mb-[41px]'>
            <button
              onClick={() => {}}
              className='head-text font-[faktum] text-center bg-[#49D49D] !text-[#212529] py-2 pl-2 pr-2 rounded-lg text-[15px] w-[101px] h-[48px] mx-auto flex items-center justify-center gap-4 max-sm:w-[127px] max-sm:h-[40px] max-sm:text-[12px] md:w-[127px] md:h-[40px] md:text-[12px]'>
              <Link href='' prefetch={false} passHref>
                Submit
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobApplication
