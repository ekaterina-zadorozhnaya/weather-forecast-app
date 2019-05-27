<template>
  <div class="container" >
    <p class="text-center">Average temperature : {{ avgTemperature }}</p>

    <table class="table table-hover">
      <thead>
      <tr>
        <th><i class="fas fa-clock"></i> Time</th>
        <th><i class="fas fa-image"></i> Icon</th>
        <th><i class="fas fa-thermometer-half"></i> Temp</th>
        <th><i class="fas fa-thermometer-quarter"></i> Tmin</th>
        <th><i class="fas fa-thermometer-three-quarters"></i> Tmax</th>
        <th><i class="fas fa-list-alt"></i> Weather</th>
        <th><i class="far fa-compass"></i> Pressure</th>
        <th><i class="fas fa-tint"></i> Humidity</th>
        <th><i class="fas fa-wind"></i> Wind speed</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(forecastItem, index) in sourceData">
        <td>{{ getTime(forecastItem.dt_txt)}}:00</td>
        <td><img :src="getWeatherIcon(forecastItem.weather[0].icon)" :title="forecastItem.weather[0].main"></td>
        <td>{{ forecastItem.main.temp }} &deg;C</td>
        <td>{{ forecastItem.main.temp_min }} &deg;C</td>
        <td>{{ forecastItem.main.temp_max }} &deg;C</td>
        <td>{{ forecastItem.weather[0].description }}</td>
        <td>{{ getPressure(forecastItem.main.pressure) }} mm hg</td>
        <td>{{ forecastItem.main.humidity }} %</td>
        <td>{{ forecastItem.wind.speed }} m/s</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "ForecastTable",
    props: ['sourceData'],
    computed: {
      avgTemperature() {
        const average = arr => arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / arr.length;

        return average(this.sourceData.map(item => {
            return item.main.temp;
          }))
          .toFixed(2);
      },
    },
    methods: {
      getWeatherIcon(icon) {
        return `http://openweathermap.org/img/w/${icon}.png`;
      },
      getPressure(pressure) {
        return (pressure / 1.33).toFixed(2);
      },
      getTime(date) {
        return new Date(date).getHours();
      }
    },
  }
</script>

<style lang="scss" scoped>
  $t-color: rgba(101, 85, 157, 0.5) ;
  $t-color-hover: rgba(128,53,92,0.5);

  table {
    background-color: $t-color;
    margin: auto;
    color: white;
  }
  td {
    text-align: center;
  }
  p {
    color: white;
    padding-top: 10px;
    font-weight: 500;
  }


</style>
