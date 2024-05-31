import Image from 'next/image'
import React from 'react'
import greenArrow from '../../../../../public/assets/moreicon-green.svg'
import moment from 'moment'
import Link from 'next/link'

const KnowledgeBaseComp = ({ blogData }) => {
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  const list = blogData?.data.resulted_data
  const forFirstDate = moment(list?.[0]?.created_at)?.format('MMM D')

  return (
    <>
      <Image
        src={'/assets/star-bg-home.svg'}
        height={23}
        width={23}
        alt='img'
        priority={true}
        className='relative left-[89%] bottom-4 max-[768px]:w-[22px] max-[768px]:h-[22px] max-[768px]:bottom-2'
      />
      <div className='h-auto bg-white pb-[80px] container pt-[80px] max-[768px]:pt-12 px-12 mx-auto bg-[#F4F8FB] max-[1024px]:px-8 max-[991px]:max-w-full max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
        <div className='flex flex-col gap-y-[30px]'>
          <div className='flex flex-row justify-between'>
            <div className="text-neutral-800 text-[40px]  max-[768px]:text-[22px] max-[768px]:leading-[26.4px] font-semibold font-['Faktum'] leading-[48px]">
              Knowledge Base
            </div>
            <div className='flex flex-row gap-[4px] items-center'>
              <Link href='/blog' prefetch={false}>
                <div className="text-neutral-800 text-[15px] font-semibold font-['Faktum'] leading-[21px] cursor-pointer">
                  More Blogs
                </div>
              </Link>
              <Image src={greenArrow} width={20} height={20} priority={true} alt='img' className='h-[20px] w-[20px]'/>
            </div>
          </div>
          <div className='flex flex-row gap-x-[40px] max-[768px]:flex-col max-sm:px-4 items-center'>
            <div className='flex flex-col items-start justify-start p-[30px] max-sm:p-[12px] w-auto h-auto rounded-2xl border'>
              <Link href={`/blog/${list?.[5]?.url_slug}`} prefetch={false}>
                <Image
                  className='w-[638.88px] xl:h-80 rounded-2xl max-[768px]:w-auto max-[768px]:h-auto'
                  width={638}
                  height={320}
                  src={`${Img_URL}/${list?.[5]?.image}`}
                  alt='img'
                  priority={true}
                />
              </Link>
              <Link href={`/blog/${list?.[5]?.url_slug}`} prefetch={false}>
                <div className=" max-[768px]:w-[283px] max-[768px]:text-neutral-800 max-[768px]:text-[15px] pt-[30px] text-neutral-800 text-2xl font-medium font-['Poppins'] leading-[33.60px]">
                  {list?.[5]?.title}
                </div>
              </Link>
              <div className='flex justify-start gap-2 md:mt-4 items-center'>
                {list?.[5]?.author && (
                  <p className='font-poppins font-semibold text-[13px] leading-[19px] text-center text-[#212529]'>
                    {list?.[5]?.author}
                  </p>
                )}
                {list?.[5]?.created_at && (
                  <p className='font-poppins font-normal text-[13px] leading-[30px]  text-[#212529] pb-2'>
                    {forFirstDate}
                  </p>
                )}
                {list?.[5]?.tor && (
                  <p className='font-poppins font-normal text-[13px] leading-[30px]  text-[#212529] pb-2'>
                    {list?.[5]?.tor} min read
                  </p>
                )}
              </div>
            </div>
            <div className='flex flex-col gap-y-[20px]  max-sm:pt-[24px]'>
              {list?.slice(0, 4)?.map((item) => {
                const date = moment(item?.created_at).format('MMM D')
                return (
                  <>
                    <div className='flex flex-col'>
                      <Link href={`/blog/${item?.url_slug}`} prefetch={false}>
                        <div className="text-neutral-800 max-[768px]:text-[15px]  text-xl font-medium font-['Poppins'] leading-7 cursor-pointer">
                          {item?.title}
                        </div>
                      </Link>
                      <div className='flex justify-start gap-2 items-center'>
                        {item?.author && (
                          <p className='font-poppins font-semibold text-[13px] leading-[19px] text-center text-[#212529]'>
                            {item?.author}
                          </p>
                        )}
                        {item?.created_at && (
                          <p className='font-poppins font-normal text-[13px] leading-[30px]  text-[#212529] pb-2'>
                            {date}
                          </p>
                        )}
                        {item?.tor && (
                          <p className='font-poppins font-normal text-[13px] leading-[30px]  text-[#212529] pb-2'>
                            {item?.tor} min read
                          </p>
                        )}
                      </div>
                      <div className='border border-1 borderClas mt-[10px]' />
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default KnowledgeBaseComp
