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
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
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

- [Puppeteer](https://github.com/GoogleChrome/puppeteer)
- [Puppeteer examples](https://github.com/checkly/puppeteer-examples)
