import Link from 'next/link'
import React from 'react'

function CreditTopListFilterMenu({ moreleftmenucredit, morecategoryleftfilter }) {
  return (
    <div className='grid gap-8 container mx-auto px-20 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4'>
      <div className='bg-white rounded-[10px]'>
        <div className='bg-[#844FCF] rounded-t-[10px]'>
          <h2 className='text-white text-base px-8 py-4'>Top Picks For You</h2>
        </div>
        <div className='listCibil px-8 py-4 max-[479px]:px-5'>
          {moreleftmenucredit?.top_category.length > 0 &&
            moreleftmenucredit?.top_category.map((data, index) => {
              return (
                <div key={index}>
                  <Link href={`/credit-cards/${data?.url_slug}`} prefetch={false}>
                    <p className='text-[17px] flex items-center max-[479px]:text-[15px] gap-2 text-[#000]  filter-box-text hover:!underline'>

                      {data.title}
                    </p>

                  </Link>
                </div>
              )
            })}
        </div>
      </div>

      <div className='bg-white rounded-[10px]'>
        <div className='bg-[#844FCF] rounded-t-[10px]'>
          <h2 className='text-white text-base px-8 py-4'>Credit Cards by credit score</h2>
        </div>
        <div className='listCibil px-8 py-4 max-[479px]:px-5'>
          {moreleftmenucredit?.more_by_category.length > 0 &&
            moreleftmenucredit?.more_by_category.map((data, index) => {
              return (
                <div key={index}>
                  <Link href={`/credit-cards/${data?.url_slug}`} prefetch={false}>
                    <p className='text-[17px] flex items-center max-[479px]:text-[15px] gap-2 text-[#000]  filter-box-text hover:!underline'>

                      {data.title}
                    </p>

                  </Link>
                </div>
              )
            })}

        </div>
      </div>

      <div className='bg-white rounded-[10px]'>
        <div className='bg-[#844FCF] rounded-t-[10px]'>
          <h2 className='text-white text-base px-8 py-4'>Credit Cards by Issuer</h2>
        </div>
        <div className='listCibil px-8 py-4 max-[479px]:px-5'>
          {moreleftmenucredit?.more_way_to_browse?.length > 0 &&
            moreleftmenucredit?.more_way_to_browse.map((data, index) => {
              return (
                <div key={index}>
                  <Link href={`/credit-cards/${data?.url_slug}`} prefetch={false}>
                    <p className='text-[17px] flex max-[479px]:text-[15px] items-center gap-2 text-[#000]  filter-box-text hover:!underline'>

                      {data.title}
                    </p>

                  </Link>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default CreditTopListFilterMenu
