# Frontend Styling Guidelines

Khi triển khai các trang (pages) hoặc thành phần (components) mới từ thiết kế Figma cho dự án này, vui lòng tuân thủ nghiêm ngặt các quy tắc sau để đảm bảo độ chính xác (pixel-perfect) và tính nhất quán:

## 1. Không hardcode kích thước Layout (Width / Height)
- Tuyệt đối **không** sử dụng các giá trị kích thước cố định bằng pixel cho các container layout chính (ví dụ: `w-[1440px]`, `w-[500px]`, `h-[788px]`).
- Thay vào đó, hãy sử dụng các class đáp ứng (responsive) linh hoạt như: `w-full`, `max-w-md`, `max-w-[500px]`, `min-h-screen`, `h-full`.
- Khuyến khích sử dụng padding và margin để tạo không gian thay vì fix cứng height.

## 2. Xử lý chính xác Kích thước Component Đồ họa (Icons / Logos)
- Khác với layout, đối với các thành phần đồ họa cụ thể như Icons, Logos, hoặc các khối trang trí (Avatar ring, Custom Icon box), **BẮT BUỘC phải fix cứng cả width và height** bằng pixel (ví dụ: `w-[112px] h-[36px]`, `w-[88px] h-[88px]`) đúng từng pixel theo spec của Figma.
- Điều này giúp icon không bị méo, co giãn sai lệch tỉ lệ khi layout bên ngoài thay đổi.

## 3. Sử dụng Design Tokens (CSS Variables)
- **Không** sử dụng mã màu HEX hoặc kích thước font tùy tiện (vd: `#1E2125`, `text-[24px]`).
- Phải ánh xạ (map) các style từ Figma sang các biến CSS đã được định nghĩa trong `src/styles/global.css`.
- **Màu sắc (Colors):**
  - Sử dụng các biến màu như `var(--color-primary-900)`, `var(--color-grey-500)`, `var(--color-white-100)`, v.v.
  - Cú pháp Tailwind: `bg-[var(--color-primary-900)]`, `text-[var(--color-grey-400)]`.
- **Typography (Font & Text):**
  - Sử dụng các biến kích thước font và line-height theo chuẩn (H1 - H5, S1 - S2, B1 - B4, C1 - C3).
  - Ví dụ thay vì `text-[24px] leading-[28px]`, bắt buộc dùng: `text-[length:var(--font-h5-size)] leading-[var(--font-h5-line-height)]`.
  - Tuân thủ trọng số font (font-weight) từ thiết kế (400, 500, 600, 700).

## 4. Cẩn trọng với Code Generate từ Figma (Trực quan > Code Generate)
- **Tuyệt đối không tin tưởng 100% vào mã CSS/Tailwind do Figma Dev Mode tự sinh ra.** Figma thường xuất sai hoặc thiếu sót với các hiệu ứng phức tạp (như Gradient Borders, Shadows nhiều lớp, Masking).
- **Phải luôn đối chiếu với hình ảnh/screenshot thực tế:** Nếu thiết kế trên hình là dải màu (gradient) nhưng code xuất ra chỉ là 1 màu solid (vd: `border-[#fd1ce3]`), bạn phải tự viết lại gradient CSS chính xác theo hình ảnh trực quan.

## 5. Xử lý Gradient Border trên nền Trong suốt (Transparent Backgrounds)
Khi gặp thiết kế có viền là dải màu (gradient border) bao quanh một thành phần có nền bán trong suốt (semi-transparent) hoặc trong suốt:
- **KHÔNG dùng kĩ thuật `background-clip: padding-box, border-box`:** Kĩ thuật này sẽ khiến dải màu viền bị rò rỉ (bleed-through) và hiển thị lấp đầy toàn bộ phần nền trong suốt bên trong.
- **BẮT BUỘC dùng kĩ thuật CSS Masking (Mặt nạ):**
  - Tạo một thẻ `div` bọc ngoài hoặc dùng `absolute inset-0` với `pointer-events-none`.
  - Gán độ dày viền bằng `padding` (ví dụ: `padding: '1px'`).
  - Gán `background` là dải màu gradient của viền.
  - Sử dụng kĩ thuật mask khoét rỗng ruột:
    ```css
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude'
    ```

