function calc() {
    
    //local stor
    // localStorage.setItem('mumdee', 5);
    // // localStorage.removeItem('mumdee');
    // localStorage.clear();
    // console.log(localStorage.getItem('mumdee'))

    //калькулятор
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female')
    };
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = '1.357';
        localStorage.setItem('ratio', '1.357')
    }

    function initLocal(selector, activClass) {
        const element = document.querySelectorAll(selector);

        element.forEach(elem => {
            elem.classList.remove(activClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activClass);
            }
        })
    }

    initLocal('#gender div', 'calculating__choose-item_active');
    initLocal('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = `...`;
            return
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInform(parent, actionClass) {
        const element = document.querySelectorAll(`${parent} div`);


        element.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                console.log(ratio, sex);

                element.forEach(elem => {
                    elem.classList.remove(actionClass)
                })

                e.target.classList.add(actionClass);

                calcTotal();
            });
        })
    }

    getStaticInform('#gender', 'calculating__choose-item_active');
    getStaticInform('.calculating__choose_big', 'calculating__choose-item_active');

    function getInform(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '3px solid red'
            } else {
                input.style.border = 'none'
            }
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value
                    break;
                case 'weight':
                    weight = +input.value
                    break;
                case 'age':
                    age = +input.value
                    break;
                    
            }
            calcTotal();
        })
        
    }

    getInform('#height');
    getInform('#weight');
    getInform('#age');
}

module.exports = calc;
