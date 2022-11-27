// On récupère l'id du produit dans l'URL
let pageUrl = window.location.href;
let url = new URL(pageUrl);                                 // 
let search_params = new URLSearchParams(url.search);        // 

// Url du produit
let productId = search_params.get("id");
console.log(productId);
let productUrl = `http://localhost:3000/api/products/${productId}`;
console.log(productUrl);



// Connexion à l'API et affichage des données du produit
fetch(productUrl)
.then(function(res) {
    if (res.ok) {
    return res.json();
    }
})
.then(product => {
    document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.querySelector("#title").textContent = product.name;
    document.querySelector("#price").textContent = product.price;
    document.querySelector("#description").textContent = product.description;
    for (let colors of product.colors) {
        document.querySelector("#colors").innerHTML += `<option value="${colors}">${colors}</option>`;
    }    
    console.log(product)
})
.catch(function(err) {
    console.log("Erreur");
});



//
document.querySelector("#addToCart").addEventListener("click", (e) => {
    e.preventDefault();

    let oldCart = JSON.parse(localStorage.getItem("cart"));
    console.log(oldCart);    
    const newCart = [];

    const options = {
        id: `${productId}`,
        color: document.querySelector("#colors").value,
        quantity: parseInt(document.querySelector("#quantity").value)
    }
    console.log(options);

    // Vérification que la couleur a bien été indiquée et que la quantité est comprise entre 1 et 100
    if (options.color === ""){
        console.log("Veuillez renseigner une couleur");
        alert("Veuillez renseigner une couleur");
    }
    else if (options.quantity < 1 || options.quantity > 100 || !options.quantity){
        console.log("Veuillez renseigner une quantité comprise entre 1 et 100");
        alert("Veuillez renseigner une quantité comprise entre 1 et 100");
    }  
    else {
        if (oldCart == null) {
            localStorage.setItem("cart", JSON.stringify([options]));
        }
        else {        
            let productAlreadySelected = oldCart.find(
                (productAlreadySelected) => productAlreadySelected.id == options.id && productAlreadySelected.color == options.color
            );        
            if (productAlreadySelected) {
                productAlreadySelected.quantity = productAlreadySelected.quantity + options.quantity;
                localStorage.setItem("cart", JSON.stringify(oldCart));
                console.log("La quantité a été modifiée");
                return;
            }
            else {
                newCart.push(...oldCart);
                newCart.push(options);
                localStorage.setItem("cart", JSON.stringify(newCart));
                console.log(newCart);
            }
        }    
    }

})    