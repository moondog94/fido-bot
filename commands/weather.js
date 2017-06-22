const Command = require('./command');
const openWeather = require('openweather-apis');
const promisify = require('es6-promisify');
const googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyDhFQWvekZuz1bJ8n85HL_LLdDDQjtDnnM'
});

//Set up weather
openWeather.setLang('en');
openWeather.setUnits('imperial');
openWeather.setAPPID(process.env.WEATHER_KEY);

const simplifyWeather = (description, code) => {

	const simple = description.replace(/\b\w/g, l => l.toUpperCase());

	switch (code) {
		case 800:
			return simple + ' :sunny:';
			break;
		case 801:
		case 802:
		case 803:
		case 804:
			return simple + ' :white_sun_cloud:';
		case 900:
			return simple + ' :cloud_tornado:';
			break;
		case 901:
		case 902:
			return simple + ' :cyclone:';
			break;
		case 906:
			return simple + ' :snowflake:';
		default:
			break;
	}

	if(code >= 700) {
		return simple + ' :fog:';
	} else if(code >= 600) {
		return simple + ' :cloud_snow:';
	} else if(code >= 500) {
		return simple + ' :cloud_rain:';
	} else if(code >= 300) {
		return simple + ' :white_sun_rain_cloud:';
	} else {
		return simple + ' :thunder_cloud_rain:';
	}

	return simple;
};

class Weather extends Command {
	constructor(cmd, params) {
		super(cmd, params, '!fetch weather <address>	Get current weather')
	}

	async runCommand() {
		// Check if there are params
		if(this.params.length <= 0)
			return "I need an address, city, or zip code to get you the weather :sunny:"
		// Geocode an address.
		// Promisifying it
		const geocode = promisify(googleMapsClient.geocode, googleMapsClient);
		const response = await geocode({ address: this.params.join(' ') }).catch(err => {
			return "It seems I can't find location"
		});
		if(response.json.status === 'ZERO_RESULTS')
			return "It looks I can't find that particular location :dog:"

		const lat = response.json.results[0].geometry.location.lat;
		const lng = response.json.results[0].geometry.location.lng;
		openWeather.setCoordinate(lat,lng);

		const getSmartJSON = promisify(openWeather.getSmartJSON, openWeather);
		const getWeatherForecastForDays = promisify(openWeather.getWeatherForecastForDays, openWeather);

		const smartPromise = getSmartJSON();
		const forecastPromise = getWeatherForecastForDays(2);

		const [smart, forecast] = await Promise.all([smartPromise, forecastPromise]).catch(err => console.error(err));

		const currentInfo = simplifyWeather(smart.description,smart.weathercode);

		const todayForecast = simplifyWeather(forecast.list[0].weather[0].description, forecast.list[0].weather[0].id);
		const tomorrowForecast = simplifyWeather(forecast.list[1].weather[0].description, forecast.list[1].weather[0].id);
	
		return `**The current weather in *${forecast.city.name}*:** ${smart.temp}° F, ${currentInfo}\n\n**Today's forecast:**\n\t__High:__ ${forecast.list[0].temp.max}° F\n\t__Low:__ ${forecast.list[0].temp.min}\n\t__Weather:__ ${todayForecast}\n\n**Tomorrow's Forecast:**\n\t__High:__ ${forecast.list[1].temp.max}° F\n\t__Low:__ ${forecast.list[1].temp.min}\n\t__Weather:__ ${tomorrowForecast}`;
	}
}

module.exports = Weather;