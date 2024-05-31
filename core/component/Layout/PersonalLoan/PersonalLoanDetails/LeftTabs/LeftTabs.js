import { PersonalLoansHash } from '@/utils/alljsonfile/cardsdetailsfilter'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const LeftTabs = ({ selectedTab, setSelectedTab }) => {
  const router = useRouter()

  const getHref = (data) => {
    const subCat = router?.query?.['personal-loan-category']
    const detail = router?.query?.['personal-loan-details']
    return `/personal-loan/${subCat}/${detail}${data?.linkhref}`
  }
  return (
    <div>
      <div className='p-5 max-[1024px]:p-2 bg-white filter-credit sticky top-20 rounded-xl'>
        <div className=''>
          {PersonalLoansHash?.map((data, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedTab(data?.id)
                }}
                className=''>
                <Link href={getHref(data)} prefetch={false}>
                  <p
                    id={`${index}+'cd+btn'`}
                    className={`p-4  mb-2 max-[1200px]:text-[13px] hover:bg-[#844FCF] active:bg-[#844FCF]  duration-150 rounded-[12px] hover:text-white text-[#212529] text-[15px] font-semibold detail-filter ${
                      selectedTab === data?.id ? 'bg-[#844FCF] active:bg-[#844FCF]  duration-150  text-white ' : ''
                    } `}>
                    {data.detaildata}
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

export default LeftTabs
