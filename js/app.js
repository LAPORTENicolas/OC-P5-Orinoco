function gestionPanier(panier){
    if (sessionStorage.getItem('panier')) {
        panier = JSON.parse(sessionStorage.getItem('panier'));

        /*
        if (panier === null) {
            panier = [];
            let tmpPanier = JSON.stringify(panier);
            sessionStorage.setItem('panier', tmpPanier);
        }
        */


        for (let i in panier) {
            if (panier[i] === null) {
                panier.splice(i, 1);
                let tmpPanier = JSON.stringify(panier);
                sessionStorage.setItem('panier', tmpPanier);
            }
        }
        console.log(panier);
    }

    return panier;
}

function supressionDuPanier(){
    if (sessionStorage.getItem('panier')) {
        panier = [];
        sessionStorage.setItem('panier', JSON.stringify(panier));
        console.log(panier);
    }

    return panier;
}