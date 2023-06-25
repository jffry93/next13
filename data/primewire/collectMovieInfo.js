const puppeteer = require('puppeteer');

// Example of what the movieLink looks like:
// fetchMovieIframeURL('https://primewire.mx/watch-movie/watch-spider-man-into-the-spider-verse-sequel-online-66674');
export const fetchMovieIframeURL = async (movieLink) => {
  console.log(movieLink);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(movieLink);

  const iframeSrc = await page.evaluate(() => {
    const iframe = document.getElementById('iframe-embed');
    return iframe ? iframe.src : null;
  });

  await browser.close();

  return iframeSrc;
};
