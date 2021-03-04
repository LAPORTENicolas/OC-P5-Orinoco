let panier      = [];
let listProduit = document.getElementById('list-produits');
let url         = 'http://localhost:3000/api/teddies';

panier = gestionPanier(panier);

async function getJson(url) {
    let reponse = await fetch(url);

    if (reponse.ok){
        return await print(await reponse.json());
    } else {
        console.log("Impossible de charger l'API, erreur", reponse.status, ':', reponse.statusText);
    }
}

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

getJson(url);