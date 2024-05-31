import Head from 'next/head'

const HeadTagContentComponent = ({ metaInfo, businessmetaheadtag }) => {
  const getOgUrl = typeof window !== 'undefined' && window?.location?.href
  const modifiedUrl = typeof window !== 'undefined' && window.location.origin + window.location.pathname
  const CDN_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const CDN_URL_http = CDN_URL.replace('https', 'http')

  return (
    <>
      <Head>
        <title>
          {
            metaInfo?.pageTitle}
        </title>
        <link rel='canonical' href={modifiedUrl} />
        <meta name='description' content={businessmetaheadtag?.meta_description || metaInfo?.pageDescription} />
        {process.env.NEXT_PUBLIC_WEBSITE_URL == 'www.banksathi.com' ? (
          <meta name='robots' content='index,follow' />
        ) : (
          <meta name='robots' content='noindex,nofollow' />
        )}
        <meta name='og:title' content={businessmetaheadtag?.og_title || metaInfo?.ogTitle} />
        <meta name='og:type' content={businessmetaheadtag?.og_type || metaInfo?.ogType} />
        <meta name='og:url' content={getOgUrl} />
        <meta name='og:description' content={businessmetaheadtag?.og_description || metaInfo?.ogDescription} />
        <meta
          name='og:image'
          content={
            businessmetaheadtag?.og_image == null || undefined
              ? CDN_URL_http
              : CDN_URL_http + '/' + businessmetaheadtag?.og_image
          }
        />
        <meta
          name='og:image:secure'
          content={
            businessmetaheadtag?.og_image == null || undefined ? CDN_URL : CDN_URL + '/' + businessmetaheadtag?.og_image
          }
        />

        <meta name='og:image:width' content='300' />
        <meta name='og:image:height' content='300' />
        <meta name='og:image:alt' content={businessmetaheadtag?.og_image_alt || metaInfo?.ogImageAlt} />
        <meta name='og:image:type' content={businessmetaheadtag?.og_image_type || metaInfo?.ogImageType} />
        <meta name='og:site_name' content={businessmetaheadtag?.og_site_name || metaInfo?.ogSiteName} />
        <meta name='twitter:card' content={businessmetaheadtag?.twitter_card || metaInfo?.twitterCard} />
        <meta name='twitter:site' content={businessmetaheadtag?.twitter_sit || metaInfo?.twitterSite} />
        <meta name='twitter:title' content={businessmetaheadtag?.twitter_title || metaInfo?.twitterTitle} />
        <meta name='twitter:description' content={businessmetaheadtag?.twitter_description || metaInfo?.twitterDes} />
        <meta
          name='twitter:image'
          content={
            businessmetaheadtag?.twitter_image == null || undefined
              ? CDN_URL
              : CDN_URL + '/' + businessmetaheadtag?.twitter_image
          }
        />
        <meta name='twitter:image:alt' content={businessmetaheadtag?.twitter_img_alt || metaInfo?.ogSiteName} />
        <link rel='icon' sizes='192x192' href='/favicon.ico' prefetch={false} />
        <link rel='apple-touch-icon' href='/favicon.ico' prefetch={false}></link>
      </Head>
    </>
  )
}

export default HeadTagContentComponent
