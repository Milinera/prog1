window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
          timer = require('./modules/timer'),
          modal = require('./modules/modal'),
          form = require('./modules/form'),
          slider1 = require('./modules/slider1'),
          calc = require('./modules/calc');

    tabs();
    timer();
    modal();
    form();
    slider1();
    calc();

});


