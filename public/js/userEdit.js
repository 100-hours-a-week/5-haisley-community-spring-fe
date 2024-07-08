/*
CHECKLIST
[x] 닉네임
[x] 수정 완료 토스트 메시지
[x] 회원 삭제 모달 연결
*/

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

const userDeleteModal = document.getElementById('user-delete');
const userDeleteBtn = document.getElementById('user-delete-btn');
const overlay = document.getElementById('overlay');
userDeleteBtn.addEventListener('click', function() {
    userDeleteModal.style.display = 'flex';
    freeze(overlay);
});



const editBtn = document.getElementById('save');
editBtn.addEventListener('click',validNickname);