const path = require('path');
const tmp = require('tmp');
const tmpDir = tmp.dirSync({ mode: '0750', prefix: 'integrationTestsTmpDir-' });

exports.config = {
  specs: [path.join(__dirname, './integration/**/*-tests.js')],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        log: { level: 'trace' },
        prefs: {
          'browser.download.panel.shown': false,
          'browser.helperApps.neverAsk.openFile': 'text/plain',
          'browser.helperApps.neverAsk.saveToDisk': 'text/plain',
          'browser.download.folderList': 2,
          'browser.download.dir': `${tmpDir.name}`
        }
      }
    }
  ],
  pageLoadStrategy: 'normal',
  watch: false,
  async: true,
  logLevel: 'error',
  coloredLogs: true,
  deprecationWarnings: true,
  bail: 0,
  screenshotOnReject: false,
  baseUrl: 'http://localhost:8081',
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['firefox-profile'],
  framework: 'mocha',
  reporters: ['dot', 'spec', 'html-format'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 300000,
    compilers: ['js:babel-register']
  }
};