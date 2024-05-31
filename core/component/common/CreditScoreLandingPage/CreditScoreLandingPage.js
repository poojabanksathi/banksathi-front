import React, { useMemo } from 'react'
import logoSticky from '../../../../public/assets/logo-sticky.svg'
import mobileLogo from '../../../../public/assets/mobile-logo-sticky.svg'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import calendar from '../../../../public/assets/calendarImage.svg'
import reportAnalysis from '../../../../public/assets/reportAnalysis.svg'
import improveScore from '../../../../public/assets/improvingCreditScore.svg'
import preApprovedOffers from '../../../../public/assets/preapprovedOffers.svg'
import { useWindowSize } from '@/hooks/useWindowSize'

const CreditScoreBanner = dynamic(() => import('../../Layout/CreditScore/CreditScoreBanner/CreditScoreBanner'), {
  ssr: false
})
const CreditScoreLandingPage = () => {
  const size = useWindowSize()

  const width = useMemo(() => {
    return size?.width
  }, [size])

  const creditScoreFeatures = [
    {
      id: '1',
      title: 'Regular Credit Report updates',
      image: calendar
    },
    { id: '2', title: 'In-depth Report Analysis', image: reportAnalysis },
    {
      id: '3',
      title: 'Expert guidance to improve score',
      image: improveScore,
      increaseGap: true
    },
    { id: '4', title: 'Best Offers in the market', image: preApprovedOffers }
  ]
  const metaResponseBanner = {
    paragraph:
      "Credit scores, ranging from 300 to 900, represent an individual's creditworthiness based on their credit history. A higher score increases the chances of securing the best credit card offers and favorable loan terms. Banksathi provides a platform where users can check their credit scores for free, ensuring insights into their financial health. By understanding one's score, they can pursue the best credit card tailored to their profile. It's crucial to monitor one's score regularly, as responsible financial behavior can lead to improvements. Checking it on Banksathi doesn't negatively impact the score, promoting informed financial decisions.",
    long_form_content:
      '<h2>What is Credit Score - Everything you need to Know&nbsp;</h2>\r\n\r\n<p style="text-align:justify">Your credit score is a three-digit number that reflects your creditworthiness. It&#39;s influenced by factors like payment history, credit utilization, credit mix, and length of credit history. A good score can unlock better loan terms and financial opportunities, while a poor score may limit your borrowing options. Regularly monitoring and maintaining your credit score is crucial for your financial well-being.</p>\r\n\r\n<h2 style="text-align:justify">Steps To Get Your Free Cibil Score</h2>\r\n\r\n<p style="text-align:justify">To get your free credit score simply follow these steps:</p>\r\n\r\n<ol>\r\n\t<li style="text-align:justify">Visit the Banksathi website.</li>\r\n\t<li style="text-align:justify">Navigate to the &quot;Credit Score&quot; section within the platform.</li>\r\n\t<li style="text-align:justify">Provide the necessary personal information.</li>\r\n\t<li style="text-align:justify">Verify with OTP.</li>\r\n\t<li style="text-align:justify">Now you will be able to access your free credit score instantly.</li>\r\n</ol>\r\n\r\n<p style="text-align:justify">By following these steps, you can easily obtain your free credit score through Banksathi and gain valuable insights into your creditworthiness.</p>\r\n\r\n<h2>Understanding Credit Scores in India</h2>\r\n\r\n<p style="text-align:justify">In India, credit scores typically range from 300 to 900. It is essential to strive for a higher credit score, as it improves your chances of securing favorable deals on personal loans and credit cards. By taking proactive steps to enhance your credit score, you can position yourself for better financial opportunities and enjoy the benefits of favourable lending terms. Aim for a credit score closer to 900 to maximize your potential for obtaining competitive offers and unlocking greater financial flexibility.</p>\r\n\r\n<h2>The Process of Calculating Credit Scores</h2>\r\n\r\n<p style="text-align:justify">Credit scores in India are computed by four authorized credit information companies licensed by the Reserve Bank of India (RBI): TransUnion CIBIL Limited, Experian, CRIF High Mark, and Equifax.</p>\r\n\r\n<p style="text-align:justify">When you engage in a transaction relevant to determining your credit score, banks share the details with all four credit bureaus. This ensures that the Credit Information Companies have accurate and updated information about your financial habits. Regardless of which bureau a bank approaches to check your online credit score, the score will be the same across all bureaus. Each bureau holds equal authority and stands on par with the others.</p>\r\n\r\n<p style="text-align:justify">Upon receiving information from banks, the credit bureaus gather additional data on your financial behaviour from other banks and financial institutions. They then process this information to create a comprehensive Credit Report, which serves as the basis for determining your credit score.</p>\r\n\r\n<h2>How To Improve Your Credit Score</h2>\r\n\r\n<p style="text-align:justify">Improving your credit score, often referred to as your CIBIL Score in India, is crucial for financial flexibility and low-interest borrowing options. Here&#39;s how you can work on boosting it.</p>\r\n\r\n<p style="text-align:justify"><strong>Review your credit report:</strong> Obtain your credit report, including your CIBIL Score, from a reliable agency. Scrutinise the report for any errors and dispute inaccuracies, as these can bring down your score.</p>\r\n\r\n<p style="text-align:justify"><strong>Timely bill payments:</strong> Consistently paying bills on time is essential for a good credit score. Late payments can adversely affect your CIBIL Score, so set up reminders or automate payments to avoid this.</p>\r\n\r\n<p style="text-align:justify"><strong>Manage outstanding debt: </strong>Work on reducing your existing debt. Regularly making payments and keeping credit card balances low can positively influence your score.</p>\r\n\r\n<p style="text-align:justify"><strong>Raise your credit limit:</strong> Increasing your credit limit can help lower your credit utilization ratio, thereby improving your CIBIL Score. However, don&#39;t utilize the extra credit to accumulate more debt.</p>\r\n\r\n<p style="text-align:justify"><strong>Diversify credit types: </strong>A mix of different kinds of credit, such as credit cards, retail accounts, and loans, can benefit your score. However, don&rsquo;t open too many accounts in a short period, as this can be detrimental.</p>\r\n\r\n<p style="text-align:justify"><strong>Retain old accounts: </strong>The length of your credit history affects your CIBIL Score. Closing old accounts can make your credit history appear shorter and potentially lower your score.</p>\r\n\r\n<p style="text-align:justify"><strong>Be selective with new credit:</strong> Each new credit application triggers a hard inquiry, which can slightly lower your score. Only apply for new credit when absolutely necessary.</p>\r\n\r\n<p style="text-align:justify">Improvement won&#39;t happen instantly, but consistent, responsible financial behavior can significantly boost your CIBIL Score over time.</p>\r\n\r\n<h2>Why Checking Your Credit Score Matters</h2>\r\n\r\n<p style="text-align:justify">Checking your credit score is essential for several reasons. It provides valuable insights into your financial health and helps you make informed decisions regarding loans, credit cards, and other financial matters. By monitoring your credit score regularly, you can identify and rectify any errors or discrepancies that may negatively impact your creditworthiness. Additionally, a good <a href="https://www.banksathi.com/credit-score">credit score</a> increases your chances of obtaining favourable interest rates and loan terms, saving you money in the long run. Taking control of your credit score empowers you to proactively manage your finances and work towards achieving your financial goals.</p>\r\n\r\n<h2>Checking CIBIL Score For Free</h2>\r\n\r\n<p style="text-align:justify">Checking your CIBIL score for free is an easy process that provides crucial insights into your financial health. Credit Information Bureau (India) Limited (CIBIL) is one of the four Reserve Bank of India-licensed credit information companies, along with CRIF Highmark, Experian, and Equifax. A good CIBIL score, ranging from 300 to 900, can significantly enhance your chances of loan approval and may also help you secure better interest rates. To check your <strong>CIBIL score for free</strong>, visit the official CIBIL website and register by providing necessary personal details like your name, phone number, and PAN card number. After verification, you can access your score and accompanying report. Importantly, you can check your CIBIL score for free once a year. Regularly reviewing your credit score ensures that you catch any discrepancies early, maintain good financial habits, and stay eligible for future credit. Overall, it&#39;s a vital step in managing your finances wisely.</p>\r\n\r\n<p style="text-align:justify"><a href="https://www.banksathi.com/credit-cards/eligibility">Check Credit Card Eligibility in 2 Minutes</a></p>\r\n\r\n<h2>How Credit Inquiries Affect Your Credit Score</h2>\r\n\r\n<p style="text-align:justify">Credit inquiries, often misunderstood, have distinct impacts on your credit score. There are two main types of inquiries: soft and hard. Here&#39;s how they differ in their effect on your credit score:</p>\r\n\r\n<h3 style="text-align:justify">Soft Inquiries: No Impact on Credit Score</h3>\r\n\r\n<p style="text-align:justify">Soft inquiries occur when checking your own credit score or when lenders do pre-approval checks. These inquiries are not linked to a specific application for new credit and, therefore, do not affect your credit score.</p>\r\n\r\n<h3 style="text-align:justify">Hard Inquiries: Can Lower Credit Score</h3>\r\n\r\n<p style="text-align:justify">Hard inquiries happen when you apply for new credit, like loans or credit cards. These are recorded on your credit report and can lower your credit score slightly. Typically, a single hard inquiry might reduce your score by 5-10 points. However, the impact can be greater if you have few accounts or a short credit history. Remember, the effect is temporary and part of only 10% of your credit score calculation.</p>\r\n\r\n<p style="text-align:justify">Understanding these distinctions is vital for effectively managing your credit health. While soft inquiries are a harmless part of credit reviews, hard inquiries, especially if frequent or numerous, can signal to lenders potential financial distress or attempts to acquire significant new credit.</p>\r\n\r\n<h2>The Reason Behind BankSathi Offering Free Credit Scores</h2>\r\n\r\n<p style="text-align:justify">BankSathi is providing free credit scores to empower individuals with financial knowledge and awareness. We believe that everyone deserves access to their credit information without any cost or barriers. By offering free credit scores, we aim to help individuals make informed financial decisions, improve their creditworthiness, and achieve their financial goals. We value the importance of financial well-being and are committed to providing a transparent and inclusive platform that enables individuals to take control of their credit health. BankSathi is here to support you on your journey toward financial success, and providing free credit scores is just one way we fulfill that commitment.</p>'
  }
  return (
    <>
      <div className='bg-[#ffff] h-full'>
        <div className='shadow-md'>
          <div className=' bg-[#ffff] h-[52px] flex justify-start items-center gap-[8px]  w-full'>
            {width > 768 ? (
              <Image src={logoSticky} height={42} width={185} alt='img_text' className='xl:mx-[5rem]' />
            ) : (
              <Image src={mobileLogo} alt='mobile logo' height={24} width={30} className='max-sm:mx-[1rem]' />
            )}
          </div>
        </div>
        <div className='mt-[22px] max-md:pt-[0px] flex lg:flex-row flex-col md:items-center lg:items-start justify-center gap-x-[80px] max-md:gap-[10px] bg-[#FFFFFF] h-auto w-full container mx-auto'>
          <div className='flex flex-col container mx-auto md:px-10'>
            <h1 className='sm:text-[30px] max-sm:text-[26px] max-sm:text-center md:text-center lg:text-left max-xs:text-[18px] font-semibold  text-[#212529] sm:leading-[50px] max-sm:leading-[33px]  font-[poppins]'>
              Check Your Credit Score for Free
            </h1>
            <div className='container sm:mb-4 max-sm:hidden max-[768px]:hidden  mx-auto max-[991px]:max-w-full max-[1024px]:px-0   max-[576px]:px-0 max-[479px]:px-0 max-[375px]:px-0 max-[320px]:px-0'>
              <div className=''>
                {metaResponseBanner?.paragraph && (
                  <div className='py-[6px] leading-[21px] mt-2'>
                    <div className='flex flex-col text-[#212529] text-[12px] sm:text-[15px]  leading-[26px]  pb-[15px]   max-sm:px-[0px]'>
                      <p id='description'>{metaResponseBanner?.paragraph}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <Image
            src={landingPageScoreImage}
            height={200}
            width={400}
            alt='landingscoreimage'
            className='max-sm:hidden  h-[300px]'
          />
          <Image src={landingPageBannerMob} height={200} width={300} alt='mobile banner' className='md:hidden w-full h-auto' /> */}
          <div className='bg-white xl:px-1 px-4 md:px-12'>
            <CreditScoreBanner isLandingPage={true} />
          </div>
        </div>
        <div className='xl:mt-[3.5rem] mt-[1rem] flex flex-col items-center justify-center container mx-auto pb-[6rem] xl:px-10 px-4'>
          <p className="text-neutral-800 md:text-[25px] font-semibold font-['Faktum'] xl:pb-[35px]  pb-[20px] text-[22px] max-sm:px-10 text-center ">
            Credit Tracker Features
          </p>
          <div className='grid grid-cols-4 gap-x-[2rem] max-sm:grid-cols-2 max-sm:gap-y-[2rem]'>
            {creditScoreFeatures?.map((item) => {
              return (
                <div className={`flex flex-col gap-[22px] items-center justify-center`} key={item?.id}>
                  <Image src={item?.image} height={70} width={70} alt='img_text' />
                  <div className="text-neutral-800 xl:text-[16px] text-md font-medium font-['Poppins']  text-center">
                    {item?.title}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default CreditScoreLandingPage
