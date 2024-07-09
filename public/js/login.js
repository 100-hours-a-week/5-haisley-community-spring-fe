/*
TODO 
[ ] button에 disable 넣어두기
*/

import { postData } from './fetchData.js';

function validateInput() {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    let helpMessage = document.getElementById('login-help');
    let loginButton = document.getElementById('login-btn');

    if (emailValidChk(emailInput.value) && pwValidChk(passwordInput.value)) {
        helpMessage.innerHTML = '&nbsp';
        loginButton.style.backgroundColor = 'var(--btn-purple-possible)';
        loginButton.disabled = false;
        loginButton.style.cursor = 'pointer';
    } else {
        loginButton.style.backgroundColor = 'var(--btn-purple)';
        helpMessage.innerHTML = '*입력하신 계정 정보가 정확하지 않습니다.';
        loginButton.disabled = true;
        loginButton.style.cursor = 'not-allowed';
    }
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    let jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
    console.log(jsonData);
    postData(jsonData,'/users/login')
    .then((res)=>{
        console.log(res);
        if (res.status === 200){
            window.location.href = '/boards';
        }else{
            alert('입력 정보가 일치하지 않습니다');
            window.location.href = '/login'
        }
    });
});





document.getElementById('email').addEventListener('input', validateInput);
document.getElementById('password').addEventListener('input', validateInput);
