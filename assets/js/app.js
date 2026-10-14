/**
 * TẰM - THÊU HƯƠNG DỆT VỊ
 * Kịch bản điều khiển giao diện chính (Main Application Script)
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  renderSidebarCategories();
  renderMobileCategories();
  renderProductsCatalog();
  initScrollSpy();
  initSearchAndFilter();
  initModalInteractions();
  initCartDrawer();
  initCheckoutFlow();
  initAmbientSound();
});

/* ==========================================================================
   1. THANH ĐIỀU HƯỚNG & HEADER
   ========================================================================== */
function initHeader() {
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav-drawer");
  const mobileClose = document.getElementById("mobile-nav-close");

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", () => {
      mobileNav.classList.add("active");
    });
  }
  if (mobileClose && mobileNav) {
    mobileClose.addEventListener("click", () => {
      mobileNav.classList.remove("active");
    });
  }
}

/* ==========================================================================
   2. DANH MỤC THỰC ĐƠN (SIDEBAR & MOBILE BAR)
   ========================================================================== */
function renderSidebarCategories() {
  const listEl = document.getElementById("category-nav-list");
  if (!listEl) return;

  listEl.innerHTML = MENU_CATEGORIES.map((cat, idx) => {
    const count = PRODUCTS_DATA.filter(p => p.categoryId === cat.id).length;
    return `
      <li class="category-nav-item">
        <a href="#${cat.id}" class="category-nav-link ${idx === 0 ? "active" : ""}" data-category-id="${cat.id}">
          <span>${cat.name}</span>
          <span class="category-badge-pill">${count}</span>
        </a>
      </li>
    `;
  }).join("");

  // Bắt sự kiện click cuộn mượt
  listEl.querySelectorAll(".category-nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-category-id");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        listEl.querySelectorAll(".category-nav-link").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });
}

