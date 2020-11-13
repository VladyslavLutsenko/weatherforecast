<template>
  <div id="content">
    <div class="holder">
      <div class="element">
        <input type="text" v-model="search" id="input">
        <br>
        <button @click="add">Add</button>
      </div>
      <div class="element">
        <select id="select" v-model="selectedCity">
          <option v-for="city in cities" v-bind:key="city.id" v-bind:value="city.name">{{city.name}}</option>
        </select>
        <br>
        <router-link v-bind:to="'/forecast/'+selectedCity" tag="button" v-bind:disabled="selectedCity==''">Weather</router-link>
      </div>
      <div>
        <button @click="clear">Clear city list</button>
      </div>
      <table v-if="currentloc">
        <tr>
            <td>
                Current:
            </td>
            <td>
                {{city.sys.country}}
            </td>
        </tr>
        <tr>
            <td>
                Humidity:
            </td>
            <td>
                {{city.main.humidity}}
            </td>
        </tr>
        <tr>
            <td>
                Temp:
            </td>
            <td>
                {{city.main.temp}}
            </td>
        </tr>
        <tr>
            <td>
                Main:
            </td>
            <td>
                {{city.weather[0].main}}
            </td>
        </tr>
        <tr>
            <td>
                Description:
            </td>
            <td>
                {{city.weather[0].description}}
            </td>
        </tr>
        <tr>
            <td>
                Wind:
            </td>
            <td>
                {{city.wind.speed}}
            </td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'MainPage',
  data(){
    return {
      cities: [],
      search: "",
      selectedCity: "",
      latitude: null,
      longitude: null,
      city: {},
      currentloc: undefined
    }
  },
  mounted: function () {
    if (localStorage.getItem('cities')) {
      try {
        this.cities = JSON.parse(localStorage.getItem('cities'));
      } catch(e) {
        localStorage.removeItem('cities');
      }
    }
    this.getLocation();
    setTimeout(this.getForecastByLocation, 100);
    
  },
  watch: {
    
  },
  methods: {
    add() {
      if (this.search) {
        var newCity={};
        newCity.id=this.cities.length;
        newCity.name=this.search;
        this.cities.push(newCity);
        this.saveCities();
        this.search="";
      }
      
    },
    saveCities() {
      const parsed = JSON.stringify(this.cities);
      localStorage.setItem('cities', parsed);
    },
    clear(){
      localStorage.removeItem('cities');
      this.cities=[];
    },
    getLocation(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position=>{
          this.latitude=position.coords.latitude;
          this.longitude=position.coords.longitude;
          this.currentloc=true;
        });
      } else { 
        this.currentloc=false;
      }
    },
    getForecastByLocation(){
      Vue.axios.post(`http://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=a7b17595154207061aa5a409eeef22de`).then((response) =>{
        console.log(response.data);
        this.city=response.data;
      })

    }
  }
}
</script>

<style scoped>

  .element{
    display: inline-block;
    padding: 20px;
  }

  #select, #input {
    width: 200px;
    height: 20px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  .btnDisabled{
    disabled: 
  }
</style>

<style>
  html, body{
    margin: 0;
  }

  #content {
    height: 900px;
    text-align: center;
    padding-top: 100px;
    padding-right: 500px;
    padding-left: 500px;
    background: url(../assets/sky.jpg) no-repeat;
    background-size: 100%;
  }

  .holder{
    padding: 50px;
    background-color: rgba(255, 255, 255, 0.5);
  }
</style>
