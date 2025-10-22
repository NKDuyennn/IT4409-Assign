// Chờ DOM load hoàn tất trước khi chạy JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== PHẦN 0: KHỞI TẠO VÀ LOAD DỮ LIỆU TỪ LOCALSTORAGE =====
    
    // Hàm khởi tạo dữ liệu sản phẩm mẫu ban đầu
    function initializeDefaultProducts() {
        const defaultProducts = [
            {
                name: 'One Piece Vol.1',
                price: 150000,
                desc: 'Join Monkey D. Luffy on his epic adventure to become the Pirate King! This legendary series begins here.',
                imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/91NxYvUNf6L.jpg'
            },
            {
                name: 'Naruto Vol.1',
                price: 120000,
                desc: 'Follow Naruto Uzumaki\'s journey from outcast to hero in this action-packed ninja adventure.',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/vi/c/c7/Naruto_Volume_1_manga_cover.jpg'
            },
            {
                name: 'Attack on Titan Vol.1',
                price: 180000,
                desc: 'Humanity\'s last stand against the Titans begins. A dark fantasy masterpiece that will keep you on edge.',
                imageUrl: 'https://m.media-amazon.com/images/I/81qPzeEO5IL._AC_UF1000,1000_QL80_.jpg'
            },
            {
                name: 'Spy X Family Vol.1',
                price: 200000,
                desc: 'Join the Forgers — a spy, an assassin, and a telepath — on a secret mission that becomes a real family adventure!',
                imageUrl: 'https://m.media-amazon.com/images/I/71vMGRog+iL._AC_UF1000,1000_QL80_.jpg'
            },
            {
                name: 'Dr. Stone Vol.1',
                price: 199000,
                desc: 'In a world where humanity has been petrified, follow Senku as he rebuilds civilization with the power of science!',
                imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/91SLpHwjp8L.jpg'
            },
            {
                name: 'Kimetsu no Yaiba Vol.1',
                price: 98000,
                desc: 'Follow Tanjiro Kamado\'s journey as he battles demons and seeks a cure for his sister Nezuko in this breathtaking tale.',
                imageUrl: 'https://cdn1.fahasa.com/media/flashmagazine/images/page_images/thanh_guom_diet_quy___kimetsu_no_yaiba___tap_1_tan_khoc_tai_ban/2024_04_06_08_45_15_1-390x510.jpg'
            }
        ];
        
        // Lưu dữ liệu mặc định vào localStorage
        localStorage.setItem('products', JSON.stringify(defaultProducts));
        return defaultProducts;
    }
    
    // Hàm load dữ liệu sản phẩm từ localStorage
    function loadProductsFromStorage() {
        // Lấy dữ liệu từ localStorage
        const storedProducts = localStorage.getItem('products');
        
        // Nếu chưa có dữ liệu, khởi tạo dữ liệu mặc định
        if (!storedProducts) {
            return initializeDefaultProducts();
        }
        
        // Parse JSON string thành mảng JavaScript
        try {
            return JSON.parse(storedProducts);
        } catch (error) {
            // Nếu có lỗi khi parse, khởi tạo lại dữ liệu mặc định
            console.error('Error parsing localStorage data:', error);
            return initializeDefaultProducts();
        }
    }
    
    // Hàm lưu dữ liệu sản phẩm vào localStorage
    function saveProductsToStorage(products) {
        // Chuyển mảng JavaScript thành JSON string và lưu vào localStorage
        localStorage.setItem('products', JSON.stringify(products));
    }
    
    // Hàm tạo HTML element cho một sản phẩm
    function createProductElement(product) {
        // Tạo thẻ article cho sản phẩm
        const productItem = document.createElement('article');
        productItem.className = 'product-item';
        
        // Tạo nội dung HTML cho sản phẩm
        productItem.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" width="200" height="300">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <p class="product-price">Price: ${product.price.toLocaleString('vi-VN')}₫</p>
        `;
        
        return productItem;
    }
    
    // Hàm render tất cả sản phẩm lên giao diện
    function renderProducts(products) {
        const productListSection = document.getElementById('product-list');
        
        // Xóa tất cả sản phẩm hiện tại (giữ lại tiêu đề h2)
        const heading = productListSection.querySelector('h2');
        productListSection.innerHTML = '';
        productListSection.appendChild(heading);
        
        // Render từng sản phẩm
        products.forEach(function(product) {
            const productElement = createProductElement(product);
            productListSection.appendChild(productElement);
        });
    }
    
    // Load và hiển thị sản phẩm khi trang được tải
    let productsData = loadProductsFromStorage();
    renderProducts(productsData);
    
    
    // ===== PHẦN 1: XỬ LÝ TÌM KIẾM SẢN PHẨM =====
    
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    function searchProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const productItems = document.querySelectorAll('.product-item');
        
        productItems.forEach(function(item) {
            const productName = item.querySelector('.product-name').textContent.toLowerCase();
            
            if (productName.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    searchBtn.addEventListener('click', searchProducts);
    
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchProducts();
        }
    });
    
    
    // ===== PHẦN 2: XỬ LÝ ẨN/HIỆN FORM THÊM SẢN PHẨM =====
    
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const errorMsg = document.getElementById('errorMsg');
    
    function toggleAddProductForm() {
        addProductForm.classList.toggle('hidden');
        errorMsg.textContent = '';
    }
    
    addProductBtn.addEventListener('click', toggleAddProductForm);
    
    cancelBtn.addEventListener('click', function() {
        addProductForm.classList.add('hidden');
        addProductForm.reset();
        errorMsg.textContent = '';
    });
    
    
    // ===== PHẦN 3: XỬ LÝ THÊM SẢN PHẨM MỚI VÀ LƯU VÀO LOCALSTORAGE =====
    
    const productListSection = document.getElementById('product-list');
    
    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Lấy giá trị từ form
        const name = document.getElementById('newName').value.trim();
        const price = document.getElementById('newPrice').value.trim();
        const desc = document.getElementById('newDesc').value.trim();
        const imageUrl = document.getElementById('newImage').value.trim();
        
        // Validation
        if (name === '') {
            errorMsg.textContent = 'Please enter product name!';
            return;
        }
        
        if (price === '') {
            errorMsg.textContent = 'Please enter product price!';
            return;
        }
        
        const priceNumber = Number(price);
        
        if (isNaN(priceNumber)) {
            errorMsg.textContent = 'Price must be a valid number!';
            return;
        }
        
        if (priceNumber <= 0) {
            errorMsg.textContent = 'Price must be greater than 0!';
            return;
        }
        
        if (desc.length > 0 && desc.length < 10) {
            errorMsg.textContent = 'Description must be at least 10 characters long!';
            return;
        }
        
        errorMsg.textContent = '';
        
        // ===== TẠO ĐỐI TƯỢNG SẢN PHẨM MỚI =====
        
        const finalImageUrl = imageUrl !== '' 
            ? imageUrl 
            : 'https://via.placeholder.com/200x300/FFA07A/FFFFFF?text=' + encodeURIComponent(name);
        
        const displayDesc = desc !== '' 
            ? desc 
            : 'No description available for this product.';
        
        // Tạo object sản phẩm mới
        const newProduct = {
            name: name,
            price: priceNumber,
            desc: displayDesc,
            imageUrl: finalImageUrl
        };
        
        // ===== THÊM SẢN PHẨM VÀO MẢNG VÀ LƯU VÀO LOCALSTORAGE =====
        
        // Thêm sản phẩm mới vào đầu mảng
        productsData.unshift(newProduct);
        
        // Lưu mảng đã cập nhật vào localStorage
        saveProductsToStorage(productsData);
        
        // ===== CẬP NHẬT GIAO DIỆN =====
        
        // Tạo element HTML cho sản phẩm mới
        const newItem = createProductElement(newProduct);
        newItem.classList.add('new-product');
        
        // Chèn vào giao diện
        const heading = productListSection.querySelector('h2');
        heading.insertAdjacentElement('afterend', newItem);
        
        // Hiển thị thông báo thành công
        const successNotification = document.createElement('div');
        successNotification.className = 'success-notification';
        successNotification.textContent = `Product "${name}" has been successfully added and saved!`;
        
        addProductForm.insertAdjacentElement('afterbegin', successNotification);
        
        setTimeout(function() {
            successNotification.remove();
        }, 3000);
        
        // Reset và đóng form
        addProductForm.reset();
        
        setTimeout(function() {
            addProductForm.classList.add('hidden');
        }, 1500);
        
        // Reset tìm kiếm và hiển thị tất cả sản phẩm
        searchInput.value = '';
        const allProducts = document.querySelectorAll('.product-item');
        allProducts.forEach(function(item) {
            item.style.display = '';
        });
        
        productListSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    
    // ===== PHẦN 4: THÊM CHỨC NĂNG XÓA TẤT CẢ DỮ LIỆU (BONUS) =====
    
    // Thêm nút reset để xóa localStorage (cho mục đích testing)
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset All Data';
    resetBtn.style.cssText = 'background-color: #e74c3c; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;';
    
    // Thêm nút vào phần tìm kiếm
    const searchSection = document.querySelector('section');
    const searchDiv = searchSection.querySelector('div');
    searchDiv.appendChild(resetBtn);
    
    // Xử lý sự kiện click nút reset
    resetBtn.addEventListener('click', function() {
        // Xác nhận trước khi xóa
        const confirm = window.confirm('Are you sure you want to reset all data? This will remove all products and restore default products.');
        
        if (confirm) {
            // Xóa dữ liệu trong localStorage
            localStorage.removeItem('products');
            
            // Khởi tạo lại dữ liệu mặc định
            productsData = initializeDefaultProducts();
            
            // Render lại giao diện
            renderProducts(productsData);
            
            // Hiển thị thông báo
            alert('All data has been reset to default!');
        }
    });
    
    
    // ===== PHẦN 5: XỬ LÝ FORM LIÊN HỆ =====
    
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const message = document.getElementById('userMessage').value;
        
        alert(`Thank you for contacting us, ${name}!\n\nWe have received your message and will respond to ${email} as soon as possible.\n\nYour message:\n"${message}"`);
        
        contactForm.reset();
    });
    
    // Log thông tin để debug
    console.log('Products loaded from localStorage:', productsData);
    console.log('Total products:', productsData.length);
    
});