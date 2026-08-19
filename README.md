# Bảo tàng số 3D — Khoán hộ Vĩnh Phúc

Ứng dụng Next.js + React Three Fiber chuyển thể từ cấu trúc bảo tàng 3D của `vnr_spst`, với toàn bộ narrative, hiện vật, tương tác và tư liệu được xây lại cho chủ đề **Khoán hộ tại Vĩnh Phúc — Kim Ngọc — Nghị quyết 68 — tiến trình điều chỉnh chính sách 1966–1988**.

## Trải nghiệm

- Sảnh mở đầu với bình chọn “tiến bộ hay thụt lùi”.
- Ba phòng: hình thành chủ trương; kết quả và bước ngoặt 1968; điều chỉnh chính sách 1979–1988.
- Hiện vật 3D procedural, không dùng mô hình/cảnh lịch sử giả.
- Ảnh tư liệu thật có credit và ghi chú quyền sử dụng.
- Trò ghép số cuối năm 1967, timeline tương tác và quiz đúng/sai.
- Responsive desktop/mobile, hỗ trợ bàn phím và reduced motion.

## Chạy local

```bash
npm ci
npm run dev
```

Mở `http://localhost:3000`.

## Build production

```bash
npm run lint
npm run build
npm run start -- --hostname 0.0.0.0
```

## Docker

```bash
docker build -t khoan-ho-museum .
docker run --rm -p 3000:3000 khoan-ho-museum
```

## Nguồn và quyền sử dụng

Nội dung nghiên cứu ưu tiên Báo Nhân Dân, Bảo tàng Lịch sử Quốc gia và kho Tư liệu–Văn kiện Đảng. Danh sách nguồn được hiển thị trực tiếp trong ứng dụng.

Ảnh báo chí/bảo tàng trong `public/assets/evidence/` không mặc định có giấy phép mở. Bản demo giữ credit và cảnh báo quyền; cần xin phép trước khi phát hành thương mại hoặc tái phân phối ảnh.
