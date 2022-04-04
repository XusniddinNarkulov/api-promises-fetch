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

const errorXabar = function (response, msg) {
  if (!response.ok) {
    throw new Error(`${msg} ${response.status} ${response.statusText}`);
  }
};
const getJson = function (url, msg) {
  return fetch(url).then(response => {
    errorXabar(response, msg);
    return response.json();
  });
};

const getCountry = function (country) {
  getJson(`https://restcountries.com/v2/name/${country}`, `Davlatni topolmadim`)
    // fetch(`https://restcountries.com/v2/name/${country}`)
    //   .then(
    //     response => {
    //       console.log(response);
    //       // if (!response.ok) {
    //       //   throw new Error(`Davlatni topolmadim`);
    //       // }
    //       return response.json();
    //     }
    //     // error => alert(error)
    //   )
    .then(function (res) {
      // console.log(res);
      let [data3] = res;
      // console.log(data3);
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

      return getJson(
        `https://restcountries.com/v2/alpha/${border}`,
        `qo'shni davlatni topolmadim`
      );
      //   return fetch(`https://restcountries.com/v2/alpha/${border}`);
      // })
      // .then(function (response) {
      //   return response.json();
    })
    .then(function (res) {
      renderHtml(res, 'neighbour');
    })
    .catch(function (error) {
      alert(error);
    })
    .finally(e => {
      // document.querySelector('.center').style.display = 'none';
      // alert('stop loading');
    });
};

// getCountry('usa');
getCountry('uzb');
// getCountry('afg');

// setTimeout(e => {
//   x++;
//   console.log(x);
// }, 0);
// setTimeout(e => {
//   x++;
//   console.log(x);
// }, 0);
// setTimeout(e => {
//   x++;
//   console.log(x);
// }, 0);
// let x = 3;
// console.log(x);

// 4 april 2022
// console.log('sync1');
// fetch('https://restcountries.com/v2/name/uzbekistan')
//   .then(e => e.json())
//   .then(e => console.log(e));
// setTimeout(function () {
//   console.log('async');
// }, 0);
// Promise.resolve('promise').then(res => console.log(res));
// console.log('sync2');

// console.time('loop');
// setTimeout(function () {
//   console.log(1);
// }, 0);
// console.timeEnd('loop');

// console.time('loop1');
// Promise.resolve('promise').then(res => console.log(res));
// console.timeEnd('loop1');

// console.time('loop');
// fetch('https://restcountries.com/v2/name/uzbekistan')
//   .then(e => e.json())
//   .then(e => e);
// console.timeEnd('loop');

// console.time('a');
// const tanga = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('siz yutdingiz');
//     } else {
//       reject(console.log('Siz yutqazdingiz'));
//     }
//   }, 500);
// });

// tanga.then(res => console.log(res)).catch(err => alert(err));
// console.timeEnd('a');

// console.time('b');
// setTimeout(() => {
//   if (Math.random() >= 0.5) {
//     console.log('siz yutdingiz');
//   } else {
//     console.log('Siz yutqazdingiz');
//   }
// }, 500);
// console.timeEnd('b');

//async/await
const data = async function () {
  getPos().then(
    response => console.log(response),
    err => alert(err)
  );
  // let data2 = await fetch(`https://restcountries.com/v2/name/uzbekistan`);
  // console.log(data2);
  // console.log(3);
  // let [body] = await data2.json();
  // console.log(body);
  // let data = setTimeout(() => {
  //   console.log(1);
  // }, 100);
  // console.log(data);
  // console.log(2);

  // return data2;
};
data();

function getPos() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      function (e) {
        resolve(e);
      },
      function () {
        reject(new Error('topolmadim'));
      }
    );
  });
}

let funkAsync = async function () {
  try {
    const data4 = await fetch(`https://restcountries.com/v2/name/uzbekistan`);
    console.log(data4);
  } catch (err) {
    alert(err);
  } finally {
    console.log('hello');
  }
};
funkAsync();
