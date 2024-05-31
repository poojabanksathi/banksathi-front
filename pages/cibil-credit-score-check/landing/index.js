import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'

const CreditScoreLandingPage = dynamic(
  () => import('@/core/component/common/CreditScoreLandingPage/CreditScoreLandingPage'),
  {
    ssr: false
  }
)

const index = () => {
  return (
    <div>
      <Head>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div className=' bg-[#844FCF]'>
        <CreditScoreLandingPage />
      </div>
    </div>
  )
}

export default index
