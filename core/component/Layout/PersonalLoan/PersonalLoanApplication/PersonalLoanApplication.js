import Image from 'next/image'
import React, { useEffect } from 'react'
import ProductSection from './ProductSection/ProductSection'
import PersonalLoanApplicationForm from './PersonalLoanApplicationForm/PersonalLoanApplicationForm'
import { capitalizeFirstLetter } from '@/utils/util'
import TagManager from 'react-gtm-module'

const PersonalLoanApplication = ({ productDetailsData, url_slug }) => {
  const bankName = productDetailsData?.product_details?.card_name
    ? capitalizeFirstLetter(productDetailsData?.product_details?.card_name?.toLowerCase())
    : ''

    const category_url = productDetailsData?.product_details?.url_slug?.split('/')[0]
    const category_name = productDetailsData?.product_details?.card_name

    const handleGTM = () => {
      TagManager?.dataLayer({
        dataLayer: {
          event: 'apply_card',
          product_category: category_url,
          product_name: category_name,
        },
      });
    }
  
    useEffect(() => {
      handleGTM();
    }, []);

  return (
    <div className='pb-[30px] container h-full mx-auto px-14 max-[1440px]:px-14 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 max-[991px]:max-w-full mt-[20px]'>
      <div className='mt-[20px] grid grid-cols-2 gap-[30px] max-[771px]:grid-cols-1 max-[576px]:gap-[28px] mb-[20px]'>
        <div className='flex flex-col'>
          <h1 className='sm:text-[28px] lg:text-[28px] max-sm:text-center max-sm:text-[24px] max-xs:text-[18px] font-semibold  text-[#212529] sm:leading-[40px] max-sm:leading-[33px]  font-[poppins]'>
            Application for {bankName} Personal Loan
          </h1>
          <div className='max-sm:hidden max-[678px]:hidden'>
            <ProductSection productDetailsData={productDetailsData} />
          </div>
        </div>
        <div className=''>
          <PersonalLoanApplicationForm url_slug={url_slug} productDetailsData={productDetailsData} />
        </div>
        <div className='md:hidden max-sm:px-4'>
          <ProductSection productDetailsData={productDetailsData} />
        </div>
      </div>
    </div>
  )
}

export default PersonalLoanApplication
