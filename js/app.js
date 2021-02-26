let produits;

fetch('http://localhost:3000/api/teddies').then(function (reponse) {
    if (reponse.ok) {
        reponse.json().then(function(json) {
            produits = json;
        });
    } else {
        console.log("Impossible de charger l'API")
    }
});

/*
// Initialisation des variables
let requetteUrl = "http://localhost:3000/api/teddies";
let requette    = new XMLHttpRequest();
let article;

// Envoye de la requette au serveur
requette.open('GET', requetteUrl);
requette.responseType = 'json';
requette.send();

// Traitement de la réponse du serveur
requette.onload = function () {
    article = requette.response;
}


var httpRequest;

function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Abandon :( Impossible de créer une instance de XMLHTTP');
        return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', 'http://localhost:3000/api/teddies');
    httpRequest.send();
}

function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            return httpRequest.responseType = 'json';
        } else {
            alert('Il y a eu un problème avec la requête.');
        }
    }
}
*/