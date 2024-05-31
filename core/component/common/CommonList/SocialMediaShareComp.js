import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SocialMediaShareComp = () => {

  const windowHref = typeof window !== 'undefined' && window?.location?.href
  const url = windowHref

  return (
    <div>
      <div className='flex gap-2 pb-6'>
        <p className='text-[#212529] text-[13px] flex items-center'>Share</p>
        <div className="w-[32px] h-[32px] flex justify-center items-center">
          <Link className='' target='_blank' prefetch={false} href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>
            <Image src='/assets/Facebook.svg' width={24} height={24} priority={true} alt='facebook' />
          </Link>
        </div>
        <div className='w-[32px] h-[32px] flex justify-center items-center'>
          <Link className='' target='_blank' prefetch={false} href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}>
            <Image src='/assets/LinkedIN_black.svg' width={24} height={24} priority={true} alt='linkedIn' />
          </Link>
        </div>
        <div className='w-[32px] h-[32px] flex justify-center items-center'>
          <Link className='' target='_blank' prefetch={false} href='mailto:customer@banksathi.com'>
            <Image src='/assets/Mail_black.svg' width={24} height={24} priority={true} alt='mail' />
          </Link>
        </div>
        <div className='w-[32px] h-[32px] flex justify-center items-center'>
          <Link className='' target='_blank' prefetch={false} href={`https://api.whatsapp.com/send?text=${url}`}>
            <Image src='/assets/WhatsApp_black.svg' width={30} height={30} priority={true} alt='whatsapp' />
          </Link>
        </div>
        <div className='w-[32px] h-[32px] flex justify-center items-center'>
          <Link className='' target='_blank' prefetch={false} href={`https://twitter.com/share?url=${url}`}>
            <Image src='/assets/Twitter.svg' width={22} height={22} priority={true} alt='twitter' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SocialMediaShareComp
