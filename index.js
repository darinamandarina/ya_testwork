let fio = document.getElementById('fio'),
    email = document.getElementById('email'),
    phone = document.getElementById('phone'),
    button = document.getElementById('submitButton');
//шаблоны для валидации
let fio_pattern = /\w+\s\w+\s\w+/,
    email_pattern = /@ya.ru|yandex\.(ru|by|kz|ua|com)$/,
    phone_pattern = /\+7\d{10}/;

function onChg(elm, pattern, id_of_span) {
    //fio = fio.value; или fio.innerText или fio.innerHTML ,fio_patern.test(fio)
    elm.addEventListener('change', function () {
        let span = document.getElementById(id_of_span);
    //добавить проверку для phone, сумма цифр которого sum<=30.
        if (this.value.match(pattern) == null || (this.value.match(pattern).length == 0 || pattern.test(elm.value).length == 0)) {

            span.removeAttribute('hidden');
            console.log('delited attribute hidden', span.hasAttribute('hidden'));
            elm.classList.add('error');

        } else {

            span.setAttribute("hidden", "");
            if (elm.classList.contains('error')) elm.classList.remove('error');
            console.log('success');
        };
    })
};

let funct = onChg(fio, fio_pattern, 'fio_warn');

//fio.addEventListener('change', function () {if (this.value.match(fio_pattern).length!=0 || fio_pattern.test(fio.value).length!=0){console.log('success');} else {console.log('failed');};});

//добавим обработчик события click для кнопки, подтверждающей отправку формы; после нажатия появляется элемент span.resultText внутри div#resultContainer c текстом 'Success' или 'Fault';

/*button.addEventListener('click', function(){
    
});*/
console.log("FIO:  ", "\n", funct);
