// On récupère les informations du panier
let storedProduct = localStorage.getItem("cart");
let productOptions = JSON.parse(storedProduct) || [];
console.log(productOptions);



// Vérification Panier vide / Panier avec article(s)
// Affichage des informations du panier
// Calcul du nombre d'articles et du prix total

if ( productOptions.length == 0) {
    document.getElementById("cart__items").textContent = "Votre panier est vide";       
}
else {
    let priceTotal = 0;
    let quantityTotal = 0;
    for (let options of productOptions) {

        let productId = options.id;
        console.log(productId);
        let productUrl = `http://localhost:3000/api/products/${productId}`;
        console.log(productUrl);        

        fetch(productUrl)
        .then(function(res) {
            if (res.ok) {
            return res.json();
            }
        })
        .then(product => {
            console.log(product);
            document.getElementById("cart__items").innerHTML += 
                `
                <article class="cart__item" data-id="${productId}" data-color="${options.color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${options.color}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${options.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
                </article>
                `;
                console.log(options.quantity);
                let pricePerProduct = parseInt(options.quantity * product.price);
                console.log(pricePerProduct);                   
                priceTotal += pricePerProduct;
                let quantityPerProduct = parseInt(options.quantity); 
                quantityTotal += quantityPerProduct;
                
                document.getElementById("totalQuantity").textContent = quantityTotal;       
                document.getElementById("totalPrice").textContent = priceTotal;
                
                changeTheQuantity ();
                deleteProduct();
        })
        .catch(function(err) {
            console.log("Erreur");
        });
    }
}



// Formulaire
document.querySelector(".cart__order__form__submit").addEventListener("click", (e) => {
    e.preventDefault();

    let firstName = document.getElementById("firstName").value;    
    let missFirstName = document.getElementById("firstNameErrorMsg");
    let lastName = document.getElementById("lastName").value;
    let missLastName = document.getElementById("lastNameErrorMsg");
    let city = document.getElementById("city").value;
    let missCity = document.getElementById("cityErrorMsg");
    let stringValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

    let address = document.getElementById("address").value;
    let missAddress = document.getElementById("addressErrorMsg");
    let addressValid = /^[a-zA-Z0-9\s,'-]*$/;
        
    let email = document.getElementById("email").value;
    let missEmail = document.getElementById("emailErrorMsg");
    let emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
    // Vérifications des données utilisateur du champ Prénom
    function firstNameVerification () {
        let input = document.getElementById("firstName");
        //Si le champ est vide
        if (firstName == ''){
            missFirstName.textContent = "Prénom manquant";
            missFirstName.style.color = "red";
            input.style.backgroundColor = "#FFA8A8";
            return false;
        //Si le format de données est incorrect
        }else if (stringValid.test(firstName) == false){
            missFirstName.textContent = "Format incorrect";
            missFirstName.style.color = "red";
            input.style.backgroundColor = "#FFA8A8";
            return false;
        // Si le format et les données sont corrects    
        } else {
            input.style.backgroundColor = "#9DFF94";
            missFirstName.textContent = '';
            return true;
        }
    }

    // Vérifications des données utilisateur du champ Nom
    function lastNameVerification () {
        let input = document.getElementById("lastName");
        if (lastName == ''){
            missLastName.textContent = "Nom manquant";
            missLastName.style.color = "red";
            input.style.backgroundColor = "#FFA8A8";
            return false;
        }else if (stringValid.test(lastName) == false){
            missLastName.textContent = "Format incorrect";
            missLastName.style.color = "red";
            input.style.backgroundColor = "#FFA8A8";
            return false;   
        } else {
            input.style.backgroundColor = "#9DFF94";
            missLastName.textContent = '';
            return true;
        }
    }    

    // Vérifications des données utilisateur du champ Adresse
    function addressVerification () {
        let input = document.getElementById("address");
        if (address == ''){
            missAddress.textContent = "Adresse manquante";
            missAddress.style.color = "red";
            input.style.backgroundColor = "#FFA8A8";
            return false;
        }else if (addressValid.test(address) == false){
            missAddress.textContent = "Format incorrect";
            missAddress.style.color = "red";
            input.style.backgroundColor = "#FFA8A8";
            return false;   
        } else {
            input.style.backgroundColor = "#9DFF94";
            missAddress.textContent = '';
            return true;
        }
    }    

    // Vérifications des données utilisateur du champ Ville
    function cityVerification () {
        let input = document.getElementById("city");
        if (city == ''){
            missCity.textContent = "Ville manquante";
            missCity.style.color = "red";
            input.style.backgroundColor = "#FFA8A8";
            return false;
        }else if (stringValid.test(city) == false){
            missCity.textContent = "Format incorrect";
            missCity.style.color = "red";
            input.style.backgroundColor = "#FFA8A8";
            return false;   
        } else {
            input.style.backgroundColor = "#9DFF94";
            missCity.textContent = '';
            return true;
        }
    }

    // Vérifications des données utilisateur du champ Email
    function emailVerification () {
        let input = document.getElementById("email");
        if (email == ''){
            missEmail.textContent = "Email manquant";
            missEmail.style.color = "red";
            input.style.backgroundColor = "#FFA8A8";
            return false;
        }else if (emailValid.test(email) == false){
            missEmail.textContent = "Format incorrect";
            missEmail.style.color = "red";
            input.style.backgroundColor = "#FFA8A8";
            return false;   
        } else {
            input.style.backgroundColor = "#9DFF94";
            missEmail.textContent = '';
            return true;
        }
    }

    // Si tous les champs sont renseignés correctement
    // On créé un objet Contact et on l'envoie sur le local storage
    if (firstNameVerification() && lastNameVerification() && addressVerification() && cityVerification() && emailVerification()) {
        console.log("Formulaire validé");
        var contact = {
            firstName, lastName, address, city, email
        }
        console.log(contact);
        console.log(productOptions);
        localStorage.setItem("contact", JSON.stringify(contact));
    }


    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            contact, 
            products: productOptions.map(p => p.id)
        })
    })
    .then(async function(res) {
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            window.location.href = `confirmation.html?id=${data.orderId}`;
            localStorage.clear();
        }
    })
    .catch(function(err) {
        console.log("Erreur");
    });

})    


// Changer la quantité d'un article du panier
function changeTheQuantity () {
    document.querySelectorAll(".itemQuantity").forEach(element => element.addEventListener("change", e => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let id = e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
        let color = e.target.parentNode.parentNode.parentNode.parentNode.dataset.color;
        let quantity = parseInt(e.target.value);
        let foundProduct = cart.find(p => p.id == id && p.color == color);
        if(!quantity){
            // TODO Supprimer si la quantité passe à zéro
            // deleteProduct();
            foundProduct.quantity = 0;
            localStorage.setItem("cart", JSON.stringify(cart));
        }else{
            foundProduct.quantity = quantity;
            console.log(cart);
            localStorage.setItem("cart", JSON.stringify(cart));
        }        
        location.reload();
    }))
}



// Supprimer un article du panier
function deleteProduct () {
    let deleteLink = document.querySelectorAll(".deleteItem");
    console.log(deleteLink);
    for (let i = 0; i < deleteLink.length; i++){
        deleteLink[i].addEventListener("click" , (event) => {
            let idToDelete = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id");
            let colorToDelete = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-color");
            console.log({idToDelete});
            console.log({colorToDelete});
            productOptions = productOptions.filter(p => !(p.id == idToDelete && p.color == colorToDelete));
            console.log({productOptions});
            localStorage.setItem("cart", JSON.stringify(productOptions));
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })    
    }    
}