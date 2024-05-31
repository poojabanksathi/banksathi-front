import { useWindowSize } from '@/hooks/useWindowSize'
import React, { useMemo } from 'react'

export const MobileCompareTable = ({ slug1, slug2, slug3, title }) => {
  const slugsArray = [slug1?.product_details, slug2?.product_details, slug3?.product_details]
  const getDebitCardRowsMobile = () => (
    <>
      <tr>
        <td className='border-b border-r border-slate-200 ... text-left py-4 px-4 space-y-1'>
          <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'> Insurance Coverage</h2>
          <p className=" text-neutral-800 text-xs font-normal font-['Poppins']"
            dangerouslySetInnerHTML={{
              __html: slugsArray?.[0]?.ins_cov ? slugsArray?.[0]?.ins_cov : ''
            }}
          ></p>
        </td>
        <td className='border-b border-slate-200 ... text-left py-4 px-4 space-y-1'>
          <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'> Insurance Coverage</h2>
          <p className=" text-neutral-800 text-xs font-normal font-['Poppins']"
            dangerouslySetInnerHTML={{
              __html: slugsArray?.[1]?.ins_cov ? slugsArray?.[1]?.ins_cov : ''
            }}
          ></p>
        </td>
      </tr>

      <tr>
        <td className='border-b border-r border-slate-200 ... text-left py-4 px-4 space-y-1'>
          <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'> International Usage</h2>
          <p className=" text-neutral-800 text-xs font-normal font-['Poppins']">
            {slugsArray?.[0] && slugsArray?.[0]?.international_usag}
          </p>
        </td>
        <td className='border-b border-slate-200 ... text-left py-4 px-4 space-y-1'>
          <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'> International Usage</h2>
          <p className=" text-neutral-800 text-xs font-normal font-['Poppins']">
            {slugsArray?.[0] && slugsArray?.[0]?.international_usag}
          </p>
        </td>
      </tr>
      <tr>
        <td className='border-b border-r border-slate-200 ... text-left py-4 px-4 space-y-1'>
          <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'>ATM Withdrawals (Free per month)</h2>

          <p className=" text-neutral-800 text-xs font-normal font-['Poppins'] symbole-rupee">
            {slugsArray?.[0]?.atm_with_limit_fpm && `₹ ${slugsArray?.[0]?.atm_with_limit_fpm}`}
          </p>
        </td>
        <td className='border-b  border-slate-200 ... text-left py-4 px-4 space-y-1'>
          <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'>ATM Withdrawals (Free per month)</h2>

          <p className=" text-neutral-800 text-xs font-normal font-['Poppins'] symbole-rupee">
            {slugsArray?.[1]?.atm_with_limit_fpm && `₹ ${slugsArray?.[1]?.atm_with_limit_fpm}`}
          </p>
        </td>
      </tr>
      <tr>
        <td className='border-b border-r border-slate-200 ... text-left py-4 px-4 space-y-1'>
          <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'> Zero Liability Protection</h2>
          <p className=" text-neutral-800 text-xs font-normal font-['Poppins']"
            dangerouslySetInnerHTML={{
              __html: slugsArray?.[0]?.zero_lib_protection ? slugsArray?.[0]?.zero_lib_protection : ''
            }}
          ></p>
        </td>
        <td className='border-b border-slate-200 ... text-left py-4 px-4 space-y-1'>
          <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'> Zero Liability Protection</h2>
          <p className=" text-neutral-800 text-xs font-normal font-['Poppins']"
            dangerouslySetInnerHTML={{
              __html: slugsArray?.[1]?.zero_lib_protection ? slugsArray?.[1]?.zero_lib_protection : ''
            }}
          ></p>
        </td>
      </tr>

      <tr>
        <td className='border-b border-r border-slate-200 ... text-left py-4 px-4 space-y-1'>
          <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'> Card Replacement Fee</h2>
          <p className=" text-neutral-800 text-xs font-normal font-['Poppins']">
            {slugsArray?.[0]?.card_rep_fee || ''}
          </p>
        </td>
        <td className='border-b  border-slate-200 ... text-left py-4 px-4 space-y-1'>
          <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'> Card Replacement Fee</h2>
          <p className=" text-neutral-800 text-xs font-normal font-['Poppins']">
            {slugsArray?.[1]?.card_rep_fee || ''}
          </p>
        </td>
      </tr>

      <tr>
        <td className='border-b border-r border-slate-200 ... text-left py-4 px-4 space-y-1'>
          <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'>Personal Accidental Insurance Cover</h2>
          <p className=" text-neutral-800 text-xs font-normal font-['Poppins']"
            dangerouslySetInnerHTML={{
              __html: slugsArray?.[0]?.personal_acci_cover ? slugsArray?.[0]?.personal_acci_cover : ''
            }}
          ></p>
        </td>
        <td className='border-b border-slate-200 ... text-left py-4 px-4 space-y-1'>
          <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'>Personal Accidental Insurance Cover</h2>
          <p className=" text-neutral-800 text-xs font-normal font-['Poppins']"
            dangerouslySetInnerHTML={{
              __html: slugsArray?.[1]?.personal_acci_cover ? slugsArray?.[1]?.personal_acci_cover : ''
            }}
          ></p>
        </td>
      </tr>
      <tr>
        <td className='border-b border-r border-slate-200 ... text-left py-4 px-4 space-y-1'>
          <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'>Air Accidental Insurance Cover</h2>
          <p className=" text-neutral-800 text-xs font-normal font-['Poppins']"
            dangerouslySetInnerHTML={{
              __html: slugsArray?.[0]?.air_acc_ins_cover ? slugsArray?.[0]?.air_acc_ins_cover : ''
            }}
          ></p>
        </td>
        <td className='border-b border-slate-200 ... text-left py-4 px-4 space-y-1'>
          <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'>Air Accidental Insurance Cover</h2>
          <p className=" text-neutral-800 text-xs font-normal font-['Poppins']"
            dangerouslySetInnerHTML={{
              __html: slugsArray?.[1]?.air_acc_ins_cover ? slugsArray?.[1]?.air_acc_ins_cover : ''
            }}
          ></p>
        </td>
      </tr>

    </>
  )
  return (
    <div className=' container mx-auto      max-sm:px-0  '>
      <table className='border-collapse border-0 w-full bg-white   ...'>
        <thead>
          <tr>
            {slugsArray?.[0]?.best_of && (
              <th className='border-b border-r border-slate-200 text-left py-4 px-4 space-y-1'>
                <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins] '>Best for Category</h2>
                <p className=" text-neutral-800 text-xs font-normal font-['Poppins']  ">{slugsArray?.[0]?.best_of}</p>
              </th>
            )}
            {slugsArray?.[1]?.best_of && (
              <th className='border-b border-r border-slate-200 text-left py-4 px-4 space-y-1'>
                <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins] '>Best for Category</h2>
                <p className=" text-neutral-800 text-xs font-normal font-['Poppins']  ">{slugsArray?.[1]?.best_of}</p>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {title === 'Bank Features' ? (
            <>
              <tr>
                <td className='border-b border-r border-slate-200 ... text-left py-4 px-4 space-y-1'>
                  <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'>APR (%)</h2>
                  <p className=" text-neutral-800 text-xs font-normal font-['Poppins']">
                    {slugsArray?.[0] && slugsArray?.[0]?.rate_of_interest}
                  </p>
                </td>
                <td className='border-b border-slate-200 ... text-left py-4 px-4 space-y-1'>
                  <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'>APR (%)</h2>

                  <p className=" text-neutral-800 text-xs font-normal font-['Poppins']">
                    {slugsArray?.[1] && slugsArray?.[1]?.rate_of_interest}
                  </p>
                </td>
              </tr>
              <tr>
                <td className='border-b border-r border-slate-200 ... text-left py-4 px-4 space-y-1'>
                  <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'>Interest Credit Cycle</h2>
                  {slugsArray?.[0] && slugsArray?.[0]?.int_credit_cycle}

                  <p className=" text-neutral-800 text-xs font-normal font-['Poppins']"></p>
                </td>
                <td className='border-b border-slate-200 ... text-left py-4 px-4 space-y-1'>
                  <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'>Interest Credit Cycle</h2>

                  <p className=" text-neutral-800 text-xs font-normal font-['Poppins']">
                    {slugsArray?.[1] && slugsArray?.[1]?.int_credit_cycle}
                  </p>
                </td>
              </tr>
              <tr>
                <td className='border-b border-r border-slate-200 ... text-left py-4 px-4 space-y-1'>
                  <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'>
                    Minimum Balance to Open Account
                  </h2>

                  <p className=" text-neutral-800 text-xs font-normal font-['Poppins'] symbole-rupee">
                    {slugsArray?.[0] && `₹ ${slugsArray?.[0]?.min_bal_to_open_ac}`}
                  </p>
                </td>
                <td className='border-b  border-slate-200 ... text-left py-4 px-4 space-y-1'>
                  <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'>
                    Minimum Balance to Open Account
                  </h2>
                  <p className=" text-neutral-800 text-xs font-normal font-['Poppins'] symbole-rupee">
                    {slugsArray?.[1] && `₹ ${slugsArray?.[1]?.min_bal_to_open_ac}`}
                  </p>
                </td>
              </tr>
              <tr>
                <td className='border-b border-r border-slate-200 ... text-left py-4 px-4 space-y-1'>
                  <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'>Welcome Offer</h2>

                  <p className=" text-neutral-800 text-xs font-normal font-['Poppins']">
                    {slugsArray?.[0] && slugsArray?.[0]?.welcome_offer}
                  </p>
                </td>
                <td className='border-b  border-slate-200 ... text-left py-4 px-4 space-y-1'>
                  <h2 className='text-neutral-800 text-xs font-semibold font-[Poppins]'>Welcome Offer</h2>

                  <p
                    className="text-neutral-800 text-xs font-normal font-['Poppins']"
                    dangerouslySetInnerHTML={{
                      __html: slugsArray?.[1] && slugsArray?.[1]?.welcome_offer ? slugsArray[1].welcome_offer : ''
                    }}
                  >
                  </p>
                </td>
              </tr>
            </>
          ) : (
            getDebitCardRowsMobile()
          )}
        </tbody>
      </table>
    </div>
  )
}
const CompareTable = ({ slug1, slug2, slug3, title }) => {
  const size = useWindowSize()

  const windowSize = useMemo(() => {
    return size?.width
  }, [size?.width])

  const isDesktop = windowSize > 768

  const slugsArray = [slug1?.product_details, slug2?.product_details, slug3?.product_details]

  const getDebitCardRows = () => {
    return (
      <>
        {slugsArray?.[0]?.ins_cov || slugsArray?.[1]?.ins_cov || slugsArray?.[2]?.ins_cov ? (
          <tr>
            <td className='border-b border-r p-4 border-slate-200 text-neutral-800 text-[13px] font-semibold font-[poppins] w-[21vw]'>
              Insurance Coverage
            </td>
            <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins] w-[20vw]'
              dangerouslySetInnerHTML={{
                __html: slugsArray?.[0] && slugsArray?.[0]?.ins_cov ? slugsArray?.[0]?.ins_cov : ''
              }}
            ></td>

            <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins] w-[20vw]'
              dangerouslySetInnerHTML={{
                __html: slugsArray?.[1] && slugsArray?.[1]?.ins_cov ? slugsArray?.[1]?.ins_cov : ''
              }}
            ></td>

            <td className='border-b p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins] w-[22vw]'
              dangerouslySetInnerHTML={{
                __html: slugsArray?.[2] && slugsArray?.[2]?.ins_cov ? slugsArray?.[2]?.ins_cov : ''
              }}
            ></td>

          </tr>
        ) : (
          ''
        )}

        <tr>
          <td className='border-b border-r p-4 border-slate-200 text-neutral-800 text-[13px] font-semibold font-[poppins] w-[21vw]'>
            International Usage
          </td>
          <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins] w-[20vw]'>
            {slugsArray?.[0]?.international_usag && slugsArray?.[0]?.international_usag}
          </td>
          <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins] w-[20vw]'>
            {slugsArray?.[1]?.international_usag && slugsArray?.[1]?.international_usag}
          </td>
          <td className='border-b p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]  w-[22vw]'>
            {slugsArray?.[2]?.international_usag && slugsArray?.[2]?.international_usag}
          </td>
        </tr>
        <tr>
          <td className='border-b border-r p-4 border-slate-200 text-neutral-800 text-[13px] font-semibold font-[poppins] w-[21vw]'>
            ATM Withdrawals (Free per month)
          </td>
          <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'>
            {slugsArray?.[0]?.atm_with_limit_fpm && `₹ ${slugsArray?.[0]?.atm_with_limit_fpm}`}
          </td>
          <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'>
            {slugsArray?.[1]?.atm_with_limit_fpm && `₹ ${slugsArray?.[1]?.atm_with_limit_fpm}`}
          </td>
          <td className='border-b p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'>
            {slugsArray?.[2]?.atm_with_limit_fpm && `₹ ${slugsArray?.[2]?.atm_with_limit_fpm}`}
          </td>
        </tr>
        {slugsArray?.[0]?.zero_lib_protection ||
          slugsArray?.[0]?.zero_lib_protection ||
          slugsArray?.[0]?.zero_lib_protection ? (
          <tr>
            <td className='border-b border-r p-4 border-slate-200 text-neutral-800 text-[13px] font-semibold font-[poppins] w-[21vw]'>
              Zero Liability Protection
            </td>
            <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'
              dangerouslySetInnerHTML={{
                __html: slugsArray?.[0]?.zero_lib_protection ? slugsArray?.[0]?.zero_lib_protection : ''
              }}
            ></td>

            <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'
              dangerouslySetInnerHTML={{
                __html: slugsArray?.[1]?.zero_lib_protection ? slugsArray?.[1]?.zero_lib_protection : ''
              }}
            ></td>

            <td className='border-b p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'
              dangerouslySetInnerHTML={{
                __html: slugsArray?.[2]?.zero_lib_protection ? slugsArray?.[2]?.zero_lib_protection : ''
              }}
            ></td>

          </tr>
        ) : (
          ''
        )}
        <tr>
          <td className='border-b border-r p-4 border-slate-200 text-neutral-800 text-[13px] font-semibold font-[poppins] w-[21vw]'>
            Card Replacement Fee
          </td>
          <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'>
            {slugsArray?.[0]?.card_rep_fee || ''}
          </td>
          <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'>
            {slugsArray?.[1]?.card_rep_fee || ''}
          </td>
          <td className='border-b p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'>
            {slugsArray?.[2]?.card_rep_fee || ''}
          </td>
        </tr>
        <tr>
          <td className='border-b border-r p-4 border-slate-200 text-neutral-800 text-[13px] font-semibold font-[poppins] w-[21vw]'>
            Personal Accidental Insurance Cover
          </td>
          <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'
            dangerouslySetInnerHTML={{
              __html: slugsArray?.[0]?.personal_acci_cover ? slugsArray?.[0]?.personal_acci_cover : ''
            }}
          ></td>

          <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'
            dangerouslySetInnerHTML={{
              __html: slugsArray?.[1]?.personal_acci_cover ? slugsArray?.[1]?.personal_acci_cover : ''
            }}
          ></td>

          <td className='border-b p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'
            dangerouslySetInnerHTML={{
              __html: slugsArray?.[2]?.personal_acci_cover ? slugsArray?.[2]?.personal_acci_cover : ''
            }}
          ></td>

        </tr>
        <tr>
          <td className='border-b border-r p-4 border-slate-200 text-neutral-800 text-[13px] font-semibold font-[poppins] w-[21vw]'>
            Air Accidental Insurance Cover
          </td>
          <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'
            dangerouslySetInnerHTML={{
              __html: slugsArray?.[0]?.air_acc_ins_cover ? slugsArray?.[0]?.air_acc_ins_cover : ''
            }}
          ></td>

          <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'
            dangerouslySetInnerHTML={{
              __html: slugsArray?.[1]?.air_acc_ins_cover ? slugsArray?.[1]?.air_acc_ins_cover : ''
            }}
          ></td>

          <td className='border-b p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'
            dangerouslySetInnerHTML={{
              __html: slugsArray?.[2]?.air_acc_ins_cover ? slugsArray?.[2]?.air_acc_ins_cover : ''
            }}
          ></td>

        </tr>
      </>
    )
  }

  return (
    <div className=' container mx-auto     max-[991px]:max-w-full max-[479px]:px-4 max-[375px]:px-4  max-[320px]:px-4 '>
      <div>
        <h2 className="text-neutral-800 pl-[24px]  bg-slate-50 text-[15px] font-semibold font-['Poppins'] uppercase max-sm:text-center max-sm:text-[12px]">
          {title}
        </h2>
        {isDesktop ? (
          <div className=''>
            <table className='border-collapse border-0 bg-white w-full'>
              <thead className=''>
                {title === 'Bank Features' ? (
                  <tr>
                    <th className='border-b border-r p-4 text-left border-slate-200 text-neutral-800 text-[13px] font-semibold font-[poppins] w-[26%]'>
                      Best for Category
                    </th>
                    <th className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'>
                      {slugsArray?.[0]?.best_of || ''}
                    </th>
                    <th className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'>
                      {slugsArray?.[1]?.best_of || ''}
                    </th>
                    <th className='border-b  p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins'>
                      {slugsArray?.[2]?.best_of || ''}
                    </th>
                  </tr>
                ) : (
                  ''
                )}
              </thead>
              <tbody>
                {title === 'Bank Features' ? (
                  <>
                    <tr>
                      <td className='border-b border-r p-4 border-slate-200 text-neutral-800 text-[13px] font-semibold font-[poppins] w-[20vw]'>
                        APR (%)
                      </td>
                      <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]  w-[20vw]'>
                        {slugsArray?.[0] && slugsArray?.[0]?.rate_of_interest}
                      </td>
                      <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]  w-[20vw]'>
                        {slugsArray?.[1] && slugsArray?.[1]?.rate_of_interest}
                      </td>
                      <td className='border-b p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]  w-[20vw]'>
                        {slugsArray?.[2] && slugsArray?.[2]?.rate_of_interest}
                      </td>
                    </tr>
                    <tr>
                      <td className='border-b border-r p-4 border-slate-200 text-neutral-800 text-[13px] font-semibold font-[poppins] w-[21vw]'>
                        Interest Credit Cycle
                      </td>
                      <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'>
                        {slugsArray?.[0] && slugsArray?.[0]?.int_credit_cycle}
                      </td>
                      <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'>
                        {slugsArray?.[1] && slugsArray?.[1]?.int_credit_cycle}
                      </td>
                      <td className='border-b p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'>
                        {slugsArray?.[2] && slugsArray?.[2]?.int_credit_cycle}
                      </td>
                    </tr>
                    <tr>
                      <td className='border-b border-r p-4 border-slate-200 text-neutral-800 text-[13px] font-semibold font-[poppins] w-[21vw]'>
                        Minimum Balance to Open Account
                      </td>
                      <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins] symbole-rupee'>
                        {slugsArray?.[0]?.min_bal_to_open_ac && `₹ ${slugsArray?.[0]?.min_bal_to_open_ac}`}
                      </td>
                      <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins] symbole-rupee'>
                        {slugsArray?.[1]?.min_bal_to_open_ac && `₹ ${slugsArray?.[1]?.min_bal_to_open_ac}`}
                      </td>
                      <td className='border-b p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins] symbole-rupee'>
                        {slugsArray?.[2]?.min_bal_to_open_ac && `₹ ${slugsArray?.[2]?.min_bal_to_open_ac}`}
                      </td>
                    </tr>
                    <tr>
                      <td className='border-b border-r p-4 border-slate-200 text-neutral-800 text-[13px] font-semibold font-[poppins] w-[21vw]'>
                        Average Monthly/Quarterly Balance
                      </td>
                      <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins] symbole-rupee'>
                        {slugsArray?.[0]?.avg_mon_bal && `₹ ${slugsArray?.[0]?.avg_mon_bal}`}
                      </td>
                      <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins] symbole-rupee'>
                        {slugsArray?.[1]?.avg_mon_bal && `₹ ${slugsArray?.[1]?.avg_mon_bal}`}
                      </td>
                      <td className='border-b p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins] symbole-rupee'>
                        {slugsArray?.[2]?.avg_mon_bal && `₹ ${slugsArray?.[2]?.avg_mon_bal}`}
                      </td>
                    </tr>
                    <tr>
                      <td className='border-b border-r p-4 border-slate-200 text-neutral-800 text-[13px] font-semibold font-[poppins] w-[21vw]'>
                        Welcome Offer
                      </td>
                      <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'
                        dangerouslySetInnerHTML={{
                          __html: slugsArray?.[0]?.welcome_offer ? slugsArray?.[0]?.welcome_offer : ''
                        }}
                      ></td>
                      <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'
                        dangerouslySetInnerHTML={{
                          __html: slugsArray?.[1]?.welcome_offer ? slugsArray?.[1]?.welcome_offer : ''
                        }}
                      ></td>
                      <td className='border-b p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'
                        dangerouslySetInnerHTML={{
                          __html: slugsArray?.[2]?.welcome_offer ? slugsArray?.[2]?.welcome_offer : ''
                        }}
                      ></td>

                    </tr>
                    {/* <tr>
                    <td className='border-b border-r p-4 border-slate-200 text-neutral-800 text-[13px] font-semibold font-[poppins] w-[21vw]'>
                      Personal Accidental Insurance Cover
                    </td>
                    <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'>
                      {slugsArray?.[0] && slugsArray?.[0]?.personal_acci_cover}
                    </td>
                    <td className='border-b border-r p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'>
                      {slugsArray?.[1] && slugsArray?.[1]?.personal_acci_cover}
                    </td>
                    <td className='border-b p-4 border-slate-200 text-center text-neutral-800 text-[15px] font-normal font-[Poppins]'>
                      {slugsArray?.[2] && slugsArray?.[2]?.personal_acci_cover}
                    </td>
                  </tr> */}
                  </>
                ) : (
                  getDebitCardRows()
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <MobileCompareTable slug1={slug1} slug2={slug2} slug3={slug3} title={title} />
        )}
      </div>


      {/* mobile
       */}



    </div>
  )
}

export default CompareTable
