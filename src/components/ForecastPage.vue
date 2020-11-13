<template>
    <div id="content">
        <div class="holder">
            <table>
                <tr>
                    <td>
                        {{name}}
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
    name: 'ForecastPage',
    props: {
        name: ''
    },
    data(){
        return {
            city: {}
        }
    },
    mounted: function(){
        Vue.axios.post(`http://api.openweathermap.org/data/2.5/weather?q=${this.name}&appid=a7b17595154207061aa5a409eeef22de`).then((response) =>{
            console.log(response.data);
            this.city=response.data;
        }).catch((error) =>{
            alert("Wrong city");
        })
    }
}
</script>

<style >
    table, tr, td{
        padding: 20px;
    }
    table {
        display: inline;
    }
    td {
        text-align: left;
        width: 500px;
    }
    
</style>
