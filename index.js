/*jshint esversion: 6*/

/***
 *Метод validate возвращает объект с признаком результата валидации (isValid) и массивом названий полей, которые не прошли валидацию (errorFields).
 *Метод getData возвращает объект с данными формы, где имена свойств совпадают с именами инпутов.
 *Метод setData принимает объект с данными формы и устанавливает их инпутам формы. Поля кроме phone, fio, email игнорируются.
 *Метод submit выполняет валидацию полей и отправку ajax-запроса, если валидация пройдена. Вызывается по клику на кнопку отправить.
 ***/

//элементы формы
let fio = document.getElementById('fio'), //document.getElementsByName)('fio')[0]
    email = document.getElementById('email'),
    phone = document.getElementById('phone'),
    button = document.getElementById('submitButton');

//шаблоны для валидации 
let fio_pattern = /(\w|[\u0410-\u044F])+\s(\w|[\u0410-\u044F])+\s(\w|[\u0410-\u044F])+/,
    email_pattern = /@ya.ru|yandex\.(ru|by|kz|ua|com)$/,
    phone_pattern =  /\+7\s*\(*\d{3}\)*(\s|-)*\d{3}(\s|-)*\d{2}(\s|-)*\d{2}\b/;


var MyForm = {
    validate: function () {
        //добавим обработчик события для каждого инпута, тем самым проверяя форму
        let fio_validation = fullValidation(fio, fio_pattern, 'fio_warn'),
            email_validation = fullValidation(email, email_pattern, 'email_warn'),
            phone_validation = fullValidation(phone, phone_pattern, 'phone_warn');
        let arr = [];
        errorFields = arr.concat(fio_validation.errorFields, email_validation.errorFields, phone_validation.errorFields);
        isValid = fio_validation.isValid && email_validation.isValid && phone_validation.isValid;
        console.log('1): '+ fio_validation.isValid+ '\n2): ' + email_validation.isValid  + '\n3): '+phone_validation.isValid + '\n общее: '+ (fio_validation.isValid && email_validation.isValid && phone_validation.isValid));

        return {
            isValid,
            errorFields 
        };

    },

    submit: function () {
        //валидация полей
        function ValidatingAllFields() {
            fullSubmition(fio, fio_pattern, 'fio_warn'),
            fullSubmition(email, email_pattern, 'email_warn'),
            fullSubmition(phone, phone_pattern, 'phone_warn');
        }

        ValidatingAllFields();
        //Если валидация прошла успешно, кнопка отправки формы должна стать неактивной и должен отправиться ajax-запрос на адрес, указанный в атрибуте action формы
    if (MyForm.validate().isValid) {
        //добавим обработчик события click для кнопки, подтверждающей отправку формы;
        function sendForm() {
            button.disabled = true;
            //отправка формы и получение ответа от "сервера"
            function ajaxSendForm() {
                axios({
                    method: 'post',
                    url: document.forms[0].action,
                    data: MyForm.getData()
                    
                }).then(res => {
                    if (res.data.status == 'error' || res.data.status == 'success') {
                        document.getElementById('resultContainer').innerHTML = res.data.reason;
                        document.getElementById('resultContainer').classList.add(status);
                    }
                    if (res.data.status == 'progress')
                        setTimeout(ajaxSendForm, res.data.timeout);
                });
                
            }
            ajaxSendForm();
        }
        sendForm();
    };

    },

    getData: function () {
        let obj = {
            fio: fio.value, //
            email: email.value,
            phone: phone.value
        };
        return obj;
    },

    setData: function (obj) {
        fio.value = obj.fio;
        email.value = obj.email;
        phone.value = obj.phone;

    }
};

function fullValidation(elm, pattern, id_of_span) {
    //массив инпутов, не прошедших валидацию, и переменная подтверждающая, что проверка пройдена
    let errorFields = [],
        isValid = true;
        span = document.getElementById(id_of_span);

    //функция, которая вызывается, если при валидации формы возникает ошибка
    function showErr() {
        span.removeAttribute('hidden');
        console.log('delited attribute hidden', span.hasAttribute('hidden'));
        elm.classList.add('error');
        return isValid = false;
    }

    if (!elm.value.match(pattern) || (elm.value.match(pattern).length == 0 || pattern.test(elm.value).length == 0)) { //(!this.value.match(pattern)) === (this.value.match(pattern) == 0) ===(this.value.match(pattern) == null) если не проходит валидацию, то
        showErr();
        errorFields.push(elm); //добавляем поле (инпут) в массив с полями, не прошедшими проверку
    } else {
        span.setAttribute("hidden", "");
        if (elm.classList.contains('error')) {
            elm.classList.remove('error');
            errorFields.pop(elm);
        }
    }
    //дополнительная проверка для поля ввода номера телефона
    if (elm.id == 'phone') {
        let val = elm.value,
            val_arr = [],
            val_sum = 0;
        val=val.replace(/(\+|\s)/g,'');
        for (var i = 0; i < val.length; i++) {
            val_arr.push(val.slice(i, i + 1));
            val_sum += Number(val_arr[i]);
        }

        if (val_sum > 30) {
            showErr();
        }
    }
    return {
        isValid,
        errorFields
    }
}

function fullSubmition(elm, pattern, id_of_span) {

    let span = document.getElementById(id_of_span),
        currentValidation = fullValidation(elm, pattern, id_of_span);

    elm.addEventListener('change', currentValidation);
    
}

//console.log(MyForm.validate(), MyForm.submit());

button.addEventListener('click', MyForm.submit);
