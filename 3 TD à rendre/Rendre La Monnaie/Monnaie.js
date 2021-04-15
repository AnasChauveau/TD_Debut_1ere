/* Lancement de la version 1.0 du TP Rendu de Monnaie 22/12/20 */
/* Création de la fonction prix_commande 22/12/20 */
/* Création des foncitons retirer et Total 22/12/20 */
/* Création de la fonction confirmation 22/12/20 */
/* Début de création de la fonction verification 22/12/20 */
/* Création finalisé des fonctions verification et monnaie 22/12/20 */


// je crée un tableau global qui prend chaque valeur envoyé par le client
// je l'affiche pour que le client ne sois pas perdu
// je crée un message d'erreur au cas où la saisie serait inférieur à 1
// au moment de l'envoie, le prix de l'article est afficher sur la caisse
function prix_commande(){
    document.getElementById("remarque").innerHTML = "";
    let prix = document.getElementById("prix_article").value;
    if (prix >= 1 ){
        article.push(prix);
        console.log(article);
        document.getElementById("result").innerHTML = prix +"€";
        document.getElementById("visible").innerHTML = "Articles: "+article;
        document.getElementById("visible").style.color = "blue";
    }else{
        document.getElementById("remarque").innerHTML = "Veuillez entrer un montant valide !";
        document.getElementById("remarque").style.color = "red";
    }
    return article
}

// je crée une fonction qui supprime le dernier article à la demande du client
// je crée un message d'erreur au cas où il n'y aurais rien à retirer
function retirer(){
    if (article.length >= 1){
        article.pop();
        document.getElementById("remarque").innerHTML = "Votre dernier article a bien été retiré !";
        document.getElementById("remarque").style.color = "green";
        document.getElementById("visible").innerHTML = "Articles: "+article;
        console.log(article)
    }else{
        document.getElementById("remarque").innerHTML = "Il n'y a pas d'article à retirer !";
        document.getElementById("remarque").style.color = "red"
    }
}

// je crée une fonction qui donne le total actuelle à la demande du client
// le total s'affiche sur la caisse
function Total(){
    let prix_total = 0;
    for (let t=0;t<article.length;t++){
        prix_total += Number(article[t]);
    }
    document.getElementById("result").innerHTML = prix_total +"€";
    return prix_total
}

// je crée une fonction qui vérifie s'il y a des article et qui organise l'étape de l'achat
// je crée un message d'érreur au cas ou il n'y est pas d'article
function confirmation(){
    let verif = Total();
    let list_none = ["ent_article","annul_article","confirmer","guide1"];
    let list_inline = ["guide2","paiement","annuler"];
    if (verif >= 1){
        for (let i=0;i<list_none.length;i++){
            document.getElementById(list_none[i]).style.display = "none";
        }
        for (let y=0;y<list_inline.length;y++){
            document.getElementById(list_inline[y]).style.display = "inline";
        }
    }else{
        document.getElementById("remarque").innerHTML = "Veuiller saisir le montant de vos articles !";
        document.getElementById("remarque").style.color = "red";
    }
}

// je crée une fonction qui prend le montant du client et le total à payer
// si le montant est supérieur ou égale au total, le paiement est accepté, sinon on redemande le montant au client
// si le montant est supérieur strictement supérieur au total la fonction monnaie est lancé
function verification(){
    let manque = 0;
    let prix_total = Total();
    console.log(prix_total);
    let montant = Number(document.getElementById("montant").value);
    console.log(montant);
    let rendu = montant - prix_total;
    if (montant >= prix_total){
        document.getElementById("paiement").style.display = "none"
        document.getElementById("insuffisant").innerHTML = "Paiement accepté !";
        document.getElementById("insuffisant").style.color = "green"
        document.getElementById("insuffisant").style.fontSize = "50px"
        if (montant == prix_total){
            document.getElementById("pile").style.display = "inline";
        }else{
            monnaie(rendu);
        }
    }else{
        manque = prix_total - montant;
        document.getElementById("insuffisant").innerHTML = "il manque "+manque+"€ veuiller saisir un montant plus élevé !";
        document.getElementById("insuffisant").style.color = "red";
    }
}

// je crée une fonction avec un parametre qui est le surplus par rapport au total qui rend la monnaie de façon cohérente
// elle vérifie du billet de 500 à la piece de 1 euros
// elle utilise la division euclidienne en partant de 500 jusqu'à 1
// si un billet fait partie du rendu, elle renvoie le nombre de celui ci
// pour finir elle casse la fonction quand le surplus atteint 0, pour évité les calcules inutiles
function monnaie(plus){
    let total = 0;
    let nombre = 0;
    let billets = [500,200,100,50,20,10,5];
    let pieces = [2,1];
    document.getElementById("traitement").style.display = "inline";
    document.getElementById("rendu").innerHTML = "le rendu est de "+plus+"€";
    for (let b=0;b<billets.length;b++){
        nombre = plus / billets[b];
        if (nombre >= 1){
            nombre = Math.floor(nombre);
            document.getElementById("b"+billets[b]).innerHTML = nombre+" billets de "+billets[b]+"€";
            total = nombre * billets[b];
            plus -= total;
            if (plus == 0){
                document.getElementById("fin").innerHTML = "N'oublier pas votre monnaie, nous esperons vous revoir très bientôt !";
                break;
            }
        }      
    }
    for (let p=0;p<pieces.length;p++){ // cette boucle n'est utile que pour considérer 1 et 2 comme des pièces
        nombre = plus / pieces[p];     // il n'y aurais pas eu besoin d'elle en dollars (billets de 1 ...)
        if (nombre >= 1){
            nombre = Math.floor(nombre);
            document.getElementById("p"+pieces[p]).innerHTML = nombre+" pièces de "+pieces[p]+"€"; 
            total = nombre * pieces[p];
            plus -= total;
            if (plus == 0){
                document.getElementById("fin").innerHTML = "N'oublier pas votre monnaie, nous esperons vous revoir très bientôt !";
                document.getElementById("new2").style.display = "inline";
                break;
            }
        }
    }
}


// --------------------- Variables Globals ----------------------- //
let article = [];


