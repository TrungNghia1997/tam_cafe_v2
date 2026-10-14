/**
 * Dữ liệu Thực đơn Quán Tằm - Thêu Hương Dệt Vị
 * Lấy cảm hứng từ nét văn hóa truyền thống, trà Shan Tuyết cổ thụ,
 * cà phê phin mộc Đắk Lắk và các thức bánh quê dân dã.
 */

const MENU_CATEGORIES = [
  {
    id: "noi-bat",
    name: "Món Mới & Nổi Bật",
    badge: "Tinh Hoa Tằm",
    desc: "Những thức uống kết tinh tay nghề thủ công và hương vị dân dã được thực khách yêu thích nhất."
  },
  {
    id: "tra-sua-tam",
    name: "Trà Sữa Tơ Tằm & Shan Tuyết",
    badge: "Đặc Sản Vùng Cao",
    desc: "Lá trà Shan Tuyết cổ thụ Tây Côn Lĩnh chắt chiu cùng sữa thơm béo dịu, trân châu hoàng kim dẻo ngọt ngào."
  },
  {
    id: "ca-phe-phin",
    name: "Cà Phê Phin Mộc Dân Dã",
    badge: "Đất Đỏ Bazan",
    desc: "Hạt Robusta và Arabica Đắk Lắk rang mộc, chầm chậm rơi từng giọt qua phin nhôm truyền thống."
  },
  {
    id: "ca-phe-dac-san",
    name: "Cà Phê Trứng & Cốt Dừa",
    badge: "Vị Ngon Kinh Kỳ",
    desc: "Sự kết hợp béo thơm của trứng vàng đánh bông mịn Hà Nội và cốt dừa Bến Tre thanh mát."
  },
  {
    id: "tra-hoa-trai-cay",
    name: "Trà Hoa & Trái Cây Quê",
    badge: "Thanh Mát Giải Nhiệt",
    desc: "Hương hoa sen Tây Hồ, quả dâu tằm chín mọng cùng trái cây tươi thuần Việt thanh khiết."
  },
  {
    id: "banh-qua-que",
    name: "Bánh Dân Dã & Quà Quê",
    badge: "Mỹ Vị Truyền Thống",
    desc: "Thức bánh mộc mạc thơm dẻo: Cốm non xào dừa, bánh phu thê lá chuối, bánh flan caramel cốt dừa."
  },
  {
    id: "topping-thu-cong",
    name: "Topping Thủ Công Tự Nhiên",
    badge: "Nấu Mới Hằng Ngày",
    desc: "Topping tự làm từ nguyên liệu tươi: Trân châu hoàng kim, thạch sương sáo mộc, hạt sen hầm đường phèn."
  }
];

