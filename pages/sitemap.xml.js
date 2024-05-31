//pages/sitemap.xml.js
import { BASE_URL } from '@/utils/alljsonfile/service'

const EXTERNAL_DATA_URL = `${BASE_URL}api/v1/site_map/generate_site_map_xml`

function generateSiteMap(posts) {
  return posts?.data;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const request = await fetch(EXTERNAL_DATA_URL , { method: 'POST'});
  const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap
