# Bảo tàng số 3D — Khoán hộ Vĩnh Phúc

Ứng dụng Next.js + React Three Fiber giữ nguyên mặt bằng nhiều phòng, camera, tường, sàn, ánh sáng và luồng tham quan của bảo tàng 3D gốc `vnr_spst`; chỉ thay hiện vật, nội dung và tư liệu cho chủ đề **Khoán hộ tại Vĩnh Phúc — Kim Ngọc — Nghị quyết 68 — tiến trình điều chỉnh chính sách 1966–1988**.

## Trải nghiệm

- Sảnh chính và ba phòng vật lý rõ ràng: hình thành chủ trương; kết quả và bước ngoặt 1968; điều chỉnh chính sách 1979–1988.
- Tour camera tự động và menu chuyển phòng theo bố cục gốc.
- 12 hiện vật tương tác, popup nội dung, điểm cần nhớ, credit và ghi chú quyền sử dụng.
- Hiện vật 3D procedural thay cho các mô hình không liên quan; không dùng hình ảnh AI giả làm tư liệu lịch sử.
- Chế độ ngày/đêm, âm thanh và tiến độ khám phá.
- Render thích ứng: mobile/software WebGL giảm hiệu ứng GPU; thiết bị có GPU thật giữ post-processing đầy đủ.

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
