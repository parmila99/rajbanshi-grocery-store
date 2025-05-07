// Load all products from localStorage and display them
function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productSection = document.querySelector(".products");
  productSection.innerHTML = "";

  products.forEach((product, index) => {
    productSection.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: Rs. ${product.price}</p>
        <p>Unit: ${product.unit}</p>
      </div>
    `;
  });
}

// Handle product form submission
function addProduct(event) {
  event.preventDefault();

  const name = document.getElementById("pname").value;
  const price = document.getElementById("pprice").value;
  const unit = document.getElementById("punit").value;
  const imageInput = document.getElementById("pimage");
  const file = imageInput.files[0];

  if (!file) {
    alert("Please select an image.");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = function () {
    const base64Image = reader.result;

    const newProduct = {
      name,
      price,
      unit,
      image: base64Image
    };

    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("addForm").reset();
    loadProducts();
  };

  reader.readAsDataURL(file);
}

// Optional: Placeholder for cart functionality
function loadCart() {
  alert("Cart functionality coming soon.");
}

// Call this on page load
window.onload = loadProducts;