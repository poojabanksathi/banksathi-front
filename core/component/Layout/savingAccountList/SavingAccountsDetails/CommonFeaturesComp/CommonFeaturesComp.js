import React from 'react'

const CommonFeaturesComp = ({ commonFeaturesData, title, bankDetailPage }) => {
  const int_usage = commonFeaturesData?.international_usag === 1 ? 'Yes' : 'No'

  return (
    <>
      {title === 'DEBIT' ? (
        <>
          {commonFeaturesData?.atm_with_limit_fpm && (
            <div className='flex flex-col'>
              <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] max-sm:text-[12px]">
                <h2 className='leading-[18px] text-neutral-800 text-[15px] font-medium font-[Poppins]'>
                  ATM Withdrawals (per month)
                </h2>
              </div>
              <div className="text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-relaxed">
                {commonFeaturesData?.atm_with_limit_fpm}
              </div>
            </div>
          )}
          {int_usage && (
            <div className='flex flex-col'>
              <div className=" text-neutral-800 break-words text-[15px] font-medium font-['Poppins'] leading-[18px] max-sm:text-[12px]">
                <h2 className='leading-[18px] text-neutral-800 text-[15px] font-medium font-[Poppins]'>
                  International Usage
                </h2>
              </div>
              <div className="symbole-rupee text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-relaxed">
                {int_usage}
              </div>
            </div>
          )}

          {commonFeaturesData?.debit_card_spend_limit && (
            <div className='flex flex-col'>
              <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] leading-[18px] max-sm:text-[12px]">
                <h2 className='leading-[18px] text-neutral-800 text-[15px] font-medium font-[Poppins]'>
                  Debit Card Online Spend Limit{' '}
                </h2>
              </div>
              <div className="text-neutral-800 symbole-rupee text-[15px] font-normal font-['Poppins'] leading-relaxed">
                ₹ {commonFeaturesData?.debit_card_spend_limit}
              </div>
            </div>
          )}
          {commonFeaturesData?.card_rep_fee && commonFeaturesData?.card_rep_fee !== 0 ? (
            <div className='flex flex-col'>
              <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] leading-snug max-sm:text-[12px]">
                <h2 className='leading-[18px] text-neutral-800 text-[15px] font-medium font-[Poppins]'>
                  Card Replacement Fee
                </h2>
              </div>
              <div className=" symbole-rupee text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-relaxed">
                ₹{commonFeaturesData?.card_rep_fee}
              </div>
            </div>
          ) : (
            ''
          )}

          {/* for bank details page
           */}
          {bankDetailPage && (
            <>
              {commonFeaturesData?.card_rep_fee && commonFeaturesData?.card_rep_fee !== 0 ? (
                <div className='flex flex-col'>
                  <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] leading-snug max-sm:text-[12px]">
                    <h2 className='leading-[18px] text-neutral-800 text-[15px] font-medium font-[Poppins]'>
                      Insurance Coverage
                    </h2>
                  </div>
                  <div className=" symbole-rupee text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-relaxed">
                    ₹{commonFeaturesData?.card_rep_fee}
                  </div>
                </div>
              ) : ""}
              {commonFeaturesData?.zero_lib_protection && (
                <div className='flex flex-col'>
                  <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] leading-snug max-sm:text-[12px]">
                    <h2 className='leading-[18px] text-neutral-800 text-[15px] font-medium font-[Poppins]'>
                      Zero Liability Protection
                    </h2>
                  </div>
                  <div
                    className="text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: `<div>${commonFeaturesData?.zero_lib_protection}</div>`
                    }}></div>
                </div>
              )}
              {commonFeaturesData?.personal_acci_cover && (
                <div className='flex flex-col'>
                  <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] leading-snug max-sm:text-[12px]">
                    <h2 className='leading-[18px] text-neutral-800 text-[15px] font-medium font-[Poppins]'>
                      Personal Accidental Insurance Cover
                    </h2>
                  </div>
                  <div
                    className="text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: `<div>${commonFeaturesData?.personal_acci_cover}</div>`
                    }}></div>
                </div>
              )}
              {commonFeaturesData?.air_acc_ins_cover && (
                <div className='flex flex-col'>
                  <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] leading-snug max-sm:text-[12px]">
                    <h2 className='leading-[18px] text-neutral-800 text-[15px] font-medium font-[Poppins]'>
                      Air Accidental Insurance Cover
                    </h2>
                  </div>
                  <div
                    className="text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: `<div>${commonFeaturesData?.air_acc_ins_cover}</div>`
                    }}></div>
                </div>
              )}
            </>
          )}
        </>
      ) : title === 'ACCOUNT' ? (
        <>
          <div className='flex flex-col '>
            <div className=" text-neutral-800 break-words text-[15px] font-medium font-['Poppins'] leading-[18px] max-sm:text-[12px]">
              <h2 className='leading-[18px] text-neutral-800 text-[15px] font-medium font-[Poppins]'>
                Average Monthly/Quarterly Balance{' '}
              </h2>
            </div>
            <div className="text-neutral-800 symbole-rupee text-[15px] font-normal font-['Poppins'] leading-relaxed">
              ₹ {commonFeaturesData?.avg_mon_bal && commonFeaturesData?.avg_mon_bal}
            </div>
          </div>
          <div className='flex flex-col '>
            <div className=" text-neutral-800 break-words text-[15px] font-medium font-['Poppins'] leading-[18px] max-sm:text-[12px]">
              <h2 className='leading-[18px] text-neutral-800 text-[15px] font-medium font-[Poppins]'>
                Daily Transaction Limit Online{' '}
              </h2>
            </div>
            <div className="text-neutral-800 symbole-rupee text-[15px] font-normal font-['Poppins'] leading-relaxed">
              ₹ {commonFeaturesData?.daily_txn_limit_online && commonFeaturesData?.daily_txn_limit_online}
            </div>
          </div>

          {commonFeaturesData?.int_credit_cycle && (
            <>
              <div className='flex flex-col '>
                <div className=" text-neutral-800 break-words text-[15px] font-medium font-['Poppins'] leading-[18px] max-sm:text-[12px]">
                  <h2 className='leading-[18px] text-neutral-800 text-[15px] font-medium font-[Poppins]'>
                    Interest Credit Cycle{' '}
                  </h2>
                </div>
                <div className="text-neutral-800 symbole-rupee text-[15px] font-normal font-['Poppins'] leading-relaxed">
                  {commonFeaturesData?.int_credit_cycle}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default CommonFeaturesComp
