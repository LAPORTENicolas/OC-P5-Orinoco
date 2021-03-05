// Vérifie s'il y a une commande et le prix total de la commande, avant d'afficher les éléments
if (localStorage.getItem('confirmation')) {

    // Récupere la commande et le prix de la commande
    let data            = JSON.parse(localStorage.getItem('confirmation'));
    let prixTotal       = 0;
    let titreConteneur  = document.getElementById('div1');
    let conteneur       = document.getElementById('conteneur-commande');

    // Recupere le prix total de la commande
    for (let i in data.products){
        prixTotal = prixTotal + data.products[i].price;
        console.log(prixTotal);
    }

    let titre           = document.createElement('h1');
    titre.appendChild(document.createTextNode("Confirmation de votre commande N°" + data.orderId))
    let soustitre       = document.createElement('h2');
    soustitre.appendChild(document.createTextNode('Merci pour votre commande'));

    /*
    let divText         = document.createElement('div')
    divText.className   = 'conteneur-commande';
    divText.id          = 'conteneur-commande';
    */

    let divPara         = document.createElement('div');

    let paraId          = document.createElement('p');
    paraId.appendChild(document.createTextNode('Numéro de commande:' + data.orderId));
    paraId.style        = 'min-width: 450px;text-align: center;';

    let paraPrix        = document.createElement('p');
    paraPrix.appendChild(document.createTextNode('Prix total de la commande:' + new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(prixTotal) ));

    titreConteneur.appendChild(titre);

    conteneur.appendChild(soustitre);
    conteneur.appendChild(divPara);

    divPara.appendChild(paraId);
    divPara.appendChild(paraPrix);

} else {
    // S'il n'y a pas de commande ou de pris total, redirige l'utilisateur vers la page des produits
    console.log('erreur');
}