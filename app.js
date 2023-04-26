async function handleSubmit() {
    const zipcode = document.getElementById("zipcode").value;

    const options = {method: 'GET', headers: {accept: 'application/json'}};

    const loc_id = await fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=xe1PzPfcxA7bVAAxIFtpL528GwErS5wv&q=${zipcode}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            return response[0]["Key"]
        })
        .catch(err => console.error(err));

    const weather_data = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${loc_id}?apikey=xe1PzPfcxA7bVAAxIFtpL528GwErS5wv`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}