let panier                  = [];
let prixTotalS              = 0;
const port                 = '3000';
panier                      = gestionPanier();

// Permet de supprimer un élément du panier
function supprimer(id) {
   // for (let i in panier){
        if (panier[id]){
            //let tmpTr = document.getElementById('tr-panier' + i);
            //tmpTr.remove();

            // Si le panier est enregistrer on le supprime
            if (localStorage.getItem('panier')){
                localStorage.removeItem('panier');
            }

            console.log(panier[id].name + ' a été supprimer');

            panier.splice(id, 1);
            let tmpPanier = JSON.stringify(panier);
            localStorage.setItem('panier', tmpPanier);
            document.location.reload();
        }
   // }
}

// Permet d'affiché le panier
function affichagePanier() {
    let prix                    = 0;
    const panierConteneur         = document.getElementById('conteneur-panier');
    const panierTableau           = document.createElement('table');
    const panierThead             = document.createElement('thead');
    const panierTr                = document.createElement('tr');

    const panierTh1               = document.createElement('th');
    const textPanierTh1           = document.createTextNode('Nom');
    panierTh1.className         = 'th-1';
    panierTh1.appendChild(textPanierTh1);

    const panierTh2               = document.createElement('th');
    const textPanierTh2           = document.createTextNode('Prix unitaire');
    panierTh2.className         = 'th-2';
    panierTh2.appendChild(textPanierTh2);

    const panierTh3               = document.createElement('th');
    const textPanierTh3           = document.createTextNode('Quantité');
    panierTh3.className         = 'th-3';
    panierTh3.appendChild(textPanierTh3);

    const panierTh4               = document.createElement('th');
    const textPanierTh4           = document.createTextNode('Couleur');
    panierTh4.className         = 'th-4';
    panierTh4.appendChild(textPanierTh4);

    const panierTh5               = document.createElement('th');
    const textPanierTh5           = document.createTextNode('Supprimer');
    panierTh4.className         = 'th-4';
    panierTh5.appendChild(textPanierTh5);

    const panierTbody             = document.createElement('tbody');
    const panierBouton            = document.createElement('button');
    panierBouton.className      = 'btn btn-red';

    const prixTotalTr1            = document.createElement('td');
    const prixTotalTr2            = document.createElement('td');
    const prixTotalTr3            = document.createElement('td');

    const prixTotalConteneur  = document.createElement('tr');

    const prixTotalLegende    = document.createElement('td');
    const textLegende         = document.createTextNode('Prix total:');
    prixTotalLegende.appendChild(textLegende);

    const prixTotal           = document.createElement('td');

    panierConteneur.appendChild(panierTableau);
    panierTableau.appendChild(panierThead);
    panierTableau.appendChild(panierTbody);
    panierThead.appendChild(panierTr);
    panierTr.appendChild(panierTh1);
    panierTr.appendChild(panierTh2);
    panierTr.appendChild(panierTh3);
    panierTr.appendChild(panierTh4);
    panierTr.appendChild(panierTh5);


    for (let i in panier){
        if (panier[i] !== null) {

            // On convertie le prix en Euro, puis on multiplie le prix unitaire par la quantité
            prix = prix  + ((panier[i].price/100)*panier[i].quantite);
            const panierTr2 = document.createElement('tr');
            panierTr2.id = 'tr-panier' + i;

            const tmpTd1      = document.createElement('td');
            const tmpTd2      = document.createElement('td');
            const tmpTd3      = document.createElement('td');
            const tmpTd4      = document.createElement('td');
            const tmpTd5      = document.createElement('td');
            const tmpLink     = document.createElement('a');

            tmpLink.href    = 'produit.html?produitID=' + panier[i]._id;
            const textLien    = document.createTextNode(panier[i].name);
            tmpLink.appendChild(textLien);

            const tmpTextTd2  = document.createTextNode(panier[i].price.toString().replace('00', '.00€'));
            const tmpTextTd3  = document.createTextNode(panier[i].quantite);
            const tmpTextTd4  = document.createTextNode(panier[i].colors[panier[i].couleur]);
            const tmpTextTd5  = document.createTextNode("Supprimer");

            const tmpBouton = document.createElement('button');
            tmpBouton.className = 'btn btn-red';
            tmpBouton.onclick = () => supprimer(i)


            tmpTd1.appendChild(tmpLink);
            tmpTd2.appendChild(tmpTextTd2);
            tmpTd3.appendChild(tmpTextTd3);
            tmpTd4.appendChild(tmpTextTd4);
            tmpBouton.appendChild(tmpTextTd5);

            tmpTd5.appendChild(tmpBouton);

            panierTr2.appendChild(tmpTd1);
            panierTr2.appendChild(tmpTd2);
            panierTr2.appendChild(tmpTd3);
            panierTr2.appendChild(tmpTd4);
            panierTr2.appendChild(tmpTd5);

            panierTbody.appendChild(panierTr2);
        }

    }

    // Conversion du prix en €
    const textPrixTotal       = document.createTextNode(new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(prix));
    prixTotalS              = textPrixTotal;
    prixTotal.appendChild(textPrixTotal);

    panierTbody.appendChild(prixTotalConteneur);
    prixTotalConteneur.appendChild(prixTotalTr1);
    prixTotalConteneur.appendChild(prixTotalTr2);
    prixTotalConteneur.appendChild(prixTotalTr3);
    prixTotalConteneur.appendChild(prixTotalLegende);
    prixTotalConteneur.appendChild(prixTotal);

    console.log(affichageFormualire());
}

