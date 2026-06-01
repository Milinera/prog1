const modal = require("./modal");

function form() {
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
}

// module.exports = form;
export {form}