function renderMobileCategories() {
  const listEl = document.getElementById("mobile-category-list");
  if (!listEl) return;

  listEl.innerHTML = MENU_CATEGORIES.map((cat, idx) => {
    return `
      <a href="#${cat.id}" class="mobile-cat-pill ${idx === 0 ? "active" : ""}" data-category-id="${cat.id}">
        ${cat.name}
      </a>
    `;
  }).join("");

  listEl.querySelectorAll(".mobile-cat-pill").forEach(pill => {
    pill.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = pill.getAttribute("data-category-id");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        listEl.querySelectorAll(".mobile-cat-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   3. DANH SÁCH SẢN PHẨM (CATALOG GRID)
   ========================================================================== */
function renderProductsCatalog(filteredList = null) {
  const container = document.getElementById("menu-catalog-sections");
  if (!container) return;

  const dataset = filteredList || PRODUCTS_DATA;

  // Nếu đang tìm kiếm và không có kết quả
  if (dataset.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state" style="padding: 60px 0;">
        <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Không tìm thấy món phù hợp</h3>
        <p>Mời bạn thử tìm với từ khóa khác như "shan tuyết", "cốt dừa", "trứng", "dâu tằm"...</p>
        <button class="btn-primary" style="margin-top: 18px;" onclick="resetSearch()">Xem toàn bộ thực đơn</button>
      </div>
    `;
    return;
  }

  // Nếu tìm kiếm có kết quả thì gom nhóm theo danh mục
  const htmlSections = MENU_CATEGORIES.map(cat => {
    const prods = dataset.filter(p => p.categoryId === cat.id);
    if (prods.length === 0) return "";

    const prodsHtml = prods.map(prod => renderProductCard(prod)).join("");

    return `
      <section id="${cat.id}" class="menu-category-section" data-cat-id="${cat.id}">
        <div class="category-section-header">
          <div>
            <h2 class="category-header-title font-serif">${cat.name}</h2>
            <p class="category-header-desc">${cat.desc}</p>
          </div>
          <span class="badge-traditional">${cat.badge}</span>
        </div>
        <div class="products-grid">
          ${prodsHtml}
        </div>
      </section>
    `;
  }).join("");

  container.innerHTML = htmlSections;

  // Bắt sự kiện cho các nút trên thẻ sản phẩm
  container.querySelectorAll(".btn-card-action").forEach(btn => {
    btn.addEventListener("click", () => {
      const prodId = btn.getAttribute("data-product-id");
      const product = PRODUCTS_DATA.find(p => p.id === prodId);
      if (!product) return;

      if (product.customizable) {
        openCustomModal(product);
      } else {
        // Quick add
        window.cartManager.addItem(product, {}, 1);
        showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
      }
    });
  });
}

function renderProductCard(prod) {
  const formattedPrice = window.cartManager.formatMoney(prod.price);
  const formattedOriginalPrice = prod.originalPrice ? window.cartManager.formatMoney(prod.originalPrice) : "";
  const isLacquer = prod.tags.includes("Món Tủ") || prod.tags.includes("Đặc Sản Bắc Bộ");

  return `
    <article class="product-card" id="card-${prod.id}">
      <div class="product-card-img-wrap">
        <img src="${prod.image}" alt="${prod.name}" class="product-card-img" loading="lazy" />
        <div class="product-badge-corner">
          <span class="badge-traditional ${isLacquer ? "badge-lacquer" : ""}">${prod.badge}</span>
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-tags-row">
          ${prod.tags.map(t => `<span class="product-tag">${t}</span>`).join("")}
        </div>
        <h3 class="product-card-title">${prod.name}</h3>
        <div class="product-card-subtitle">${prod.subtitle}</div>
        <p class="product-card-desc">${prod.description}</p>
        <div class="product-card-footer">
          <div class="product-price-box">
            <span class="product-current-price">${formattedPrice}</span>
            ${formattedOriginalPrice ? `<span class="product-original-price">${formattedOriginalPrice}</span>` : ""}
          </div>
          <button class="btn-card-action" data-product-id="${prod.id}" aria-label="Chọn món ${prod.name}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            <span>${prod.customizable ? "Chọn món" : "Thêm vào"}</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

/* ==========================================================================
   4. SCROLL SPY (TỰ ĐỘNG ĐỔI DANH MỤC KHI CUỘN - GIỐNG NHÈ CAFÉ)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll(".menu-category-section");
  const navLinks = document.querySelectorAll(".category-nav-link");
  const mobilePills = document.querySelectorAll(".mobile-cat-pill");

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navLinks.forEach(link => {
          if (link.getAttribute("data-category-id") === id) {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
          }
        });

        mobilePills.forEach(pill => {
          if (pill.getAttribute("data-category-id") === id) {
            mobilePills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            // Auto scroll horizontal pill into view
            pill.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
          }
        });
      }
    });
  }, {
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  });

  sections.forEach(s => observer.observe(s));
}

/* ==========================================================================
   5. TÌM KIẾM & LỌC THEO VỊ GIÁC (SEARCH & TASTE FILTER)
   ========================================================================== */
function initSearchAndFilter() {
  const searchInput = document.getElementById("hero-search-input");
  const tasteChips = document.querySelectorAll(".taste-chip");

  let currentKeyword = "";
  let currentFilter = "all";

  function applyFilter() {
    const kw = currentKeyword.toLowerCase().trim();

    let results = PRODUCTS_DATA.filter(prod => {
      const matchText = (prod.name + " " + prod.subtitle + " " + prod.description + " " + prod.tags.join(" ")).toLowerCase();
      const matchKeyword = !kw || matchText.includes(kw);

      let matchCategory = true;
      if (currentFilter === "all") {
        matchCategory = true;
      } else if (currentFilter === "tra-shan-tuyet") {
        matchCategory = prod.tags.some(t => t.includes("Shan Tuyết") || t.includes("Trà"));
      } else if (currentFilter === "ca-phe-phin") {
        matchCategory = prod.categoryId === "ca-phe-phin" || prod.tags.some(t => t.includes("Phin") || t.includes("Robusta"));
      } else if (currentFilter === "beo-ngay") {
        matchCategory = prod.tags.some(t => t.includes("Béo") || t.includes("Trứng") || t.includes("Cốt Dừa") || t.includes("Flan"));
      } else if (currentFilter === "thanh-mat") {
        matchCategory = prod.tags.some(t => t.includes("Thanh Mát") || t.includes("Giải Nhiệt") || t.includes("Dân Dã") || t.includes("Sen"));
      } else if (currentFilter === "qua-que") {
        matchCategory = prod.categoryId === "banh-qua-que";
      }

      return matchKeyword && matchCategory;
    });

    renderProductsCatalog(results);
    initScrollSpy();
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentKeyword = e.target.value;
      applyFilter();
    });
  }

  tasteChips.forEach(chip => {
    chip.addEventListener("click", () => {
      tasteChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentFilter = chip.getAttribute("data-filter");
      applyFilter();
    });
  });

  window.resetSearch = () => {
    if (searchInput) searchInput.value = "";
    currentKeyword = "";
    currentFilter = "all";
    tasteChips.forEach(c => c.classList.remove("active"));
    const allChip = document.querySelector('.taste-chip[data-filter="all"]');
    if (allChip) allChip.classList.add("active");
    renderProductsCatalog();
    initScrollSpy();
  };
}

/* ==========================================================================
   6. MODAL TÙY CHỌN SẢN PHẨM (CUSTOMIZATION MODAL)
   ========================================================================== */
let activeModalProduct = null;
let currentModalOptions = {};
let currentModalQuantity = 1;

function initModalInteractions() {
  const overlay = document.getElementById("custom-modal-overlay");
  const closeBtn = document.getElementById("modal-close-btn");
  const addBtn = document.getElementById("modal-add-to-cart-btn");
  const qtyMinus = document.getElementById("modal-qty-minus");
  const qtyPlus = document.getElementById("modal-qty-plus");

  if (closeBtn && overlay) {
    closeBtn.addEventListener("click", () => closeModal());
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  if (qtyMinus && qtyPlus) {
    qtyMinus.addEventListener("click", () => {
      if (currentModalQuantity > 1) {
        currentModalQuantity--;
        updateModalTotal();
      }
    });
    qtyPlus.addEventListener("click", () => {
      currentModalQuantity++;
      updateModalTotal();
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      if (!activeModalProduct) return;
      const noteInput = document.getElementById("modal-note-text");
      currentModalOptions.note = noteInput ? noteInput.value.trim() : "";

      window.cartManager.addItem(activeModalProduct, currentModalOptions, currentModalQuantity);
      closeModal();
      showToast(`Đã thêm "${activeModalProduct.name}" vào giỏ hàng!`);
      openCartDrawer();
    });
  }
}

function openCustomModal(product) {
  activeModalProduct = product;
  currentModalQuantity = 1;
  currentModalOptions = {
    size: (product.availableSizes && product.availableSizes[0]?.name) || "Tiêu chuẩn",
    sizePriceDelta: (product.availableSizes && product.availableSizes[0]?.priceDelta) || 0,
    sweetness: "70% - Thanh Dịu",
    ice: "Bình thường (100% Đá)",
    toppings: [],
    note: ""
  };

  // Điền dữ liệu
  document.getElementById("modal-img").src = product.image;
  document.getElementById("modal-title").textContent = product.name;
  document.getElementById("modal-subtitle").textContent = product.subtitle;
  document.getElementById("modal-desc").textContent = product.description;

  // Render Size options
  const sizeContainer = document.getElementById("modal-size-container");
  if (sizeContainer && product.availableSizes) {
    sizeContainer.innerHTML = product.availableSizes.map((s, idx) => `
      <label class="option-pill-label">
        <input type="radio" name="modal_size" value="${s.name}" data-delta="${s.priceDelta}" ${idx === 0 ? "checked" : ""}>
        <span class="option-pill-text">
          ${s.name} ${s.priceDelta > 0 ? `(+${window.cartManager.formatMoney(s.priceDelta)})` : ""}
        </span>
      </label>
    `).join("");

    sizeContainer.querySelectorAll('input[name="modal_size"]').forEach(radio => {
      radio.addEventListener("change", (e) => {
        currentModalOptions.size = e.target.value;
        currentModalOptions.sizePriceDelta = parseInt(e.target.getAttribute("data-delta")) || 0;
        updateModalTotal();
      });
    });
  }

  // Render Toppings
  const toppingContainer = document.getElementById("modal-topping-container");
  if (toppingContainer) {
    toppingContainer.innerHTML = AVAILABLE_TOPPINGS.map(top => `
      <label class="topping-checkbox-item">
        <div style="display:flex; align-items:center;">
          <input type="checkbox" name="modal_topping" value="${top.id}" data-name="${top.name}" data-price="${top.price}">
          <span style="font-size:0.85rem; color:var(--color-cream);">${top.name}</span>
        </div>
        <span style="font-size:0.82rem; color:var(--color-amber); font-weight:600;">+${window.cartManager.formatMoney(top.price)}</span>
      </label>
    `).join("");

    toppingContainer.querySelectorAll('input[name="modal_topping"]').forEach(cb => {
      cb.addEventListener("change", () => {
        const itemWrap = cb.closest(".topping-checkbox-item");
        if (cb.checked) {
          itemWrap.classList.add("checked");
        } else {
          itemWrap.classList.remove("checked");
        }

        const selectedToppings = [];
        toppingContainer.querySelectorAll('input[name="modal_topping"]:checked').forEach(c => {
          selectedToppings.push({
            name: c.getAttribute("data-name"),
            price: parseInt(c.getAttribute("data-price")) || 0
          });
        });
        currentModalOptions.toppings = selectedToppings;
        updateModalTotal();
      });
    });
  }

  // Reset note
  const noteInput = document.getElementById("modal-note-text");
  if (noteInput) noteInput.value = "";

  updateModalTotal();
  const overlay = document.getElementById("custom-modal-overlay");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("custom-modal-overlay");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
  activeModalProduct = null;
}

function updateModalTotal() {
  if (!activeModalProduct) return;
  const qtyEl = document.getElementById("modal-qty-val");
  if (qtyEl) qtyEl.textContent = currentModalQuantity;

  const sizeDelta = currentModalOptions.sizePriceDelta || 0;
  const toppingsTotal = (currentModalOptions.toppings || []).reduce((sum, t) => sum + t.price, 0);
  const unitPrice = activeModalProduct.price + sizeDelta + toppingsTotal;
  const grandTotal = unitPrice * currentModalQuantity;

  const totalEl = document.getElementById("modal-total-price");
  if (totalEl) totalEl.textContent = window.cartManager.formatMoney(grandTotal);
}

/* ==========================================================================
   7. GIỎ HÀNG NGĂN KÉO (CART DRAWER & VOUCHER)
   ========================================================================== */
function initCartDrawer() {
  const triggerBtn = document.getElementById("cart-trigger-btn");
  const overlay = document.getElementById("cart-drawer-overlay");
  const closeBtn = document.getElementById("cart-drawer-close");
  const voucherBtn = document.getElementById("apply-voucher-btn");
  const voucherInput = document.getElementById("cart-voucher-input");
  const checkoutBtn = document.getElementById("cart-proceed-checkout-btn");

  if (triggerBtn) triggerBtn.addEventListener("click", () => openCartDrawer());
  if (closeBtn && overlay) {
    closeBtn.addEventListener("click", () => closeCartDrawer());
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeCartDrawer();
    });
  }

  // Lắng nghe cập nhật giỏ hàng
  window.cartManager.subscribe(renderCartView);
  renderCartView(window.cartManager);

  // Voucher
  if (voucherBtn && voucherInput) {
    voucherBtn.addEventListener("click", () => {
      const res = window.cartManager.applyVoucher(voucherInput.value);
      showToast(res.message);
    });

    // Bấm vào gợi ý mã
    document.querySelectorAll(".voucher-hint-tag").forEach(tag => {
      tag.addEventListener("click", () => {
        const code = tag.getAttribute("data-code");
        voucherInput.value = code;
        const res = window.cartManager.applyVoucher(code);
        showToast(res.message);
      });
    });
  }

  // Nút thanh toán
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (window.cartManager.items.length === 0) {
        showToast("Giỏ hàng của bạn đang trống!");
        return;
      }
      closeCartDrawer();
      openCheckoutModal();
    });
  }
}

