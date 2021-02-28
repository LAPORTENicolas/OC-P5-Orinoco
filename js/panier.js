let panier                  = [];

if (sessionStorage.getItem('panier')){
    panier = JSON.parse(sessionStorage.getItem('panier'));
}

function supprimer(id) {
    if (panier[id]){
        panier.splice(id, 1)
        let tmpTr = document.getElementById('tr-panier' + id);
        tmpTr.remove();
        console.log(panier);
    }
}

function affichagePanier() {
    let panierConteneur         = document.getElementById('conteneur-panier');
    let panierTableau           = document.createElement('table');
    let panierThead             = document.createElement('thead');
    let panierTr                = document.createElement('tr');

    let panierTh1               = document.createElement('th');
    let textPanierTh1           = document.createTextNode('Nom');
    panierTh1.className         = 'th-1';
    panierTh1.appendChild(textPanierTh1);

    let panierTh2               = document.createElement('th');
    let textPanierTh2           = document.createTextNode('Prix');
    panierTh2.className         = 'th-2';
    panierTh2.appendChild(textPanierTh2);

    let panierTh3               = document.createElement('th');
    let textPanierTh3           = document.createTextNode('Quantité');
    panierTh3.className         = 'th-3';
    panierTh3.appendChild(textPanierTh3);

    let panierTh4               = document.createElement('th');
    let textPanierTh4           = document.createTextNode('Supprimer');
    panierTh4.className         = 'th-4';
    panierTh4.appendChild(textPanierTh4);

    let panierTbody             = document.createElement('tbody');
    let panierBouton            = document.createElement('button');
    panierBouton.className      = 'btn btn-red';

    panierConteneur.appendChild(panierTableau);
    panierTableau.appendChild(panierThead);
    panierTableau.appendChild(panierTbody);
    panierThead.appendChild(panierTr);
    panierTr.appendChild(panierTh1);
    panierTr.appendChild(panierTh2);
    panierTr.appendChild(panierTh3);
    panierTr.appendChild(panierTh4);

    for (let i in panier){
        let panierTr2       = document.createElement('tr');
        panierTr2.id        = 'tr-panier' + i;

        let tmpTd1          = document.createElement('td');
        let tmpTd2          = document.createElement('td');
        let tmpTd3          = document.createElement('td');
        let tmpTd4          = document.createElement('td');

        let tmpTextTd1      = document.createTextNode(panier[i].name);
        let tmpTextTd2      = document.createTextNode(panier[i].price);
        let tmpTextTd3      = document.createTextNode(panier[i].quantite);
        let tmpTextTd4      = document.createTextNode("Supprimer");

        let tmpBouton       = document.createElement('button');
        tmpBouton.className = 'btn btn-red';
        tmpBouton.onclick   = function () {supprimer(i);}


        tmpTd1.appendChild(tmpTextTd1);
        tmpTd2.appendChild(tmpTextTd2);
        tmpTd3.appendChild(tmpTextTd3);
        tmpBouton.appendChild(tmpTextTd4);

        tmpTd4.appendChild(tmpBouton);

        panierTr2.appendChild(tmpTd1);
        panierTr2.appendChild(tmpTd2);
        panierTr2.appendChild(tmpTd3);
        panierTr2.appendChild(tmpTd4);

        panierTbody.appendChild(panierTr2);


    }
}

if (panier.length === 0) {
    console.log('Panier vide');
} else {
    affichagePanier();
}