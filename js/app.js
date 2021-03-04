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
    if (sessionStorage.getItem('panier')) {
        // Vide le panier puis l'enregistre
        panier = [];
        sessionStorage.setItem('panier', JSON.stringify(panier));
    }

    // Retourne le panier mis à jour
    return panier;
}

// Envoye des req get avec fetch
async function getJson(url, affiche) {
    // Execute la req a l'API
    let reponse = await fetch(url);

    // Vérifie si la req a aboutie correctement ou retourne une érreur
    if (reponse.ok){
        // Execute la fonctioon d'affichage avec pour argument le json de la req
        if (affiche === false) {
            return await reponse.json();
        } else if (affiche === true) {
            return print(await reponse.json());
        }
    } else {
        console.log("Impossible de charger l'API, erreur", reponse.status, ':', reponse.statusText);
    }
}