let panier = [];

if (sessionStorage.getItem('panier')){
    panier = JSON.parse(sessionStorage.getItem('panier'));
}

function affichagePanier() {
    let panierConteneur     = document.getElementById('conteneur-panier')
    let panierTableau       = document.createElement('table');
    let panierThead         = document.createElement('thead');
    let panierTr            = document.createElement('tr');
    let panierTh1           = document.createElement('th-1');
    panierTh1.className     = 'th-1'

    let panierTh2           = document.createElement('th-2');
    panierTh2.className     = 'th-2';

    let panierTh3           = document.createElement('th-3');
    panierTh3.className     = 'th-3';

    let panierTh4           = document.createElement('th-4');
    panierTh4.className     = 'th-4'

    let panierTbody         = document.createElement('tbody');
    let panierTd            = document.createElement('td');
    let panierBouton        = document.createElement('button');
    panierBouton.className  = 'btn btn-red';

}
affichagePanier();