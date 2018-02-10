require('dotenv').config();
const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');
const moment = require('moment');
const twilio = require('twilio');

const {
  DENNYS_NUMBER,
  ERICS_NUMBER,
  NVIDIA_1070_URL,
  NVIDIA_1080TI_URL,
  REFRESH_INTERVAL_IN_SECONDS,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
} = process.env; // eslint-disable-line no-undef

const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const MOMENT_FORMAT = 'MMM Do, h:mm:ss a';

async function check1070() {
  console.log(`${moment().format(MOMENT_FORMAT)}: Checking for 1070...`);

  async function launchChrome() {
    return await chromeLauncher.launch({
      chromeFlags: [
        '--disable-gpu',
        '--headless',
      ],
    });
  }
  const chrome = await launchChrome();
  const protocol = await CDP({
    port: chrome.port,
  });

  const {
    DOM,
    Page,
    Runtime,
  } = protocol;
  await Promise.all([Page.enable(), Runtime.enable(), DOM.enable()]);

  Page.navigate({
    url: NVIDIA_1070_URL,
  });

  Page.loadEventFired(async() => {
    const expression = 'document.querySelector("#s-tab-2").textContent';
    const result = await Runtime.evaluate({
      expression,
    });
    const is1070OutOfStock = result.result.value.includes('Notify Me');

    if (!is1070OutOfStock) {
      const body = moment().format(MOMENT_FORMAT) + ' 1070 IS NOW IN STOCK ' + NVIDIA_1070_URL;

      client.messages.create({
        body,
        to: DENNYS_NUMBER,
        from: TWILIO_NUMBER,
      }).then((message) => console.log(`Sent to Denny's phone! ${message.sid}`));

      client.messages.create({
        body,
        to: ERICS_NUMBER,
        from: TWILIO_NUMBER,
      }).then((message) => console.log(`Sent to Eric's phone! ${message.sid}`));
    }

    const output = is1070OutOfStock
      ?  '1070 is out of stock'
      : '1070 IS IN STOCK!!! 1070 IS IN STOCK!!! 1070 IS IN STOCK!!!';

    console.log(`${moment().format(MOMENT_FORMAT)}: ${output}`);
  });
}

async function check1080Ti() {
  console.log(`${moment().format(MOMENT_FORMAT)}: Checking for 1080Ti...`);

  async function launchChrome() {
    return await chromeLauncher.launch({
      chromeFlags: [
        '--disable-gpu',
        '--headless',
      ],
    });
  }
  const chrome = await launchChrome();
  const protocol = await CDP({
    port: chrome.port,
  });

  const {
    DOM,
    Page,
    Runtime,
  } = protocol;
  await Promise.all([Page.enable(), Runtime.enable(), DOM.enable()]);

  Page.navigate({
    url: NVIDIA_1080TI_URL,
  });

  Page.loadEventFired(async() => {
    const expression = 'document.querySelector("#section1").textContent';
    const result = await Runtime.evaluate({
      expression,
    });
    const is1080TiOutOfStock = result.result.value.includes('Notify Me');

    if (!is1080TiOutOfStock) {
      const body = moment().format(MOMENT_FORMAT) + ' 1080Ti IS NOW IN STOCK ' + NVIDIA_1080TI_URL;

      client.messages.create({
        body,
        to: DENNYS_NUMBER,
        from: TWILIO_NUMBER,
      }).then((message) => console.log(`Sent to Denny's phone! ${message.sid}`));

      client.messages.create({
        body,
        to: ERICS_NUMBER,
        from: TWILIO_NUMBER,
      }).then((message) => console.log(`Sent to Eric's phone! ${message.sid}`));
    }

    const output = is1080TiOutOfStock
      ?  '1080Ti is out of stock'
      : '1080Ti IS IN STOCK!!! 1080Ti IS IN STOCK!!! 1080Ti IS IN STOCK!!!';

    console.log(`${moment().format(MOMENT_FORMAT)}: ${output}`);

    protocol.close();
    chrome.kill();
  });
}

function checkGPUs() {
  check1070();
  check1080Ti();
}

function init() {
  checkGPUs();

  setInterval(
    checkGPUs,
    +REFRESH_INTERVAL_IN_SECONDS * 1000,
  );
}

init();

