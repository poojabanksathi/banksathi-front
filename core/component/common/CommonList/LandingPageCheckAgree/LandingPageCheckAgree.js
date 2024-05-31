import React from 'react'
import Link from 'next/link'

const LandingPageCheckAgree = ({ setCheckAgree, checkAgree, setTermsModal }) => {
  return (
    <div>
      <div className='flex items-center mt-[24px] gap-2'>
        <input
          className='mr-1  w-3 h-3  max-sm:w-2 max-sm:h-2 text-white accent-[#49D49D] '
          type='checkbox'
          checked={checkAgree}
          required
          onChange={(e) => {
            setCheckAgree(e.target?.checked)
            if (checkAgree === false || checkAgree === null || checkAgree === undefined) {
              setTermsModal(true)
            }
          }}
        />
        <p className='text-[11px] text-[#212529] font-normal max-[479px]:text-[11px] max-[375px]:text-[10px]'>
          By proceeding, you agree to our
          <Link
            href='/terms-use'
            className='!underline !font-medium text-[#212529] pl-2'
            onClick={() => setTermsModal(true)}
            prefetch={false}
            target='_blank'>
            terms & conditions
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

export default LandingPageCheckAgree
