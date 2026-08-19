export type ArtifactKind = "document" | "portrait" | "field" | "data" | "debate" | "policy";

export interface ArtifactData {
  id: string;
  roomId: string;
  title: string;
  date: string;
  eyebrow: string;
  description: string;
  takeaway: string;
  position: [number, number, number];
  color: string;
  kind: ArtifactKind;
  imageUrl?: string;
  credit?: string;
  sourceUrl?: string;
  rightsNote?: string;
}

export interface RoomData {
  id: string;
  index: string;
  name: string;
  period: string;
  description: string;
  question: string;
  color: string;
  cameraPosition: [number, number, number];
  targetPosition: [number, number, number];
}

export const ROOMS: RoomData[] = [
  {
    id: "main-hall",
    index: "00",
    name: "Thực tiễn đi trước",
    period: "Câu hỏi trung tâm",
    description: "Một sáng kiến cho thấy kết quả ngoài đồng ruộng, nhưng không vượt qua được giới hạn nhận thức của thời đại.",
    question: "Vì sao một cách làm có kết quả thực tế lại bị phê phán và đình chỉ?",
    color: "#9a3412",
    cameraPosition: [0, 5.5, 28],
    targetPosition: [0, 1.5, 12],
  },
  {
    id: "room-origin",
    index: "01",
    name: "Động lực từ đồng ruộng",
    period: "1963–10/9/1966",
    description: "Từ những thử nghiệm tại hợp tác xã đến Nghị quyết 68-NQ/TU.",
    question: "Khoán thay đổi quyền sở hữu, hay thay đổi trách nhiệm và động lực?",
    color: "#166534",
    cameraPosition: [-22, 5.5, 28],
    targetPosition: [-22, 1.5, 12],
  },
  {
    id: "room-turning-point",
    index: "02",
    name: "Hiệu quả gặp giới hạn tư duy",
    period: "1967–1968",
    description: "Kết quả định lượng đi cùng một cuộc tranh luận gay gắt về tập thể và cá nhân.",
    question: "Nên đánh giá chính sách bằng hình thức tổ chức hay kết quả thực tế?",
    color: "#b45309",
    cameraPosition: [0, 5.5, -6],
    targetPosition: [0, 1.5, -20],
  },
  {
    id: "room-policy",
    index: "03",
    name: "Từ tiền lệ đến đổi mới",
    period: "1979–1988",
    description: "Một quá trình điều chỉnh chính sách, không phải sự sao chép nguyên xi mô hình năm 1966.",
    question: "Thực tiễn địa phương trở thành chính sách quốc gia bằng cách nào?",
    color: "#1d4ed8",
    cameraPosition: [22, 5.5, 28],
    targetPosition: [22, 1.5, 12],
  },
];

