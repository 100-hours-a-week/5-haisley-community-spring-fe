
import { getBackendDomain } from './config.js';
import { tostOn } from './tostMessage.js';
import { fetchData, deleteData, patchData, uploadImageAndGetPath } from './fetchData.js';

// user_id 바꾸기!!
const extractedId = 1;
console.log(extractedId);

function getProfileImage(e) {
    const file = e.currentTarget.files[0]; // 첫 번째 파일만 선택

    // 파일을 안 올린 경우
    if (!file) {
        return;
    }

    // 파일 타입 검사
    if (!file.type.match("image/.*")) {
        alert('이미지 파일만 업로드가 가능합니다.');
        return;
    }

    // 미리보기 업로드
    const reader = new FileReader();
    reader.onload = (e) => {
        const imagePreview = document.getElementById('upload-img');
        imagePreview.setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(file);
}

function processUserEditData(data){
    console.log(data);
    const userData = data.user;
    const listBox = document.getElementById('form-div');
    listBox.innerHTML = '';

    const userElement = document.createElement('div');
    userElement.classList.add('user-element');
    const latestProfile = userData.profile_image;
    userElement.innerHTML = `
    <form>
        <article class="profile-img">
            <h3>프로필 사진*</h3>
            <div class="profile-box">
                <img id="upload-img" src="${getBackendDomain()+ latestProfile}" alt="profile-img">
            </div>
            <input type="file" id="real-upload" name="profile-img" accept="images/*">
            <div class="edit" id="plus-img">
                <a class="sbutton">변경</a>
            </div>
        </article>
        <h3>이메일</h3>
        <h4 class="content">${userData.email}</h4>
        <label for="nickname"><h3>닉네임</h3></label>
        <input id="nickname" type="text" name="nickname" placeholder="새 닉네임을 입력하세요" value="${userData.nickname}">
        <p id="nickname-help" class = "help-text">&nbsp</p>
        <button id="save" class="purple-btn" type="submit">수정하기</button>
    </form>
    `;
    
    listBox.appendChild(userElement);
    // --------
    const realUpload = document.getElementById('real-upload');
    const plus = document.getElementById('plus-img');

    plus.addEventListener('click', function () {
        const imagePreview = document.getElementById('upload-img');

        imagePreview.setAttribute('src',"/images/default.png");
        realUpload.click();
    });
    realUpload.addEventListener('change', getProfileImage);

    const boardEditBtn = userElement.querySelector('#save');

    console.log(boardEditBtn);
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        let jsonData = {};
    
        uploadImageAndGetPath()
        .then(imagePath => {

    
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });
            console.log(jsonData);
            jsonData.profileImage = imagePath===undefined? latestProfile : imagePath;
            
            // 중복된 닉네임인지 확인
            return fetchData('/users/nickname/check?nickname=' + jsonData.nickname);
        })
        .then(nicknameCheckRes => {
            console.log(nicknameCheckRes);
            if (nicknameCheckRes.status !== 200) {
                // 중복된 닉네임이면 알림 표시 후 Promise를 거부하여 다음 작업을 중지
                alert('중복된 닉네임입니다!');
                throw new Error('중복된 닉네임');
            }
    
            // 중복된 닉네임이 아니면 patchData 함수 실행
            return patchData(jsonData, '/users');
        })
        .then(patchRes => {
            console.log(patchRes);
            if (patchRes.status !== 200) {
                alert("변경 중 오류가 발생했습니다!");
            }
            // patchData 함수가 성공하든 실패하든 tostOn 함수 호출
            tostOn();
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
    });
    

}


Promise.all([
    fetchData('/users'),
]).then(([res]) => {
    console.log(res);
    processUserEditData(res.data);
});

const deleteCancelBtn = document.getElementById('user-delete-cancel');
const deleteConfirmBtn = document.getElementById('user-delete-confirm');
const userDeleteModal = document.getElementById('user-delete');
console.log(deleteConfirmBtn);


const overlay = document.getElementById('overlay');

deleteCancelBtn.addEventListener('click', function(){
    userDeleteModal.style.display = 'none';
    ddang(overlay);
});

deleteConfirmBtn.addEventListener('click', function(){
    deleteData('/users')
    .then((res)=>{
        console.log(res);
        window.location.href = '/login'
    })
});


const userDeleteBtn = document.getElementById('#user-delete-btn');
if(userDeleteBtn) {
    userDeleteBtn.addEventListener('click', function() {
        userDeleteModal.style.display = 'flex';
        freeze(overlay);
    });
}


