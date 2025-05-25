// Configuração do Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyCEHvY7F90VDJAxGYpU0cjqVizNfZmejRA",
    authDomain: "autenticacao-administrativa.firebaseapp.com",
    databaseURL: "https://autenticacao-administrativa-default-rtdb.firebaseio.com",
    projectId: "autenticacao-administrativa",
    storageBucket: "autenticacao-administrativa.appspot.com",
    messagingSenderId: "724706435418",
    appId: "1:724706435418:web:cc90055d710060cf381363"
  };

  // Inicializa o Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  document.addEventListener('DOMContentLoaded', () => {
    const menuList = document.getElementById('menu-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let allItems = [];

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

    // Botão admin
    document.getElementById('admin-btn').addEventListener('click', () => {
      window.location.href = 'admin.html';
    });

    // Carrega os dados do Realtime Database
    database.ref('items').once('value')
      .then(snapshot => {
        const data = snapshot.val();
        allItems = Object.keys(data || {}).map(key => data[key]);
        renderMenu(allItems);
      })
      .catch(err => console.error('Erro ao carregar itens:', err));
  });
