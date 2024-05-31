import React, { useState } from 'react'
import accordionArrowall from '../../../../public/assets/accordion-down.svg'
import Image from 'next/image'
import Head from 'next/head'

export default function FAQ({ faqdata, SelectSupportTabs }) {
  const [isActive, setIsActive] = useState(false)
  const [SelectIndex, setSelectIndex] = useState(null)
  const [indexData, setIndexData] = useState([])
  const handleClick = (index) => {
    setIsActive(!isActive)
    setSelectIndex(index)
    setIndexData(index)
  }
  const regex = /(<([^>]+)>)/gi

  function addFaqJsonLd() {
    const faqJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: []
    }

    if (faqdata && faqdata.question_answer?.length > 0) {
      faqdata.question_answer.forEach((faqItem, index) => {
        const questionAnswerItem = {
          '@type': 'Question',
          name: faqItem?.question,

          acceptedAnswer: {
            '@type': 'Answer',
            text: faqItem?.answer?.replace(regex, '')
          }
        }

        faqJsonLd.mainEntity.push(questionAnswerItem)
      })
    }
    const jsonFAQString = JSON.stringify(faqJsonLd)

    return {
      __html: jsonFAQString
    }
  }
  const faqJson = addFaqJsonLd()

  return (
    <>
      {faqdata && faqdata?.question_answer?.length > 0 && (
        <Head>
          <script type='application/ld+json' key='app-ld-json' dangerouslySetInnerHTML={faqJson} />
        </Head>
      )}
      {faqdata?.question_answer?.length > 0 && (
        <div
          className={`container pb-[100px] mx-auto max-[1024px]:px-8  max-[991px]:max-w-full ${
            SelectSupportTabs === 0 ? 'max-[1024px]:!px-0 max-[479px]:!px-4' : ''
          } max-[479px]:px-4 max-[479px]:py-[30px] max-[375px]:px-4 max-[320px]:px-4 faq-resolution`}>
          {SelectSupportTabs === 0 ? (
            ''
          ) : (
            <div>
              <h2 className='head-text font-[faktum] text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[head-text font-[faktum] text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[28px] max-[375px]:text-[24px] max-[320px]:text-[22px] text-center font-semibold pb-[30px] text-[#212529] max-[576px]:leading-10] max-[375px]:text-[24px] max-[320px]:text-[22px] text-center font-semibold pb-[30px] text-[#212529] max-[576px]:leading-10'>
                FAQs
              </h2>
            </div>
          )}
          <div
            id='accordion-flush text-left'
            className={`${
              SelectSupportTabs === 0 ? 'w-full' : 'w-[78%]'
            } mx-auto max-[1440px]:w-[90%] max-[1200px]:w-full`}>
            {faqdata?.question_answer?.length > 0 &&
              faqdata?.question_answer
                ?.sort((a, b) => a - b)
                .map((faqdata, index) => {
                  return (
                    <div
                      key={index}
                      className={`bg-white rounded-xl duration-300 py-6 px-7 relative shadow-lg mb-2  faq-box max-[479px]:px-4 ${
                        SelectIndex == index ? 'shadow-lg' : 'shadow-none'
                      }`}>
                      <div id='accordion-flush-heading-1 '>
                        <button
                          onClick={() => handleClick(index)}
                          type='button'
                          className={`${
                            indexData === index
                              ? '!text-[#844FCF] cursor-pointer list-none font-semibold relative text-[18px] max-[375px]:text-[16px]   faq-quation-title flex items-center justify-between w-full text-left '
                              : 'text-[#212529] cursor-pointer list-none font-semibold relative text-[18px] max-[375px]:text-[16px]  faq-quation-title flex items-center justify-between w-full text-left'
                          }`}
                          data-accordion-target='#accordion-flush-body-1'
                          aria-expanded='true'
                          aria-controls='accordion-flush-body-1'>
                          <div
                            className='list-disc  space-y-2 text-[14px] faq-data-box'
                            dangerouslySetInnerHTML={{
                              __html: `<h3>${faqdata.question}</h3>`
                            }}></div>

                          {indexData === index ? (
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
                      </div>
                      {indexData === index && (
                        <div aria-labelledby='accordion-flush-heading-1'>
                          <div
                            className='text-[15px] pt-5 text-[#212529] faq-answer-list'
                            dangerouslySetInnerHTML={{
                              __html: `${faqdata.answer}`
                            }}></div>
                        </div>
                      )}
                    </div>
                  )
                })}
          </div>
        </div>
      )}
    </>
  )
}
