document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch('data.json');
    const data = await response.json();

    let categoriesContainer = document.querySelector('.categories');
    let productsContainer = document.querySelector('.products');

    function renderCategories(categories) {
        categories.forEach(function(category) {
            let categoryElement = document.createElement('div');
            categoryElement.textContent = category.categoryName;
            categoryElement.classList.add('category');
            categoryElement.dataset.categoryId = category.categoryId;
            categoriesContainer.appendChild(categoryElement);

            categoryElement.addEventListener('click', function() {
                let isActive = categoryElement.classList.contains('active');
                productsContainer.innerHTML = '';

                if (isActive) { // Если выбранная категория уже активна, удаляем класс 'active' и отображаем все товары
                    categoryElement.classList.remove('active');
                    renderProducts(data.products);
                } else {
                    document.querySelectorAll('.category').forEach(function(element) {
                        element.classList.remove('active');
                    });
                    categoryElement.classList.add('active');

                    let productsInCategory = data.products.filter(function(product) {
                        return product.categoryId == category.categoryId;
                    });
                    renderProducts(productsInCategory);
                }
            });
        });
    }

    function renderProducts(products) {
        products.forEach(function(product) {
            let productElement = document.createElement('div');
            productElement.textContent = product.productName;
            productElement.classList.add('product');
            productElement.dataset.categoryId = product.categoryId;
            productsContainer.appendChild(productElement);
        });
    }

    renderCategories(data.categories);
    renderProducts(data.products);
});
