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
    let span = document.getElementById(id_of_span);
    elm.addEventListener('change', function () {
        let errorFields = [];
        if (this.value.match(pattern) == null || (this.value.match(pattern).length == 0 || pattern.test(elm.value).length == 0)) //добавить отлавливание ошибки try{}catch(e){}
        {showErr();
        errorFields.push(elm);
    }else {
            span.setAttribute("hidden", "");
            if (elm.classList.contains('error')) {
                elm.classList.remove('error');
                errorFields.pop(elm);
            }
            console.log('success');
            //Если валидация прошла успешно, кнопка отправки формы должна стать неактивной и должен отправиться ajax-запрос на адрес, указанный в атрибуте action формы

            //добавим обработчик события click для кнопки, подтверждающей отправку формы; после нажатия появляется внутри div#resultContainer текст 'Success' или 'Fault';

            $('#submitButton').click(function () {
                fetch('static/success.json')
                    .then(res => res.json())
                    .then(function (json) {
                        if (typeOf(json.reason) == 'undefined')
                            json.reason = '';
                        document.getElementById('resultContainer').innerHTML = json.reason;
                        return json.status
                    }).then(status => document.getElementById('resultContainer').classList.add(status))
                $('#submitButton').disabled;
            });

        }
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
            }

            console.log(val_arr, (val_sum > 30), val);

        }
    });


    function showErr() {
        span.removeAttribute('hidden');
        console.log('delited attribute hidden', span.hasAttribute('hidden'));
        elm.classList.add('error');
    }
}


let fio_onChg = onChg(fio, fio_pattern, 'fio_warn'),
    email_onChg = onChg(email, email_pattern, 'email_warn'),
    phone_onChg = onChg(phone, phone_pattern, 'phone_warn');


console.log("FIO:  \n" + fio_onChg, "Phone\n" + phone_onChg + email_onChg);
