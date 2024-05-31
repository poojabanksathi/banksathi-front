import React from 'react';
import dynamic from 'next/dynamic'
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const Index = ({ businessCategorydata }) => {
  return (
    <div style={{}}>
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
      </section>
      <div className='bg-[#F4F8FB]'>
      </div>
      <div className='container text-base  py-5 h-full text-[#000]   mx-auto max-[991px]:max-w-full max-[834px]:py-[35px] max-[576px]:py-[52px] max-[479px]:py-[20px] max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
        <p>
        This Privacy Policy is published by <strong>BS Fintech Private Limited</strong>, a company incorporated under the Companies Act, 2013, having its registered office at Municipal No. #201, First Floor, Smart Square Complex, 100 Feet Road, Indira Nagar 2nd Stage, Bangalore-560038 (CIN) U72900KA2021PTC151652 (hereinafter referred to as “Company” and/or “Banksathi” which term, unless repugnant to the context or meaning thereof, shall mean and include its directors employees and associates to provide the privacy policy that will be applicable in the context of the BankSathi (hereinafter referred to as its <strong>&#39;Application&#39;</strong>) and govern the persons downloading, signing up/registering on the Application and purchasing the financial products as presented by Advisor through the Application (hereinafter referred to as <strong>&#39;End Customer&#39;</strong>) or downloading signing up/registering and/or promoting financial products of Company’s clients products and services on the Application to the End Customer (hereinafter referred to as &#39;Advisor/s&#39;) (End Customer and <strong>&#39;Advisor/s&#39;</strong> shall collectively be referred to as &#39;Users&#39;).
        </p>
        <p>
        This Privacy Policy is published in accordance with the relevant provisions of the Information Technology <strong>Act</strong>, 2000 (hereinafter referred to as the “Act”), Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011 (hereinafter referred to as the <strong>&#39;IT rules&#39;</strong>) and the Information Technology (Intermediary Guidelines) Rules 2011 (hereinafter referred to as the &#39;Intermediary Rules&#39;) and such other applicable laws. Through this Privacy Policy, Company provides information about the details it collects from Advisors (including but not limited to personal and sensitive information as described in the IT rules) hereinafter referred to as &#39;Information&#39; (It is explicitly clarified that the term <strong>&#39;Information&#39;</strong> shall mean and include the information described in clause 2 of this Privacy Policy), the purpose of such collection, disclosure of data, the mode of removal or updating Advisor Information, practices and safety measures and grievance redressal mechanisms in the following manner:-
        </p>
        <ul>
          <li>
          Company is engaged in the business of advertising the financial products on its Application to the Advisors to enable them to promote the same to End-Customers. For more information about the products please go through the Application.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            <ol className='list-[decimal]'>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                a. Information collected and purpose it is collected for
                
                <ol className='list-[lower-roman] ml-4 '>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    Name
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    Access to location – to enable the Advisor to use the Application
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    Biometric Access (face-scan, fingerprint scan) and screen lock to enable Advisor to access the Application.
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    mobile number registered on UPI payment system – for remitting payment of the
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    WhatsApp permission for sending a notification, for sharing leads and product related information, messages, invite links etc.
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    Contacts - To enable advisor to add new End-Customers to the Application
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    Aadhaar number - for KYC compliance
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    PAN number - for KYC compliance.
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    Address as per Aadhaar – for KYC compliance.
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    Bank details – to remit the payment
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    Paytm Mobile No. – to remit the payment
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    Email ID - for communication purposes
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    Camera - To enable the advisor to take pictures for the purposes of the Application
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    Photo Gallery – To enable the advisor to upload a profile photo
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    Educational Certificates – For verifying the advisor’s educational qualification for making them an insurance agent
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    Point Of Sales License (IRDAI) – For verifying the POS license holder
                  </li>
                  <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                    Such other ancillary details connected to the aforesaid.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li >
            Company collects the following information from the End Customer for the following purposes:
            <ul>
              <li> Mobile No. – To register end-customer details on the Application before they can proceed to apply to the Products on the Application.</li>
              <li> PAN no. – For KYC compliance and to register end-customer details on the Application before they can proceed to apply to the Products on the Application.</li>
              <li> Name as per Aadhaar Card – for KYC compliance and to register end-customer details on the Application before they can proceed to apply to the Products on the Application.</li>
              <li> Email Address – for communication purposes to register end-customer details on the Application before they can proceed to apply to the Products on the Application.</li>
              <li> Pin-code - To register end-customer details on the Application before they can proceed to apply to the Products on the Application.</li>
            </ul>
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            Purpose of collecting information <br />
            While the specific purposes are covered above, the generic statement of purpose is as mentioned below: <br />
            <ol className='list-[lower-roman] ml-4'>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> To enable Advisor and End Customer to use the Application </li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> To enable the Advisor to withdraw the amount from the bank.</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> To facilitate the transactions or report on these transactions;</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> To undertake research and analytics for offering or improving the products/services and their security and service quality;</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> To check and process Advisor’s requirements or instructions or requests received from End Customers and/or Advisors in respect of the products.</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> To share with Advisor, updates on changes to the products/services and their terms and conditions including the Application’s terms and conditions.</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> To verify identity and to provide products to the Advisor.</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> To carry credit checks, screenings or due diligence checks as lawfully required by the Company.</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> To undertake financial/regulatory/management reporting, and create and maintain various risk management models.</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> To conduct audits and for record-keeping purposes.</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> To comply with the requirements of applicable laws/regulations and/or court orders/regulatory directives.</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> To allow Advisors to sign-up or set-up their account with Company.</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> To initiate legal action in case of breach by Advisor .</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> The Information is collected for Company to understand the kind of Advisor and End Customers accessing Company Application.</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> The Information is collected for Company to understand the Advisor and End Customer behaviour and to customize or modify or enhance its services accordingly. </li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> The information is collected for the End Customers to explore and apply for Products listed on the Application.</li>
            </ol>
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[2%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            Company neither rents nor sells User personal information in personally identifiable form to anyone. Company shares User’s personal information in personally identifiable form with third parties only as described in this Privacy Policy. The Information is stored by Company (including by its associates/employees and auditors/attorneys hereinafter referred to as “Authorised Personnel” and third party software enabled on the Application in its electronic and physical databases. However, it is hereby clarified that:
            <ol className='list-[lower-roman] pt-5 ml-4 '>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> Reasonable safety practices as per Indian standards are enabled on the Application (and the Company Application is encrypted), the electronic and physical databases to protect the data collected by Company and to prevent unauthorized access to third parties.</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> The Authorised Personnel will be provided access to the data only on a need to know basis and with an obligation cast on them to protect the confidentiality of such data. </li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> The Information will be used for the purposes described in clause 2 of this Privacy Policy. </li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> Company will not share User personal information with third parties without User permission unless Company’s ownership changes or Company merges or enters into a joint-venture with another party; or Company is required to do so under any law, or in connection with any legal proceedings and/or to defend our legal rights.</li>
              <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'> Company does not knowingly collect personal and sensitive information from persons aged below 18 years. </li>
            </ol>
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[2%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            In case Advisor wishes to obtain a copy of their personal information or wants to delete or update their personal information or withdraw their consent to publish their Information or if the Advisor has any grievance pertaining to the Company’s Application then such person can contact Company’s grievance officer <b>Mr. Raj Singh</b> by sending an email or mobile no regarding their request to <b>grievance@banksathi.com (+91-8150025844)</b> with the subject line as <b>&#39;Acceleration of grievance&#39;</b>. Upon satisfactorily ascertaining the credentials of the person seeking the information, Company shall with the Advisor’s cooperation, assist them in redressing the grievance or request in a timebound manner. Further, it is clarified that in the event the Advisor withdraws their consent to publish their Information or makes a request of above-mentioned nature in the manner specified above, Company shall at its sole discretion have the rights to disable or restrict or block such Advisor’s registration or access to the Application.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[2%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            Company may use third-party advertising companies to serve ads when the User visits the Application or Company shall post third-party financial products on the Application. When the Advisor or End-User applies for such products the End-Customer may be redirected to the said third-party webpage or application. These companies and third-parties may use information (including but not limited to) the User’s name, address, email address, telephone number, or sensitive personal information) about User’s visit to the Application in order to provide advertisements about the products and services of interest to User. Further, such advertisements may have hyperlinks that lead to the advertiser’s or third-party’s website. COMPANY HEREBY EXPRESSLY CLARIFIES THAT COMPANY IS NOT MAKING ANY WARRANTIES AND SHALL UNDER NO CIRCUMSTANCES BE RESPONSIBLE FOR THE PRIVACY SAFEGUARDS OF SUCH WEBSITES OR APPLICATIONS OR THE ACCURACY OR AUTHENTICITY OF THE DATA CONTAINED IN SUCH WEBSITES OR THE ADVERTISEMENTS, USERS ARE ADVISED TO REFER TO THE PRIVACY POLICIES AND TERMS OF USE OF SUCH WEBSITES AND EXERCISE REASONABLE CAUTION AND DILIGENCE WHEN USING SUCH THIRD PARTY WEBSITES.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[2%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            IT IS HEREBY CLARIFIED THAT THE ACCEPTANCE TO THIS PRIVACY POLICY AND THE TERMS OF USE IS A PRECONDITION FOR THE USER TO VISIT OR USE THE APPLICATION. IN THE EVENT, THE USER DISAGREES TO PROVIDE SUCH ACCEPTANCE THEN SUCH USER IS REQUIRED TO LEAVE/STOP VISITING OR USING THE APPLICATION IMMEDIATELY. THE USER’S ACT OF USING OR VISITING THE APPLICATION SHALL BE DEEMED AS ACCEPTANCE BY THE USER TO THE PRIVACY POLICY AND TERMS OF USE.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[2%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            Company reserves the right to update or modify all or any part of this Privacy Policy and such update or modification shall (unless specified otherwise) be effective from the date the same is published on the Application. However, Users are encouraged and advised to visit the Privacy Policy section from time to time to ascertain if any update or modification has been made to the same.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[2%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            While Company has taken appropriate steps for the security and protection of Application, however, Company shall not be responsible for any breach of security or the disclosure of personal data for reasons outside its control, such as hacking, social engineering, cyber terrorism, espionage by third parties, or any events by way of force majeure such as sabotage, fire, flood, explosion, acts of God, civil commotion, strikes or industrial action of any kind, riots, insurrection, war or acts of government.
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Index;