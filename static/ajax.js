/*
function submit(){
    let// err_json = document.getElementById('myForm').setAttribute('action', 'static/error.json'),
        //succ_json = document.getElementById('myForm').setAttribute('action', 'static/success.json'),
        //prog_json = document.getElementById('myForm').setAttribute('action', 'static/progress.json'),
        form = document.forms.myForm,
        but = form.submit ;
        let req = new XMLHttpRequest(),
            FD = new FormData(form);
        req.open('POST', form, true);
        req.onreadystatechange = function () { //обработчик, который при получении ответа вызывает функцию
            if (req.readyState == 4 & req.status == 200) {
                console.log(req.responseText);
            } else {                
                console.log('status:'+req.status+req.statusText);
                return;
            }
        };
    but.disabled = true;
    req.send(FD);   
   };
*/



