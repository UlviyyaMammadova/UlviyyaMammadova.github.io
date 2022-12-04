const API_KEY = "5d21471737f21a0a52194e8ba5cd6ccb";

/*const time_item = new Date();
const day_item = time_item.getDay();*/

const time = document.getElementById('time');
const date = document.getElementById('date');
const current_desc = document.getElementById('current-description');
const cityInfo = document.getElementById('city-info')
const time_zone = document.getElementById('time-zone');
const country = document.getElementById('country');
const current_weather = document.getElementById('current-weather');
const other_forecast = document.getElementById('other-days');

const cityName = document.getElementById('name');
const countryName = document.getElementById('country-name')
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const week_days = ["Sunday", "Monday" , "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

setInterval(() => {
    const time_item = new Date();
    const day_item = time_item.getDay();
    const month_item = time_item.getMonth();
    const date_item = time_item.getDate();
    const hour_item = time_item.getHours();
    const minute_item = time_item.getMinutes();



    const hour_format = hour_item >=13 ? hour_item %12:hour_item;
    const format_AmPm = hour_item >=12 ? "PM" : "AM";

    time.innerHTML = hour_format + ":" + minute_item + " " + `<span id="clock-type">${format_AmPm}</span>`;
    date.innerHTML = week_days[day_item] + ", " + date_item +" " + months[month_item];
}, 1000);

getWeatherInfo();
function getWeatherInfo (){
    navigator.geolocation.getCurrentPosition((position) => {
        
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;

        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

         console.log(data);
         weatherInfo(data);
         
        
        })

    })
}


function weatherInfo(data){

    
    /*const dateBins = {};
    const numBins = 7;
    for(let i = 0; i<numBins; i++){
        const date_item = new Date(time_item.getTime() + i * day_item);
        dateBins[date_item.getDate()] = [];
    }

    const reports = data.list;
    const reports = {};

    for(let i = 0; i<data.list.length; i++){
        reports[i] = data.list[i];
    }
    for (const report of reports){
        const reportDate = new Date(report.dt * 1000).getDate();
        dateBins[reportDate].push(report);
    }*/

    let humidity = data.list[0].main.humidity;
    let pressure = data.list[0].main.pressure;
    let wind_speed = data.list[0].wind.speed;
    let feels_like = data.list[0].main.feels_like;
    let sunrise = data.city.sunrise;
    let sunset = data.city.sunset;
    //time_zone.innerHTML = data.city;
    country.innerHTML = data.city.coord.lat + 'N ' + data.city.coord.lon + 'E';
    cityName.innerHTML = data.city.name;
    countryName.innerHTML = data.city.country;
    /*cityInfo.innerHTML=`
    <div class="city" id="city">${cityName}</div>
    <div class="country" id="country">${countryName}</div>
    `;*/

    current_desc.innerHTML = 
    `<div class="weather-elements">
      <div>Humidity</div>
      <div>${humidity}%</div>
    </div>
    <div class="weather-elements">
      <div>Pressure</div>
      <div>${pressure}</div>
    </div>
    <div class="weather-elements">
      <div>Wind Speed</div>
      <div>${wind_speed}</div>
    </div>
    <div class="weather-elements">
      <div>Feels like</div>
      <div>${feels_like}&#176;C</div>
    </div>
    <div class="weather-elements">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-elements">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>`;

    let otherDay = '';
    
    data.list.forEach((day, i) => {
        
        if (i == 0){
            current_weather.innerHTML=`
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="icon" class="icon">
            <div class="today_items">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temperature">Minimum - ${day.main.temp_min}&#176;C</div>
                <div class="temperature">Maximum - ${day.main.temp_max}&#176;C</div>
            </div>`
        }
        else{
            
            otherDay+=
            `
            <div class="future-elements">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="icon" class="icon">
                <div class="temperature">Min - ${day.main.temp_min}&#176;C</div>
                <div class="temperature">Max - ${day.main.temp_max}&#176;C</div>
            </div>`
            
        }
    
       
        //other_forecast.innerHTML = otherDay; 
             
        /* if I uncomment the expression above this api shows forecast for 5 days in every 3 hours.
        I tried to reduce it but I could not. "Current weather" api does not show the forecast
        for the other days that's why I used this*/
        
    });

    
}

