import React from 'react'
import SocialMediaShareComp from '../../common/CommonList/SocialMediaShareComp'
import Link from 'next/link'
import CheckCibilCard from '../../common/CheckCibilCard/CheckCibilCard';
import { eligibilityData } from '@/utils/alljsonfile/checkCibilCardList';

export default function PanDetails() {
    const panTableData = [
        { identityProof: 'Issuing Authority', addressProof: 'Income Tax Department' },
        { identityProof: 'Primary Use', addressProof: 'Tax identification, financial transaction tracking' },
        { identityProof: 'Eligibility', addressProof: 'Any individual or entity who is a taxpayer in India' },
        { identityProof: 'Application Method', addressProof: 'Online through NSDL or UTIITSL or offline at authorized centers' },
        { identityProof: 'Required Documents', addressProof: 'Identity proof, Address proof, Date of birth proof' },
        { identityProof: 'Unique Feature', addressProof: '10-character alphanumeric code' },
    ];
    const panDetailData = [
        { detail: 'Full name', description: 'The complete name of the cardholder is registered with the Income Tax Department.' },
        { detail: 'Father’s name', description: 'Applicable only to individual cardholders.' },
        { detail: 'PAN number', description: 'A unique 10-character alphanumeric code.' },
        { detail: 'Date of birth/Registration', description: 'Date of birth for individuals or date of registration for non-individual entities.' },
        { detail: 'Signature', description: 'It serves as a verifiable signature of the cardholder and is used in various financial documents.' },
        { detail: 'Photograph', description: 'A recent color photograph of the cardholder does not apply to non-individual entities.' },
        { detail: 'Hologram', description: 'Features the official hologram of the Government of India and the Income Tax Department logo.' },
    ];
    const panStructure = [
        { position: '1st-3rd', represents: 'Alphabet series', panDetail: 'Three alphabetical characters (A-Z).' },
        { position: '4th', represents: 'Taxpayer category', panDetail: 'Designates the type of taxpayer (e.g., P for Individual, C for Company).' },
        { position: '5th', represents: 'Surname Initial', panDetail: 'The first letter of the surname of the individual.' },
        { position: '6th-9th', represents: 'Sequence number', panDetail: 'Four numerical digits.' },
        { position: '10th', represents: 'Check digit', panDetail: 'An alphabetical check digit.' },
    ]
    const panCode = [
        { alphabet: 'A', panType: 'Association of Persons' },
        { alphabet: 'B', panType: 'Body of Individuals' },
        { alphabet: 'C', panType: 'Company' },
        { alphabet: 'F', panType: 'Firms' },
        { alphabet: 'G', panType: 'Government' },
        { alphabet: 'H', panType: 'Hindu Undivided Family' },
        { alphabet: 'L', panType: 'Local Authority' },
        { alphabet: 'J', panType: 'Artificial Judicial Person' },
        { alphabet: 'P', panType: 'Individual' },
        { alphabet: 'T', panType: 'Association of Persons for a Trust' },
    ]
    const panEligibility = [
        { entity: 'Individuals', criteria: 'Those earning above the minimum taxable income threshold' },
        { entity: 'Businesses', criteria: 'With annual turnover/sales exceeding INR 5 lakh' },
        { entity: 'Taxable Trusts', criteria: 'Required to file returns under Section 139 (4A)' },
        { entity: 'Importers and Exporters', criteria: 'Need a PAN for obtaining Import/Export code' },
        { entity: 'Excise Duty Payers', criteria: 'Individuals required to pay excise duty' },
        { entity: 'TDS Recipients', criteria: 'Individuals who receive income after TDS deductions' },
        { entity: 'Service Tax Payers', criteria: 'Individuals are liable to pay service tax and issue invoices' },
    ]
    const applicationForm = [
        { applicantType: 'Individuals', eligibilityCriteria: 'Indian citizens', requiredDocuments: 'Identity Proof, Address Proof, Date of Birth Proof' },
        { applicantType: 'Partnership Firms', eligibilityCriteria: 'Firms registered under the Registrar of Firms', requiredDocuments: 'Copy of Certificate of Registration or Partnership Deed' },
        { applicantType: 'Limited Liability Partnership (LLP)', eligibilityCriteria: 'LLPs registered under the Registrar of LLPs', requiredDocuments: 'Copy of Certificate of Registration issued by the Registrar of LLPs' },
        { applicantType: 'Trusts', eligibilityCriteria: 'Trusts registered with a Charity Commissioner', requiredDocuments: 'Trust Deed and Certificate of Registration number issued by Charity Commissioner' },
        { applicantType: 'Local Authorities', eligibilityCriteria: '-', requiredDocuments: 'Copy of the Agreement' },
        { applicantType: 'Association of Persons (AOPs)', eligibilityCriteria: 'Registered Associations', requiredDocuments: 'Registration Certificate' },
        { applicantType: 'Artificial Judicial Persons', eligibilityCriteria: '-', requiredDocuments: 'Registration Certificate or Government Identity and Address Proof' },
        { applicantType: 'Hindu Undivided Families (HUF)', eligibilityCriteria: 'Head of the family applying on behalf of family members', requiredDocuments: 'Head’s Identity Proof, Address Proof, Date of Birth Proof, Affidavit detailing the names and addresses of all coparceners, and Head’s Father’s Name' },
        { applicantType: 'Minors', eligibilityCriteria: 'Parents or legal guardians applying on behalf of the minor', requiredDocuments: 'Minor’s Date of Birth Proof, Parent’s Identity Proof, Aadhar Card of the minor' },
        { applicantType: 'A person with an Intellectual Disability', eligibilityCriteria: 'Applications made by a representative on behalf of the person', requiredDocuments: 'Representative’s Identity and Address Proof, along with necessary legal documentation specifying their status as a representative' },
    ]
    const panTransation = [
        { transaction: 'Purchase or sale of immovable property', amount: '5,00,000' },
        { transaction: 'Purchase or sale of vehicles (excluding two-wheelers)', amount: 'Not specified by the amount' },
        { transaction: 'Payments to hotels and restaurants', amount: '25,000' },
        { transaction: 'Payments related to international travel', amount: '25,000' },
        { transaction: 'Bank deposits', amount: '50,000' },
        { transaction: 'Purchase of bonds', amount: '50,000' },
        { transaction: 'Purchase of shares', amount: '50,000' },
        { transaction: 'Purchase of insurance policies', amount: '50,000' },
        { transaction: 'Investments in mutual funds', amount: 'Not specified by the amount' },
        { transaction: 'Purchase of jewelry and bullion', amount: '5,00,000' },
        { transaction: 'Transferring funds out of India', amount: 'Not specified by the amount' },
        { transaction: 'Transferring money from NRE to NRO account', amount: 'Not specified by the amount' },
    ]
    return (
        <>
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
                            PAN Card - What is PAN, Its Importance, and How to Apply
                        </h1>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            You must know the need for the right KYC documents when opening an account or booking a ticket. While the Aadhar card acts as both address and identity proof, there is a document that acts as your identity proof only. Whether you are a working professional or a businessman, this document is quite important. Yes, you read it right. It is the PAN card.
                        </p>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            While most of you must be aware of what a PAN card is and why you might need it, you should be aware of a few aspects of the PAN card. So, let us explore the details of the PAN card in this article and address a few important questions that revolve around the same.
                        </p>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            So, let us get started without further delay.
                        </p>
                        <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Understand PAN Card
                        </h2>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            A PAN (Permanent Account Number) card is a crucial document issued by the Income Tax Department in India. It is a unique identifier for financial transactions, helping track and manage tax-related activities. Each PAN is a ten-character alphanumeric code specific to an individual or entity, which makes it a vital element for financial integrity and tax compliance.
                        </p>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            A PAN card is essential for many financial tasks, such as opening a bank account, receiving taxable salary or professional fees, purchasing high-value items, or trading stocks. Not only does it function as a proof of identity, but it is also necessary for all tax-paying entities in the country, making it indispensable for financial and investment-related activities.
                        </p>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            The application process for obtaining a PAN card is straightforward. It can be done online through the official portals of NSDL and UTIITSL or by submitting a form at any authorized center. The required documents typically include proof of identity, address, date of birth, and recent photographs.
                        </p>
                        <h3 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Highlights of the PAN Card:
                        </h3>
                        <div className="text-[#212529] text-[15px] font-normal longform-list mb-[40px] blog-Post-detail-table">
                            <table border="1" cellPadding="1" cellSpacing="1" className="w-[500px]">
                                <tbody>
                                    <tr>
                                        <td>Feature</td>
                                        <td>Detail</td>
                                    </tr>
                                    {panTableData.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.identityProof}</td>
                                            <td>{row.addressProof}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            History of the PAN Card in India
                        </h2>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            Before the PAN card was introduced, tax identification in India was managed through the General Index Registrar (GIR) number. This number was assigned by assessing officers to tax-paying entities, but it was not unique nationally, leading to errors and issues in tax assessment. The Permanent Account Number (PAN) system was introduced to resolve these challenges and standardize tax-related identification.
                        </p>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            The concept of PAN was first proposed in 1972 and became a legal requirement under Section 139A of the Income Tax Act of 1961. Initially, PAN was optional, but it became mandatory for all taxpayers by 1976.
                        </p>
                        <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Types of PAN Card in India
                        </h2>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            PAN (Permanent Account Number) cards are issued to various entities and individuals to facilitate tax and financial transactions. Below is a detailed overview of the different types of PAN cards tailored for specific groups:
                        </p>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            PAN Card for Individuals
                        </h3>
                        <ul className='list-inside list-disc mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Target Group:</b> This PAN card is issued to Indian citizens and Non-Resident Indians (NRIs) who undertake financial transactions and are liable to pay taxes in India.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Purpose:</b> It is essential for various financial tasks, such as filing income tax returns, opening a bank account, conducting high-value transactions, and more. It also serves as a widely accepted form of identity proof.
                            </li>
                        </ul>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            PAN Card for Companies
                        </h3>
                        <ul className='list-inside list-disc mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Target Group:</b> This PAN card is issued to all registered companies, including private limited, public limited, and other corporate forms.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Purpose:</b> Companies must have this type of PAN card to conduct financial transactions and meet their tax obligations effectively.
                            </li>
                        </ul>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            PAN Card for Cooperative Societies and Trusts
                        </h3>
                        <ul className='list-inside list-disc mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Target Group:</b> Cooperative societies and various types of trusts, such as educational, housing, and charitable trusts.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Purpose:</b> These entities require a PAN card to manage their finances, comply with tax laws, and handle donations or income effectively.
                            </li>
                        </ul>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            PAN Card for Business Units and Partnership Firms
                        </h3>
                        <ul className='list-inside list-disc mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Target Group:</b> This includes sole proprietorships and partnership firms.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Purpose:</b> A PAN card for these entities is essential to facilitate clear financial operations, comply with tax regulations, and maintain financial transparency.
                            </li>
                        </ul>
                        <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            PAN Card Format and Details
                        </h2>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            The PAN card is a laminated plastic card containing several details of the cardholder that conform to Know Your Customer (KYC) rules. Below is an explanation of the information included on the PAN card:
                        </p>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Details Included on the PAN Card:
                        </h3>
                        <div className="text-[#212529] text-[15px] font-normal longform-list mb-[40px] blog-Post-detail-table">
                            <table border="1" cellPadding="1" cellSpacing="1" className="w-[500px]">
                                <tbody>
                                    <tr>
                                        <td>Detail</td>
                                        <td>Description</td>
                                    </tr>
                                    {panDetailData.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.detail}</td>
                                            <td>{row.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            PAN Number Structure:
                        </h3>
                        <div className="text-[#212529] text-[15px] font-normal longform-list mb-[40px] blog-Post-detail-table">
                            <table border="1" cellPadding="1" cellSpacing="1" className="w-[500px]">
                                <tbody>
                                    <tr>
                                        <td>Position</td>
                                        <td>Represents</td>
                                        <td>Detail</td>
                                    </tr>
                                    {panStructure.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.position}</td>
                                            <td>{row.represents}</td>
                                            <td>{row.panDetail}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            Now, with this, the code for the taxpayer category also changes, so it's important to know the same. Here are the details of the same:
                        </p>
                        <div className="text-[#212529] text-[15px] font-normal longform-list mb-[40px] blog-Post-detail-table">
                            <table border="1" cellPadding="1" cellSpacing="1" className="w-[500px]">
                                <tbody>
                                    <tr>
                                        <td>Code</td>
                                        <td>Entity Type</td>
                                    </tr>
                                    {panCode.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.alphabet}</td>
                                            <td>{row.panType}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Eligibility for Obtaining a PAN Card
                        </h2>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            While a PAN card is a mandatory document for all individuals and companies in India, it is equally important to know the eligibility criteria. The entities required to have a PAN include:
                        </p>
                        <div className="text-[#212529] text-[15px] font-normal longform-list mb-[40px] blog-Post-detail-table">
                            <table border="1" cellPadding="1" cellSpacing="1" className="w-[500px]">
                                <tbody>
                                    <tr>
                                        <td>Entity</td>
                                        <td>Criteria</td>
                                    </tr>
                                    {panEligibility.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.entity}</td>
                                            <td>{row.criteria}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            PAN is a critical tool for the Income Tax Department to prevent tax evasion and ensure a seamless tracking of financial transactions. It is instrumental not only for compliance but also for the financial empowerment of individuals and entities within the formal economic structure of India.
                        </p>
                        <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            How to Apply for a PAN Card: A Step-by-Step Guide
                        </h2>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            Applying for a PAN card can be done online and offline, offering flexibility depending on your access to the internet and personal preferences. Below is a more reader-friendly guide that includes clear steps and a table summarizing the necessary forms and documents for different categories of applicants.
                        </p>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Where to Apply Online
                        </h3>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            You can apply for a PAN card online through the following portals:
                        </p>
                        <ul className='list-inside list-disc mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Protean e-Gov Technologies Limite</b> (formerly NSDL): <Link href={'https://www.tin-nsdl.com/'} className='text-[#844FCF]'>
                                    NSDL Website
                                </Link>
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>UTI Infrastructure Technology And Services Limited</b> (UTIITSL): <Link href={'https://www.utiitsl.com/'} className='text-[#844FCF]'>
                                    UTIITSL Website
                                </Link>
                            </li>
                        </ul>
                        <h2 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Applying for a PAN Card through NSDL
                        </h2>
                        <ul className='list-inside list-decimal mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Visit NSDL Website:</b> Go to the official NSDL website and select the 'Application Type' option.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Choose Application Form:</b> Form 49A for Indian citizens or Form 49AA for foreign citizens.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Select Your Category:</b> Choose the category that best applies to you from the options provided.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Enter Personal Details:</b> Fill in details such as title (Shri, Smt, Kumari), surname, first name, middle name (if applicable), and date of birth.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Contact Information:</b> Provide your active email address and mobile number.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Submit Application:</b> Read the guidelines, enter the CAPTCHA code, and submit your application.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Make Payment:</b> Pay the application fee (₹93 for Form 49A or ₹864 for Form 49AA) using a preferred payment method.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Acknowledge and Mail:</b> Post submission, print the acknowledgment, affix a passport-size photo, sign it, and mail it with the required documents to the specified address.
                            </li>
                        </ul>
                        <h2 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Applying for a PAN Card through UTIITSL
                        </h2>
                        <ul className='list-inside list-decimal mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Access UTIITSL Website: </b> Visit the UTIITSL website and click 'For PAN Cards'.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Application Selection:</b> Choose 'Apply PAN Card' and select the appropriate form for your citizenship (Form 49A for Indians, Form 49AA for Foreigners).
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Filling the Form:</b> Fill out the form online, and choose 'Physical Mode' if you want a physical PAN card.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Submit and Pay:</b> Submit the form and pay using the available options.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Print and Send:</b> Print the acknowledgment receipt, affix your photo, sign it, and send it to the address provided, along with copies of your identity and proof of address.
                            </li>
                        </ul>
                        <h2 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Applying for a PAN Card Offline
                        </h2>
                        <ul className='list-inside list-decimal mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Download Form: </b> Visit the NSDL or UTIITSL website, download and print Form 49A or 49AA.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Complete the Form:</b> Fill out the form accurately and attach a recent passport-sized photograph.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Attach Documents:</b> Include necessary documents such as proof of identity and address.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Submit Payment:</b> Make the payment through a Demand Draft or as specified.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Mail the Application:</b> Send the completed form and documents to the provided NSDL or UTIITSL office address.
                            </li>
                        </ul>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Application Forms and Required Documents
                        </h3>
                        <div className="text-[#212529] text-[15px] font-normal longform-list mb-[40px] blog-Post-detail-table">
                            <table border="1" cellPadding="1" cellSpacing="1" className="w-[500px]">
                                <tbody>
                                    <tr>
                                        <td>Applicant Type</td>
                                        <td>Eligibility Criteria</td>
                                        <td>Required Documents</td>
                                    </tr>
                                    {applicationForm.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.applicantType}</td>
                                            <td>{row.eligibilityCriteria}</td>
                                            <td>{row.requiredDocuments}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            PAN Application by Foreign Nationals in India
                        </h2>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            Foreign nationals who intend to work or establish a subsidiary in India must apply for a PAN card by filling out Form 49AA. The required documents must be submitted along with the application form and the applicable fee. Below is a detailed breakdown of the necessary documentation:
                        </p>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Proof of Identity
                        </h3>
                        <ul className='list-inside list-disc mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Taxpayer Identification Number (TIN):</b> Issued in the country of residence and must be attested.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Citizenship Identification Number (CIN): </b> Also needs to be attested by the Ministry of External Affairs, Indian High Commission, or Embassy.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Passport/OCI card/PIO card:</b> Valid documents that can prove identity.
                            </li>
                        </ul>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            Documents must be attested by the country’s consulate where the applicant resides or by an overseas authorized official of an Indian scheduled bank branch.
                        </p>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Proof of Address
                        </h3>
                        <ul className='list-inside list-disc mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Taxpayer Identification Number (TIN):</b> As mentioned above.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Citizenship Identification Number (CIN): </b> As mentioned above.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Passport/OCI card/PIO card: </b> This is for identity proof and address verification.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Bank statement: </b> Must be from the country where the applicant resides.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>NRE (Non-Resident External) Account statement:</b> A statement from an NRE account opened in India.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Certificate of Residence Address in India: </b> Issued by Police Authorities or Foreigner’s Registration Office.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Contract/Letter/Visa:</b> Provided by an Indian company, which includes address details.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Address Proof:</b> Issued by the Indian employer.
                            </li>
                        </ul>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            Similar to the proof of identity, these documents need attestation as specified.
                        </p>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Additional Documents for Foreign Entities
                        </h3>
                        <ul className='list-inside list-disc mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Registration Certificate or Approval Copy:</b> A copy of the registration certificate or approval from Indian authorities to open an office in India. This proves the entity’s intent to establish a presence in India.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Photocopy of the Entity’s Registration Certificate:</b> Issued by the country where the entity is located, requiring attestation by the Ministry of External Affairs, High Commission, or an Indian Embassy. Attestation can also be completed at the country’s consulate or by an overseas authorized official of an Indian scheduled bank branch.
                            </li>
                        </ul>
                        <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Do's and Don'ts for PAN Application
                        </h2>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            Now that you know how to apply for the PAN card, let us explore the common dos and dont’s.
                        </p>
                        <h3 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Do:
                        </h3>
                        <ul className='list-inside list-disc mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Use Full Names:</b> Avoid initials; use your full legal name as proof of identity.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Write Clearly:</b> Use capital letters for better readability.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Provide Accurate Information:</b> Ensure all details match with the documents provided.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Attach Photos:</b> Include two recent color passport-size photographs.
                            </li>
                        </ul>
                        <h3 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Don't:
                        </h3>
                        <ul className='list-inside list-disc mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Make Corrections on the Form:</b> Any alterations can lead to application rejection.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Overwrite:</b> Fill out the form neatly without overwriting.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Use Pins or Staples on the Photograph:</b> Attach photos without damaging them.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Apply for Multiple PANs:</b> Do not apply for a new PAN if you already possess one; instead, request a duplicate.
                            </li>
                        </ul>
                        <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Uses of PAN Card
                        </h2>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            As shared, a PAN card acts as identity proof, which makes this one of the primary reasons to have a PAN card. But apart from this, there are other additional uses as well, which are discussed below:
                        </p>
                        <ul className='list-inside list-disc mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Identity Proof:</b> Recognized by all governmental and financial institutions as a valid form of identity.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Taxation:</b> Essential for filing income tax returns and communicating with the Income Tax Department.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Financial Transactions:</b> Required for opening a bank account, receiving a salary, or registering a business.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>High-Value Purchases:</b> Mandatory for transactions involving large amounts, such as buying real estate or a vehicle.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Investment Tracking:</b> Necessary for investing in securities and mutual funds, facilitating easy tracking of financial investments.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Foreign Exchange:</b> Needed for foreign currency transactions within India or investments abroad.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Loan Applications:</b> These are required by banks and financial institutions to process loans and credit cards.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Avoiding Tax Deduction:</b> Helps prevent excessive tax deduction at source on earnings like interest from deposits if linked with bank accounts.
                            </li>
                        </ul>
                        <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Transactions Requiring PAN Card
                        </h2>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            These are the basic uses of PAN cards, but you should also be aware of some value-linked uses. These financial transactions can only be completed with a valid PAN card. So, here are the details to know:
                        </p>
                        <div className="text-[#212529] text-[15px] font-normal longform-list mb-[40px] blog-Post-detail-table">
                            <table border="1" cellPadding="1" cellSpacing="1" className="w-[500px]">
                                <tbody>
                                    <tr>
                                        <td>Transaction</td>
                                        <td>Minimum Amount (INR)</td>
                                    </tr>
                                    {panTransation.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.transaction}</td>
                                            <td>{row.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Importance of PAN Card
                        </h2>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            There is no doubt that a PAN card is an important document. It helps you to not only file taxes but also simplify your transactions. With all these, owing a PAN card is important, But before that, here are some of the important reasons why you must have a PAN card:
                        </p>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            1. Essential for Filing Income Tax Returns
                        </h3>
                        <ul className='list-inside list-disc mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Necessity for Taxpayers:</b> All individuals and entities that fall under the income tax bracket must file income tax returns (ITR). A PAN card is essential for this process, as it is the primary identifier used by the Income Tax Department.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Filing Requirement:</b> Without a PAN, it becomes legally impossible to file an ITR, which is crucial not only for compliance but also for applying for loans, visas, and other financial services.
                            </li>
                        </ul>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            2. Recognized as a Valid Identity Proof
                        </h3>
                        <ul className='list-inside list-disc mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Wide Acceptance:</b> The PAN card is accepted as a valid form of identity across all financial institutions and many other organizations, similar to the Voter ID and Aadhaar card.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Utility in Financial Transactions:</b> It's particularly useful for KYC (Know Your Customer) purposes, opening bank accounts, and conducting high-value transactions.
                            </li>
                        </ul>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            3. Crucial for Taxation
                        </h3>
                        <ul className='list-inside list-disc mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Avoid Higher TDS:</b> Linking the PAN with bank accounts is important to avoid higher rates of TDS (Tax Deducted at Source). For instance, if annual interest earnings on savings exceed ₹10,000 and the account is not linked with PAN, banks will deduct TDS at 30% instead of the standard 10%.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative pl-[2%] max-md:pl-[4%] max-md:pb-[2%] max-sm:pb-[4%] max-sm:pl-[8%] pb-[1%] leading-[28px]'>
                                <b>Tax Compliance:</b> PAN facilitates the smooth operation of the taxation system by ensuring that all financial earnings are properly tracked and taxed accordingly.
                            </li>
                        </ul>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            4. Facilitates Claiming Income Tax Refund
                        </h3>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            Often, the TDS deducted might be more than the actual tax liability. You must have a PAN linked to your bank account to claim a refund of the excess tax paid. This linking also streamlines the refund process, ensuring quick and direct credit to your account.
                        </p>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            4. Mandatory for Business Operations
                        </h3>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            Any company or business entity must have a registered PAN to operate legally in India. This is required to obtain a Tax Registration Number (TRN), crucial for all business-related financial transactions and tax compliance.
                        </p>
                        <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Tracking and Verifying Your PAN Card
                        </h2>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            Navigating through the process of tracking and verifying your PAN card is straightforward. Here's a detailed guide to help you check the delivery status and effectively verify your PAN card's details.
                        </p>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Tracking through UTIITSL
                        </h3>
                        <ul className='mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 1: Visit the official UTIITSL website.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 2: Click on the 'Track your PAN card' section.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 3: Enter your application coupon number or PAN number.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 4: Input the captcha code and click 'Submit' to view the delivery status.
                            </li>
                        </ul>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Tracking through NSDL
                        </h3>
                        <ul className='mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 1: Go to the NSDL website.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 2: Select 'Track your PAN/TAN Application Status' under the PAN Services section.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 3: Enter your acknowledgment number.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 4: Fill in the captcha, then click 'Submit' to check the status.
                            </li>
                        </ul>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Tracking Through Indian Post
                        </h3>
                        <ul className='mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 1: Access the India Post tracking website.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 2: Select 'Track Consignment'.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 3: Enter the consignment number related to the delivery of your PAN card.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 4: Complete the captcha verification and click 'Track Now' to get the delivery status.
                            </li>
                        </ul>
                        <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            How to Verify PAN Card Details
                        </h2>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            Applying for and receiving a PAN card does not end the process. As of today, you need to verify this as well. Here are the ways you can do the same.
                        </p>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            1. PAN Verification by Aadhaar Card
                        </h3>
                        <ul className='mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 1: Visit the Income Tax Department e-filing portal.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 2: Click 'Link Aadhaar' in the 'Quick Links' section.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 3: Enter your PAN and Aadhaar numbers.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 4: Click 'View Link Aadhaar Status' to verify if your PAN is linked to Aadhaar and check the linkage status.
                            </li>
                        </ul>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            2. PAN Verification by Date of Birth and Name
                        </h3>
                        <ul className='mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 1: Navigate to the 'Verify Your PAN Details' section on the Income Tax e-filing portal.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 2: Enter your PAN, name, and date of birth.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 3: Click 'Submit' to verify whether the entered details match the database records.
                            </li>
                        </ul>
                        <h3 className="text-[#6e6e6e] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[20px] lg:text-[16px] md:text-[18px] leading-[50px] max-[576px]:text-[16px] max-[479px]:text-[16px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            3. PAN Verification by PAN Number
                        </h3>
                        <ul className='mt-2 '>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 1: Go to the Income Tax website's 'Verify Your PAN Details' section.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 2: Input your PAN number along with other required details.
                            </li>
                            <li className='text-[16px] max-[820px]:text-[15px] max-md:text-[15px] relative max-md:pb-[2%] max-sm:pb-[4%] pb-[1%] leading-[28px]'>
                                Step 3: Click 'Continue' to verify and view the PAN details.
                            </li>
                        </ul>
                        <h2 className="text-[#212529] max-sm:text-[18px] max-sm:leading-7 head-text xl:text-[26px] lg:text-[20px] md:text-[24px] leading-[50px] max-[576px]:text-[20px] max-[479px]:text-[18px] font-semibold max-[479px]:w-full md:leading-[40px] xl:leading-[48px]">
                            Conclusion
                        </h2>
                        <p className="text-[#212529] text-[15px] font-normal my-2">
                            Successfully applying for, tracking, and verifying your PAN card is crucial for engaging in various financial activities within India. Whether you're applying online through NSDL UTIITSL or offline, understanding each step of the process ensures a smooth experience. Similarly, tracking and verifying your PAN card helps maintain the security of your financial identity and ensures that all your records are up-to-date.
                        </p>
                    </div>
                    <div className="col-span-4 xl:w-fit space-y-6 max-[768px]:col-span-5 h-auto max-[576px]:col-span-12 max-sm:pt-[0px] recent-blog">
                        <CheckCibilCard cardData={eligibilityData} position={'3'} title={'Check Eligibility'} />
                        <div className="h-auto bg-white rounded-2xl mt-5">
                            <div className="mb-3">
                                <div className="border-b-[1px] h-[50px] border-[#E6ECF1]">
                                    <p className="text-[15px] font-semibold py-3 pl-5 text-[#212529]">Pan Card</p>
                                </div>
                                <div className="listCibil">
                                    <div className="px-5 py-[9.5px] border-b">
                                        <Link href={'/pan-card'} prefetch={false} className="text-[#212529] text-[15px] font-medium recent-post">
                                            Pan Card
                                        </Link>
                                    </div>
                                    <div className="px-5 py-[9.5px] border-b">
                                        <Link href={'/pan-card'} prefetch={false} className="text-[#212529] text-[15px] font-medium recent-post">
                                            Pan Card
                                        </Link>
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
