var QB = require('quickblox/quickblox.min');

var APPLICATION_ID = 96974;
var AUTH_KEY = "ALCpduSXrTrXqOK";
var AUTH_SECRET = "umkATnzeemtNefO";
var ACCOUNT_KEY = "sCsKya2UfPZdjdz-DT18";
var CONFIG = {
  // other settings
  /**
   * set { mode: 1 } or true to output to console,
   * set { mode: 2, file: 'log.txt' } to output to file,
   * set "false" to not output
   */
  debug: { mode: 1 }
};
QB.init(APPLICATION_ID, AUTH_KEY, AUTH_SECRET, ACCOUNT_KEY, CONFIG);

export default QB;
