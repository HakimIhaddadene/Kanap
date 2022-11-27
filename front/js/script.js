// Connexion à l'API et récupération des données
fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
    return res.json();
    }
})
.then(products => {
    console.log(products);
    let productsList = '';
    for (let product of products) {
        productsList +=             // Concaténation pour afficher tous les produits et pas seulement le dernier
            `<a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>`;
    }
    // Renvoie un tableau de 8 objets
    document.querySelector(".items").innerHTML = productsList;
})            
.catch(function(err) {
    console.log("Erreur");
});