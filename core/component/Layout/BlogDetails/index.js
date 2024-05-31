import { BASE_URL, BLOG } from '@/utils/alljsonfile/service';
import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import SocialMediaShareComp from '../../common/CommonList/SocialMediaShareComp';
import { scoreData, eligibilityData } from '@/utils/alljsonfile/checkCibilCardList';
import CheckCibilCard from '../../common/CheckCibilCard/CheckCibilCard';
import { useWindowSize } from '@/hooks/useWindowSize';

const CreditNewsOffer = dynamic(() => import('@/core/component/Layout/CreditNews/CreditScoreCard/CreditNewsOffer'), {
  ssr: false,
});

const addImageDimensions = (htmlContent) => {
  if (typeof window === 'undefined') return htmlContent;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  const images = doc.querySelectorAll('img');
  images.forEach((img) => {
    if (!img.width) {
      img.setAttribute('width', '600');
    }
    if (!img.height) {
      img.setAttribute('height', '400');
    }
  });

  return doc.body.innerHTML;
};

function BlogDetails({ blogPostDetailData }) {
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL;
  const [getAllData, setAllData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (blogPostDetailData == undefined) {
      router.push('/404');
    }
  }, [blogPostDetailData, router]);

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const getBlogList = () => {
    axios
      .post(
        BASE_URL + BLOG?.blogList,
        {
          offset: 0,
          limit: 9,
        },
        { headers: headers }
      )
      .then((data) => {
        setAllData(data?.data?.data?.resulted_data?.filter((d) => d.title != null));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBlogList();
  }, []);

  const inputDate = blogPostDetailData?.created_at;
  const formattedDate = moment(inputDate).format('MMM D ·');
  const size = useWindowSize();
  const mobileSize = size?.width <= 576;
  const contentWithDimensions = addImageDimensions(blogPostDetailData?.content || '');

  return (
    <div className="container h-full px-16 max-[1024px]:px-8 mx-auto sm:mb-[60px] max-sm:mb-[30px] max-[991px]:max-w-full pt-[30px] max-[576px]:px-6 max-[479px]:px-4 max-[576px]:py-[30px] max-[375px]:px-4 max-[320px]:px-4">
      <div className="grid grid-cols-12 gap-12 max-[576px]:gap-0 border-b-2 border-black max-sm:pb-5">
        <div className="col-span-8 max-[768px]:col-span-7 max-[576px]:col-span-12">
          {blogPostDetailData?.title && (
            <div>
              <h1 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text font-[faktum] xl:text-[32px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[20px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                {blogPostDetailData?.title}
              </h1>
            </div>
          )}
          <div className="flex items-center gap-3 my-5">
            {blogPostDetailData?.author && (
              <div className="min-h-[20px]">
                <p className="text-[15px] text-[#0E1B2C] max-sm:text-[14px]">{blogPostDetailData?.author}</p>
              </div>
            )}
            {blogPostDetailData?.created_at && (
              <div className="min-h-[20px]">
                <p className="text-[15px] text-[#0E1B2C] max-sm:text-[14px]">· &nbsp;{formattedDate}</p>
              </div>
            )}
            {blogPostDetailData?.created_at && (
              <p className="text-[15px] text-[#0E1B2C] max-sm:text-[14px]">{blogPostDetailData?.tor} min read</p>
            )}
          </div>
            <div className="mt-[30px] mb-[51px] card-img-space sm:block hidden">
              <div style={{ width: 'auto', height: 'auto' }}>
                <Image
                  src={`${Img_URL}/${blogPostDetailData?.image}`}
                  alt="image"
                  className="w-full h-[350px] rounded-2xl object-cover bolg-details-card-img"
                  width={80}
                  height={80}
                  unoptimized={true}
                  priority={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          <div>
            <div>
              <SocialMediaShareComp productDetails={blogPostDetailData} />
            </div>
            {mobileSize && (
              <div className="pb-6">
                <Link href="/credit-cards/eligibility" prefetch={false}>
                  <button className="bg-[#49D49D] w-full lg:w-[240px] h-[48px] rounded-md font-faktum font-semibold text-[15px] leading-[18px] tracking-wide text-[#212529]">
                    Check Credit Card Eligibility
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div>
            <p
              className="text-[#212529] text-[15px] font-normal longform-list mb-[40px] blog-Post-detail-table"
              dangerouslySetInnerHTML={{ __html: `<div>${contentWithDimensions}</div>` }}
            />
          </div>
        </div>
        <div className="col-span-4 xl:w-fit space-y-6 max-[768px]:col-span-5 h-auto max-[576px]:col-span-12 max-sm:pt-[0px] recent-blog">
          <CheckCibilCard cardData={scoreData} position={'3'} title={'Check Score'} />
          <div className="h-auto bg-white rounded-2xl mt-5">
            <div className="mb-3">
              <div className="border-b-[1px] h-[50px] border-[#E6ECF1]">
                <p className="text-[15px] font-semibold py-3 pl-5 text-[#212529]">Recent Posts </p>
              </div>
              <div className="listCibil">
                {getAllData?.map((data, i) => (
                  <div className="px-5 py-[9.5px] border-b" key={i}>
                    <Link href={data?.url_slug} prefetch={false} className="text-[#212529] text-[15px] font-medium recent-post">
                      {data?.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <CreditNewsOffer position={'6'} />
          {!mobileSize && <CheckCibilCard cardData={eligibilityData} position={'5'} title={'Check Eligibility'} />}
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;