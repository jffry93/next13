let chrome = {};
let puppeteer;
if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
} else {
  puppeteer = require('puppeteer');
}

// Example of what the movieLink looks like:
// fetchMovieIframeURL('https://primewire.mx/watch-movie/watch-spider-man-into-the-spider-verse-sequel-online-66674');
export const fetchMovieIframeURL = async (movieLink) => {
  let option = {
    headless: 'new',
  };
  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    option = {
      headless: true,
      args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      ignoreHTTPSErrors: true,
    };
  }

  console.log(movieLink);
  const browser = await puppeteer.launch(option);
  const page = await browser.newPage();

  await page.goto(movieLink);

  const iframeSrc = await page.evaluate(() => {
    const iframe = document.getElementById('iframe-embed');
    return iframe ? iframe.src : null;
  });

  await browser.close();

  return iframeSrc;
};
