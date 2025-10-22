// Chờ DOM load hoàn tất trước khi chạy JavaScript
document.addEventListener('DOMContentLoaded', async function() {
    
    // ===== PHẦN 0: KHỞI TẠO VÀ LOAD DỮ LIỆU =====
    
    let productsData = [];
    let currentFilter = 'all'; // Bộ lọc hiện tại: 'all', 'low', 'medium', 'high'
    let currentSort = 'default'; // Sắp xếp hiện tại: 'default', 'name-asc', 'name-desc', 'price-asc', 'price-desc'
    
    // Hàm khởi tạo dữ liệu mặc định
    function initializeDefaultProducts() {
        return [
            {
                id: 1,
                name: 'One Piece Vol.1',
                price: 150000,
                desc: 'Join Monkey D. Luffy on his epic adventure to become the Pirate King! This legendary series begins here.',
                imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/91NxYvUNf6L.jpg',
                category: 'action'
            },
            {
                id: 2,
                name: 'Naruto Vol.1',
                price: 120000,
                desc: 'Follow Naruto Uzumaki\'s journey from outcast to hero in this action-packed ninja adventure.',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/vi/c/c7/Naruto_Volume_1_manga_cover.jpg',
                category: 'action'
            },
            {
                id: 3,
                name: 'Attack on Titan Vol.1',
                price: 180000,
                desc: 'Humanity\'s last stand against the Titans begins. A dark fantasy masterpiece that will keep you on edge.',
                imageUrl: 'https://m.media-amazon.com/images/I/81qPzeEO5IL._AC_UF1000,1000_QL80_.jpg',
                category: 'fantasy'
            },
            {
                id: 4,
                name: 'Spy X Family Vol.1',
                price: 200000,
                desc: 'Join the Forgers — a spy, an assassin, and a telepath — on a secret mission that becomes a real family adventure!',
                imageUrl: 'https://m.media-amazon.com/images/I/71vMGRog+iL._AC_UF1000,1000_QL80_.jpg',
                category: 'comedy'
            },
            {
                id: 5,
                name: 'Dr. Stone Vol.1',
                price: 199000,
                desc: 'In a world where humanity has been petrified, follow Senku as he rebuilds civilization with the power of science!',
                imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/91SLpHwjp8L.jpg',
                category: 'scifi'
            },
            {
                id: 6,
                name: 'Kimetsu no Yaiba Vol.1',
                price: 98000,
                desc: 'Follow Tanjiro Kamado\'s journey as he battles demons and seeks a cure for his sister Nezuko in this breathtaking tale.',
                imageUrl: 'https://cdn1.fahasa.com/media/flashmagazine/images/page_images/thanh_guom_diet_quy___kimetsu_no_yaiba___tap_1_tan_khoc_tai_ban/2024_04_06_08_45_15_1-390x510.jpg',
                category: 'action'
            }
        ];
    }
    
    // Hàm load dữ liệu với async/await (giả lập fetch API)
    async function loadProducts() {
        // Hiển thị loading indicator
        showLoading();
        
        try {
            // Giả lập delay khi fetch dữ liệu từ server
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Lấy dữ liệu từ localStorage hoặc khởi tạo mặc định
            const storedProducts = localStorage.getItem('products');
            
            if (storedProducts) {
                productsData = JSON.parse(storedProducts);
            } else {
                productsData = initializeDefaultProducts();
                localStorage.setItem('products', JSON.stringify(productsData));
            }
            
            // Ẩn loading và hiển thị sản phẩm
            hideLoading();
            renderProducts(productsData);
            
        } catch (error) {
            // Xử lý lỗi nếu có
            hideLoading();
            console.error('Error loading products:', error);
            alert('Failed to load products. Please try again.');
        }
    }
    
    // Hàm hiển thị loading indicator
    function showLoading() {
        const productListSection = document.getElementById('product-list');
        const heading = productListSection.querySelector('h2');
        
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-indicator';
        loadingDiv.className = 'loading-indicator';
        loadingDiv.innerHTML = `
            <div class="spinner"></div>
            <p>Loading products...</p>
        `;
        
        heading.insertAdjacentElement('afterend', loadingDiv);
    }
    
    // Hàm ẩn loading indicator
    function hideLoading() {
        const loadingDiv = document.getElementById('loading-indicator');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }
    
    // Hàm tạo element HTML cho sản phẩm với nút xóa
    function createProductElement(product, index) {
        const productItem = document.createElement('article');
        productItem.className = 'product-item';
        productItem.setAttribute('data-id', product.id || index);
        productItem.setAttribute('data-category', product.category || 'other');
        
        productItem.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" width="200" height="300">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <p class="product-price">Price: ${product.price.toLocaleString('vi-VN')}₫</p>
            <div class="product-actions">
                <button class="btn-view" data-id="${product.id || index}">View Details</button>
                <button class="btn-delete" data-id="${product.id || index}">Delete</button>
            </div>
        `;
        
        return productItem;
    }
    
    // Hàm render sản phẩm
    function renderProducts(products) {
        const productListSection = document.getElementById('product-list');
        const heading = productListSection.querySelector('h2');
        
        // Xóa tất cả sản phẩm hiện tại
        productListSection.innerHTML = '';
        productListSection.appendChild(heading);
        
        // Kiểm tra nếu không có sản phẩm
        if (products.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'No products found.';
            productListSection.appendChild(emptyMessage);
            return;
        }
        
        // Render từng sản phẩm
        products.forEach(function(product, index) {
            const productElement = createProductElement(product, index);
            productListSection.appendChild(productElement);
        });
        
        // Gắn sự kiện cho các nút trong sản phẩm
        attachProductEventListeners();
    }
    
    // Hàm gắn sự kiện cho nút View và Delete
    function attachProductEventListeners() {
        // Sự kiện cho nút View Details
        const viewButtons = document.querySelectorAll('.btn-view');
        viewButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                showProductDetails(productId);
            });
        });
        
        // Sự kiện cho nút Delete
        const deleteButtons = document.querySelectorAll('.btn-delete');
        deleteButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                deleteProduct(productId);
            });
        });
    }
    
    // Hàm hiển thị chi tiết sản phẩm trong modal
    function showProductDetails(productId) {
        const product = productsData.find(p => (p.id || productsData.indexOf(p)).toString() === productId.toString());
        
        if (!product) return;
        
        // Tạo modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body">
                    <img src="${product.imageUrl}" alt="${product.name}" class="modal-image">
                    <div class="modal-info">
                        <h2>${product.name}</h2>
                        <p class="modal-price">Price: ${product.price.toLocaleString('vi-VN')}₫</p>
                        <p class="modal-category">Category: ${product.category || 'N/A'}</p>
                        <p class="modal-description">${product.desc}</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Hiệu ứng fade in
        setTimeout(() => modal.classList.add('show'), 10);
        
        // Sự kiện đóng modal
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            closeModal(modal);
        });
        
        // Đóng khi click bên ngoài modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }
    
    // Hàm đóng modal với hiệu ứng
    function closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
    
    // Hàm xóa sản phẩm
    async function deleteProduct(productId) {
        // Xác nhận trước khi xóa
        const confirm = window.confirm('Are you sure you want to delete this product?');
        
        if (!confirm) return;
        
        // Tìm index của sản phẩm
        const index = productsData.findIndex(p => (p.id || productsData.indexOf(p)).toString() === productId.toString());
        
        if (index === -1) return;
        
        // Xóa sản phẩm khỏi mảng
        productsData.splice(index, 1);
        
        // Cập nhật localStorage
        localStorage.setItem('products', JSON.stringify(productsData));
        
        // Giả lập async operation
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Render lại danh sách
        applyFiltersAndSort();
        
        // Hiển thị thông báo
        showNotification('Product deleted successfully!', 'success');
    }
    
    // Hàm hiển thị thông báo
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Load dữ liệu ban đầu
    await loadProducts();
    
    
    // ===== PHẦN 1: XỬ LÝ TÌM KIẾM VỚI HIỆU ỨNG =====
    
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    // Debounce function để tránh tìm kiếm quá nhiều lần
    function debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    function searchProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // Lọc sản phẩm theo từ khóa tìm kiếm
        let filteredProducts = productsData.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        
        // Áp dụng các bộ lọc và sắp xếp
        filteredProducts = applyPriceFilter(filteredProducts);
        filteredProducts = applySorting(filteredProducts);
        
        // Render kết quả
        renderProducts(filteredProducts);
    }
    
    // Tìm kiếm khi nhấn nút
    searchBtn.addEventListener('click', searchProducts);
    
    // Tìm kiếm real-time với debounce
    searchInput.addEventListener('input', debounce(searchProducts, 500));
    
    // Tìm kiếm khi nhấn Enter
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchProducts();
        }
    });
    
    
    // ===== PHẦN 2: BỘ LỌC GIÁ VÀ SẮP XẾP =====
    
    // Thêm UI cho bộ lọc và sắp xếp
    const filterSection = document.createElement('section');
    filterSection.innerHTML = `
        <div class="filter-sort-container">
            <div class="filter-group">
                <label for="priceFilter">Filter by Price:</label>
                <select id="priceFilter">
                    <option value="all">All Prices</option>
                    <option value="low">Under 100,000₫</option>
                    <option value="medium">100,000₫ - 180,000₫</option>
                    <option value="high">Above 180,000₫</option>
                </select>
            </div>
            
            <div class="sort-group">
                <label for="sortSelect">Sort by:</label>
                <select id="sortSelect">
                    <option value="default">Default</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                </select>
            </div>
        </div>
    `;
    
    // Chèn filter section vào sau phần tìm kiếm
    const searchSection = document.querySelector('main > section:nth-child(2)');
    searchSection.insertAdjacentElement('afterend', filterSection);
    
    const priceFilter = document.getElementById('priceFilter');
    const sortSelect = document.getElementById('sortSelect');
    
    // Hàm áp dụng bộ lọc giá
    function applyPriceFilter(products) {
        const filter = priceFilter.value;
        
        if (filter === 'all') return products;
        
        return products.filter(product => {
            if (filter === 'low') return product.price < 100000;
            if (filter === 'medium') return product.price >= 100000 && product.price <= 180000;
            if (filter === 'high') return product.price > 180000;
            return true;
        });
    }
    
    // Hàm áp dụng sắp xếp
    function applySorting(products) {
        const sort = sortSelect.value;
        const sorted = [...products]; // Tạo bản sao để không ảnh hưởng mảng gốc
        
        if (sort === 'name-asc') {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'name-desc') {
            sorted.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sort === 'price-asc') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-desc') {
            sorted.sort((a, b) => b.price - a.price);
        }
        
        return sorted;
    }
    
    // Hàm áp dụng tất cả bộ lọc và sắp xếp
    function applyFiltersAndSort() {
        let filtered = [...productsData];
        
        // Áp dụng tìm kiếm
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
            );
        }
        
        // Áp dụng bộ lọc giá
        filtered = applyPriceFilter(filtered);
        
        // Áp dụng sắp xếp
        filtered = applySorting(filtered);
        
        // Render kết quả
        renderProducts(filtered);
    }
    
    // Sự kiện khi thay đổi bộ lọc hoặc sắp xếp
    priceFilter.addEventListener('change', applyFiltersAndSort);
    sortSelect.addEventListener('change', applyFiltersAndSort);
    
    
    // ===== PHẦN 3: XỬ LÝ ẨN/HIỆN FORM VỚI HIỆU ỨNG MƯỢT =====
    
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const errorMsg = document.getElementById('errorMsg');
    
    function toggleAddProductForm() {
        const isHidden = addProductForm.classList.contains('hidden');
        
        if (isHidden) {
            // Hiện form với hiệu ứng
            addProductForm.classList.remove('hidden');
            addProductForm.style.maxHeight = '0px';
            addProductForm.style.opacity = '0';
            
            setTimeout(() => {
                addProductForm.style.maxHeight = addProductForm.scrollHeight + 'px';
                addProductForm.style.opacity = '1';
            }, 10);
        } else {
            // Ẩn form với hiệu ứng
            addProductForm.style.maxHeight = '0px';
            addProductForm.style.opacity = '0';
            
            setTimeout(() => {
                addProductForm.classList.add('hidden');
            }, 300);
        }
        
        errorMsg.textContent = '';
    }
    
    addProductBtn.addEventListener('click', toggleAddProductForm);
    
    cancelBtn.addEventListener('click', function() {
        addProductForm.style.maxHeight = '0px';
        addProductForm.style.opacity = '0';
        
        setTimeout(() => {
            addProductForm.classList.add('hidden');
            addProductForm.reset();
            errorMsg.textContent = '';
        }, 300);
    });
    
    
    // ===== PHẦN 4: XỬ LÝ THÊM SẢN PHẨM MỚI =====
    
    const productListSection = document.getElementById('product-list');
    
    addProductForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Lấy giá trị
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
        
        // Tạo sản phẩm mới
        const finalImageUrl = imageUrl !== '' 
            ? imageUrl 
            : 'https://via.placeholder.com/200x300/FFA07A/FFFFFF?text=' + encodeURIComponent(name);
        
        const displayDesc = desc !== '' 
            ? desc 
            : 'No description available for this product.';
        
        const newProduct = {
            id: Date.now(), // Tạo ID unique
            name: name,
            price: priceNumber,
            desc: displayDesc,
            imageUrl: finalImageUrl,
            category: 'other'
        };
        
        // Giả lập async operation khi lưu sản phẩm
        try {
            // Hiển thị loading trên nút submit
            const submitBtn = addProductForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Adding...';
            submitBtn.disabled = true;
            
            // Giả lập delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Thêm vào mảng và lưu localStorage
            productsData.unshift(newProduct);
            localStorage.setItem('products', JSON.stringify(productsData));
            
            // Khôi phục nút
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Render lại
            applyFiltersAndSort();
            
            // Hiển thị thông báo
            showNotification(`Product "${name}" has been successfully added!`, 'success');
            
            // Reset và đóng form
            addProductForm.reset();
            
            setTimeout(() => {
                addProductForm.style.maxHeight = '0px';
                addProductForm.style.opacity = '0';
                
                setTimeout(() => {
                    addProductForm.classList.add('hidden');
                }, 300);
            }, 1000);
            
            // Scroll đến sản phẩm mới
            setTimeout(() => {
                productListSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500);
            
        } catch (error) {
            console.error('Error adding product:', error);
            showNotification('Failed to add product. Please try again.', 'error');
        }
    });
    
    
    // ===== PHẦN 5: XỬ LÝ FORM LIÊN HỆ =====
    
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const message = document.getElementById('userMessage').value;
        
        // Giả lập gửi form với async
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        submitBtn.textContent = 'Send';
        submitBtn.disabled = false;
        
        showNotification('Thank you for contacting us! We will respond soon.', 'success');
        contactForm.reset();
    });
    
    
    // ===== PHẦN 6: NÚT SCROLL TO TOP =====
    
    // Tạo nút scroll to top
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.title = 'Scroll to top';
    document.body.appendChild(scrollTopBtn);
    
    // Hiển thị/ẩn nút khi scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top khi click
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
});