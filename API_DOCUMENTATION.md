# API Documentation - NCKH Management System

This document describes all the APIs available in the NCKH Management System.

---

## 1. Authentication (Xác thực)

### 1.1 Sign In (Đăng nhập)
- **URL**: `/api/auth/signin`
- **Method**: `POST`
- **Purpose**: Đăng nhập vào hệ thống. Trả về `accessToken` và lưu `refreshToken` vào cookie.
- **Request Body**:
  ```json
  { "msv": "21110123", "password": "password123" }
  ```
- **Response**:
  ```json
  { "message": "...", "accessToken": "..." }
  ```

### 1.2 Sign Out (Đăng xuất)
- **URL**: `/api/auth/signout`
- **Method**: `POST`
- **Purpose**: Đăng xuất, xóa refresh token trong DB và xóa cookie.
- **Response**: `204 No Content`

### 1.3 Forgot Password (Quên mật khẩu)
- **URL**: `/api/auth/forgot-password`
- **Method**: `POST`
- **Purpose**: Yêu cầu cấp lại mật khẩu qua email.
- **Request Body**:
  ```json
  { "msv": "21110123", "email": "sv@neu.edu.vn" }
  ```

### 1.4 Change Password (Đổi mật khẩu)
- **URL**: `/api/auth/change-password`
- **Method**: `POST`
- **Authorization**: Bearer Token
- **Request Body**:
  ```json
  { "oldPassword": "...", "newPassword": "...", "otp": "123456" }
  ```

---

## 2. User Profile (Hồ sơ người dùng)

### 2.1 Get Profile (Lấy thông tin cá nhân)
- **URL**: `/api/users/profile`
- **Method**: `GET`
- **Authorization**: Bearer Token

### 2.2 Update Profile (Cập nhật thông tin)
- **URL**: `/api/users/profile`
- **Method**: `PUT`
- **Authorization**: Bearer Token

### 2.3 Auth Me (Kiểm tra phiên đăng nhập)
- **URL**: `/api/users/me`
- **Method**: `GET`
- **Authorization**: Bearer Token


---

## 3. Search & Research (Tìm kiếm & Công trình)

### 3.1 Advanced Search (Tìm kiếm nâng cao)
- **URL**: `/api/search/search`
- **Method**: `GET`

### 3.2 View Detail (Xem chi tiết)
- **URL**: `/api/search/viewdetail/:id`
- **Method**: `GET`

### 3.3 Read PDF (Đọc nội dung)
- **URL**: `/api/search/read/:id`
- **Method**: `GET`

---

## 4. Favourite (Yêu thích)

### 4.1 Toggle Favourite (Thêm/Xóa yêu thích)
- **URL**: `/api/favourite/toggle`
- **Method**: `POST`
- **Authorization**: Bearer Token

### 4.2 Get Favourite List (Danh sách yêu thích)
- **URL**: `/api/favourite/list`
- **Method**: `GET`

### 4.3 Add/Remove Favourite (Legacy)
- **URL**: `/api/favourite/:id`
- **Method**: `POST` (Add) / `DELETE` (Remove)
- **Authorization**: Bearer Token

---

## 5. Submission (Nộp đề tài)

### 5.1 Submit Project (Nộp chính thức)
- **URL**: `/api/submission/submit`
- **Method**: `POST`
- **Authorization**: Bearer Token
- **Header**: `Content-Type: multipart/form-data`
- **Body**: `title`, `field`, `mentor`, `members` (JSON), `file` (PDF).

### 5.2 Get Submission Status (Trạng thái nộp bài)
- **URL**: `/api/submission/status`
- **Method**: `GET`
- **Authorization**: Bearer Token
- **Purpose**: Kiểm tra xem sinh viên đã nộp bài chưa và lấy thông tin bài đã nộp.


