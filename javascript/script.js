
let apiLink = "https://api.aladhan.com/v1/timingsByCity";
let container = document.querySelector(".container");
let boxContainer = document.querySelector(".prayname");
let fajrtime = document.querySelector(".fajr-time");
let sunrisetime = document.querySelector(".sunrise-time");
let dhuhrtime = document.querySelector(".dhuhr-time");
let asrtime = document.querySelector(".asr-time");
let maghribtime = document.querySelector(".maghrib-time");
let ishatime = document.querySelector(".isha-time");
let cityName = document.querySelector("#city-name")
let hijriDate = document.getElementById("hijri-date");
let gDate = document.getElementById("date");
let fullYearGregorian = document.querySelector(".full-year");
let fullYearHijri = document.querySelector(".full-hijri-year");



let cities = [
    { name: "البحيرة", iso: "Al Buḩayrah" },
    { name: "القاهرة", iso: "Al Qāhirah" },
    { name: "مطروح", iso: "Maţrūḩ" },
    { name: "البحر الأحمر", iso: "Al Baḩr al Aḩmar" },
    { name: "الإسكندرية", iso: "Al Iskandarīyah" },
    { name: "الدقهلية", iso: "Ad Daqahlīyah" },
    { name: "الفيوم", iso: "Al Fayyūm" },
    { name: "الغربية", iso: "Al Gharbīyah" },
    { name: "الإسماعيلية", iso: "Al Ismā'īlīyah" },
    { name: "الجيزة", iso: "Al Jīzah" },
    { name: "المنُوفيّة", iso: "Al Minūfīyah" },
    { name: "المنيا", iso: "Al Minyā" },
    { name: "القليوبية", iso: "Al Qalyūbīyah" },
    { name: "الأقصر", iso: "Al Uqşur" },
    { name: "الوادي الجديد", iso: "Al Wādī al Jadīd" },
    { name: "السويس", iso: "As Suways" },
    { name: "الشرقية", iso: "Ash Sharqīyah" },
    { name: "أسوان", iso: "Aswān" },
    { name: "أسيوط", iso: "Asyūţ" },
    { name: "بني سويف", iso: "Banī Suwayf" },
    { name: "بورسعيد", iso: "Būr Saīd" },
    { name: "دمياط", iso: "Dumyāţ" },
    { name: "جنوب سيناء", iso: "Janūb Sīnā'" },
    { name: "كفر الشيخ", iso: "Kafr ash Shaykh" },
    { name: "قنا", iso: "Qinā" },
    { name: "شمال سيناء", iso: "Shamāl Sīnā'" },
    { name: "سوهاج", iso: "Sohaj" }
];


let selectElement = document.querySelector("select");

selectElement.addEventListener("change", () => {
    let selectedCity = cities.find(city => city.name === selectElement.value);
    if(selectedCity) {
        getPrayersTimings(selectedCity.iso)
    }
});
cities.forEach(city => {
    let content = `
        <option value="${city.name}">${city.name}</option>
    `
    selectElement.innerHTML += content;
});


function getPrayersTimings(cityISO) {
    let parms = {
        country: "EG",
        city: cityISO
    };

    let queryParams = new URLSearchParams(parms);

    fetch(`${apiLink}?${queryParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            fajrtime.innerHTML = data.data.timings.Fajr;
            sunrisetime.innerHTML = data.data.timings.Sunrise;
            dhuhrtime.innerHTML = data.data.timings.Dhuhr;
            asrtime.innerHTML = data.data.timings.Asr;
            maghribtime.innerHTML = data.data.timings.Maghrib;
            ishatime.innerHTML = data.data.timings.Isha;

            let month = data.data.date.hijri.month.ar;
            let day = data.data.date.hijri.day;
            let dayname = data.data.date.hijri.weekday.ar;
            hijriDate.innerHTML = `${dayname} ${day} ${month}`;

            let gregorianDayName = data.data.date.gregorian.weekday.en;
            let gregorianDayNumber = data.data.date.gregorian.day;
            let gregorianMonth = data.data.date.gregorian.month.en;
            gDate.innerHTML = `${gregorianDayName} ${gregorianDayNumber} ${gregorianMonth}`;

            fullYearGregorian.innerHTML = data.data.date.gregorian.date;
            fullYearHijri.innerHTML = data.data.date.hijri.date;

            cityName.innerText = selectElement.value;
        })
        .catch(error => console.log(error));
}

getPrayersTimings("Al Buḩayrah");

function displayMessage() {
    Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'صلي علي سيدنا محمد ﷺ',
        showConfirmButton: false,
        timer: 2000
    });
}
setInterval(displayMessage, 20000);

function getTime() {
    let now = new Date;
    let hours = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    let AmOrPm = hours > 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    document.querySelector(".time-now").innerHTML = `${formatComponent(hours)}:${formatComponent(minutes)}:${formatComponent(seconds)} ${AmOrPm}`
}

function formatComponent(component) {
    return component < 10 ? `0${component}` : component;
}
setInterval(getTime, 1000);




/*
    Using axios

function getPrayersTimings(cityISO) {
    let parms = {
        country: "EG",
        city: cityISO
    };

    axios.get(apiLink, {
        params: parms
    })
.then((response) => {
    fajrtime.innerHTML = response.data.data.timings.Fajr;
    sunrisetime.innerHTML = response.data.data.timings.Sunrise;
    dhuhrtime.innerHTML = response.data.data.timings.Dhuhr;
    asrtime.innerHTML = response.data.data.timings.Asr;
    maghribtime.innerHTML = response.data.data.timings.Maghrib;
    ishatime.innerHTML = response.data.data.timings.Isha;

    let month = response.data.data.date.hijri.month.ar;
    let day = response.data.data.date.hijri.day;
    let dayname = response.data.data.date.hijri.weekday.ar;
    hijriDate.innerHTML = `${dayname} ${day} ${month}`;

    let gregorianDayName = response.data.data.date.gregorian.weekday.en;
    let gregorianDayNumber = response.data.data.date.gregorian.day;
    let gregorianMonth = response.data.data.date.gregorian.month.en;
    gDate.innerHTML = `${gregorianDayName} ${gregorianDayNumber} ${gregorianMonth}`

    fullYearGregorian.innerHTML = response.data.data.date.gregorian.date;
    fullYearHijri.innerHTML = response.data.data.date.hijri.date;
    
    cityName.innerText = selectElement.value;
}).catch((error) => alert(error))
}
*/