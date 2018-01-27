# Nvidia Restock Notifier

## Table of Contents

- [How to Use](#how-to-use)
- [Start Developing](#start-developing)
  - [Folder Structure](#folder-structure)
- [Resources](#resources)

## How to Use

| Technology                | Version     |
| ------------------------- | -----------:|
| node                      | 8.5.0       |
| yarn                      | 1.2.1       |

```
node src/index.js
```

## Start Developing

Make sure you have a `.env` file.

```
//.env
DENNYS_NUMBER = '+XXXXXXXXXX'
ERICS_NUMBER = '+XXXXXXXXXX'
NVIDIA_1070_URL = 'https://www.nvidia.com/en-us/geforce/products/10series/geforce-gtx-1070-ti/'
NVIDIA_1080TI_URL = 'https://www.nvidia.com/en-us/geforce/products/10series/geforce-gtx-1080-ti/'
REFRESH_INTERVAL_IN_SECONDS = 8
TWILIO_ACCOUNT_SID = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
TWILIO_AUTH_TOKEN = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
TWILIO_NUMBER = '+XXXXXXXXXX'
```

### Folder Structure

```
nvidia-restock-notifier/
  .env
  .eslintrc
  .gitignore
  README.md
  node_modules/
  package.json
  src/
    index.js
  yarn.lock
```

## Resources

- [Quick Tip: Getting Started with Headless Chrome in Node.js](https://www.sitepoint.com/headless-chrome-node-js/)
