
let puppeteer;
if (process.env.BLESS_TOKEN) {
  puppeteer = require('puppeteer-core');
} else {
  puppeteer = require('puppeteer');
}

// Example of what the movieLink looks like:
// fetchMovieIframeURL('https://primewire.mx/watch-movie/watch-spider-man-into-the-spider-verse-sequel-online-66674');
export const fetchMovieIframeURL = async (movieLink) => {
	console.log('🔗',movieLink)
	let browser = await puppeteer.launch({
    headless: 'new',
  });
  if (process.env.BLESS_TOKEN) {
		console.log('Bless has been found 😇')
		 browser = await puppeteer.connect({
			browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`,
		})
  }

	console.log('🌐',browser)

  const page = await browser.newPage();

	console.log('📈',page)

  await page.goto(movieLink);

  const iframeSrc = await page.evaluate(() => {
    const iframe = document.getElementById('iframe-embed');
    return iframe ? iframe.src : null;
  });
	console.log('🎥',iframeSrc)

  await browser.close();

	console.log('Closed the browser 🔐')

  return iframeSrc;
};
