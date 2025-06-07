// 유틸 함수
function getPostIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 게시글 로드
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let currentPost = null;
let isEditing = false;

function renderPost() {
  const container = document.getElementById('post-details');
  if (!currentPost) {
    container.innerHTML = '<p>게시글을 찾을 수 없습니다.</p>';
    return;
  }

  if (isEditing) {
    container.innerHTML = `
      <label>제목</label><br>
      <input type="text" id="edit-title" value="${escapeHtml(currentPost.title)}" style="width:100%;"><br><br>
      <label>내용</label><br>
      <textarea id="edit-content" style="width:100%; height:200px;">${escapeHtml(currentPost.content)}</textarea><br><br>
      <button onclick="saveEdit()">저장</button>
      <button onclick="cancelEdit()">취소</button>
    `;
  } else {
    container.innerHTML = `
      <h3>${escapeHtml(currentPost.title)}</h3>
      <p><strong>작성자:</strong> ${escapeHtml(currentPost.author)} | <strong>작성일:</strong> ${new Date(currentPost.createdAt).toLocaleDateString('ko-KR')} | <strong>조회수:</strong> ${currentPost.views}</p>
      <hr>
      <p>${escapeHtml(currentPost.content).replace(/\n/g, "<br>")}</p>
    `;
  }
}

function increaseViews() {
  currentPost.views = (currentPost.views || 0) + 1;
  updatePostData();
}

function updatePostData() {
  const index = posts.findIndex(p => p.id === currentPost.id);
  if (index !== -1) {
    posts[index] = currentPost;
    localStorage.setItem('posts', JSON.stringify(posts));
  }
}

// 수정 기능
function toggleEditMode() {
  if (!currentPost) return;
  isEditing = true;
  renderPost();
}

function saveEdit() {
  const newTitle = document.getElementById('edit-title').value.trim();
  const newContent = document.getElementById('edit-content').value.trim();

  if (!newTitle || !newContent) {
    alert('제목과 내용을 모두 입력해주세요.');
    return;
  }

  currentPost.title = newTitle;
  currentPost.content = newContent;
  isEditing = false;
  updatePostData();
  renderPost();
}

function cancelEdit() {
  isEditing = false;
  renderPost();
}

// 삭제 기능
function openDeleteAuth() {
  document.getElementById('modal-overlay').style.display = 'flex';
  document.getElementById('delete-password').value = '';
}

function closeDeleteAuth() {
  document.getElementById('modal-overlay').style.display = 'none';
}

function verifyAndDelete() {
  const inputPw = document.getElementById('delete-password').value.trim();
  if (!inputPw) {
    alert('비밀번호를 입력해주세요.');
    return;
  }

  if (inputPw === atob(currentPost.password)) {
    posts = posts.filter(p => p.id !== currentPost.id);
    localStorage.setItem('posts', JSON.stringify(posts));
    alert('게시글이 삭제되었습니다.');
    location.href = 'board.html';
  } else {
    alert('비밀번호가 일치하지 않습니다.');
  }
}

function closePost() {
  location.href = 'board.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const postId = getPostIdFromURL();
  if (!postId) {
    alert('게시글 ID가 없습니다.');
    location.href = 'board.html';
    return;
  }

  currentPost = posts.find(p => p.id === postId);
  if (!currentPost) {
    alert('게시글을 찾을 수 없습니다.');
    location.href = 'board.html';
    return;
  }

  increaseViews();
  renderPost();
});