## 6. Form và Layout Cơ bản
- **Form Components:** Chuẩn hóa style của input, button (padding, border radius, outline/ring khi focus) theo thiết kế chung. Nút bấm thường có chiều cao cố định (vd `h-12`), bo góc `rounded-lg`.
- **Bố cục (Layout):** Tận dụng tối đa Flexbox (`flex`, `items-center`, `justify-between`, `gap-*`) để canh chỉnh giống hệ thống Auto Layout trong Figma.

## 7. Quản lý Icon (SVG vs Icon Libraries)
- **Ưu tiên thư viện Icon có sẵn:** Tuyệt đối hạn chế việc copy/paste mã raw `<svg>` trực tiếp từ Figma vào source code (ví dụ các icon phổ thông như con mắt, nút check) vì điều này khiến code trở nên rất dài dòng và khó đọc. Hãy tìm các icon tương đương trong các thư viện đã được cài đặt của dự án (ví dụ: `@heroicons/react`, `@ant-design/icons`) và sử dụng Component từ thư viện.
- **Tách file cho Custom Icon:** Trong trường hợp icon là thiết kế tùy chỉnh đặc thù (custom icon) không có trong thư viện, **không** viết trực tiếp mã SVG vào file code chính. Hãy download nó về dưới dạng `.svg` từ Figma, lưu vào thư mục assets (vd: `public/assets` hoặc thư mục icon riêng), sau đó import vào để dùng.

## 8. Tương tác Người dùng (Interactions & Cursors)
- **Cursor Pointer:** Tất cả các phần tử có thể click được (Buttons, Links, Checkboxes, Icons có chức năng click như Show/Hide password) **bắt buộc** phải thêm CSS `cursor: pointer` (sử dụng class `cursor-pointer` của Tailwind) để đổi con trỏ chuột thành hình bàn tay khi hover. Tailwind có thể đã reset styles mặc định của button/link, nên phải chủ động thêm để đảm bảo UX.

## 9. Tái sử dụng Component dùng chung (Common UI Components)
- **Ưu tiên Common Component:** Thay vì sử dụng các thẻ HTML thô sơ (`<input>`, `<button>`, v.v), **bắt buộc** phải sử dụng các UI components dùng chung đã được xây dựng sẵn trong hệ thống (ví dụ: `ButtonCommon`, `InputCommon` tại `src/presentation/components/ui/`). Việc này giúp đảm bảo tính nhất quán về UI và hành vi trên toàn dự án.
- **Tùy biến Style:** Khi sử dụng các Component dùng chung này, bạn vẫn có thể truyền `className` Tailwind (có thể kết hợp với `!` important nếu cần) để override form gốc hoặc cấu trúc bao ngoài nhằm match 100% với Figma.

## 10. Kiến trúc Component & Tách File (Containers Pattern)
- **Tuyệt đối không viết logic/UI trực tiếp vào file Page:** Đối với các file đóng vai trò là Trang chính (như `src/presentation/features/.../index.tsx`, `login.tsx`, `register.tsx`), bạn **không được** dồn toàn bộ UI và logic vào đó. File Page chỉ nên đóng vai trò dàn trang (layout) và điều hướng (orchestrator). Nó phải thật ngắn gọn và sạch sẽ.
- **Sử dụng thư mục Containers:** Bắt buộc phải bóc tách khối giao diện/logic chính ra thành các Component độc lập và đặt vào thư mục `containers/` bên trong module tương ứng (ví dụ: `src/presentation/features/auth/containers/LoginForm.tsx`). Sau đó, file Page chỉ việc import Container này vào để sử dụng.
- **Kiểm tra tái sử dụng:** Trước khi tạo một Container mới hay viết lại UI, luôn nhớ kiểm tra xem component/logic đó đã tồn tại ở `src/presentation/components` hoặc các `containers` dùng chung chưa. Nếu có thì bắt buộc kế thừa.
- **Giới hạn 500-600 dòng:** Dù là file Container hay file nào khác, tuyệt đối không được phép vượt quá 500-600 dòng. Nếu quá dài, tiếp tục chia nhỏ.

