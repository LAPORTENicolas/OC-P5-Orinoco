fetch('http://localhost:3000/api/teddies').then(function (reponse) {
    if (reponse.ok) {
        reponse.json().then(function(json) {
            print(json);
        });
    } else {
        console.log("Impossible de charger l'API")
    }
});

let panier = [];

if (sessionStorage.getItem('panier')){
    panier = JSON.parse(sessionStorage.getItem('panier'));
}

let listProduit = document.getElementById('list-produits');

function print(produits) {
    for (let i in produits){
        let produitConteneur        = document.createElement('div');
        produitConteneur.className  = 'produit';

        let btnConteneur            = document.createElement('div');

        let imgProduit              = document.createElement('img')
        let produitTitre            = document.createElement('h3');
        let produitPara             = document.createElement('p');
        let produitPrix             = document.createElement('span');
        let produitBouton           = document.createElement('button');
        let produitInput            = document.createElement('input')

        imgProduit.src              = produits[i].imageUrl;

        produitBouton.className     = 'btn btn-bleu';

        produitBouton.onclick       = function (){ acheter(i, produits[i]); };

        produitInput.id             = 'produit' + i;
        produitInput.type           = 'number'
        produitInput.min            = 1;
        produitInput.value          = 1;

        let textTitre               = document.createTextNode(produits[i].name);
        let textPara                = document.createTextNode(produits[i].description);
        let textPrix                = document.createTextNode(produits[i].price);
        let textBoutton             = document.createTextNode('Ajouter au panier');

        produitTitre.appendChild(textTitre);
        produitPara.appendChild(textPara);
        produitPrix.appendChild(textPrix);
        produitBouton.appendChild(textBoutton);


        listProduit.appendChild(produitConteneur);
        produitConteneur.appendChild(imgProduit);
        produitConteneur.appendChild(produitTitre);
        produitConteneur.appendChild(produitPara);
        produitConteneur.appendChild(produitInput);
        produitConteneur.appendChild(btnConteneur);
        btnConteneur.appendChild(produitPrix);
        btnConteneur.appendChild(produitBouton);
    }
}

function acheter(id, produit) {
    let quant = parseInt(document.getElementById('produit' + id).value);

    if (quant <= 0) { console.log('Quantité invalide'); return 1; }

    if (panier[id]){
        produit['quantite'] = produit['quantite'] + quant;
        panier[id] = produit;
    } else {
        produit['quantite'] = quant;
        panier[id] = produit;
    }

    if (sessionStorage.getItem('panier')){
        sessionStorage.removeItem('panier');
    }
    let tmpPanier = JSON.stringify(panier);
    sessionStorage.setItem('panier', tmpPanier);
}