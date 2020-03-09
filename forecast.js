const key = 'rVcBAMA6AxmA86BsCth4OxHwoxmLQ0GI'

// get city data
const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${key}&q=${city}`
    const response = await fetch(base + query)
    const data = await response.json()
    return (data[0])
}


//get weather 
const getWeather = async (id) => {
    const base = `http://dataservice.accuweather.com/currentconditions/v1/${id}`
    const query = `?apikey=${key}`
    const response = await fetch(base + query)
    const data = await response.json()
    return data[0]
}

const getLocation = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(   async (position)=>{
        const lat =  position.coords.latitude
        const long = position.coords.longitude
        const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key}&q=${lat},${long}`)
        const data = await response.json()
        const citykey = await data.Key
        const cityEng = await data.EnglishName
        const country = await data.Country.ID
        const weatherRes = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${citykey}?apikey=${key}`)
        const weatherData = await weatherRes.json()
        const weather = await weatherData[0]
        const temp = await weather.Temperature.Metric.Value
        const DayTime = await weather.IsDayTime
        weatherCard.classList.remove('d-none')
        cityName.textContent = `${cityEng}, ${country}`
        tempText.textContent = Math.floor(temp)
        weatherCondition.textContent = weather.WeatherText
        if(DayTime){
            body.classList.add('day')
        } else {
            
            body.classList.add('night')
        }
        icon.setAttribute('src', `img/icons/${weather.WeatherIcon}.svg`) 
        });
    }

}