function savePost() {
  const title = document.getElementById("post-title").value.trim();
  const author = document.getElementById("post-author").value.trim();
  const password = document.getElementById("post-password").value.trim();
  const content = document.getElementById("post-content").value.trim();

  // 필수 입력값 확인
  if (!title || !author || !password || !content) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  // 게시글 목록 불러오기
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");

  // 날짜 포맷: YYYY-MM-DD
  const formattedDate = new Date().toISOString().split("T")[0];

  // 간단한 해시 함수 (보안 강화 버전은 서버에서 처리해야 함)
  const hashPassword = btoa(password); // Base64 인코딩

  // 새 게시글 객체 생성
  const newPost = {
    id: crypto.randomUUID,  // UUID 사용 (modern browsers)
    title,
    author,
    password: hashPassword,
    content,
    date: formattedDate,
    views: 0,
  };

  // 저장
  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));

  alert("게시글이 저장되었습니다.");
  window.location.href = "board.html";
}

function cancelWrite() {
  const confirmCancel = confirm("작성을 취소하시겠습니까? 작성 중인 내용은 저장되지 않습니다.");
  if (confirmCancel) {
    window.location.href = "board.html";
  }
}
const newPost = {
  id: Date.now().toString(),
  title,
  author,
  password: btoa(password),  // Base64 인코딩
  content,
  date: new Date().toLocaleDateString('ko-KR'),
  views: 0,
};