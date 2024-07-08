//1. 토스트 메시지, 버튼요소를 변수에 대입
let tostMessage = document.getElementById('tost-message');
let saveBtn = document.getElementById('save');
console.log(saveBtn);

//2. 토스트 메시지 노출-사라짐 함수 작성
function tostOn(){
    tostMessage.classList.add('active');
    setTimeout(function(){
        tostMessage.classList.remove('active');
    },1000);
}

export { tostOn};