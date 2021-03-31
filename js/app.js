// GestionPanier permet de recupere le panier dans localStorage
function gestionPanier(){
    // Vérifie si un panier est déjà enregistrer
    if (localStorage.getItem('panier')) {
        // S'il existe on le stock
        panier = JSON.parse(localStorage.getItem('panier'));

        // Vérifie s'il y a des éléments null dans le tableau panier
        for (let i in panier) {
            if (panier[i] === null) {
                panier.splice(i, 1);
                const tmpPanier = JSON.stringify(panier);
                localStorage.setItem('panier', tmpPanier);
            }
        }
    }
    // Retourne le panier a jour
    return panier;
}

// supressionDuPanier permet de supprimer le panier une fois la commande effectué
function supressionDuPanier(){

    // Vérifie si un panier est stocké
    if (localStorage.getItem('panier')) {
        // Vide le panier puis l'enregistre
        panier = [];
        localStorage.setItem('panier', JSON.stringify(panier));
    }
    // Retourne le panier mis à jour
    return panier;
}

function supressionGlobal(){

    // Vérifie si un panier est stocké
    if (localStorage.getItem('panier')) {
        // Vide le panier puis l'enregistre
        panier = [];
        localStorage.removeItem('panier');
    }

    if (localStorage.getItem('confirmation')) {
        // Vide le panier puis l'enregistre
        localStorage.removeItem('confirmation');
    }
}

function getEltPanier(){
    if (panier.length === 0){
        document.getElementById('p-panier').appendChild(document.createTextNode('Panier'));
    } else {
        let produit = 0;
        for (let i in panier){
            produit = parseInt(panier[i].quantite) + parseInt(produit);
        }
        document.getElementById('p-panier').appendChild(document.createTextNode('Panier (' + produit + ')'));
    }
}