/*
CHECKLIST
[x] 아이콘 클릭시 드롭 다운
[x] hover 시 메뉴 색 변경
*/
import { postData } from './fetchData.js';


function dropDown() {
    let dropDownContent = document.getElementById("dropdown-content");
    if (dropDownContent.style.display === 'block') {
        dropDownContent.style.display = 'none';
    } else {
        dropDownContent.style.display = 'block';
    }
}

function profileImage() {
    const profileImgElement = document.getElementById("drop-btn");
    if (profileImgElement) {
        profileImgElement.setAttribute("src", localStorage.getItem('profile'));
    } else {
        console.error("Profile image element not found");
    }
}
document.getElementById('logout-btn').addEventListener('click', function(event) {
    let jsonData = {};
    postData(jsonData,'/users/logout')
    .then((res)=>{
        alert("로그아웃됐습니다!");
        window.location.href = '/login';
    });
});

// 호출 부분 예시
document.addEventListener("DOMContentLoaded", () => {
    profileImage();  // 프로필 이미지를 설정하는 함수 호출
    const dropBtn = document.getElementById("drop-btn");

    dropBtn.addEventListener('click',dropDown);
    
});