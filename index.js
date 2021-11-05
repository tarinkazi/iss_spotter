//const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');

const { nextISSTimesForMyLocation } = require('./iss');


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);

});
/*

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('142.122.117.6', (error, data) => {

  if (error) {
    console.log(`It didn't work`, error);
    return;
  }
  console.log(`It Work:${data}`);
  

});

fetchISSFlyOverTimes({ latitude: '43.7306', longitude: '-79.4217' },(error, data) => {
  if (error) {
    console.log('eror occured',error);
    return;
  }
  console.log(`It worked   data;${data}`);


});
*/