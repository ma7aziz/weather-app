const cityForm = document.querySelector('form')
const cityName = document.querySelector('h5')
const weatherCondition = document.querySelector('.weather-condition')
const temp = document.querySelector('.temp')
const weatherCard = document.querySelector('.card')
const timeImage = document.querySelector('.time')
const icon = document.querySelector('.icon img')
const updateCity = async (city) => {
    const cityDetails = await getCity(city)
    const weather = await getWeather(cityDetails.Key)
    return {cityDetails,weather}
}

const updateUI = (data) => {
    const {cityDetails, weather} = data 
    weatherCard.classList.remove('d-none')
    cityName.textContent = `${cityDetails.EnglishName}, ${cityDetails.Country.ID}`
    temp.textContent = Math.floor(weather.Temperature.Metric.Value)
    weatherCondition.textContent = data.weather.WeatherText

    
    if(weather.IsDayTime){
        timeImage.setAttribute('src', './img/day.svg')
    } else {
        timeImage.setAttribute('src', './img/night.svg')
    }
    icon.setAttribute('src', `img/icons/${weather.WeatherIcon}.svg`)

    
}

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