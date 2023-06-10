import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDescription = await page.$('.event .event__description');
    expect(eventDescription).toBeNull();
  });

  test('User can expand an event to see its description', async () => {
    await page.click('.event .details-btn');
    const eventDescription = await page.$('.event .event__description');
    expect(eventDescription).toBeDefined();
  });

  test('User can collapse an event to hide its description', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .event__description');
    expect(eventDetails).toBeNull();
  });
});

describe('Filter events by city', () => {
  let browser;
  let page;

  beforeAll(async () => {
    //jest.setTimeout(50000);
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ['--disable-extensions'], // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.EventList');
  });

  afterAll(() => {
    browser.close();
  });

  test('Displays all upcoming events when no city is selected', async () => {
    const eventList = await page.$('.EventList');
    expect(eventList).toBeDefined();
    const eventItems = await page.$$('.EventList li');
    expect(eventItems.length).toBeGreaterThan(0);
  });

  test('Displays suggested cities when typing in the city search input', async () => {
    await page.type('.CitySearch .city', 'Berlin', { delay: 100 });
    await page.waitForSelector('.suggestions li');
    const suggestions = await page.$$('.suggestions li');
    expect(suggestions.length).toBeGreaterThan(0);
  });

  test('Updates events when a city is selected from the suggestions', async () => {
    await page.click('.suggestions li');
    await page.waitForSelector('.EventList');
    const eventList = await page.$('.EventList');
    expect(eventList).toBeDefined();
    const eventItems = await page.$$('.EventList li');
    expect(eventItems.length).toBeGreaterThan(0);
  });
});
