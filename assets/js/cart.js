/**
 * Quản lý Giỏ hàng và Thanh toán - Tằm Café
 */

class CartManager {
  constructor() {
    this.storageKey = "tam_cafe_cart_v1";
    this.items = this.loadCart();
    this.appliedVoucher = null;
    this.listeners = [];
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Lỗi đọc giỏ hàng:", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      console.warn("Lỗi lưu giỏ hàng:", e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this));
  }

  generateItemHash(item) {
    const toppingsKey = (item.toppings || []).slice().sort().join("|");
    return `${item.productId}_${item.size || "default"}_${item.sweetness || "default"}_${item.ice || "default"}_${toppingsKey}_${item.note || ""}`;
  }

  addItem(product, options = {}, quantity = 1) {
    const sizeDelta = options.sizePriceDelta || 0;
    const toppingsTotal = (options.toppings || []).reduce((sum, t) => sum + (t.price || 0), 0);
    const unitPrice = product.price + sizeDelta + toppingsTotal;

    const cartItem = {
      cartId: "item_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.image,
      unitPrice: unitPrice,
      basePrice: product.price,
      size: options.size || (product.availableSizes && product.availableSizes[0]?.name) || "Tiêu chuẩn",
      sweetness: options.sweetness || "Chuẩn vị",
      ice: options.ice || "Bình thường",
      toppings: (options.toppings || []).map(t => ({ name: t.name, price: t.price })),
      note: options.note || "",
      quantity: quantity
    };

    const hash = this.generateItemHash(cartItem);
    const existingIndex = this.items.findIndex(it => this.generateItemHash(it) === hash);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push(cartItem);
    }

    this.saveCart();
    return cartItem;
  }

  updateQuantity(cartId, delta) {
    const index = this.items.findIndex(it => it.cartId === cartId);
    if (index === -1) return;

    this.items[index].quantity += delta;
    if (this.items[index].quantity <= 0) {
      this.items.splice(index, 1);
    }
    this.saveCart();
  }

  removeItem(cartId) {
    this.items = this.items.filter(it => it.cartId !== cartId);
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.appliedVoucher = null;
    this.saveCart();
  }

  getTotalCount() {
    return this.items.reduce((sum, it) => sum + it.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
  }

  getShippingFee() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    if (subtotal >= 120000 || (this.appliedVoucher && this.appliedVoucher.code === "BANQUY")) {
      return 0; // Miễn phí giao hàng đơn từ 120k hoặc mã freeship
    }
    return 18000;
  }

  getDiscountAmount() {
    const subtotal = this.getSubtotal();
    if (!this.appliedVoucher || subtotal === 0) return 0;

    if (this.appliedVoucher.type === "percent") {
      return Math.round((subtotal * this.appliedVoucher.value) / 100);
    } else if (this.appliedVoucher.type === "fixed") {
      return Math.min(subtotal, this.appliedVoucher.value);
    }
    return 0;
  }

  getFinalTotal() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    const shipping = this.getShippingFee();
    const discount = this.getDiscountAmount();
    return Math.max(0, subtotal + shipping - discount);
  }

  applyVoucher(code) {
    const cleaned = (code || "").trim().toUpperCase();
    if (!cleaned) return { success: false, message: "Vui lòng nhập mã ưu đãi!" };

    const vouchers = {
      "THEUHUONG": { code: "THEUHUONG", type: "percent", value: 10, title: "Giảm 10% tổng đơn hàng" },
      "TAMKHOIKHOI": { code: "TAMKHOIKHOI", type: "fixed", value: 20000, title: "Giảm 20.000 ₫ cho người bạn mới" },
      "BANQUY": { code: "BANQUY", type: "freeship", value: 18000, title: "Miễn phí vận chuyển" }
    };

    if (vouchers[cleaned]) {
      this.appliedVoucher = vouchers[cleaned];
      this.saveCart();
      return { success: true, voucher: this.appliedVoucher, message: `Áp dụng thành công: ${this.appliedVoucher.title}` };
    } else {
      return { success: false, message: "Mã ưu đãi không hợp lệ hoặc đã hết hạn!" };
    }
  }

  removeVoucher() {
    this.appliedVoucher = null;
    this.saveCart();
  }

  formatMoney(num) {
    return (num || 0).toLocaleString("vi-VN") + " ₫";
  }
}

// Khởi tạo instance toàn cục
window.cartManager = new CartManager();
