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
    const deadLine = '2026-04-26';


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
        clearInterval(modalTimer);
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

    const modalTimer = setTimeout(upModal, 10000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            upModal();
            window.removeEventListener('scroll', showModalByScroll)
            console.log(window.pageYOffset);
            console.log(document.documentElement.clientHeight);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    

})