function openCartDrawer() {
  const overlay = document.getElementById("cart-drawer-overlay");
  if (overlay) overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  const overlay = document.getElementById("cart-drawer-overlay");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
}

function renderCartView(cart) {
  // Cập nhật số lượng trên icon header
  const countBadges = document.querySelectorAll(".cart-badge-count");
  const totalCount = cart.getTotalCount();
  countBadges.forEach(b => {
    b.textContent = totalCount;
    b.style.display = totalCount > 0 ? "flex" : "none";
  });

  const scrollContainer = document.getElementById("cart-items-scroll");
  const summaryBox = document.getElementById("cart-bill-summary");
  const proceedBtn = document.getElementById("cart-proceed-checkout-btn");
  if (!scrollContainer) return;

  if (cart.items.length === 0) {
    scrollContainer.innerHTML = `
      <div class="cart-empty-state">
        <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <h4 style="font-size: 1.15rem; color: var(--color-cream); margin-bottom: 6px;">Giỏ hàng của bạn đang trống</h4>
        <p style="font-size: 0.85rem;">Mời bạn chọn một thức uống thơm lành từ thực đơn.</p>
        <button class="btn-secondary" style="margin-top: 16px;" onclick="closeCartDrawer()">Khám phá ngay</button>
      </div>
    `;
    if (summaryBox) summaryBox.style.display = "none";
    if (proceedBtn) proceedBtn.disabled = true;
    return;
  }

  if (summaryBox) summaryBox.style.display = "block";
  if (proceedBtn) proceedBtn.disabled = false;

  // Render danh sách sản phẩm trong giỏ
  scrollContainer.innerHTML = cart.items.map(item => {
    const toppingNames = item.toppings && item.toppings.length > 0 ? item.toppings.map(t => t.name).join(", ") : "";
    return `
      <div class="cart-item-row" data-cart-id="${item.cartId}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" />
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-specs">
            <div>${item.size} • ${item.sweetness} • ${item.ice}</div>
            ${toppingNames ? `<div style="color:var(--color-amber);">+ ${toppingNames}</div>` : ""}
            ${item.note ? `<div style="font-style:italic;">"${item.note}"</div>` : ""}
          </div>
          <div class="cart-item-price-row">
            <span class="cart-item-price">${cart.formatMoney(item.unitPrice * item.quantity)}</span>
            <div class="quantity-stepper" style="height: 28px;">
              <button class="stepper-btn" style="width:26px; height:26px;" onclick="window.cartManager.updateQuantity('${item.cartId}', -1)">-</button>
              <span class="stepper-val" style="min-width:24px; font-size:0.85rem;">${item.quantity}</span>
              <button class="stepper-btn" style="width:26px; height:26px;" onclick="window.cartManager.updateQuantity('${item.cartId}', 1)">+</button>
            </div>
          </div>
        </div>
        <button class="cart-item-remove-btn" title="Xóa món" onclick="window.cartManager.removeItem('${item.cartId}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;
  }).join("");

  // Cập nhật bill
  const subtotal = cart.getSubtotal();
  const shipping = cart.getShippingFee();
  const discount = cart.getDiscountAmount();
  const total = cart.getFinalTotal();

  document.getElementById("cart-bill-subtotal").textContent = cart.formatMoney(subtotal);
  document.getElementById("cart-bill-shipping").textContent = shipping === 0 ? "Miễn phí" : cart.formatMoney(shipping);

  const discountRow = document.getElementById("cart-bill-discount-row");
  if (discount > 0) {
    discountRow.style.display = "flex";
    document.getElementById("cart-bill-discount").textContent = `-${cart.formatMoney(discount)}`;
  } else {
    discountRow.style.display = "none";
  }

  document.getElementById("cart-bill-grand-total").textContent = cart.formatMoney(total);
}

/* ==========================================================================
   8. ĐẶT HÀNG & THANH TOÁN VIETQR (CHECKOUT FLOW)
   ========================================================================== */
function initCheckoutFlow() {
  const overlay = document.getElementById("checkout-modal-overlay");
  const closeBtn = document.getElementById("checkout-close-btn");
  const methodCards = document.querySelectorAll(".payment-method-card");
  const qrBox = document.getElementById("vietqr-presentation-box");
  const submitBtn = document.getElementById("checkout-submit-order-btn");

  let selectedPaymentMethod = "vietqr";

  if (closeBtn && overlay) {
    closeBtn.addEventListener("click", () => closeCheckoutModal());
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeCheckoutModal();
    });
  }

  methodCards.forEach(card => {
    card.addEventListener("click", () => {
      methodCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      selectedPaymentMethod = card.getAttribute("data-method");

      if (selectedPaymentMethod === "vietqr") {
        if (qrBox) qrBox.style.display = "block";
      } else {
        if (qrBox) qrBox.style.display = "none";
      }
    });
  });

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const name = document.getElementById("checkout-customer-name").value.trim();
      const phone = document.getElementById("checkout-customer-phone").value.trim();
      const address = document.getElementById("checkout-customer-address").value.trim();

      if (!name || !phone || !address) {
        showToast("Vui lòng điền đủ Tên, Số điện thoại và Địa chỉ giao hàng!");
        return;
      }

      // Tạo mã đơn hàng độc bản
      const orderCode = "TAM" + Math.floor(100000 + Math.random() * 900000);
      const totalAmount = window.cartManager.getFinalTotal();

      // Lưu đơn vào lịch sử
      const orderData = {
        orderCode,
        createdAt: new Date().toISOString(),
        customer: { name, phone, address },
        items: window.cartManager.items,
        totalAmount,
        paymentMethod: selectedPaymentMethod
      };

      try {
        const history = JSON.parse(localStorage.getItem("tam_orders_history") || "[]");
        history.unshift(orderData);
        localStorage.setItem("tam_orders_history", JSON.stringify(history));
      } catch (e) {}

      // Xóa giỏ hàng
      window.cartManager.clearCart();
      closeCheckoutModal();

      // Hiển thị màn hình xác nhận thành công
      showOrderSuccessModal(orderData);
    });
  }

  // Sao chép STK và Nội dung chuyển khoản
  document.querySelectorAll(".copy-badge-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.getAttribute("data-copy");
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Đã sao chép: "${text}"`);
      });
    });
  });
}

