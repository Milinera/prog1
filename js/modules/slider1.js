function slider1() {
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
}

module.exports = slider1;
