async function handleSubmit() {
    const zipcode = document.getElementById("zipcode").value;

    const options = {method: 'GET', headers: {accept: 'application/json'}};
    const apikey = "xe1PzPfcxA7bVAAxIFtpL528GwErS5wv&q";
    const url = "https://dataservice.accuweather.com";

    const loc_id = await fetch(`${url}/locations/v1/postalcodes/search?apikey=${apikey}=${zipcode}`, options)
        .then(rawZipcode => rawZipcode.json())
        .then(jsonZipcode => {
            return jsonZipcode[0]["Key"]
        })
        .catch(err => console.error(err));

    const weatherData = await fetch(`${url}/forecasts/v1/daily/5day/${loc_id}?apikey=${apikey}`, options)
        .then(rawWeatherData => rawWeatherData.json())
        .then(jsonWeatherData => {
            console.log(jsonWeatherData);
            return jsonWeatherData;
        })
        .catch(err => console.error(err));
    
    const tomorrowHigh = weatherData["DailyForecasts"][1]["Temperature"]["Maximum"]["Value"];
    console.log(tomorrowHigh)
    let msg;
    if (tomorrowHigh <= 32) {
        msg = "It's Deadass Brick, layer up!!"
    } else if (tomorrowHigh <= 49) {
        msg = "Welcome to Boston, this is as good as it gets most of the time. I'd wear a jacket but don't go crazy."
    } else if (tomorrowHigh <= 60) {
        msg = "You will be cold if you dress for the summer and warm if you dress for the winter. Wear a jacket that you can stuff in your backpack and make people think you're a school shooter."
    } else if (tomorrowHigh <= 72) {
        msg = "This is Boston and you are lying. The Weather is never this managable. Both plantlife and crackheads flourish. Go photosynthesize in some Primark shorts that a 6 year old made instead of going to school"
    } else if (tomorrowHigh <= 80) {
        msg = "Break out that summercamp counselor fit!"
    } else {
        msg = "If you live in a shitty Fenway brownstone you're fucked. Otherwise blast that AC and stay inside"
    }
    console.log(msg);
    var msgElem = document.getElementById("msg");
    msgElem.innerHTML = msg;
}