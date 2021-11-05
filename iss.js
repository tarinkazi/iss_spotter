const request = require('request');
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request("https://freegeoip.app/json/142.122.117.6", (error, response, body) => {
    if (error) {
      return callback(`${error}, data ${body}`,null);

    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    let data = JSON.parse(body);
  
    callback(null, `{latitude : ${data.latitude} , longitude : ${data.longitude}}`);
  });
  

};

module.exports = { fetchMyIP, fetchCoordsByIP };
