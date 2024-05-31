import React from "react";
import dynamic from 'next/dynamic'
export default function index({ businessCategorydata }) {
  const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
    ssr: false
  })
  const PrivacyHeaderText = dynamic(() => import('../../core/component/Layout/PrivacyPolicy/PrivacyHeaderText/index'), {
    ssr: false
  })
  return (
    <div className="bg-[#F4F8FB]">
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
      </section>
      <div className=' container h-full py-4  mx-auto max-[991px]:max-w-full max-[834px]:py-[35px] max-[576px]:py-[52px] max-[479px]:py-[20px] max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
        <PrivacyHeaderText title="Terms & Conditions" />
        <p className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-5 '>
          <span className=" text-[16px] font-medium	"> These terms and conditions (“T&Cs”) apply to access and use of the
            software including but not limited to Mobile application, web
            Application, etc. The website/Software/Application is owned by BS
            FINTECH PRIVATE LIMITED, (Company).</span> By accessing and using Website/app
          in anyway, including, without limitation, browsing the Website, using
          any information, using any content, any services, etc., available
          therein, you agree to and are bound by these Terms of Use.
        </p>
        <p className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          If you do not accept these Terms of Use in full, please cease using this
          Website/app immediately. You warrant that you are not suffering from any
          of disqualifications and or legally barred to use the program by any
          law/authority/agency/governmental body. Company reserves the right to
          update the TOU at any time without notice to you. Privacy Policy
        </p>
        <p className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          <span className=" text-[16px] font-medium	"> As a internet users, privacy is important. Therefore, you are referred
            to BANKSATHI’s privacy policy.</span> Your continued use of BANKSATHI is an
          affirmation that you have read the privacy policy, understand it, assent
          and consent to its terms and conditions, including subsequent changes
          and amendments. Is illegal, threatening, defamatory, abusive, harassing,
          degrading, intimidating, fraudulent, deceptive, invasive, racist, or
          contains any type of suggestive, inappropriate, or explicit language.
          Infringes on any trademark, patent, trade secret, copyright, or other
          proprietary right of any party. Contains any type of unauthorized or
          unsolicited advertising.
        </p>
        <p className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          Impersonates any person or entity, including any BANKSATHI employees or
          representatives. We do not assume any liability for any user generated
          content posted by you or any other 3rd party users of our website. We
          have the right at our sole discretion to remove any content that, we
          feel in our judgment does not comply with this Term of use Agreement,
          along with any content that we feel is otherwise offensive, harmful,
          objectionable, inaccurate, or violates any 3rd party copyrights or
          trademarks. Any material, information or content that is uploaded by you
          or is otherwise made available by you to BANKSATHI is and remains your
          sole property or that of your licensors.
        </p>
        <p className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          You automatically grant and/or warrant upon your uploading or making
          available of such material, information or content that the owner of
          such material, information or content has granted BANKSATHI a perpetual,
          royalty free, non-exclusive right and license to use, reproduce, modify,
          publish, distribute, display, perform and transmit the information or
          content through BANKSATHI. You further warrant that all such materials
          do not infringe upon any copyright, violate any property rights or
          contain scandalous, libelous, or unlawful matter. This only refers and
          applies to user-generated content as described. All user’s Personal
          Information, provided as part of our registration or purchase process,
          is covered by our Privacy Policy.
        </p>
        <h2 className="mt-3 text-[16px] font-bold">Using BANKSATHI</h2>
        <p className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          By visiting our website and accessing the information, resources,
          services, products, and tools we provide for you, either directly or
          indirectly (hereafter referred to as ‘Resources’), you agree to use
          these Resources only for the purposes intended as permitted by the terms
          of this ToU Agreement, and/or applicable laws, regulations and generally
          accepted online practices or guidelines.
        </p>
        <h2 className="mt-3 text-[16px] font-bold" >Wherein, you understand that </h2>
        <p className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          In order to access our Resources, you may be required to provide certain
          information about yourself but not limited to other details such as
          name, address, contact details, etc.. You agree that any information you
          provide will always be accurate, correct, and updated. You are
          responsible for maintaining the confidentiality of any information
          associated with any use or access to our Resources.Engaging in any
          activity that disrupts or interferes with our Resources, including the
          servers and/or networks to which our Resources are located or connected,
          is strictly prohibited.
        </p>
        <p className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          Attempting to copy or copy, duplicate, reproduce, sell, trade, or resell
          our Resources is strictly prohibited. Without limitation to the
          liability, you are solely responsible for any consequences, losses,
          penalty or damages that we may directly or indirectly incur or suffer
          due to any unauthorized activities conducted by you, as explained above,
          and may incur criminal or civil liabilities.
        </p>
        <h2 className="mt-3 text-[16px] font-bold" >User conduct</h2>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          You may only access and use BANKSATHI for lawful purposes only. The user
          of BANKSATHI is responsible for adhering to any and all laws, rules, and
          regulations that are applicable regardless of any previous knowledge or
          lack of knowledge about such laws, rules or regulations. BANKSATHI is
          not responsible for the content of any information that is uploaded,
          posted or transmitted by you or other third parties to BANKSATHI. Since
          BANKSATHI does not control the content of what is uploaded, posted, or
          transmitted, it cannot guarantee the accuracy, integrity of quality, or
          legality of such content.
        </div>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          Anyone who registers or uses BANKSATHI or any resources located therein
          does so at his or her own risk, and BANKSATHI shall not be liable in any
          way for the content, or for any loss or damage that may be incurred as a
          result of using any content or information transmitted via BANKSATHI.
          BANKSATHI’s rights and protections as stated in these Terms of Use are
          equally applicable to any internet service provider that it has selected
          to host BANKSATHI or any related resources.
        </div>
        <h2 className="mt-3 text-[16px] font-bold" >You agree that you will not use this website to </h2>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          Commit or cause to be committed any criminal offense or encourage
          conduct that would constitute a criminal offense or give rise to a civil
          liability, or otherwise violate any local, state, federal or
          international law or regulation. Upload, post, e-mail or otherwise
          transmit any content that is unlawful, defamatory, harassing, abusive,
          invasive of another’s privacy, infringes upon the rights of third
          parties, harmful, wrongful, or obscene.
        </div>
        <h2 className="mt-3 text-[16px] font-bold" >Harm any minors in any way</h2>
        <ol className="mt-3 list-decimal">
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            Upload, post, e-mail or otherwise transmit any material, information
            or content that you do not have a right to transmit under law or
            contractual relationship.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]' >
            Upload, post, email or otherwise transmit any material, information or
            content that infringes any patent, trademark, trade secret, copyright,
            or other proprietary rights of any other individual, party or entity.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            Disguise the origin of the material, information or content by
            omitting or obscuring copyright or authorship, or by forging headers
            or otherwise manipulating identifiers.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            Upload, post, e-mail or otherwise transmit any unsolicited
            advertising, promotional materials, or other forms of solicitation,
            such as “junk mail”, “spam”, “chain letters”, or “pyramid schemes”
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            After, damage, or delete any material, information or content or
            communication that is not yours or to interfere with the ability of
            others to have access or use of this website.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            Upload, post, e-mail or otherwise transmit any material, information
            or content that contains a software virus or any other computer code,
            file or program that would interfere with the functionality of any
            computer software, hardware or telecommunication equipment.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            Disrupt the normal communication or otherwise act in such a way that
            would negatively impact other users’ ability to engage in real-time
            exchanges.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            Impersonate or claim a relationship with or speak for any individual,
            business, association, institution, or other organization, including,
            but not limited to BANKSATHI for which you have no authorization to do
            so or to claim such a relationship.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            Interfere with or disrupt the services or servers or networks
            connected to the services, or disobey any requirements, procedures,
            policies, or regulations of networks connected to the services and/or
            this website.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            Collect or store personal data about other users. Stalk or otherwise
            harass any individual or Cause to be reproduced, duplicated, copied,
            used, distributed, sold, resold, or otherwise exploit in any manner
            for commercial use or purposes, any aspect of Flourish or any
            resources found therein or any of the associated software, services or
            products related thereto.
          </li>
        </ol>
        <h2 className="mt-3 text-[16px] font-bold">User generated content</h2>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          We may provide various open communication tools on our website, such as
          blog comments, posts, public chat, forums, message boards, newsgroups,
          reviews, various social media services, etc. You understand that we do
          not pre-screen content posted by users of these various communication
          tools, which means that if you choose to use these tools to submit any
          type of content to our website (“user generated content”), then it is
          your personal responsibility to use these tools in a responsible and
          ethical manner.
        </div>
        <h2 className="mt-3 text-[16px] font-bold">IPR and copyright</h2>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          All content and materials available on BANKSATHI, including but not
          limited to text, graphics, website name, code, images and logos are
          either the intellectual property of BANKSATHI or under licensed use by
          Banksathi Technologies Private Limited, and are protected. Any
          inappropriate use, including but not limited to the reproduction,
          distribution, display or transmission of any content on this site is
          strictly prohibited, unless specifically authorized.
        </div>
        <h2 className="mt-3 text-[16px] font-bold">Contributions to BANKSATHI ! </h2>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          By submitting ideas, suggestions, documents, and/or proposals
          (“Contributions”) to BANKSATHI through its suggestion or feedback
          webpages, you acknowledge and agree that.
        </div>
        <ol className="mt-3 list-decimal">
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            Your Contributions do not contain confidential or proprietary
            information.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            BANKSATHI is not under any obligation of confidentiality, express or
            implied, with respect to the Contributions.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            BANKSATHI shall be entitled to use or disclose (or choose not to use
            or disclose) such Contributions for any purpose, in any way, in any
            media worldwide.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            BANKSATHI may have something similar to the Contributions already
            under consideration or in development.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            Your Contributions automatically become the property of BANKSATHI
            without any obligation of BANKSATHI to you.
          </li>
          <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
            You are not entitled to any compensation or reimbursement of any kind
            from BANKSATHI under any circumstances.
          </li>
        </ol>
        <h2 className="mt-3 text-[16px] font-bold">Indemnity</h2>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          You agree to indemnify and hold BANKSATHI, its parent company, officers,
          subsidiaries, affiliates, successors, assigns, directors, officers,
          agents, service providers, suppliers and employees, harmless from any
          claim or demand, including penalty, reasonable attorney fees and court
          costs, made by any third party due to or arising out of content
          submitted by the user, users use of the service, violation of the Term
          of use and privacy policy, breach by the user of any of the terms and
          conditions, representations and warranties herein, or user’s violation
          of any rights of another.
        </div>
        <h2 className="mt-3 text-[16px] font-bold">No resale of service </h2>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          You agree not to reproduce, duplicate, copy, sell, resell or exploit for
          any commercial purposes, any portion of the Service, use of the Service,
          or access to the Service.
        </div>
        <h2 className="mt-3 text-[16px] font-bold">Dealings with third parties </h2>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          The Service may also include access to products and services of
          independent third parties either directly or via links to sites operated
          by such third parties. Where these products and services of third
          parties form part of the Service, we will endeavor, but are not obliged
          to, indicate that these products and services are provided by third
          parties.
        </div>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          In all cases, your correspondence or business dealings with, or
          participation in promotions of, other parties found on or through the
          Service (including without limitation providers of products and
          services, advertisers and other users of the Service), including payment
          and delivery of related goods or services, and any other terms,
          conditions, warranties or representations associated with such dealings,
          are solely between you and such third party, even where it is in
          relation to any products or services that are co-branded with us which
          may include our trademarks. You agree that we shall not be responsible
          or liable in any way for any loss or damage of any sort incurred as the
          result of any such dealings with any third parties, as the result of the
          presence of such third parties on the Service, or as the result of the
          use of the Service in any way by such third parties.
        </div>
        <h2 className="mt-3 text-[16px] font-bold">Links </h2>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          The Service may provide, or third parties may provide, links to other
          World Wide Web or other online electronic sites or resources. You
          acknowledge that BANKSATHI has no control over such sites and resources,
          you acknowledge and agree that BANKSATHI is not responsible for the
          availability of such external sites or resources, and does not endorse
          and is not responsible or liable for any Content, advertising, products,
          or other materials on or available from such sites or resources.
        </div>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          You further acknowledge and agree that BANKSATHI shall not be
          responsible or liable, in any manner whatsoever, for any damage or loss
          caused or alleged to be caused by or in connection with use of or
          reliance on any such Content, goods or services available on or through
          any such site or resource.
        </div>
        <h2 className="mt-3 text-[16px] font-bold">Limitation of warranties</h2>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          By using our website, you understand and agree that all Resources we
          provide are “as is” and “as available”. This means that we do not
          represent or warrant to you that: The use of our Resources will meet
          your needs or requirements, The use of our Resources will be
          uninterrupted, timely, secure or free from errors or virus, The
          information obtained by using our Resources will be accurate or
          reliable, and Any downloads from BANKSATHI will not harm your computer
          or device in any way. We have screened or verified any of the
          information posted herein, unless otherwise specifically so stated on
          the Website; and To the maximum extent permitted by law,BANKSATHI has no
          liability in relation to or arising out of the Website Information and
          recommendations.
        </div>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          You are responsible for the final choice of your product. Please seek
          further advice from BANKSATHI or the relevant participating companies
          before choosing any product or service which you wish to avail for, if
          you have any doubts or queries about the same. Furthermore, BANKSATHI
          does not guarantee when or if you will actually acquire the product that
          you have chosen and does not accept any liability arising out of delay
          in you acquiring the product you have chosen. You acknowledge and accept
          that the final issuance of purchased products or services from the third
          partner /brands/ merchants of the Company as per the prevailing scheme.
        </div>
        <h2 className="mt-3 text-[16px] font-bold">Limitation of liability</h2>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          You expressly understand and agree that in no event BANKSATHI or its
          contractors, agents, licensors, partners, employees, representatives,
          suppliers be liable to you for any special, direct, indirect,
          incidental, consequential, punitive, or exemplary damages (including
          without limitation loss of business opportunities, lost revenues, or
          loss of anticipated profits or any other pecuniary or non-pecuniary loss
          or damage of any nature whatsoever) arising out of or relating to this
          agreement, or which may be incurred by you as a result of using our
          website or its resources or the content, the services, or any reference
          site, or your use or inability to use the services.
        </div>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          In any event, BANKSATHI or any of its contractors, directors, employees,
          agents, third party partners, licensors or suppliers’ shall not be
          liable for any or all damages, liabilities, losses, costs or
          consequences thereof arising out of or in relation to usage/Agreement,
          or the Products or Services, however caused and whether arising in
          contract, tort including negligence, warranty or otherwise. That any
          claim against us shall be limited to the amount you paid to BANKSATHI,
          if any.
        </div>
        <h2 className="mt-3 text-[16px] font-bold">Governing law</h2>
        <div className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] leading-[28px] tracking-[0.2px] text-justify font-normal	mb-2 pt-2'>
          This Term of use Agreement and the Privacy Policy shall be governed and
          construed in accordance with the laws of the Republic of India and the
          courts at Delhi shall have exclusive jurisdiction on all matters and
          disputes arising out of and relating to the Site.
        </div>
      </div>
    </div>
  );
}