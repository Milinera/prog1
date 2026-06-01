import {calc} from './modules/calc.js';
import {form} from './modules/form.js';
import {modal} from './modules/modal.js';
import {slider1} from './modules/slider1.js';
import {tabs} from './modules/tabs.js';
import {timer} from './modules/timer.js';
window.addEventListener('DOMContentLoaded', () => {

    tabs();
    timer();
    modal();
    form();
    slider1();
    calc();
});


