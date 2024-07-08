// boardFetch.js

import { fetchData, formatNumber, formatDate } from './fetchData.js';

import { getBackendDomain } from './config.js';

function processBoardData(data) {
    const boardData = data.boards;
    const listBox = document.getElementById('list');
    listBox.innerHTML = '';

    const fragment = document.createDocumentFragment();

    boardData.forEach((board) => {

        const postElement = document.createElement('div');
        postElement.classList.add('unit');
        postElement.setAttribute('onclick', `window.location.href='/boards/detail/${board.board_id}';`);
        postElement.innerHTML = `
            <article class="content">
                <h2 class="title">${board.title}</h2>
                <article class="detail">
                    <h4 class="board-detail">댓글 ${0}  조회수 ${formatNumber(board.hit)} </h4>
                    <h4 class="time-detail">${formatDate(board.created_at)} </h4>
                </article>
            </article>
            <hr class="horizontal-rule"/>   
            <article class="writer">
                <div class="box">
                <img class="logo" src="${getBackendDomain()+board.profile_image} " alt="profile-img">
                </div>
                <h3>${board.nickname}</h3>
            </article>
        `;

        fragment.appendChild(postElement);

    });

    listBox.appendChild(fragment);
}

Promise.all([
    fetchData('/boards'),
]).then(([res]) => {
    console.log(res);
    console.log(res.data);
    processBoardData(res.data);
});

