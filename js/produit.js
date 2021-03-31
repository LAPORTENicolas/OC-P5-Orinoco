// Récuperation de l'id
const id        = window.location.search.replace('?produitID=', '');
let btnDisbale  = false;
let panier      = [];
const port     = '3000';

// Actualisation du panier
panier = gestionPanier(panier);

fetch('http://localhost:' + port + '/api/teddies/' + id)
    .then(res => {
        if (res.ok) {
            res.json()
                .then(data => affichageProduit(data))
                .catch(err => console.error(err));
        } else {
            console.error('Impossible de charger l\'API', res.status,  ':', res.statusText);
            document.location.href = 'index.html';
        }
    })
    // On vérifie que l'id demandé existe sinon on redirige l'user sur la page d'accueil
    .catch(err => {
        console.error(err)
        document.location.href  = 'index.html';
    });



function affichageProduit(json){
    const conteneur = document.getElementById('conteneur-produit');

    const titre = document.createElement('h2');
    const textTitre = document.createTextNode(json.name);
    titre.appendChild(textTitre);

    const img = document.createElement('img');
    img.src = json.imageUrl;
    img.alt = json.name;

    const divText = document.createElement('div');
    divText.className = 'text-produit';

    const sousTitre = document.createElement('h2');
    sousTitre.appendChild(textTitre);

    const description = document.createElement('p');
    const textDescription = document.createTextNode(json.description);
    description.appendChild(textDescription);

    const inputQuatite = document.createElement('input');
    inputQuatite.type = 'number';
    inputQuatite.min    = 1;
    inputQuatite.value  = 1;
    inputQuatite.id     = 'quantite';

    const selectInput = document.createElement('select');
    selectInput.id = 'select-input';

    conteneur.appendChild(img);
    conteneur.appendChild(divText);
    divText.appendChild(sousTitre);
    divText.appendChild(description);
    divText.appendChild(inputQuatite);
    divText.appendChild(selectInput);

    for (let i in json.colors) {
        const tmpOption       = document.createElement('option');
        const tmpOptionText   = document.createTextNode(json.colors[i]);
        tmpOption.value     = i;
        tmpOption.appendChild(tmpOptionText);
        selectInput.appendChild(tmpOption);
    }

    const boutton         = document.createElement('button');
    const textBoutton     = document.createTextNode('Ajouter au panier');
    boutton.appendChild(textBoutton);
    boutton.className   = 'btn btn-bleu';
    boutton.id          = 'acheter';
    divText.appendChild(boutton);

    const btn = document.getElementById('acheter');
    btn.addEventListener('click',  () => {
        if (btnDisbale === true) { return 0; }
        acheter(JSON.stringify(json));
    })
}

function acheter(object) {
    const quant   = document.getElementById('quantite').value;
    const select  = document.getElementById('select-input');
    const couleur = select.value;
    const produit = JSON.parse(object);

    // Si la quantité est inférieux ou égale a 1 on n'ajoute aucun produit au panier
    if (quant <= 0) {
        console.log('Quantité invalide');
        return 1;
    }

    for (let i in panier) {
        // Si l'un des éléments du panier correspond au produit qui est ajouté au pnier
        if (panier[i]._id === produit._id && panier[i].couleur === couleur) {
            // On augemente la quatité du produit dans le panier puis, on l'enregistre
            panier[i].quantite = parseInt(panier[i].quantite) + parseInt(quant);
            enrPanier();
            onclick(quant);
            return 0;
        }
    }
    // Si le produit n'est pas déja dans le panier on l'ajoute
    produit.couleur     = couleur;
    produit.quantite    = quant;
    panier.push(produit);
    enrPanier()
        .then( () => {
            onclick(quant)
        });
}

function onclick(quant){
    const doc         = document.getElementById('acheter');
    doc.classList.add('anime');
    doc.textContent = 'Ajouté ! +' + quant;
    btnDisbale      = true;
    setTimeout(() => {
        doc.textContent = 'Ajouter au panier';
        doc.classList.remove('anime');
        btnDisbale      = false;
        }, 2000)
}

async function enrPanier(){
    if (localStorage.getItem('panier')) {
        localStorage.removeItem('panier');
    }
    let tmpPanier = JSON.stringify(panier);
    localStorage.setItem('panier', tmpPanier);
}

getEltPanier();
