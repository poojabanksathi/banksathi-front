import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';
import { BASE_URL, BUSINESSCATEGORY, BrowseServices, FAQAPI } from '@/utils/alljsonfile/service';
import Axios from 'axios';

const IfscCodeCatagoty = React.memo(dynamic(() => import('@/core/component/Layout/IfscCode/IfscCodeCatagoty'), { ssr: false }));
const MobileFooter = React.memo(dynamic(() => import('@/core/component/common/MobileFooter'), { ssr: false }));
const DynamicHeader = React.memo(dynamic(() => import('@/core/component/common/Header'), { ssr: false }));
const IfscCodeBanner = React.memo(dynamic(() => import('@/core/component/Layout/IfscCode/IfscCodeBanner'), { ssr: false }));
const CommonBreadCrumbComponent = React.memo(dynamic(() => import('@/core/component/common/CommonList/CommonBreadCrumbComponent'), { ssr: false }));

const Index = ({
  businessmetaheadtag,
  faqdata,
  longTerm,
  businessCategorydata,
  leadsParams,
  serviceTabs,
  h
}) => {
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL;

  const mobileFooterRef = useRef(null);

  useEffect(() => {
    if (leadsParams) {
      if (typeof window !== 'undefined') {
        sessionStorage?.setItem('leadsParams', JSON.stringify(leadsParams));
      }
    }
  }, [leadsParams]);


  return (
    <>
      <div>
        <section>
          <div className='bg-[#844FCF]'>
            <DynamicHeader businessCategorydata={businessCategorydata} />
          </div>
          <div className='bg-[#F4F8FB] pb-4'>
            <CommonBreadCrumbComponent link1={'/ifsc-code'} link1Name='Ifsc Code' />
          </div>
          <div className='bg-[#F4F8FB]'>
            <IfscCodeBanner
              businessmetaheadtag={businessmetaheadtag}
              src={`${Img_URL}/${businessmetaheadtag?.product_image}`}
              linesToShow={2}
              paddingTop={true}
            />
          </div>
        </section>
        <div>
          <IfscCodeCatagoty
            faqdata={faqdata}
            longTerm={longTerm}
              serviceTabs={serviceTabs}
          />
          <div ref={mobileFooterRef}>
            <MobileFooter businessCategorydata={businessCategorydata} />
          </div>
        </div>
      </div>
  
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  try {
    const { query, req } = context;
    const context_params = context?.resolvedUrl?.split('/')[1] || '';
    const url_slug = query.page === '' ? context_params : query?.['slug-district'];
    const ref = req?.headers?.referer || '';
    const h = query?.h || '';
    const ip = req?.headers?.['x-forwarded-for']?.split(',')?.[0] || '';
    const user_agent = req?.headers?.['user-agent'] || '';
    const leadsParams = { user_agent, ip };
    const page = query.page ? query.page - 1 : 0;


    const req1 = {
      lang_id: 1,
       business_category_url_slug: url_slug
    }
    const req2 = {
      lang_id: 1,
      url_slug: url_slug
    }
    const req3 = {
      lang_id: 1,
    }
    const req4 = {
      lang_id: 1,
       business_category_url_slug: ''
    }

    const [data3, data4, data5, data7, data10] = await Promise.all([
    
      Axios.post(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, req1).then(res => res.data),
      Axios.post(BASE_URL + FAQAPI.productFaq, req2).then(res => res.data),
      Axios.post(BASE_URL + BUSINESSCATEGORY.formLongcontent, req1).then(res => res.data),
      Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3).then(res => res.data),
      Axios.post(BASE_URL + BrowseServices.serviceTabs, req4).then(res => res.data)
    ]);

    return {
      props: {
        businessmetaheadtag: data3?.h1_paragraph || null,
        businessCategorydata: data7,
        faqdata: data4,
        longTerm: data5,
        serviceTabs: data10,
        referer: ref,
        leadsParams: leadsParams,
        url_slug: url_slug,
        h: h
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return { props: {} };
  }
}