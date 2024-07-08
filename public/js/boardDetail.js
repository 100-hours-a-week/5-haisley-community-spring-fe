/*
CHECKLIST
[x] 모달 창 띄우기
[x] 댓글 버튼
[ ] 댓글 삭제/ 수정 어케 구현함??
*/


import { getBackendDomain } from './config.js';
import { fetchData, formatNumber, formatDate, extractIdFromUrl, deleteData } from './fetchData.js';


function validateComment() {
    let commentInput = document.getElementById('comment');
    let commentBtns = document.querySelectorAll('.comment-btn');
    
    commentBtns.forEach(function(commentBtn) {if (isValue(commentInput.value)) {
        commentBtn.style.backgroundColor = 'var(--btn-purple-possible)';
        commentBtn.disabled = false;
        commentBtn.style.cursor = 'pointer';
    } else {
        commentBtn.style.backgroundColor = 'var(--btn-purple)'
        commentBtn.disabled = true;
        commentBtn.style.cursor = 'not-allowed';
    }});
}


const deleteCancelBtn = document.getElementById('board-delete-cancel');
const deleteConfirmBtn = document.getElementById('board-delete-confirm');
const boardDeleteModal = document.getElementById('board-delete');
console.log(deleteConfirmBtn);

const commentCancelBtn = document.getElementById('comment-delete-cancel');
const commentConfirmBtn = document.getElementById('comment-delete-confirm');
// 댓글 삭제 모달
const commentDeleteModal = document.getElementById('comment-delete');


document.getElementById('comment').addEventListener('input', validateComment);

const extractedId = extractIdFromUrl();

const overlay = document.getElementById('overlay');

deleteCancelBtn.addEventListener('click', function(){
    boardDeleteModal.style.display = 'none';
    ddang(overlay);
});

deleteConfirmBtn.addEventListener('click', function(){
    deleteData('/boards/'+extractedId)
    .then((res)=>{
        if (res.status === 204) {
            alert("삭제되었습니다!");
            window.location.href = '/boards';
        } 
        window.location.href = '/boards/detail/'+extractedId;
    })
});

commentCancelBtn.addEventListener('click', function(){
    commentDeleteModal.style.display = 'none';
    ddang(overlay);
});

commentConfirmBtn.addEventListener('click', function(){
    const commentId = commentDeleteModal.dataset.commentId;
    deleteData('/boards/'+extractedId+'/comments/'+commentId)
    .then((res)=>{
        if (res.status === 200) {
            alert("삭제되었습니다!")
        } 
        window.location.href = '/boards/detail/'+extractedId;
    })
});

