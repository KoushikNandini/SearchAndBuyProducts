(async () => {

    const productEl = document.getElementById("productContainer");
    const searchEl = document.getElementById("serch_input");
    const url = "https://fakestoreapi.com/products";
   
    const fetchProducts = async () => {

        const res = await fetch(url)
        try {
            return await res.json();
        }
        catch (error) {
            return error;
        }
    };
    
    const products = await fetchProducts();
    const generateProduct = (product) => {
        return `<div class="product_card">
            <div class="image_container">
                <img src="${product.image}" alt="" />
            </div>
            <div class="product_description">
                <h2>${product.title}</h2>
                <p>${product.description.split(" ").slice(0,23).join(" ")}</p>
                <button>${product.price} $</button>
            </div>
        </div>`
    };
    const rendorProducts = (products) => {
        productEl.innerHTML = "";
        products.forEach(product => {
            productEl.innerHTML += generateProduct(product);
        });
    };
    const checkTextContain = (text, searchvalue) => {
        return (text.toString().toLowerCase().includes(searchvalue)
        );
   }
    const filterValue = (event) => {
        const searchText = event.target.value.toLowerCase();
        const filteredProducts = products.filter((product) => {
            return (
                checkTextContain(product.description, searchText) ||
                checkTextContain(product.title, searchText) ||
                checkTextContain(product.price, searchText)
            );
        });
        rendorProducts(filteredProducts);
    };
    searchEl.addEventListener("keyup", filterValue);
    rendorProducts(products);
})();