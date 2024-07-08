// fetchData.js

// const backendDomain ='https://rooster-comic-mackerel.ngrok-free.app'
// const backendDomain = 'http://localhost:3001'

import { getBackendDomain } from './config.js';

async function fetchData(path) {
    const address = getBackendDomain() + path;
    try {
        const response = await fetch(address,
            {
                method: 'GET',
                credentials: 'include'
            });
        if (response.status === 401) {
            window.location.href = '/login';
        } else if (response.status === 403) {
            alert("권한이 없습니다!");
        }
        console.log(response);
        return response.json(); // JSON 데이터 반환
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 에러 처리
    }
}

async function postData(jsonData, path){
    const address = getBackendDomain() + path;
    try{
        const response = await fetch(address, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        if (response.status === 401) {
            window.location.href = '/login';
        } else if (response.status === 403) {
            alert("권한이 없습니다!");
        }
        return response.json();
        }catch(error) {
        console.error('Error:', error);
    }
}

async function deleteData(path){
    const address = getBackendDomain() + path;
    try{
        const response = await fetch(address, {
            method: 'DELETE',
            credentials: 'include'
        });
        console.log(response);
        if (response.status === 401) {
            window.location.href = '/login';
        } else if (response.status === 403) {
            alert("권한이 없습니다!");
        }
        return response.json();
        }catch(error) {
        console.error('Error:', error);
    }
}

async function patchData(jsonData, path){
    const address = getBackendDomain() + path;
    try{
        const response = await fetch(address, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        if (response.status === 401) {
            window.location.href = '/login';
        } else if (response.status === 403) {
            alert("권한이 없습니다!");
        }
        return response.json();
        }catch(error) {
        console.error('Error:', error);
    }
}

async function uploadImageAndGetPath() {
    try {
        let formData = new FormData();
        let file = document.getElementById('real-upload').files[0];

        if (!file) {
            return;
        }

        formData.append('myFile', file);

        const response = await fetch(getBackendDomain() + '/uploadImg', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        console.log(response);

        if (response.status === 401) {
            window.location.href = '/login';
            return;
        } else if (response.status === 403) {
            alert("권한이 없습니다!");
            return;
        }

        const res = await response.json();
        console.log(res);

        if (res.data && res.data.file_path) {
            return res.data.file_path; // 이미지 경로 반환
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}


function extractIdFromUrl() {
    const href = window.location.href;
    const regex = /\/(\d+)(?:\/)?$/; // 맨 뒤에 있는 숫자를 추출
    let match = regex.exec(href);
    if (match && match.length > 1) {
        return match[1]; // 첫 번째 그룹에 해당하는 부분 반환 (즉, 숫자)
    } else {
        return null; // 일치하는 것이 없으면 null 반환
    }
}

function formatNumber(number) {
    if (number == null) return '0';
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'k';
    } else {
        return number.toString();
    }
}

const formatDate = (isoString) => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export { fetchData, formatNumber, formatDate, postData, extractIdFromUrl, deleteData, patchData, uploadImageAndGetPath };
