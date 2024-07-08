/*
CHECKLIST
[x] 파일 없는 경우 처리

[x] 이메일 비어있거나 작성중일 때 처리 (그냥 비어있는 걸로 해도 되나?)
[x] 이메일 형식 유효성
[ ] 중복된 이메일일 때

[x] 비밀번호 유효성
[x] 비밀번호 입력 안 했을 시
[v] 비밀번호 확인과 다를 시

[x] 비밀번호 확인 입력 안 했을 시
[x] 비밀번호 확인과 다를 시

[v] 닉네임 유효성 검사 -> 띄어쓰기 + 10글자 + no 중복 (중복 해야함)
[x] 닉네임 입력 안 했을 시
[x] 닉네임 띄어쓰기 있을 시
[ ] 닉네임 중복 시
[x] 11자 이상 작성 시

[x] 회원 가입 버튼 활성화 함수
[ ] button에 disable 넣어두기
*/

import { postData, fetchData, uploadImageAndGetPath } from './fetchData.js';
import { getBackendDomain } from './config.js';

// 이메일 유효성 확인
function validEmail(){
    let emailInput = document.getElementById('email');
    let emailMessage = document.getElementById('email-help');

    // 값이 비어있을 때
    if(!isValue(emailInput.value)){
        emailMessage.innerHTML = "*이메일을 입력해주세요."
        return false;
    }

    // 이메일 유효성 검사
    if(!emailValidChk(emailInput.value)){
        emailMessage.innerHTML = "*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)"
        return false;
    }

    // 이메일 중복 검사
    if(emailExists(emailInput.value)){
        emailMessage.innerHTML = "*중복된 이메일입니다."
        return false;
    }

    // 올바른 이메일
    emailMessage.innerHTML = "&nbsp"
    return true;
}

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

    // [x] 비밀번호가 같은데 유효하지 않으면 어떻게 처리할지 생각 -> 위에 비밀번호 valid 체크 + same함수 삭제
    passwordMessage.innerHTML = "&nbsp"
    rePasswordMessage.innerHTML = "&nbsp"
    return true;
}

// 닉네임 유효성 확인
function validNickname(){
    let nicknameInput = document.getElementById('nickname')
    let nicknameMessage = document.getElementById('nickname-help');
    
     // 값이 비어있을 때
    if(!isValue(nicknameInput.value)){
        nicknameMessage.innerHTML = "*닉네임을 입력해주세요."
        return false;
    }

    // 띄어쓰기 있는지 검사
    if(checkWhitespace(nicknameInput.value)){
        nicknameMessage.innerHTML = "*띄어쓰기를 없애주세요."
        return false;
    }

    // 중복 닉네임 있는지 검사
    if(nicknameExists(nicknameInput.value)){
        nicknameMessage.innerHTML = "*중복된 닉네임입니다."
        return false;
    }

    // 11자 이상인지 검사
    if(!nameLengthChk(nicknameInput.value)){
        nicknameMessage.innerHTML = "*닉네임은 최대 10자 까지 작성 가능합니다."
        return false;
    }
    
    nicknameMessage.innerHTML = "&nbsp"
    return true;
}

let emailValid = false;
let passwordValid = false;
let confirmPasswordValid = false;
let nicknameValid = false;

function validButton(){
    let registerButton = document.getElementById('register-btn');
    if (emailValid&&passwordValid&&confirmPasswordValid&&nicknameValid){
        registerButton.style.backgroundColor = 'var(--btn-purple-possible)';
        registerButton.disabled = false;
        registerButton.style.cursor = 'pointer';
    }else {
        registerButton.style.backgroundColor = 'var(--btn-purple)';
        registerButton.disabled = true;
        registerButton.style.cursor = 'not-allowed';
    }
}

document.getElementById('email').addEventListener('change', function() {
    emailValid = validEmail();
    validButton();
});
document.getElementById('password').addEventListener('change', function() {
    passwordValid = validPassword();
    validButton();
});
document.getElementById('confirm-password').addEventListener('input', function() {
    confirmPasswordValid = validConfirmPassword();
    validButton();
});
document.getElementById('nickname').addEventListener('change', function() {
    nicknameValid = validNickname();
    validButton();
});

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    let jsonData; // jsonData 변수를 선언

    console.log("upload!!");
    uploadImageAndGetPath()
    .then(imagePath => {
        const formData = new FormData(this);

        jsonData = {}; // jsonData 변수에 값을 할당

        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        jsonData.profileImagePath = imagePath;

        console.log(jsonData);
        console.log("updated!!!")

        return fetchData('/users/email/check?email=' + jsonData.email);
    })
    .then(emailCheckRes => {
        console.log(emailCheckRes);
        if (emailCheckRes.status !== 200) {
            alert('중복된 이메일입니다!');
            throw new Error('중복된 이메일');
        }
        return fetchData('/users/nickname/check?nickname=' + jsonData.nickname);
    })
    .then(nicknameCheckRes => {
        console.log(nicknameCheckRes);
        if (nicknameCheckRes.status !== 200) {
            alert('중복된 닉네임입니다!');
            throw new Error('중복된 닉네임');
        }
        return postData(jsonData, '/users/signup');
    })
    .then(signupRes => {
        console.log(signupRes);
        if (signupRes.status === 201) {
            window.location.href = '/login';
            alert('회원가입이 완료되었습니다!');
        } else {
            alert('입력 정보가 올바르지 않습니다!');
        }
    })
    .catch(error => {
        console.error('Error occurred:', error);
    });
});
