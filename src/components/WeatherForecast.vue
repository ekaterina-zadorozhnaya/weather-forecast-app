<template>
  <div class="container">
      <h1 v-if="city && country">{{ city }}, {{ country }}</h1>
    <div class="input-group col-md-8 search">
      <br>
      <input type="text" class="form-control" v-model="city" name="search" placeholder="Enter city"/>
      <span class="input-group-btn">
            <button class="btn btn-search" @click="getForecast" type="button">
                <i class="fas fa-search" aria-hidden="true"></i> Search
            </button>
        </span>
    </div>
    <div class="container">
      <weather-current :city="weatherCity"></weather-current>
      <div v-if="forecastList.length" class="col-md-12 text-center">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item tab-day" v-for="(listOfDay, index) in forecastListGrouped">
            <a :class="'nav-link' + (index === 0 ? ' active' : '')" :id="`tab-${index}`"
               data-toggle="tab" :href="`#t-${index}`" role="tab"
               :aria-controls="`t-${index}`" :aria-selected="index === 0">
              {{ listOfDay[0] }}
            </a>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div v-for="(listOfDay, index) in forecastListGrouped"
               :class="'tab-pane fade ' + (index === 0 ? ' show active' : '')"
               :id="`t-${index}`" role="tabpanel" :aria-labelledby="`tab-${index}`">
            <div v-if="listOfDay[1].length">
              <forecast-table :source-data="listOfDay[1]"></forecast-table>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default ({
    name: 'WeatherForecast',

    data() {
      return {
        city: null,
        weatherCity: null,
        forecastList: [],
        country: null
      }
    },

    computed: {
      forecastListComputed() {
        let firstDayInList = (new Date(this.forecastList[0].dt_txt)).getDate();

        return this.forecastList.filter(item => {
          return ((new Date(item.dt_txt)).getDate() - firstDayInList) < 3;
        });
      },
      forecastListGrouped() {
        return this.groupBy(this.forecastListComputed, item => {
          return (new Date(item.dt_txt)).toLocaleDateString();
        });
      },
    },

    methods: {
      getForecast() {
        let openWeatherUrl = "http://api.openweathermap.org/data/2.5/";
        let openWeatherAppId = "6ea35fbcd51d5e917b7d8309292bc51c";
        let typeForecast = "forecast";
        let units = "metric";
        let cnt = 24;
        let url = `${openWeatherUrl}${typeForecast}?q=${this.city}&units=${units}&cnt=${cnt}&APPID=${openWeatherAppId}`;
        axios
          .get(url)
          .then(({data}) => {
            this.forecastList = data.list;
            this.country = data.city.country;
            this.weatherCity = this.city;
          })
          .catch(error => {
            this.forecastList = [];
            this.country = null;
            this.weatherCity = null;
            alert(`City not found`);
            console.error(error);
          });
      },
      groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
          const key = keyGetter(item);
          const collection = map.get(key);
          if (!collection) {
            map.set(key, [item]);
          } else {
            collection.push(item);
          }
        });

        return map;
      },
    },
  });
</script>

<style lang="scss" scoped>
  $btn-color: rgba(101, 85, 157, 1) ;
  $btn-color-hover: rgba(128,53,92, 1);

  .search {
    margin: 10px auto;
  }
  h1 {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 30px;
    text-align: center;
    color: white;
  }
  input {
    font-weight: 500;
    color: $btn-color;
  }
  .btn-search {
    color: #fff;
    background-color: $btn-color;
    border-color: $btn-color;
    &:hover {
      background-color: $btn-color-hover;
      border-color: $btn-color;
    }
  }
  .tab-day {
    background-color: $btn-color;
    border-radius: 5px;
    a {
      color: white;
    }
  }
  .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: white;
    background-color: $btn-color-hover;
    border-color: #dee2e6 #dee2e6 #fff;
  }
  .tab-content > .active {
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    border-left: 2px solid white;
  }

</style>
