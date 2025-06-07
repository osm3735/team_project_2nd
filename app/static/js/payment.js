
const CART_KEY = 'shoppingCart';

function loadCart() {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function renderCartItems(items, containerId, isModal = false) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID ${containerId} not found`);
    return 0;
  }
  container.innerHTML = '';

  if (items.length === 0) {
    container.innerHTML = '<p style="color: #555;">장바구니에 담긴 상품이 없습니다.</p>';
    return 0;
  }

  let total = 0;
  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = isModal ? 'cart-item' : 'item';
    itemDiv.innerHTML = `
      <img src="${item.image || item.img || 'https://via.placeholder.com/100'}" alt="${item.name}">
      <p><strong>${item.name}</strong> x ${item.qty}</p>
      <p>₩${(item.price * item.qty).toLocaleString()}</p>
    `;
    container.appendChild(itemDiv);
    total += item.price * item.qty;
  });

  return total;
}

function renderSummaryCartItems(items) {
  const container = document.getElementById('summary-cart-items');
  if (!container) {
    console.error('Summary container not found');
    return;
  }
  container.innerHTML = '';

  if (items.length === 0) {
    container.innerHTML = '<p style="color: #555;">장바구니에 담긴 상품이 없습니다.</p>';
    return;
  }

  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'summary-cart-item';
    itemDiv.innerHTML = `
      <img src="${item.image || item.img || 'https://via.placeholder.com/100'}" alt="${item.name}">
      <p><strong>${item.name}</strong></p>
      <p>x ${item.qty}</p>
    `;
    container.appendChild(itemDiv);
  });
}

function renderCartSummary(items) {
  const summaryCount = document.getElementById('summary-count');
  const summaryTotal = document.getElementById('summary-total');
  if (!summaryCount || !summaryTotal) {
    console.error('Summary count or total elements not found');
    return;
  }
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  
  summaryCount.textContent = items.length;
  summaryTotal.textContent = `₩${total.toLocaleString()}`;
}

function updateCartSummary(count) {
  const cartCount = document.getElementById('cart-count');
  const cartCountPreview = document.getElementById('cart-count-preview');
  if (cartCount && cartCountPreview) {
    cartCount.textContent = count;
    cartCountPreview.textContent = count;
  } else {
    console.error('Cart count elements not found');
  }
}

function renderPaymentCart() {
  const cart = loadCart();
  const total = renderCartItems(cart, 'payment-cart-items');
  
  const totalPrice = document.getElementById('total-price');
  const finalPrice = document.getElementById('final-price');
  if (totalPrice && finalPrice) {
    totalPrice.textContent = `₩${total.toLocaleString()}`;
    finalPrice.textContent = `₩${total.toLocaleString()}`;
  } else {
    console.error('Price elements not found');
  }
  updateCartSummary(cart.length);
}

document.addEventListener('DOMContentLoaded', () => {
  renderPaymentCart();

  const openCartModal = document.getElementById('open-cart-modal');
  if (openCartModal) {
    openCartModal.addEventListener('click', () => {
      const cart = loadCart();
      document.getElementById('cart-modal').classList.remove('hidden');
      renderCartItems(cart, 'modal-cart-items', true);
      renderSummaryCartItems(cart);
      renderCartSummary(cart);
    });
  }

  const closeModal = document.querySelector('.close-modal');
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      document.getElementById('cart-modal').classList.add('hidden');
    });
  }

  const toggleViewBtn = document.getElementById('toggle-view-btn');
  if (toggleViewBtn) {
    toggleViewBtn.addEventListener('click', () => {
      const modalItems = document.getElementById('modal-cart-items');
      const modalSummary = document.getElementById('modal-cart-summary');
      if (modalItems && modalSummary) {
        if (modalItems.classList.contains('hidden')) {
          modalItems.classList.remove('hidden');
          modalSummary.classList.add('hidden');
          toggleViewBtn.textContent = '요약 보기';
        } else {
          modalItems.classList.add('hidden');
          modalSummary.classList.remove('hidden');
          toggleViewBtn.textContent = '자세히 보기';
        }
      }
    });
  }

  const submitOrderBtn = document.getElementById('submit-order-btn');
  if (submitOrderBtn) {
    submitOrderBtn.addEventListener('click', () => {
      console.log('결제 API 연동 예정');
      alert('결제는 아직 준비 중입니다. 😅');
    });
  }
});

// 장바구니 데이터 예시 (테스트용, 이미지 URL 포함)
const initialCart = [
  { name: '에티오피아 예가체프', price: 12000, qty: 1, img: 'https://via.placeholder.com/150?text=Ethiopia' },
  { name: '과테말라 안티구아', price: 11000, qty: 2, img: 'https://via.placeholder.com/150?text=Guatemala' },
  { name: '콜롬비아 수프리모', price: 13000, qty: 1, img: 'https://via.placeholder.com/150?text=Colombia' }
];

// 로컬스토리지에 초기 데이터 저장 (테스트용, 이미 존재하지 않을 경우)
if (!localStorage.getItem(CART_KEY)) {
  saveCart(initialCart);
}