function openCheckoutModal() {
  const overlay = document.getElementById("checkout-modal-overlay");
  if (!overlay) return;

  const total = window.cartManager.getFinalTotal();
  const orderMemo = "TAM " + Math.floor(10000 + Math.random() * 90000);

  document.getElementById("checkout-modal-total").textContent = window.cartManager.formatMoney(total);
  document.getElementById("qr-memo-text").textContent = orderMemo;
  document.getElementById("copy-memo-btn").setAttribute("data-copy", orderMemo);

  // Tạo liên kết VietQR chuẩn
  const qrImg = document.getElementById("vietqr-dynamic-img");
  if (qrImg) {
    const qrUrl = `https://api.vietqr.io/image/970422-0988668899-compact2.jpg?amount=${total}&addInfo=${encodeURIComponent(orderMemo)}&accountName=QUAN%20CA%20PHE%20TAM`;
    qrImg.src = qrUrl;
  }

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  const overlay = document.getElementById("checkout-modal-overlay");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
}

function showOrderSuccessModal(order) {
  const overlay = document.getElementById("success-modal-overlay");
  if (!overlay) return;

  document.getElementById("success-order-code").textContent = order.orderCode;
  document.getElementById("success-customer-name").textContent = order.customer.name;
  document.getElementById("success-total-money").textContent = window.cartManager.formatMoney(order.totalAmount);

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";

  const closeBtn = document.getElementById("success-modal-close-btn");
  if (closeBtn) {
    closeBtn.onclick = () => {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    };
  }
}

/* ==========================================================================
   9. ÂM THANH MỘC MẠC (AMBIENT SOUND)
   ========================================================================== */
function initAmbientSound() {
  const toggleBtn = document.getElementById("ambient-toggle-btn");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const isPlaying = window.ambientSound.toggle();
    if (isPlaying) {
      toggleBtn.classList.add("active");
      showToast("Đang phát âm thanh đàn ngũ cung & giọt phin mộc mạc...");
    } else {
      toggleBtn.classList.remove("active");
      showToast("Đã tắt âm thanh không gian.");
    }
  });
}

/* ==========================================================================
   10. TOAST NOTIFICATION (THÔNG BÁO DÂN DÃ)
   ========================================================================== */
function showToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "folk-toast";
  toast.innerHTML = `
    <svg class="folk-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "fadeOutDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}
