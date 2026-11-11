# 🌳 CÂY CẢM XÚC – Website miễn phí dùng cho iPad và máy chiếu

## Tính năng
- Mỗi iPad: 2 học sinh chọn lần lượt 1 trong 2 cảm xúc, không gõ tên/mật khẩu.
- Giáo viên: tạo phòng riêng, nhận mã QR/link; các emoji xuất hiện trên cây theo thời gian thực.
- Thống kê tổng số, cảm xúc vui, cảm xúc chưa vui.
- Nút làm trống cây trước giờ học, phóng toàn màn hình.
- Nút **Xem thử cây cảm xúc** không cần Firebase, nhưng chỉ có dữ liệu minh họa.

## Bước 1 – Tạo Firebase (gói Spark miễn phí)
1. Mở https://console.firebase.google.com/ và chọn **Add project**.
2. Chọn **Build > Authentication > Sign-in method**: bật **Anonymous**. Đây là đăng nhập kỹ thuật tự động, học sinh không nhập thông tin.
3. Trong **Authentication > Settings > Authorized domains**, thêm `TEN_USER.github.io` (domain thực tế bạn sẽ dùng). Nếu thử trên localhost, thêm localhost nếu cần.
4. Chọn **Build > Realtime Database > Create database**. Chọn gói Spark và vùng có sẵn, sau đó xem URL database được tạo; sao chép URL này.
5. Trong **Realtime Database > Rules**, thay toàn bộ bằng nội dung file `database.rules.json`, bấm **Publish**. Không chọn chế độ đọc/ghi công khai.
6. Trong Project settings (biểu tượng bánh răng) > **Your apps > Web**, đăng ký web app, sao chép `firebaseConfig`.

## Bước 2 – Cấu hình index.html
Mở `index.html` bằng VS Code hoặc Notepad và thay các chuỗi `THAY_...` trong `firebaseConfig` bằng thông số thật. Lưu ý `databaseURL` phải chính xác URL từ Realtime Database (có thể là `firebaseio.com` hoặc `firebasedatabase.app`). Không cần thêm dấu `/` cuối URL.

Ví dụ mẫu (KHÔNG dùng nguyên văn):
```js
const firebaseConfig = {
  apiKey: 'AIza...cua-ban',
  authDomain: 'caycamxuc-123.firebaseapp.com',
  databaseURL: 'https://caycamxuc-123-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'caycamxuc-123',
  appId: '1:123456:web:abcdef'
};
```

**Lưu ý**: Firebase web config không phải mật khẩu bí mật. Quyền truy cập dữ liệu được kiểm soát bởi Authentication và Database Rules. Tuy nhiên, ai có link phòng có thể gửi cảm xúc cho phòng đó; chỉ chia sẻ mã QR trong lớp. Xóa dữ liệu sau tiết học nếu không cần lưu. Không thu tên học sinh hoặc thông tin cá nhân.

## Bước 3 – Đăng website miễn phí với GitHub Pages
1. Truy cập https://github.com/ rồi đăng nhập.
2. Tạo repository mới, ví dụ `cay-cam-xuc` và chọn **Public**.
3. Vào **Add file > Upload files**, tải lên `index.html` ở thư mục gốc, bấm **Commit changes**.
4. Trong **Settings > Pages > Build and deployment**, chọn **Deploy from a branch**, Branch `main`, Folder `/(root)` rồi **Save**.
5. Trang web có dạng `https://TEN_USER.github.io/cay-cam-xuc/`. Truy cập và nhấn **Tạo khu vườn cho lớp**.

Không nên đăng thông tin nhạy cảm vào repo public. File `database.rules.json` có thể giữ riêng hoặc đăng cùng (rules được bảo vệ bởi Firebase, không phải bởi việc giấu file).

## Bước 4 – Dạy trên lớp
1. Giáo viên mở website trên máy tính nối TV, bấm **Tạo khu vườn cho lớp**.
2. Giáo viên cho học sinh quét QR trên iPad hoặc dùng link học sinh đã mở sẵn.
3. Học sinh bên trái chạm một biểu tượng; học sinh bên phải chạm tiếp một biểu tượng.
4. Mỗi lượt chọn hiển thị ngay trên cây của giáo viên.
5. Nhấn **⛶ Toàn màn hình** để trình chiếu khu vườn; có thể ẩn mã QR.
6. Để dạy lượt mới, giáo viên nhấn **Xóa lượt chọn**. Học sinh cần chọn **Chọn lại hai lượt** trên iPad nếu đã chọn xong.

## Kiểm tra trước tiết dạy
- Trên laptop: mở đường dẫn phòng giáo viên.
- Trên điện thoại: quét QR bằng camera và chọn lần lượt hai cảm xúc.
- Quan sát số liệu trên cây thay đổi. Nếu không cập nhật, kiểm tra mạng Internet và Firebase Rules.
- Mở thử bằng 2–3 iPad cùng lúc trước ngày dạy.

## Giới hạn và lưu ý
- Gói Firebase Spark của Realtime Database hỗ trợ tối đa 100 kết nối đồng thời. Dung lượng và lưu lượng cũng có hạn mức.
- Mỗi trình duyệt iPad dùng một tài khoản anonymous kỹ thuật; mỗi tài khoản lưu 2 lượt. Nếu xóa dữ liệu trình duyệt hoặc chuyển sang trình duyệt khác, thiết bị có thể được tính thành 2 lượt mới.
- Chế độ lớp học không xác minh danh tính từng học sinh và không thể ngăn tuyệt đối người có link gửi lượt giả. Vì vậy dùng mã phòng riêng cho mỗi buổi dạy.
- Giáo viên chỉ có quyền xóa trong đúng trình duyệt đã tạo phòng (hoặc cùng phiên đăng nhập Firebase còn lưu). Nếu mất phiên, tạo một phòng mới.
- Không cần đưa ảnh, tên hay câu trả lời riêng tư của học sinh lên mạng.

## C?c t?p giao di?n

Khi ??a website l?n hosting, gi? nguy?n c?u tr?c:

```text
index.html
garden.css
assets/
  enchanted-garden.png
```

Giao di?n v? c?c l??t th? ho?t ??ng m? kh?ng c?n k?t n?i Firebase. K?t n?i ???c kh?i t?o khi th?y c? t?o ph?ng ho?c khi m? li?n k?t ph?ng. C?c lu?ng ph?ng h?c ?? ???c ki?m tra v?i backend m? ph?ng; c?n ki?m tra ??ng b? tr?n c?c thi?t b? th?t tr??c gi? h?c.
