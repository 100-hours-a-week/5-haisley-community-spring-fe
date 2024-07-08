import { tostOn } from './tostMessage.js';
import { patchData } from './fetchData.js';


// user_id 바꾸기!!
const extractedId = 1;

function validPassword(){
    let passwordInput = document.getElementById('password');
    let passwordMessage = document.getElementById('password-help');

    // 값이 비어있을 때
    if(!isValue(passwordInput.value)){
        passwordMessage.innerHTML = "*비밀번호를 입력해주세요."
        return false;
    }
    
    // 비밀번호 유효성 검사
    if(!pwValidChk(passwordInput.value)){
        passwordMessage.innerHTML = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다."
        return false;
    }
    
    // 올바른 비밀번호
    passwordMessage.innerHTML = "&nbsp"
    return true;
}

function validConfirmPassword(){
    let passwordInput = document.getElementById('password');
    let passwordMessage = document.getElementById('password-help');
    let rePasswordInput = document.getElementById('confirm-password');
    let rePasswordMessage = document.getElementById('confirm-password-help');

     // 값이 비어있을 때
    if(!isValue(rePasswordInput.value)){
        rePasswordMessage.innerHTML = "*비밀번호를 한번더 입력해주세요."
        return false;
    }

    // 비밀번호 확인과 같은지 검사
    if(!pwSameChk(passwordInput.value, rePasswordInput.value)){
        rePasswordMessage.innerHTML = "*비밀번호가 다릅니다.";
        passwordMessage.innerHTML = "*비밀번호가 다릅니다.";
        return false;
    }

    // 유효한 비밀번호인지 검사
    if(!validPassword(passwordInput.value)){
        rePasswordMessage.innerHTML = "&nbsp";
        return false;
    }

    passwordMessage.innerHTML = "&nbsp"
    rePasswordMessage.innerHTML = "&nbsp"
    return true;
}

let passwordValid = false;
let confirmPasswordValid = false;

function validButton(){
    const saveButton = document.getElementById('save');
    if (passwordValid&&confirmPasswordValid){
        saveButton.style.backgroundColor = 'var(--btn-purple-possible)';
        saveButton.disabled = false;
        saveButton.style.cursor = 'pointer';
    }else {
        saveButton.style.backgroundColor = 'var(--btn-purple)';
        saveButton.disabled = true;
        saveButton.style.cursor = 'not-allowed';
    }
}

document.getElementById('password').addEventListener('change', function() {
    passwordValid = validPassword();
    validButton();
});
document.getElementById('confirm-password').addEventListener('input', function() {
    confirmPasswordValid = validConfirmPassword();
    validButton();
});

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    let jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
    console.log(jsonData);

    patchData(jsonData,'/users/password')
    .then((res)=>{
        console.log(res);
        if (res.status !== 200){
            alert("변경 중 오류가 발생했습니다!");
        }
    });
    tostOn();
});