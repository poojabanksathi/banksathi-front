import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import Link from 'next/link'
import React from 'react'

const CheckAgree = ({ setCheckAgree, checkAgree, setTermsModal }) => {
  return (
    <div>
      <div className='flex items-center mt-[24px] gap-2'>
        <input
          className='mr-1  w-4 h-4  max-sm:w-8 max-sm:h-8 text-white accent-[#49D49D] '
          type='checkbox'
          checked={checkAgree}
          required
          onChange={(e) => {
            setCheckAgree(e.target?.checked)
          }}
        />
        <p className='text-[14px] text-[#212529] font-normal max-[479px]:text-[14px] max-[375px]:text-[13px]'>
          {ApiMessage?.termsAndConditionContent}
          <Link
            href='/terms-use'
            className='!underline !font-medium text-[#212529] pl-2'
            onClick={() => setTermsModal(true)}
            prefetch={false}
            target='_blank'>
            terms and conditions
          </Link>
          <span className='mr-[2px]'> and</span>
          <Link
            href='/privacy-policy'
            className='!underline !font-medium text-[#212529] pl-[1px]'
            onClick={() => setTermsModal(true)}
            prefetch={false}
            target='_blank'>
            privacy policy
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CheckAgree
