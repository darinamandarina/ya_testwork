/*jshint esversion: 6*/

/***
 *Метод validate возвращает объект с признаком результата валидации (isValid) и массивом названий полей, которые не прошли валидацию (errorFields).
 *Метод getData возвращает объект с данными формы, где имена свойств совпадают с именами инпутов.
 *Метод setData принимает объект с данными формы и устанавливает их инпутам формы. Поля кроме phone, fio, email игнорируются.
 *Метод submit выполняет валидацию полей и отправку ajax-запроса, если валидация пройдена. Вызывается по клику на кнопку отправить.
 ***/

//элементы формы
let fio = document.getElementById('fio'),
    email = document.getElementById('email'),
    phone = document.getElementById('phone'),
    button = document.getElementById('submitButton');

//шаблоны для валидации 
let fio_pattern = /(\w|[\u0410-\u044F])+\s(\w|[\u0410-\u044F])+\s(\w|[\u0410-\u044F])+/,
    email_pattern = /@ya.ru|yandex\.(ru|by|kz|ua|com)$/,
    phone_pattern = /\+7\s*\(*\d{3}\)*(\s|-)*\d{3}(\s|-)*\d{2}(\s|-)*\d{2}\b/;

function fullSubmition(elm, pattern, id_of_span) {

    let span = document.getElementById(id_of_span),
        currentValidation = MyForm.fullValidation(elm, pattern, id_of_span);

    elm.addEventListener('change', currentValidation);
    //Если валидация прошла успешно, кнопка отправки формы должна стать неактивной и должен отправиться ajax-запрос на адрес, указанный в атрибуте action формы
    if (currentValidation.isValid) {
        //добавим обработчик события click для кнопки, подтверждающей отправку формы;
        function sendForm() {
            button.disabled = true;
            //отправка формы и получение ответа от "сервер"
            function ajaxSendForm() {
                axios({
                    method: 'post',
                    url: './static/progress.json'/*document.forms[0].action*/,
                    data: MyForm.getData,
                }).then(res => {
                    if (res.data.status == 'error' || 'success') {
                        document.getElementById('resultContainer').innerHTML = res.data.reason;
                        document.getElementById('resultContainer').classList.add(status);
                    }
                    if (res.data.status == 'progress')
                        setTimeout(ajaxSendForm, res.data.timeout);
                });
            }
        }
        button.addEventListener('click', sendForm);
    });
}
}

function fullValidation(elm, pattern, id_of_span) {
    //массив инпутов, не прошедших валидацию, и переменная подтверждающая, что проверка пройдена
    let errorFields = [],
        isValid = false,
        span = document.getElementById(id_of_span);

    //функция, которая вызывается, если при валидации формы возникает ошибка
    function showErr() {
        span.removeAttribute('hidden');
        console.log('delited attribute hidden', span.hasAttribute('hidden'));
        elm.classList.add('error');
    }

    if (!elm.value.match(pattern) || (elm.value.match(pattern).length == 0 || pattern.test(elm.value).length == 0)) { //(!this.value.match(pattern)) === (this.value.match(pattern) == 0) ===(this.value.match(pattern) == null) если не проходит валидацию, то
        showErr();
        errorFields.push(elm); //добавляем поле (инпут) в массив с полями, не прошедшими проверку
    } else {
        span.setAttribute("hidden", "");
        if (elm.classList.contains('error')) {
            elm.classList.remove('error');
            errorFields.pop(elm);
            isValid = true;
        }
        console.log('success'); //для уверенности, что все прошло, выводим в консоль строку
    }
    //дополнительная проверка для поля ввода номера телефона
    if (elm.id == 'phone') {
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
    return {
        isValid,
        errorFields
    }
}

var MyForm = {
    validate: function () {
        // передаем переменные, объявленные выше, функции fullValidation, тем самым проверяя форму
        let fio_validation = MyForm.fullValidation(fio, fio_pattern, 'fio_warn'),
            email_validation = MyForm.fullValidation(email, email_pattern, 'email_warn'),
            phone_validation = MyForm.fullValidation(phone, phone_pattern, 'phone_warn'),
            unitedErrorFields = [];

        return {
            isValid: fio_validation.isValid && email_validation.isValid && phone_validation.isValid,
            errorFields: unitedErrorFields.concat(fio_validation.errorFields, email_validation.errorFields, phone_validation.errorFields)
        };

    },

    submit: function () {
        //валидация полей

        let fio_submit = MyForm.fullSubmition(fio, fio_pattern, 'fio_warn'),
            email_submit = MyForm.fullSubmition(email, email_pattern, 'email_warn'),
            phone_submit = MyForm.fullSubmition(phone, phone_pattern, 'phone_warn');

        function ValidatingAllFields() {
            fio_submit();
            email_submit();
            phone_submit();
        }

        button.addEventListener('click', ValidatingAllFields);

    },

    getData: function () {
        let obj = {
            fio: document.getElementsByName('fio')[0].value,
            email: document.getElementsByName('email')[0].value,
            phone: document.getElementsByName('phone')[0].value
        };
        return obj;
    },

    setData: function (obj) {
        document.getElementsByName('fio')[0].value = obj.fio;
        document.getElementsByName('email')[0].value = obj.email;
        document.getElementsByName('phone')[0].value = obj.phone;

    }
};