const PRODUCTS_DATA = [
  // --- MÓN MỚI & NỔI BẬT ---
  {
    id: "prod-1",
    categoryId: "noi-bat",
    name: "Trà Sữa Tằm Thêu Hương",
    subtitle: "Trà Shan Tuyết cổ thụ & Trân châu Hoàng Kim",
    price: 48000,
    originalPrice: 55000,
    image: "assets/images/tra-sua-tam.jpg",
    tags: ["Món Tủ", "Shan Tuyết Tây Bắc", "Bán Chạy"],
    badge: "Đặc Trưng",
    description: "Búp trà Shan Tuyết hơn 200 năm tuổi trên đỉnh Tây Côn Lĩnh hãm đậm, ủ cùng sữa non béo nhẹ và trân châu hoàng kim dẻo quánh nấu mật mía. Vị chát thanh hậu ngọt sâu khó quên.",
    isSignature: true,
    customizable: true,
    availableSizes: [
      { name: "Size Vừa (M) - 500ml", priceDelta: 0 },
      { name: "Size Lớn (L) - 700ml", priceDelta: 8000 }
    ],
    defaultOptions: {
      size: "Size Vừa (M) - 500ml",
      sweetness: "70% - Thanh Dịu",
      ice: "Bình thường (100% Đá)",
      toppings: ["Trân Châu Hoàng Kim Tơ Tằm"]
    }
  },
  {
    id: "prod-2",
    categoryId: "noi-bat",
    name: "Cà Phê Trứng Hà Thành",
    subtitle: "Lớp kem trứng vàng ươm sánh mịn",
    price: 49000,
    originalPrice: 55000,
    image: "assets/images/ca-phe-trung.jpg",
    tags: ["Đặc Sản Bắc Bộ", "Béo Ngậy"],
    badge: "Nổi Tiếng",
    description: "Trứng gà tươi đánh bông cùng mật ong tạo lớp bọt vàng óng như tơ, rót trên nền cà phê phin Đắk Lắk đậm đà. Đặt trong bát nước ấm giữ nhiệt chuẩn phong vị Hà Nội cổ kính.",
    isSignature: true,
    customizable: true,
    availableSizes: [
      { name: "Cốc Thường (Nóng/Đá)", priceDelta: 0 }
    ],
    defaultOptions: {
      size: "Cốc Thường (Nóng/Đá)",
      sweetness: "Chuẩn vị Quán",
      ice: "Uống Nóng (Để Bát Nước Ấm)",
      toppings: []
    }
  },
  {
    id: "prod-3",
    categoryId: "noi-bat",
    name: "Cà Phê Muối Cổ Đô",
    subtitle: "Vị mặn mòi xứ Huế quyện cốt phin đậm",
    price: 42000,
    originalPrice: 48000,
    image: "assets/images/ca-phe-muoi.jpg",
    tags: ["Phin Mộc", "Vị Đậm Đà"],
    badge: "Bán Chạy",
    description: "Cốt cà phê phin Robusta đậm chất Tây Nguyên hòa cùng sữa đặc sánh, phủ lớp kem sữa muối bồng bềnh mằn mặn khơi dậy trọn vẹn từng tầng vị giác.",
    isSignature: true,
    customizable: true,
    availableSizes: [
      { name: "Size Vừa (M) - 500ml", priceDelta: 0 },
      { name: "Size Lớn (L) - 700ml", priceDelta: 8000 }
    ],
    defaultOptions: {
      size: "Size Vừa (M) - 500ml",
      sweetness: "70% - Thanh Dịu",
      ice: "Bình thường (100% Đá)",
      toppings: []
    }
  },
  {
    id: "prod-4",
    categoryId: "noi-bat",
    name: "Trà Dâu Tằm Phù Sa",
    subtitle: "Trái dâu tằm chín mọng dệt hương hoa",
    price: 45000,
    originalPrice: 52000,
    image: "assets/images/tra-dau-tam.jpg",
    tags: ["Dân Dã Thuần Việt", "Thanh Mát"],
    badge: "Mùa Mới",
    description: "Lấy cảm hứng từ những nương dâu tằm ven sông Đáy, từng quả dâu chín thẫm được rim đường phèn dịu ngọt, lắc cùng trà lài ướp hoa tự nhiên và đá mát lạnh.",
    isSignature: true,
    customizable: true,
    availableSizes: [
      { name: "Size Vừa (M) - 500ml", priceDelta: 0 },
      { name: "Size Lớn (L) - 700ml", priceDelta: 8000 }
    ],
    defaultOptions: {
      size: "Size Vừa (M) - 500ml",
      sweetness: "70% - Thanh Dịu",
      ice: "Bình thường (100% Đá)",
      toppings: ["Thạch Sương Sáo Mộc"]
    }
  },

  // --- TRÀ SỮA TƠ TẰM & SHAN TUYẾT ---
  {
    id: "prod-5",
    categoryId: "tra-sua-tam",
    name: "Hồng Trà Sữa Shan Tuyết",
    subtitle: "Hồng trà cổ thụ Tây Côn Lĩnh",
    price: 45000,
    originalPrice: null,
    image: "assets/images/tra-sua-tam.jpg",
    tags: ["Shan Tuyết", "Đậm Vị Trà"],
    badge: "Gợi Ý",
    description: "Hồng trà Shan Tuyết lên men tự nhiên với sắc nước đỏ hổ phách, dậy hương thơm mật ong rừng và khói bếp bản làng, hòa quyện sữa tươi thanh trùng béo nhẹ.",
    isSignature: false,
    customizable: true,
    availableSizes: [
      { name: "Size Vừa (M) - 500ml", priceDelta: 0 },
      { name: "Size Lớn (L) - 700ml", priceDelta: 8000 }
    ],
    defaultOptions: {
      size: "Size Vừa (M) - 500ml",
      sweetness: "70% - Thanh Dịu",
      ice: "Bình thường (100% Đá)",
      toppings: []
    }
  },
  {
    id: "prod-6",
    categoryId: "tra-sua-tam",
    name: "Oolong Nhài Sữa Phu Thê",
    subtitle: "Hương hoa lài thanh khiết ướp đượm vị trà",
    price: 46000,
    originalPrice: null,
    image: "assets/images/tra-sua-tam.jpg",
    tags: ["Hoa Lài Mộc", "Ngọt Thanh"],
    badge: "Mới",
    description: "Trà Oolong búp non ủ sương Mộc Châu quyện với hoa lài Hàm Long thơm ngát. Sữa sánh nhẹ không lấn át vị trà, thêm trân châu phu thê dẻo dai bùi bùi.",
    isSignature: false,
    customizable: true,
    availableSizes: [
      { name: "Size Vừa (M) - 500ml", priceDelta: 0 },
      { name: "Size Lớn (L) - 700ml", priceDelta: 8000 }
    ],
    defaultOptions: {
      size: "Size Vừa (M) - 500ml",
      sweetness: "50% - Ít Ngọt",
      ice: "Bình thường (100% Đá)",
      toppings: ["Trân Châu Hoàng Kim Tơ Tằm"]
    }
  },
  {
    id: "prod-7",
    categoryId: "tra-sua-tam",
    name: "Trà Sữa Rang Thảo Mộc Bản Mường",
    subtitle: "Sao chảo gang thủ công thơm nồng",
    price: 48000,
    originalPrice: null,
    image: "assets/images/tra-moc-shan-tuyet.jpg",
    tags: ["Sao Chảo Gang", "Ấm Bụng"],
    badge: "Độc Bản",
    description: "Lá trà xanh già được sao thủ công trên chảo gang đỏ lửa cùng vỏ quế Trà Bồng và hoa hồi Tây Bắc, nấu trực tiếp với sữa tươi cho hương thơm khói nồng nàn ấm áp.",
    isSignature: false,
    customizable: true,
    availableSizes: [
      { name: "Size Vừa (M) - 500ml", priceDelta: 0 },
      { name: "Size Lớn (L) - 700ml", priceDelta: 8000 }
    ],
    defaultOptions: {
      size: "Size Vừa (M) - 500ml",
      sweetness: "70% - Thanh Dịu",
      ice: "Bình thường (100% Đá)",
      toppings: []
    }
  },

  // --- CÀ PHÊ PHIN MỘC DÂN DÃ ---
  {
    id: "prod-8",
    categoryId: "ca-phe-phin",
    name: "Cà Phê Phin Đen Đá Mộc",
    subtitle: "100% Robusta Đắk Lắk rang mộc nguyên chất",
    price: 32000,
    originalPrice: null,
    image: "assets/images/ca-phe-phin-den.jpg",
    tags: ["Robusta Buôn Ma Thuột", "Đậm Đắng"],
    badge: "Truyền Thống",
    description: "Từng giọt cà phê chắt lọc chầm chậm qua phin nhôm truyền thống. Đậm đà, hương thơm mộc nguyên sơ, hậu vị socola đen đắng dịu lan tỏa.",
    isSignature: false,
    customizable: true,
    availableSizes: [
      { name: "Ly Vừa", priceDelta: 0 }
    ],
    defaultOptions: {
      size: "Ly Vừa",
      sweetness: "Không Đường (Đen Nguyên Bản)",
      ice: "Đá Riêng",
      toppings: []
    }
  },
  {
    id: "prod-9",
    categoryId: "ca-phe-phin",
    name: "Nâu Sánh Phin Nhôm",
    subtitle: "Cà phê sữa đặc đậm đà phong vị Việt",
    price: 38000,
    originalPrice: null,
    image: "assets/images/ca-phe-muoi.jpg",
    tags: ["Sữa Đặc Ông Thọ", "Đậm Béo"],
    badge: "Kinh Điển",
    description: "Cà phê phin thơm lừng rót ngập trên lớp sữa đặc béo ngậy. Khuấy đều tay để thưởng thức hương vị thân thương nuôi dưỡng bao thế hệ người Việt.",
    isSignature: false,
    customizable: true,
    availableSizes: [
      { name: "Ly Vừa", priceDelta: 0 },
      { name: "Ly Lớn", priceDelta: 7000 }
    ],
    defaultOptions: {
      size: "Ly Vừa",
      sweetness: "Chuẩn vị Quán",
      ice: "Nhiều Đá",
      toppings: []
    }
  },
  {
    id: "prod-10",
    categoryId: "ca-phe-phin",
    name: "Bạc Xỉu Sương Sáo Phin Nâu",
    subtitle: "Nhiều sữa ít cà phê, thạch mát thanh",
    price: 42000,
    originalPrice: null,
    image: "assets/images/ca-phe-muoi.jpg",
    tags: ["Dễ Uống", "Thạch Sương Sáo"],
    badge: "Bán Chạy",
    description: "Thức uống dung hòa giữa sữa tươi, sữa đặc ngọt dịu và một chút cà phê phin thơm thoang thoảng. Thêm thạch sương sáo mộc mát lành vui miệng.",
    isSignature: false,
    customizable: true,
    availableSizes: [
      { name: "Size Vừa (M) - 500ml", priceDelta: 0 },
      { name: "Size Lớn (L) - 700ml", priceDelta: 8000 }
    ],
    defaultOptions: {
      size: "Size Vừa (M) - 500ml",
      sweetness: "70% - Thanh Dịu",
      ice: "Bình thường (100% Đá)",
      toppings: ["Thạch Sương Sáo Mộc"]
    }
  },

  // --- CÀ PHÊ ĐẶC SẢN & TRỨNG BÉO ---
  {
    id: "prod-11",
    categoryId: "ca-phe-dac-san",
    name: "Cà Phê Cốt Dừa Bánh Flan",
    subtitle: "Cốt dừa đá xay nguyên chất & Flan thơm mềm",
    price: 48000,
    originalPrice: 55000,
    image: "assets/images/ca-phe-cot-dua.jpg",
    tags: ["Cốt Dừa Bến Tre", "Bánh Flan", "Bán Chạy"],
    badge: "Đặc Sắc",
    description: "Cốt dừa tươi Bến Tre xay mịn cùng đá mát lạnh, rưới cà phê phin đậm đắng chảy giọt quyến rũ, kèm miếng bánh flan caramel mềm tan và dừa nướng giòn tan trên mặt.",
    isSignature: true,
    customizable: true,
    availableSizes: [
      { name: "Cốc Vừa (M)", priceDelta: 0 },
      { name: "Cốc Lớn (L)", priceDelta: 8000 }
    ],
    defaultOptions: {
      size: "Cốc Vừa (M)",
      sweetness: "Chuẩn vị Quán",
      ice: "Đá xay mịn",
      toppings: ["Bánh Flan Trứng Cốt Dừa"]
    }
  },
  {
    id: "prod-12",
    categoryId: "ca-phe-dac-san",
    name: "Cà Phê Kem Trứng Nướng Phô Mai",
    subtitle: "Lớp đường phèn nướng cháy thơm lừng",
    price: 52000,
    originalPrice: null,
    image: "assets/images/ca-phe-trung.jpg",
    tags: ["Đường Nướng Cháy", "Béo Ngậy"],
    badge: "Mới Lạ",
    description: "Sự kết hợp táo bạo giữa kem trứng truyền thống và chút muối phô mai dịu béo. Mặt trên rắc đường phèn khò cháy giòn rụm tỏa mùi thơm ngây ngất.",
    isSignature: false,
    customizable: true,
    availableSizes: [
      { name: "Ly Vừa", priceDelta: 0 }
    ],
    defaultOptions: {
      size: "Ly Vừa",
      sweetness: "70% - Thanh Dịu",
      ice: "Ít Đá",
      toppings: ["Kem Trứng Nướng Béo"]
    }
  },

  // --- TRÀ HOA & TRÁI CÂY QUÊ ---
  {
    id: "prod-13",
    categoryId: "tra-hoa-trai-cay",
    name: "Trà Sen Bách Diệp Tây Hồ",
    subtitle: "Ướp từng bông sen sớm Quảng An",
    price: 48000,
    originalPrice: null,
    image: "assets/images/tra-sen-tay-ho.jpg",
    tags: ["Sen Bách Diệp", "Thanh Tao", "Pha Ấm"],
    badge: "Di Sản",
    description: "Trà búp Shan Tuyết được ủ trong lòng búp sen hồng trăm cánh hái lúc sớm mai khi sương chưa tan. Nước trà trong xanh ngọc, hương thơm thanh khiết tựa sương gió hồ Tây.",
    isSignature: true,
    customizable: true,
    availableSizes: [
      { name: "Ấm Thưởng Trà (Nóng)", priceDelta: 0 },
      { name: "Ly Đá Uống Liền (Lạnh)", priceDelta: 0 }
    ],
    defaultOptions: {
      size: "Ấm Thưởng Trà (Nóng)",
      sweetness: "Không Đường (Thanh Mộc Tự Nhiên)",
      ice: "Uống Nóng Thưởng Hương",
      toppings: []
    }
  },
  {
    id: "prod-14",
    categoryId: "tra-hoa-trai-cay",
    name: "Trà Mận Hậu Mộc Châu",
    subtitle: "Mận hậu chín đỏ giòn ngọt chua dịu",
    price: 45000,
    originalPrice: null,
    image: "assets/images/tra-dau-tam.jpg",
    tags: ["Mận Mộc Châu", "Chua Ngọt"],
    badge: "Mùa Vụ",
    description: "Mận hậu thung lũng Nà Ka đỏ mọng rim cùng đường phèn thanh nhẹ, kết hợp trà xanh Tây Bắc tạo vị chua thanh giải khát tuyệt đỉnh cho ngày hè.",
    isSignature: false,
    customizable: true,
    availableSizes: [
      { name: "Size Vừa (M) - 500ml", priceDelta: 0 },
      { name: "Size Lớn (L) - 700ml", priceDelta: 8000 }
    ],
    defaultOptions: {
      size: "Size Vừa (M) - 500ml",
      sweetness: "70% - Thanh Dịu",
      ice: "Bình thường (100% Đá)",
      toppings: []
    }
  },

  // --- BÁNH DÂN DÃ & QUÀ QUÊ ---
  {
    id: "prod-15",
    categoryId: "banh-qua-que",
    name: "Cốm Xào Dừa Hà Nội",
    subtitle: "Cốm non Mễ Trì xào nước dừa thơm dẻo",
    price: 38000,
    originalPrice: 45000,
    image: "assets/images/banh-que.jpg",
    tags: ["Mễ Trì Hà Nội", "Dẻo Thơm"],
    badge: "Quà Quê",
    description: "Hạt cốm nếp non dẻo quánh xào cùng nước cốt dừa và đường cát thanh, rắc thêm sợi dừa nạo giòn bùi. Nhâm nhi cùng chén trà sen hay ngụm trà sữa thật tròn vị.",
    isSignature: false,
    customizable: false,
    availableSizes: [
      { name: "Đĩa Thưởng Thức (1 phần)", priceDelta: 0 }
    ],
    defaultOptions: {}
  },
  {
    id: "prod-16",
    categoryId: "banh-qua-que",
    name: "Bánh Phu Thê Truyền Thống",
    subtitle: "Gói lá chuối xanh, nhân đậu xanh hạt sen",
    price: 25000,
    originalPrice: null,
    image: "assets/images/banh-que.jpg",
    tags: ["Kinh Bắc", "Vỏ Trong Dai Giòn"],
    badge: "Dân Dã",
    description: "Bánh phu thê Đình Bảng nức tiếng, bột năng trong veo dai giòn thấy sợi dừa nạo bên trong, nhân đậu xanh hạt sen bùi béo ngọt thanh, gói gọn gàng trong lá chuối xanh tươi.",
    isSignature: false,
    customizable: false,
    availableSizes: [
      { name: "Cặp 2 Chiếc", priceDelta: 0 }
    ],
    defaultOptions: {}
  },
  {
    id: "prod-17",
    categoryId: "banh-qua-que",
    name: "Bánh Flan Cốt Dừa Nướng Mật Mía",
    subtitle: "Trứng gà tươi, cốt dừa Bến Tre và mật mía",
    price: 32000,
    originalPrice: null,
    image: "assets/images/ca-phe-cot-dua.jpg",
    tags: ["Mềm Tan", "Béo Ngọt"],
    badge: "Món Kèm",
    description: "Bánh flan làm từ lòng đỏ trứng gà ta thơm ngậy, nước cốt dừa tươi sánh mịn, chan sốt mật mía Nghệ An thơm nồng nàn vị gừng tươi ấm áp.",
    isSignature: false,
    customizable: false,
    availableSizes: [
      { name: "Phần 1 Bánh", priceDelta: 0 }
    ],
    defaultOptions: {}
  },

  // --- TOPPING THỦ CÔNG ---
  {
    id: "prod-18",
    categoryId: "topping-thu-cong",
    name: "Trân Châu Hoàng Kim Tơ Tằm",
    subtitle: "Nấu mật mía và đường phèn dẻo quánh",
    price: 8000,
    originalPrice: null,
    image: "assets/images/topping-tran-chau.jpg",
    tags: ["Thủ Công", "Dẻo Dai"],
    badge: "Topping",
    description: "Viên trân châu óng ánh màu hổ phách làm từ bột sắn dây và mật mía tự nhiên, dẻo dai sần sật không chất bảo quản.",
    isSignature: false,
    customizable: false,
    availableSizes: [{ name: "1 Phần Topping", priceDelta: 0 }],
    defaultOptions: {}
  },
  {
    id: "prod-19",
    categoryId: "topping-thu-cong",
    name: "Thạch Sương Sáo Mộc Cao Bằng",
    subtitle: "Lá sương sáo rừng nấu thanh nhiệt",
    price: 7000,
    originalPrice: null,
    image: "assets/images/ca-phe-muoi.jpg",
    tags: ["Mát Lành", "Thảo Mộc"],
    badge: "Topping",
    description: "Được nấu từ lá sương sáo rừng Cao Bằng nguyên chất. Mềm mướt, thơm ngát thảo mộc và giải nhiệt cơ thể cực kỳ sảng khoái.",
    isSignature: false,
    customizable: false,
    availableSizes: [{ name: "1 Phần Topping", priceDelta: 0 }],
    defaultOptions: {}
  },
  {
    id: "prod-20",
    categoryId: "topping-thu-cong",
    name: "Hạt Sen Tươi Hầm Đường Phèn",
    subtitle: "Hạt sen Huế bở tơi, ngọt dịu",
    price: 10000,
    originalPrice: null,
    image: "assets/images/tra-sen-tay-ho.jpg",
    tags: ["Bùi Béo", "Bổ Dưỡng"],
    badge: "Topping",
    description: "Hạt sen tươi bóc vỏ lấy tim, hầm nhừ liu riu cùng đường phèn Quảng Ngãi. Từng hạt bở tơi, ngọt thanh dịu dàng.",
    isSignature: false,
    customizable: false,
    availableSizes: [{ name: "1 Phần Topping", priceDelta: 0 }],
    defaultOptions: {}
  }
];

