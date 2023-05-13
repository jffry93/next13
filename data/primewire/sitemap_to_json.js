const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');

const sitemapUrl = 'https://primewire.mx/sitemap.xml'; // Replace with the actual sitemap URL

const fetchSitemap = async (url) => {
  try {
    const response = await axios.get(url);
    const xmlContent = response.data;
    const result = await xml2js.parseStringPromise(xmlContent);
    return result;
  } catch (error) {
    console.error(`Error fetching sitemap (${url}):`, error);
    return null;
  }
};

(async () => {
  const mainSitemap = await fetchSitemap(sitemapUrl);

  if (!mainSitemap) {
    console.error('Error fetching main sitemap');
    return;
  }

  const sitemapUrls = mainSitemap.sitemapindex.sitemap.map(
    (sitemap) => sitemap.loc[0]
  );

  const sitemapJsons = [];

  for (const sitemapUrl of sitemapUrls) {
    const sitemap = await fetchSitemap(sitemapUrl);

    if (!sitemap) {
      console.error(`Error fetching sitemap (${sitemapUrl})`);
      continue;
    }

    const entries = sitemap.urlset.url.map((url) => ({
      loc: url.loc[0],
      lastmod: url.lastmod ? url.lastmod[0] : null,
    }));

    sitemapJsons.push({
      sitemapUrl,
      entries,
    });
  }

  fs.writeFile(
    'data/primewire/sitemaps.json',
    JSON.stringify(sitemapJsons, null, 2),
    'utf8',
    (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('JSON file created successfully!');
      }
    }
  );
})();
