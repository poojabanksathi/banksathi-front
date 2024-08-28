import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { BASE_URL, BUSINESSCATEGORY, BrowseServices, FAQAPI } from '@/utils/alljsonfile/service';
import Axios from 'axios';

// Dynamically import components with React.memo to optimize rendering
const RecommdationCategory = React.memo(dynamic(() => import('@/core/component/Layout/creditCardList/RecommdationCategory'), { ssr: false }));
const MobileFooter = React.memo(dynamic(() => import('@/core/component/common/MobileFooter'), { ssr: false }));
const DynamicHeader = React.memo(dynamic(() => import('@/core/component/common/Header'), { ssr: false }));
const CreditListingBanner = React.memo(dynamic(() => import('@/core/component/Layout/creditCardList/CreditListingBanner'), { ssr: false }));
const CommonBreadCrumbComponent = React.memo(dynamic(() => import('@/core/component/common/CommonList/CommonBreadCrumbComponent'), { ssr: false }));

const Index = ({
  productlistdata,
  categorytopmenulist,
  businessmetaheadtag,
  faqdata,
  longTerm,
  businessCategorydata,
  moreleftmenucredit,
  leadsParams,
  url_slug,
  serviceTabs,
  h
}) => {
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL;

  const contactUsRef = useRef(null);
  const bottomRefs = useRef(null);
  const mobileFooterRef = useRef(null);


  const router = useRouter();

  useEffect(() => {
    if (leadsParams) {
      if (typeof window !== 'undefined') {
        sessionStorage?.setItem('leadsParams', JSON.stringify(leadsParams));
      }
    }
  }, [leadsParams]);

  useEffect(() => {
    if (!productlistdata || productlistdata?.product_list?.length === 0) {
      router?.push('/404');
    }
  }, [productlistdata, router]);

  return (
    <>
      <div>
        <section>
          <div className='bg-[#844FCF]'>
            <DynamicHeader businessCategorydata={businessCategorydata} />
          </div>
          <div className='bg-[#F4F8FB] pb-4'>
            <CommonBreadCrumbComponent link1={'/credit-cards'} link1Name='Credit Cards' />
          </div>
          <div className='bg-[#F4F8FB]'>
            <CreditListingBanner
              businessmetaheadtag={businessmetaheadtag}
              src={`${Img_URL}/${businessmetaheadtag?.product_image}`}
              linesToShow={2}
              paddingTop={true}
            />
          </div>
        </section>
        <div>
          <RecommdationCategory
            productlistdata={productlistdata}
            categorytopmenulist={categorytopmenulist}
            faqdata={faqdata}
            longTerm={longTerm}
            moreleftmenucredit={moreleftmenucredit}
            businessmetaheadtag={businessmetaheadtag}
            url_slug={url_slug}
            serviceTabs={serviceTabs}
            contactUsRef={contactUsRef}
            bottomRefs={bottomRefs}
            mobileFooterRef={mobileFooterRef}
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
    const url_slug = query.page === '' ? context_params : context?.resolvedUrl?.split('?')[0]?.split('/')[1];
    const ref = req?.headers?.referer || '';
    const h = query?.h || '';
    const ip = req?.headers?.['x-forwarded-for']?.split(',')?.[0] || '';
    const user_agent = req?.headers?.['user-agent'] || '';
    const leadsParams = { user_agent, ip };
    const page = query.page ? query.page - 1 : 0;

    const requestParams = {
      lang_id: 1,
      business_category_url_slug: url_slug,
      offset: page,
      limit: 20
    };

    const [data1, data2, data3, data4, data5, data7, data8, data10] = await Promise.all([
      Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, requestParams).then(res => res.data),
      Axios.post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, { lang_id: 1, business_category_url_slug: url_slug }).then(res => res.data),
      Axios.post(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, { lang_id: 1, business_category_url_slug: url_slug }).then(res => res.data),
      Axios.post(BASE_URL + FAQAPI.productFaq, { lang_id: 1, url_slug: url_slug }).then(res => res.data),
      Axios.post(BASE_URL + BUSINESSCATEGORY.formLongcontent, { lang_id: 1, business_category_url_slug: url_slug }).then(res => res.data),
      Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, { lang_id: 1 }).then(res => res.data),
      Axios.post(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, { lang_id: 1, business_category_url_slug: url_slug }).then(res => res.data),
      Axios.post(BASE_URL + BrowseServices.serviceTabs, { lang_id: 1, business_category_url_slug: '' }).then(res => res.data)
    ]);

    return {
      props: {
        productlistdata: data1 || null,
        categorytopmenulist: data2,
        businessmetaheadtag: data3?.h1_paragraph || null,
        faqdata: data4,
        longTerm: data5,
        businessCategorydata: data7,
        moreleftmenucredit: data8,
        referer: ref,
        leadsParams: leadsParams,
        url_slug: url_slug,
        serviceTabs: data10,
        h: h
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return { props: {} };
  }
}