// Topping tùy chọn cho modal
const AVAILABLE_TOPPINGS = [
  { id: "top-1", name: "Trân Châu Hoàng Kim Tơ Tằm", price: 8000 },
  { id: "top-2", name: "Thạch Sương Sáo Mộc Cao Bằng", price: 7000 },
  { id: "top-3", name: "Hạt Sen Tươi Hầm Đường Phèn", price: 10000 },
  { id: "top-4", name: "Bánh Flan Trứng Cốt Dừa", price: 12000 },
  { id: "top-5", name: "Kem Trứng Nướng Béo Phô Mai", price: 12000 },
  { id: "top-6", name: "Trân Châu Củ Năng Dừa Non", price: 9000 }
];

const SWEETNESS_LEVELS = [
  "100% - Chuẩn Vị Tằm",
  "70% - Thanh Dịu",
  "50% - Ít Ngọt",
  "30% - Rất Ít Ngọt",
  "0% - Không Đường"
];

const ICE_LEVELS = [
  "Bình thường (100% Đá)",
  "Ít đá (50% Đá)",
  "Đá riêng mang về",
  "Uống Nóng (ấm áp)"
];

// Thông tin cửa hàng
const STORE_LOCATIONS = [
  {
    name: "Tằm - Chân Cầm (Phố Cổ)",
    address: "18 Phố Chân Cầm, Hàng Trống, Hoàn Kiếm, Hà Nội",
    phone: "024 3828 9988",
    hours: "07:00 - 22:30",
    desc: "Góc nhà cổ ngập tràn ánh nắng, giếng trời đón gió và tiếng ríu rít phố phường Hà Nội xưa."
  },
  {
    name: "Tằm - Đặng Thai Mai (Tây Hồ)",
    address: "42 Đặng Thai Mai, Quảng An, Tây Hồ, Hà Nội",
    phone: "024 3719 5566",
    hours: "07:30 - 22:30",
    desc: "Gần đầm sen Quảng An, mộc mạc với giàn dâu tằm xanh mướt và những ấm trà sen thơm nồng nàn."
  },
  {
    name: "Tằm - Thảo Điền (TP. Thủ Đức)",
    address: "88 Đường Xuân Thủy, Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh",
    phone: "028 3899 6622",
    hours: "07:30 - 23:00",
    desc: "Khoảng sân vườn mộc rợp bóng tre trúc, bàn ghế gỗ mộc và ly cà phê phin sánh đậm."
  }
];

// Câu đối / Thơ đề thương hiệu
const CULTURAL_QUOTES = [
  {
    verse: "Tơ tằm dệt áo quê hương / Tằm này dệt giọt đậm hương ngọt ngào.",
    author: "Tằm - Thêu Hương Dệt Vị"
  },
  {
    verse: "Búp chè Shan Tuyết ngậm sương / Chắt chiu giọt ngọc vấn vương tình người.",
    author: "Chuyện Đất & Trà"
  },
  {
    verse: "Từng giọt phin rơi đọng nghĩa tình / Một mai thức giấc thấy bình minh.",
    author: "Hồn Phin Việt"
  }
];
