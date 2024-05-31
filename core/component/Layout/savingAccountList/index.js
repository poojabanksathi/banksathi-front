import dynamic from 'next/dynamic'
import React from 'react'

const CreditCardTrobleHaving = dynamic(
  () => import('@/core/component/Layout/compareCard/cardTrobleHaving/CreditCardTrobleHaving'),
  {
    ssr: false
  }
)
// const BreadcrumbSavingAccount = dynamic(
//   () => import('@/core/component/Layout/savingAccountList/BreadcrumbSavingAccount'),
//   {
//     ssr: false
//   }
// )
const SavingAccountBanner = dynamic(() => import('@/core/component/Layout/savingAccountList/SavingAccountBanner'), {
  ssr: false
})
const SavingListingTab = dynamic(() => import('@/core/component/Layout/savingAccountList/SavingListingTab'), {
  ssr: false
})
const CreditBeginnerCard = dynamic(() => import('@/core/component/Layout/creditCardList/CreditBeginnerCard'), {
  ssr: false
})
const VedioCheck = dynamic(() => import('@/core/component/common/VedioCheck'), { ssr: false })
const EligiblityCriteria = dynamic(() => import('@/core/component/Layout/savingAccountList/EligiblityCriteria'), {
  ssr: false
})
const ServiceTabs = dynamic(() => import('@/core/component/Layout/savingAccountList/ServiceTabs'), {
  ssr: false
})
const CreditListingBanner = dynamic(() => import('@/core/component/Layout/creditCardList/CreditListingBanner'), {
  ssr: false
})

function SavingAccountList({
  businessmetaheadtag,
  longFormData,
  bankAccountsData,
  faqData,
  businessCategoryData,
  leftMenuFilterData,
  subCategoryTabs,
  url_slug,
  isSubCategoryFlow,
  totalProducts,
  serviceTabs,
  sub_cat_image,
  sub_cat_params
}) {
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const imageUrl = sub_cat_image
    ? `${Img_URL}/${businessmetaheadtag?.sub_category_image}`
    : `${Img_URL}/${businessmetaheadtag?.product_image}`
  return (
    <div className='bg-[#F4F8FB]'>
      {/* <SavingAccountBanner businessmetaheadtag={businessmetaheadtag} /> */}
      <CreditListingBanner businessmetaheadtag={businessmetaheadtag} src={imageUrl} linesToShow={2} />
      <div className='container px-20 max-[1440px]:px-12 max-[1200px]:px-0 min-[1024px]:px-14 mx-auto max-[991px]:max-w-full min-[768px]:px-8'>
        <SavingListingTab
          subCategoryTabs={subCategoryTabs}
          url_slug={url_slug}
          bankAccountsData={bankAccountsData}
          leftMenuFilterData={leftMenuFilterData}
          isSubCategoryFlow={isSubCategoryFlow}
          totalProducts={totalProducts}
          sub_cat_params={sub_cat_params}
          businessmetaheadtag={businessmetaheadtag}
        />
      </div>
      <VedioCheck productDetailsData={bankAccountsData} />
      <CreditCardTrobleHaving position={'4'} />
      <CreditBeginnerCard longTerm={longFormData} />
      <div className='max-sm:mx-0 container mx-auto'>
        <ServiceTabs serviceTabs={serviceTabs} position={'5'} />
      </div>
      {/* <EmojiCard/> */}
    </div>
  )
}

export default SavingAccountList
