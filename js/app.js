// GestionPanier permet de sauvegarder le panier dans localStorage
function gestionPanier(){
    // Vérifie si un panier est déjà enregistrer
    if (localStorage.getItem('panier')) {
        // S'il existe on le stock
        panier = JSON.parse(localStorage.getItem('panier'));

        // Vérifie s'il y a des éléments null dans le tableau panier
        for (let i in panier) {
            if (panier[i] === null) {
                panier.splice(i, 1);
                let tmpPanier = JSON.stringify(panier);
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