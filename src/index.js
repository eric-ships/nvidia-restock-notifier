const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');
const twilio = require('twilio');

const DENNYS_NUMBER = '+19088124966';
const ERICS_NUMBER = '+18624853763';
const NVIDIA_1070_URL = 'https://www.nvidia.com/en-us/geforce/products/10series/geforce-gtx-1070-ti/';
const NVIDIA_1080TI_URL = 'https://www.nvidia.com/en-us/geforce/products/10series/geforce-gtx-1080-ti/';
const REFRESH_INTERVAL_IN_SECONDS = 5;
const TWILIO_NUMBER = '+16469418448';

const accountSid = 'ACc0a686b46b2b76db54f3c5fd64eb898a'; // Your Account SID from www.twilio.com/console
const authToken = 'f4a939990587aaa19370118a6066f62c';   // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);

// Nvidia 1070
setInterval(
  (async function() {
    console.log(`${new Date().toTimeString()}: Checking for 1070...`);

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
        const body = '1070 IS NOW IN STOCK ' + NVIDIA_1070_URL;

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

      console.log(`${new Date().toTimeString()}: ${output}`);

      protocol.close();
      chrome.kill();
    });
  }),
  REFRESH_INTERVAL_IN_SECONDS * 1000,
);

// Nvidia 1080Ti
setInterval(
  (async function() {
    console.log(`${new Date().toTimeString()}: Checking for 1080Ti...`);

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
        const body = '1080Ti IS NOW IN STOCK ' + NVIDIA_1080TI_URL;

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

      console.log(`${new Date().toTimeString()}: ${output}`);

      protocol.close();
      chrome.kill();
    });
  }),
  REFRESH_INTERVAL_IN_SECONDS * 1000,
);
