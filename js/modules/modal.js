function modal() {
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
    
    getResource('https://react.milinera.site/db.json')
    .then(data => {
        data.menu.forEach(({img, altimg, title, descr, price}) => {
            new block(img, altimg, title, descr, price, '.menu .container').render();
        });
    })
}

module.exports = modal;