export const ARTIFACTS: ArtifactData[] = [
  {
    id: "kim-ngoc",
    roomId: "main-hall",
    title: "Kim Ngọc — người thúc đẩy chủ trương",
    date: "1917–1979",
    eyebrow: "NHÂN VẬT",
    description: "Từ quan sát thực tiễn ở cơ sở, Bí thư Tỉnh ủy Kim Ngọc định hướng, chủ trì và chịu trách nhiệm chính trị cho thử nghiệm khoán hộ tại Vĩnh Phúc.",
    takeaway: "Vai trò nổi bật không đồng nghĩa ông là người trực tiếp ký Nghị quyết 68.",
    position: [0, 1.5, 18],
    color: "#7c2d12",
    kind: "portrait",
    imageUrl: "/assets/evidence/kim-ngoc-portrait.jpg",
    credit: "Ảnh: Bảo tàng Lịch sử Quốc gia",
    sourceUrl: "https://baotanglichsu.vn/vi/Articles/3098/61819/djong-chi-bi-thu-tinh-uy-kim-ngoc-con-nguoi-cua-djoi-moi-va-sang-tao.html",
    rightsNote: "Nguồn chính thống; trang nguồn không nêu giấy phép tái sử dụng mở.",
  },
  {
    id: "three-milestones",
    roomId: "room-origin",
    title: "Máy kéo tại Hợp tác xã Đại Phong",
    date: "6/1961",
    eyebrow: "ẢNH TƯ LIỆU",
    description: "Ảnh ghi lại máy kéo và người dân trên đồng ruộng Hợp tác xã Đại Phong trong thời kỳ hợp tác hóa nông nghiệp. Đây là ảnh bối cảnh, không phải ảnh thử nghiệm khoán hộ tại Vĩnh Phúc.",
    takeaway: "Khoán hộ tại Vĩnh Phúc đi lên từ các thử nghiệm cơ sở giai đoạn 1963–1966; không nên dùng ảnh bối cảnh này như bằng chứng trực tiếp cho thử nghiệm đó.",
    position: [-22, 1, 18],
    color: "#166534",
    kind: "document",
    imageUrl: "/assets/evidence/htx-dai-phong-1961.jpg",
    credit: "Ảnh bối cảnh HTX: Văn Thượng/TTXVN, qua VietnamPlus (6/1961)",
    sourceUrl: "https://www.vietnamplus.vn/photo-73-nam-ngay-chu-tich-ho-chi-minh-keu-goi-thi-dua-ai-quoc-post718661.vnp",
    rightsNote: "Ảnh bối cảnh hợp tác hóa, không phải ảnh thử nghiệm Vĩnh Phúc; không có giấy phép mở.",
  },
  {
    id: "resolution-68",
    roomId: "room-origin",
    title: "Nghị quyết 68-NQ/TU",
    date: "10/9/1966",
    eyebrow: "VĂN KIỆN",
    description: "Tên đầy đủ: “Về một số vấn đề quản lý lao động nông nghiệp trong hợp tác xã hiện nay”. Văn kiện nêu các hình thức khoán theo khâu, theo công việc dài ngày hoặc suốt vụ, theo sản lượng cho hộ/nhóm và khoán gọn ruộng đất cho hộ.",
    takeaway: "Trần Quốc Phi là người ký; Kim Ngọc chủ trì, định hướng và thúc đẩy chủ trương.",
    position: [-26, 1, 12],
    color: "#854d0e",
    kind: "document",
    imageUrl: "/assets/evidence/nghi-quyet-68-scan-crop.png",
    credit: "Tư liệu: Ban Tuyên giáo Tỉnh ủy Vĩnh Phúc / Báo Nhân Dân",
    sourceUrl: "https://nhandan.vn/tran-quoc-phi-nguoi-ky-nghi-quyet-ba-khoan-post628607.html",
    rightsNote: "Ảnh scan tài liệu lịch sử; quyền đối với bản số hóa chưa được công bố rõ.",
  },
  {
    id: "motivation-chain",
    roomId: "room-turning-point",
    title: "Kim Ngọc đi cơ sở cùng nông dân",
    date: "1966–1967",
    eyebrow: "ẢNH TƯ LIỆU",
    description: "Ảnh tư liệu ghi lại Kim Ngọc trao đổi với nông dân trên đồng ruộng. Cuối năm 1967, các nguồn ghi nhận 160 HTX, khoảng 70% tổng số HTX, đạt bình quân 5 đến trên 7 tấn/ha; sản lượng quy thóc đạt 222.000 tấn, tăng 4.000 tấn so với 1966.",
    takeaway: "Ngày 6/11/1968, hội nghị cán bộ tỉnh phê phán khoán hộ; thông tri ngày 12/12/1968 dẫn tới đình chỉ trên thực tế.",
    position: [0, 1, -20],
    color: "#a16207",
    kind: "document",
    imageUrl: "/assets/evidence/kim-ngoc-lang-cong.jpg",
    credit: "Ảnh: Bảo tàng Lịch sử Quốc gia",
    sourceUrl: "https://baotanglichsu.vn/vi/Articles/3098/61819/djong-chi-bi-thu-tinh-uy-kim-ngoc-con-nguoi-cua-djoi-moi-va-sang-tao.html",
    rightsNote: "Nguồn chính thống; trang nguồn không nêu giấy phép tái sử dụng mở.",
  },
  {
    id: "policy-1979",
    roomId: "room-policy",
    title: "Nghị quyết 20-NQ/TW",
    date: "20/9/1979",
    eyebrow: "VĂN KIỆN",
    description: "Nghị quyết nhấn mạnh kết hợp lợi ích xã hội, tập thể và cá nhân, khuyến khích “làm nhiều được hưởng nhiều”. Văn kiện chưa ban hành Khoán 100 hay Khoán 10.",
    takeaway: "Đây là bước mở khóa tư duy và chính sách, không phải mốc ban hành khoán hộ.",
    position: [22, 1, 18],
    color: "#0369a1",
    kind: "document",
    sourceUrl: "https://tulieuvankien.dangcongsan.vn/van-kien-tu-lieu-ve-dang/hoi-nghi-bch-trung-uong/khoa-iv/nghi-quyet-so-20-nqtw-ngay-2091979-hoi-nghi-lan-thu-sau-ban-chap-hanh-trung-uong-dang-ve-tinh-hinh-va-nhiem-vu-cap-bach-1075?categoryId=104000078",
  },
  {
    id: "directive-100",
    roomId: "room-policy",
    title: "Chỉ thị 100-CT/TW",
    date: "13/1/1981",
    eyebrow: "VĂN KIỆN",
    description: "Chỉ thị mở rộng khoán sản phẩm đến nhóm lao động và người lao động trong HTX nông nghiệp, vẫn trong khung tổ chức HTX và sở hữu tập thể.",
    takeaway: "Không nên diễn giải Chỉ thị 100 như giao ruộng ổn định lâu dài cho hộ.",
    position: [26, 1, 12],
    color: "#2563eb",
    kind: "document",
  },
  {
    id: "congress-vi",
    roomId: "room-policy",
    title: "Báo cáo chính trị Đại hội VI",
    date: "15–18/12/1986",
    eyebrow: "VĂN KIỆN",
    description: "Báo cáo chính trị ghi nhận khoán sản phẩm góp phần quan trọng vào phát triển nông nghiệp, đồng thời nêu cơ chế vẫn chưa hoàn thiện và còn thiếu sót.",
    takeaway: "Đại hội VI tạo khung đổi mới rộng hơn; không phải văn kiện ban hành Khoán 10.",
    position: [22, 1, 6],
    color: "#1d4ed8",
    kind: "document",
    sourceUrl: "https://tulieuvankien.dangcongsan.vn/ban-chap-hanh-trung-uong-dang/dai-hoi-dang/lan-thu-vi/bao-cao-chinh-tri-cua-ban-chap-hanh-trung-uong-dang-khoa-v-trinh-tai-dai-hoi-dai-bieu-toan-quoc-lan-thu-vi-cua-1491?categoryId=104000024",
  },
  {
    id: "resolution-10",
    roomId: "room-policy",
    title: "Nghị quyết 10-NQ/TW",
    date: "5/4/1988",
    eyebrow: "VĂN KIỆN",
    description: "Nghị quyết đổi mới quản lý kinh tế nông nghiệp theo hướng hộ/xã viên tự chủ hơn và quan hệ khoán ổn định hơn.",
    takeaway: "Khoán 10 không tư hữu hóa đất đai và không phải bản sao nguyên xi của thử nghiệm Vĩnh Phúc.",
    position: [18, 1, 12],
    color: "#1e40af",
    kind: "document",
  },
];

