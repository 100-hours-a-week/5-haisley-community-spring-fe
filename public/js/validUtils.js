/*
CHECKLIST
[x] 프로필 사진 업로드 X -> register.js에 구현

[x] 이메일 비어있거나 작성중일 때 처리 -> 'change' 쓰기
[x] 이메일 형식 유효성
[ ] 중복된 이메일일 때

[x] 비밀번호 유효성
[x] 비밀번호 입력 안 했을 시
[x] 비밀번호 확인과 다를 시

[x] 비밀번호 확인 입력 안 했을 시
[x] 비밀번호 확인과 다를 시

[x] 닉네임 입력 안 했을 시
[x] 닉네임 띄어쓰기 있을 시
[ ] 닉네임 중복 시
[x] 11자 이상 작성 시

*/

// export를 각각 붙여놓고 함수만 쏙쏙가져온다 -> 필요한 함수들만 가져오기

// 이메일 유효성을 검사
function emailValidChk(email) {
    // 이메일 유효성 검사를 위한 정규식
    const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    
    // 이메일 유효성을 검사
    if(emailPattern.test(email) === false) {
        return false; // 유효하지 않은 경우
    } else if(email.length < 5) {
        return false; // 너무 짧은 경우
    } else {
        return true; // 유효한 경우
    }
}

// 이메일 중복 검사
function emailExists(email){
    // [ ] 이메일 중복 검사 코드
    return false;
}

// 비밀번호 유효성을 검사
function pwValidChk(password){
    // 비밀번호가 8자 이상, 20자 이하
    if (password.length < 8 || password.length > 20) {
        return false;
    }

    // 대문자, 소문자, 숫자, 특수문자 중 최소 1개 이상이 포함
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (!uppercaseRegex.test(password) ||
        !lowercaseRegex.test(password) ||
        !numberRegex.test(password) ||
        !specialCharacterRegex.test(password)) {
        return false;
    }

    // 모든 조건을 만족할 경우 유효함
    return true;
}

// 비밀번호 확인과 동일한지 확인
function pwSameChk(password, confirmPassword){
    if (password !== confirmPassword){ // 두 비밀번호가 같아야함
        return false;
    }else{
        return true;
    }
}

// 값을 입력 안 했는지 확인
function isValue(value){
    if (value.length > 0){return true;} else {return false;}
}

// 닉네임 띄어쓰기 있는지 확인
function checkWhitespace(value) {
    if (value.indexOf(' ') !== -1) {
        return true;
    } else {
        return false; 
    }
}

// 닉네임 11자 이상 확인
function nameLengthChk(nickname){
    if(nickname.length > 10){return false;} else {return true;}
}

function nicknameExists(nickname){
    // [ ] 닉네임 중복 검사 코드
    return false;
}
