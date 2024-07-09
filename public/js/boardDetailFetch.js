/*
CHECKLIST
[x] 글자 표기 관련 내용
[x] board 내용 가져오기
[x] comments 내용 가져오기
[ ] 파일 첨부 null 체크
[ ] comment count??
*/

import { getBackendDomain } from './config.js';
import { fetchData, formatNumber, formatDate, extractIdFromUrl, postData, deleteData, patchData } from './fetchData.js';

const extractedId = extractIdFromUrl();

// 게시글 삭제 모달
const boardDeleteModal = document.getElementById('board-delete');

// 댓글 삭제 모달
const commentDeleteModal = document.getElementById('comment-delete');

function processBoardDetailData(data){
    const boardData = data.board;
    const listBox = document.getElementById('post');
    listBox.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const postElement = document.createElement('div');
    postElement.classList.add('post-entity');
    const latestImg = boardData.boardImage;
    console.log(boardData.boardImage);
    const fileHtml = latestImg === undefined || latestImg === null ? "" : `<img class="board-image" src="${boardData.boardImage}" alt="board-img">`;

    postElement.innerHTML = `
    <article class="head">
        <h2 class="title">
            ${boardData.title}
        </h2>
        <article class="detail">
            <article class="text-detail">
            <p>
                <article class="box">
                <img class="logo" src="${boardData.profileImage}" alt="profile-img">
                </article>
                <h3 class="writer-detail">${boardData.nickname}</h3>
            </p>
            <h4 class="time-detail">
            ${formatDate(boardData.createdAt)}
            </h4>
            </article>
    
            <article class="small-buttons">
                <a class="sbutton" id="board-edit-btn">수정</a>
                <a class="sbutton" id="board-delete-btn">삭제</a>
            </article>
        </article>
    </article>
    
    <hr class="horizontal-rule"/>
    
    <article class="main">
        ${fileHtml}
        <p class="content">${boardData.content}</p>
    
    <article class="infos">
        <article class="info">
            <p class="num">${formatNumber(boardData.hit)}</p>
            <h3>조회수</h3>
        </article>
        <article class="info">
            <p class="num">${formatNumber(0)}</p>
            <h3>댓글</h3>
        </article>
    </article>
    `;
    

    listBox.appendChild(postElement);

    const boardDeleteBtn = postElement.querySelector('#board-delete-btn');

    if(boardDeleteBtn) {
        boardDeleteBtn.addEventListener('click', function() {
            boardDeleteModal.style.display = 'flex';
            freeze(overlay);
        });
    }

    const boardEditBtn = postElement.querySelector('#board-edit-btn');
    if(boardEditBtn) {
        boardEditBtn.addEventListener('click', function() {
            window.location.href = '/boards/'+extractedId+'/edit';
        });
    }
}

function processCommentData(data){
    const commentData = data.comments;
    const listBox = document.getElementById('comments');
    listBox.innerHTML = '';

    const fragment = document.createDocumentFragment();

    commentData.forEach((comment) => {

        const unit  = document.createElement('div');
        unit.classList.add('unit');
        unit.setAttribute('data-comment-id', comment.commentId);
        unit.innerHTML = 
            `<article class="detail">
                    <article class="text-detail">
                    <p>
                        <article class="box">
                        <img class="logo" src="${comment.profileImage}" alt="profile-img">
                        </article>
                        <h3 class="writer-detail"> ${comment.nickname}</h3>
                    </p>
                    <h4 class="time-detail">${formatDate(comment.createdAt)}</h4>
                    </article>
                    <article class = "small-buttons">
                    <a class="sbutton comment-edit-button">수정</a>
                    <a class="sbutton comment-delete-btn">삭제</a>
                    </article>
            </article>
                <h4 class = "content">${comment.content}</h4>`;
        fragment.appendChild(unit);

    });

    listBox.appendChild(fragment);

    const commentEditBtn = document.querySelector('#edit-comment');
    const commentPostBtn = document.querySelector('#post-comment');
    const commentBox = document.getElementById('comment');

    document.querySelectorAll('.comment-delete-btn').forEach(button => {
        button.addEventListener('click', function() {

            const unit = this.closest('.unit');
            const commentId = unit.dataset.commentId;
            console.log(commentId); 
            commentDeleteModal.setAttribute('data-comment-id', commentId);
            commentDeleteModal.style.display = 'flex';
            freeze(overlay);
        });
    });

    document.querySelectorAll('.comment-edit-button').forEach(button => {
        button.addEventListener('click', function() {
            console.log(commentEditBtn);
            const unit = this.closest('.unit');
            const commentId = unit.dataset.commentId;
            console.log(commentId); 
            commentPostBtn.style.display = 'none';
            commentEditBtn.style.display = 'flex';
            commentEditBtn.setAttribute('data-comment-id', commentId);
            const commentContent = unit.querySelector('.content');
            commentBox.textContent = commentContent.textContent;
        });
    });
}

Promise.all([
    fetchData('/boards/'+extractedId),
]).then(([res]) => {
    console.log(res);
    processBoardDetailData(res);
    processCommentData(res);
});


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
});

document.getElementById('post-comment').addEventListener('click', function(event) {
    const form = this.closest('form');
    const formData = new FormData(form);

    let jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    postData(jsonData,'/boards/'+extractedId+'/comments')
    .then((res)=>{
        console.log(res);
        window.location.href = '/boards/detail/'+extractedId;
    });
});


document.getElementById('edit-comment').addEventListener('click', function(event) {
    const commentId = this.dataset.commentId;
    const form = this.closest('form');
    const formData = new FormData(form);

    let jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    patchData(jsonData,'/boards/'+extractedId+'/comments/'+commentId)
    .then((res)=>{
        if (res.status === 200) {
            alert("수정되었습니다!")
        } 
        window.location.href = '/boards/detail/'+extractedId;
    });
});