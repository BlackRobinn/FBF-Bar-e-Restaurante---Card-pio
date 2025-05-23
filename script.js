document.addEventListener('DOMContentLoaded', () => {
      const menuList = document.getElementById('menu-list');
      const filterBtns = document.querySelectorAll('.filter-btn');
      let allItems = JSON.parse(localStorage.getItem('menuItems') || '[]');

      function renderMenu(items) {
        menuList.innerHTML = '';
        items.forEach(item => {
          const li = document.createElement('li');
          li.className = 'col-sm-6 col-md-4 col-lg-3';
          li.innerHTML = `
            <div class="card h-100">
              <img src="${item.image}" class="card-img-top" alt="${item.name}">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text text-muted">${item.desc}</p>
              </div>
              <div class="card-footer d-flex justify-content-between align-items-center">
  <span class="price-tag">R$ ${parseFloat(item.price).toFixed(2)}</span>
</div>

            </div>
          `;
          menuList.appendChild(li);
        });
      }

      // Filtro
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const cat = btn.getAttribute('data-cat');
          const filtered = cat === 'all' ? allItems : allItems.filter(i => i.category === cat);
          renderMenu(filtered);
        });
      });

      // Render inicial
      renderMenu(allItems);

      // Botão admin
      document.getElementById('admin-btn').addEventListener('click', () => {
        window.location.href = 'admin.html';
      });
    });

src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js";
src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.min.js";