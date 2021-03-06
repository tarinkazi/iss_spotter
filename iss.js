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
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(`${error}, data ${body}`,null);

    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    let data = JSON.parse(body);
  
    callback(null, `{latitude: ${data.latitude},longitude: ${data.longitude}}`);
  });
  

};

const fetchISSFlyOverTimes = function(coords, callback) {
  
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error,null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    //console.log(body);

    const pass2 = JSON.parse(body);
    //console.log(pass2.response);
    //const passes = JSON.parse(body).response;
    callback(null, pass2.response);




  });
  // ...
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    console.log(`My Ip: ${ip}`);

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      console.log(`My Ip: ${loc}`);

      fetchISSFlyOverTimes({latitude: '43.7306', longitude: '-79.4217'}, (error, nextPasses) => {
        if (error) {
          return callback(error, null);

        }
        //console.log(`My Ip: ${nextPasses}`);
        callback(null, nextPasses);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes,nextISSTimesForMyLocation };
