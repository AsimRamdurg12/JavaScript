let config= {
    cUrl : " https://api.countrystatecity.in/v1/countries",
    cKey: "a3NuT3hNTUc3WE9NSWU3OG0zNlhROXlDdXlyN0RxWjV0QjdIVm5Dbw=="
//https://dr5hn.github.io/countries-states-cities-database/
}

const countrySelect = document.querySelector('.country');
const stateSelect = document.querySelector('.state');
const citySelect = document.querySelector('.city');


function loadCountries(){
    let apiEndPoint = config.cUrl;
    fetch(apiEndPoint, {headers:{"X-CSCAPI-KEY":config.cKey}})
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        data.forEach(country => {
            const option = document.createElement('option');
                option.value = country.iso2;
                option.textContent = country.name;
                countrySelect.appendChild(option)
        });
    })
    .catch(error => console.error("error loading Countries", error));
    

    stateSelect.disabled = true;
    citySelect.disabled = true;
    stateSelect.style.pointerEvents = 'none';
    stateSelect.style.pointerEvents = 'none';
}

function loadStates() {
    stateSelect.disabled = false;
    citySelect.disabled = true;
    stateSelect.style.pointerEvents = 'auto';
    stateSelect.style.pointerEvents = 'none';


const selectedCountryCode = countrySelect.value;
// console.log(countrySelect.value)
stateSelect.innerHTML = `<option value="">Select State</option>` // for clearing the existing states.
fetch(`${config.cUrl}/${selectedCountryCode}/states`, {headers:{"X-CSCAPI-KEY":config.cKey}})    
.then(response => response.json())
.then(data => {
    // console.log(data);

    data.forEach(state => {
        const option = document.createElement('option');
            option.value = state.iso2;
            option.textContent = state.name;
            stateSelect.appendChild(option)
    });
})
.catch(error => console.error("error loading States", error));
}


function loadCities() {

    citySelect.disabled = false;
    stateSelect.style.pointerEvents = 'auto';


    const selectedCountryCode = countrySelect.value;
    const selectedStateCode = stateSelect.value;
// console.log(countrySelect.value)
stateSelect.innerHTML = `<option value="">Select State</option>` // for clearing the existing states.
fetch(`${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, {headers:{"X-CSCAPI-KEY":config.cKey}})    
.then(response => response.json())
.then(data => {
    // console.log(data);

    data.forEach(city => {
        const option = document.createElement('option');
            option.value = city.iso2;
            option.textContent = city.name;
            citySelect.appendChild(option)
    });
})
.catch(error => console.error("error loading Cities", error));

}




window.onload = loadCountries();
