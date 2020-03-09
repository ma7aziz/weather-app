const cityForm = document.querySelector('form')
const cityName = document.querySelector('h5')
const weatherCondition = document.querySelector('.weather-condition')
const tempText = document.querySelector('.temp')
const weatherCard = document.querySelector('.card')
const timeImage = document.querySelector('.time')
const icon = document.querySelector('.icon img')
const body = document.querySelector('body')

const updateCity = async (city) => {
    const cityDetails = await getCity(city)
    const weather = await getWeather(cityDetails.Key)
    return {cityDetails,weather}
}

const updateUI = (data) => {
    const {cityDetails, weather} = data 
    weatherCard.classList.remove('d-none')
    cityName.textContent = `${cityDetails.EnglishName}, ${cityDetails.Country.ID}`
    tempText.textContent = Math.floor(weather.Temperature.Metric.Value)
    weatherCondition.textContent = data.weather.WeatherText

    
    if(weather.IsDayTime){
        body.classList.add('day')
    } else {
        body.classList.add('night')
    }
    icon.setAttribute('src', `img/icons/${weather.WeatherIcon}.svg`) 
    }



// window.addEventListener('load',()=>{
//     getLocation()

//     })
body.onload = getLocation()
        
cityForm.addEventListener('submit', e => {
    e.preventDefault()
    const city = cityForm.city.value.trim()
    cityForm.reset()
    updateCity(city).then(data => {
        updateUI(data)
        })
        .catch(err => {
            console.log(err);
        });
})



