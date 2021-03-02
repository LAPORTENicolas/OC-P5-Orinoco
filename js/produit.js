let id = window.location.search.replace('?produitID=', '');
let panier = [];
panier = gestionPanier(panier);

fetch('http://localhost:3000/api/teddies/' + id).then(function (reponse) {
    if (reponse.ok) {
        reponse.json().then(function(json) {
            affichageProduit(json)
            console.log(json);
        });
    } else {
        document.location.href='/allApp/OC-P5-Orinoco/';
    }
});

function affichageProduit(json){
    let conteneur = document.getElementById('conteneur-produit');

    let titre = document.createElement('h2');
    let textTitre = document.createTextNode(json.name);
    titre.appendChild(textTitre);

    let img = document.createElement('img');
    img.src = json.imageUrl;
    img.alt = json.name;

    let divText = document.createElement('div');
    divText.className = 'text-produit';

    let sousTitre = document.createElement('h2');
    sousTitre.appendChild(textTitre);

    let description = document.createElement('p');
    let textDescription = document.createTextNode(json.description);
    description.appendChild(textDescription);

    let inputQuatite = document.createElement('input');
    inputQuatite.type = 'number';
    inputQuatite.min    = 1;
    inputQuatite.value  = 1;
    inputQuatite.id     = 'quantite';

    let selectInput = document.createElement('select');
    selectInput.id = 'select-input';

    conteneur.appendChild(img);
    conteneur.appendChild(divText);
    divText.appendChild(sousTitre);
    divText.appendChild(description);
    divText.appendChild(inputQuatite);
    divText.appendChild(selectInput);

    for (let i in json.colors) {
        let tmpOption = document.createElement('option');
        let tmpOptionText = document.createTextNode(json.colors[i]);
        tmpOption.appendChild(tmpOptionText);
        selectInput.appendChild(tmpOption);
    }

    let boutton = document.createElement('button');
    let textBoutton = document.createTextNode('Ajouter au panier');
    boutton.appendChild(textBoutton);
    boutton.className = 'btn btn-bleu';
    boutton.onclick = function (){ acheter(id, json); };
    divText.appendChild(boutton);
}

function acheter(id, produit) {
    let quant = parseInt(document.getElementById('quantite').value);

    if (quant <= 0) {
        console.log('Quantité invalide');
        return 1;
    }

    for (let i in panier) {
        if (panier[i]._id === produit._id) {
            panier[i].quantite = panier[i].quantite + quant;
            enrPanier();
            return 0;
        }
    }

    produit['quantite'] = quant;
    panier.push(produit);
    enrPanier();
}

function enrPanier(){
    if (sessionStorage.getItem('panier')) {
        sessionStorage.removeItem('panier');
    }
    let tmpPanier = JSON.stringify(panier);
    sessionStorage.setItem('panier', tmpPanier);
}