let posts = JSON.parse(localStorage.getItem('posts')) || [];
let currentPage = 1;
const postsPerPage = 10;
document.addEventListener('DOMContentLoaded', () => {
  displayPosts();
});
// 기본값 보장 및 데이터 정리
posts = posts.map(post => ({
  ...post,
  id: String(post.id),
  views: post.views || 0,
  title: post.title || '제목 없음',
  author: post.author || '익명',
  createdAt: post.createdAt || new Date().toISOString()
}));

// 게시글 저장 (최신 데이터로 localStorage 갱신)
localStorage.setItem('posts', JSON.stringify(posts));

function displayPosts(filteredPosts = posts) {
  const tbody = document.getElementById('board-body');
  tbody.innerHTML = '';

  if (filteredPosts.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">게시글이 없습니다.</td></tr>';
    updatePagination(0);
    return;
  }

  // 페이지네이션용 슬라이스
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = filteredPosts.slice(start, end);

  pagePosts.forEach((post, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${start + index + 1}</td>
      <td><a href="board_view.html?id=${encodeURIComponent(post.id)}">${escapeHtml(post.title)}</a></td>
      <td>${escapeHtml(post.author)}</td>
      <td>${new Date(post.createdAt).toLocaleDateString('ko-KR')}</td>
      <td>${post.views}</td>
    `;
    tbody.appendChild(row);
  });

  updatePagination(filteredPosts.length);
}
function updatePagination(totalPosts, filteredPosts = posts) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.disabled = i === currentPage;
    btn.addEventListener('click', () => {
      currentPage = i;
      displayPosts(filteredPosts);  // 검색 결과 유지됨
    });
    pagination.appendChild(btn);
  }
}

function searchPosts() {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  const filtered = posts.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.author.toLowerCase().includes(query)
  );
  currentPage = 1;
  displayPosts(filtered);
}

// XSS 방지용 간단 escape 함수
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
}

// Enter키로 검색 가능하도록 이벤트 등록
document.getElementById('search-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') searchPosts();
});

// 페이지 로드 시 게시글 표시
document.addEventListener('DOMContentLoaded', () => {
  displayPosts();
});
btn.addEventListener('click', () => {
  currentPage = i;
  displayPosts(filteredPosts);  // 이렇게 하면 검색결과 유지됨
});
