import React from 'react'
import dynamic from 'next/dynamic'
import { homePageExportComponents } from '@/utils/alljsonfile/enableDisableComponent'

const OurPartner = dynamic(() => import('./ourPartner/OurPartner'), {
  ssr: false
})
const CustomersSpeak = dynamic(() => import('./customerSpeak/CustomersSpeak'), {
  ssr: false
})
const OurInvestor = dynamic(() => import('./invester/OurInvestor'), {
  ssr: false
})
const BankOverview = dynamic(() => import('./overview/BankOverview'), {
  ssr: false
})
const VideoComponent = dynamic(() => import('./videoComponent/VideoComponent'), {
  ssr: false
})
const SteperComponent = dynamic(() => import('./stepper/SteperComponent'), {
  ssr: false
})
const CategoryBaseTab = dynamic(() => import('./category/CategoryBaseTab'), {
  ssr: false
})
const Content = dynamic(() => import('./content/Content'), {
  ssr: false
})

function HomePage({ businessCategorydata, RecomendedTopselling, faqdata, longTermData, registerdevicedata }) {
  return (
    <>
      {homePageExportComponents.homeContent && <Content />}
      {homePageExportComponents.categoryBasehub && <CategoryBaseTab businessCategorydata={businessCategorydata} />}
      {homePageExportComponents.stepperComponent &&<SteperComponent RecomendedTopselling={RecomendedTopselling} />}
      {homePageExportComponents.videoComponent && <VideoComponent />}
      {homePageExportComponents.bankOverview &&<BankOverview />}
      {homePageExportComponents.ourInvestor && <OurInvestor />}
      {homePageExportComponents.customerSpeak &&<CustomersSpeak faqdata={faqdata} />}
      {homePageExportComponents.ourPartners && <OurPartner />}
    </>
  )
}

export default HomePage
