import Link from 'next/link'
import React from 'react'
import CheckCibilCard from '../../common/CheckCibilCard/CheckCibilCard'
import { eligibilityData } from '@/utils/alljsonfile/checkCibilCardList'
import SocialMediaShareComp from '../../common/CommonList/SocialMediaShareComp';

export default function AadharDetails({businessmetaheadtag}) {
    const aadhaarData = [
        {
            type: "Regular Aadhaar Card",
            description: "A standard physical card issued to Indian residents.",
            benefits: "Serves as proof of identity and address for various services.",
            howToObtain: "Enrollment at the Aadhaar centre.",
            updatesAllowed: "Address (Online)"
        },
        {
            type: "e-Aadhaar",
            description: "An electronic version of Aadhaar card downloadable from the UIDAI website or app.",
            benefits: "Same validity as a physical card, usable for identity and address proof.",
            howToObtain: "Download from UIDAI website or mAadhaar app.",
            updatesAllowed: "Not applicable"
        },
        {
            type: "m-Aadhaar",
            description: "Mobile application for carrying Aadhaar details on the smartphone.",
            benefits: "Convenient access to Aadhaar services and information.",
            howToObtain: "Download the mAadhaar app and register.",
            updatesAllowed: "Not applicable"
        },
        {
            type: "Masked Aadhaar",
            description: "The version of Aadhaar card with the first 8 digits masked for privacy protection.",
            benefits: "Useful for sharing Aadhaar details while protecting most of the number.",
            howToObtain: "Generate from e-Aadhaar or mAadhaar.",
            updatesAllowed: "Not applicable"
        },
        {
            type: "PVC Aadhaar Card",
            description: "Durable PVC version of the Aadhaar card with enhanced security features.",
            benefits: "A more durable and secure alternative to paper card.",
            howToObtain: "Order online through the UIDAI website (fee applies).",
            updatesAllowed: "Not applicable"
        },
        {
            type: "Aadhaar For Children",
            description: "Aadhaar card issued to children under 5 with details linked to parents/guardians.",
            benefits: "Provides a child's identity proof.",
            howToObtain: "Enrollment at the Aadhaar centre with parent/guardian documents.",
            updatesAllowed: "Biometrics (when a child is older)"
        },
        {
            type: "Aadhaar For NRIs and Foreign Citizens",
            description: "Aadhaar card issued to Non-Resident Indians and foreign citizens residing in India for more than 182 days in the previous year.",
            benefits: "Enables access to benefits and services in India.",
            howToObtain: "Enrollment at the Aadhaar centre with valid proof of identity and address as per UIDAI guidelines.",
            updatesAllowed: "Address, name, DOB, and phone (offline)"
        }
    ];
    const tableData = [
        { identityProof: 'Passport', addressProof: 'Passport', dateOfBirth: 'Passport' },
        { identityProof: 'Ration Card', addressProof: 'Ration Card', dateOfBirth: 'Government Issued Service Photo ID Card.' },
        { identityProof: 'Voter Id', addressProof: 'Voter Id', dateOfBirth: 'Birth Certificate' },
        { identityProof: 'Pan Card', addressProof: 'Government Issued Service Photo ID Card.', dateOfBirth: 'Marksheet' },
        { identityProof: 'Driving Licence', addressProof: 'Marriage Certificate', dateOfBirth: '' },
        { identityProof: 'Government Issued Service Photo ID Card.', addressProof: 'Electricity, Water, Or Telephone Bills For The Last 3 Months', dateOfBirth: '' },
        { identityProof: 'Marksheet', addressProof: 'Property Tax Receipt, Property Sale Deed Receipt, or Rent Agreement', dateOfBirth: '' },
        { identityProof: 'Bank Account Statement', addressProof: 'Bank Account Statement', dateOfBirth: '' },
    ];
    return (
        <>
            <div className='bg-[#F3F8F9] text-[#000] '>
                <div className="container h-full px-16 max-[1024px]:px-8 mx-auto sm:pb-[60px] max-sm:pb-[30px] max-[991px]:max-w-full pt-[30px] max-[576px]:px-6 max-[479px]:px-4 max-[576px]:py-[30px] max-[375px]:px-4 max-[320px]:px-4">
                    <div className="grid grid-cols-12 gap-12 max-[576px]:gap-0 border-b-2 border-black max-sm:pb-5">
                        <div className="col-span-8 max-[768px]:col-span-7 max-[576px]:col-span-12">
                            <SocialMediaShareComp />
                            <div className="pb-6 hidden max-[576px]:block">
                                <Link href="/credit-cards/eligibility" prefetch={false}>
                                    <button className="bg-[#49D49D] w-full lg:w-[240px] h-[48px] rounded-md font-faktum font-semibold text-[15px] leading-[18px] tracking-wide text-[#212529]">
                                        Check Credit Card Eligibility
                                    </button>
                                </Link>
                            </div>

                            <h1 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[32px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[20px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                What is an Aadhaar Card?: A Comprehensive Guide to Understanding Everything About Aadhaar
                            </h1>
                            <p className="text-[#212529] text-[15px] font-normal my-2">
                                In the rapidly evolving landscape of modern India, there exists a singular identification document that symbolises the nation's technological advancement and administrative foresight—the Aadhaar Card. Beyond its physical form, it represents a digital identity revolution that has significantly impacted the lives of over a billion individuals. This comprehensive guide delves into the essence of the Aadhaar Card, delving into its origins, significance, controversies, societal impact, and exciting new updates!
                            </p>
                            <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                What is an Aadhaar Card?
                            </h2>
                            <p className="text-[#212529] text-[15px] font-normal my-2">
                                The Aadhaar Card, issued by the UIDAI, is more than just a 12-digit number and a card. Established in January 2009, UIDAI, also known as the Unique Identification Authority of India, is a government agency that provides Indian residents with a foundational identity document. The word "Aadhaar" itself signifies this, meaning "foundation" or "base," giving every citizen of the country their identity as a part of it.
                            </p>
                            <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                What is the Purpose of an Aadhaar Card?
                            </h2>
                            <p className="text-[#212529] text-[15px] font-normal my-2">
                                Leakage in social welfare schemes, identity theft, and the lack of a reliable identification system were significant hurdles in India. Aadhaar was conceived to address these issues. By providing each resident with a unique identity number linked to their biometric and demographic data, the government aimed to streamline service delivery, reduce corruption, and ensure effective targeting of benefits and subsidies.
                            </p>
                            <p className="text-[#212529] text-[15px] font-normal my-2">
                                This unique aspect of Aadhaar lies in its ability to store both demographic and biometric information. Demographics include details like your name, address, and date of birth. Biometrics, on the other hand, involve capturing fingerprints and iris scans, creating a robust and nearly impossible-to-forge identification system.
                            </p>
                            <p className="text-[#212529] text-[15px] font-normal my-2">
                                As a result, Aadhaar has become one of the world's largest biometric ID systems.
                            </p>
                            <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                Types of Aadhaar Cards
                            </h2>
                            <p className="text-[#212529] text-[15px] font-normal my-2">
                                There are several types of Aadhaar cards made available by the UIDAI:
                            </p>
                            <div className="text-[#212529] text-[15px] font-normal longform-list mb-[40px] blog-Post-detail-table">
                                <table border="1" cellPadding="1" cellSpacing="1" className="w-[500px]">
                                    <tbody>
                                        <tr>
                                            <td>Type of Aadhaar Card</td>
                                            <td>Description</td>
                                            <td>Benefits</td>
                                            <td>How to Obtain</td>
                                            <td>Updates Allowed</td>
                                        </tr>
                                        {aadhaarData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.type}</td>
                                                <td>{item.description}</td>
                                                <td>{item.benefits}</td>
                                                <td>{item.howToObtain}</td>
                                                <td>{item.updatesAllowed}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                Key Features of the Aadhaar Card
                            </h2>
                            <ul className='list-inside list-disc mt-2 '>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    <b>Universal Identification:</b> Aadhaar aims to provide a universal identity to every resident of India, including infants and children, regardless of their socio-economic status.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    <b>Biometric Authentication:</b> One of the distinctive features of Aadhaar is its biometric authentication system, which utilises fingerprint and iris scans for verification, ensuring greater accuracy and security in identity verification processes.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    <b>Digital Identity:</b> Aadhaar is not just a physical card but also a digital identity, enabling online authentication and verification through various means, including mobile apps and web portals.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    <b>Direct Benefit Transfer (DBT):</b> Aadhaar is integrated with various government schemes and programmes, facilitating the direct transfer of benefits and subsidies to the bank accounts of eligible beneficiaries, thereby reducing leakages and ensuring transparency.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    <b>E-KYC (Know Your Customer):</b> Aadhaar-based e-KYC has revolutionised the verification process in various sectors such as banking, telecom, and insurance, enabling paperless, instant, and secure verification of identity and address.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    <b>Secured Authentication:</b> Aadhaar authentication employs advanced encryption techniques and multi-layered security protocols to safeguard individuals' privacy and prevent unauthorised access to biometric and demographic data.
                                </li>
                            </ul>
                            <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                How to Apply and Get Your Aadhaar Card?
                            </h2>
                            <p className="text-[#212529] text-[15px] font-normal my-2">
                                To apply for an Aadhaar card and obtain your physical card for identification purposes, you have to follow these steps:
                            </p>
                            <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                Enrollment Process
                            </h3>
                            <ul className='list-inside list-decimal mt-2 '>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Aadhaar aims to provide a universal identity to every resident of India, including infants and children, regardless of their socio-economic status.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    One of the distinctive features of Aadhaar is its biometric authentication system, which utilises fingerprint and iris scans for verification, ensuring greater accuracy and security in identity verification processes.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Aadhaar is not just a physical card but also a digital identity, enabling online authentication and verification through various means, including mobile apps and web portals.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Aadhaar is integrated with various government schemes and programmes, facilitating the direct transfer of benefits and subsidies to the bank accounts of eligible beneficiaries, thereby reducing leakages and ensuring transparency.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Aadhaar-based e-KYC has revolutionised the verification process in various sectors such as banking, telecom, and insurance, enabling paperless, instant, and secure verification of identity and address.
                                </li>
                            </ul>
                            <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                After enrolling for your Aadhaar card
                            </h3>
                            <ol className='list-inside list-decimal'>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Track the Status of Aadhaar card:
                                    <ol className='list-inside list-disc'>
                                        <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                            Use your enrollment ID to track your Aadhaar card generation status on the UIDAI website to know if your Aadhaar card has been generated.
                                        </li>
                                    </ol>
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Download e-Aadhaar (optional):
                                    <ol className='list-inside list-disc'>
                                        <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                            Use your enrollment ID to track your Aadhaar card generation status on the UIDAI website to know if your Aadhaar card has been generated.
                                        </li>
                                    </ol>
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Order a PVC Aadhaar Card:
                                    <ol className='list-inside list-disc'>
                                        <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                            Use your enrollment ID to track your Aadhaar card generation status on the UIDAI website to know if your Aadhaar card has been generated.
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                            <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                Additional Information for a Smooth Aadhaar Application Process:
                            </h3>
                            <ul className='list-inside list-decimal mt-2 '>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Aadhaar enrollment is completely free of charge.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    You can book an appointment online for some enrollment centres to avoid waiting in line.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Once your Aadhaar is generated, you can download your e-Aadhaar from the UIDAI website or mobile app with a simple OTP verification.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    You can also request a physical PVC Aadhaar card for a minimal fee.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Ensure you have a valid mobile number registered with your Aadhaar to receive the OTP during the application process.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    You can track the delivery status of your PVC Aadhaar card using the tracking number provided by the UIDAI in the form of an SMS.
                                </li>
                            </ul>
                            <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                Required Documents For Aadhaar Enrollment
                            </h2>
                            <p className="text-[#212529] text-[15px] font-normal my-2">
                                Aadhaar enrollment requires you to carry your identification documents. Please bring the most convenient types of documentation to the enrollment centre.
                            </p>
                            <div className="text-[#212529] text-[15px] font-normal longform-list mb-[40px] blog-Post-detail-table">
                                <table border="1" cellPadding="1" cellSpacing="1" className="w-[500px]">
                                    <tbody>
                                        <tr>
                                            <td>Identity Proof</td>
                                            <td>Address Proof</td>
                                            <td>Date Of Birth</td>
                                        </tr>
                                        {tableData.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.identityProof}</td>
                                                <td>{row.addressProof}</td>
                                                <td>{row.dateOfBirth}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                How to Update Aadhaar Card?
                            </h2>
                            <p className="text-[#212529] text-[15px] font-normal my-2">
                                To update your Aadhaar card information due to incorrect details or a change of address, you can choose between online and offline methods.
                            </p>
                            <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                Online Updates (Address Only):
                            </h3>
                            <p className="text-[#212529] text-[15px] font-normal my-2">
                                To update your address online, visit the UIDAI website at  <Link href={'https://uidai.gov.in/'} className='text-[#844FCF]'>
                                    https://uidai.gov.in/
                                </Link> and follow these steps:
                            </p>
                            <ul className='list-inside list-decimal mt-2 '>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Go to My Adhaar and then find, Update Demographic Data and Check Status in the drop menu and click on it.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Enter your Aadhaar number and Captcha code.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Click on "Send OTP" and enter the OTP received on your registered mobile number.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Select "Update Demographics Data" and choose "Address" as the field to update.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Enter your new address details and upload scanned documents as proof of address (refer to the UIDAI website for valid documents).
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Review the changes and submit the update request.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    You'll receive an acknowledgement with an Update Request Number (URN) for tracking the update of your Aadhaar card status.
                                </li>
                            </ul>
                            <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                Offline Updates (Address, Name, DoB, Biometrics)
                            </h3>
                            <p className="text-[#212529] text-[15px] font-normal my-2">
                                For updates other than the address, or if you don't have a registered mobile number, you'll need to visit an Aadhaar Enrollment/Update Centre. Here's what you need to do:
                            </p>
                            <ul className='list-inside list-decimal mt-2 '>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Locate an Aadhaar Enrolment/Update Centre near you using the UIDAI website (<Link href={'https://uidai.gov.in/'} className='text-[#844FCF]'>
                                        https://uidai.gov.in/
                                    </Link>).
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Visit the centre and inform them about the update you require.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Fill out the Aadhaar Update/Correction Form.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Submit the form along with the required documents as proof for the update (e.g., passport, birth certificate for DoB change).
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    Provide your fingerprints and iris scans for biometric verification and updates.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    You'll receive an acknowledgement slip containing a Unique Request Number (URN) to track the update status.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    For offline updates, you may need to pay a small fee at the Aadhaar centre.
                                </li>
                            </ul>
                            <h3 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                Impact on Indian Society
                            </h3>
                            <p className="text-[#212529] text-[15px] font-normal my-2">
                                Despite the controversies, Aadhaar has undeniably had a significant impact on Indian society.
                            </p>
                            <ul className='list-inside list-disc mt-2 '>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    <b>Financial Inclusion:</b> Aadhaar-enabled financial services have expanded access to banking and other financial services, especially among marginalised communities, empowering them economically and socially.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    <b>Streamlined Governance: </b> Aadhaar has facilitated the digitisation and streamlining of various government processes, leading to greater efficiency, transparency, and accountability in governance.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    <b>Innovation and Entrepreneurship:</b> Aadhaar's open architecture and APIs have fostered innovation and entrepreneurship in the digital identity ecosystem, spurring the development of innovative solutions and services.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    <b>Social Welfare:</b> Aadhaar has played a crucial role in improving the delivery of social welfare schemes and benefits, ensuring that they reach the intended beneficiaries in a targeted and timely manner.
                                </li>
                            </ul>
                            <h3 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                Controversies and Criticisms
                            </h3>
                            <p className="text-[#212529] text-[15px] font-normal my-2">
                                Despite its ambitious goals and technological advancements, Aadhaar has been entangled in several controversies and criticisms:
                            </p>
                            <ul className='list-inside list-disc mt-2 '>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    <b>Privacy Concerns:</b> The collection and centralisation of biometric data have raised concerns about privacy and surveillance. Critics argue that Aadhaar could be misused for mass surveillance and profiling.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    <b>Exclusion Errors: </b> There have been instances of exclusion errors where individuals have been denied access to essential services due to authentication failures or discrepancies in their Aadhaar data. This highlights the importance of robust grievance redressal mechanisms.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    <b>Data Security Risks:</b> The centralised storage of sensitive biometric and demographic data poses inherent risks of data breaches and cyberattacks, necessitating stringent measures to ensure data security and confidentiality.
                                </li>
                                <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                    <b>Legal Challenges:</b> Aadhaar has faced legal challenges in the Supreme Court of India, with concerns raised about its constitutional validity, infringement of privacy rights, and lack of adequate legislative framework to regulate its functioning.
                                </li>
                            </ul>
                            <h3 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                                Conclusion
                            </h3>
                            <p className="text-[#212529] text-[15px] font-normal my-2">
                                The Aadhaar Card, with its unique combination of technology, governance, and social inclusion, aims to provide every Indian resident with a secure digital identity. Although it has faced both praise and criticism, its potential to transform India's socio-economic landscape is undeniable. As Aadhaar keeps evolving and addressing new challenges, it continues to symbolise India's vision of a more inclusive and digitally connected society.
                            </p>

                        </div>
                        <div className="col-span-4 xl:w-fit space-y-6 max-[768px]:col-span-5 h-auto max-[576px]:col-span-12 max-sm:pt-[0px] recent-blog">
                            <CheckCibilCard cardData={eligibilityData} position={'3'} title={'Check Eligibility'} />
                            <div className="h-auto bg-white rounded-2xl mt-5">
                                <div className="mb-3">
                                    <div className="border-b-[1px] h-[50px] border-[#E6ECF1]">
                                        <p className="text-[15px] font-semibold py-3 pl-5 text-[#212529]">Aadhaar Card</p>
                                    </div>
                                    <div className="listCibil">
                                        <div className="px-5 py-[9.5px] border-b">
                                            <Link href={'/aadhar-card/aadhar-card-for-children'} prefetch={false} className="text-[#212529] text-[15px] font-medium recent-post">
                                                Baal Aadhaar for Children
                                            </Link>
                                        </div>
                                        <div className="px-5 py-[9.5px] border-b">
                                            <Link href={'/aadhar-card/aadhaar-pvc-card'} prefetch={false} className="text-[#212529] text-[15px] font-medium recent-post">
                                                Aadhaar PVC Card
                                            </Link>
                                        </div>
                                        <div className="px-5 py-[9.5px] border-b">
                                            <Link href={'/aadhar-card/aadhaar-biometric'} prefetch={false} className="text-[#212529] text-[15px] font-medium recent-post">
                                                Aadhaar Biometric
                                            </Link>
                                        </div>
                                        <div className="px-5 py-[9.5px] border-b">
                                            <Link href={'/aadhar-card/how-to-check-aadhar-card-status'} prefetch={false} className="text-[#212529] text-[15px] font-medium recent-post">
                                                Check Aadhaar Card Status
                                            </Link>
                                        </div>
                                        <div className="px-5 py-[9.5px] border-b">
                                            <Link href={'/aadhar-card/m-aadhaar'} prefetch={false} className="text-[#212529] text-[15px] font-medium recent-post">
                                                mAadhaar App
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
