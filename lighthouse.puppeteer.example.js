/**
 * This script is run before every lighthouse run on the webpage.
 * @param {puppeteer.Browser} browser
 */
module.exports = async browser => {
  const page = await browser.newPage();

  // Login to the website using authorization HTTP header

  const authenticationString = process.env.AUTH_HEADER

  await page.setExtraHTTPHeaders({
    'authorization': `Basic ${authenticationString}`
  })
  await page.goto('https://staging.knxt.shop/api/auth/login')

  // Disable onetrust consent popin by setting the visited cookie
  // to true
  const today = new Date();
  const yesterday = new Date(today);

  await page.setCookie({
    name: 'OptanonConsent',
    value: `isGpcEnabled=0&datestamp=${encodeURIComponent(
      yesterday,
    )}&version=202208.1.0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A0%2CC0004%3A0&AwaitingReconsent=false&geolocation=%3B`,
    url: 'https://staging.knxt.shop',
  });

  await page.setCookie({
    name: 'OptanonAlertBoxClosed',
    value: yesterday.toISOString(),
    url: 'https://staging.knxt.shop',
  });


  await page.close();
};
