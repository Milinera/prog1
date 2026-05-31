function tabs() {
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
}

module.exports = tabs;