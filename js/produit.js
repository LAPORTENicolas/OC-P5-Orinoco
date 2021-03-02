let panier      = [];
let listProduit = document.getElementById('list-produits');

panier = gestionPanier(panier);

fetch('http://localhost:3000/api/teddies').then(function (reponse) {
    if (reponse.ok) {
        reponse.json().then(function(json) {
            print(json);
        });
    } else {
        console.log("Impossible de charger l'API")
    }
});

function print(produits) {
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
        let produitBouton           = document.createElement('button');
        let produitSelection        = document.createElement('select');

        imgProduit.src              = produits[i].imageUrl;

        produitBouton.className     = 'btn btn-bleu';

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

/*
        if (produits[i].colors){
            let color = produits[i].colors
            for (let f in color){
                let tmpOption   = document.createElement('option');
                let tmpText     = document.createTextNode(color[f]);
                tmpOption.appendChild(tmpText);
                produitSelection.appendChild(tmpOption);
            }
        }

 */
        btnConteneur.appendChild(produitPrix);
        btnConteneur.appendChild(produitBouton);
    }
}

function acheter(id, produit) {
    let quant = parseInt(document.getElementById('produit' + id).value);

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
    panier[id] = produit;
    enrPanier();
}

function enrPanier(){
    if (sessionStorage.getItem('panier')) {
        sessionStorage.removeItem('panier');
    }
    let tmpPanier = JSON.stringify(panier);
    sessionStorage.setItem('panier', tmpPanier);
}