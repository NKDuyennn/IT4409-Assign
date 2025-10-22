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
    
    // Hàm toggle (ẩn/hiện) form thêm sản phẩm
    function toggleAddProductForm() {
        // Sử dụng classList.toggle để thêm/xóa class 'hidden'
        addProductForm.classList.toggle('hidden');
        
        // Xóa thông báo lỗi (nếu có) khi mở/đóng form
        const errorMsg = document.getElementById('errorMsg');
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
        document.getElementById('errorMsg').textContent = '';
    });
    
});