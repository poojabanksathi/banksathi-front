import React from 'react'
import CreditListingBanner from '../creditCardList/CreditListingBanner'
import PersonalLoanListing from './PersonalLoanListing/PersonalLoanListing'
import VedioCheck from '../../common/VedioCheck'
import ServiceTabs from '../savingAccountList/ServiceTabs'
import LongFormContent from './LongFormContent/LongFormContent'
import { ImageBaseUrl } from '@/utils/util'
import CreditBeginnerCard from '../creditCardCategory/CreditBeginnerCard'

const PersonalLoan = ({
  personalProducts,
  businessmetaheadtag,
  serviceTabs,
  longFormData,
  allPersonalProducts,
  subCategoryTabs,
  url_slug,
  isSubCategoryFlow
}) => {
  const imageUrl = isSubCategoryFlow
    ? `${ImageBaseUrl}/${businessmetaheadtag?.sub_category_image}`
    : `${ImageBaseUrl}/${businessmetaheadtag?.product_image}`

  return (
    <>
      <div className='py-2'>
        <CreditListingBanner businessmetaheadtag={businessmetaheadtag} src={imageUrl} linesToShow={2} />
      </div>
      <div className='container h-full mx-auto px-12 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 max-[991px]:max-w-full'>
        <PersonalLoanListing
          businessmetaheadtag={businessmetaheadtag}
          personalProducts={personalProducts}
          allPersonalProducts={allPersonalProducts}
          subCategoryTabs={subCategoryTabs}
          url_slug={url_slug}
          isSubCategoryFlow={isSubCategoryFlow}
        />
        {businessmetaheadtag?.video_url && (
          <div className='pt-[100px]'>
            <VedioCheck
              productDetailsData={businessmetaheadtag}
              title={'Personal Loans that aligns with your needs and preferences.'}
            />
          </div>
        )}
        {isSubCategoryFlow ? (
          <CreditBeginnerCard longTermSub={longFormData} hidePadding={true} />
        ) : (
          <LongFormContent longFormData={longFormData} />
        )}
        <ServiceTabs serviceTabs={serviceTabs} position={'5'} hidePadding={true} />
      </div>
    </>
  )
}

export default PersonalLoan
