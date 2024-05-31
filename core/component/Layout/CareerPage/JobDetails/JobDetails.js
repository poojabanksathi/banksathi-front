import React from 'react'
import Image from 'next/image'
import HomeBlackIcon from '../../../../../public/assets/home-black.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'

const JobDetails = () => {
  const router = useRouter()

  const navigateToApplication = () => {
    router.push({ pathname: '/careers/application' })
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
              alt='img'
              className='max-[479px]:w-[12px] max-[479px]:h-[12px] w-auto h-auto'
            />
          </div>
          <div className='w-[3px] h-[3px] bg-zinc-300 rounded-full' />
          <div className='text-neutral-800 text-[13px] font-normal leading-[20.80px]'>Career</div>
          <div className='w-[3px] h-[3px] bg-zinc-300 rounded-full' />{' '}
          <div className='text-neutral-800 text-[13px] font-semibold leading-[20.80px]'>Details</div>
        </div>
      </div>
      <div className='flex items-center justify-center text-center text-neutral-800 text-[15px] font-normal leading-normal mb-[16px]'>
        Job Role
      </div>
      <div className='flex items-center justify-center text-center text-neutral-800 text-[46px] font-semibold leading-[55.20px] mb-[20px] max-sm:text-[22px] max-sm:leading-[30px] max-sm:mx-[66px] md:text-[22px] max-md:leading-[30px] max-md:mx-[66px]'>
        Business Development Manager
      </div>
      <div className='text-center text-neutral-800 text-[15px] font-normal leading-normal mb-[30px] max-sm:text-[12px] max-sm:leading-[20px] max-sm:mb-[20px] max-[771px]:text-[12px] max-[771px]:leading-[20px] max-[771px]:mb-[20px]'>
        Location : Mumbai
      </div>
      <div className='flex items-center justify-center mb-[30px] max-sm:mb-0'>
        <button
          onClick={() => navigateToApplication()}
          className='head-text font-[faktum] text-center bg-[#49D49D] text-[#212529] py-2 pl-2 pr-2 rounded-lg text-lg w-[127px] h-[48px] mx-auto flex items-center justify-center gap-4 max-sm:w-[127px] max-sm:h-[40px] max-sm:text-[12px] md:w-[127px] md:h-[40px] md:text-[12px]'>
          <Link href='' prefetch={false} passHref>
            Apply Now
          </Link>
        </button>
      </div>
      <div className='flex border border-solid mb-[40px] mx-[240px] md:hidden' />
      <div className='mx-[320px] max-sm:[16px] max-[771px]:mx-[16px] max-[1024px]:mx-[16px]'>
        <div className='flex items-center text-neutral-800 text-2xl font-semibold leading-[33.60px] mb-[20px] max-sm:text-[18px] max-sm:leading-[24px] md:text-[18px] md:leading-[24px]'>
          Job Introduction
        </div>
        <div className='flex items-center text-neutral-800 text-[15px] font-normal leading-normal mb-[30px] max-sm:text-[12px] max-sm:leading-[20px] max-md:text-[18px] max-md:leading-[24px]'>
          BankSathi is looking for experienced Business Development professionals passionately waiting to explore a
          world of opportunities. We would love to hear from target-oriented, focused, energetic and organised freaks
          with a flair of creativity and have exceptional communication skills.
        </div>
        <div className='flex items-center ext-neutral-800 text-2xl font-semibold leading-[33.60px] mb-[12px] max-sm:text-[18px] max-sm:leading-[24px] md:text-[18px] md:leading-[24px]'>
          Roles & Responsibilities
        </div>
        <div>
          <div className=' flex items-center text-neutral-800 text-[15px] font-normal leading-normal mb-[30px] max-sm:text-[12px] max-sm:leading-[20px] max-md:text-[18px] max-md:leading-[24px]'>
            <ul role='list' className='marker:text-neutral-800 list-disc pl-5 text-neutral-800'>
              <li>Actively and successfully manage end to end sales process.</li>
              <li>Arrange, attend meetings with prospective clients and discover potential collaboration.</li>
              <li>Close business deals while accounting for project requirements, timelines, and commercials.</li>
              <li>Arrange, attend meetings with prospective clients and discover potential collaboration.</li>
              <li>Actively and successfully manage end to end sales process.</li>
            </ul>
          </div>
        </div>
        <div className='flex items-center text-neutral-800 text-2xl font-semibold leading-[33.60px] mb-[12px] max-sm:text-[18px] max-sm:leading-[24px] md:text-[18px] md:leading-[24px]'>
          Experience Required
        </div>
        <div className='flex items-center text-neutral-800 text-[15px] font-normal leading-normal mb-[31px] max-sm:text-[12px] max-sm:leading-[20px] max-md:text-[18px] max-md:leading-[24px]'>
          <ul role='list' className='marker:text-neutral-800 list-disc pl-5 text-neutral-800'>
            <li>A business graduate degree, preferably an MBA degree.</li>
            <li>2 to 4 years of experience in sales/ business development.</li>
            <li>Passion to work and willingness to learn</li>
            <li>Absolutely amazing communication and presentation skills. Attention to detail.</li>
            <li>A business graduate degree, preferably an MBA degree.</li>
          </ul>
        </div>
      </div>
      <div className='flex border border-solid mb-[30px] mx-[240px] max-sm:mx-[16px] max-[771px]:mx-[16px]' />
      <div className='flex items-center justify-between mx-[320px] max-sm:mx-[16px] pb-[100px] max-sm:flex max-sm:items-center max-sm:flex-col max-[771px]:mx-[16px]'>
        <div className='flex items-center justify-items-start max-sm:mb-[30px]'>
          <button
            onClick={() => navigateToApplication()}
            className='flex head-text font-[faktum] text-center bg-[#49D49D] text-[#212529] py-2 pl-2 pr-2 rounded-lg text-lg w-[127px] h-[48px] mx-auto gap-4 max-sm:w-[127px] max-sm:h-[40px] max-sm:text-[15px] items-center justify-center'>
            <Link href='' prefetch={false} passHref>
              Apply Now
            </Link>
          </button>
        </div>
        <div className='flex items-center gap-[15px]'>
          <div className='flex items-center text-neutral-800 text-[13px] font-medium leading-[30px] tracking-wide max-sm:text-[13px] max-sm:leading-[30px]'>
            Share
          </div>
          <div className='flex items-center'>
            <div className=' flex md:flex gap-4 footer-social-icon max-sm:gap-[12px]'>
              <a
                href='https://www.facebook.com/banksathi/'
                target='_blank'
                rel='nofollow'
                style={{ width: '33px', height: '33px', backgroundPosition: '-1585px -5px' }}
                className='spriteImages bg-no-repeat '></a>

              <a
                href='https://www.instagram.com/banksathi/'
                target='_blank'
                rel='nofollow'
                style={{ width: '35px', height: '38px', backgroundPosition: '-1621px -4px' }}
                className='spriteImages bg-no-repeat '></a>

              <a
                href='https://in.linkedin.com/company/banksathi'
                target='_blank'
                rel='nofollow'
                style={{ width: '35px', height: '38px', backgroundPosition: '-1657px -4px' }}
                className='spriteImages bg-no-repeat '></a>

              <a
                href='mailto:customer@banksathi.com'
                target='_blank'
                rel='nofollow'
                style={{ width: '35px', height: '38px', backgroundPosition: '-1693px -4px' }}
                className='spriteImages bg-no-repeat '></a>

              <a
                href='https://wa.me/7412933933'
                target='_blank'
                rel='nofollow'
                style={{ width: '35px', height: '38px', backgroundPosition: '-1729px -4px' }}
                className='spriteImages bg-no-repeat '></a>

              <a
                href='https://twitter.com/banksathi1'
                target='_blank'
                rel='nofollow'
                style={{ width: '35px', height: '38px', backgroundPosition: '-1765px -4px' }}
                className='spriteImages bg-no-repeat '></a>
              <a
                href='https://www.youtube.com/@banksathiplus'
                target='_blank'
                rel='nofollow'
                style={{ width: '35px', height: '38px', backgroundPosition: '-1801px -4px' }}
                className='spriteImages bg-no-repeat '></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetails
