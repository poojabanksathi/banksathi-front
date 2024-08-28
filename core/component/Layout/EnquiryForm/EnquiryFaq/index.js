import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'


const faqdata = {

  question_answer: [
    {
      question: "Who is a BankSathi Influencer?",
      answer: "A BankSathi Influencer is a content creator who recommends financial products to their audience via social media. ",
      display_sequence: 1,
    },
    {
      question: "How can I monetise my content?",
      answer: "Earn by sharing product URLs or affiliate links on social media. Your content may also be surfaced to BankSathi users, allowing you to grow your followers and earn from new customers.",
      display_sequence: 2,
    },
    {
      question: "How do I qualify for this programme?",
      answer: "We accept applications from influencers with accounts on YouTube, Instagram, and Facebook. Instagram or Facebook accounts must be business accounts. We review your application based on follower count and engagement metrics.",
      display_sequence: 3,
    },
    {
      question: "How much will I earn?",
      answer: "Start earning commissions when your followers make qualifying referrals through your links. Earnings are based on the financial products sold. Commission rates are available here and in your reports.",
      display_sequence: 4,
    },
  ]
}
function EnquiryFaq() {



  return (
    <div className='pt-10'>

      <div className='bg-[#F4F8FB] text-[#212529] h-full'>
        <div className='container mx-auto max-[991px]:max-w-full 2xl:px-40 2xl:py-6 xl:py-30 xl:px-24 lg:px-20 md:px-16 sm:px-8 px-4 py-8 max-[576px]:text-center'>
          <h2 className='head-text  max-[576px]:text-center text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[28px] text-center  max-[576px]:leading-10] max-[375px]:text-[24px] max-[320px]:text-[22px] font-semibold pb-[30px] text-[#212529] max-[576px]:leading-10'>
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {faqdata.question_answer.map((item, index) => (
              <div key={index} className=" p-4">
                <div className="faq-item">
                  <h3 className="font-bold text-lg mb-2">{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default EnquiryFaq
