
//The code starts by declaring constants apikey and apiUrl for the OpenWeatherMap API key and URL

const apikey = "664d69edb79aafcebf631eb7ffcf3a45";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


//declares variables searchBox, searchBtn, and weatherIcon for the HTML elements that handle user input and weather display

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


/*The checkweather() function is then defined to fetch the weather data from the 
API based on the user input city using the fetch() method */

checkweather("Sioux Falls")

async function checkweather(city){
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);

    /*  If the API returns a status code of 404 (not found), an error message is displayed on
     the HTML element with class error, and the weather display is hidden*/

   if(response.status == 404 )
   {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
   }else{


     
     var data = await response.json();
     
     /*If the API returns a valid response, the weather data is parsed from
      JSON using the json() method and displayed on the HTML elements using querySelector() and innerHTML*/


    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) +"°c" ;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".Pressure").innerHTML = data.main.pressure + "P";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
    document.querySelector(".Visibility").innerHTML = data.visibility + "C";


 /*The code also includes a conditional statement to set the weather icon based on 
 the data.weather[0].main property, which contains the main weather condition for the city.*/
 

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else  if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
}
    else  if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
}
    else  if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
}
    else  if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
}

document.querySelector(".weather").style.display ="block";
document.querySelector(".error").style.display = "none";

   }
}
 
//The searchBtn event listener is then defined to call the checkweather() function when the user clicks the search button.

searchBtn.addEventListener("click",()=>{
   
  checkweather(searchBox.value);
})



 /**  Time and Date   **/ 

const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");


/*defines two functions formatTime() and formatDate() to format the current time and date, respectively, 
displays them on the HTML elements with class time and date. */

function formatTime(date) {

  /*These functions use the getHours(), getMinutes(), getDay(), getMonth(), getDate(), and getFullYear() methods 
  of the Date object to extract the required information and return a formatted string*/

  const hours12 = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const isAm = date.getHours() < 12;

  return `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
}
 

function formatDate(date) {
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];


  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return `${DAYS[date.getDay()]}, ${
    MONTHS[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;
}

/*he setInterval() method is used to update the time and date every 200 milliseconds
 by calling the formatTime() and formatDate() functions with the current time object.*/

setInterval(() => {
  const now = new Date();

  timeElement.textContent = formatTime(now);
  dateElement.textContent = formatDate(now);
  
}, 200);