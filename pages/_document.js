/* eslint-disable @next/next/inline-script-id */
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  // const jsonLD = {
  //   '@context': 'https://schema.org',
  //   '@type': 'Organization',
  //   name: 'Elite Strategies',
  //   legalName: 'BS Fintech Private Limited',
  //   url: 'http://www.banksathi.com',
  //   logo: ' https://www.banksathi.com/_next/static/media/BankSathi-Logo-white.58e72457.svg',
  //   foundingDate: '2021',
  //   founders: [
  //     {
  //       '@type': 'Person',
  //       name: 'Jitendra Singh'
  //     },
  //     {
  //       '@type': 'Person',
  //       name: 'Sandeep Kumar Kaler'
  //     }
  //   ],
  //   address: {
  //     '@type': 'PostalAddress',
  //     streetAddress: 'First Floor, Plot No 3/1, Attic Smart Square Complex, Above 3M Care & LBB, 100 Feet Rd',
  //     addressLocality: 'Binnamangala, Stage 1, Indiranagar,',
  //     addressRegion: 'KA',
  //     postalCode: '560038',
  //     addressCountry: 'IN'
  //   },
  //   contactPoint: {
  //     '@type': 'ContactPoint',
  //     contactType: 'customer support',
  //     telephone: '[+91-7412933933]',
  //     email: 'customer@banksathi.com'
  //   },
  //   sameAs: [
  //     'https://www.facebook.com/banksathi/',
  //     'https://twitter.com/banksathi1',
  //     'https://www.instagram.com/banksathi/',
  //     'https://in.linkedin.com/company/banksathi',
  //     'https://www.youtube.com/@banksathiplus/videos'
  //   ]
  // }
  function addOragnisationJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "BankSathi",
        "legalName": "BS Fintech Private Limited",
        "url": "https://www.banksathi.com",
        "logo": "https://www.banksathi.com/_next/static/media/BankSathi-Logo-white.58e72457.svg",
        "foundingDate": "2021",
        "founders": [
          {
            "@type": "Person",
            "name": "Jitendra Singh"
          },
          {
            "@type": "Person",
            "name": "Sandeep Kumar Kaler"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "First Floor, Plot No 3/1, Attic Smart Square Complex, Above 3M Care & LBB, 100 Feet Rd",
          "addressLocality": "Binnamangala, Stage 1, Indiranagar",
          "addressRegion": "KA",
          "postalCode": "560038",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "telephone": "+91-7412933933",
          "email": "customer@banksathi.com"
        },
        "sameAs": [
          "https://www.facebook.com/banksathi/",
          "https://twitter.com/banksathi1",
          "https://www.instagram.com/banksathi/",
          "https://in.linkedin.com/company/banksathi",
          "https://www.youtube.com/@banksathiplus/videos"
        ]
      }
      
  `
    }
  }
  return (
    <Html lang='en'>
      <Head>
        <Script
          strategy='lazyOnload'
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W9D3PRCF');`
          }}></Script>
        <script type='application/ld+json' key='app-ld-json' dangerouslySetInnerHTML={addOragnisationJsonLd()} />
        
      </Head>

      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W9D3PRCF"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}></noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
