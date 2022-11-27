// On récupère l'id pour afficher le numéro de commande

let params = new URLSearchParams(window.location.search);
const orderId = params.get("id");
document.getElementById("orderId").textContent = orderId;