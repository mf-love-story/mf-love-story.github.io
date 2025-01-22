// Bootstrap component
import { Carousel, Collapse } from 'bootstrap';

// Images loaded 
const ImagesLoaded = require('imagesloaded');

// Validator
import { Validator, enLang as en } from '@upjs/facile-validator';

// Venobox
const VenoBox = require('venobox');

window.addEventListener("DOMContentLoaded", (e) => {
    ImagesLoaded(document.querySelector('#page-top'), { background: true }, function () {

        // Hide preloader
        const preloader = document.querySelector('.preloader');
        if (preloader !== null) {
            setTimeout(() => {
                preloader.classList.add('d-none');
            }, 1000);
        }

        // Scroll spy init
        if (nav !== null) {
            spySections.forEach((section) => {
                observer.observe(section);
            });
        }
    });
});

// Navbar collapse
const nav = document.getElementById('navbar');
let navCollapse = false;

if (nav !== null) {
    navCollapse = new Collapse(nav, {
        toggle: false
    });
}

// Page scroll
const navHeight = 100;
const pageScrollLink = document.querySelectorAll('.page-scroll');
pageScrollLink.forEach((link) => {
    link.addEventListener('click', function (e) {
        let target = document.getElementById(link.getAttribute('href').substring(1));
        window.scrollTo({
            top: target.offsetTop - (navHeight - 1),
            behavior: 'smooth'
        });

        // Automatically retract the navbar after clicking on one of the menu items
        if (navCollapse) {
            navCollapse.hide();
        }
        e.preventDefault();
    });
});

// Scroll spy
const spySections = document.querySelectorAll('section');
const spyItem = (entries, observer) => {
    entries.forEach((entry) => {
        let { id } = entry.target;
        let spy = nav.querySelector(`[href="#${id}"`);

        if (spy) {
            spy.classList.remove('active');

            if (!entry.isIntersecting) return;
            spy.classList.add('active');
        }
    });
};

const rootMarginBottom = navHeight - window.innerHeight + 'px'
const observer = new IntersectionObserver(spyItem, {
    root: document,
    rootMargin: `-100px 0% ${rootMarginBottom} 0%`
});

// Background images
const bgHolder = document.querySelectorAll('.bg-holder');
bgHolder.forEach((bg) => {
    const imgSrc = bg.dataset.bgImage;
    bg.style.backgroundImage = 'url("' + imgSrc + '")';
});

// Carousel
const carousels = document.querySelectorAll('.carousel');
carousels.forEach((elem) => {

    // Init
    const carousel = new Carousel(elem);
    const carouselIndicators = elem.querySelector('.carousel-indicators');

    // Build indicators
    let carouselItem = elem.querySelectorAll('.carousel-item');
    for (let i = 0; i < carouselItem.length; i++) {
        let btn = document.createElement('button');

        btn.setAttribute('type', 'button');
        btn.setAttribute('data-bs-target', '#' + elem.getAttribute('id'));
        btn.setAttribute('data-bs-slide-to', i);
        btn.setAttribute('aria-label', 'Slide ' + parseInt(i + 1));

        if (i == 0) {
            btn.classList.add('active');
            btn.setAttribute('aria-current', 'true');
        }

        carouselIndicators.append(btn);
    }
});

// Galleri lightbox
new VenoBox({
    selector: '.gallery-grid a',
    infinigall: true,
    numeration: true,
    overlayColor: '#ffffff',
    spinner: 'pulse'
});

// Form validator
const form = document.querySelector('form');
const btnSubmit = document.querySelector('button[type="submit"]');
const defaultMessage = (btnSubmit !== null) ? btnSubmit.innerHTML : '';
const sendingMessage = 'Loading...';
const errorMessage = 'Error Sending';
const successMessage = 'Email Sent';

if (form !== null) {
    // Create an instance of Validator for the container element
    const v = new Validator(form, {
        lang: en,
        on: {
            'validation:success': () => {
                btnSubmit.innerHTML = sendingMessage;

                fetch(form.getAttribute('action'), {
                    method: form.getAttribute('method'),
                    body: new FormData(form)
                })
                    .then(res => res.text())
                    .then(function (data) {
                        if ((data === 'true')) {
                            btnSubmit.innerHTML = successMessage;
                            form.reset();
                        }
                        else {
                            btnSubmit.innerHTML = errorMessage;
                        }

                        setTimeout(() => {
                            btnSubmit.innerHTML = defaultMessage;
                        }, 5000);
                    });

            }
        },
    });

    form.addEventListener('submit', (e) => {
        // Call validate method to start validation
        v.validate();
        e.preventDefault();
    });
}