## 11. Xử lý Form và Data Binding
- **Bắt buộc dùng `<Form>` của Ant Design:** Tuyệt đối không sử dụng thẻ `<form>` thuần của HTML và không dùng `useState` thủ công để quản lý từng trường dữ liệu (field) lẻ tẻ. 
- **Cách áp dụng:** Mọi Form nhập liệu đều phải sử dụng component `<Form>` và `<Form.Item>` của `antd`. Kết hợp với `Form.useForm()` để quản lý form instance và lấy dữ liệu tập trung thông qua sự kiện `onFinish(values)`. Điều này giúp chuẩn hóa validation, quản lý state tự động và giữ cấu trúc code sạch sẽ.

## 12. Tùy biến Giao diện Component Ant Design (Theming)
- **Sử dụng ConfigProvider (Theme-Provider):** Tuyệt đối không dùng các class tiện ích của Tailwind (ví dụ: `!border-[màu]`, `!ring-4`) để ép cứng các trạng thái mặc định như hover, focus hay error của các component Ant Design (Input, Select, v.v). Việc hardcode Tailwind sẽ phá vỡ cơ chế báo lỗi native của Ant Design (như viền không chuyển sang màu đỏ khi validate lỗi).
- **Cách áp dụng:** Mọi tùy biến màu sắc, kích thước, bo góc, viền (border), độ phủ bóng (box-shadow) của component Ant Design **phải được khai báo qua Global Token hoặc Component Token** bên trong file `src/presentation/provider/theme/theme-provider.tsx`. 
- **Ví dụ:** Muốn đổi màu focus của Input sang xanh dương, hãy cấu hình `colorPrimary: '#0095FF'` trong `components.Input` của ConfigProvider. Nhờ đó, các trạng thái validation error (màu đỏ) vẫn sẽ tự động hoạt động hoàn hảo theo đúng chuẩn của hệ thống.

## 13. State Management (Quản lý Trạng thái)
Phân tách rõ ràng 3 loại State trong ứng dụng để tránh lạm dụng và gây phình code:
- **Zustand (Global Client State):** **Chỉ dùng** cho các trạng thái cần chia sẻ toàn cục và thay đổi đồng bộ trên UI. Ví dụ: Trạng thái đăng nhập (Auth state), Đóng/Mở Sidebar, Cấu hình Theme (Dark/Light). Không cần dùng thẻ `<Provider>`. Sử dụng Selector `const user = useAuthStore(s => s.user)` để tối ưu render.
- **Tanstack Query (Server State):** **Tuyệt đối không** dùng Zustand để lưu trữ dữ liệu từ API trả về (list user, list product). Mọi việc lấy, cache, và đồng bộ dữ liệu từ Server phải do React Query đảm nhận (`useQuery`, `useMutation`).
- **Local State & URL State:** Dữ liệu Form thì để Ant Design (`Form.useForm`) tự xử lý. Các state chỉ dùng trong 1 trang (đóng mở 1 popup cục bộ) thì dùng `useState`. Trạng thái Tab, Phân trang, Search Filter bắt buộc lưu lên **URL Params** (thông qua `@tanstack/react-router`) để dễ dàng chia sẻ Link.
- **React Context:** Hạn chế tối đa sử dụng Context, trừ khi viết thư viện hoặc các UI Theme Provider không bao giờ thay đổi, vì Context dễ gây ra tình trạng Re-render dây chuyền (Waterfall re-renders).