export const POLICY_TIMELINE = [
  { year: "1966", title: "Nghị quyết 68", text: "Thực tiễn khoán hộ được chính thức hóa tại Vĩnh Phúc." },
  { year: "1968", title: "Đình chỉ", text: "Phê phán tháng 11 và thông tri chỉnh đốn ngày 12/12 dẫn tới đình chỉ trên thực tế." },
  { year: "1979", title: "Tháo gỡ", text: "Nghị quyết 20 điều chỉnh cơ chế và đặt lợi ích người lao động vào tiêu chuẩn chính sách." },
  { year: "1981", title: "Khoán 100", text: "Khoán sản phẩm được mở rộng đến nhóm và người lao động trong HTX." },
  { year: "1986", title: "Đại hội VI", text: "Hiệu quả của khoán được nhìn nhận trong đổi mới cơ chế toàn diện." },
  { year: "1988", title: "Khoán 10", text: "Quyền tự chủ kinh tế của hộ/xã viên được mở rộng sâu hơn." },
];

export const SOURCES = [
  { label: "Báo Nhân Dân — người ký Nghị quyết 68", url: "https://nhandan.vn/tran-quoc-phi-nguoi-ky-nghi-quyet-ba-khoan-post628607.html" },
  { label: "Bảo tàng Lịch sử Quốc gia — Kim Ngọc và khoán hộ", url: "https://baotanglichsu.vn/vi/Articles/3098/61819/djong-chi-bi-thu-tinh-uy-kim-ngoc-con-nguoi-cua-djoi-moi-va-sang-tao.html" },
  { label: "Báo Nhân Dân — kết quả cuối năm 1967", url: "https://nhandan.vn/bi-thu-tinh-uy-kim-ngoc-mot-con-nguoi-doi-moi-va-sang-tao-post305537.html" },
  { label: "Tư liệu–Văn kiện Đảng — Nghị quyết 20-NQ/TW", url: "https://tulieuvankien.dangcongsan.vn/van-kien-tu-lieu-ve-dang/hoi-nghi-bch-trung-uong/khoa-iv/nghi-quyet-so-20-nqtw-ngay-2091979-hoi-nghi-lan-thu-sau-ban-chap-hanh-trung-uong-dang-ve-tinh-hinh-va-nhiem-vu-cap-bach-1075?categoryId=104000078" },
  { label: "Tư liệu–Văn kiện Đảng — Báo cáo chính trị Đại hội VI", url: "https://tulieuvankien.dangcongsan.vn/ban-chap-hanh-trung-uong-dang/dai-hoi-dang/lan-thu-vi/bao-cao-chinh-tri-cua-ban-chap-hanh-trung-uong-dang-khoa-v-trinh-tai-dai-hoi-dai-bieu-toan-quoc-lan-thu-vi-cua-1491?categoryId=104000024" },
];

export const MEMBERS = [
  "Trần Thu Hằng — HS180472",
  "Nguyễn Nhật Bằng — HE190121",
  "Đặng Anh Duy — HE181286",
  "Phan Hồng Đạt — HE180379",
  "Nguyễn Hoàng Hiệp — HE187332",
  "Nguyễn Bá Cường — HE181494",
  "Vũ Thế Diện — HE191514",
];
