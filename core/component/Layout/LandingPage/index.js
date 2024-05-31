'use client'
import Image from "next/image";
import React from "react";
import { DetailsDatabox } from "@/utils/alljsonfile/cardsdetailsfilter";
import ApplyNowButton from "../../common/ApplyNowButton/ApplyNowButton";
import Link from "next/link";
import { useWindowSize } from "@/hooks/useWindowSize";
import Head from "next/head";
import HeaderComp from "../../common/HeaderComp/HeaderComp";
import { useRouter } from "next/router";

const index = (props) => {
  const { product_details } = props.productDetailsData
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const size = useWindowSize()
  const router = useRouter()
  const isMobile = size?.width <= 576

  const isLandingPage = router.asPath?.includes('landing')

  return (
    <>
    <HeaderComp metaData={props?.businessmetaheadtag} isLandingPage={isLandingPage}/>
    <div className={`${ isMobile ? 'min-h-full overflow-scroll pb-10' : ''}`}> 
    <div className=" mx-auto md:px-12 px-4 flex flex-col gap-1 sm:py-5 py-3 items-center  min-h-full bg-[#F4F8FB]">
      <div className="  md:w-[500px] lg:w-[753px] max-[768px]:w-[450px] max-[449px]:w-full border border-[#E6ECF1] landing-complete-box max-[375px]:w-[335px]   max-[320px]:w-[300px] max-[425px]:p-5 flex flex-col items-center justify-center bg-[#FFFFFF] rounded-2xl px-10 py-[26px]">
        <h2 className="text-center  text-neutral-800 text-[38px] max-[768px]:text-[35px] title-box-landing font-semibold font-['Faktum'] leading-[28.80px] mb-5 md:w-auto w-full">

          {DetailsDatabox?.congratulation}
        </h2>
        <p className="text-[#212529] text-[17px] font-semibold font-['Faktum'] text-center sub-title-box-landing">You’re a step away from discovering the <br /> real joy of finance </p>

        {product_details?.product_image &&
        <Link href={`${product_details?.direct_campaign_url}`} prefetch={false}>
          <Image
            src={`${Img_URL}/${product_details?.product_image}`}
            //
            alt='card image'
            width={340}
            height={186}
            className=' mt-[23px] card-img-landing'
            unoptimized={true}
          />
        </Link>
        }

        <h2 className=" text-[#212529] text-[20px] font-[Faktum] max-[479px]:text-[17px] font-semibold	mt-[12px] max-sm:leading-[28px] max-sm:text-center leading-[28px]">{product_details.card_name}</h2>

        {product_details?.welcome_benefits && <div className="text-[14px] font-[Poppins] text-[#212529] max-sm:text-center">{product_details?.welcome_benefits?.replace(/["']/g, ' ')}</div>}
        <div className="flex gap-[13px] max-[320px]:gap-[6px] my-5 max-[425px]:mb-0 max-[425px]:mt-[15px]">
                    <div className="h-auto border rounded-[8px] border-[#a882dde0] w-40 md:w-[135px] py-[8px] px-[16px] max-[375px]:w-[141px] max-[320px]:w-[125px] min-h-auto text-left flex items-start flex-col">
            <div className="text-[16px] font-light font-[Poppins]	text-[#212529]">
              {DetailsDatabox?.joiningfees}
            </div>
            <div className="font-[Poppins] text-[14px] font-semibold text-[#212529]">
              {product_details?.joining_fee == 0 ? (
                <span>Free</span>
              ) : (
                <span className='symbole-rupee font-[Poppins] text-[14px]  font-semibold text-[#212529]'>₹ {product_details?.joining_fee} /-</span>
              )}
            </div>
                {product_details?.joining_fee != 0 &&
            <div className="text-[5px] font-[Poppins] font-light text-[#212529]">
              {DetailsDatabox?.application_taxes}
            </div>
            }
          </div>

          <div className="h-auto  border rounded-[8px] border-[#a882dde0] py-[8px] px-[16px] w-40 md:w-[135px]	max-[375px]:w-[141px] max-[320px]:w-[125px]  min-h-auto	text-left flex items-start  flex-col">
            <div className="text-[16px] font-['Poppins'] font-light text-[#212529]"> 
              {DetailsDatabox?.fees}
            </div>
            <div className="font-[Poppins] text-[14px]  font-semibold text-[#212529]">
              {product_details?.annual_fee == 0 ? (
                <span>Free</span>
              ) : (
                <span className='symbole-rupee text-[14px] font-[Poppins] font-semibold text-[#212529]'>₹ {product_details?.annual_fee} /-</span>
              )}
            </div>
          {product_details?.annual_fee != 0 &&
            <div className="text-[5px] font-[Poppins] font-light text-[#212529]">
              {DetailsDatabox?.application_taxes}
            </div>
          }
          </div>

        </div>
        <div className="flex flex-col-reverse md:flex-col items-center justify-center ">
          <div className={`${
                            isMobile
                              ? 'fixed bottom-0 bg-[#fff]  p-0 left-0 z-[999] w-full justify-between items-center apply-btn-landing'
                              : 'mt-[6px]'
                          } `}>

        <Link href={`${product_details?.direct_campaign_url}`} prefetch={false}>
        <div className={"bg-[#49D49D] text-[#212529] w-[450px] max-[479px]:h-[45px]  max-[576px]:w-full max-[768px]:w-[400px] max-[576px]:text-[18px] max-[576px]:h-full h-[61px] text-center font-[Faktum] items-center flex justify-center text-[26px] font-semibold p-2 max-[576px]:py-[0.8rem]	rounded-lg"}>
         {DetailsDatabox?.apllynow}
         </div>
        </Link>
          </div>
         
          <div className="md:border-0 border-2"></div>
          {product_details?.welcome_offer &&
            <div className="mt-5 md:mb-0 mb-5 px-5 md:px-0  ">
              <div
                className='font-[Poppins] font-medium space-y-2 text-[15px] product-list-data-card'
                dangerouslySetInnerHTML={{
                  __html: `<div>${product_details?.welcome_offer}</div>`
                }}>

              </div>
              <div>
           
              </div>
            </div>
          }
        </div>
      </div>
    </div>
      {isMobile && 
       <div className=' bg-[#EAF0F5] w-full'>
       <div className='p-5 text-center font-normal font-[Poppins] text-[#212529] text-[10px]'>

         All Right Reserved | © Copyright @BankSathi {new Date()?.getFullYear()}
       </div>
     </div>
      }
    </div>
    </>
  );
};

export default index;