// Permet d'affiché le formulaire
function affichageFormualire() {
    let champ                           = getChamps();

    let formulaireConteneur             = document.getElementById('formulaire');
    formulaireConteneur.className       = 'formulaire';

    //let formulaireForm                  = document.createElement('form');
    //formulaireForm.method               = 'post';

    let formulaireBtnConteneur          = document.createElement('div');
    formulaireBtnConteneur.className    = 'btn-validation-conteneur';

    let formulaireBoutton               = document.createElement('button');
    let formulaireBouttonText           = document.createTextNode('Payer');
    formulaireBoutton.className         = 'btn btn-bleu';
    formulaireBoutton.id                = 'payer';
    formulaireBoutton.appendChild(formulaireBouttonText);

    //formulaireConteneur.appendChild(formulaireForm);

    for (let i in champ) {
        let tmpDivConteneur             = document.createElement('div');
        tmpDivConteneur.className       = 'input-conteneur';
        tmpDivConteneur.id              = 'conteneur-' + champ[i].id;

        let tmpLabel                    = document.createElement('label');
        let tmpLabelText                = document.createTextNode(champ[i].placeholder + ':');
        tmpLabel.htmlFor                = champ[i].id;
        tmpLabel.appendChild(tmpLabelText);

        let tmpInput                    = document.createElement('input');
        tmpInput.type                   = champ[i].type;
        tmpInput.name                   = champ[i].name;
        tmpInput.placeholder            = champ[i].placeholder;
        tmpInput.id                     = champ[i].id;
        tmpInput.value                  = champ[i].value;
        formulaireConteneur.appendChild(tmpDivConteneur);
        tmpDivConteneur.appendChild(tmpLabel);
        tmpDivConteneur.appendChild(tmpInput);
    }

    formulaireConteneur.appendChild(formulaireBtnConteneur);
    formulaireBtnConteneur.appendChild(formulaireBoutton);
}

// Permet d'envoyer la req de commande a l'API
async function envoye(data) {
    // Stocke le reslutat de la req fetch, Fetch envoye une requete a l'API en post contenant du JSON transformé en "string"

    fetch('http://localhost:' + port + '/api/teddies/order', {
        // Parametrage de la reponse
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)})
        .then(res => {
            if (res.ok){
                // dataReponse récupere le json de la réponse de l'API
                res.json()
                    .then(data => {
                        // Enregistrement des données de la commande
                        localStorage.setItem('confirmation', JSON.stringify(data));
                        // Redicrection vers la page de confirmation
                        document.location.href = 'confirmation.html';
                    })
                    .catch(err => console.error(err));
            } else {
                console.log('Erreur' + reponse.status + ':' + reponse.statusText);
            }
        })
        .catch(err => console.error(err));
}

