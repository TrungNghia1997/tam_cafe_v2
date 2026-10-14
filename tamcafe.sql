-- 1. BẢNG DANH MỤC
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(60) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    badge VARCHAR(50),
    description TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. BẢNG SẢN PHẨM
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    subtitle VARCHAR(200),
    badge VARCHAR(50),
    badge_type VARCHAR(20) DEFAULT 'gold',
    base_price DECIMAL(12, 2) NOT NULL,
    original_price DECIMAL(12, 2) NULL,
    image_url VARCHAR(255) NOT NULL,
    description TEXT,
    is_signature BOOLEAN DEFAULT FALSE,
    customizable BOOLEAN DEFAULT TRUE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);
CREATE INDEX idx_products_category ON products(category_id, is_available);

-- 3. BẢNG SIZE SẢN PHẨM
CREATE TABLE product_sizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    price_delta DECIMAL(12, 2) DEFAULT 0.00,
    is_default BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_sizes_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 4. BẢNG TOPPING
CREATE TABLE toppings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE
);

-- 5. BẢNG KHÁCH HÀNG
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_customers_phone ON customers(phone);

-- 6. BẢNG CHI NHÁNH QUÁN
CREATE TABLE stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    hotline VARCHAR(20) NOT NULL,
    open_time TIME DEFAULT '07:00:00',
    close_time TIME DEFAULT '23:00:00',
    amenities VARCHAR(255),
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE
);

-- 7. BẢNG MÃ KHUYẾN MÃI
CREATE TABLE vouchers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    discount_type VARCHAR(20) NOT NULL, -- PERCENT, FIXED, FREESHIP
    discount_value DECIMAL(12, 2) NOT NULL,
    min_order_value DECIMAL(12, 2) DEFAULT 0.00,
    max_discount DECIMAL(12, 2) NULL,
    usage_limit INT DEFAULT 0,
    used_count INT DEFAULT 0,
    start_date TIMESTAMP NULL,
    end_date TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 8. BẢNG ĐƠN HÀNG
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_code VARCHAR(30) NOT NULL UNIQUE,
    customer_id INT NULL,
    store_id INT NULL,
    voucher_id INT NULL,
    receiver_name VARCHAR(100) NOT NULL,
    receiver_phone VARCHAR(20) NOT NULL,
    receiver_address VARCHAR(255) NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL,
    shipping_fee DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    discount_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    grand_total DECIMAL(12, 2) NOT NULL,
    payment_method VARCHAR(20) NOT NULL, -- VIETQR, COD
    payment_status VARCHAR(20) DEFAULT 'UNPAID', -- UNPAID, PAID, REFUNDED
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, CONFIRMED, BREWING, DELIVERING, COMPLETED, CANCELLED
    note TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
    CONSTRAINT fk_orders_store FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE SET NULL,
    CONSTRAINT fk_orders_voucher FOREIGN KEY (voucher_id) REFERENCES vouchers(id) ON DELETE SET NULL
);
CREATE INDEX idx_orders_code ON orders(order_code);
CREATE INDEX idx_orders_status ON orders(status, created_at);

-- 9. BẢNG CHI TIẾT MÓN ĐẶT HÀNG
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    size_name VARCHAR(50) NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL,
    sweetness VARCHAR(50) NOT NULL,
    ice VARCHAR(50) NOT NULL,
    note VARCHAR(255) NULL,
    quantity INT NOT NULL DEFAULT 1,
    total_price DECIMAL(12, 2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- 10. BẢNG TOPPING ĐI KÈM MÓN TRONG ĐƠN
CREATE TABLE order_item_toppings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_item_id BIGINT NOT NULL,
    topping_id INT NULL,
    topping_name VARCHAR(100) NOT NULL,
    topping_price DECIMAL(12, 2) NOT NULL,
    CONSTRAINT fk_oit_item FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE,
    CONSTRAINT fk_oit_topping FOREIGN KEY (topping_id) REFERENCES toppings(id) ON DELETE SET NULL
);

-- 11. BẢNG LỊCH SỬ THANH TOÁN
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    payment_gateway VARCHAR(30) NOT NULL,
    transaction_code VARCHAR(100) NULL,
    transfer_memo VARCHAR(50) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    paid_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
