/*
TODO 
[ ] button에 disable 넣어두기
*/

import { postData, fetchData } from './fetchData.js';
import { getBackendDomain } from './config.js';

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

    // Modify the field name from 'email' to 'userName'
    const emailValue = formData.get('email');
    if (emailValue) {
        formData.set('username', emailValue);
        formData.delete('email');
    }

    // Send FormData to server
    fetch(getBackendDomain() + '/login', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Extract token from headers
        const token = response.headers.get('Authorization')?.replace('Bearer ', '');
        if (token) {
            // Store token in localStorage
            localStorage.setItem('authToken', token)
            
            // store profile image in localStorage
            fetchData('/users')
            .then(res => {
                console.log(res);
                alert(res.userId);
                localStorage.setItem('profile', res.profileImage);
                localStorage.setItem('userId', res.userId);
                window.location.href = '/boards';
            })

        } else {
            alert('입력 정보가 일치하지 않습니다');
            window.location.href = '/login';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});



document.getElementById('email').addEventListener('input', validateInput);
document.getElementById('password').addEventListener('input', validateInput);
