<template>
  <div class="container">
    <div class="row" v-if="city && weather">
      <div class="weather col-md-8">
        <p class="date">{{ dateTime }}</p>
        <div class="row">
          <div id="weather" class="col-6 text-center">
            <img :src="getWeatherIcon(weather.weather[0].icon)" :title="weather.weather[0].main">
            <p>{{weather.weather[0].description}}</p>
          </div>
          <div id="temperature" class="col-6 text-center">
            {{weather.main.temp}} <i class="fas fa-temperature-high"></i>
          </div>
        </div>
        <div class="row">
          <div class="pressure col-4 text-center">
            <i class="far fa-compass"></i>
            <span>Pressure</span>
          </div>
          <div class="humidity col-4 text-center">
            <i class="fas fa-tint"></i>
            <span>Humidity</span>
          </div>
          <div class="wind col-4 text-center">
            <i class="fas fa-wind"></i>
            <span>Wind</span>
          </div>
        </div>
        <div class="row">
          <span class="col-4 text-center">{{getPressure(weather.main.pressure) }} mm hg</span>
          <span class="col-4 text-center">{{weather.main.humidity}} %</span>
          <span class="col-4 text-center">{{weather.wind.speed}} m/s</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "WeatherCurrent",
    props: ['city'],
    data() {
      return {
        weather: null,
      }
    },
    computed: {
      dateTime()
      {
        let options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          hour: 'numeric',
          minute: 'numeric',
        };
        return new Date().toLocaleString("en-US", options);
      },
    },
    watch: {
      city(){
        this.getWeather()
      }
    },
    methods: {
      getWeather() {
        let openWeatherUrl = "http://api.openweathermap.org/data/2.5/";
        let openWeatherAppId = "6ea35fbcd51d5e917b7d8309292bc51c";
        let typeForecast = "weather";
        let units = "metric";
        let city = this.city;
        let url = `${openWeatherUrl}${typeForecast}?q=${city}&units=${units}&APPID=${openWeatherAppId}`;
        axios
          .get(url)
          .then(({data}) => {
            this.weather = data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      getWeatherIcon(icon) {
        return `http://openweathermap.org/img/w/${icon}.png`;
      },
      getPressure(pressure) {
        return (pressure / 1.33).toFixed(2);
      },
    },
  }
</script>

<style lang="scss" scoped>
  $w-color: rgba(101, 85, 157, 0.5);
  $w-color-hover: rgba(128, 53, 92, 0.5);

  .weather {
    border: 2px solid white;
    margin: 20px auto;
    background-color: $w-color;
    border-radius: 20px;
    color: white;
    .date {
      margin-top: 10px;
      color: white;
      text-align: center;
      font-size: 20px;
    }
    &:hover {
      background-color: $w-color-hover;
    }
  }
  #weather{
    font-size: 18px;
  }
  #temperature {
    margin: auto;
    font-size: 50px;
  }
  .pressure, .humidity, .wind {
    border-top: 2px solid white;
    border-bottom: 2px solid white;
    font-size: 20px;
  }
</style>
