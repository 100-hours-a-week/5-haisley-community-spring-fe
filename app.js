/*
TODO
[x] 로그인
  [x] 1번
  [v] 2번 -> post 처리
  [x] 3번
[ ] 게시글
  [x] 1번
  [x] 2번 -> 데이터 불러오고 표기 바꿔야할 듯
  [v] 3번 -> 인피니티 스크롤링은 일단 컷
[x] 회원가입
  [v] 1번 -> 조건이 많아서 확인 해보기
  [x] 2번
  [x] 3번
  [v] 4번 -> 이미지 업로드 구현은 html로만 해둠
[ ] 게시글 상세조회
  [x] 1번
  [x] 2번
  [ ] 3번 -> 데이터 불러오고 표기 바꿔야할 듯
  [v] 4번 -> 텍스트로 저장?
  [v] 5번 -> 수정 나중에 구현
[x] 게시글 수정
  [x] 1번
  [v] 2번 -> 롱 텍스트로 저장
  [v] 3번 -> 기존 이미지 불러오기
  [v] 4번 -> 수정 + 기존 게시글 상세조회 페이지로 가기
[v] 게시글 작성
  [x] 1번
  [v] 2번 -> 롱 텍스트로 저장
  [v] 3번 -> 기존 이미지 저장하기
  [x] 4번 -> post 처리
[x] 회원정보 수정
  [x] 1번
  [x] 2번
  [x] 3번
  [x] 4번 -> 회원 탈퇴 처리
[x] 비밀번호 수정
  [x] 1번
  [x] 2번 -> 토스트 메시지 표기
*/


// express 모듈을 불러옵니다.
const express = require('express');
const axios = require('axios');

// express 애플리케이션을 생성합니다.
const app = express();
// 정적 파일 제공을 위한 미들웨어 설정
app.use(express.static('public'));
// 웹 서버가 사용할 포트 번호를 정의합니다.
const port = 8080;

app.use(express.urlencoded({ extended: true }));


/**
* 루트 경로('/')에 대한 GET 요청을 처리
* 요청이 오면 'Hello World!' 문자열을 응답
*/
// req = request(요청), res = response(응답)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/*
  회원 관련 페이지 서빙
*/

// 로그인
app.get('/login',(req, res) => {
  res.sendFile(__dirname +'/public/html/login.html');
});


// 회원 가입
app.get('/register',(req, res) => {
  res.sendFile(__dirname +'/public/html/register.html');
});

// 회원 정보 수정
app.get('/users/edit',(req, res) => {
  const id = req.params.id;
  res.sendFile(__dirname +'/public/html/user-edit.html');
});

// 비밀 번호 수정
app.get('/users/edit/password',(req, res) => {
  const id = req.params.id;
  res.sendFile(__dirname +'/public/html/user-pwrd-edit.html');
});

// 회원 탈퇴
app.get('/users/delete',(req, res) => {
  const id = req.params.id;
  res.sendFile(__dirname +'/public/html/user-delete.html');
});

/*
  게시글 관련 페이지 서빙
*/

// 게시글 목록 조회
app.get('/boards',(req, res) => {
  res.sendFile(__dirname +'/public/html/board.html');
});

// 게시글 상세 조회
app.get('/boards/detail/:id',(req, res) => {
  const id = req.params.id;
  res.sendFile(__dirname +'/public/html/board-detail.html');
});

// 게시글 작성
app.get('/boards/write',(req, res) => {
  const id = req.params.id;
  res.sendFile(__dirname +'/public/html/board-write.html');
});

// 게시글 수정
app.get('/boards/:id/edit',(req, res) => {
  const id = req.params.id;
  res.sendFile(__dirname +'/public/html/board-edit.html');
});

// 게시글 삭제 팝업
app.get('/boards/:id/delete',(req, res) => {
  const id = req.params.id;
  res.sendFile(__dirname +'/public/html/board-delete.html');
});

// 댓글 삭제 팝업
app.get('/boards/:id/delete-comment',(req, res) => {
  const id = req.params.id;
  res.sendFile(__dirname +'/public/html/comment-delete.html');
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  