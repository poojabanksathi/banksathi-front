import withAuth from '@/core/component/common/PrivateRoute'
import dynamic from 'next/dynamic'
import React from 'react'
const CreditReportPDF = dynamic(() => import('@/core/component/common/CreditReportPDF/CreditReportPDF'), {
  ssr: false
})

const PdfComponent = () => {
  return (
    <div className='bg-white'>
      <CreditReportPDF />
    </div>
  )
}

export default withAuth(PdfComponent)
