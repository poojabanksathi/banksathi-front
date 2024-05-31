import React from 'react'
import Link from 'next/link'

export default function CompareNowBtn({ name, disable, compareslug }) {
  const getMatchPathUrl = (urlPath) => {
    const regex = /\/([^/]+)$/
    const matches = regex.exec(urlPath)
    if (matches && matches.length > 1) {
      const extractedString = matches[1]
      return extractedString
    }
  }
  const urlSlugs = compareslug?.map((item) => getMatchPathUrl(item.url_slug))
  return (
    <>
      <Link
        href={{
          pathname:
            urlSlugs[0] && urlSlugs[1] && urlSlugs[2] && urlSlugs[3]
              ? `/credit-cards/compare/${urlSlugs[0]}/${urlSlugs[1]}/${urlSlugs[2]}/${urlSlugs[3]}`
              : urlSlugs[0] && urlSlugs[1] && urlSlugs[2]
                ? `/credit-cards/compare/${urlSlugs[0]}/${urlSlugs[1]}/${urlSlugs[2]}`
                : `/credit-cards/compare/${urlSlugs[0]}/${urlSlugs[1]}`
        }}
        prefetch={false}>
        <button
          type='button'
          disabled={disable}
          className={
            disable
              ? 'bg-[#ccc]  disabled cursor-no-drop xl:px-4 lg:text-[14px] py-3 px-6 text-white xl:text-[14px] max-[320px]:text-[10px] sm:text-[12px] text-[14px] rounded-lg'
              : 'bg-[#49D49D] cursor-pointer xl:px-4 lg:text-[14px] py-3 px-6 text-[#212529] xl:text-[14px] max-[320px]:text-[10px] sm:text-[12px] text-[14px]  rounded-lg'
          }>
          {name}
        </button>
      </Link>
    </>
  )
}
