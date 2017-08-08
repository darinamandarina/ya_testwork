let fio = document.getElementById('fio'),
    email = document.getElementById('email'),
    phone = document.getElementById('phone'),
    button = document.getElementById('submitButton');

//шаблоны для валидации 
let fio_pattern = /(\w|[\u0410-\u044F])+\s(\w|[\u0410-\u044F])+\s(\w|[\u0410-\u044F])+/,
    email_pattern = /@ya.ru|yandex\.(ru|by|kz|ua|com)$/,
    phone_pattern = /\+7\d{10}/;
	
/***
*Метод validate возвращает объект с признаком результата валидации (isValid) и массивом названий полей, которые не прошли валидацию (errorFields).
*Метод getData возвращает объект с данными формы, где имена свойств совпадают с именами инпутов.
*Метод setData принимает объект с данными формы и устанавливает их инпутам формы. Поля кроме phone, fio, email игнорируются.
*Метод submit выполняет валидацию полей и отправку ajax-запроса, если валидация пройдена. Вызывается по клику на кнопку отправить.
***/
let MyForm = {	
	let validate = validate(),
	submit = submit();	
	

	
};

function validate (elm, pattern, id_of_span){
		let errorFields = [],
	        isValid = false;
		function showErr() {
        span.removeAttribute('hidden');
        console.log('delited attribute hidden', span.hasAttribute('hidden'));
        elm.classList.add('error');
    }
			if (this.value.match(pattern) == null || (this.value.match(pattern).length == 0 || pattern.test(elm.value).length == 0)){ //если не проходит валидацию, то
				showErr();
				errorFields.push(elm);
    }else {
            span.setAttribute("hidden", "");
            if (elm.classList.contains('error')) {
                elm.classList.remove('error');
                errorFields.pop(elm);
				isValid = true;
            }
            console.log('success');
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
		return {isValid, errorFields}
	  };
            
function submit(elm, pattern, id_of_span) {
    let span = document.getElementById(id_of_span);
    elm.addEventListener('change', validate(elm, pattern, id_of_span));
	 if (isValid){
	//Если валидация прошла успешно, кнопка отправки формы должна стать неактивной и должен отправиться ajax-запрос на адрес, указанный в атрибуте action формы
		    $('#submitButton').click(function () {
			//добавим обработчик события click для кнопки, подтверждающей отправку формы;
			//после нажатия появляется внутри div#resultContainer текст и класс, соответсвующий статусу;
                fetch('static/success.json')
                    .then(res => res.json())
                    .then(function (json) {
                        if (typeOf(json.reason) == 'undefined')
                            json.reason = '';
                        document.getElementById('resultContainer').innerHTML = json.reason;
                        return json.status
                    }).then(status => document.getElementById('resultContainer').classList.add(status));
                $('#submitButton').disabled;
            });
	 }
};	  

let fio_onChg = submit(fio, fio_pattern, 'fio_warn'),
    email_onChg = submit(email, email_pattern, 'email_warn'),
    phone_onChg = submit(phone, phone_pattern, 'phone_warn');


//console.log("FIO:  \n" + fio_onChg, "Phone\n" + phone_onChg + email_onChg);
