function getProfileImage(e) {
    let helpMessage = document.getElementById('profile-help');
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
    
    helpMessage.innerHTML = "&nbsp";
}


const realUpload = document.getElementById('real-upload');
const plus = document.getElementById('plus');

plus.addEventListener('click', function () {
    let helpMessage = document.getElementById('profile-help');
    const imagePreview = document.getElementById('upload-img');

    helpMessage.innerHTML ="*프로필 사진을 추가해주세요.";
    imagePreview.setAttribute('src',"/images/default.png");
    realUpload.click();
});
realUpload.addEventListener('change', getProfileImage);

