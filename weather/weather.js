const apikey = "3265874a2c77ae4a04bb96236a642d2f"
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) =>
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const response = await fetch(url(city), {
        origin: "cors" });
    const responseData = await response.json();

    // console.log(responseData, KtoC(responseData.main.temp ));
    console.log(responseData);

    addWeatherToPage(responseData)
}
// getWeatherByLocation("New Delhi");

function addWeatherToPage(data) {
const temp = KtoC(data.main.temp);

const weather = document.createElement('div');
weather.classList.add('weather');
weather.innerHTML = `

<h2>${temp}°C <img src ="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/> </h2>
<small>${data.weather[0].main}</small>
<small>in ${search.value}</small>
`; 

main.innerHTML = "";

main.appendChild(weather);
} 
function KtoC(K) {
    return Math.floor(K - 273.15);
}
form.addEventListener('submit',(e) => {
    e.preventDefault();
    const city = search.value;
    if(city) {
        getWeatherByLocation(city); 
    }
});
document.addEventListener("DOMContentLoaded", function()  {
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 27){
            document.getElementById("search").focus();
            document.getElementById("search").select();
        }
    });
});