CREATE INDEX idx_payments_memo ON payments(transfer_memo);

-- 12. BẢNG NHÓM VAI TRÒ NỘI BỘ
CREATE TABLE admin_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo sẵn các chức vụ nội bộ của quán
INSERT INTO admin_roles (code, name, description) VALUES
('SUPER_ADMIN', 'Chủ Quán / Quản Trị Hệ Thống', 'Toàn quyền cấu hình thực đơn, giá cả, khuyến mãi và nhân sự'),
('STORE_MANAGER', 'Quản Lý Cửa Hàng', 'Quản lý đơn hàng, kho và nhân sự tại chi nhánh phụ trách'),
('BARISTA', 'Thợ Pha Chế (Bar / Bếp)', 'Xem màn hình đơn hàng, chuyển trạng thái chế biến món'),
('CASHIER', 'Thu Ngân', 'Kiểm tra tiền thanh toán VietQR / COD và xuất hóa đơn');

-- 13. BẢNG TÀI KHOẢN ĐĂNG NHẬP NỘI BỘ
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NULL,
    avatar_url VARCHAR(255) NULL,
    role_id INT NOT NULL,
    store_id INT NULL, -- NULL nếu là Super Admin quản lý tất cả chi nhánh
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMP NULL,
    last_login_ip VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_admin_role FOREIGN KEY (role_id) REFERENCES admin_roles(id) ON DELETE RESTRICT,
    CONSTRAINT fk_admin_store FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE SET NULL
);
CREATE INDEX idx_admin_username ON admin_users(username);
CREATE INDEX idx_admin_role ON admin_users(role_id);
CREATE INDEX idx_admin_store ON admin_users(store_id);

-- Tạo sẵn 1 tài khoản Super Admin mẫu (Mật khẩu băm Bcrypt)
INSERT INTO admin_users (username, email, password_hash, full_name, phone, role_id, store_id) VALUES
('admin', 'admin@tamcafe.vn', '$2b$10$YourHashedPasswordHere', 'Chủ Quán Tằm', '02438289988', 1, NULL);

-- 14. BẢNG QUẢN LÝ PHIÊN ĐĂNG NHẬP (ADMIN SESSIONS)
CREATE TABLE admin_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    admin_user_id INT NOT NULL,
    refresh_token VARCHAR(255) NOT NULL UNIQUE,
    user_agent VARCHAR(255),
    ip_address VARCHAR(45),
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_admin_session_user FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE CASCADE
);
CREATE INDEX idx_admin_token ON admin_sessions(refresh_token);

-- 15. BẢNG NHẬT KÝ THAO TÁC NỘI BỘ (AUDIT LOGS)
CREATE TABLE admin_audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    admin_user_id INT NOT NULL,
    action VARCHAR(50) NOT NULL,       -- vd: UPDATE_PRICE, CANCEL_ORDER, ADD_TOPPING
    target_table VARCHAR(50) NOT NULL, -- vd: products, orders, vouchers
    target_id VARCHAR(50) NOT NULL,    -- ID bản ghi bị thay đổi
    old_value JSON NULL,               -- Dữ liệu cũ
    new_value JSON NULL,               -- Dữ liệu mới
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audit_user FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE RESTRICT
);
CREATE INDEX idx_audit_user ON admin_audit_logs(admin_user_id);
CREATE INDEX idx_audit_action ON admin_audit_logs(action, created_at);

-- 16. BẢNG LỊCH SỬ CHUYỂN TRẠNG THÁI ĐƠN HÀNG (Do nhân viên nào duyệt)
CREATE TABLE order_status_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    from_status VARCHAR(20) NOT NULL,
    to_status VARCHAR(20) NOT NULL,
    changed_by_user_id INT NULL, -- Nhân viên nào vừa bấm nút chuyển (NULL nếu hệ thống tự đổi)
    note VARCHAR(255) NULL,       -- Lý do (vd: 'Khách đổi ý hủy đơn', 'Hết đá riêng')
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_status_log_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_status_log_user FOREIGN KEY (changed_by_user_id) REFERENCES admin_users(id) ON DELETE SET NULL
);
CREATE INDEX idx_order_status_logs ON order_status_logs(order_id);
