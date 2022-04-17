'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//buuton scrolling

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Current Scroll (X,Y)', window.pageXOffset, window.pageYOffset);
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  //SCROLLING
  //does not work
  //window.scrollTo(s1coords.left, s1coords.top);

  //correct way with current scroll position
  //IMPORTANT
  //ADD CURRENT POSITION + CURRENT SCROLL
  /*window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  );

  //pass in an object for more control
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });*/

  //Modern Way
  //modern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page navigation
//IMPORTANT
//Will create performance issues with large scale applications with thousands of links
//Creating an eventlistener for each link is ineffecient and will slowdown the page
/*
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

//EVENT DELEGATION
//IMPORTANT
//PROPER METHOD
//Alot more efficient than creating eventlisteners on all the elements tht need listeners
//1) Add event listener to common parent element
//2) Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//Creating and Inserting elements
//.insertAdjacentHTML (from bankist application)
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';
/*
  //prepend adds an element as the first child of an element
header.prepend(message);
*/
//append ads an element as the last child of an element
//the element stored in message can only be on the page once so it was moved
//another element was not created
//append and prepend can be used to move elements
header.append(message);
/*
//cloning elements
header.prepend(message.cloneNode(true));
//makes element appear before the element usin the method
header.before(message);
//makes element appear after the element usin the method
header.after(message);
*/
//delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    //new method (where you can remove the element withput selecting it's parent)
    message.remove();
    //old method when you had to select the parentElemet first
    //message.parentElement.removeChild(message)
  });

//Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//not inline element so will not appear in console
console.log(message.style.height);
//is an inline elemnt(placed from js dom) so will appeatr in console
console.log(message.style.backgroundColor);
//getComputedStyle gives all the properties withall the styles
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

//does not work because it adds a number to a string
message.style.height = getComputedStyle(message).height + 40 + 'px';
//proper way (use parseFloat)
//parsefloat will take the number from the height
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
console.log(getComputedStyle(message).height);
//changing css variables
document.documentElement.style.setProperty('--color-primary', 'orangered');

//ATTRIBUTES
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
//do not use .class to get html class names, use *className
console.log(logo.className);

//setting new attribute
logo.alt = 'Beautiful minimalist logo';

//Non-standard(does not work)
console.log(logo.designer);
//if you want to read the non-standard value from the dom
console.log(logo.getAttribute('designer'));
//creates an attribute called company that's set to 'Bankist
logo.setAttribute('company', 'Bankist');

//gets absolute version
console.log(logo.src);
//gets relative version
console.log(logo.getAttribute('src'));

//does no matter here as both links are the same
const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

//matters here because links are not the same
const link1 = document.querySelector('.nav__link--btn');
console.log(link1.href);
//written the same was as it was written in the html
console.log(link1.getAttribute('href'));

//Data attributes
//data attributes are used alot when we need to store data in html
//special attirbutes are always stored in the dataset object
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); //is called contains (not like arrays that use includes method)

//DON'T USE
//OVVERIDES ALL EXISTING CLASSES
//ONLY ALLOWS YOU TO SET ONE
logo.className = 'jonas';

//Types of Events and Event handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventlistener: Great you are reading the heading');

  //use remove EventListener if you want to remove an event
  //can use with setTimout
  h1.removeEventListener('mouseenter', alertH1);
};

//standard way
//new way
//Advantages over old way
//1)better becuse allows you to add multiple event listeners
//2)allows you to remove
h1.addEventListener('mouseenter', alertH1);

//other way to listen to event
//old way
h1.onmouseenter = function (e) {
  alert('addEventlistener: Great you are reading the heading');
};

setTimeout(() => (h1.onmouseenter = ''), 3000);

//EVENT PROPAGATION
//IMPORTANT
//rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

//parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log('container', e.target, e.currentTarget);
  //e.currentTarget and are the same in any event handler
  console.log(e.currentTarget === this);
  //this in an eventlistener refers to the html element(s)
  this.style.backgroundColor = randomColor();
});

//child element
document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Link', e.target, e.currentTarget);
  //this in an eventlistener refers to the html element(s)
  this.style.backgroundColor = randomColor();
  //Stop eventpropagation
  //Makes event not go through the parent elements as well
  //can fix issues in complex applications with many events
  e.stopPropagation();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Nav', e.target, e.currentTarget);
  //this in an eventlistener refers to the html element(s)
  this.style.backgroundColor = randomColor();
});

//Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
//.childNodes ives every single node and type
console.log(h1.childNodes);
//.children gets all the elements inside the parent element
console.log(h1.children);
//select first child elemnt from the parent
h1.firstElementChild.style.color = 'white';
//select last child element from the parent
h1.lastElementChild.style.color = 'red';

//Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

//opposite of querySelector and finds parents
h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

//Going sideways : siblings
//most of the time yoo'll be working with theelements anyway
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);
//get all siblings
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

//Tabbed component

//Do not do this, bad practire use event delegation instead
//tabs.forEach(t => t.addEventListener('click', () => console.log('Tab')))

//IMPORTANT
//Using closest allows the event to find it's closest element with the operations__tab class
//this is important because not all elements grouped together share the first parent element
//closest method allows any element grouped inside an element with that class to be one thing such as a button

tabsContainer.addEventListener('click', function (e) {
  //closest method needed as their are child elements that can be clicked in the button
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  //Guard clause
  //more modern to use this instead of a regular if statement
  if (!clicked) return;

  //Active Tab
  //clears the active class on all of them
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  //Adds the class to the selected one
  clicked.classList.add('operations__tab--active');

  //Active content area
  //clears the active class on all of the tabs content
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  //adds the active class that contains display:grid to the corressponding tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//IMPORTNT
//Menu Fade Animation
const handleHover = function (e) {
  //closest not needed as there are no child elements that user can accidentally click
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//need event to bubble so use mouseover

//Without bing method(change this to another parameter with the opacity)
/*
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});*/

//with bind method
//bind method allows a workaround on how you can only pass one argument to a handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));
/*
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});*/

//with bind method

nav.addEventListener('mouseover', handleHover.bind(1));

//STICKY NAVIGATION
//Scroll Event
//scroll event is not reallt efficient and should be avoided
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
/*
window.addEventListener('scroll', function () {
  console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

//Sticky navigation: Intersection Observer API

/*
const obsCallback = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
};

const obsOptions = {
  //null root gives the entire viewport
  root: null,
  //the callback will be called when the threshold is intersected
  //threshold represents the percentage of that element from the bottom and top
  //putting two differnet values will call the callback twice
  threshold: [0, 0.2],
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

const navHeight = nav.getBoundingClientRect().height;

console.log(navHeight);

const stickyNav = function (entries) {
  console.log(entries);
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
//
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
//selects the element for the intersectionObserver to apply to
headerObserver.observe(header);

//Reveal sections

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  //Guard to stop code from running if there is no intersection
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  //no more events because none of the sections are being observed
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lAZY LOADING IMAGES

//selects all images with the property of data source
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  //Guard to stop code from running if there is no intersection
  if (!entry.isIntersecting) return;
  //Replace srv with data src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  //no more events because none of the sections are being observed
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  //positive to load before user reaches them
  //negative if you want user to see the lazy load effect
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//SLIDER
//IMPORTANT
//REVIEW
//putting all the slider variables and functions into it's own function helps to not pollute the global name space

//variables
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  //functions
  const createDots = function () {
    slides.forEach(function (_, index) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //init
  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  init();

  //Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

//if script tag is at bottom no need to use DOMContentLoaded
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

//should only be displayed when neccessary
//basically gives an re you sure? when users exit the window
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
