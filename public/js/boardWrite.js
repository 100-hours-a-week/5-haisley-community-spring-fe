/*
CHECKLIST
[x] 제목 26글자
[ ] 본문, 제목 다 써있을 때 버튼 활성화
*/



// 제목 27자 이상 확인
function validTitle(){
    let titleInput = document.getElementById('title');
    if (!isValue(titleInput.value)){
        return false;
    }
    // 입력된 텍스트 길이 확인
    if (titleInput.value.length >= 27) {
        // 27자 이상인 경우 입력 차단
        titleInput.value= titleInput.value.slice(0, 26);
        alert('27자 이상 입력할 수 없습니다.');
        return true;
    }
    return true;
}

function validContent(){
    let contentInput = document.getElementById('content');
    if (!isValue(contentInput.value)){
        return false;
    }
    return true;
}

let titleValid = false;
let contentValid = false;



function validButton(){
    let writeButton = document.getElementById('write-button');
    if (titleValid&&contentValid){
        writeButton.style.backgroundColor = 'var(--btn-purple-possible)';
        writeButton.disabled = false;
        writeButton.style.cursor = 'pointer';
    }else {
        writeButton.style.backgroundColor = 'var(--btn-purple)';
        writeButton.disabled = true;
        writeButton.style.cursor = 'not-allowed';
    }
}

titleValid = validTitle();
contentValid = validContent();
validButton();

document.getElementById("title").addEventListener('input', function(){
    titleValid = validTitle();
    contentValid = validContent();
    validButton();
});
document.getElementById("content").addEventListener('input', function(){
    titleValid = validTitle();
    contentValid = validContent();
    validButton();
});




export { validTitle, validContent, validButton };