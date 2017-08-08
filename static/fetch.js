function fetch_json(url){
    fetch(url).then(res=>res.json()).then(json => json.status).then(status=>document.getElementById('').addEventListener('click', function(){this.classList.add(status)}));
}

fetch_json('git/ya_testwork/static/error.json'); 
fetch_json('git/ya_testwork/static/success.json');

function fetch_json_into_div(url){
// if (validate.isValid) {url='git/ya_testwork/static/success.json';} else{url=}
    fetch(url).then(res=>res.json()).then(function(json){ if(typeOf(json.reason)=='undefined') json.reason=''; document.getElementById('resultContainer').innerHTML=json.reason; return json.status}).then(status=>document.getElementById('resultContainer').classList.add(status));
}

fetch_json_into_div('git/ya_testwork/static/success.json');