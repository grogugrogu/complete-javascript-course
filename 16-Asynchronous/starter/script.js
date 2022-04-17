'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
         <article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}m people</p>
            <p class="country__row"><span>🗣️</span>${
              data.languages[Object.keys(data.languages)[0]]
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[Object.keys(data.currencies)[0]].name
            }</p>
          </div>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = 1;
};

//Ajax call country 1
// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);
//     //get neighbour country 2
//     const [neighbour] = data.borders;
//     if (!neighbour) return;
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('vietnam');

// setTimeout(() => {
//   console.log('1 sec passed');
//   setTimeout(() => {
//     console.log('2 sec passed');
//     setTimeout(() => {
//       console.log('3 sec passed');
//       setTimeout(() => {
//         console.log('4 sec passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
const request = fetch(`https://restcountries.com/v3.1/name/portugal`);
console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data[0]);
//     });
// };

//The fetch and function and then method must both be returned when in a function

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    console.log(response);
    //this will automatically reject and every promise will be rejected
    //the catch handler will then trigger at the end like other rejections
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// const getCountryData = function (country) {
//   //Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       //this will automatically reject and every promise will be rejected
//       //the catch handler will then trigger at the end like other rejections
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       console.log(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//       //Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(
//       response => {
//         if (!response.ok)
//           throw new Error(`Country not found ${response.status}`);
//         response.json();
//       },
//       err => alert(err)
//     )
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err}!!!!!!`);
//       renderError(`Something went wrong ${err.message}, TRY AGAINN`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  //Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      console.log(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No Neighbour Found');
      //Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err}!!!!!!`);
      renderError(`Something went wrong ${err.message}, TRY AGAINN`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('portugvsdfval');

//CODING CHALLENGE 1
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      console.log(response);
      if (!response.ok && response.status === 403)
        throw new Error(`Too many requests (${response.status})`);
      if (!response.ok)
        throw new Error(`Problem with geocoding (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city},${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(function (response) {
      if (!response.ok)
        throw new Error(`Country not found(${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(err);
      console.error(err.message);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

//PROOF OF HOW Javascript is Asynchronous behind the scenes
// console.log('Test start');
// setTimeout(() => console.log('0 send timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 10000; i++) {
//     console.log(i);
//   }
//   console.log(res);
// });
// console.log('Test end');

//BUIDLING PROMISES
//Building simple promise
//Function inside is called the executor function
//Takes two arguments the resolve and reject function
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN');
    } else {
      //new Errors will put "Error:" before your value
      reject(new Error('You lost your money'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//Promisifying setTimeout
const wait = seconds => {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    //returns a new promise which can then be handled again
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('5 second passed');
  });

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

/////////////////////////////////////////////////
//Promisifying the geolocation API
//Use function to get access to current position
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos.coords));

const whereAmI2 = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      console.log(pos.coords);
      //returning the fetch will return a promise
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      console.log(response);
      if (!response.ok && response.status === 403)
        throw new Error(`Too many requests (${response.status})`);
      if (!response.ok)
        throw new Error(`Problem with geocoding (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city},${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(function (response) {
      if (!response.ok)
        throw new Error(`Country not found(${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(err);
      console.error(err.message);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', whereAmI2);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

//RE-STUDY THIS
//RE-DO this challenge
// Any value can be returned from .then()
const images = document.querySelector('.images');
// let img;
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', function () {
//       images.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

//.then deals with what is returned from the promise or the last .then.
//it can also be used with no return value as just the next instruction
//return will just allow the next .then() have information from what was returned

// createImage('img/img-1.jpg')
//   .then(res => {
//     img = res;
//     console.log('image 1 loaded');
//     //you have to return wait because the next .then is expecting a promise to continue resolving
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = 'none';
//     //this will return the img element for the next .then to use.
//     //This comes from the createImage function that returned an image element with its argument as the source on the resolve of it's promise
//     return createImage('img/img-2.jpg');
//   })
//   .then(newImg => {
//     console.log(img);
//     img = newImg;
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = 'none';
//     //there is no return because the promise does not continue and nothing needs to be returned
//   })
//   .catch(err => {
//     console.error(err);
//   });

//Async await, is syntatic sugar

const whereAmI3 = async function () {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    //Reverse Geo coding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    //Country Data
    // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
    //   console.log(res)
    // );

    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    // console.log(res);
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
    countriesContainer.style.opacity = 1;
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}!@##`);
    renderError(`${err}`);
    countriesContainer.style.opacity = 1;

    //Reject promise retuend from async function
    throw err;
  }
};
console.log('1: Will get Location');
//WhereamI3 returns a promise with console.log
//Does not yet have the value from the promise and since console.log is executed first it won't appear after
// const city = whereAmI3();
// console.log(city);

//to get the data you must use .then() or IIFE with async and await
//it will handle the resolved value of the promise

//PROMISE WITH promise methods
// whereAmI3()
//   .then(city => console.log(`2:${city}`))
//   .catch(err => console.error(`2:${err.message}`))
//   .finally(() => console.log(`3: Finished getting location`));

//PROMISE with async and catch
(async function () {
  try {
    const city = await whereAmI3();
    console.log(`2: ${city}`);
    console.log(`3: Finished getting location`);
  } catch (err) {
    console.error(`2:${err.message}`);
    renderError(`${err}`);
    countriesContainer.style.opacity = 1;
  }
})();

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

//  RUNNING MULTIPLE PROMISES IN PARALLEL
//Always use async functions with try and catch block
const get3Countries = async function (c1, c2, c3) {
  try {
    //This runs them serpeately makes the load slower
    //Does not run them all at once
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    //  console.log(data1.capital, data2.capital, data3.capital);

    //Returns a new promise
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');

//OTHER PROMISE COMBINATORS
//promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  console.log(res[0].name.common);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long'));
    }, sec * 1000);
  });
};

//Will return the fastest promise
Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/mexico`),
  timeout(1),
])
  .then(res => console.log(res[0].name.common))
  .catch(err => console.error(err));

//Promise.allSettled
//Will display all values regardless if any fails or not
Promise.allSettled([
  Promise.resolve('Success!'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success!'),
]).then(res => console.log(res));

//will short ciruit if any fails
Promise.all([
  Promise.resolve('Success!'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success!'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

//promise.any() [ES2021]
//Will return the first fulfiled promise unless all of them reject
Promise.any([
  Promise.resolve('Success!'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success!'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/
//PART 1
// const loadNPause = async function (imgPath) {
//   try {
//     const res = await createImage('img/img-1.jpg');
//     console.log('Image 1 loaded');
//     img = res;
//     await wait(2);
//     img.style.display = 'none';

//     const res2 = await createImage('img/img-2.jpg');
//     console.log('Image 2 loaded');
//     img = res2;
//     await wait(2);
//     img.style.display = 'none';
//   } catch (err) {
//     console.error(err);
//   }
// };

// loadNPause();

//put the img variable inside the function this time so it creates a new img each time
const createImage = function (imgPath) {
  let img;
  return new Promise(function (resolve, reject) {
    img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      images.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

//PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
