import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import FooterLogo from '../../../../public/assets/footer-Logo.svg'
import FooterIcon from '../FooterIcon'

const FooterList = ({ title, items }) => (
  <div>
    <p className='text-white text-[18px] font-semibold decoration-white pb-4 max-[375px]:text-[16px] max-[320px]:!pb-3'>
      {title}
    </p>
    <ul className='list-none text-white text-[15px] space-y-3 max-[375px]:text-[14px]'>
      {items.map((item, index) => (
        <li key={index}>
          <Link href={item.href} className='text-white' prefetch={false} target={item.target || '_self'}>
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer({ businessCategorydata }) {
  const productItems = businessCategorydata?.productInfo?.map(product => ({
    href: product?.url_slug?.startsWith('/') ? product.url_slug : `/${product?.url_slug}`,
    text: product?.title,
  })) || [
    { href: '/credit-cards', text: 'Credit Cards' },
    { href: '/credit-cards/airport-lounge', text: 'Airport Lounge' },
    { href: '/credit-cards/no-annual-fee', text: 'No annual fee' },
    { href: '/credit-cards/rewards', text: 'Reward' },
    { href: '/credit-cards/shopping', text: 'Shopping' },
    { href: '/credit-cards/travel', text: 'Travel' },
    { href: '/credit-cards/cashback', text: 'Cashback' },
  ];

  const toolItems = [
    { href: '/calculators/loan-emi-calculator', text: 'EMI Calculator' },
    { href: '/cibil-credit-score-check', text: 'Credit Score' },
    { href: '/calculators/home-loan-calculator', text: 'Loan Calculator' },
    { href: '/calculators/sip', text: 'Sip Calculator' },
  ];

  const resourceItems = [
    { href: '/credit-cards/eligibility', text: 'Check eligibility' },
    { href: '/blog', text: 'Blogs' },
    { href: 'https://www.youtube.com/@banksathiplus/videos', text: 'Videos'},
    { href: '/credit-cards/i', text: 'Credit Cards News' },
  ];

  const companyItems = [
    { href: '/about-us', text: 'About BankSathi' },
    { href: '/contact-us', text: 'Contact Us' },
    { href: '#', text: 'Career' },
    { href: '/privacy-policy', text: 'Privacy & Policy', target: '_blank' },
    { href: '/terms-use', text: 'Terms & Use', target: '_blank' },
    { href: '/disclaimer', text: 'Disclaimer', target: '_blank' },
    { href: '/partners', text: 'Partners', target: '_blank' },
  ];

  return (
    <div className='bg-[#212529]'>
      <div className='container min-h-[500px] max-[1024px]:px-8 mx-auto max-[991px]:max-w-full pt-[100px] pb-[60px] max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 max-[479px]:pt-[50px] max-[576px]:!pb-[100px] max-[479px]:pb-28'>
        <div className='flex items-center justify-between py-2 pb-16 max-[479px]:flex-col'>
          <Link href='/' prefetch={false} className='flex items-center gap-2 max-[576px]:justify-start max-[576px]:w-full'>
            <Image src={FooterLogo} className='w-[44px] h-[34px]' width={44} height={34} priority={true} alt='img_text' />
            <p className='text-white text-[faktum] font-semibold text-center text-[30px] mt-[5px] max-[576px]:text-[20px]'>BankSathi</p>
          </Link>
          <div className='md:flex gap-4 footer-social-icon items-center max-[576px]:hidden'>
            <p className='flex items-center font-normal text-[11px] uppercase font-[poppins] text-[#A29FAD] justify-center'>Follow us</p>
            <div className='flex items-center gap-4 max-[576px]:gap-2 max-[576px]:mt-[13px]'>
              <FooterIcon />
            </div>
          </div>
        </div>
        <div className='flex xl:gap-4 justify-between max-[771px]:justify-normal flex-wrap max-[576px]:gap-12 footer-gap max-[576px]:grid max-[576px]:grid-cols-2'>
          <div className='max-[771px]:pl-[32px] max-[768px]:pl-[30px] product-footer max-[576px]:pl-0'>
            <FooterList title='Products' items={productItems} />
          </div>
          <div className='sm:pr-14 md:pr-14 lg:pr-14 xl:pr-14 2xl:pr-14'>
            <FooterList title='Tools' items={toolItems} />
          </div>
          <div className='max-[576px]:mt-6 sm:pr-14 md:pr-14 lg:pr-14 xl:pr-14 2xl:pr-14'>
            <FooterList title='Resources' items={resourceItems} />
          </div>
          <div className='relative max-[576px]:top-[-110px] max-[375px]:top-[-104px] sm:pr-14 md:pr-14 lg:pr-14 xl:pr-14 2xl:pr-14'>
            <FooterList title='Company' items={companyItems} />
          </div>
        </div>
        <div className='gap-4 footer-social-icon items-center max-[576px]:block hidden'>
          <p className='flex items-center font-normal text-[11px] uppercase font-[poppins] text-[#A29FAD] justify-center'>Follow us</p>
          <div className='flex items-center gap-4 max-[576px]:gap-2 max-[576px]:mt-[13px] justify-center'>
            <FooterIcon />
          </div>
        </div>
        <div className='mt-10'>
          <p className='text-white font-bold text-[18px] leading-[28.8px] max-[576px]:text-center max-[576px]:text-[14px]'>Disclaimer: </p>
          <p className='text-white font-normal min-[768px]:text-justify leading-[28.8px] mt-3 max-[576px]:text-[12px] max-[576px]:text-center text-[15px] max-[576px]:!leading-[18.4px]'>
            All data and information presented on this platform is taken from reputable and official websites, recognized news outlets, and other trusted sources. While we strive for accuracy, BankSathi cannot guarantee the complete correctness of every detail shared. Users are urged to meticulously review terms, conditions, and descriptions related to any product or service mentioned on our website or as advised by our advisors. BankSathi shall not bear responsibility for any discrepancies, financial setbacks, or losses experienced due to reliance on the provided content or advice.
          </p>
        </div>
        <p className='text-white mt-16 text-[14px] text-center opacity-[0.4] max-[576px]:text-[12px] max-[576px]:mt-4'>
          © Copyright {new Date().getFullYear()}. All Rights Reserved. BankSathi
        </p>
      </div>
    </div>
  );
}
