document.addEventListener("DOMContentLoaded", function() {
  var categoriesContainer = document.querySelector('.categories');
  var productsContainer = document.querySelector('.products');
  var currentCategoryId = -1; // Идентификатор текущей выбранной категории

  // Функция для отображения товаров определенной категории или всех товаров
  function showProductsByCategory(categoryId) {
      // Если выбрана та же категория, что и ранее, показываем все товары
      if (categoryId === currentCategoryId) {
          categoryId = -1; // Показываем все товары
      }

      // Удаляем все дочерние элементы из контейнера товаров
      while (productsContainer.firstChild) {
          productsContainer.removeChild(productsContainer.firstChild);
      }

      // Отображаем только товары выбранной категории или все товары
      products.forEach(function(product) {
          if (categoryId === -1 || product.categoryId === categoryId) {
              var productElement = document.createElement('div');
              productElement.textContent = product.productName;
              productElement.classList.add('product'); // Добавляем класс стиля
              productsContainer.appendChild(productElement);
          }
      });

      // Обновляем текущий идентификатор категории
      currentCategoryId = categoryId;

      // Изменяем фоновый цвет поля товаров в зависимости от выбранной категории
      var categories = document.querySelectorAll('.category');
      categories.forEach(function(category) {
          if (category.getAttribute('data-category-id') === String(categoryId)) {
              category.style.backgroundColor = '#fff'; // Белый фон для выбранной категории
          } else {
              category.style.backgroundColor = '#eee'; // Серый фон для других категорий
          }
      });
  }

  // Добавляем обработчики событий для категорий
  categories.forEach(function(category) {
      var categoryElement = document.createElement('div');
      categoryElement.textContent = category.categoryName;
      categoryElement.classList.add('category'); // Добавляем класс стиля
      categoryElement.setAttribute('data-category-id', category.categoryId); // Устанавливаем атрибут для идентификации категории
      categoryElement.addEventListener('click', function() {
          showProductsByCategory(category.categoryId); // Показываем товары выбранной категории
      });
      categoriesContainer.appendChild(categoryElement);
  });

  // По умолчанию отображаем все товары
  showProductsByCategory(-1); // -1 означает, что показываем все товары
});
