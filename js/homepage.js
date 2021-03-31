let panier      = [];
const listProduit = document.getElementById('list-produits');
const port   		= '3000';
const url         = 'http://localhost:' + port + '/api/teddies';

panier = gestionPanier(panier);

fetch(url)
    .then(res => {
        if (res.ok){
            res.json()
                .then(data => print(data))
                .catch(err => console.error(err));
        } else { console.error('Impossible de charger l\'API', res.status, ':', res.statusText)}
    })
    .catch(err => console.error(err));


// Permet d'affiché les produits
function print(produits) {
    // Boucle pour affiché chaque produit
    for (let i in produits){
        const produitConteneur        = document.createElement('div');
        produitConteneur.className  = 'produit';

        const textConteneur           = document.createElement('div');
        textConteneur.className     = 'text-conteneur';

        const btnConteneur            = document.createElement('div');

        const imgProduit              = document.createElement('img')
        const produitTitre            = document.createElement('h3');
        const produitPara             = document.createElement('p');
        const produitPrix             = document.createElement('span');
        const produitBouton           = document.createElement('a');
        const produitSelection        = document.createElement('select');

        imgProduit.src              = produits[i].imageUrl;

        produitBouton.className     = 'btn btn-bleu';
        produitBouton.href          = 'produit.html?produitID=' + produits[i]._id;

        const textTitre               = document.createTextNode(produits[i].name);
        const textPara                = document.createTextNode(produits[i].description);
        const textPrix                = document.createTextNode(produits[i].price.toString().replace('00', '.00€'));
        const textBoutton             = document.createTextNode('Plus de détails');

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

getEltPanier();