fetch('http://localhost:3000/api/teddies').then(function (reponse) {
    if (reponse.ok) {
        reponse.json().then(function(json) {
            print(json);
        });
    } else {
        console.log("Impossible de charger l'API")
    }
});

let listProduit = document.getElementById('list-produits');

function print(produits) {
    console.log(produits)
    for (let i in produits){
        let produitConteneur = document.createElement('div');
        produitConteneur.className = 'produit';

        let btnConteneur = document.createElement('div');

        let imgProduit      = document.createElement('img')
        let produitTitre    = document.createElement('h3');
        let produitPara     = document.createElement('p');
        let produitPrix     = document.createElement('span');
        let produitBouton   = document.createElement('button');

        imgProduit.src          = produits[i].imageUrl;

        produitBouton.className = 'btn btn-bleu';

        let textTitre   = document.createTextNode(produits[i].name);
        let textPara    = document.createTextNode(produits[i].description);
        let textPrix    = document.createTextNode(produits[i].price);
        let textBoutton = document.createTextNode('Ajouter au panier');

        produitTitre.appendChild(textTitre);
        produitPara.appendChild(textPara);
        produitPrix.appendChild(textPrix);
        produitBouton.appendChild(textBoutton);


        listProduit.appendChild(produitConteneur);
        produitConteneur.appendChild(imgProduit);
        produitConteneur.appendChild(produitTitre);
        produitConteneur.appendChild(produitPara);
        produitConteneur.appendChild(btnConteneur);
        btnConteneur.appendChild(produitPrix);
        btnConteneur.appendChild(produitBouton);
    }
}