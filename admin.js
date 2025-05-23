// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();

// Elementos
const newCard   = document.getElementById('new-item-card');
const itemList  = document.getElementById('item-list');
const modalEl   = document.getElementById('itemModal');
const modal     = new bootstrap.Modal(modalEl);
const form      = document.getElementById('item-form');
const saveBtn   = document.getElementById('save-item');
const deleteBtn = document.getElementById('delete-item');

let currentId = null;

// Carrega itens do Firestore
async function loadItems() {
  // remove antigos cards
  itemList.querySelectorAll('.item-col').forEach(col=>col.remove());
  const snapshot = await db.collection('menu').get();
  snapshot.forEach(doc => renderCard(doc.id, doc.data()));
}

// Renderiza um card
function renderCard(id, data) {
  const col = document.createElement('div'); col.className='col-sm-6 col-md-4 col-lg-3 item-col';
  col.innerHTML = `
    <div class="card h-100 item-card">
      <img src="${data.imagem}" class="card-img-top" alt="${data.nome}">
      <div class="card-body">
        <h5 class="card-title">${data.nome}</h5>
        <p class="card-text">${data.descricao}</p>
        <p class="fw-bold text-primary">R$ ${data.valor.toFixed(2)}</p>
      </div>
      <div class="item-actions">
        <button class="btn btn-sm btn-light edit"><i class="fas fa-edit"></i></button>
      </div>
    </div>`;
  col.querySelector('.edit').addEventListener('click', ()=> openItem(id,data));
  itemList.appendChild(col);
}

// Novo item
newCard.addEventListener('click', ()=>{
  currentId=null; form.reset(); deleteBtn.style.display='none';
  modalEl.querySelector('.modal-title').textContent='Novo Item'; modal.show();
});

// Editar item
function openItem(id,data){
  currentId=id; form['item-name'].value=data.nome;
  form['item-desc'].value=data.descricao; form['item-price'].value=data.valor;
  form['item-img'].value=data.imagem; deleteBtn.style.display='inline-block';
  modalEl.querySelector('.modal-title').textContent='Editar Item'; modal.show();
}

// Salvar criação/edição
saveBtn.addEventListener('click', async ()=>{
  const item={ nome:form['item-name'].value, descricao:form['item-desc'].value,
               valor:parseFloat(form['item-price'].value), imagem:form['item-img'].value};
  if(currentId) await db.collection('menu').doc(currentId).update(item);
  else await db.collection('menu').add(item);
  modal.hide(); loadItems();
});

deleteBtn.addEventListener('click', async ()=>{
  if(currentId) { await db.collection('menu').doc(currentId).delete(); modal.hide(); loadItems(); }
});

// Protege rota e logout
auth.onAuthStateChanged(user=>{ if(!user) window.location='login.html'; });
document.getElementById('logout').addEventListener('click', ()=> auth.signOut().then(()=>window.location='login.html'));

// Inicializa listagem
loadItems();
