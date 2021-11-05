const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

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