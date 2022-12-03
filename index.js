const API_KEY = "5d21471737f21a0a52194e8ba5cd6ccb";

const time = document.getElementById('time');
const date = document.getElementById('date');
const current_desc = document.getElementById('current-description');
const time_zone = document.getElementById('time-zone');
const country = document.getElementById('country');
const current_weather = document.getElementById('current-weather');
const other_forecast = document.getElementById('other-days');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const week_days = ["Sunday", "Monday" , "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

setInterval(() => {
    const time_item = new Date();
    const month_item = time_item.getMonth();
    const date_item = time_item.getDate();
    const day_item = time_item.getDay();
    const hour_item = time_item.getHours();
    const minute_item = time_item.getMinutes();

    const hour_format = hour_item >=13 ? hour_item %12:hour_item;
    const format_AmPm = hour_item >=12 ? "PM" : "AM";

    time.innerHTML = hour_format + ":" + minute_item + " " + `<span id="clock-type">${format_AmPm}</span>`;
    date.innerHTML = week_days[day_item] + ", " + date_item +" " + months[month_item];
}, 1000);

getWeatherInfo();
function getWeatherInfo (){
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {lat, lon } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=
        ${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

         console.log(data)
         
        
        })

    })
}
function weatherInfo(){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
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
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-elements">
        <div>Sunset</div>
        <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
    </div>`;

    let otherDay = '';
    data.daily.forEach((day_item, i) => {
        if (i == 0){
            current_weather.innerHTML=`
            <img src="http://openweathermap.org/img/wn//${day_item.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="today_items">
                <div class="day">${window.moment(day_item.dt*1000).format('dddd')}</div>
                <div class="temperature">Day - ${day_item.temp.day}&#176;C</div>
                <div class="temperature">Night - ${day_item.temp.night}&#176;C</div>
            </div>
            `
        }
        else{
            otherDay+=`
            <div class="future-elements">
                <div class="day">${window.moment(day_item.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day_item.weather[0].icon}@2x.png" alt="icon" class="icon">
                <div class="temperature">Day - ${day_item.temp.day}&#176;C</div>
                <div class="temperature">Night - ${day_item.temp.night}&#176;C</div>
            </div>`
        }
    });

    other_forecast.innerText = otherDay;
}

