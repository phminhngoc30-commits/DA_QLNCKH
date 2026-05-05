# Hệ thống Quản lý Nghiên cứu Khoa học (QLNCKH NEU)

Chào mừng bạn đến với dự án Quản lý Nghiên cứu Khoa học. Tài liệu này hướng dẫn chi tiết cách cài đặt và chạy dự án trên môi trường Local (máy tính cá nhân).

## 📋 Yêu cầu hệ thống
*   **Node.js**: Phiên bản 18.x trở lên.
*   **SQL Server**: Đã cài đặt và có quyền truy cập (sa/mật khẩu).
*   **Dung lượng**: Khoảng 500MB cho thư viện (node_modules).

## 🛠️ Cài đặt Cơ sở dữ liệu

1.  Mở **SQL Server Management Studio (SSMS)**.
2.  Tạo một Database mới tên là `QLNCKH`.
3.  Đảm bảo tài khoản `sa` đã được kích hoạt (hoặc dùng tài khoản Window Authentication).
4.  (Tùy chọn) Chạy các script khởi tạo bảng nếu có sẵn trong thư mục `database_scripts` (hoặc cấu hình theo đúng các trường thông tin trong code backend).

## 🚀 Hướng dẫn chạy dự án (Local)

Dự án đã được cấu hình Monorepo, bạn chỉ cần thực hiện các bước sau tại thư mục gốc:

### Bước 1: Cài đặt thư viện
Mở Terminal tại thư mục gốc (`DA_QLNCKH`) và chạy lệnh:
```bash
npm run install-all
```
*Lệnh này sẽ tự động cài đặt thư viện cho cả Backend và Frontend.*

### Bước 2: Cấu hình biến môi trường
1.  Vào thư mục `backend/`, tìm file `.env`.
2.  Cập nhật thông tin kết nối SQL Server của bạn:
    ```env
    DB_SERVER=localhost
    DB_NAME=QLNCKH
    DB_USER=sa
    DB_PASSWORD=mật_khẩu_của_bạn
    ACCESS_TOKEN_SECRET=chuoi_bi_mat_bat_ky
    PORT=5001
    ```

### Bước 3: Chạy ứng dụng
Tại thư mục gốc, chạy lệnh:
```bash
npm run dev
```
*Lệnh này sẽ khởi động đồng thời:*
*   **Backend**: Chạy tại `http://localhost:5001`
*   **Frontend**: Chạy tại `http://localhost:5173` (Tự động mở trình duyệt)

## 📁 Cấu trúc thư mục (src)

Dự án được phân chia thành hai phần chính, mỗi phần có cấu trúc `src` chuyên biệt:

### 🔹 Frontend (`frontend/src`)
Cấu trúc React được tổ chức theo module:
*   `assets/`: Chứa hình ảnh, icons, font và các file tĩnh.
*   `components/`: Các thành phần giao diện dùng chung (Common UI, Layout, Form components).
    *   `auth/`: Xử lý Đăng nhập, Đăng ký, Quên mật khẩu.
    *   `layout/`: Chứa Header, Sidebar, Footer, MainLayout.
    *   `submit/`: Các component phục vụ nộp hồ sơ (MemberTable, FileAttachment).
*   `context/`: Quản lý trạng thái toàn cục (ví dụ: `AuthContext` cho thông tin đăng nhập).
*   `pages/`: Chứa các trang chính của ứng dụng (Home, Search, Profile, Submit, ViewDetail).
*   `services/`: Chứa cấu hình Axios (`api.ts`) và các hàm gọi API theo từng module.

### 🔸 Backend (`backend/src`)
Cấu trúc Node.js theo mô hình Controller-Route-Service:
*   `config/`: Cấu hình kết nối cơ sở dữ liệu SQL Server.
*   `controllers/`: Xử lý logic nghiệp vụ chính (Logic đăng nhập, tìm kiếm, lưu hồ sơ).
*   `middlewares/`: Các bộ lọc trung gian (ví dụ: Kiểm tra Token hợp lệ trước khi vào Route).
*   `models/`: (Nếu có) Định nghĩa cấu trúc dữ liệu hoặc các truy vấn SQL thô.
*   `routes/`: Định nghĩa các đường dẫn API (Endpoints) cho ứng dụng.
*   `server.js`: File chạy chính, khởi tạo Server và kết nối DB.

## 💡 Lưu ý
*   Nếu gặp lỗi cổng 5001 đã bị chiếm dụng, hãy đổi `PORT` trong file `.env` của backend.
*   Mọi tệp tin đính kèm khi sinh viên nộp bài sẽ được lưu trữ tại `backend/uploads/`.

---
*Chúc bạn có trải nghiệm tốt với hệ thống!*
