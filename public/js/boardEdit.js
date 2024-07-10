/*
CHECKLIST
[x] 글자 표기 관련 내용
[x] board 내용 가져오기
[x] comments 내용 가져오기
[ ] 파일 첨부 null 체크
[ ] edit할 때 파일 불러오기?
*/

import { getBackendDomain } from './config.js';
import {validTitle,validContent } from './boardWrite.js';
import { fetchData, formatNumber, formatDate, extractIdFromUrl, postData, deleteData, patchData, uploadImageAndGetPath } from './fetchData.js';

const href = window.location.href;
const extractedId = href.match(/\/boards\/(\d+)/)[1];
console.log(extractedId);
let titleValid = false;
let contentValid = false;
let writeButton;

function processBoardEditData(data){
    const boardData = data.board;
    const listBox = document.getElementById('main');
    listBox.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const postElement = document.createElement('div');
    postElement.classList.add('post-entity');
    const latestImg = boardData.boardImage;
    const fileMsg = latestImg === undefined || latestImg === null ? "" : "기존 파일 명 : " + (typeof latestImg === 'string' ? latestImg.split('/').pop() : latestImg);
    postElement.innerHTML = `
    <form method="patch">
    <label for="title"><h3>제목 * </h3></label>
    <hr class="horizontal-rule"/> 
    <input type="text" name="title" id = "title" placeholder="제목을 입력해주세요. (최대 26글자)" value="${boardData.title}">  
    <hr class="horizontal-rule"/> 
    <label for="content"><h3>내용 * </h3></label>
    <hr class="horizontal-rule"/> 
    <textarea name="content" id="content" cols="30" rows="11" placeholder="내용을 입력해주세요." >${boardData.content}</textarea>
    <hr class="horizontal-rule"/> 
    <p class="help-text left-margin">*helper text</p>
    <div class="board-image">
        <label for="attachFilePath"><h3>이미지</h3></label>
        <input class = "left-margin"type="file" name="attachFilePath" id = "real-upload" accept="images/*">
        <h4 class = "left-margin">${fileMsg}</h4>
    </div>
    <button type="submit" class="purple-btn" id="write-button"">수정하기</button>
</form>
    `;


    listBox.appendChild(postElement);
    const boardEditBtn = postElement.querySelector('#write-button');

    writeButton = document.getElementById('write-button');
    titleValid = validTitle();
    contentValid = validContent();
    validButton();

    console.log(document.getElementById("title"));

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
    

    console.log(boardEditBtn);
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
    
        uploadImageAndGetPath()
        .then(imagePath => {
            let jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });
            console.log(jsonData);
            jsonData.attachFilePath = imagePath === undefined? latestImg : imagePath;
    
            return patchData(jsonData, '/boards/' + extractedId);
        })
        .then((res) => {
            console.log(res);
            if (res.boardId != null) {
                alert("수정되었습니다!")
                console.log(res.boardId);
                window.location.href = '/boards/detail/' + extractedId;
            } else{

            }
        
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
    });
    
}

function validButton(){
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


Promise.all([
    fetchData('/boards/'+extractedId),
]).then(([res]) => {
    console.log(res);
    processBoardEditData(res);
});