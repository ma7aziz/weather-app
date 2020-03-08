const key = 'ANZDWsS1AHcMGh3qG3cXt1U03xJ6mUDr'

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

// getCity('cairo')
//     .then(data => {
//         return getWeather(data)
//     }).then(data => {
//         console.log(data);

//     })
//     .catch(err => console.log(err))