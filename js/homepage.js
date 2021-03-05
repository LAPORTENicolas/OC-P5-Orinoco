let panier      = [];
let listProduit = document.getElementById('list-produits');
let url         = 'http://localhost:3000/api/teddies';

panier = gestionPanier(panier);

async function getJson(url) {
    // Execute la req a l'API
    let reponse = await fetch(url);

    // Vérifie si la req a aboutie correctement ou retourne une érreur
    if (reponse.ok){
        // Execute la fonctioon d'affichage avec pour argument le json de la req
        return print(await reponse.json());
    } else {
        console.log("Impossible de charger l'API, erreur", reponse.status, ':', reponse.statusText);
    }
}

// Permet d'affiché les produits
function print(produits) {
    // Boucle pour affiché chaque produit
    for (let i in produits){
        let produitConteneur        = document.createElement('div');
        produitConteneur.className  = 'produit';

        let textConteneur           = document.createElement('div');
        textConteneur.className     = 'text-conteneur';

        let btnConteneur            = document.createElement('div');

        let imgProduit              = document.createElement('img')
        let produitTitre            = document.createElement('h3');
        let produitPara             = document.createElement('p');
        let produitPrix             = document.createElement('span');
        let produitBouton           = document.createElement('a');
        let produitSelection        = document.createElement('select');

        imgProduit.src              = produits[i].imageUrl;

        produitBouton.className     = 'btn btn-bleu';
        produitBouton.href          = 'produit.html?produitID=' + produits[i]._id;

        let textTitre               = document.createTextNode(produits[i].name);
        let textPara                = document.createTextNode(produits[i].description);
        let textPrix                = document.createTextNode(produits[i].price.toString().replace('00', '.00€'));
        let textBoutton             = document.createTextNode('Plus de détails');

        produitTitre.appendChild(textTitre);
        produitPara.appendChild(textPara);
        produitPrix.appendChild(textPrix);
        produitBouton.appendChild(textBoutton);

        listProduit.appendChild(produitConteneur);
        produitConteneur.appendChild(imgProduit);
        produitConteneur.appendChild(textConteneur);
        textConteneur.appendChild(produitTitre);
        textConteneur.appendChild(produitPara);
        textConteneur.appendChild(btnConteneur);

        btnConteneur.appendChild(produitPrix);
        btnConteneur.appendChild(produitBouton);
    }
}

// Affiche la page
getJson(url);