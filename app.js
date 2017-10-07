const yargs = require('yargs');

const weather = require('./weather/weather');
const geocode = require('./geocode/geocode');

const argv = yargs.options({
    a : {
      demand : true,
      alias : 'address',
      string : true,
      describe : 'address to be fetched'
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.lattitude, results.longitude, (errorMessage, weatherResults) => {
      if(errorMessage){
        console.log(errorMessage);
      } else {
        console.log(`current temperature is ${weatherResults.temperature}°C and it feels like ${weatherResults.apparentTemperature}°C`);
      }
    });
  }
});
