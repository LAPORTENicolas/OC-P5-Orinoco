// Récuperation de l'id
let id      = window.location.search.replace('?produitID=', '');
let panier  = [];

// Actualisation du panier
panier = gestionPanier(panier);

fetch('http://localhost:3000/api/teddies/' + id).then(function (reponse) {
    if (reponse.ok) {
        reponse.json().then(function(json) {
            console.log(json);
            affichageProduit(json)
        });
    } else {
        document.location.href = 'index.html';
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
        let tmpOption       = document.createElement('option');
        let tmpOptionText   = document.createTextNode(json.colors[i]);
        tmpOption.value     = i;
        tmpOption.appendChild(tmpOptionText);
        selectInput.appendChild(tmpOption);
    }

    let boutton         = document.createElement('button');
    let textBoutton     = document.createTextNode('Ajouter au panier');
    boutton.appendChild(textBoutton);
    boutton.className   = 'btn btn-bleu';
    boutton.id          = 'acheter';
    divText.appendChild(boutton);

    let btn = document.getElementById('acheter');
    btn.addEventListener('click', function (){
        acheter(JSON.stringify(json));
    })
}

function acheter(object) {
    let quant   = document.getElementById('quantite').value;
    let select  = document.getElementById('select-input');
    let couleur = select.value;
    let produit = JSON.parse(object);

    if (quant <= 0) {
        console.log('Quantité invalide');
        return 1;
    }

    for (let i in panier) {
        if (panier[i]._id === produit._id && panier[i].couleur === couleur) {
            panier[i].quantite = parseInt(panier[i].quantite) + parseInt(quant);
            console.log('couleur identique');
            enrPanier();
            return 0;
        }
    }
    produit.couleur     = couleur;
    produit.quantite    = quant;
    panier.push(produit);
    enrPanier();
}

function enrPanier(){
    if (localStorage.getItem('panier')) {
        localStorage.removeItem('panier');
    }
    let tmpPanier = JSON.stringify(panier);
    localStorage.setItem('panier', tmpPanier);
}