// Vérification du formulaire
function validationFormulaire(){
    //const patPrenom             =
    const patAdresse            = /^([a-zA-Z0-9- ]+)$/
    const patEmail              = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');

    const champs                = getChamps();

    //const prenom                = document.getElementById('Prenom').value;
    const nom                   = document.getElementById('Nom').value;
    const adresse               = document.getElementById('Adresse').value;
    const ville                 = document.getElementById('Ville').value;
    const email                 = document.getElementById('Email').value;
    let erreur                  = 0;

    for (let i in champs) {
        const tmpChamp          = document.getElementById(champs[i].id).value;
        const tmpRegExp         = new RegExp(champs[i].reqExp, 'i');
        if (tmpRegExp.test(tmpChamp) === false){
            if (document.getElementById('err-' + champs[i].name) === null){
                const cntChamp      = document.getElementById('conteneur-' + champs[i].id);
                const cntErr        = document.createElement('err-cnt' + champs[i].name);

                cntErr.appendChild(document.createTextNode('Le champ ' + champs[i].placeholder + ' n\'est pas correct'));
                cntErr.id           = 'err-' + champs[i].name;
                cntChamp.appendChild(cntErr);
                document.getElementById(champs[i].id).className = 'erreur';
            }
            erreur++;
        } else {
            if (document.getElementById('err-' + champs[i].name) !== null){
                document.getElementById('conteneur-' + champs[i].id).removeChild(document.getElementById('err-' + champs[i].name));
                document.getElementById(champs[i].id).classList.remove('erreur');
            }
        }
    }
    // Return tru si il n'y a pas d"érreur
    if (erreur === 0){
        return true;
    } else {
        return false;
    }
}

function getChamps(){
    return {
        '0': {
            'type': 'text',
            'value': 'Nom',
            'placeholder': 'Nom',
            'name': 'nom',
            'id': 'Nom',
            'reqExp': '^([a-zA-Z0-9-]+)$'
        },
        '1': {
            'type': 'text',
            'value': 'Prenom',
            'placeholder': 'Prenom',
            'name': 'prenom',
            'id': 'Prenom',
            'reqExp': '^([a-zA-Z0-9-]+)$'
        },
        '2': {
            'type': 'text',
            'value': 'Adresse',
            'placeholder': 'Adresse',
            'name': 'adresse',
            'id': 'Adresse',
            'reqExp': '^([a-zA-Z0-9- ]+)$'
        },
        '3': {
            'type': 'text',
            'value': 'Ville',
            'placeholder': 'Ville',
            'name': 'ville',
            'id': 'Ville',
            'reqExp': '^([a-zA-Z0-9- ]+)$'
        },
        '4': {
            'type': 'email',
            'value': 'Email@email.com',
            'placeholder': 'Email',
            'name': 'email',
            'id': 'Email',
            'reqExp': '^[0-9A-Za-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$'
        }
    }
}

// Vérifie si le panier n'est pas vide avant d'affiché la page sinon redirection sur la page des produits
if (panier.length === 0 || panier === 'undefined') {
    const div         = document.getElementById('conteneur-panier');
    const titre       = document.createElement('h2');
    const textTitre   = document.createTextNode('Panier vide');
    titre.appendChild(textTitre);

    div.appendChild(titre);
} else {
    affichagePanier();
    const boutton = document.getElementById('payer');

    // Vérifie si le bouton est cliqué
    boutton.addEventListener('click', function (e){
        if (validationFormulaire()){

            // Création d'un tab temp qui contient les ID des art, Rempli avec for
            let tmpID = [];
            for (let i in panier) {
                tmpID.push(panier[i]._id);
            }
            // On configure le body de la req Avec contact qui contient l'user et products qui contient les ID des produits dans le panier
            envoye({
                    contact: {
                        firstName: document.getElementById('Nom').value,
                        lastName: document.getElementById('Prenom').value,
                        address: document.getElementById('Adresse').value,
                        city: document.getElementById('Ville').value,
                        email: document.getElementById('Email').value
                    },
                    products: tmpID
                },
            )
        } else {
            console.error('Formulaire invalide');
        }
    })
}