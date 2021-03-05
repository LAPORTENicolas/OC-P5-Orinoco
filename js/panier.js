let panier                  = [];
let prixTotalS              = 0;
panier                      = gestionPanier();

// Permet de supprimer un élément du panier
function supprimer(id) {
   // for (let i in panier){
        if (panier[id]){
            //let tmpTr = document.getElementById('tr-panier' + i);
            //tmpTr.remove();

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
    let panierConteneur         = document.getElementById('conteneur-panier');
    let panierTableau           = document.createElement('table');
    let panierThead             = document.createElement('thead');
    let panierTr                = document.createElement('tr');

    let panierTh1               = document.createElement('th');
    let textPanierTh1           = document.createTextNode('Nom');
    panierTh1.className         = 'th-1';
    panierTh1.appendChild(textPanierTh1);

    let panierTh2               = document.createElement('th');
    let textPanierTh2           = document.createTextNode('Prix unitaire');
    panierTh2.className         = 'th-2';
    panierTh2.appendChild(textPanierTh2);

    let panierTh3               = document.createElement('th');
    let textPanierTh3           = document.createTextNode('Quantité');
    panierTh3.className         = 'th-3';
    panierTh3.appendChild(textPanierTh3);

    let panierTh4               = document.createElement('th');
    let textPanierTh4           = document.createTextNode('Couleur');
    panierTh4.className         = 'th-4';
    panierTh4.appendChild(textPanierTh4);

    let panierTh5               = document.createElement('th');
    let textPanierTh5           = document.createTextNode('Supprimer');
    panierTh4.className         = 'th-4';
    panierTh5.appendChild(textPanierTh5);

    let panierTbody             = document.createElement('tbody');
    let panierBouton            = document.createElement('button');
    panierBouton.className      = 'btn btn-red';

    let prixTotalTr1            = document.createElement('td');
    let prixTotalTr2            = document.createElement('td');
    let prixTotalTr3            = document.createElement('td');

    let prixTotalConteneur  = document.createElement('tr');

    let prixTotalLegende    = document.createElement('td');
    let textLegende         = document.createTextNode('Prix total:');
    prixTotalLegende.appendChild(textLegende);

    let prixTotal           = document.createElement('td');

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
        if (panier[i] != null) {

            prix = prix + (panier[i].price*panier[i].quantite);
            let panierTr2 = document.createElement('tr');
            panierTr2.id = 'tr-panier' + i;

            let tmpTd1 = document.createElement('td');
            let tmpTd2 = document.createElement('td');
            let tmpTd3 = document.createElement('td');
            let tmpTd4 = document.createElement('td');
            let tmpTd5 = document.createElement('td');

            let tmpTextTd1 = document.createTextNode(panier[i].name);
            let tmpTextTd2 = document.createTextNode(panier[i].price.toString().replace('00', '.00€'));
            let tmpTextTd3 = document.createTextNode(panier[i].quantite);
            let tmpTextTd4 = document.createTextNode(panier[i].colors[panier[i].couleur]);
            let tmpTextTd5 = document.createTextNode("Supprimer");

            let tmpBouton = document.createElement('button');
            tmpBouton.className = 'btn btn-red';
            tmpBouton.onclick = function () {
                supprimer(i);
            }


            tmpTd1.appendChild(tmpTextTd1);
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

    let textPrixTotal       = document.createTextNode(prix.toString().replace('00', '.00€'));
    prixTotalS              = textPrixTotal;
    prixTotal.appendChild(textPrixTotal);

    panierTbody.appendChild(prixTotalConteneur);
    prixTotalConteneur.appendChild(prixTotalTr1);
    prixTotalConteneur.appendChild(prixTotalTr2);
    prixTotalConteneur.appendChild(prixTotalTr3);
    prixTotalConteneur.appendChild(prixTotalLegende);
    prixTotalConteneur.appendChild(prixTotal);

    affichageFormualire();
}

// Permet d'affiché le formulaire
function affichageFormualire() {
    let champs                          = ['Nom', 'Prenom', 'Adresse', 'Ville', 'Email']

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

    for (let i in champs) {
        let tmpDivConteneur             = document.createElement('div');
        tmpDivConteneur.className       = 'input-conteneur';

        let tmpLabel                    = document.createElement('label');
        let tmpLabelText                = document.createTextNode(champs[i] + ':');
        tmpLabel.htmlFor                = champs[i];
        tmpLabel.appendChild(tmpLabelText);

        let tmpInput                    = document.createElement('input');
        tmpInput.type                   = 'text';
        tmpInput.name                   = champs[i];
        tmpInput.placeholder            = champs[i];
        tmpInput.id                     = champs[i];
        tmpInput.value                  = 'a';
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

    let reponse = await fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if (reponse.ok) {
        // dataReponse récupere le json de la réponse de l'API
        let dataReponse = await reponse.json();
        // Supression du panier
        supressionDuPanier();
        // Enregistrement des données de la commande
        localStorage.setItem('confirmation', JSON.stringify(dataReponse));
        // Redicrection vers la page de confirmation
        document.location.href = 'confirmation.html';
    } else {
        console.log('Erreur' + reponse.status + ':' + reponse.statusText);
    }
}

// Vérification du formulaire
function validationFormulaire(){
    let patPrenom   = '[a-zA-Z]';
    let patAdresse  = '[a-zA-Zéèà ]';
    var patEmail    = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');
    let pat1        = new RegExp(patPrenom);
    let pat2        = new RegExp(patAdresse);
    let pat3        = new RegExp(patEmail);

    let prenom      = document.getElementById('Prenom').value;
    let nom         = 'a'//document.getElementById('Nom').value;
    let adresse     = document.getElementById('Adresse').value;
    let ville       = document.getElementById('Ville').value;
    let email       = document.getElementById('Email').value;
    let erreur      = 0;

    if (pat1.test(prenom) === false){
        erreur++;
    }if (pat1.test(nom) === false){
        erreur++;
    }if (pat2.test(adresse) === false){
        erreur++;
    }if (pat2.test(ville) === false){
        erreur++;
    }if (pat3.test(email) === false){
        erreur++;
    }
    console.log(erreur)
    if (erreur === 0){
        return true;
    } else {
        return false;
    }
}

// Vérifie si le panier n'est pas vide avant d'affiché la page sinon redirection sur la page des produits
if (panier.length === 0 || panier === 'undefined') {
    let div         = document.getElementById('conteneur-panier');
    let titre       = document.createElement('h2');
    let textTitre   = document.createTextNode('Panier vide');
    titre.appendChild(textTitre);

    div.appendChild(titre);
}
else {
    affichagePanier();
    let boutton = document.getElementById('payer');

    // Vérifie si le bouton est cliqué
    boutton.addEventListener('click', function (e){
        console.log(validationFormulaire());
        if (validationFormulaire()){

            // Création d'un tab temp qui contient les ID des art, Rempli avec for
            let tmpID = [];
            for (let i in panier) {
                tmpID.push(panier[i]._id);
            }
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