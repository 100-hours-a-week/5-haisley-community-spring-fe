import { postData, uploadImageAndGetPath } from './fetchData.js';
import { getBackendDomain } from './config.js';

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    uploadImageAndGetPath()
        .then(imagePath => {
            let jsonData = {};

            formData.forEach((value, key) => {
                jsonData[key] = value;
            });
            jsonData.attachFilePath = imagePath;

            return postData(jsonData, '/boards');
        })
        .then((res) => {
            console.log(res);
            if (res.boardId) {
                window.location.href = '/boards/detail/' + res.boardId;
            } else {
                
                window.location.href = '/boards';
            }
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
});
