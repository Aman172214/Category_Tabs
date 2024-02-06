function showContent(category) {
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((response) => response.json())
    .then((data) => {
      displayData(category, data);
    })
    .catch((error) => console.error("Error fetching data:", error));

  updateTabSelection(category);
}

function displayData(category, data) {
  // Find the selected category in the JSON data
  const selectedCategory = data.categories.find(
    (cat) => cat.category_name.toLowerCase() === category.toLowerCase()
  );

  if (!selectedCategory) {
    console.error(`Category "${category}" not found in the JSON data.`);
    return;
  }

  // Populate product cards for the selected category

  selectedCategory.category_products.forEach((product, i) => {
    const productCard = document.getElementById(`card${i + 1}`);

    // Calculate discount percentage
    const discountPercentage = Math.round(
      ((product.compare_at_price - product.price) / product.compare_at_price) *
        100
    );

    // Extract the first 15 characters of the title
    const truncatedTitle = product.title.slice(0, 15);

    // Create the HTML for the product card
    productCard.innerHTML = `
    ${
      product.badge_text ? `<div class="badge">${product.badge_text}</div>` : ""
    }
            <img src="${product.image}" alt="${product.title}">
            
           <div class="title">
           <h2>${truncatedTitle}${product.title.length > 15 ? ".." : ""}</h2>
           <p id="dot">&#183;<p>
           <p>${product.vendor}</p>
           </div>
            <div class="price">
            <p>Rs ${product.price}</p>
            <p id="compare_price">Rs ${product.compare_at_price}</p>
            <p id="discount">${discountPercentage}% off</p>
            </div>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;
  });
}

function updateTabSelection(category) {
  // Remove 'active' class from all tabs
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Add 'active' class to the selected tab
  const selectedTab = document.querySelector(
    `.tab[data-category="${category}"]`
  );
  if (selectedTab) {
    selectedTab.classList.add("active");
  }
}
