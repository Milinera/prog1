window.addEventListener('DOMContentLoaded', () => {
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none'
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const targer = event.target;

        if (targer && targer.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (targer == item) {
                        hideTabContent();
                        showTabContent(i);
                }
            })
        }
    });
    const links = document.querySelectorAll('.header__link');
    links[1].style.display = 'none';
    const timer = setInterval(longer, 3000);

    function longer() {
        links[1].style.display = 'block';
    }
    links[0].addEventListener('click', () => {
        links[1].style.display = 'none';
    })


    //timer
    const deadLine = '2026-10-26';


    function getTime(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minuts = Math.floor((t / (1000 * 60)) % 60),
              sec = Math.floor((t / 1000) % 60);

        return {
            'total' : t,
            'days' : days,
            'housr' : hours,
            'min' : minuts,
            'sec' : sec
         }
    }

    function getZiro(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minuts = timer.querySelector('#minutes'),
              sec = timer.querySelector('#seconds'),
              timeInt = setInterval(uploudTime, 1000);
        uploudTime();
        function uploudTime() {
            const t = getTime(endtime);
            days.innerHTML = getZiro(t.days);
            hours.innerHTML = getZiro(t.housr);
            minuts.innerHTML = getZiro(t.min);
            sec.innerHTML = getZiro(t.sec);

            if (t.total <= 0) {
                clearInterval(timeInt);
            }
        }
    }

    setClock('.timer', deadLine);


    //модалка
    const btnUp = document.querySelectorAll('[data-modal]'),
          btnDel = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');



    let closeModal = function(){
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    let upModal = function(){
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // clearInterval(modalTimer);
    }

    btnUp.forEach(x => {
        x.addEventListener('click', () => {
            upModal();

        })
    });

    btnDel.addEventListener('click', () => {
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModal();
        }
    });

    // const modalTimer = setTimeout(upModal, 100000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            upModal();
            window.removeEventListener('scroll', showModalByScroll)
            console.log(window.pageYOffset);
            console.log(document.documentElement.clientHeight);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    class block {
        constructor(src, alt, title, descr, price, perent) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.perent = document.querySelector(perent);
            this.price = price;
            this.transfer = 27;
            this.changeTo();
        }

        changeTo() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
            <div class="menu__item">
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;
            this.perent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}`);
        }

        return await res.json();
    }
    
    getResource('http://react.milinera.site/db.json')
    .then(data => {
        data.menu.forEach(({img, altimg, title, descr, price}) => {
            new block(img, altimg, title, descr, price, '.menu .container').render();
        });
    })

    //FORMS
    const forms = document.querySelectorAll('form');
    const message = {
        loadind: 'Загрузка',
        success: 'спасиба',
        error: 'ошибка'
    };
    forms.forEach(item => {
        fpostData(item);
    })

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    }

    function fpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();  //убирает стандартное поведение у sibmit form

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loadind;
            form.append(statusMessage);

            const requst = new XMLHttpRequest();
            requst.open('POST', 'server.php');
            requst.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            })

            const json = JSON.stringify(object);

            requst.send(json);

            requst.addEventListener('load', () => {
                if(requst.status === 200) {
                    statusMessage.textContent = message.success;
                    console.log(requst.response);
                } else {
                    statusMessage.textContent = message.error;
                    console.log(requst.response);
                }
            })
        })
    }

    //slider 1
    function createSleder() {
        const right = document.querySelector('.offer__slider-next'),
              left = document.querySelector('.offer__slider-prev'),
              current = document.querySelector('#current'),
              total = document.querySelector('#total'),
              all = document.querySelectorAll('.offer__slide');
        
        let index = 0;
        const totalSlides = all.length;
        
        function slideUp() {
            all.forEach(item => item.style.display = 'none');
            all[index].style.display = 'block';
        }
        
        function updateNumbers() {
            const currentNum = index + 1;
            current.textContent = currentNum < 10 ? `0${currentNum}` : `${currentNum}`;
            total.textContent = totalSlides < 10 ? `0${totalSlides}` : `${totalSlides}`;
        }
        
        slideUp();
        updateNumbers();
        
        right.addEventListener('click', () => {
            if (index + 1 >= totalSlides) {
                index = 0;
            } else {
                index++;
            }
            slideUp();
            updateNumbers();
        });
        
        left.addEventListener('click', () => {
            if (index - 1 < 0) {
                index = totalSlides - 1;
            } else {
                index--;
            }
            slideUp();
            updateNumbers();
        });
    }

    createSleder();


    //local stor
    // localStorage.setItem('mumdee', 5);
    // // localStorage.removeItem('mumdee');
    // localStorage.clear();
    // console.log(localStorage.getItem('mumdee'))

    
});
