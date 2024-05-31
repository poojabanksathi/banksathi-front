import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

const MediaCoverageNews = ({mediaCoverage}) => {
  const router = useRouter();
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  
  return (

    <div>
      <div className='container mx-auto text-[#000]  py-6  px-8 '>
        <h1 className='text-[46px] py-4 text-[#212529] font-semibold max-sm:text-[20px]'> Latest News </h1>

        <div className=' grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-[30px]'>
          {mediaCoverage.data.mediaCart.map((value, index) => (
            <div key={index} className='rounded-lg'>
              <Link href={`${value.link}`} rel='nofollow' target='_blank'>
              <Image
                className='rounded-lg w-full h-[270px] object-cover max-lg:w-full'
                src={`${Img_URL}/${value?.imge}`}
                // {`${Img_URL}/${carddata?.product_image}`}
                alt='card-image'
                width={80}
                height={80}
              />
              </Link>
              <div className='pt-5 '>
                <Link href={`${value.link}`} rel='nofollow' target='_blank'>
                <h3 className=' text-[18px] leading-8 font-[500] text-[#0E0C1A]' >{value?.title}</h3></Link>
                <div className='flex mt-[20px] text-lg'>
                  <span className='text-[#212529]-400 font-normal mr-2'>{value?.time}</span>
                  <span className='text-[#212529]-400 font-normal'>{value?.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className='text-center py-5'>
          <button className='w-[190px] h-[56px] bg-transparent border-[1px] text-[#212529] border-[#212529] rounded text-[18px] font-semibold '>
            {' '}
            Load More
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default MediaCoverageNews;
