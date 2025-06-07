document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const emailMsg = document.getElementById("email-msg");
  const resultDiv = document.getElementById("recoverResult");

  // 이메일 유효성 검사
  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
      emailMsg.textContent = "유효한 이메일 형식이 아닙니다.";
    } else {
      emailMsg.textContent = "";
    }
  });

  // 아이디 찾기
  document.getElementById("findIdBtn").addEventListener("click", () => {
    handleRecovery("id");
  });

  // 비밀번호 찾기
  document.getElementById("findPwBtn").addEventListener("click", () => {
    handleRecovery("pw");
  });

  function handleRecovery(type) {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    resultDiv.className = "recover-result";
    resultDiv.innerHTML = `<p class="loading">잠시만 기다려주세요...</p>`;

    setTimeout(() => {
      const stored = JSON.parse(sessionStorage.getItem("latestRegistration") || "{}");

      if (!name || !phone || !email) {
        resultDiv.classList.add("error");
        resultDiv.innerHTML = `<p>모든 정보를 입력해주세요.</p>`;
        return;
      }

      if (!emailPattern.test(email)) {
        resultDiv.classList.add("error");
        resultDiv.innerHTML = `<p>이메일 형식이 올바르지 않습니다.</p>`;
        return;
      }

      if (stored.name === name && stored.phone === phone && stored.email === email) {
        resultDiv.classList.add("success");
        resultDiv.innerHTML = type === "id"
          ? `<p>아이디는 <strong>${stored.email}</strong>입니다.</p>`
          : `<p>비밀번호 재설정 링크를 <strong>${stored.email}</strong>로 전송했습니다.</p>`;
      } else {
        resultDiv.classList.add("error");
        resultDiv.innerHTML = `<p>일치하는 회원 정보를 찾을 수 없습니다.</p>`;
      }
    }, 1500);
  }
});
