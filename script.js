'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
function renderHtml(data, className) {
  let html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        data.population / 1000000
      ).toFixed(1)} mln people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

// const getCountryInfo = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   console.log(request);
//   // console.log(request.responseText);

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(request.responseText);

//     renderHtml(data);

//     console.log(data.borders);

//     let border = data.borders;

//     // console.log(border);

//     border.forEach(border => {
//       console.log(border);
//       let request2 = new XMLHttpRequest();
//       request2.open('GET', `https://restcountries.com/v2/alpha/${border}`);
//       request2.send();
//       request2.addEventListener('load', function () {
//         let data2 = JSON.parse(request2.responseText);
//         renderHtml(data2, 'neighbour');
//       });
//     });
//   });
// };

// getCountryInfo('uzb');
// // getCountryInfo('afg');
// // getCountryInfo('uk');

//

const getCountry = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(
      response => response.json(),
      error => alert(error)
    )

    .then(function (res) {
      console.log(res);
      let [data3] = res;
      console.log(data3);
      renderHtml(data3);

      let border = data3.borders[0];
      //XATO USUL
      // fetch(`https://restcountries.com/v2/alpha/${border}`)
      //   .then(function (response) {
      //     return response.json();
      //   })
      //   .then(function (res) {
      //     renderHtml(res, 'neighbour');
      //   });

      return fetch(`https://restcountries.com/v2/alpha/${border}`);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      renderHtml(res, 'neighbour');
    })
    .catch(function (error) {
      alert(error);
    })
    .finally(e => {
      document.querySelector('.center').style.display = 'none';
      alert('stop loading');
    });
};
// getCountry('usa');
getCountry('uzb');
// getCountry('afg');
