import 'bootstrap';
import fontawesome from '@fortawesome/fontawesome-free/js/fontawesome'
import solid from '@fortawesome/fontawesome-free/js/solid'
import regular from '@fortawesome/fontawesome-free/js/regular'
import brands from '@fortawesome/fontawesome-free/js/brands'

import Vue from 'vue'
import WeatherForecast from "./components/WeatherForecast";
import WeatherCurrent from "./components/WeatherCurrent";
import ForecastTable from "./components/ForecastTable";

Vue.component('weather-forecast', WeatherForecast);
Vue.component('weather-current', WeatherCurrent);
Vue.component('forecast-table', ForecastTable);

new Vue({
  el: '#app',
});
