
let puppeteer;
if (process.env.BLESS_TOKEN) {
  puppeteer = require('puppeteer-core');
} else {
  puppeteer = require('puppeteer');
}

// Example of what the movieLink looks like:
// fetchMovieIframeURL('https://primewire.mx/watch-movie/watch-spider-man-into-the-spider-verse-sequel-online-66674');
export const fetchMovieIframeURL = async (movieLink) => {
	let browser
  if (process.env.BLESS_TOKEN) {
		 browser = await puppeteer.connect({
			browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`,
		})
  } else {
		browser = await puppeteer.launch({
			headless: 'new',
		});
	}

  const page = await browser.newPage();

  await page.goto(movieLink);

  const iframeSrc = await page.evaluate(() => {
    const iframe = document.getElementById('iframe-embed');
    return iframe ? iframe.src : null;
  });

  await browser.close();

  return iframeSrc;
};
