const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');

const NVIDIA_1070_URL = 'https://www.nvidia.com/en-us/geforce/products/10series/geforce-gtx-1070-ti/';
const NVIDIA_1080TI_URL = 'https://www.nvidia.com/en-us/geforce/products/10series/geforce-gtx-1080-ti/';

// Nvidia 1070
setInterval(
  (async function() {
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

      console.log({ is1070OutOfStock });

      protocol.close();
      chrome.kill();
    });
  }),
  5000,
);

// Nvidia 1080Ti
setInterval(
  (async function() {
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

      console.log({ is1080TiOutOfStock });

      protocol.close();
      chrome.kill();
    });
  }),
  5000,
);
