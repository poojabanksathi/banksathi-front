import ApplyNowButton from '@/core/component/common/ApplyNowButton/ApplyNowButton'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ReactStars from 'react-stars'

const TabletListing = ({
  Img_URL,
  cardsList,
  sendGAProductClick,
  starCount,
  userData,
  size,
  selectedData,
  logo,
  handleFeatureAccordion,
  handleWelcomAccordion,
  featureIndex,
  accordionArrowall,
  welcomeIndex,
  setCompareModal,
  handlecompareModal
}) => {
  return (
    <div>
      <div className='grid 2xl:grid-cols-4 my-8 xl:mt-8 xl:gap-2 xl:grid-cols-3 xl:gap-4 lg:grid-cols-3 lg:gap-2 md:grid-cols-2 md:mt-0 grid-cols-1 md:gap-8 sm:mt-4  sm:gap-[30px] gap-4 mt-4 max-[479px]:mt-0 lg:px-16 max-[479px]:gap-[30px]'>
        <>
          {cardsList?.length > 0 &&
            cardsList?.map((alldata, index) => {
              return (
                <div key={alldata?.product_id}>
                  <div className='pt-6 bg-white  rounded-3xl   h-full  filter-card-box duration-300 relative'>
                    <div className='flex mt-3 gap-3 !px-6 max-[768px]:!px-4 max-[280px]:!px-2 relative'>
                      <div className=''>
                        <div
                          onClick={() => sendGAProductClick(index, alldata)}
                          className='w-[130px] h-[130px] max-[771px]:w-[100px] max-[768px]:w-[120px] max-[425px]:w-[120px] max-[360px]:w-[100px] max-[320px]:!w-[84px] mobile-card-crdit'>
                          <Image
                            id={`${index}+'bank=14-img'`}
                            src={`${Img_URL}/${alldata?.product_image}`}
                            alt='card image'
                            width={120}
                            height={120}
                            className='xl:w-full md:w-full'
                            unoptimized={true}
                          />
                        </div>
                      </div>
                      <div className=' xl:w-[100%] '>
                        <div className=' grid grid-cols-1'>
                          <div className='text-[#212529]'>
                            <div onClick={() => sendGAProductClick(index, alldata)}>
                              <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                                <h2
                                  id={`${index}+'bank+name'`}
                                  className='text-[16px]  font-bold max-[991px]:text-[16px] text-[#212529] leading-7 pb-2'>
                                  {alldata?.card_name || alldata?.title}
                                </h2>
                              </Link>
                            </div>
                            <span
                              className='text-[14px] comparebox-card-text pb-3 text-[#212529]'
                              data-tooltip-target='tooltip-light'
                              data-tooltip-style='light'
                              data-te-toggle='tooltip'
                              title={`${alldata?.welcome_benefits.replace(/["']/g, ' ')}`}>
                              {alldata?.welcome_benefits.replace(/["']/g, ' ')}
                            </span>

                            <div className='flex items-center gap-2 mt-2 pt-6 max-[360px]:gap-1'>
                              <div className='border border-[#E6ECF1] rounded-full'>
                                <Image
                                  src={alldata?.logoimg || logo}
                                  alt='img'
                                  width={45}
                                  height={50}
                                  className=' border rounded-full p-2 w-[36px] h-[36px]'
                                />
                              </div>

                              <Link href='#' className='text-[#212529]' prefetch={false}>
                                <div className='border rounded-full py-1 px-4 flex gap-2 items-center  max-[771px]:px-2 max-[360px]:gap-1'>
                                  <p className='xl:text-[18px] lg:text-[14px] max-[768px]:text-[12px] font-semibold max-[479px]:text-[14px] text-[15px] text-[#212529] max-[280px]:text-[11px] '>
                                    {alldata?.rating}/5
                                  </p>
                                  <div className=''>
                                    <ReactStars
                                      count={starCount}
                                      value={alldata?.rating}
                                      // onChange={ratingChanged}
                                      size={14}
                                      edit={false}
                                      color1={'#ccc'}
                                      color2={'#49d49d'}
                                    />
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id={'save-aply-btn' + index} className='flex items-center gap-4 mt-6 px-4  max-[280px]:!px-2'>
                      <ApplyNowButton
                        data={alldata}
                        userData={userData}
                        category='credit cards'
                        pos='23'
                        position={index}
                        disabled={alldata?.bank_name === "KOTAK MAHINDRA BANK"}
                      />
                    </div>
                    <div className='py-5 px-4 border-b max-[280px]:!px-2'>
                      <label className='text-gray-500 font-bold flex items-center'>
                        <input
                          className='mr-2 leading-tight w-[16px] h-[16px]'
                          type='checkbox'
                          id={alldata?.product_id}
                          disabled={
                            size?.width <= 991
                              ? selectedData?.length >= 2 && !selectedData?.includes(alldata)
                              : selectedData?.length >= 3 && !selectedData?.includes(alldata)
                          }
                          onChange={(e) => {
                            setCompareModal(true)
                            handlecompareModal(e, alldata)
                          }}
                          checked={selectedData?.some(
                            (selectedItem) => selectedItem?.product_id === alldata?.product_id
                          )}
                        />
                        <p className='text-[15px] font-semibold  text-[#212529] '>Add to Compare</p>
                      </label>
                    </div>
                    <div className='px-4  py-6 border-b text-[#212529] max-[280px]:!px-2'>
                      <div className='pb-4'>
                        <p className='text-[13px] font-normal'>{ListingfilterData.fees}</p>
                        {alldata.annual_fee == 0 ? (
                          <p className='text-[15px] font-semibold pt-1'>Free</p>
                        ) : (
                          <p className='text-[15px] font-semibold pt-1 symbole-rupee'>
                            &#8377; {alldata.annual_fee} /-
                          </p>
                        )}
                      </div>
                      <div className='pb-4'>
                        <p className='text-[13px] font-normal'>{ListingfilterData.joiningfees}</p>
                        {alldata.joining_fee == 0 ? (
                          <p className='text-[15px] font-semibold pt-1'>Free</p>
                        ) : (
                          <p className='text-[15px] font-semibold pt-1 symbole-rupee'>
                            &#8377; {alldata.joining_fee} /-
                          </p>
                        )}
                      </div>
                      <div>
                        <p className='text-[13px] font-normal'>{ListingfilterData?.recommended}</p>
                        <div className='flex items-center gap-4'>
                          {alldata?.min_credit_score && alldata?.max_credit_score && (
                            <>
                              <p className='text-[15px] font-semibold pt-1'>{alldata?.min_credit_score}</p>
                            </>
                          )}
                          <div className='tooltip'>
                            {alldata?.min_credit_score && alldata?.max_credit_score && (
                              <>
                                <Image
                                  src={ListingfilterData?.helpimg}
                                  className='w-5 h-5'
                                  alt='img'
                                  width={20}
                                  height={20}
                                />
                                <span className='tooltiptext'>
                                  Having a credit score within or above the recommended range increases your likelihood
                                  of approval for various financial applications, but it does not provide an absolute
                                  guarantee.
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <Link
                          href='/cibil-credit-score-check'
                          className='text-[15px]  pt-3  !underline text-[#5a5add] hover:!text-[#5a5add]'
                          prefetch={false}>
                          Check free credit score
                        </Link>
                      </div>
                    </div>

                    <div
                      id='accordionExample'
                      data-active-classes='bg-none'
                      data-inactive-classes='text-[#212529]'
                      className='   '>
                      {alldata?.features && (
                        <div className=' px-3 relative   bg-white  duration-300 border-b'>
                          <h3 id='accordion-flush-heading-1 '>
                            <button
                              onClick={() => handleFeatureAccordion(index)}
                              type='button'
                              className='text-[#212529]  list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center justify-between w-full text-left'
                              data-accordion-target='#accordion-flush-body-1'
                              aria-expanded='true'
                              aria-controls='accordion-flush-body-1'>
                              {ListingfilterData.features}

                              {featureIndex?.includes(index) ? (
                                <Image
                                  src={accordionArrowall}
                                  alt='down'
                                  width={24}
                                  height={24}
                                  priority={true}
                                  className='rotate-180 w-6 h-6 shrink-0'
                                />
                              ) : (
                                <Image
                                  src={accordionArrowall}
                                  alt='down'
                                  width={24}
                                  height={24}
                                  priority={true}
                                  className='w-6 h-6 shrink-0'
                                />
                              )}
                            </button>
                          </h3>
                          {featureIndex?.includes(index) && (
                            <div aria-labelledby='accordion-flush-heading-1'>
                              <div className=' font-light border-0 border-b-0 border-t-0 border-gray-200 '>
                                <div
                                  className='list-disc  space-y-2 text-[14px] text-[#545454] product-list-data'
                                  dangerouslySetInnerHTML={{
                                    __html: `<div>${alldata?.features}</div>`
                                  }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {alldata?.welcome_offer && (
                        <div className=' px-3  rounded-2xl relative   bg-white  duration-300'>
                          <h3 id='accordion-flush-heading-1 '>
                            <button
                              onClick={() => handleWelcomAccordion(index)}
                              type='button'
                              className='text-[#212529] list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center justify-between w-full text-left'
                              data-accordion-target='#accordion-flush-body-1'
                              aria-expanded='true'
                              aria-controls='accordion-flush-body-1'>
                              {ListingfilterData.welcomeoffer}

                              {welcomeIndex?.includes(index) ? (
                                <Image
                                  src={accordionArrowall}
                                  alt='down'
                                  width={24}
                                  height={24}
                                  priority={true}
                                  className='rotate-180 w-6 h-6 shrink-0'
                                />
                              ) : (
                                <Image
                                  src={accordionArrowall}
                                  alt='down'
                                  width={24}
                                  height={24}
                                  priority={true}
                                  className='w-6 h-6 shrink-0'
                                />
                              )}
                            </button>
                          </h3>
                          {welcomeIndex?.includes(index) && (
                            <div aria-labelledby='accordion-flush-heading-1'>
                              <div className=' font-light border-0 border-b-0 border-t-0 border-gray-200 '>
                                <div
                                  className='list-disc space-y-2 text-[14px] text-[#545454] pb-2 product-list-data'
                                  dangerouslySetInnerHTML={{
                                    __html: `<div>${alldata?.welcome_offer}</div>`
                                  }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
        </>
      </div>
    </div>
  )
}

export default TabletListing
