let recipes = [];

async function loadData() {
  try {
    const res = await fetch('data/recipes.json');
    recipes = await res.json();
    populateCategoryFilter();
    displayRecipes();
  } catch (error) {
    console.error("JSON verisi yüklenemedi:", error);
    document.getElementById("grid").innerHTML = "<p style='color:red'>Craft verileri yüklenemedi.</p>";
  }
}

function populateCategoryFilter() {
  const sel = document.getElementById('categoryFilter');
  const cats = [...new Set(recipes.map(r => r.category))];
  cats.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    sel.appendChild(opt);
  });
}

function displayRecipes() {
  const filter = document.getElementById('searchBar').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  const filtered = recipes.filter(item =>
    item.name.toLowerCase().includes(filter) &&
    (category === '' || item.category === category)
  );

  if (filtered.length === 0) {
    grid.innerHTML = "<p>Sonuç bulunamadı.</p>";
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <img src="${item.image}" alt="${item.name}" />
      <p>${item.recipe}</p>
    `;
    grid.appendChild(card);
  });
}

document.getElementById('searchBar').addEventListener('input', displayRecipes);
document.getElementById('categoryFilter').addEventListener('change', displayRecipes);

loadData();
