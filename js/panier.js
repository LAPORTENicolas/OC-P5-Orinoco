let panier                  = [];
panier                      = gestionPanier();

function supprimer(id) {
   // for (let i in panier){
        if (panier[id]){
            //let tmpTr = document.getElementById('tr-panier' + i);
            //tmpTr.remove();

            if (sessionStorage.getItem('panier')){
                sessionStorage.removeItem('panier');
            }

            console.log(panier[id].name + ' a été supprimer');

            panier.splice(id, 1);
            let tmpPanier = JSON.stringify(panier);
            sessionStorage.setItem('panier', tmpPanier);
            document.location.reload();
        }
   // }
}

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
    let textPanierTh4           = document.createTextNode('Supprimer');
    panierTh4.className         = 'th-4';
    panierTh4.appendChild(textPanierTh4);

    let panierTbody             = document.createElement('tbody');
    let panierBouton            = document.createElement('button');
    panierBouton.className      = 'btn btn-red';

    let prixTotalTr1            = document.createElement('td');
    let prixTotalTr2            = document.createElement('td');

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


    for (let i in panier){
        if (panier[i] != null) {

            prix = prix + (panier[i].price*panier[i].quantite);
            let panierTr2 = document.createElement('tr');
            panierTr2.id = 'tr-panier' + i;

            let tmpTd1 = document.createElement('td');
            let tmpTd2 = document.createElement('td');
            let tmpTd3 = document.createElement('td');
            let tmpTd4 = document.createElement('td');

            let tmpTextTd1 = document.createTextNode(panier[i].name);
            let tmpTextTd2 = document.createTextNode(panier[i].price.toString().replace('00', '.00€'));
            let tmpTextTd3 = document.createTextNode(panier[i].quantite);
            let tmpTextTd4 = document.createTextNode("Supprimer");

            let tmpBouton = document.createElement('button');
            tmpBouton.className = 'btn btn-red';
            tmpBouton.onclick = function () {
                supprimer(i);
            }


            tmpTd1.appendChild(tmpTextTd1);
            tmpTd2.appendChild(tmpTextTd2);
            tmpTd3.appendChild(tmpTextTd3);
            tmpBouton.appendChild(tmpTextTd4);

            tmpTd4.appendChild(tmpBouton);

            panierTr2.appendChild(tmpTd1);
            panierTr2.appendChild(tmpTd2);
            panierTr2.appendChild(tmpTd3);
            panierTr2.appendChild(tmpTd4);

            panierTbody.appendChild(panierTr2);
        }

    }

    let textPrixTotal       = document.createTextNode(prix.toString().replace('00', '.00€'));
    prixTotal.appendChild(textPrixTotal);

    panierTbody.appendChild(prixTotalConteneur);
    prixTotalConteneur.appendChild(prixTotalTr1);
    prixTotalConteneur.appendChild(prixTotalTr2);
    prixTotalConteneur.appendChild(prixTotalLegende);
    prixTotalConteneur.appendChild(prixTotal);

    affichageFormualire();
}

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
    //formulaireBoutton.onclick           = payer();
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

function payer(){
    /*
    let prenom  = document.getElementById('Prenom').value;
    let nom     = document.getElementById('Nom').value;
    let adresse = document.getElementById('Adresse').value;
    */

    //console.log(prenom + nom + adresse)
}

if (panier.length === 0) {
    let div         = document.getElementById('conteneur-panier');
    let titre       = document.createElement('h2');
    let textTitre   = document.createTextNode('Panier vide');
    titre.appendChild(textTitre);

    div.appendChild(titre);

    console.log('Panier vide');
} else {
    affichagePanier();
}

let boutton = document.getElementById('payer');

boutton.addEventListener('click', function (e){
    envoye({
        contact: {
            firstName: document.getElementById('Nom').value,
            lastName: document.getElementById('Prenom').value,
            address: document.getElementById('Adresse').value,
            city: document.getElementById('Ville').value,
            email: document.getElementById('Email').value
       },
        products: [panier[0]._id]
        },
    )
})

const envoye = async function(data) {
    let reponse = await fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    let dataReponse = await reponse.json();

    if (reponse.ok) {

    }
}