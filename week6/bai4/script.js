// Chờ DOM load hoàn tất trước khi chạy JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== PHẦN 1: XỬ LÝ TÌM KIẾM SẢN PHẨM =====
    
    // Lấy các phần tử cần thiết cho chức năng tìm kiếm
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    // Hàm thực hiện tìm kiếm sản phẩm
    function searchProducts() {
        // Lấy giá trị tìm kiếm và chuyển về chữ thường để so sánh không phân biệt hoa thường
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // Lấy tất cả các sản phẩm hiện có trên trang
        // Mỗi lần tìm kiếm đều gọi lại querySelectorAll để bao gồm cả sản phẩm mới
        const productItems = document.querySelectorAll('.product-item');
        
        // Duyệt qua từng sản phẩm để kiểm tra
        productItems.forEach(function(item) {
            // Lấy tên sản phẩm từ thẻ h3 bên trong
            const productName = item.querySelector('.product-name').textContent.toLowerCase();
            
            // Kiểm tra xem tên sản phẩm có chứa từ khóa tìm kiếm không
            if (productName.includes(searchTerm)) {
                // Nếu có, hiển thị sản phẩm
                item.style.display = '';
            } else {
                // Nếu không, ẩn sản phẩm
                item.style.display = 'none';
            }
        });
    }
    
    // Gắn sự kiện click cho nút tìm kiếm
    searchBtn.addEventListener('click', searchProducts);
    
    // Gắn sự kiện keyup cho ô input (tìm kiếm khi nhấn Enter)
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchProducts();
        }
    });
    
    
    // ===== PHẦN 2: XỬ LÝ ẨN/HIỆN FORM THÊM SẢN PHẨM =====
    
    // Lấy các phần tử cần thiết cho chức năng thêm sản phẩm
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const errorMsg = document.getElementById('errorMsg');
    
    // Hàm toggle (ẩn/hiện) form thêm sản phẩm
    function toggleAddProductForm() {
        // Sử dụng classList.toggle để thêm/xóa class 'hidden'
        addProductForm.classList.toggle('hidden');
        
        // Xóa thông báo lỗi (nếu có) khi mở/đóng form
        errorMsg.textContent = '';
    }
    
    // Gắn sự kiện click cho nút "Add New Product"
    addProductBtn.addEventListener('click', toggleAddProductForm);
    
    // Gắn sự kiện click cho nút "Cancel" trong form
    cancelBtn.addEventListener('click', function() {
        // Đóng form
        addProductForm.classList.add('hidden');
        // Reset form về trạng thái ban đầu
        addProductForm.reset();
        // Xóa thông báo lỗi
        errorMsg.textContent = '';
    });
    
    
    // ===== PHẦN 3: XỬ LÝ THÊM SẢN PHẨM MỚI =====
    
    // Lấy phần tử section chứa danh sách sản phẩm
    const productListSection = document.getElementById('product-list');
    
    // Gắn sự kiện submit cho form thêm sản phẩm
    addProductForm.addEventListener('submit', function(event) {
        // Ngăn chặn hành vi mặc định của form (không reload trang)
        event.preventDefault();
        
        // ===== BƯỚC 1: LẤY GIÁ TRỊ TỪ CÁC TRƯỜNG INPUT =====
        
        // Lấy giá trị từ các trường input và loại bỏ khoảng trắng thừa
        const name = document.getElementById('newName').value.trim();
        const price = document.getElementById('newPrice').value.trim();
        const desc = document.getElementById('newDesc').value.trim();
        const imageUrl = document.getElementById('newImage').value.trim();
        
        
        // ===== BƯỚC 2: VALIDATION - KIỂM TRA DỮ LIỆU ĐẦU VÀO =====
        
        // Kiểm tra tên sản phẩm không được rỗng
        if (name === '') {
            errorMsg.textContent = 'Please enter product name!';
            return; // Dừng thực hiện nếu validation fail
        }
        
        // Kiểm tra giá không được rỗng
        if (price === '') {
            errorMsg.textContent = 'Please enter product price!';
            return; // Dừng thực hiện nếu validation fail
        }
        
        // Chuyển đổi giá sang kiểu số để kiểm tra
        const priceNumber = Number(price);
        
        // Kiểm tra giá phải là số hợp lệ
        if (isNaN(priceNumber)) {
            errorMsg.textContent = 'Price must be a valid number!';
            return; // Dừng thực hiện nếu validation fail
        }
        
        // Kiểm tra giá phải lớn hơn 0
        if (priceNumber <= 0) {
            errorMsg.textContent = 'Price must be greater than 0!';
            return; // Dừng thực hiện nếu validation fail
        }
        
        // Kiểm tra mô tả không quá ngắn nếu người dùng có nhập
        // Mô tả là optional, nhưng nếu có thì phải ít nhất 10 ký tự
        if (desc.length > 0 && desc.length < 10) {
            errorMsg.textContent = 'Description must be at least 10 characters long!';
            return; // Dừng thực hiện nếu validation fail
        }
        
        // Nếu tất cả validation đều pass, xóa thông báo lỗi
        errorMsg.textContent = '';
        
        
        // ===== BƯỚC 3: TẠO PHẦN TỬ SẢN PHẨM MỚI =====
        
        // Tạo thẻ article mới cho sản phẩm
        const newItem = document.createElement('article');
        newItem.className = 'product-item new-product'; // Thêm class để styling
        
        // Xác định URL hình ảnh
        // Nếu người dùng không nhập URL, sử dụng placeholder với tên sản phẩm
        const finalImageUrl = imageUrl !== '' 
            ? imageUrl 
            : 'https://via.placeholder.com/200x300/FFA07A/FFFFFF?text=' + encodeURIComponent(name);
        
        // Xác định mô tả hiển thị
        // Nếu không có mô tả, hiển thị text mặc định
        const displayDesc = desc !== '' 
            ? desc 
            : 'No description available for this product.';
        
        // Tạo nội dung HTML cho sản phẩm mới sử dụng template string
        // Sử dụng innerHTML để tạo nhanh cấu trúc HTML
        newItem.innerHTML = `
            <img src="${finalImageUrl}" alt="${name}" width="200" height="300">
            <h3 class="product-name">${name}</h3>
            <p class="product-desc">${displayDesc}</p>
            <p class="product-price">Price: ${priceNumber.toLocaleString('vi-VN')}₫</p>
        `;
        
        
        // ===== BƯỚC 4: CHÈN SẢN PHẨM MỚI VÀO DANH SÁCH =====
        
        // Lấy thẻ h2 trong section product-list (tiêu đề "Featured Comics")
        const heading = productListSection.querySelector('h2');
        
        // Chèn sản phẩm mới ngay sau thẻ h2 (đầu danh sách)
        // Sử dụng insertAdjacentElement để chèn vào vị trí mong muốn
        heading.insertAdjacentElement('afterend', newItem);
        
        
        // ===== BƯỚC 5: HIỂN THỊ THÔNG BÁO THÀNH CÔNG =====
        
        // Tạo phần tử div để hiển thị thông báo thành công
        const successNotification = document.createElement('div');
        successNotification.className = 'success-notification';
        successNotification.textContent = `Product "${name}" has been successfully added to the list!`;
        
        // Thêm thông báo vào đầu form
        addProductForm.insertAdjacentElement('afterbegin', successNotification);
        
        // Tự động xóa thông báo sau 3 giây
        setTimeout(function() {
            successNotification.remove();
        }, 3000);
        
        
        // ===== BƯỚC 6: RESET VÀ ĐÓNG FORM =====
        
        // Reset form về trạng thái ban đầu (xóa tất cả giá trị đã nhập)
        addProductForm.reset();
        
        // Đóng form sau 1.5 giây để người dùng có thời gian xem thông báo
        setTimeout(function() {
            addProductForm.classList.add('hidden');
        }, 1500);
        
        
        // ===== BƯỚC 7: ĐẢM BẢO TÍNH NĂNG TÌM KIẾM HOẠT ĐỘNG VỚI SẢN PHẨM MỚI =====
        
        // Xóa nội dung ô tìm kiếm
        searchInput.value = '';
        
        // Hiển thị lại tất cả sản phẩm (bao gồm cả sản phẩm mới)
        // Gọi lại querySelectorAll để lấy cả sản phẩm mới vừa thêm
        const allProducts = document.querySelectorAll('.product-item');
        allProducts.forEach(function(item) {
            item.style.display = ''; // Hiển thị tất cả sản phẩm
        });
        
        // Scroll trang lên để người dùng thấy sản phẩm mới được thêm
        productListSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    }); // Kết thúc sự kiện submit form
    
    
    // ===== PHẦN 4: XỬ LÝ FORM LIÊN HỆ (BONUS) =====
    
    const contactForm = document.getElementById('contactForm');
    
    // Gắn sự kiện submit cho form liên hệ
    contactForm.addEventListener('submit', function(event) {
        // Ngăn chặn hành vi mặc định
        event.preventDefault();
        
        // Lấy thông tin từ form
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const message = document.getElementById('userMessage').value;
        
        // Hiển thị thông báo thành công
        // Trong thực tế, dữ liệu này sẽ được gửi đến server
        alert(`Thank you for contacting us, ${name}!\n\nWe have received your message and will respond to ${email} as soon as possible.\n\nYour message:\n"${message}"`);
        
        // Reset form sau khi gửi
        contactForm.reset();
    });
    
}); // Kết thúc DOMContentLoaded