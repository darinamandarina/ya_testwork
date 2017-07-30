let fio = document.getElementById('fio'),
    email = document.getElementById('email'),
    phone = document.getElementById('phone'),
    button = document.getElementById('submitButton');

//шаблоны для валидации
// добавить возможность ввода русских символов    
let fio_pattern = /(\w|[\u0410-\u044F])+\s(\w|[\u0410-\u044F])+\s(\w|[\u0410-\u044F])+/,
    email_pattern = /@ya.ru|yandex\.(ru|by|kz|ua|com)$/,
    phone_pattern = /\+7\d{10}/;


function onChg(elm, pattern, id_of_span) {
    //fio = fio.value; или fio.innerText или fio.innerHTML ,fio_patern.test(fio)
    let span = document.getElementById(id_of_span);
    elm.addEventListener('change', function () {
        if (this.value.match(pattern) == null || (this.value.match(pattern).length == 0 || pattern.test(elm.value).length == 0)) {
            showErr();
        } else {
            span.setAttribute("hidden", "");
            if (elm.classList.contains('error')) elm.classList.remove('error');
            console.log('success');
            //Если валидация прошла успешно, кнопка отправки формы должна стать неактивной и должен отправиться ajax-запрос на адрес, указанный в атрибуте action формы

            //добавим обработчик события click для кнопки, подтверждающей отправку формы; после нажатия появляется элемент span.resultText внутри div#resultContainer c текстом 'Success' или 'Fault';

            /*button.addEventListener('click', function(){
                
            });*/
        };
        if (elm == phone) {
            let val = elm.value,
                val_arr = [],
                val_sum = 0;

            val = val.split('+')[1];
            for (var i = 0; i < val.length; i++) {
                val_arr.push(val.slice(i, i + 1));
                val_sum += Number(val_arr[i]);
            }

            if (val_sum > 30) {
                showErr();
            };

            console.log(val_arr, (val_sum > 30), val);

        };
    })

    function showErr() {
        span.removeAttribute('hidden');
        console.log('delited attribute hidden', span.hasAttribute('hidden'));
        elm.classList.add('error');
    };
};


let fio_onChg = onChg(fio, fio_pattern, 'fio_warn'),
    email_onChg = onChg(email, email_pattern, 'email_warn'),
    phone_onChg = onChg(phone, phone_pattern, 'phone_warn');


console.log("FIO:  \n" + fio_onChg, "Phone\n" + phone_onChg + email_onChg);
