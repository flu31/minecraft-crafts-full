let recipes = [];

async function loadData() {
  const res = await fetch('data/recipes.json');
  recipes = await res.json();
  populateCategoryFilter();
  displayRecipes(); // Başlangıçta tüm tarifleri göster
}

function populateCategoryFilter(){
  const cats = [...new Set(recipes.map(r => r.category))];
  const sel = document.getElementById('categoryFilter');
  cats.forEach(c=> sel.innerHTML += `<option value="${c}">${c}</option>`);
}

function displayRecipes(){
  const filter = document.getElementById('searchBar').value.toLowerCase();
  const cat = document.getElementById('categoryFilter').value;
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  recipes.filter(r=>{
    return r.name.toLowerCase().includes(filter)
        && (cat === '' || r.category === cat);
  }).forEach(r=>{
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h3>${r.name}</h3>
      <img src="${r.image}" alt="${r.name}" />
      <p>${r.recipe}</p>
    `;
    grid.appendChild(div);
  });
}

// Arama ve filtreleme olayları
document.getElementById('searchBar').addEventListener('input', displayRecipes);
document.getElementById('categoryFilter').addEventListener('change', displayRecipes);

loadData();
